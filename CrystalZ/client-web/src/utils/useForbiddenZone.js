import React, { useState, createContext, useContext } from 'react';

const ForbiddenZoneContext = createContext();

/**
 * Contexte des zones interdites :
 * Permet d'avoir accès à tous les outils de gestion des zones interdites partout dans le code
 */
export const ForbiddenZoneProvider = ({ children }) => {
    const [forbiddenZones, setForbiddenZones] = useState([]);
    const [forbiddenZoneIndex, setForbiddenZoneIndex] = useState(-1);

    const create = e => {
        const newPositon = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            zone: forbiddenZoneIndex
        };
        const actualZones = forbiddenZones.filter(
            zone => forbiddenZones.indexOf(zone) !== forbiddenZoneIndex
        );
        const forbiddenZone = forbiddenZones[forbiddenZoneIndex].concat(
            newPositon
        );
        actualZones.splice(forbiddenZoneIndex, 0, forbiddenZone);
        setForbiddenZones(actualZones);
    };

    const createZone = () => {
        setForbiddenZones(forbiddenZones.concat([[]]));
        setForbiddenZoneIndex(forbiddenZones.length);
    };

    const move = (e, point) => {
        let otherPoints = [];
        forbiddenZones.map(zone => {
            otherPoints.push(zone.filter(f => f !== point));
        });

        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng,
            zone: point.zone
        };

        otherPoints[point.zone].splice(
            forbiddenZones[point.zone].indexOf(point),
            0,
            newPositon
        );

        setForbiddenZones(otherPoints);
    };

    const remove = point => {
        setForbiddenZones(
            forbiddenZones.map(zone => zone.filter(p => p !== point))
        );
    };

    const removeZone = indexZone => {
        forbiddenZones.map(zone =>
            zone.map(point => point.zone > indexZone && point.zone--)
        );
        setForbiddenZones(
            forbiddenZones.filter(
                zone => forbiddenZones.indexOf(zone) !== indexZone
            )
        );
        setForbiddenZoneIndex(forbiddenZoneIndex - 1);
    };

    const removeAll = () => {
        setForbiddenZones([]);
        setForbiddenZoneIndex(-1);
    };

    return (
        <ForbiddenZoneContext.Provider
            value={{
                forbiddenZones,
                setForbiddenZones,
                forbiddenZoneIndex,
                setForbiddenZoneIndex,
                create,
                createZone,
                move,
                remove,
                removeZone,
                removeAll
            }}
        >
            {children}
        </ForbiddenZoneContext.Provider>
    );
};

export const useForbiddenZone = () => useContext(ForbiddenZoneContext);
