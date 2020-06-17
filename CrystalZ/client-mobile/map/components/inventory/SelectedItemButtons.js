import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSocket} from '../../utils/socket';
import {stylesSigninSignup} from '../../css/style';
import {Popup} from '../Toast';
import {usePlayer} from '../../utils/player';
import {useConfig} from '../../utils/config';
import {inRadius} from '../../utils/calcul';

/**
 * Composant SelectedItemButtons :
 * Affiche les actions faisables sur l'item sélectionné
 *
 * props :
 *   - item : item sélectionné
 *   - setSelectedItem : Setter de la variable item
 *   - setVisible : Setter de la variable spécifiant si la modalInventory est ouverte ou non
 *   - flags : Cristaux capturés sur la map
 *   - playerTeam : Equipe du joueur
 *   - setCoordsFlag : Setter de la variable specifiant les coordonnées du cristal affiché lors de l'utilisation de l'antenne
 *   - setInstallation : Setter de la variable installation
 */
const SelectedItemButtons = ({
  item,
  setSelectedItem,
  setVisible,
  flags,
  playerTeam,
  setInstallation,
  setCoordsFlag,
}) => {
  const {socket} = useSocket();
  const {config} = useConfig();
  const {player} = usePlayer();

  const EQUIPEMENTS = ['Sonde', 'Noyau protecteur'];
  const ITEMS = [
    'Transporteur',
    'Portail de transfert',
    'Tempête',
    'Sentinelle',
    'Oracle',
    'Disloqueur',
    'Intercepteur',
    'Antenne',
  ];
  const TRAPS = ['Canon à photons', 'Transducteur'];

  const dropItem = () => {
    socket.emit('dropItem', {id: item.id, coordinates: player.coordinates});
    setSelectedItem(null);
    setVisible(false);
    Popup('En cours ...', 'rgba(0,255,0,0.3)');
  };

  const useItem = () => {
    switch (item.name) {
      case 'Disloqueur':
        socket.emit('useDisloqueur', item.id);
        break;
      case 'Canon à photons':
        setInstallation(true);
        break;
      case 'Transducteur':
        setInstallation(true);
        break;
      case 'Portail de transfert':
        setInstallation(true);
        break;
      case 'Sonde':
        socket.emit('useSonde', item.id);
        break;
      case 'Tempête':
        socket.emit('useTempete', item.id);
        break;
      case 'Intercepteur':
        socket.emit('useIntercepteur', item.id);
        break;
      case 'Transporteur':
        socket.emit('useTransporteur', item.id);
        break;
      case 'Noyau protecteur':
        socket.emit('useNoyau', item.id);
        break;
      case 'Antenne':
        socket.emit('useAntenne', {id: item.id}, coords =>
          setCoordsFlag(coords),
        );
        break;
      case 'Sentinelle':
        socket.emit('useSentinelle', {
          id: item.id,
          flagId: inActionRadius().id,
        });
        break;
      case 'Oracle':
        socket.emit('useOracle', {id: item.id, flagId: inActionRadius().id});
        break;
    }
    item.name !== 'Canon à photons' &&
      item.name !== 'Transducteur' &&
      item.name !== 'Portail de transfert' &&
      (setVisible(false), setSelectedItem(null));
  };

  const unequipItem = () => {
    switch (item.name) {
      case 'Sonde':
        socket.emit('unequipSonde', item.id);
        break;
      case 'Noyau protecteur':
        socket.emit('unequipNoyau', item.id);
        break;
    }

    setVisible(false), setSelectedItem(null);
  };

  const inActionRadius = () => {
    let flag = null;
    let rank = 0;
    while (!flag && rank < flags.length) {
      inRadius(
        flags[rank].coordinates,
        player.coordinates,
        config.flagActionRadius,
      ) && flags[rank].team.id === playerTeam.id
        ? (flag = flags[rank])
        : rank++;
    }
    return flag;
  };

  const checkDisabled = () => {
    return (
      (player.hasTransporteur && item.name === 'Transporteur') ||
      (item.name === 'Sentinelle' && !inActionRadius()) ||
      (item.name === 'Oracle' &&
        (!inActionRadius() ||
          inActionRadius().capturedUntil ||
          inActionRadius().hasOracle)) ||
      (item.name === 'Portail de transfert' &&
        !player.inventory.some(
          itemInventory =>
            !itemInventory.equiped && itemInventory.id !== item.id,
        )) ||
      (item.name === 'Portail de transfert' &&
        !playerTeam.players.some(
          p => p.username !== player.username && checkInventorySize(p),
        )) ||
      player.immobilizedUntil
    );
  };

  const checkInventorySize = allie => {
    return allie.hasTransporteur
      ? allie.inventory.length < config.inventorySize * 2
      : allie.inventory.length < config.inventorySize;
  };

  return item.equiped ? (
    <View>
      <TouchableOpacity
        onPress={() => unequipItem()}
        style={[
          stylesSigninSignup.submitButton,
          {
            backgroundColor: '#EB4646',
            width: 80,
          },
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Retirer
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <TouchableOpacity
        onPress={() => dropItem()}
        style={[
          stylesSigninSignup.submitButton,
          {backgroundColor: '#EB4646', width: 80, marginRight: 25},
        ]}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          Déposer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => useItem()}
        style={[
          stylesSigninSignup.submitButton,
          {width: 80, marginRight: 10},
          checkDisabled() && {backgroundColor: 'grey'},
        ]}
        disabled={checkDisabled()}>
        <Text
          style={[stylesSigninSignup.submitButtonText, {textAlign: 'center'}]}>
          {EQUIPEMENTS.includes(item.name)
            ? 'Equiper'
            : TRAPS.includes(item.name)
            ? 'Installer'
            : ITEMS.includes(item.name)
            ? 'Utiliser'
            : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedItemButtons;
