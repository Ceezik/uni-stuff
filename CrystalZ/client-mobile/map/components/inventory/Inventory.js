import React from 'react';
import {View, ScrollView} from 'react-native';
import InventoryItem from './InventoryItem';
import {usePlayer} from '../../utils/player';
import AlliesList from './AlliesList';

/**
 * Composant Inventory :
 * Affiche l'inventaire du joueur
 *
 * props :
 *   - selectedItem : item sélectionné
 *   - setSelectedItem : Setter de la variable item
 *   - inventorySize : Taille de l'inventaire du joueur
 *   - installation : Booléen à true si on est en train d'installer un item
 *   - transferedItem : Item à transférer via le portail
 *   - setTransferedItem : Setter de la vairable transferedITem
 *   - playerTeam : Equipe du joueur
 *   - setSelectedAllie : Setter de la variable spécifiant l'allié sélectionné dans la configuration du portail
 */
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
