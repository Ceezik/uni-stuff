import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import TeamItem from '../partie/TeamItem';
import _ from 'lodash';
import {useConfig} from '../../utils/config';
import {Actions} from 'react-native-router-flux';
import PersonalScore from './PersonalScore';
import {useSocket} from '../../utils/socket';
import {usePlayer} from '../../utils/player';

/**
 * Composant EndGame :
 * Ecran de fin de partie
 *
 * props :
 *   - playerTeam : Equipe du joueur connecté
 */
const EndGame = ({playerTeam}) => {
  const {config} = useConfig();
  const {socket} = useSocket();
  const {player, setPlayer} = usePlayer();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    socket.on('getTeams', t => setTeams(t));
    socket.on('getPlayer', p => setPlayer(p));
    socket.emit('getTeams');
    socket.emit('getPlayerByUsername', player.username);
  }, []);

  return (
    <View style={stylesSigninSignup.container}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: Dimensions.get('window').width * 0.35,
          }}>
          {_.some(config.winners, {id: playerTeam.id}) ? (
            config.winners.length === 1 ? (
              <Text
                style={[
                  stylesMap.titleModal,
                  {fontSize: 30, color: '#68B684'},
                ]}>
                Victoire
              </Text>
            ) : (
              <Text
                style={[
                  stylesMap.titleModal,
                  {fontSize: 30, color: '#D2D2D2'},
                ]}>
                Egalité
              </Text>
            )
          ) : (
            <Text style={[stylesMap.titleModal, {fontSize: 30, color: 'red'}]}>
              Défaite
            </Text>
          )}
        </View>
        <PersonalScore player={player} />
        <ScrollView style={[stylesMap.scrollView, {top: 165}]}>
          {teams.length > 0 &&
            _.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(team => {
              return team.id === playerTeam.id ? (
                <TeamItem
                  team={team}
                  score={true}
                  mode={config.gameMode}
                  playerTeam
                />
              ) : (
                <TeamItem team={team} score={true} mode={config.gameMode} />
              );
            })}
        </ScrollView>
        <TouchableOpacity
          style={[
            stylesSigninSignup.submitButton,

            {
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 0,
              marginTop: 100,
            },
          ]}
          onPress={() => Actions.Menu()}>
          <Text style={{color: 'white'}}>Retour au menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EndGame;
