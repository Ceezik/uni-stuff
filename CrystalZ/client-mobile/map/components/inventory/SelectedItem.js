import React, {useEffect} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {stylesMap} from '../../css/style';
import {getItemIcon} from '../marker/MarkersItem';
import SelectedItemButtons from './SelectedItemButtons';
import {DESC_ITEMS} from '../../utils/descriptions';
import ConfigureItem from './ConfigureItem';
import ConfigurePortail from './ConfigurePortail';

/**
 * Composant SelectedItem :
 * Affiche l'item sélectionné dans l'inventaire et les actions faisables sur cet item
 *
 * props :
 *   - item : item sélectionné
 *   - setSelectedItem : Setter de la variable item
 *   - setVisible : Setter de la variable spécifiant si la modalInventory est ouverte ou non
 *   - flags : Cristaux capturés sur la map
 *   - playerTeam : Equipe du joueur
 *   - setCoordsFlag : Setter de la variable specifiant les coordonnées du cristal affiché lors de l'utilisation de l'antenne
 *   - installation : Booléen à true si on est en train d'installer un item
 *   - setInstallation : Setter de la variable installation
 *   - transferedItem : Item à transférer via le portail
 *   - setTransferedItem : Setter de la vairable transferedITem
 *   - selectedAllie : Allié sélectionné pour la configuration du portail
 *   - setSelectedAllie : Setter de la variable selectedAllie
 */
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
