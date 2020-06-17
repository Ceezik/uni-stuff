import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSocket} from '../../utils/socket';
import {stylesSigninSignup} from '../../css/style';
import {usePlayer} from '../../utils/player';
import {Popup} from '../Toast';

/**
 * Composant SelectedItemButtons :
 * Affiche le menu de configuration d'un piège ou du portail
 *
 * props :
 *   - item : item sélectionné
 *   - delay : Délai d'activation du piège à configuré
 *   - setSelectedItem : Setter de la variable item
 *   - setVisible : Setter de la variable spécifiant si la modalInventory est ouverte ou non
 *   - setInstallation : Setter de la variable installation
 *   - transferedItem : Item à transférer via le portail
 *   - setTransferedItem : Setter de la variable transferedItem
 *   - selectedAllie : Allié séletionné pour le portail
 *   - portail : Booleen à true si on configure le portail (false par défaut)
 */
const SelectedItemButtonsInstallation = ({
  item,
  delay,
  setSelectedItem,
  setVisible,
  setInstallation,
  transferedItem,
  setTransferedItem = () => {},
  selectedAllie = null,
  portail = false,
}) => {
  const {socket} = useSocket();
  const {player} = usePlayer();

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
        Popup('Item transféré', 'rgba(0, 255, 0, 0.5)');
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
      {(!portail || (portail && selectedAllie)) && (
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
      )}
    </View>
  );
};

export default SelectedItemButtonsInstallation;
