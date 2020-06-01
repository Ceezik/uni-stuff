import React from 'react';
import { Polygon } from 'react-leaflet';
import { ForbiddenAreaMarker } from './Markers';

/**
 * Composant ForbiddenArea :
 * Affiche les points d'une zone interdite
 *
 * props :
 *   - area : La zone interdite
 */
function ForbiddenArea({ area }) {
    return (
        <>
            <Polygon color="red" positions={area.coordinates[0]}></Polygon>

            {area.coordinates[0].map((point, index) => (
                <ForbiddenAreaMarker
                    key={index}
                    position={point}
                    areaId={area.id}
                />
            ))}
        </>
    );
}

export default ForbiddenArea;
