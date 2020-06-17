import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faCog
} from '@fortawesome/free-solid-svg-icons';
import { IconOverlay } from '../OverlayTip';
import { updateById } from '../../service/configuration';
import PlayerForm from './PlayerForm';
import { serializeConfig } from '../../utils/config';
import { toast } from 'react-toastify';
import { useConfig } from '../../utils/useConfig';

/**
 * Composant PlayerActions :
 * Menu des actions réalisables sur les joueurs
 */
function PlayerActions() {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { config, setConfig } = useConfig();

    const handleClose = () => setShowModal(false);

    const updateConfig = data => {
        const newConfig = JSON.parse(JSON.stringify(config));
        newConfig.playerVisibilityRadius = data.playerVisibilityRadius;
        newConfig.playerActionRadius = data.playerActionRadius;
        newConfig.inventorySize = data.inventorySize;

        updateById(serializeConfig(newConfig))
            .then(() => {
                setConfig(newConfig);
                handleClose();
            })
            .catch(err => toast.error(err.response.data));
    };

    return (
        <>
            <Row
                className="mt-2 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>Joueurs</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    <IconOverlay tipKey="modify">
                        <Col
                            xs="auto"
                            className="mb-3 actions-item"
                            onClick={() => setShowModal(true)}
                        >
                            <FontAwesomeIcon icon={faCog} />
                        </Col>
                    </IconOverlay>

                    <PlayerForm
                        config={config}
                        showModal={showModal}
                        handleClose={handleClose}
                        onSubmit={updateConfig}
                    />
                </Row>
            )}
        </>
    );
}

export default PlayerActions;
