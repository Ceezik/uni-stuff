import React, {useState, useEffect} from 'react';
import {Text, View} from 'native-base';
import moment from 'moment';
import {secondsToDuration} from '../../utils/calcul';
import {stylesMap} from '../../css/style';

/**
 * Composant Timer :
 * Affiche le chronomètre de la partie en cours
 *
 * props :
 *   - duration : Durée de la partie
 *   - launchedAt : Heure de lancement de la partie
 */
function Timer({duration, launchedAt}) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const i = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(i);
  }, []);

  const getTime = () => {
    return Math.floor(
      duration -
        moment.duration(moment().diff(moment(launchedAt))).asSeconds() -
        1,
    );
  };

  return time ? (
    <View style={stylesMap.timerBox}>
      <Text>
        <Text style={stylesMap.timerText}>{secondsToDuration(time)}</Text>
      </Text>
    </View>
  ) : (
    <></>
  );
}

export default Timer;
