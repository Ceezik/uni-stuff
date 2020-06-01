import { isPointInPolygon } from 'geolib';
import _ from 'lodash';
import { getDistance } from './geo';

/**
 * Désérialise un point
 *
 * @param object point Le point à désérialiser
 */
export const deserializePoint = (point) => {
    return [point.longitude, point.latitude];
};

/**
 * Désérialise l'évènement ondragend
 *
 * @param object e L'évènement à désérialiser
 */
export const deserializeDragend = (e) => {
    const c = e.target.getLatLng();
    return [c.lat, c.lng];
};

/**
 * Désérialise l'évènement onclick
 *
 * @param object e L'évènement à désérialiser
 */
export const deserializeClick = (e) => {
    return [e.latlng.lat, e.latlng.lng];
};

/**
 * Formate des zones
 *
 * @param array areas Les zones à formater
 */
export const formatAreas = (areas) => {
    return areas.map((a) => ({
        ...a,
        ...{ coordinates: [_.uniqBy(a.coordinates[0], (c) => c[0] && c[1])] },
    }));
};

/**
 * Regarde si un point est dans une zone interdite
 *
 * @param array coordinates Les coordonnées du point
 * @param array forbiddenAreas Les zones interdites
 */
export const isInForbiddenAreas = (coordinates, forbiddenAreas) => {
    let isIn = false;
    forbiddenAreas.map(
        (a) => isPointInPolygon(coordinates, a.coordinates[0]) && (isIn = true)
    );
    return isIn;
};

/**
 * Regarde si un point est dans la zone de jeu
 *
 * @param array coordinates Les coordonnées du point
 * @param array gameAreas La zone de jeu
 */
export const isInGameAreas = (coordinates, gameAreas) => {
    let isIn = false;
    gameAreas.map(
        (a) => isPointInPolygon(coordinates, a.coordinates[0]) && (isIn = true)
    );
    return isIn;
};

/**
 * Regarde si un point se trouve dans le rayon de visibilité des cristaux
 *
 * @param array coordinates Les coordonnées du point
 * @param array flags Liste des cristaux
 * @param int radius Rayon de visibilité des cristaux
 */
export const isFlagInConflict = (coordinates, flags, radius) => {
    let conflict = false;
    flags.forEach((f) => {
        getDistance(coordinates, f.coordinates) < radius * 2 &&
            (conflict = true);
    });

    return conflict;
};
