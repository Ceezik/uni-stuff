import React, { useState, createContext, useContext } from 'react';

const TeamContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des équipes
 * partout dans le code
 */
export const TeamProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    return (
        <TeamContext.Provider value={{ teams, setTeams }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeams = () => useContext(TeamContext);
