import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import DurationInput from '../utils/DurationInput';
import { useForm } from 'react-hook-form';
import { useSocket } from '../../utils/useSocket';
import {
    serializeItem,
    itemsWithDuration,
    itemsWithEffect,
} from '../../utils/utils';

/**
 * Composant FlagForm :
 * Formulaire de modification des paramètres des items
 *
 * props :
 *   - showModal : Si la pop-up doit être affichée ou non
 *   - handleClose : Fonction appelée à la fermeture de la pop-up
 */
function ItemForm({ showModal, handleClose, item, model = true }) {
    const [duration, setDuration] = useState(item ? item.waitingPeriod : null);
    const [effectDuration, setEffectDuration] = useState(
        item ? item.effectDuration : null
    );
    const [customErrors, setCustomsErrors] = useState({});
    const { register, handleSubmit, getValues, errors } = useForm();
    const { socket } = useSocket();

    const updateItem = (newItem) => {
        newItem.waitingPeriod = duration;
        newItem.effectDuration = effectDuration;

        if (itemsWithDuration.includes(item.name) && !effectDuration) {
            setCustomsErrors({
                ...customErrors,
                ...{ effectDuration: 'Ce champ est obligatoire' },
            });
        } else {
            setCustomsErrors({});
            socket.emit(model ? 'updateItemModel' : 'updateItem', {
                id: item.id,
                newItem: serializeItem(newItem),
            });
            handleClose();
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>
                    Modifier l{model && 'e modèle d'}'item {item.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {!model && (
                        <Row>
                            <Col xs={12} className="mb-4">
                                <label>Quantité : </label>
                                <input
                                    className="ml-2 input-light"
                                    name="quantity"
                                    type="number"
                                    defaultValue={item ? item.quantity : null}
                                    ref={register({
                                        min: {
                                            value: 1,
                                            message:
                                                'La quantité doit être supérieure ou égale à 1',
                                        },
                                    })}
                                />
                            </Col>
                            <Col xs="auto" className="danger">
                                {errors.quantity && errors.quantity.message}
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col xs="12">
                            <label>Rayon de visibilité : </label>
                            <input
                                className="ml-2 input-light"
                                name="visibilityRadius"
                                type="number"
                                defaultValue={item.visibilityRadius}
                                ref={register({
                                    required: 'Ce champ est obligatoire',
                                    min: {
                                        value: 0.01,
                                        message:
                                            'Le rayon de visibilité doit faire au minimum 0.01m',
                                    },
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="mb-2 danger">
                            {errors.visibilityRadius &&
                                errors.visibilityRadius.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <label>Rayon d'action : </label>
                            <input
                                className="ml-2 input-light"
                                name="actionRadius"
                                type="number"
                                defaultValue={item.actionRadius}
                                ref={register({
                                    required: 'Ce champ est obligatoire',
                                    min: {
                                        value: 0.01,
                                        message:
                                            "Le rayon d'action doit faire au minimum 0.01m",
                                    },
                                    validate: {
                                        smallerThanVR: (value) => {
                                            const {
                                                visibilityRadius,
                                            } = getValues();

                                            return (
                                                (!visibilityRadius
                                                    ? true
                                                    : value
                                                    ? parseInt(value) <=
                                                      parseInt(visibilityRadius)
                                                    : true) ||
                                                "Le rayon d'action doit être inférieur ou égal au rayon de visibilité"
                                            );
                                        },
                                    },
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="mb-2 danger">
                            {errors.actionRadius && errors.actionRadius.message}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={12}>
                            <label>Déplacement automatique : </label>
                            <label className="ml-2 radio-buttons-wrapper">
                                Oui
                                <input
                                    name="autoMove"
                                    type="radio"
                                    value={true}
                                    defaultChecked={
                                        item ? Boolean(item.autoMove) : false
                                    }
                                    ref={register({
                                        required: 'Ce champ est obligatoire',
                                    })}
                                />
                                <span className="checkmark checkmark-light"></span>
                            </label>
                            <label className="ml-2 radio-buttons-wrapper">
                                Non
                                <input
                                    name="autoMove"
                                    type="radio"
                                    value={false}
                                    defaultChecked={
                                        item ? Boolean(!item.autoMove) : true
                                    }
                                    ref={register({
                                        required: 'Ce champ est obligatoire',
                                    })}
                                />
                                <span className="checkmark checkmark-light"></span>
                            </label>
                        </Col>
                        <Col xs="auto" className="mb-2 danger">
                            {errors.autoMove && errors.autoMove.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <label>Période de carence : </label>
                            <DurationInput
                                light={true}
                                duration={duration}
                                setDuration={setDuration}
                            />
                        </Col>
                    </Row>

                    {itemsWithEffect.includes(item.name) && (
                        <Row className="mt-4">
                            <Col xs={12}>
                                <label>
                                    Impact sur le rayon de visibilité :
                                </label>
                                <input
                                    className="ml-2 input-light"
                                    name="effectStrength"
                                    type="number"
                                    defaultValue={
                                        item ? item.effectStrength : null
                                    }
                                    ref={register({
                                        required: 'Ce champ est obligatoire',
                                        min: {
                                            value: 1,
                                            message:
                                                'Veuillez entrer un pourcentage valide',
                                        },
                                        max: {
                                            value: 100,
                                            message:
                                                'Veuillez entrer un pourcentage valide',
                                        },
                                    })}
                                />
                                <label className="ml-2">%</label>
                            </Col>
                            <Col xs="auto" className="mb-2 danger">
                                {errors.effectStrength &&
                                    errors.effectStrength.message}
                            </Col>
                        </Row>
                    )}

                    {itemsWithDuration.includes(item.name) && (
                        <Row>
                            <Col xs={12}>
                                <label>Durée de l'effet : </label>
                                <DurationInput
                                    duration={effectDuration}
                                    setDuration={setEffectDuration}
                                />
                            </Col>
                            {customErrors.effectDuration && (
                                <Col xs="auto" className="mb-2 danger">
                                    {customErrors.effectDuration}
                                </Col>
                            )}
                        </Row>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Annuler
                </Button>
                <Button
                    variant="success"
                    onClick={handleSubmit(updateItem)}
                    disabled={Object.keys(errors).length > 0}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ItemForm;
