import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCog,
    faTrashAlt,
    faEyeSlash,
    faEye,
    faDice,
} from '@fortawesome/free-solid-svg-icons';
import Switch from '../utils/Switch';
import { useItemModels } from '../../utils/useItemModels';
import { useItems } from '../../utils/useItems';
import { useAction } from '../../utils/useAction';
import { getItemImage } from '../../utils/utils';
import { useForm } from 'react-hook-form';
import ItemForm from './ItemForm';

/**
 * Composant ItemActions :
 * Différentes actions réalisables sur les items
 */
function ItemActions() {
    const { itemModels } = useItemModels();
    const { showRadius, setShowRadius } = useItems();

    return (
        <Row className="mt-3 ml-1">
            <Col xs="12" className="mb-1">
                <Row className="align-items-center justify-content-between">
                    <Col className="mb-3">Afficher les rayons</Col>
                    <Col xs="auto">
                        <Switch
                            on={showRadius}
                            setOn={() => setShowRadius(!showRadius)}
                        />
                    </Col>
                </Row>
            </Col>

            {itemModels.map((im) => (
                <Item key={im.id} item={im} />
            ))}
        </Row>
    );
}

function Item({ item }) {
    const iconItem = getItemImage(item.name);
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { action, setAction } = useAction();
    const {
        hiddenItems,
        setHiddenItems,
        selectedItem,
        setSelectedItem,
        createRandomItems,
        deleteItemsByName,
    } = useItems();
    const hidden = hiddenItems.includes(item.name);

    const handleClose = () => setShowModal(false);

    const showItem = () => {
        setHiddenItems(hiddenItems.filter((im) => im !== item.name));
    };

    const hideItem = () => {
        setHiddenItems([...hiddenItems, ...[item.name]]);
    };

    const _createRandom = ({ nbItems }) => {
        reset({ nbItems: null });
        createRandomItems(nbItems, item.name);
    };

    const handleAction = (itemName) => {
        if (action === 'item' && selectedItem === itemName) setAction(null);
        else setAction('item');
    };

    return (
        <Col xs={12}>
            <h5>{item.name}</h5>

            <Row className="ml-1">
                <Col
                    xs="auto"
                    className={`mb-3 mr-3 actions-item ${
                        action === 'item' &&
                        selectedItem === item.name &&
                        'actions-item-selected'
                    }`}
                    onClick={() => {
                        handleAction(item.name);
                        setSelectedItem(item.name);
                    }}
                >
                    <Image className="actions-item-img" src={iconItem} />
                </Col>
                <Col xs="auto" className="mb-3 mr-3 actions-item">
                    <form onSubmit={handleSubmit(_createRandom)}>
                        <input
                            className="input-sidebar"
                            type="number"
                            name="nbItems"
                            ref={register}
                            required
                            min={1}
                            max={100}
                        />
                        <button type="submit" className="invisible-btn">
                            <FontAwesomeIcon
                                className="ml-2"
                                icon={faDice}
                                color="white"
                            />
                        </button>
                    </form>
                </Col>
                <Col
                    xs="auto"
                    className="mb-3 mr-3 actions-item"
                    onClick={() => deleteItemsByName(item.name)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                </Col>
                <Col
                    xs="auto"
                    className="mb-3 mr-3 actions-item"
                    onClick={() => (hidden ? showItem() : hideItem())}
                >
                    <FontAwesomeIcon icon={hidden ? faEye : faEyeSlash} />
                </Col>
                <Col
                    xs="auto"
                    className="mb-3 actions-item"
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faCog} />
                </Col>
            </Row>

            <ItemForm
                item={item}
                showModal={showModal}
                handleClose={handleClose}
            />
        </Col>
    );
}

export default ItemActions;
