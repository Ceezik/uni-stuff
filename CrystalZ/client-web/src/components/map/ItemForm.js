import React, { useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import DurationInput from '../forms/DurationInput';
import { useForm } from 'react-hook-form';
import { itemsWithDuration, itemsWithEffect } from '../../utils/items';

/**
 * Composant ItemForm :
 * Modal de paramétrage d'un item
 *
 * props :
 *   - showModal : Booleen à true si la modal doit être ouverte
 *   - handleClose : Event à déclencher à la fermeture de la modal
 *   - item : Item à paramétrer
 *   - onSubmit : Event à déclencher à la soumission du formulaire
 *   - model (optionnel) : Booleen à true si la modification doit s'appliquer à tous les items identiques posés par la suite (true par défaut)
 */
function ItemForm({ showModal, handleClose, item, onSubmit, model = true }) {
    const [duration, setDuration] = useState(item ? item.waitingPeriod : null);
    const [effectDuration, setEffectDuration] = useState(
        item ? item.effectDuration : null
    );
    const [customErrors, setCustomsErrors] = useState({});
    const { register, handleSubmit, getValues, errors } = useForm();

    const submit = data => {
        data.waitingPeriod = duration;
        data.effectDuration = effectDuration;

        if (itemsWithDuration.includes(item.name) && !effectDuration) {
            setCustomsErrors({
                ...customErrors,
                ...{ effectDuration: 'Ce champ est obligatoire' }
            });
        } else {
            setCustomsErrors({});
            onSubmit(data);
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
                                                'La quantité doit être supérieure ou égale à 1'
                                        }
                                    })}
                                />
                            </Col>
                            <Col xs="auto" className="danger">
                                {errors.quantity && errors.quantity.message}
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col xs={12}>
                            <label>Rayon de visibilité : </label>
                            <input
                                className="ml-2 input-light"
                                name="visibilityRadius"
                                type="number"
                                defaultValue={
                                    item ? item.visibilityRadius : null
                                }
                                ref={register({
                                    min: {
                                        value: 0.01,
                                        message:
                                            'Le rayon de visibilité doit faire au minimum 0.01m'
                                    }
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="danger">
                            {errors.visibilityRadius &&
                                errors.visibilityRadius.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} className="mb-4">
                            <label>Rayon d'action : </label>
                            <input
                                className="ml-2 input-light"
                                name="actionRadius"
                                type="number"
                                defaultValue={item ? item.actionRadius : null}
                                ref={register({
                                    min: {
                                        value: 0.01,
                                        message:
                                            "Le rayon d'action doit faire au minimum 0.01m"
                                    },
                                    validate: {
                                        smallerThanVR: value => {
                                            const {
                                                visibilityRadius
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
                                        }
                                    }
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="danger">
                            {errors.actionRadius && errors.actionRadius.message}
                        </Col>
                    </Row>

                    <Row>
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
                                        required: 'Ce champ est obligatoire'
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
                                        required: 'Ce champ est obligatoire'
                                    })}
                                />
                                <span className="checkmark checkmark-light"></span>
                            </label>
                        </Col>
                        <Col xs="auto" className="danger">
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
                        <Col xs="auto" className="danger">
                            {errors.waitingPeriod &&
                                errors.waitingPeriod.message}
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
                                                'Veuillez entrer un pourcentage valide'
                                        },
                                        max: {
                                            value: 100,
                                            message:
                                                'Veuillez entrer un pourcentage valide'
                                        }
                                    })}
                                />
                                <label className="ml-2">%</label>
                            </Col>
                            <Col xs="auto" className="danger">
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
                                    light={true}
                                    duration={effectDuration}
                                    setDuration={setEffectDuration}
                                />
                            </Col>
                            <Col xs="auto" className="danger">
                                {customErrors.effectDuration &&
                                    customErrors.effectDuration}
                            </Col>
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
                    className="btn-primary"
                    onClick={handleSubmit(submit)}
                    disabled={Object.keys(errors).length > 0}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ItemForm;
