import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useSocket} from '../../utils/socket';
import {Actions} from 'react-native-router-flux';
import {stylesSigninSignup, stylesMap} from '../../css/style';
import {Popup} from '../Toast';
import {useAuth} from '../../utils/auth';
import request from '../../utils/request';

/**
 * Composant MapVisitedButtons :
 * Affiche les boutons d'actions lors de la prévisualisation d'une partie publique
 *
 * props :
 *  gameId : Identifiant de la partie publique
 */
const MapVisitedButtons = ({gameId}) => {
  const {socket, setSocket} = useSocket();
  const {user} = useAuth();

  const backToGames = () => {
    Actions.pop();
    socket.close();
    setSocket(null);
  };

  const sendDemand = () => {
    request
      .post(`/games/${gameId}/invitations`, {userId: user.id})
      .then(res => {
        socket.emit('getInvitations');
        Popup('Demande envoyée', 'rgba(0,255,0,0.5)', -70);
        Actions.replace('Menu');
      })
      .catch(err => {
        if (err.response.status === 409)
          Popup('Demande déjà envoyée', 'rgba(255, 0,0,0.5)', -70);
        else Popup('Une erreur est survenue', 'rgba(255, 0,0,0.5)', -70);
      });
  };

  return (
    <View style={stylesMap.btnInvitation}>
      <TouchableOpacity
        style={[
          stylesSigninSignup.submitButton,
          {backgroundColor: '#EB4646', marginRight: 10},
        ]}
        onPress={() => backToGames()}>
        <Text style={{color: 'white'}}> Retour </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[stylesSigninSignup.submitButton]}
        onPress={() => sendDemand()}>
        <Text style={{color: 'white'}}> Envoyer une demande </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapVisitedButtons;
