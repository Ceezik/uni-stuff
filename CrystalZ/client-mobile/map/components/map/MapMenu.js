import React, {useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faBars, faTrophy} from '@fortawesome/free-solid-svg-icons';
import MarkerNegative from '../../img/markerNegative.svg';
import MarkerPositive from '../../img/markerPositive.svg';
import BackPack from '../../img/backpack.svg';

import {View} from 'native-base';
import {stylesMap} from '../../css/style';
import {useSocket} from '../../utils/socket';
import {usePlayer} from '../../utils/player';
import {useConfig} from '../../utils/config';
import {Popup} from '../Toast';

/**
 * Composant MapMenu :
 * Affiche le menu de jeu présent sur la carte
 *
 * props :
 *   - coordinates : Position du joueur
 *   - setModalScore : Setter de la variable spécifiant si la modal des scores est ouverte
 *   - setModalInventory : Setter de la variable spécifiant si la modal de l'inventaire est ouverte
 */
const MapMenu = ({coordinates, setModalScore, setModalInventory}) => {
  const [open, setOpen] = useState(false);
  const {socket} = useSocket();
  const {player} = usePlayer();
  const {config} = useConfig();

  const addMarker = isPositive => {
    socket.emit('createMarker', {
      coordinates,
      isPositive,
    });
    setOpen(false);
    Popup('Transmission en cours...', 'rgba(0, 255, 0, 0.3)');
  };

  return (
    config && (
      <>
        <View style={stylesMap.menu}>
          {open ? (
            <View>
              <TouchableOpacity
                onPress={() => setModalInventory(true)}
                style={{position: 'relative', top: -70, right: -3}}>
                {player && player.hasTransporteur ? (
                  <View>
                    <Image
                      source={require('../../img/items/transporteur.png')}
                      style={{width: 40, height: 40, marginLeft: -8}}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <BackPack width="25" height="28.6" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addMarker(true)}
                style={[
                  {
                    position: 'relative',
                    top: -55,
                    right: -3,
                  },
                ]}>
                <MarkerPositive width="25" height="46.1" fill="green" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addMarker(false)}
                style={[{position: 'relative', top: -40, right: -3}]}>
                <MarkerNegative width="25" height="46.1" fill="red" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalScore(true)}
                style={[{position: 'relative', top: -25}]}>
                <FontAwesomeIcon icon={faTrophy} size={32} color="gold" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faTimes} size={32} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            config.launched && (
              <TouchableOpacity>
                <FontAwesomeIcon
                  color="white"
                  onPress={() => setOpen(!open)}
                  icon={faBars}
                  size={32}
                />
              </TouchableOpacity>
            )
          )}
        </View>
      </>
    )
  );
};

export default MapMenu;
