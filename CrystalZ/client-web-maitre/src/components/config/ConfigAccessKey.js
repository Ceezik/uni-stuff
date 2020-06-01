import React, { useState, useEffect } from 'react';
import { useSocket } from '../../utils/useSocket';

/**
 * Composant ConfigAccessKey :
 * Affiche la clé d'accès de la partie
 */
function ConfigAccessKey() {
    const [game, setGame] = useState(null);
    const { socket } = useSocket();

    useEffect(() => {
        socket.on('getGame', (g) => setGame(g));
        socket.emit('getGame');
    }, []);

    return game ? game.id : <></>;
}

export default ConfigAccessKey;
