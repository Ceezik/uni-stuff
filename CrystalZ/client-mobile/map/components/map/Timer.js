import React, {useState, useEffect} from 'react';
import {Text, View} from 'native-base';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {secondsToDuration} from '../../utils/calcul';
import {stylesMap} from '../../css/style';

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
