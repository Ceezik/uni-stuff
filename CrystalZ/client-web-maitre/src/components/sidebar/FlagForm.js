import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../utils/useConfig';
import { useSocket } from '../../utils/useSocket';
import { serializeConfig } from '../../utils/utils';

/**
 * Composant FlagForm :
 * Formulaire de modification des paramètres des cristaux
 *
 * props :
 *   - showModal : Si la pop-up doit être affichée ou non
 *   - handleClose : Fonction appelée à la fermeture de la pop-up
 */
function FlagForm({ showModal, handleClose }) {
    const { register, handleSubmit, getValues, errors } = useForm();
    const { config } = useConfig();
    const { socket } = useSocket();

    const updateConfig = (newConfig) => {
        socket.emit('updateConfig', serializeConfig(newConfig));
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Modifier les paramètres des cristaux</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs="12">
                            <label>Rayon de visibilité : </label>
                            <input
                                className="ml-2 input-light"
                                name="flagVisibilityRadius"
                                type="number"
                                defaultValue={config.flagVisibilityRadius}
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
                            {errors.flagVisibilityRadius &&
                                errors.flagVisibilityRadius.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <label>Rayon d'action : </label>
                            <input
                                className="ml-2 input-light"
                                name="flagActionRadius"
                                type="number"
                                defaultValue={config.flagActionRadius}
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
                                                flagVisibilityRadius,
                                            } = getValues();

                                            return (
                                                (!flagVisibilityRadius
                                                    ? true
                                                    : value
                                                    ? parseInt(value) <=
                                                      parseInt(
                                                          flagVisibilityRadius
                                                      )
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
                            {errors.flagActionRadius &&
                                errors.flagActionRadius.message}
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Annuler
                </Button>
                <Button
                    variant="success"
                    onClick={handleSubmit(updateConfig)}
                    disabled={Object.keys(errors).length > 0}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FlagForm;
