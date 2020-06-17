import React from 'react';
import {usePlayer} from '../../utils/player';
import {View, Image} from 'react-native';
import {stylesMap} from '../../css/style';

const TrapIndicator = () => {
  const {player} = usePlayer();

  return (
    <View style={[stylesMap.trapIndicator, {flex: 1, flexDirection: 'column'}]}>
      {player && player.immobilizedUntil && (
        <Image
          source={require('../../img/items/canonPhotons.gif')}
          style={{width: 40, height: 40}}
          resizeMode="contain"
        />
      )}
      {player && player.visibilityChange.some(change => change.percent < 0) && (
        <Image
          source={require('../../img/items/intercepteur.gif')}
          style={{width: 40, height: 40}}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default TrapIndicator;
