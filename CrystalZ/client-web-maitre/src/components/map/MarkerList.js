import React from 'react';
import { useMarkers } from '../../utils/useMarkers';
import { useSocket } from '../../utils/useSocket';
import { MarkerMarker } from './Markers';

/**
 * Composant MarkerList :
 * Liste des points d'intérêt
 */
function MarkerList() {
    const { socket } = useSocket();
    const { markers, setMarkers } = useMarkers();

    socket.on('adminRoutine', (o) => {
        if (!localStorage.getItem('moving')) setMarkers(o.markers);
    });

    return markers.map((marker) => (
        <MarkerMarker key={marker.id} marker={marker} />
    ));
}

export default MarkerList;
