import React, { useState, createContext, useContext } from 'react';
import _ from 'lodash';
import { useSocket } from './useSocket';

const GameAreaContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion de la zone de jeu
 * partout dans le code
 */
export const GameAreaProvider = ({ children }) => {
    const [gameAreas, setGameAreas] = useState([]);
    const { socket } = useSocket();

    const createGameAreaPoint = (coordinates) => {
        const newGA = _.cloneDeep(gameAreas);

        newGA[0].coordinates[0].push(coordinates);
        setGameAreas(newGA);
        socket.emit('moveArea', {
            coordinates: newGA[0].coordinates,
            areaId: newGA[0].id,
        });
    };

    const moveGameArea = (coordinates, point) => {
        const newGA = _.cloneDeep(gameAreas);
        const index = _.findIndex(
            newGA[0].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );

        newGA[0].coordinates[0].splice(index, 1, coordinates);
        setGameAreas(newGA);
        socket.emit('moveArea', {
            coordinates: newGA[0].coordinates,
            areaId: newGA[0].id,
        });
    };

    const deleteGameAreaPoint = (point, areaId) => {
        const newGA = _.cloneDeep(gameAreas);
        const pos = _.findIndex(newGA, (a) => a.id === areaId);
        _.remove(
            newGA[pos].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );
        setGameAreas(newGA);
        socket.emit('moveArea', {
            coordinates: newGA[pos].coordinates,
            areaId,
        });
    };

    const deleteGameAreas = () => {
        socket.emit('moveArea', {
            coordinates: [],
            areaId: gameAreas[0].id,
        });
    };

    return (
        <GameAreaContext.Provider
            value={{
                gameAreas,
                setGameAreas,
                createGameAreaPoint,
                moveGameArea,
                deleteGameAreaPoint,
                deleteGameAreas,
            }}
        >
            {children}
        </GameAreaContext.Provider>
    );
};

export const useGameAreas = () => useContext(GameAreaContext);
