import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

/**
 * Composant FlagForm :
 * Modal de paramétrage d'un cristal
 *
 * props :
 *   - config : Configuration en cours d'édition
 *   - showModal : Booleen à true si la modal doit être ouverte
 *   - handleClose : Event à déclencher à la fermeture de la modal
 *   - onSubmit : Event à déclencher à la soumission du formulaire
 */
function FlagForm({ config, showModal, handleClose, onSubmit }) {
    const { register, handleSubmit, getValues, errors } = useForm();

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
                                defaultValue={
                                    config ? config.flagVisibilityRadius : null
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
                                defaultValue={
                                    config ? config.flagActionRadius : null
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
                                                flagVisibilityRadius
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
                                        }
                                    }
                                })}
                            />
                            <label className="ml-2">mètres</label>
                        </Col>
                        <Col xs="auto" className="danger">
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

export default FlagForm;
