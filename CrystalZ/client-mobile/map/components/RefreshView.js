import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {stylesGame} from '../css/style';

/**
 * Composant RefreshView :
 * Crée un composant avec des données réactualisées lorsque l'utilisateur swipe vers le haut
 */
const RefreshView = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then((res) => {
      props.refresh();
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <ScrollView
      style={stylesGame.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshableColors="limegreen"
        />
      }>
      {props.children}
    </ScrollView>
  );
};

export default RefreshView;
