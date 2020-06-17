import React from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {usePlayer} from '../../utils/player';
import {stylesGame} from '../../css/style';
import {useConfig} from '../../utils/config';

/**
 * Composant AlliesList :
 * Liste des alliés à afficher lors de l'utilisation d'un portail
 *
 * props :
 *   - playerTeam : Equipe du joueur connecté
 *   - setSelectedAllie : Setter du joueur sélectionné lors de la configuration du portail
 */
const AlliesList = ({playerTeam, setSelectedAllie}) => {
  const {player} = usePlayer();
  const {config} = useConfig();

  const checkInventorySize = allie => {
    return allie.hasTransporteur
      ? allie.inventory.length < config.inventorySize * 2
      : allie.inventory.length < config.inventorySize;
  };

  return (
    <ScrollView horizontal persistentScrollbar>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginRight: 13,
          marginTop: 10,
        }}>
        {playerTeam.players.map(
          p =>
            p.username !== player.username &&
            checkInventorySize(p) && (
              <TouchableOpacity onPress={() => setSelectedAllie(p)}>
                <View
                  style={[
                    stylesGame.item,
                    {flex: 1, flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Text style={{color: 'white'}}>{p.username}</Text>
                </View>
              </TouchableOpacity>
            ),
        )}
      </View>
    </ScrollView>
  );
};

export default AlliesList;
