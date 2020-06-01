import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {stylesMap} from '../../css/style';
import _ from 'lodash';
import {useConfig} from '../../utils/config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Inventory from './Inventory';
import SelectedItem from './SelectedItem';
import {usePlayer} from '../../utils/player';

const ModalInventory = ({
  visible,
  setVisible,
  setModal,
  flags,
  playerTeam,
  setCoordsFlag,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [installation, setInstallation] = useState(false);
  const [transferedItem, setTransferedItem] = useState(null);
  const [selectedAllie, setSelectedAllie] = useState(null);

  const {config} = useConfig();
  const {player} = usePlayer();

  console.log(playerTeam.players);
  useEffect(() => {
    !transferedItem && setSelectedAllie(null);
  }, [transferedItem]);

  useEffect(() => {
    !visible && setTransferedItem(null);
  }, [visible]);
  selectedItem &&
    !_.some(player.inventory, {id: selectedItem.id}) &&
    setSelectedItem(null);

  const inventorySize =
    player && player.hasTransporteur
      ? config.inventorySize * 2
      : config.inventorySize;

  const modalInventorySize = selectedItem
    ? (Dimensions.get('window').height *
        (70 - Math.ceil(inventorySize / 6) * 10)) /
      100
    : (Dimensions.get('window').height *
        (92 - Math.ceil(inventorySize / 6) * 10)) /
      100;
  return (
    <View>
      <Modal
        isVisible={visible}
        style={[
          stylesMap.modal,
          {
            marginTop: modalInventorySize,
          },
        ]}
        onBackdropPress={() => setModal(false)}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: 10,
            }}>
            <Text style={stylesMap.titleModal}>Inventaire</Text>
            <TouchableOpacity
              style={stylesMap.teamScore}
              onPress={() => setModal(false)}>
              <FontAwesomeIcon
                icon={faChevronDown}
                size={26}
                color="white"
                style={{right: 10}}
              />
            </TouchableOpacity>
          </View>
          {selectedItem && (
            <SelectedItem
              item={selectedItem}
              setSelectedItem={setSelectedItem}
              setVisible={setVisible}
              flags={flags}
              playerTeam={playerTeam}
              setCoordsFlag={setCoordsFlag}
              installation={installation}
              setInstallation={setInstallation}
              transferedItem={transferedItem}
              selectedAllie={selectedAllie}
              setSelectedAllie={setSelectedAllie}
              setTransferedItem={setTransferedItem}
            />
          )}
          <Inventory
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            inventorySize={inventorySize}
            installation={installation}
            setTransferedItem={setTransferedItem}
            setSelectedAllie={setSelectedAllie}
            transferedItem={transferedItem}
            playerTeam={playerTeam}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ModalInventory;
