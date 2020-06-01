import React from 'react';
import {useSocket} from '../utils/socket';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton = ({disconnect = false, noBack = false}) => {
  const {socket} = useSocket();

  return (
    noBack || (
      <TouchableOpacity
        onPress={() => {
          disconnect && socket && socket.connected && socket.close();
          Actions.pop();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{marginLeft: 30, color: 'white', fontSize: 30}}
        />
      </TouchableOpacity>
    )
  );
};

export default BackButton;
