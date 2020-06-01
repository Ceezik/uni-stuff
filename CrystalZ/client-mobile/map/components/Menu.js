import React, {useState, useEffect} from 'react';
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation';
import {View, BackHandler} from 'react-native';
import MyGames from './partie/MyGames';
import Game from './partie/Game';
import Profil from './autentification/Profil';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserCircle,
  faSearch,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import {stylesSigninSignup} from '../css/style';

const BottomTab = ({tabActive = 'myGames'}) => {
  const tabs = [
    {
      key: 'myGames',
      icon: 'myGames',
      label: 'Mes parties',
      barColor: '#1B1E22',
    },
    {
      key: 'findGames',
      icon: 'findGames',
      label: 'Trouver une partie',
      barColor: '#1B1E22',
    },
    {
      key: 'profil',
      icon: 'profil',
      label: 'Profil',
      barColor: '#1B1E22',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabActive);

  const renderIcon = icon => ({isActive}) => (
    <FontAwesomeIcon
      icon={
        icon === 'myGames'
          ? faGamepad
          : icon === 'findGames'
          ? faSearch
          : icon === 'profil' && faUserCircle
      }
      size={25}
      style={
        isActive ? {color: '#68B684'} : stylesSigninSignup.submitButtonText
      }
    />
  );

  const renderTab = ({tab, isActive}) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={isActive && {color: '#68B684'}}
      renderIcon={renderIcon(tab.icon)}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {activeTab === 'myGames' ? (
          <MyGames />
        ) : activeTab === 'findGames' ? (
          <Game />
        ) : (
          activeTab === 'profil' && <Profil />
        )}
      </View>
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={newTab => setActiveTab(newTab.key)}
        renderTab={renderTab}
        tabs={tabs}
      />
    </View>
  );
};

export default BottomTab;
