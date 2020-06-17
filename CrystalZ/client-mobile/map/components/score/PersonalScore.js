import React from 'react';
import {Text} from 'native-base';
import {stylesGame, stylesMap} from '../../css/style';
import {View} from 'react-native';
import {secondsToDuration} from '../../utils/calcul';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';

import {useConfig} from '../../utils/config';

/**
 * Composant TeamItem :
 * Affiche le score personnel du joueur connecté
 *
 * props :
 *   - player : Joueur connecté
 */
const PersonalScore = ({player}) => {
  const {config} = useConfig();

  return (
    <View
      style={[
        stylesGame.item,
        {position: 'absolute', left: 10, right: 10, top: 75},
      ]}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={stylesGame.gameNameText}>
          {' '}
          <FontAwesomeIcon
            icon={faUserAlt}
            size={22}
            style={{color: 'white'}}
          />
          {} {player.username}
        </Text>

        <Text style={stylesMap.score}>
          {' '}
          {config.gameMode === 'TIME'
            ? secondsToDuration(player.statistics.score)
            : player.statistics.score}
        </Text>
      </View>
    </View>
  );
};

export default PersonalScore;
