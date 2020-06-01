import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useConfig} from '../../utils/config';
import InventoryItem from './InventoryItem';
import {usePlayer} from '../../utils/player';
import AlliesList from './AlliesList';

const Inventory = ({
  selectedItem,
  setSelectedItem,
  inventorySize,
  installation,
  setTransferedItem,
  transferedItem,
  playerTeam,
  setSelectedAllie,
}) => {
  const {config} = useConfig();
  const {player} = usePlayer();

  const portailInstallation =
    selectedItem &&
    selectedItem.name === 'Portail de transfert' &&
    installation;
  let emptySlots = [];

  if (!portailInstallation) {
    for (var i = 0; i < inventorySize - player.inventory.length; i++) {
      emptySlots.push(<InventoryItem setSelectedItem={setSelectedItem} />);
    }
  }

  const styleAllies = transferedItem ? {marginTop: 40} : {};
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
        }}>
        {transferedItem ? (
          <AlliesList
            playerTeam={playerTeam}
            setSelectedAllie={setSelectedAllie}
          />
        ) : (
          player &&
          player.inventory.map(
            item =>
              (!portailInstallation ||
                (item.id !== selectedItem.id && !item.equiped)) && (
                <InventoryItem
                  item={item}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  portailInstallation={portailInstallation}
                  setTransferedItem={setTransferedItem}
                />
              ),
          )
        )}
        {emptySlots}
      </View>
    </ScrollView>
  );
};

export default Inventory;
