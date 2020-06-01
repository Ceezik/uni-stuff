import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from '../../utils/auth';
import VoteButtons from '../services/VoteButtons';
import moment from 'moment';

function AchievedServicesListItem({
    achievedService,
    refreshAchievedServices
}) {
    const { user } = useAuth();
    const userVote = achievedService.votes.filter(
        v => v.user.login === user.login
    );
    const nbAgree = achievedService.votes.filter(v => v.agree === true).length;
    const nbDisagree = achievedService.votes.filter(v => v.agree === false)
        .length;

    return (
        <Col className="mb-4" md={6}>
            <Card>
                <Card.Header as="h5">
                    {achievedService.service.title}
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={7}>
                            <Card.Text>
                                {achievedService.service.description}
                            </Card.Text>
                            <Card.Subtitle className="text-muted">
                                {achievedService.service.cost} point
                                {achievedService.service.cost > 1 && 's'}
                            </Card.Subtitle>
                            <div className="mt-2">
                                <strong>Effectué par : </strong>{' '}
                                {achievedService.from.membre.firstname}{' '}
                                {achievedService.from.membre.lastname}{' '}
                            </div>
                            <div>
                                <strong> Le : </strong>{' '}
                                {moment(
                                    achievedService.doneAt,
                                    'yyyy-MM-DDThh:mm:ssZ[UTC]'
                                ).format('dddd DD MMMM YYYY')}{' '}
                            </div>
                            <div>
                                <strong>Bénéficiaire{achievedService.to.length > 1 && 's'} : </strong>
                                {achievedService.to.map(m => {
                                    return `${m.membre.firstname} ${m.membre.lastname}`
                                }).join(", ")}
                            </div>
                        </Col>

                        <Col>
                            {achievedService.valid === true ? (
                                <>
                                    <Row>
                                        {achievedService.from.membre.login ===
                                        user.login ? (
                                            <strong className="realisateur-points">
                                                {' '}
                                                + {
                                                    achievedService.service.cost
                                                }{' '}
                                                point
                                                {achievedService.service.cost >
                                                    1 && 's'}
                                            </strong>
                                        ) : (
                                            achievedService.to.filter(
                                                m =>
                                                    m.membre.login ===
                                                    user.login
                                            ).length > 0 && (
                                                <strong className="beneficiaire-points">
                                                    {' '}
                                                    -{' '}
                                                    {achievedService.service
                                                        .cost /
                                                        achievedService.to
                                                            .length}{' '}
                                                    point
                                                    {achievedService.service
                                                        .cost /
                                                        achievedService.to
                                                            .length >
                                                        1 && 's'}
                                                </strong>
                                            )
                                        )}
                                    </Row>
                                </>
                            ) : (
                                achievedService.valid === undefined &&
                                achievedService.to.map(
                                    member =>
                                        member.membre.login === user.login && (
                                            <VoteButtons
                                                type="achievedService"
                                                serviceId={achievedService.id}
                                                userVote={userVote}
                                                nbAgree={nbAgree}
                                                nbDisagree={nbDisagree}
                                                refreshServices={
                                                    refreshAchievedServices
                                                }
                                            />
                                        )
                                )
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default AchievedServicesListItem;
