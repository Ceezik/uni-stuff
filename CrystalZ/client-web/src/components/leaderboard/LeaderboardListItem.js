import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { secondsToDuration } from '../../utils/utils';
import { Link } from 'react-router-dom';

/**
 * Composant LeaderboardListItem :
 * Représente un joueur dans le classement des meilleurs joueurs
 *
 * props :
 *   - index : La position du joueur dans le classement
 *   - player : Le joueur
 *   - filter : Le critère de classement
 */
function LeaderboardListItem({ index, player, filter }) {
    const getScore = () => {
        switch (filter) {
            case 'SUPREMACY':
                return player.Statistic.scoreSupremacy;
            case 'FLAG':
                return player.Statistic.scoreFlag;
            case 'TIME':
                return secondsToDuration(player.Statistic.scoreTime);
            case 'Victoires':
                return player.Statistic.nbWins;
        }
    };

    return (
        <Row className="my-1">
            <Col xs={2}>{index + 1}.</Col>
            <Col xs={6}>
                <Link className="link" to={`/users/${player.id}`}>
                    {player.username}
                </Link>
            </Col>
            <Col xs={4} className="text-right">
                {getScore()}
            </Col>
        </Row>
    );
}

export default LeaderboardListItem;
