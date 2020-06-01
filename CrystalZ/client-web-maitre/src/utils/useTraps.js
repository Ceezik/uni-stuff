import React, { useState, createContext, useContext } from 'react';
import { useSocket } from './useSocket';
import { useForbiddenAreas } from './useForbiddenAreas';
import { isInForbiddenAreas, isInGameAreas } from './map';
import { useGameAreas } from './useGameAreas';

const TrapContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des pièges
 * partout dans le code
 */
export const TrapProvider = ({ children }) => {
    const [traps, setTraps] = useState([]);
    const { socket } = useSocket();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const moveTrap = (coordinates, trap) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            trap.coordinates = coordinates;
            setTraps([...traps.filter((t) => t.id !== trap.id), ...[trap]]);
        }

        socket.emit('moveTrap', {
            coordinates: trap.coordinates,
            trapId: trap.id,
        });
    };

    const deleteTrap = (trap) => {
        setTraps(traps.filter((t) => t.id !== trap.id));
        socket.emit('deleteTrap', trap.id);
    };

    return (
        <TrapContext.Provider
            value={{
                traps,
                setTraps,
                moveTrap,
                deleteTrap,
            }}
        >
            {children}
        </TrapContext.Provider>
    );
};

export const useTraps = () => useContext(TrapContext);
