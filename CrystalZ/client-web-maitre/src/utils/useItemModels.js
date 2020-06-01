import React, { useState, createContext, useContext, useEffect } from 'react';
import { useSocket } from './useSocket';

const ItemModelContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des modèles d'item
 * partout dans le code
 */
export const ItemModelProvider = ({ children }) => {
    const [itemModels, setItemModels] = useState([]);
    const { socket } = useSocket();

    useEffect(() => {
        socket.on('getItemModels', (im) => setItemModels(im));
    }, []);

    return (
        <ItemModelContext.Provider value={{ itemModels, setItemModels }}>
            {children}
        </ItemModelContext.Provider>
    );
};

export const useItemModels = () => useContext(ItemModelContext);
