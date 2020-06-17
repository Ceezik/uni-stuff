import React, {useState, useEffect} from 'react';
import {Text, View} from 'native-base';
import {TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {stylesGame, stylesMap} from '../../css/style';
import {useAuth} from '../../utils/auth';
import request from '../../utils/request';
import {PieChart} from 'react-native-chart-kit';
import StatItem from './StatItem';
import Loader from '../Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

/**
 * Composant Profil :
 * Affiche la page profil du joueur avec stats générales et bouton de déconnexion
 */
const Profil = () => {
  const {user, signout} = useAuth();
  const [statistics, setStatistics] = useState(null);

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

  return statistics ? (
    <>
      <View style={[stylesGame.container]}>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={stylesGame.gameText}>Mon profil</Text>

            <TouchableOpacity
              style={[
                stylesGame.submitButton,
                stylesMap.score,
                stylesGame.gameText,
                {backgroundColor: '#EB4646', marginRight: 10},
              ]}
              onPress={() => signout()}>
              <FontAwesomeIcon icon={faSignOutAlt} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 40}}>
            <StatItem
              name="Parties jouées"
              value={statistics.Statistic.nbGames}
            />
          </View>
          <View>
            {statistics.Statistic.nbGames > 0 && (
              <View style={{marginBottom: 20, marginTop: 20}}>
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
            )}
          </View>
          <View>
            <StatItem
              name="Cristaux capturés"
              value={statistics.Statistic.nbFlags}
            />
            <StatItem
              name="Cristaux découverts"
              value={statistics.Statistic.nbDiscoveredFlags}
            />
            <StatItem
              name="Joueurs piégés"
              value={statistics.Statistic.nbTraps}
            />
          </View>
        </ScrollView>
      </View>
    </>
  ) : (
    <Loader />
  );
};

export default Profil;
