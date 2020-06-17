import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import SelectedItemButtonsInstallation from './SelectedItemButtonsInstallation';
import {stylesMap} from '../../css/style';

/**
 * Composant ConfigurePortail :
 * Affiche les éléments de configuration du portail de transfert
 *
 * props :
 *   - item : portail sélectionné
 *   - setSelectedItem : Setter de la variable item
 *   - setVisible : Setter pour fermer la modalInventory
 *   - playerTeam : Equipe du joueur
 *   - setInstallation : Setter de la variable spécifiant si l'on est en train d'installer un item
 *   - transferedItem : Item à transférer
 *   - setTransferedItem : Setter de la variable transferedItem
 *   - selectedAllie : Allié sélectionné pour le transfert
 */
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
