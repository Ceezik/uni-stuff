import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker, Callout} from 'react-native-maps';
import {useSocket} from '../../utils/socket';
import {Svg} from 'react-native-svg';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import CrystalLocked from '../../img/crystal-locked.svg';
import MarkerNegative from '../../img/markerNegative.svg';
import MarkerPositive from '../../img/markerPositive.svg';
import Crystal from '../../img/crystal.svg';
import Teammate from '../../img/location-arrow-solid.svg';
import {useConfig} from '../../utils/config';
import {usePlayer} from '../../utils/player';
import {inRadius} from '../../utils/calcul';
import {Popup} from '../Toast';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarker} from '@fortawesome/free-solid-svg-icons';
import {stylesMap} from '../../css/style';
import MarkersItem from './MarkersItem';

const Markers = ({
  players,
  flags,
  unknowns,
  playerTeam,
  position,
  teamMarkers,
  items,
}) => {
  const {player} = usePlayer();

  const isImmobilized = () => {
    return player && player.immobilizedUntil && Popup('Vous êtes paralysé');
  };

  return (
    <>
      <PlayerMarker players={players} />
      <FlagMarker
        flags={flags}
        playerTeam={playerTeam}
        position={position}
        isImmobilized={isImmobilized}
      />
      <UnknownMarker unknowns={unknowns} />
      <TeamMarker teamMarkers={teamMarkers} />
      <MarkersItem items={items} isImmobilized={isImmobilized} />
    </>
  );
};

const PlayerMarker = ({players}) => {
  const {user} = useAuth();
  const img = require('../../img/crystal.gif');

  return (
    players.length > 0 &&
    players.map(p => {
      return (
        p.username !== user.username &&
        p.coordinates.length > 0 && (
          <Marker
            title={`${p.username} ${!p.isConnected ? '(déconnecté)' : ''} `}
            coordinate={{
              latitude: p.coordinates[0],
              longitude: p.coordinates[1],
            }}>
            <Teammate
              fill={p.isConnected ? p.teamColor : 'grey'}
              width={25}
              height={25}
            />
          </Marker>
        )
      );
    })
  );
};

const FlagMarker = ({flags, playerTeam, position, isImmobilized}) => {
  const {socket} = useSocket();
  const {config} = useConfig();

  const captureFlag = flag => {
    flag.team && flag.team.id === playerTeam.id
      ? Popup('Cristal déjà capturé', 'rgba(255, 165, 0, 0.5)')
      : !inRadius(flag.coordinates, position, config.flagActionRadius)
      ? Popup('Cristal trop éloigné !')
      : flag.capturedUntil
      ? Popup('Cristal vérouillé', 'rgba(255, 165, 0, 0.5)')
      : socket.emit('captureFlag', {flagId: flag.id, teamId: playerTeam.id}) &&
        Popup('Capture en cours...', 'rgba(0, 255,255, 0.5)');
  };

  return (
    flags.length > 0 &&
    flags.map(f => {
      return (
        <Marker
          coordinate={{
            latitude: f.coordinates[0],
            longitude: f.coordinates[1],
          }}
          onPress={() => isImmobilized() || captureFlag(f)}>
          <View>
            {f.capturedUntil ||
            (f.hasOracle &&
              inRadius(f.coordinates, position, config.flagActionRadius)) ? (
              <CrystalLocked fill={f.team ? f.team.color : 'grey'} />
            ) : (
              <Crystal fill={f.team ? f.team.color : 'grey'} />
            )}
          </View>
        </Marker>
      );
    })
  );
};

const UnknownMarker = ({unknowns}) => {
  return (
    unknowns.length > 0 &&
    unknowns.map(u => {
      return (
        <Marker
          title="Inconnu"
          coordinate={{
            latitude: u.coordinates[0],
            longitude: u.coordinates[1],
          }}>
          <Image
            source={require('../../img/unknown.png')}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </Marker>
      );
    })
  );
};

const TeamMarker = ({teamMarkers}) => {
  const {socket} = useSocket();

  const deleteMarker = marker => {
    socket.emit('deleteMarker', marker.id);
    Popup('Suppression en cours...', 'rgba(0, 255, 0, 0.3)');
  };

  return (
    teamMarkers.length > 0 &&
    teamMarkers.map(m => {
      return (
        <Marker
          coordinate={{
            latitude: m.coordinates[0],
            longitude: m.coordinates[1],
          }}>
          {m.isPositive ? (
            <MarkerPositive width="30" height="52.5" fill="green" />
          ) : (
            <MarkerNegative width="30" height="52.5" fill="red" />
          )}
          <Callout
            style={stylesMap.callout}
            tooltip={false}
            onPress={() => deleteMarker(m)}>
            <TouchableOpacity>
              <Text style={{color: 'red'}}>Supprimer</Text>
            </TouchableOpacity>
          </Callout>
        </Marker>
      );
    })
  );
};

export default Markers;
