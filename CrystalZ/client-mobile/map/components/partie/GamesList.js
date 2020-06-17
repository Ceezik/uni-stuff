import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'native-base';

import {stylesGame} from '../../css/style';
import moment from 'moment';

/**
 * Composant GamesList :
 * Liste des parties
 *
 * props :
 *   - games : Parties à afficher
 *   - handleGame : Action à réaliser au clic sur la partie (Fonction vide par défaut)
 *   - myGames : Booléen à true si on affiche les parties d'un joueur (false par défaut)
 */
const GamesList = ({games, handleGame = () => {}, myGames = false}) => {
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={games}
        renderItem={({item}) => (
          <>
            <Text
              style={stylesGame.item}
              onPress={() => handleGame(item.id, item.ip, item.port, item)}>
              <Text>
                <Text style={stylesGame.gameNameText}>
                  {item.name} - {}
                </Text>
                <Text style={stylesGame.gameModeText}>{item.gameMode}</Text>
              </Text>
              <Text style={stylesGame.textSecondary}>
                {myGames &&
                  (item.launched
                    ? '\nPartie en cours'
                    : item.willLaunchAt
                    ? `\nPartie planifiée le ${moment(item.willLaunchAt).format(
                        'DD/MM/YYYY à HH:00',
                      )}`
                    : '\nEn attente de joueurs')}
              </Text>
            </Text>
          </>
        )}
      />
    </View>
  );
};

export default GamesList;
