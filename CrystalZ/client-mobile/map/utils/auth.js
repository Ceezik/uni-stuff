import React, {useState, createContext, useContext} from 'react';
import request from './request';
import {storeData, removeItem} from './asyncStorage';
import {Actions} from 'react-native-router-flux';

const AuthContext = createContext();

/**
 * Contexte d'authentification
 */
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signin = (credentials, setError) => {
    return request
      .post('/signin', credentials)
      .then(res => {
        storeData('token', res.data.token);
        setUser(res.data.user);
        Actions.Menu();
      })
      .catch(err => {
        if (err.response.status === 401) setError('Mauvais identifiants');
        else setError('Une erreur est survenue');
      });
  };

  const signup = (credentials, setError) => {
    return request
      .post('/signup', credentials)
      .then(res => {
        storeData('token', res.data.token);
        setUser(res.data.user);
        Actions.Menu();
      })
      .catch(err => {
        if (err.response.status === 409)
          setError("Ce nom d'utilisateur existe déjà");
        else setError('Une erreur est survenue');
      });
  };

  const signout = () => {
    removeItem('token');
    setUser(null);
    Actions.Signin();
  };

  return (
    <AuthContext.Provider value={{user, setUser, signin, signup, signout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
