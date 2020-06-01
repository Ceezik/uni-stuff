import React from 'react';
import { useTraps } from '../../utils/useTraps';
import { useSocket } from '../../utils/useSocket';
import { TrapMarker } from './Markers';

/**
 * Composant TrapList :
 * Liste des pièges
 */
function TrapList() {
    const { socket } = useSocket();
    const { traps, setTraps } = useTraps();

    socket.on('adminRoutine', (o) => {
        if (!localStorage.getItem('moving')) setTraps(o.traps);
    });

    return traps.map((trap) => <TrapMarker key={trap.id} trap={trap} />);
}

export default TrapList;
