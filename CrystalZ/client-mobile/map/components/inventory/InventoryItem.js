import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {stylesMap} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';

/**
 * Composant InventoryItem :
 * Affiche un item de l'inventaire du joueur
 *
 * props :
 *   - item : Item à afficher
 *   - selectedItem : item sélectionné
 *   - setSelectedItem : Setter de la variable item
 *   - portailInstallation : Booléen à true si on est en train de configurer le portail
 *   - setTransferedItem : Setter de la vairable spécifiant l'item à transférer
 */
const InventoryItem = ({
  item,
  selectedItem,
  setSelectedItem,
  portailInstallation,
  setTransferedItem,
}) => {
  const img = item && getItemIcon(item.name);
  return (
    <TouchableOpacity
      onPress={() =>
        portailInstallation
          ? setTransferedItem(item)
          : setSelectedItem(item || null)
      }>
      <View
        style={[
          stylesMap.inventoryItem,
          item &&
            item.equiped && {
              borderColor: '#68B684',
              borderStyle: 'solid',
              borderWidth: 1,
            },
          item &&
            selectedItem &&
            item.id === selectedItem.id && {backgroundColor: '#68B684'},
        ]}>
        {item && <Image source={img} style={stylesMap.itemImage} />}
      </View>
    </TouchableOpacity>
  );
};

export default InventoryItem;
