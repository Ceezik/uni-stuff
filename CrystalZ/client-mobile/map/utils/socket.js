import React, {createContext, useState, useContext} from 'react';

const SocketContext = createContext();

/**
 * Contexte de la connexion à un serveur de jeu
 */
export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
