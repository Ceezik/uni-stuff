import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {stylesMap} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';

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
