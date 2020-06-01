import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import _ from 'lodash';

import TeamItem from './TeamItem';

import {stylesGame, stylesMap} from '../../css/style';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {Text} from 'native-base';

import {stylesSigninSignup} from '../../css/style';
import {useSocket} from '../../utils/socket';
import {useAuth} from '../../utils/auth';
import {useConfig} from '../../utils/config';
import Loader from '../Loader';
import moment from 'moment';
import BackButton from '../BackButton';

const Teams = () => {
  const [gameStarted, setGameStarted] = useState(null);
  const [teams, setTeams] = useState(null);
  const [playerTeam, setPlayerTeam] = useState(null);
  const {setConfig, config} = useConfig();
  const {user} = useAuth();
  const {socket} = useSocket();

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
              gameStarted || (config && config.willLaunchAt)
                ? stylesSigninSignup.submitButton
                : stylesSigninSignup.submitButtonDisabled,
              {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              },
            ]}
            onPress={() => Actions.Map({playerTeam})}
            disabled={!gameStarted && config && !config.willLaunchAt}>
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
