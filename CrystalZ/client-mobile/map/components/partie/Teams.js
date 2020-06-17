import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import _ from 'lodash';

import TeamItem from './TeamItem';

import {stylesGame} from '../../css/style';
import {Actions} from 'react-native-router-flux';
import {Text} from 'native-base';

import {stylesSigninSignup} from '../../css/style';
import {useSocket} from '../../utils/socket';
import {useAuth} from '../../utils/auth';
import {useConfig} from '../../utils/config';
import Loader from '../Loader';
import moment from 'moment';
import BackButton from '../BackButton';
import {Popup} from '../Toast';

/**
 * Composant Teams :
 * Affiche la page de toutes les équipes (Lobby d'une partie)
 */
const Teams = () => {
  const [gameStarted, setGameStarted] = useState(null);
  const [teams, setTeams] = useState(null);
  const [playerTeam, setPlayerTeam] = useState(null);
  const [finish, setFinish] = useState(false);
  const {setConfig, config} = useConfig();
  const {user} = useAuth();
  const {socket} = useSocket();

  useEffect(() => {
    config &&
      !finish &&
      config.ended &&
      (Actions.Menu(),
      Popup('Cette partie est terminée', 'rgba(255,0,0,0.5)', -70),
      setFinish(true));
  }, [config]);

  const checkStart = () => {
    socket.on('getConfig', config => {
      setGameStarted(config.launched);
      setConfig(config);
    });
    socket.emit('getConfig');
  };

  useEffect(() => {
    gameStarted || checkStart();
    socket.on('getTeams', t => {
      setTeams(t);
    });

    return () => {
      socket && socket.connected && socket.close();
    };
  }, []);

  useEffect(() => {
    let team = null;
    teams &&
      teams.map(t =>
        t.players.map(p => p.username === user.username && (team = t)),
      );
    setPlayerTeam(team);
  }, [teams]);

  teams || (socket.emit('getTeams') && socket.emit('addTeamPlayer'));

  return teams ? (
    <>
      <View style={[stylesGame.container, {flex: 1}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <BackButton />
          <Text style={[stylesGame.gameText, {marginLeft: 20}]}>Equipes</Text>
        </View>

        <ScrollView>
          {_.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(team => {
            return (
              config &&
              (playerTeam && team.id === playerTeam.id ? (
                <TeamItem team={team} playerTeam />
              ) : (
                <TeamItem team={team} />
              ))
            );
          })}
        </ScrollView>
        <View>
          {gameStarted || (
            <Text style={[stylesSigninSignup.submitButtonText]}>
              {config && config.willLaunchAt
                ? `Le maître du jeu a planifié la partie.\nCelle-ci débutera le ${moment(
                    config.willLaunchAt,
                  ).format('DD/MM/YYYY à HH:00')}`
                : "Le maître du jeu n'a pas encore lancé la partie.\nVeuillez patienter !"}
            </Text>
          )}
          <TouchableOpacity
            style={[
              stylesSigninSignup.submitButton,
              {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
            ]}
            onPress={() => Actions.Map({playerTeam})}>
            <Text style={{color: 'white'}}>Accéder à la carte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : (
    <Loader />
  );
};

export default Teams;
