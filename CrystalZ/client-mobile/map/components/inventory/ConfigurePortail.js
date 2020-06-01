import React, {useState} from 'react';
import InputSpinner from 'react-native-input-spinner';
import {View, Text, Dimensions} from 'react-native';
import SelectedItemButtonsInstallation from './SelectedItemButtonsInstallation';
import {stylesMap} from '../../css/style';

const ConfigurePortail = ({
  item,
  setSelectedItem,
  setVisible,
  playerTeam,
  setInstallation,
  transferedItem,
  setTransferedItem,
  selectedAllie,
}) => {
  return (
    <>
      <View
        style={{
          width: Dimensions.get('window').width * 0.7,
          marginLeft: 10,
        }}>
        <Text style={stylesMap.itemName}> Portail de transfert </Text>
        <Text style={{color: 'white'}}>
          {' '}
          {transferedItem
            ? `Item choisi : ${transferedItem.name}`
            : "Choisissez l'item à transférer"}
        </Text>
        <Text style={{color: 'white'}}>
          {' '}
          {transferedItem &&
            (selectedAllie
              ? `Allié choisi : ${selectedAllie.username}`
              : 'Choisissez un de vos alliés')}
        </Text>
      </View>
      <SelectedItemButtonsInstallation
        item={item}
        setSelectedItem={setSelectedItem}
        setVisible={setVisible}
        playerTeam={playerTeam}
        setInstallation={setInstallation}
        transferedItem={transferedItem}
        setTransferedItem={setTransferedItem}
        selectedAllie={selectedAllie}
        portail={true}
      />
    </>
  );
};

export default ConfigurePortail;
