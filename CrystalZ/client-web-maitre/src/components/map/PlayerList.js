import React from 'react';
import { usePlayers } from '../../utils/usePlayers';
import { useSocket } from '../../utils/useSocket';
import { PlayerMarker } from './Markers';

/**
 * Composant PlayerList :
 * Liste des joueurs
 */
function PlayerList() {
    const { socket } = useSocket();
    const { players, setPlayers } = usePlayers();

    socket.on('adminRoutine', (o) => {
        setPlayers(o.players);
    });

    return players
        .filter((p) => p.coordinates.length > 0)
        .map((player) => (
            <PlayerMarker key={player.username} player={player} />
        ));
}

export default PlayerList;
