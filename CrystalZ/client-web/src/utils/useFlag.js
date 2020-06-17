import React, { useState, createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { useForbiddenZone } from './useForbiddenZone';
import {
    isInZone,
    getDistance,
    getVisibilityRadiusAuto,
    getZoneBox
} from './utils';
import { useMainZone } from './useMainZone';
import { useConfig } from './useConfig';

const FlagContext = createContext();

/**
 * Contexte des cristaux :
 * Permet d'avoir accès à tous les outils de gestion des cristaux partout dans le code
 */
export const FlagProvider = ({ children }) => {
    const [flagsPositions, setFlagsPositions] = useState([]);
    const [showFlags, setShowFlags] = useState(true);
    const { forbiddenZones } = useForbiddenZone();
    const { position: mainZone } = useMainZone();
    const { config } = useConfig();

    const create = point => {
        const newPositon = { lat: point.latlng.lat, lng: point.latlng.lng };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        !conflict &&
            flagsPositions.map(
                flag =>
                    getDistance(flag, {
                        lat: newPositon.lat,
                        lng: newPositon.lng
                    }) <
                        (config.flagVisibilityRadius ||
                            getVisibilityRadiusAuto(mainZone, 0.05)) *
                            2 && (conflict = true)
            );

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, mainZone)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : toast.error(
                  'Veuillez placer les cristaux dans une zone de jeu valide'
              );
    };

    const createRandom = nb => {
        const { x_max, y_max, x_min, y_min } = getZoneBox(mainZone);

        let randomFlags = [];
        let nbFlags = nb;

        while (randomFlags.length < nbFlags) {
            let newFlag = false;
            let iteration = 0;

            while (!newFlag && iteration < 10) {
                let lat = y_min + Math.random() * (y_max - y_min);
                let lng = x_min + Math.random() * (x_max - x_min);

                let conflict = false;
                forbiddenZones.map(
                    zone => isInZone(lat, lng, zone) && (conflict = true)
                );

                !conflict &&
                    [...randomFlags, ...flagsPositions].map(
                        flag =>
                            getDistance(flag, { lat, lng }) <
                                (config.flagVisibilityRadius ||
                                    getVisibilityRadiusAuto(mainZone, 0.05)) *
                                    2 && (conflict = true)
                    );

                !conflict &&
                    isInZone(lat, lng, mainZone) &&
                    randomFlags.push({ lat, lng }) &&
                    (newFlag = true);

                iteration++;
            }

            iteration === 10 && nbFlags--;
        }

        setFlagsPositions(flagsPositions.concat(randomFlags));
    };

    const move = (e, flag) => {
        let otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                zone
            ) && (conflict = true);
        });

        !conflict &&
            flagsPositions
                .filter(f => f.lat !== flag.lat && f.lng !== flag.lng)
                .map(
                    f =>
                        getDistance(f, {
                            lat: newPositon.lat,
                            lng: newPositon.lng
                        }) <
                            (config.flagVisibilityRadius ||
                                getVisibilityRadiusAuto(mainZone, 0.05)) *
                                2 && (conflict = true)
                );

        !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            ) &&
            otherFlags.push(newPositon);

        setFlagsPositions(otherFlags);
    };

    const remove = point => {
        setFlagsPositions(flagsPositions.filter(p => p !== point));
    };

    const removeAll = () => {
        setFlagsPositions([]);
    };

    return (
        <FlagContext.Provider
            value={{
                flagsPositions,
                setFlagsPositions,
                create,
                createRandom,
                move,
                remove,
                removeAll,
                showFlags,
                setShowFlags
            }}
        >
            {children}
        </FlagContext.Provider>
    );
};

export const useFlag = () => useContext(FlagContext);
