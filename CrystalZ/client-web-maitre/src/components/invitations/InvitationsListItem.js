import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '../../utils/useSocket';

/**
 * Composant InvitationsListItem :
 * Affiche une demande à rejoindre la partie
 *
 * props :
 *   - invitation : La demande à rejoindre la partie
 */
function InvitationsListItem({ invitation }) {
    const { socket } = useSocket();

    const accept = (accepted) => {
        socket.emit('acceptInvitation', {
            gameId: invitation.GameId,
            invitationId: invitation.id,
            accepted,
            playerId: invitation.User.id,
            username: invitation.User.username,
        });
    };

    return (
        <Card>
            <Card.Body>
                <Row className="justify-content-between">
                    <Col xs="auto">{invitation.User.username}</Col>
                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <FontAwesomeIcon
                                    style={{ cursor: 'pointer' }}
                                    icon={faCheck}
                                    color="#28a745"
                                    size="lg"
                                    onClick={() => accept(true)}
                                />
                            </Col>
                            <Col xs="auto">
                                <FontAwesomeIcon
                                    style={{ cursor: 'pointer' }}
                                    icon={faTimes}
                                    color="#c82333"
                                    size="lg"
                                    onClick={() => accept(false)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default InvitationsListItem;
