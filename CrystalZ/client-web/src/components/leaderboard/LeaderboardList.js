import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';
import { Card, Row, Col } from 'react-bootstrap';

/**
 * Composant LeaderboardList :
 * Classement des meilleurs joueurs
 *
 * props :
 *   - players : Les joueurs
 *   - filter : Le critère de classement
 */
function LeaderboardList({ players, filter }) {
    const getScoreName = () => {
        switch (filter) {
            case 'SUPREMACY':
            case 'FLAG':
                return 'Drapeaux capturés';
            case 'TIME':
                return 'Temps de possession';
            case 'Victoires':
                return 'Victoires';
        }
    };

    return (
        <Card>
            <Card.Body>
                <Row className="mb-2">
                    <Col xs={2}>
                        <label>Position</label>
                    </Col>
                    <Col xs={6}>
                        <label>Joueur</label>
                    </Col>
                    <Col xs={4} className="text-right">
                        <label>{getScoreName()}</label>
                    </Col>
                </Row>

                {players.map((p, index) => (
                    <LeaderboardListItem
                        key={p.id}
                        player={p}
                        index={index}
                        filter={filter}
                    />
                ))}
            </Card.Body>
        </Card>
    );
}

export default LeaderboardList;
