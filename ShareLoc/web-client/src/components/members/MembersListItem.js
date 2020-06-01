import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

function MembersListItem({ member }) {
    return (
        <Col className="mb-4" md={4}>
            <Card>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={1}>
                            {member.estGestionnaire && (
                                <FontAwesomeIcon color="gold" icon={faCrown} />
                            )}
                        </Col>
                        <Col>
                            <Card.Title>
                                {member.membre.firstname}{' '}
                                {member.membre.lastname}
                            </Card.Title>
                            <Card.Subtitle className="text-muted">
                                {member.points} point{member.points > 1 && 's'}
                            </Card.Subtitle>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default MembersListItem;
