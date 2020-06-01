import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import {useConfig} from '../../utils/config';
import {stylesMap, stylesSigninSignup} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';
import SelectedItemButtons from './SelectedItemButtons';
import SelectedItemButtonsInstallation from './SelectedItemButtonsInstallation';
import {DESC_ITEMS} from '../../utils/descriptions';
import ConfigureItem from './ConfigureItem';
import ConfigurePortail from './ConfigurePortail';

const SelectedItem = ({
  item,
  setSelectedItem,
  setVisible,
  flags,
  playerTeam,
  setCoordsFlag,
  installation,
  setInstallation,
  transferedItem,
  selectedAllie,
  setSelectedAllie,
  setTransferedItem,
}) => {
  const img = item && getItemIcon(item.name);

  useEffect(() => {
    setInstallation(false);
  }, [item]);

  return (
    <View style={stylesMap.selectedItemBox}>
      <View style={[stylesMap.inventorySelectedItem]}>
        {item && <Image source={img} style={stylesMap.selectedItemImage} />}
      </View>
      {item &&
        (installation ? (
          item.name === 'Portail de transfert' ? (
            <View style={{flex: 1, flewDirection: 'column'}}>
              <ConfigurePortail
                item={item}
                setSelectedItem={setSelectedItem}
                setVisible={setVisible}
                playerTeam={playerTeam}
                setInstallation={setInstallation}
                transferedItem={transferedItem}
                selectedAllie={selectedAllie}
                setSelectedAllie={setSelectedAllie}
                setTransferedItem={setTransferedItem}
              />
            </View>
          ) : (
            <View style={{flex: 1, flewDirection: 'column'}}>
              <ConfigureItem
                item={item}
                setSelectedItem={setSelectedItem}
                setVisible={setVisible}
                playerTeam={playerTeam}
                setInstallation={setInstallation}
              />
            </View>
          )
        ) : (
          <View style={{flex: 1, flewDirection: 'column'}}>
            <View
              style={{
                width: Dimensions.get('window').width * 0.6,
                marginLeft: 10,
              }}>
              <Text style={stylesMap.itemName}> {item.name}</Text>
              <Text style={stylesMap.itemDescription}>
                {DESC_ITEMS[item.name]}
              </Text>
            </View>
            <SelectedItemButtons
              item={item}
              setSelectedItem={setSelectedItem}
              setVisible={setVisible}
              flags={flags}
              playerTeam={playerTeam}
              installation={installation}
              setInstallation={setInstallation}
              setCoordsFlag={setCoordsFlag}
            />
          </View>
        ))}
    </View>
  );
};

export default SelectedItem;
