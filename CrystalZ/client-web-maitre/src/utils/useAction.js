import React, { useState, createContext, useContext } from 'react';

const ActionContext = createContext();

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des actions
 * partout dans le code
 */
export const ActionProvider = ({ children }) => {
    const [action, setAction] = useState(null);
    const [sleepingAction, setSleepingAction] = useState(null);

    return (
        <ActionContext.Provider
            value={{ action, setAction, sleepingAction, setSleepingAction }}
        >
            {children}
        </ActionContext.Provider>
    );
};

export const useAction = () => useContext(ActionContext);
