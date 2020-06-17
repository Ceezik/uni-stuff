import React, {createContext, useState, useContext} from 'react';

const ConfigContext = createContext();

/**
 * Contexte de la configuration
 */
export const ConfigProvider = ({children}) => {
  const [config, setConfig] = useState(null);

  return (
    <ConfigContext.Provider value={{config, setConfig}}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
