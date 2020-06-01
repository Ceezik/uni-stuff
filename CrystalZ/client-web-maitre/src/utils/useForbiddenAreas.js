import React, { useState, createContext, useContext } from 'react';
import _ from 'lodash';
import { useSocket } from './useSocket';

const ForbiddenAreaContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des zones interdites
 * partout dans le code
 */
export const ForbiddenAreaProvider = ({ children }) => {
    const [forbiddenAreas, setForbiddenAreas] = useState([]);
    const [forbiddenAreaIndex, setForbiddenAreaIndex] = useState(null);
    const { socket } = useSocket();

    const createForbiddenArea = () => {
        socket.emit('createArea', true);
        setForbiddenAreaIndex(forbiddenAreas.length);
    };

    const createForbiddenAreaPoint = (coordinates) => {
        const newFA = _.cloneDeep(forbiddenAreas);

        newFA[forbiddenAreaIndex].coordinates[0].push(coordinates);
        setForbiddenAreas(newFA);
        socket.emit('moveArea', {
            coordinates: newFA[forbiddenAreaIndex].coordinates,
            areaId: newFA[forbiddenAreaIndex].id,
        });
    };

    const moveForbiddenArea = (coordinates, point, areaId) => {
        const newFA = _.cloneDeep(forbiddenAreas);
        const pos = _.findIndex(newFA, (a) => a.id === areaId);
        const index = _.findIndex(
            newFA[pos].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );
        newFA[pos].coordinates[0].splice(index, 1, coordinates);
        setForbiddenAreas(newFA);
        socket.emit('moveArea', {
            coordinates: newFA[pos].coordinates,
            areaId,
        });
    };

    const deleteForbiddenAreaPoint = (point, areaId) => {
        const newFA = _.cloneDeep(forbiddenAreas);
        const pos = _.findIndex(newFA, (a) => a.id === areaId);
        _.remove(
            newFA[pos].coordinates[0],
            (c) => c[0] === point[0] && c[1] === point[1]
        );
        setForbiddenAreas(newFA);
        socket.emit('moveArea', {
            coordinates: newFA[pos].coordinates,
            areaId,
        });
    };

    const deleteForbiddenArea = (id) => {
        socket.emit('deleteArea', id);
    };

    const deleteForbiddenAreas = () => {
        socket.emit('deleteForbiddenAreas');
    };

    return (
        <ForbiddenAreaContext.Provider
            value={{
                forbiddenAreas,
                setForbiddenAreas,
                forbiddenAreaIndex,
                setForbiddenAreaIndex,
                createForbiddenArea,
                createForbiddenAreaPoint,
                moveForbiddenArea,
                deleteForbiddenAreaPoint,
                deleteForbiddenArea,
                deleteForbiddenAreas,
            }}
        >
            {children}
        </ForbiddenAreaContext.Provider>
    );
};

export const useForbiddenAreas = () => useContext(ForbiddenAreaContext);
