import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

/**
 * Composant PlayerForm :
 * Modal de paramétrage des joueurs
 *
 * props :
 *   - config : Configuration en cours d'édition
 *   - showModal : Booleen à true si la modal doit être ouverte
 *   - handleClose : Event à déclencher à la fermeture de la modal
 *   - onSubmit : Event à déclencher à la soumission du formulaire
 */
function PlayerForm({ config, showModal, handleClose, onSubmit }) {
    const { register, handleSubmit, getValues, errors } = useForm();

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Modifier les paramètres des joueurs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs="12">
                            <label>Taille de l'inventaire : </label>
                            <input
                                className="ml-2 input-light"
                                name="inventorySize"
                                type="number"
                                defaultValue={config ? config.inventorySize : 2}
                                ref={register({
                                    required: 'Ce champ est obligatoire',
                                    min: {
                                        value: 1,
                                        message:
                                            'Veuillez choisir un nombre entre 1 et 10'
                                    },
                                    max: {
                                        value: 10,
                                        message:
                                            'Veuillez choisir un nombre entre 1 et 10'
                                    }
                                })}
                            />
                        </Col>
                        <Col xs="auto" className="danger">
                            {errors.inventorySize &&
                                errors.inventorySize.message}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <label>Rayon de visibilité : </label>
                            <input
                                className="ml-2 input-light"
                                name="playerVisibilityRadius"
                                type="number"
                                defaultValue={
                                    config
                                        ? config.playerVisibilityRadius
                                        : null
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
                                defaultValue={
                                    config ? config.playerActionRadius : null
                                }
                                ref={register({
                                    min: {
                                        value: 0.01,
                                        message:
                                            "Le rayon d'action doit faire au minimum 0.01m"
                                    },
                                    validate: {
                                        smallerThanVR: value => {
                                            const {
                                                playerVisibilityRadius
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
                                        }
                                    }
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="danger">
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
                    className="btn-primary"
                    onClick={handleSubmit(onSubmit)}
                    disabled={Object.keys(errors).length > 0}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PlayerForm;
