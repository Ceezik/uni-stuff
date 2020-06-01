import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { _update } from '../../services/invitation';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/auth';

function InvitationsListItem({ invitation, deleteInvitations }) {
    const { invitations, setInvitations } = useAuth();

    const update = accepted => {
        _update(invitation.id, { accepted })
            .then(res => {
                toast.success(res.message);
                deleteInvitations(invitation.id);
                setInvitations(invitations - 1);
            })
            .catch(() => toast.error('Une erreur est survenue.'));
    };

    return (
        <Col md={6} className="mb-3">
            <Card>
                <Card.Body as={Row} className="align-items-center">
                    <Col>
                        {invitation.from.firstname} {invitation.from.lastname}{' '}
                        vous a invité à rejoindre {invitation.colocation.name}
                    </Col>
                    <Col xs="auto">
                        <Button onClick={() => update(true)} variant="success">
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>

                        <Button
                            onClick={() => update(false)}
                            className="ml-2"
                            variant="danger"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Col>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default InvitationsListItem;
