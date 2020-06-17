import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import {Button, Text} from 'native-base';

import {Actions} from 'react-native-router-flux';

import {useAuth} from '../../utils/auth';
import {stylesSigninSignup, stylesGame} from '../../css/style';
import {Popup} from '../Toast';
import Toast from 'react-native-root-toast';

/**
 * Composant Signin :
 * Page de connexion au serveur central
 */
const Signin = () => {
  const {signin} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    signin({username, password}, setError);
  };

  const exit = () => {
    (Actions.currentScene === 'Signin' || Actions.currentScene === 'Menu') &&
      BackHandler.exitApp();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exit);
  }, []);

  error !== '' &&
    Popup(error, 'rgba(255,0,0,0.5)', Toast.positions.TOP) &&
    setError('');

  return (
    <View style={stylesSigninSignup.container}>
      <Text style={stylesGame.gameText}>Connexion</Text>
      <TextInput
        style={stylesSigninSignup.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setUsername(e)}
      />
      <TextInput
        style={stylesSigninSignup.input}
        secureTextEntry={true}
        placeholder="Mot de passe"
        placeholderTextColor="#D2D2D2"
        autoCapitalize="none"
        onChangeText={e => setPassword(e)}
      />
      <TouchableOpacity
        style={stylesSigninSignup.submitButton}
        onPress={handleSubmit}>
        <Text style={stylesSigninSignup.submitButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text style={stylesSigninSignup.textRegister}>
        Pas encore inscrit ?{' '}
        <Text
          style={stylesSigninSignup.btnRegisterColor}
          onPress={() => {
            Actions.Signup();
          }}>
          S'inscrire
        </Text>
      </Text>
    </View>
  );
};

export default Signin;
