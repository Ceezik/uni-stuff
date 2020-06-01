import React from 'react';
import { Polygon } from 'react-leaflet';
import { GameAreaMarker } from './Markers';

/**
 * Composant GameArea :
 * Affiche les points de la zone de jeu
 *
 * props :
 *   - area : La zone de jeu
 */
function GameArea({ area }) {
    return (
        <>
            <Polygon color="green" positions={area.coordinates[0]}></Polygon>

            {area.coordinates[0].map((point, index) => (
                <GameAreaMarker key={index} position={point} areaId={area.id} />
            ))}
        </>
    );
}

export default GameArea;
