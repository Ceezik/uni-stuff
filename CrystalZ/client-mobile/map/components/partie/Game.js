import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import request from '../../utils/request';
import {getData} from '../../utils/asyncStorage';
import {Actions} from 'react-native-router-flux';
import io from 'socket.io-client';
import {useAuth} from '../../utils/auth';
import RefreshView from '../RefreshView';
import {stylesGame} from '../../css/style';
import {useSocket} from '../../utils/socket';
import PrivateGame from './PrivateGame';
import {Popup} from '../Toast';
import GamesList from './GamesList';
import Loader from '../Loader';

const Game = () => {
  const {user} = useAuth();
  const {socket, setSocket} = useSocket();

  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    request
      .get('/games', {
        headers: {
          Authorization: 'Bearer ' + getData('token'),
        },
      })
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleGame = (gameId, ip, port) => {
    request
      .post(`/games/${gameId}/invitations`, {userId: user.id})
      .then(res => {
        const socketIo = require('socket.io-client');
        const s = socketIo(`http://${ip}:${port}`);
        s.emit('getInvitations');
        Popup('Demande envoyée', 'rgba(0,255,0,0.5)', -70);
      })
      .catch(err => {
        if (err.response.status === 409)
          Popup('Demande déjà envoyée', 'rgba(255, 0,0,0.5)', -70);
        else Popup('Une erreur est survenue', 'rgba(255, 0,0,0.5)', -70);
      });
  };

  const onRefresh = () => {
    request
      .get('/games')
      .then(res => {
        setGames(res.data);
      })
      .catch(err => {
        console.log(err);
        Popup('Une erreur est survenue', 'rgba(255, 0,0,0.5)', -70);
      });
  };

  return (
    <RefreshView refresh={onRefresh} refreshableMod="advanced">
      <View style={stylesGame.container}>
        <PrivateGame handleGame={handleGame} />
        <View>
          <Text style={stylesGame.gameText}>Parties publiques</Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Text>{error.message}</Text>
          ) : games && games.length > 0 ? (
            <GamesList games={games} handleGame={handleGame} />
          ) : (
            <Text style={stylesGame.textSecondary}>
              Aucune partie publique en cours
            </Text>
          )}
        </View>
      </View>
    </RefreshView>
  );
};

export default Game;
