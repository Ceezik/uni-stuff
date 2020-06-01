import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';

/**
 * Composant Statistics :
 * Affiche les statistiques d'un utilisateur
 *
 * props :
 *   - user : L'utilisateur et ses statistiques
 */
function Statistics({ user }) {
    const data = {
        labels: ['Victoires', 'Égalités', 'Défaites'],
        datasets: [
            {
                data: [
                    user.Statistic.nbWins,
                    user.Statistic.nbGames -
                        user.Statistic.nbWins -
                        user.Statistic.nbLosses,
                    user.Statistic.nbLosses
                ],
                backgroundColor: ['#68b684', '#d2d2d2', '#eb4646'],
                borderWidth: 0
            }
        ]
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="primary-text">{user.username}</h2>

                    <label className="mb-0">
                        Inscrit le {moment(user.createdAt).format('DD/MM/YYYY')}
                    </label>
                </Card.Body>
            </Card>

            <Card className="mt-5">
                <Card.Body>
                    <Row className="justify-content-between">
                        <Col xs="auto">
                            <label>Parties jouées</label>
                            <h4 className="mb-0">{user.Statistic.nbGames}</h4>
                        </Col>
                        <Col xs="auto">
                            <label>Victoires</label>
                            <h4 className="mb-0">{user.Statistic.nbWins}</h4>
                        </Col>
                        <Col xs="auto">
                            <label>Égalités</label>
                            <h4 className="mb-0">
                                {user.Statistic.nbGames -
                                    user.Statistic.nbWins -
                                    user.Statistic.nbLosses}
                            </h4>
                        </Col>
                        <Col xs="auto">
                            <label>Défaites</label>
                            <h4 className="mb-0">{user.Statistic.nbLosses}</h4>
                        </Col>
                    </Row>

                    {user.Statistic.nbGames > 0 && (
                        <Row className="justify-content-center mt-4">
                            <Col xs="6">
                                <Doughnut
                                    data={data}
                                    options={{ legend: { position: 'right' } }}
                                />
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>

            <Card className="mt-2">
                <Card.Body>
                    <Row className="justify-content-between">
                        <Col xs="auto">
                            <label>Drapeaux capturés</label>
                            <h4 className="mb-0">{user.Statistic.nbFlags}</h4>
                        </Col>
                        <Col xs="auto">
                            <label>Drapeaux découverts</label>
                            <h4 className="mb-0">
                                {user.Statistic.nbDiscoveredFlags}
                            </h4>
                        </Col>
                        <Col xs="auto">
                            <label>Pièges ayant fait mouche</label>
                            <h4 className="mb-0">{user.Statistic.nbTraps}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default Statistics;
