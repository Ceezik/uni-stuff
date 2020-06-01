import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {stylesGame} from '../../css/style';

const PrivateGame = ({handleGame}) => {
  const [key, setKey] = useState('');

  return (
    <View>
      <Text style={stylesGame.gameText}>Partie privée</Text>
      <View style={stylesGame.row}>
        <TextInput
          style={stylesGame.input1}
          placeholder="Clé d'accès"
          placeholderTextColor="#D2D2D2"
          autoCapitalize="none"
          onChangeText={e => setKey(e)}
        />
      </View>
      <TouchableOpacity
        style={stylesGame.submitButton}
        onPress={() => handleGame(key)}>
        <Text style={stylesGame.submitButtonText}>Demander l'accès</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrivateGame;
