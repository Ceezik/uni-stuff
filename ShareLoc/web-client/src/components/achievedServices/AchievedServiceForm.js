import React, { useState, useEffect } from 'react';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { _create } from '../../services/achievedService';
import ControlledForm from '../forms/ControlledForm';
import { ConcernedMembersInput } from '../forms/AchievedServiceInputs';
import { useParams } from 'react-router-dom';
import { _getMembers } from '../../services/member';
import { useAuth } from '../../utils/auth';
import { toast } from 'react-toastify';

function AchievedServiceForm({ service, refreshServices }) {
    const [show, setShow] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [invalid, setInvalid] = useState(null);
    const { colocationId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        _getMembers(colocationId).then(res =>
            setMembers(res.filter(m => m.membre.login !== user.login))
        );
    }, [colocationId, user]);

    const handleClose = () => {
        setSelectedMembers([]);
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const create = selectedMembers => {
        if (selectedMembers.length > 0) {
            setInvalid(false);
            const to = [];
            selectedMembers.map(member => to.push(member.id));
            _create(colocationId, service.id, { to })
                .then(() => {
                    refreshServices();
                    handleClose();
                })
                .catch(() => toast.error("Une erreur est survenue"))
            
        } else {
            setInvalid(true);
        }
    };

    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                Service effectué !
            </Button>

            <Modal show={show} onHide={handleClose}>
                <ControlledForm onSubmit={() => create(selectedMembers)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Désignez les bénéficiaires</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Row className="mb-3">
                            <Col>
                                <Form.Group className="mb-0" md="6">
                                    <ConcernedMembersInput
                                        isInvalid={invalid}
                                        members={members}
                                        selectedMembers={selectedMembers}
                                        setSelectedMembers={setSelectedMembers}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Valider</Button>
                    </Modal.Footer>
                </ControlledForm>
            </Modal>
        </>
    );
}

export default AchievedServiceForm;
