import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSocket } from '../../utils/useSocket';
import { Card, Row, Col, Accordion } from 'react-bootstrap';
import PlayersList from './PlayersList';

/**
 * Composant TeamsList :
 * Affiche les équipes
 *
 * props :
 *   - maxPlayers : Nombre maximum de joueur par équipe
 */
function TeamsList({ maxPlayers }) {
    const { socket } = useSocket();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        socket.on('getTeams', (t) => setTeams(t));
        socket.emit('getTeams');
    }, []);

    return _.sortBy(teams, ['name']).map((team) => {
        return (
            <Accordion key={team.id} className="mb-4">
                <Accordion.Toggle as={Card}>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <div
                                    className="team-color"
                                    style={{ backgroundColor: team.color }}
                                ></div>
                            </Col>
                            <Col>
                                <Card.Title className="mb-0">
                                    {team.name}
                                </Card.Title>
                            </Col>
                            <Col xs="auto">
                                {team.players.length} /{' '}
                                {maxPlayers ? maxPlayers : '∞'}
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Toggle>
                <Accordion.Collapse>
                    <PlayersList players={team.players} />
                </Accordion.Collapse>
            </Accordion>
        );
    });
}

export default TeamsList;
