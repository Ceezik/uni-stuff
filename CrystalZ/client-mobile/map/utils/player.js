import React, {createContext, useState, useContext} from 'react';

const PlayerContext = createContext();

/**
 * Contexte du joueur
 */
export const PlayerProvider = ({children}) => {
  const [player, setPlayer] = useState(null);

  return (
    <PlayerContext.Provider value={{player, setPlayer}}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
