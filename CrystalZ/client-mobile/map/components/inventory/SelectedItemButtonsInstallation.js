import React from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import {useSocket} from '../../utils/socket';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {usePlayer} from '../../utils/player';
import {useConfig} from '../../utils/config';

const SelectedItemButtonsInstallation = ({
  item,
  delay,
  setSelectedItem,
  setVisible,
  setInstallation,
  transferedItem,
  setTransferedItem,
  selectedAllie,
  portail = false,
}) => {
  const {socket} = useSocket();
  const {config} = useConfig();
  const {player} = usePlayer();

  console.log('Item', transferedItem);
  console.log('Allié', selectedAllie);
  console.log('Portail', portail);
  const useItem = () => {
    switch (item.name) {
      case 'Canon à photons':
        socket.emit('useCanon', {
          id: item.id,
          coordinates: player.coordinates,
          delay: delay * 60,
        });
        break;
      case 'Transducteur':
        socket.emit('useTransducteur', {
          id: item.id,
          coordinates: player.coordinates,
          delay: delay * 60,
        });
        break;
      case 'Portail de transfert':
        socket.emit('usePortailTransfert', {
          id: item.id,
          username: selectedAllie.username,
          itemId: transferedItem.id,
        });
        break;
    }

    setVisible(false);
    setInstallation(false);
    setSelectedItem(null);
    setTransferedItem(null);
  };

  return (
    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <TouchableOpacity
        onPress={() =>
          transferedItem ? setTransferedItem(null) : setInstallation(false)
        }
        style={[
          stylesSigninSignup.submitButton,
          {backgroundColor: '#EB4646', width: 80, marginRight: 25},
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Annuler
        </Text>
      </TouchableOpacity>
      {!portail ||
        (portail && selectedAllie && (
          <TouchableOpacity
            onPress={() => useItem()}
            style={[
              stylesSigninSignup.submitButton,
              {width: 80, marginRight: 10},
            ]}>
            <Text
              style={[
                stylesSigninSignup.submitButtonText,
                {textAlign: 'center'},
              ]}>
              Valider
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default SelectedItemButtonsInstallation;
