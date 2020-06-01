import React from 'react';
import _ from 'lodash';
import { Row, Card, Col } from 'react-bootstrap';
import moment from 'moment';
import { getGameColor } from '../../utils/game';
import { secondsToDuration } from '../../utils/utils';
import { useAuth } from '../../utils/auth';

/**
 * Composant Game :
 * Affiche le score des joueurs et des équipes d'une partie
 *
 * props :
 *   - histories : Liste des scores des joueurs
 */
function Game({ histories }) {
    const { user } = useAuth();
    const game = _.find(histories, { UserId: user.id });
    const teams = _.uniqBy(histories, 'teamName').map(h => ({
        name: h.teamName,
        color: h.teamColor,
        score: h.teamScore
    }));

    return (
        <>
            <Row className="justify-content-center">
                <Col xs={8}>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col
                                    xs={2}
                                    className="text-center"
                                    style={{
                                        textTransform: 'uppercase',
                                        color: getGameColor(game)
                                    }}
                                >
                                    {game.hasWon
                                        ? 'Victoire'
                                        : game.hasLost
                                        ? 'Défaite'
                                        : 'Égalité'}
                                </Col>

                                <Col xs={10}>
                                    <Card.Title>
                                        <span className="priority">
                                            {game.Game.name}
                                        </span>
                                        {' - '}
                                        <span className="redirect">
                                            {game.Game.gameMode}
                                        </span>
                                    </Card.Title>
                                    <Card.Subtitle className="mb-1 subtitle">
                                        {moment(game.createdAt).format(
                                            'DD/MM/YYYY à HH:mm'
                                        )}
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Score
                teams={_.orderBy(teams, ['score'], ['desc'])}
                gameMode={game.Game.gameMode}
                histories={histories}
            />
        </>
    );
}

function Score({ teams, gameMode, histories }) {
    return (
        <div className="mt-5">
            <Row className="justify-content-end">
                <Col xs="8">
                    <Row className="px-3">
                        <Col xs="6" className="text-center">
                            Joueur
                        </Col>
                        <Col xs="6" className="text-center">
                            {gameMode === 'TIME'
                                ? 'Temps de possession'
                                : 'Cristaux capturés'}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {teams.map(team => (
                <Row key={team.name} className="py-2">
                    <Col xs="4">
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="h-100 align-items-center">
                                    <Col xs="auto">
                                        <div
                                            className="team-color"
                                            style={{
                                                backgroundColor: team.color
                                            }}
                                        ></div>
                                    </Col>
                                    <Row>
                                        <Col xs="12">{team.name}</Col>
                                        <Col xs="12">
                                            {gameMode === 'TIME'
                                                ? secondsToDuration(team.score)
                                                : team.score}
                                        </Col>
                                    </Row>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="8">
                        {_.orderBy(
                            histories.filter(h => h.teamName === team.name),
                            ['score'],
                            ['desc']
                        ).map(h => (
                            <Card key={h.id} className="px-3 py-2 my-1">
                                <ScoreItem history={h} gameMode={gameMode} />
                            </Card>
                        ))}
                    </Col>
                </Row>
            ))}
        </div>
    );
}

function ScoreItem({ history, gameMode }) {
    return (
        <Row>
            <Col xs="6">
                <Row>
                    <Col xs="12" className="text-center">
                        {history.User.username}
                    </Col>
                </Row>
            </Col>
            <Col xs="6">
                <Row>
                    <Col xs="12" className="text-center">
                        {gameMode === 'TIME'
                            ? secondsToDuration(history.score)
                            : history.score}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Game;
