import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../utils/useConfig';
import { useSocket } from '../../utils/useSocket';
import { serializeConfig } from '../../utils/utils';

/**
 * Composant FlagForm :
 * Formulaire de modification des paramètres des joueurs
 *
 * props :
 *   - showModal : Si la pop-up doit être affichée ou non
 *   - handleClose : Fonction appelée à la fermeture de la pop-up
 */
function PlayerForm({ showModal, handleClose }) {
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
                <Modal.Title>Modifier les paramètres des joueurs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs="12">
                            <label>Rayon de visibilité : </label>
                            <input
                                className="ml-2 input-light"
                                name="playerVisibilityRadius"
                                type="number"
                                defaultValue={config.playerVisibilityRadius}
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
                            {errors.playerVisibilityRadius &&
                                errors.playerVisibilityRadius.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <label>Rayon d'action : </label>
                            <input
                                className="ml-2 input-light"
                                name="playerActionRadius"
                                type="number"
                                defaultValue={config.playerActionRadius}
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
                                                playerVisibilityRadius,
                                            } = getValues();

                                            return (
                                                (!playerVisibilityRadius
                                                    ? true
                                                    : value
                                                    ? parseInt(value) <=
                                                      parseInt(
                                                          playerVisibilityRadius
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
                            {errors.playerActionRadius &&
                                errors.playerActionRadius.message}
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

export default PlayerForm;
