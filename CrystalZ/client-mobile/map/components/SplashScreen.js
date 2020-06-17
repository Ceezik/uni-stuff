import React, {useEffect} from 'react';
import request from '../utils/request';
import Loader from './Loader';
import {Actions} from 'react-native-router-flux';
import {useAuth} from '../utils/auth';

function SplashScreen() {
  const {setUser} = useAuth();

  useEffect(() => {
    request
      .get('/user')
      .then(res => {
        setUser(res.data);
        Actions.Menu();
      })
      .catch(() => Actions.Signin());
  }, []);

  return <Loader />;
}

export default SplashScreen;
