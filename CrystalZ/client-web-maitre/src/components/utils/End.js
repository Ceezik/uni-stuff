import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import _ from 'lodash';
import { useConfig } from '../../utils/useConfig';
import { useTeams } from '../../utils/useTeams';
import { useSocket } from '../../utils/useSocket';
import { secondsToDuration } from '../../utils/utils';

/**
 * Composant End :
 * Écran de fin de partie avec le score de chaque équipe/joueur
 */
function End() {
    const { socket } = useSocket();
    const { config } = useConfig();
    const { teams, setTeams } = useTeams();
    const { winners } = config;

    useEffect(() => {
        socket.on('getTeams', (t) => setTeams(t));
        socket.emit('getTeams');
    }, []);

    const stopServer = () => socket.emit('stopServer');

    const restartServer = () => socket.emit('restartServer');

    return (
        <Container className="my-5">
            <Row>
                <Col xs="12">
                    <h1 className="text-center">
                        {winners.length === 1
                            ? `L'équipe ${winners[0].name} a gagné !`
                            : `Égalité entre les équipes
                            ${winners.map((t) => t.name).join(' et ')}`}
                    </h1>
                </Col>
            </Row>

            <Score
                teams={_.orderBy(teams, ['score'], ['desc'])}
                gameMode={config.gameMode}
            />

            <Row className="mt-5 justify-content-end">
                <Col xs="auto">
                    <Button variant="light" onClick={stopServer}>
                        Arrêter le serveur
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="success" onClick={restartServer}>
                        Relancer une partie
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

function Score({ teams, gameMode }) {
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
            {teams.map((team) => (
                <Row key={team.id} className="py-2">
                    <Col xs="4">
                        <Card className="h-100">
                            <Card.Body>
                                <Row className="h-100 align-items-center">
                                    <Col xs="auto">
                                        <div
                                            className="team-color"
                                            style={{
                                                backgroundColor: team.color,
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
                            team.players,
                            ['statistics.score'],
                            ['desc']
                        ).map((p) => (
                            <Card key={p.username} className="px-3 py-2 my-1">
                                <ScoreItem player={p} gameMode={gameMode} />
                            </Card>
                        ))}
                    </Col>
                </Row>
            ))}
        </div>
    );
}

function ScoreItem({ player, gameMode }) {
    return (
        <Row>
            <Col xs="6">
                <Row>
                    <Col xs="12" className="text-center">
                        {player.username}
                    </Col>
                </Row>
            </Col>
            <Col xs="6">
                <Row>
                    <Col xs="12" className="text-center">
                        {gameMode === 'TIME'
                            ? secondsToDuration(player.statistics.score)
                            : player.statistics.score}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default End;
