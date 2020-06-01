import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getGameColor } from '../../utils/game';

/**
 * Composant GamesListItem :
 * Représente une partie dans l'historique des parties
 *
 * props :
 *   - game : La partie
 */
function GamesListItem({ game }) {
    return (
        <Card className="mb-3">
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
                                <Link
                                    className="link"
                                    to={`/games/${game.GameId}`}
                                >
                                    {game.Game.name}
                                </Link>
                            </span>
                            {' - '}
                            <span className="redirect">
                                {game.Game.gameMode}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="subtitle">
                            {moment(game.createdAt).format(
                                'DD/MM/YYYY à HH:mm'
                            )}
                        </Card.Subtitle>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default GamesListItem;
