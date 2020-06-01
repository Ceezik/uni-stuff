import React from 'react';
import {View, Text} from 'react-native';
import {stylesGame, stylesMap} from '../../css/style';

const StatItem = ({name, value}) => {
  return (
    <View style={stylesGame.item}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            stylesGame.gameNameText,
            {
              marginLeft: 10,
            },
          ]}>
          {name}
        </Text>

        <Text style={[stylesMap.score]}>{value}</Text>
      </View>
    </View>
  );
};

export default StatItem;
