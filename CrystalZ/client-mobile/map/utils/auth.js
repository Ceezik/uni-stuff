import React, {useState, useEffect, createContext, useContext} from 'react';
import request from './request';
import {Text} from 'native-base';
import {storeData} from './asyncStorage';
import {Actions} from 'react-native-router-flux';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .get('/user')
      .then(res => {
        setUser(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        Actions.Signin();
      })
      .catch(err => {
        if (err.response.status === 409)
          setError("Ce nom d'utilisateur existe déjà");
        else setError('Une erreur est survenue');
      });
  };

  const signout = () => {
    storeData('token', null);
    setUser(null);
    Actions.Signin();
  };

  return (
    <AuthContext.Provider value={{user, signin, signup, signout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
