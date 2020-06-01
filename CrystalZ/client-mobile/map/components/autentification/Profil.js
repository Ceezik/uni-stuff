import React, {useState, useEffect} from 'react';
import {Text, View} from 'native-base';
import {TouchableOpacity, Dimensions} from 'react-native';
import {stylesGame, stylesMap} from '../../css/style';
import {useAuth} from '../../utils/auth';
import request from '../../utils/request';
import {PieChart} from 'react-native-chart-kit';
import StatItem from './StatItem';

const Profil = () => {
  const {user, signout} = useAuth();
  const [statistics, setStatistics] = useState(null);

  console.log(statistics);
  useEffect(() => {
    request
      .get(`/users/${user.id}/statistics`)
      .then(stats => setStatistics(stats.data));
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#26292F',
    backgroundGradientTo: '#26292F',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 5) => `rgba(0, 255, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    },
  };

  return (
    statistics && (
      <>
        <View style={[stylesGame.container]}>
          <View>
            <Text style={stylesGame.gameText}>Mon profil</Text>

            <TouchableOpacity
              style={[stylesGame.submitButton, {backgroundColor: '#EB4646'}]}
              onPress={() => signout()}>
              <Text style={stylesGame.submitButtonText}> Se déconnecter </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 40}}>
            <StatItem
              name="Parties jouées"
              value={statistics.Statistic.nbGames}
            />
          </View>
          <View>
            <PieChart
              data={[
                {
                  name: 'Victoire',
                  population: statistics.Statistic.nbWins,
                  color: '#68B684',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Egalité',
                  population:
                    statistics.Statistic.nbGames -
                    statistics.Statistic.nbLosses -
                    statistics.Statistic.nbWins,
                  color: '#D2D2D2',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Défaite',
                  population: statistics.Statistic.nbLosses,
                  color: '#EB4646',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get('window').width}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
          <View style={{marginTop: 40}}>
            <StatItem
              name="Cristaux capturés"
              value={statistics.Statistic.nbFlags}
            />
            <StatItem
              name="Cristaux découverts"
              value={statistics.Statistic.nbDiscoveredFlags}
            />
            <StatItem
              name="Pièges efficaces"
              value={statistics.Statistic.nbTraps}
            />
          </View>
        </View>
      </>
    )
  );
};

export default Profil;
