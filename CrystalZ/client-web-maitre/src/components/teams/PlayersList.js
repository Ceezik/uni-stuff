import React from 'react';
import _ from 'lodash';
import { Card } from 'react-bootstrap';

/**
 * Composant PlayerList :
 * Affiche les membres d'une équipe
 *
 * props :
 *   - players : Liste des membres de l'équipe
 */
function PlayersList({ players }) {
    return players.length > 0 ? (
        _.sortBy(players, ['username']).map((player) => {
            return (
                <Card key={player.username} className="mt-2">
                    <Card.Body>
                        <Card.Subtitle>{player.username}</Card.Subtitle>
                    </Card.Body>
                </Card>
            );
        })
    ) : (
        <Card className="mt-2">
            <Card.Body>
                <Card.Subtitle>
                    Cette équipe ne possède pas encore de joueurs.
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default PlayersList;
