import React from 'react';
import {Marker} from 'react-native-maps';
import {Image} from 'react-native';
import {useSocket} from '../../utils/socket';
import {useConfig} from '../../utils/config';
import {Popup} from '../Toast';
import {usePlayer} from '../../utils/player';

export const getItemIcon = name => {
  switch (name) {
    case 'Sentinelle':
      return require('../../img/items/sentinelle.png');
    case 'Canon à photons':
      return require('../../img/items/canonPhotons.gif');
    case 'Antenne':
      return require('../../img/items/antenne.png');
    case 'Sonde':
      return require('../../img/items/sonde.png');
    case 'Portail de transfert':
      return require('../../img/items/portail.png');
    case 'Disloqueur':
      return require('../../img/items/disloqueur.png');
    case 'Intercepteur':
      return require('../../img/items/intercepteur.gif');
    case 'Noyau protecteur':
      return require('../../img/items/noyau.png');
    case 'Oracle':
      return require('../../img/items/oracle.png');
    case 'Tempête':
      return require('../../img/items/tempete.png');
    case 'Transducteur':
      return require('../../img/items/transducteur.gif');
    case 'Transporteur':
      return require('../../img/items/transporteur.png');
    default:
      return require('../../img/unknown.png');
  }
};

/**
 * Composant ItemList :
 * Crée les marqueurs des items
 *
 * props :
 *   - items : Items à afficher
 *   - isImmobilized : Booleen à true si le joueur est victime d'un canon
 */
const ItemList = ({items, isImmobilized}) => {
  return items.map(item => (
    <ItemMarker item={item} isImmobilized={isImmobilized} />
  ));
};

const Item = ({item, isImmobilized}) => {
  const img = getItemIcon(item.name);
  const {socket} = useSocket();
  const {config} = useConfig();
  const {player} = usePlayer();

  const inventorySize =
    player &&
    (player.hasTransporteur ? config.inventorySize * 2 : config.inventorySize);

  const takeItem = item => {
    item.waitingUntil
      ? Popup('Item indisponible ...')
      : player.inventory.length === inventorySize
      ? Popup('Votre inventaire est plein')
      : socket.emit('takeItem', item.id) &&
        Popup('Récupération ...', 'rgba(0, 255, 0, 0.3)');
  };

  return (
    <Marker
      onPress={() => isImmobilized() || takeItem(item)}
      coordinate={{
        latitude: item.coordinates[0],
        longitude: item.coordinates[1],
      }}>
      <Image source={img} />
    </Marker>
  );
};

const ItemMarker = React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item.nbUpdates === nextProps.item.nbUpdates;
});

export default ItemList;
