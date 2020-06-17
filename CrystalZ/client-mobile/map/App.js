import React from 'react';
import {StyleSheet} from 'react-native';

import Signin from './components/autentification/Signin';
import Signup from './components/autentification/Signup';
import Map from './components/map/Map';
import Teams from './components/partie/Teams';
import {AuthProvider} from './utils/auth';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {SocketProvider} from './utils/socket';
import {ConfigProvider} from './utils/config';
import BottomTab from './components/BottomTab';
import {PlayerProvider} from './utils/player';
import EndGame from './components/score/EndGame';
import SplashScreen from './components/SplashScreen';

const App = () => {
  console.disableYellowBox = true;
  // Scene hideNavBar={true}
  return (
    <AuthProvider>
      <SocketProvider>
        <ConfigProvider>
          <PlayerProvider>
            <Router>
              <Stack key="root">
                <Scene
                  key="SplashScreen"
                  component={SplashScreen}
                  initial
                  hideNavBar
                />
                <Scene key="Signin" component={Signin} hideNavBar />
                <Scene key="Signup" component={Signup} hideNavBar />

                <Scene
                  key="Menu"
                  title="CrystalZ"
                  component={BottomTab}
                  hideNavBar
                />

                <Scene
                  key="Map"
                  navigationBarStyle={styles.header}
                  titleStyle={styles.titleColor}
                  component={Map}
                  hideNavBar
                />
                <Scene key="Teams" component={Teams} hideNavBar />

                <Scene
                  key="Endgame"
                  component={EndGame}
                  navigationBarStyle={styles.header}
                  titleStyle={styles.titleColor}
                  hideNavBar
                />
              </Stack>
            </Router>
          </PlayerProvider>
        </ConfigProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#26292F',
    color: '#FFFFFF',
    borderBottomWidth: 0,
  },
  titleColor: {
    color: '#FFFFFF',
    fontSize: 35,
  },
});
