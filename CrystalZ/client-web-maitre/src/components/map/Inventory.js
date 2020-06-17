import React from 'react';
import { Modal, Row, Col, Image } from 'react-bootstrap';
import { useConfig } from '../../utils/useConfig';
import { getItemImage } from '../../utils/utils';

/**
 * Composant InventoryWrapper :
 * Pop-up affichant l'inventaire d'un joueur
 *
 * props :
 *   - player : Joueur dont on veut afficher l'inventaire
 *   - showModal : Si la pop-up doit être affichée ou non
 *   - handleClose : Fonction permettant de fermer la pop-up
 */
function InventoryWrapper({ player, showModal, handleClose }) {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            {showModal && <Inventory player={player} />}
        </Modal>
    );
}

function Inventory({ player }) {
    const { config } = useConfig();
    const maxSize = player.hasTransporteur
        ? config.inventorySize * 2
        : config.inventorySize;

    return (
        <>
            <Modal.Header>
                <Modal.Title>
                    Inventaire de {player.username} ({player.inventory.length}/
                    {maxSize})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="ml-1">
                    {player.inventory.length === 0 ? (
                        <Col xs="auto">L'inventaire de ce joueur est vide.</Col>
                    ) : (
                        player.inventory.map((item) => (
                            <InventoryItem item={item} key={item.id} />
                        ))
                    )}
                </Row>
            </Modal.Body>
        </>
    );
}

function InventoryItem({ item }) {
    const iconItem = getItemImage(item.name);

    return (
        <Col
            xs="auto"
            className={`mb-3 mr-3 inventory-item ${
                item.equiped && 'inventory-item-equiped'
            }`}
        >
            <Image className="actions-item-img" src={iconItem} />
        </Col>
    );
}

export default InventoryWrapper;
