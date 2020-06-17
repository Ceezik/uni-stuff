import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {stylesMap} from '../../css/style';
import TeamItem from '../partie/TeamItem';
import _ from 'lodash';
import {useConfig} from '../../utils/config';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

/**
 * Composant ModalScore :
 * Affiche la modal des scores d'une partie
 *
 * props :
 *   - visible : Booleen à true si la modal est visible
 *   - setModal : setter de la vairalbe visible
 *   - teams : Equipes de la partie
 *   - playerTeam : Equipe du joueur connecté
 */
const ModalScore = ({visible, setModal, teams, playerTeam}) => {
  const {config} = useConfig();
  return (
    <View>
      <Modal
        isVisible={visible}
        style={[stylesMap.modal]}
        onBackdropPress={() => setModal(false)}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: 10,
            }}>
            <Text style={stylesMap.titleModal}>Score</Text>
            <TouchableOpacity
              style={stylesMap.teamScore}
              onPress={() => setModal(false)}>
              <FontAwesomeIcon icon={faChevronDown} size={26} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={[stylesMap.scrollView, {bottom: 20}]}>
            {_.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(team => {
              return team.id === playerTeam.id ? (
                <TeamItem
                  team={team}
                  score={true}
                  mode={config.gameMode}
                  playerTeam
                />
              ) : (
                <TeamItem team={team} score={true} mode={config.gameMode} />
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalScore;
