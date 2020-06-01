import React, { useState, createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { useSocket } from './useSocket';
import { useForbiddenAreas } from './useForbiddenAreas';
import { isInForbiddenAreas, isFlagInConflict, isInGameAreas } from './map';
import { useConfig } from './useConfig';
import { useGameAreas } from './useGameAreas';

const FlagContext = createContext();
const FLAG_ERROR_MESSAGE =
    "Le cristal doit être placé dans la zone de jeu et son rayon de visibilité ne doit pas toucher celui d'un autre cristal";

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des cristaux
 * partout dans le code
 */
export const FlagProvider = ({ children }) => {
    const [flags, setFlags] = useState([]);
    const [showFlags, setShowFlags] = useState(true);
    const { socket } = useSocket();
    const { config } = useConfig();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const createFlag = (coordinates) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            !isFlagInConflict(
                coordinates,
                flags,
                config.flagVisibilityRadius
            ) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            socket.emit('createFlag', coordinates, (flag) =>
                setFlags([...flags, flag])
            );
        } else {
            toast.error(FLAG_ERROR_MESSAGE);
        }
    };

    const createRandomFlags = (nbFlags) => {
        socket.emit('createRandomFlags', nbFlags);
    };

    const moveFlag = (coordinates, flag) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            !isFlagInConflict(
                coordinates,
                flags.filter((f) => f.id !== flag.id),
                config.flagVisibilityRadius
            ) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            flag.coordinates = coordinates;
            setFlags([...flags.filter((f) => f.id !== flag.id), ...[flag]]);
        } else {
            toast.error(FLAG_ERROR_MESSAGE);
        }

        socket.emit('moveFlag', {
            coordinates: flag.coordinates,
            flagId: flag.id,
        });
    };

    const deleteFlag = (flag) => {
        setFlags(flags.filter((f) => f.id !== flag.id));
        socket.emit('deleteFlag', flag.id);
    };

    const deleteAllFlags = () => {
        socket.emit('deleteAllFlags');
    };

    const captureFlag = (flagId, teamId) => {
        socket.emit('captureFlag', { flagId, teamId: parseInt(teamId) });
    };

    const resetFlag = (flagId) => {
        socket.emit('resetFlag', flagId);
    };

    return (
        <FlagContext.Provider
            value={{
                flags,
                setFlags,
                showFlags,
                setShowFlags,
                createFlag,
                createRandomFlags,
                moveFlag,
                deleteFlag,
                deleteAllFlags,
                captureFlag,
                resetFlag,
            }}
        >
            {children}
        </FlagContext.Provider>
    );
};

export const useFlags = () => useContext(FlagContext);
