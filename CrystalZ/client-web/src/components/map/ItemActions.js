import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faDice,
    faEye,
    faEyeSlash,
    faTrashAlt,
    faCog
} from '@fortawesome/free-solid-svg-icons';
import { updateItemsModel } from '../../service/configuration';
import { serializeModels } from '../../utils/config';
import { toast } from 'react-toastify';
import { useItem } from '../../utils/useItem';
import { useForm } from 'react-hook-form';
import Switch from '../forms/Switch';
import ItemForm from './ItemForm';
import { ItemOverlay, IconOverlay } from '../OverlayTip';

/**
 * Composant ItemActions :
 * Menu des actions réalisables sur un item
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 */
function ItemActions({ action, setAction, setSleepingAction }) {
    const [isOpen, setIsOpen] = useState(false);
    const { modelItems, showRadius, setShowRadius } = useItem();

    return (
        <>
            <Row
                className="mt-2 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>Items</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
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

                    {modelItems.length === 0
                        ? "Vous n'avez activé aucun modèle d'item."
                        : modelItems.map(item => (
                              <Item
                                  item={item}
                                  action={action}
                                  setAction={setAction}
                                  setSleepingAction={setSleepingAction}
                                  key={item.id}
                              />
                          ))}
                </Row>
            )}
        </>
    );
}

function Item({ item, action, setAction, setSleepingAction }) {
    const [showModal, setShowModal] = useState(false);
    const { configurationId } = useParams();
    const {
        modelItems,
        setModelItems,
        selectedModelItem,
        setSelectedModelItem,
        createRandom,
        removeAll,
        hiddenItems,
        setHiddenItems
    } = useItem();
    const { register, handleSubmit, reset } = useForm();
    const index = modelItems.indexOf(item);
    const hidden = hiddenItems.indexOf(item.name) !== -1;

    const handleClose = () => setShowModal(false);

    const showItem = () => {
        setHiddenItems(hiddenItems.filter(im => im !== item.name));
    };

    const hideItem = () => {
        setHiddenItems([...hiddenItems, ...[item.name]]);
    };

    const _createRandom = ({ nbItems }) => {
        reset({ nbFlags: null });
        createRandom(nbItems, index);
    };

    const _removeAll = () => {
        removeAll(index);
    };

    const onSubmit = data => {
        const itemModel = modelItems.filter(im => im.name === item.name)[0];

        updateItemsModel(configurationId, itemModel.id, serializeModels(data))
            .then(res => {
                const index = modelItems.indexOf(itemModel);
                const newModels = [...modelItems];
                newModels.splice(index, 1, res.data);
                setModelItems(newModels);
                handleClose();
            })
            .catch(err => toast.error(err.response.data));
    };

    return (
        <Col xs={12} className="mt-1">
            <h5>{item.name}</h5>

            <Row className="mt-1 ml-1 align-items-center">
                <ItemOverlay
                    item={item}
                    setAction={setAction}
                    setSelectedModelItem={setSelectedModelItem}
                    setSleepingAction={setSleepingAction}
                    action={action}
                    selectedModelItem={selectedModelItem}
                    index={index}
                />

                <Col xs="auto" className="mb-3 mr-3 actions-item">
                    <form onSubmit={handleSubmit(_createRandom)}>
                        <input
                            className="input-map"
                            style={{ width: '75px' }}
                            type="number"
                            name="nbItems"
                            ref={register}
                            required
                            min={1}
                            max={100}
                        />
                        <IconOverlay tipKey="dice">
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    padding: '0'
                                }}
                            >
                                <FontAwesomeIcon
                                    className="ml-2"
                                    icon={faDice}
                                    color="white"
                                />
                            </button>
                        </IconOverlay>
                    </form>
                </Col>
                <IconOverlay tipKey="delete">
                    <Col
                        xs="auto"
                        className="mb-3 mr-3 actions-item"
                        onClick={_removeAll}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                    </Col>
                </IconOverlay>
                <IconOverlay tipKey={hidden ? 'unmask' : 'mask'}>
                    <Col
                        xs="auto"
                        className="mb-3 mr-3 actions-item"
                        onClick={() => (hidden ? showItem() : hideItem())}
                    >
                        <FontAwesomeIcon icon={hidden ? faEye : faEyeSlash} />
                    </Col>
                </IconOverlay>
                <IconOverlay tipKey="modify">
                    <Col
                        xs="auto"
                        className="mb-3 actions-item"
                        onClick={() => setShowModal(true)}
                    >
                        <FontAwesomeIcon icon={faCog} />
                    </Col>
                </IconOverlay>
            </Row>

            <ItemForm
                item={item}
                showModal={showModal}
                handleClose={handleClose}
                onSubmit={onSubmit}
            />
        </Col>
    );
}

export default ItemActions;
