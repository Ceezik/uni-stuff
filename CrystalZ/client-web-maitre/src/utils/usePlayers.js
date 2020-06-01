import React, { useState, createContext, useContext } from 'react';

const PlayerContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des joueurs
 * partout dans le code
 */
export const PlayerProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    return (
        <PlayerContext.Provider value={{ players, setPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayers = () => useContext(PlayerContext);
