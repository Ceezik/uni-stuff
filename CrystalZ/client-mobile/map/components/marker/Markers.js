import React from 'react';
import {useAuth} from '../../utils/auth';
import {Marker, Callout} from 'react-native-maps';
import {useSocket} from '../../utils/socket';
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

import {stylesMap} from '../../css/style';
import ItemList from './MarkersItem';

/**
 * Composant Markers :
 * Crée les markers à positionner sur la carte
 *
 * props :
 *   - players : Joueurs à afficher
 *   - flags : Cristaux à afficher
 *   - unknowns : Eléments inconnus à afficher
 *   - playerTeam : Equie du joueur connecté
 *   - position : Position du joueur
 *   - teamMarkers : Marqueurs de l'équipe
 *   - items : Items à afficher
 */
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
      <FlagList
        flags={flags}
        playerTeam={playerTeam}
        position={position}
        isImmobilized={isImmobilized}
      />
      <UnknownList unknowns={unknowns} />
      <TeamMarkerList teamMarkers={teamMarkers} />
      <ItemList items={items} isImmobilized={isImmobilized} />
    </>
  );
};

const PlayerMarker = ({players}) => {
  const {user} = useAuth();

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

const FlagList = ({flags, playerTeam, position, isImmobilized}) => {
  return (
    flags.length > 0 &&
    flags.map(f => (
      <FlagMarker
        key={f.id}
        flag={f}
        playerTeam={playerTeam}
        position={position}
        isImmobilized={isImmobilized}
      />
    ))
  );
};

const Flag = ({flag, playerTeam, position, isImmobilized}) => {
  const {socket} = useSocket();
  const {config} = useConfig();

  const captureFlag = flag => {
    flag.team && flag.team.id === playerTeam.id
      ? Popup('Cristal déjà capturé', 'rgba(255, 165, 0, 0.5)')
      : !inRadius(flag.coordinates, position, config.flagActionRadius)
      ? Popup('Cristal trop éloigné !')
      : flag.capturedUntil || flag.hasOracle
      ? Popup('Cristal vérouillé', 'rgba(255, 165, 0, 0.5)')
      : socket.emit('captureFlag', {flagId: flag.id, teamId: playerTeam.id}) &&
        Popup('Capture en cours...', 'rgba(0, 255,255, 0.5)');
  };

  return (
    <Marker
      coordinate={{
        latitude: flag.coordinates[0],
        longitude: flag.coordinates[1],
      }}
      onPress={() => isImmobilized() || captureFlag(flag)}>
      <View>
        {flag.capturedUntil ||
        (flag.hasOracle &&
          inRadius(flag.coordinates, position, config.flagActionRadius)) ? (
          <CrystalLocked fill={flag.team ? flag.team.color : 'grey'} />
        ) : (
          <Crystal fill={flag.team ? flag.team.color : 'grey'} />
        )}
      </View>
    </Marker>
  );
};

const UnknownList = ({unknowns}) => {
  return (
    unknowns.length > 0 && unknowns.map(u => <UnknownMarker unknown={u} />)
  );
};

const Unknown = ({unknown}) => {
  return (
    <Marker
      title="Inconnu"
      coordinate={{
        latitude: unknown.coordinates[0],
        longitude: unknown.coordinates[1],
      }}>
      <Image
        source={require('../../img/unknown.png')}
        style={{width: 40, height: 40}}
        resizeMode="contain"
      />
    </Marker>
  );
};

const TeamMarkerList = ({teamMarkers}) => {
  return (
    teamMarkers.length > 0 &&
    teamMarkers.map(m => <TeamMarkerMemo key={m.id} marker={m} />)
  );
};

const TeamMarker = ({marker}) => {
  const {socket} = useSocket();

  const deleteMarker = marker => {
    socket.emit('deleteMarker', marker.id);
    Popup('Suppression en cours...', 'rgba(0, 255, 0, 0.3)');
  };

  return (
    <Marker
      coordinate={{
        latitude: marker.coordinates[0],
        longitude: marker.coordinates[1],
      }}>
      {marker.isPositive ? (
        <MarkerPositive width="30" height="52.5" fill="green" />
      ) : (
        <MarkerNegative width="30" height="52.5" fill="red" />
      )}
      <Callout
        style={stylesMap.callout}
        tooltip={true}
        onPress={() => deleteMarker(marker)}>
        <View>
          <TouchableOpacity>
            <Text style={{color: 'red'}}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

const FlagMarker = React.memo(Flag, (prevProps, nextProps) => {
  return prevProps.flag.nbUpdates === nextProps.flag.nbUpdates;
});

const UnknownMarker = React.memo(Unknown, (prevProps, nextProps) => {
  return prevProps.unknown.nbUpdates === nextProps.unknown.nbUpdates;
});

const TeamMarkerMemo = React.memo(TeamMarker, (prevProps, nextProps) => {
  return prevProps.marker.nbUpdates === nextProps.marker.nbUpdates;
});

export default Markers;
