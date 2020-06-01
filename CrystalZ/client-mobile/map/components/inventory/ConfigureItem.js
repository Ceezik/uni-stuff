import React, {useState} from 'react';
import InputSpinner from 'react-native-input-spinner';
import {View, Text, Dimensions} from 'react-native';
import SelectedItemButtonsInstallation from './SelectedItemButtonsInstallation';
import {stylesMap} from '../../css/style';

const ConfigureItem = ({
  item,
  setSelectedItem,
  setVisible,
  playerTeam,
  setInstallation,
}) => {
  const [delay, setDelay] = useState(1);
  return (
    <>
      <View
        style={{
          width: Dimensions.get('window').width * 0.7,
          marginLeft: 10,
        }}>
        <Text style={stylesMap.itemName}>
          {' '}
          Activer le piège dans{' '}
          <Text style={{fontStyle: 'italic'}}>(en minutes) </Text>:{' '}
        </Text>
        <InputSpinner
          max={10}
          min={1}
          step={1}
          textColor={'white'}
          colorRight={delay === 10 ? 'grey' : '#6FC186'}
          colorLeft={delay === 1 ? 'grey' : '#6FC186'}
          value={delay}
          editable={false}
          rounded={false}
          showBorder
          width={200}
          onChange={num => {
            setDelay(num);
          }}
        />
      </View>
      <SelectedItemButtonsInstallation
        item={item}
        delay={delay}
        setSelectedItem={setSelectedItem}
        setVisible={setVisible}
        playerTeam={playerTeam}
        setInstallation={setInstallation}
      />
    </>
  );
};

export default ConfigureItem;
