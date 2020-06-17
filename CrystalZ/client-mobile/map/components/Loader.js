import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, Text} from 'native-base';
import {stylesGame} from '../css/style';

/**
 * Composant Loader :
 * Loader d'attente
 */
const Loader = () => {
  return (
    <View style={stylesGame.container}>
      <View style={stylesGame.loader}>
        <ActivityIndicator size={80} color="#6FC186" />

        <Text
          style={[stylesGame.gameText, {alignSelf: 'center', marginLeft: -7}]}>
          Crystal
          <Text style={{color: '#6FC186', fontSize: 30}}>Z</Text>
        </Text>
      </View>
    </View>
  );
};

export default Loader;
