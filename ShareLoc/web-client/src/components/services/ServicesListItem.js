import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from '../../utils/auth';
import VoteButtons from './VoteButtons';
import DeleteVoteButtons from './DeleteVoteButtons';
import AchievedServiceForm from '../achievedServices/AchievedServiceForm';

function ServicesListItem({ service, refreshServices }) {
    const { user } = useAuth();

    const userVote = service.votes.filter(v => v.user.login === user.login);
    const nbAgree = service.votes.filter(v => v.agree === true).length;
    const nbDisagree = service.votes.filter(v => v.agree === false).length;
    return (
        <Col className="mb-4" md={6}>
            <Card>
                <Card.Header as="h5">{service.title}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={6}>
                            <Card.Text>{service.description}</Card.Text>
                            <Card.Subtitle className="text-muted">
                                {service.cost} point{service.cost > 1 && 's'}
                            </Card.Subtitle>
                        </Col>

                        <Col>
                            {service.accepted === true ? (
                                <>
                                    <Row className="mb-2">
                                        <AchievedServiceForm
                                            service={service}
                                            refreshServices={refreshServices}
                                        />
                                    </Row>
                                    <Row>
                                        {service.deleted === false ? (
                                            <span className="danger">
                                                Suppression refusée
                                            </span>
                                        ) : (
                                            <DeleteVoteButtons
                                                service={service}
                                                refreshServices={refreshServices}
                                            />
                                        )}
                                    </Row>
                                </>
                            ) : (
                                service.accepted === undefined && (
                                    <VoteButtons
                                        type="service"
                                        serviceId={service.id}
                                        userVote={userVote}
                                        nbAgree={nbAgree}
                                        nbDisagree={nbDisagree}
                                        refreshServices={refreshServices}
                                    />
                                )
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ServicesListItem;
