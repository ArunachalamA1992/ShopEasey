import React from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import VerticalTabView from './VerticalTabView';

const FilterModal = props => {
  const {setFilterVisible, filterVisible, navigation} = props;

  return (
    <Modal visible={filterVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <Pressable
          onPress={() => {
            setFilterVisible(false);
          }}
          style={styles.pressableOverlay}
        />
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              onPress={() => {
                setFilterVisible(false);
              }}
              style={styles.closeButton}>
              <Icon name="close" size={20} color={Color.primary} />
            </TouchableOpacity>
          </View>
          <VerticalTabView navigation={navigation} visible={filterVisible}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    backgroundColor: Color.transparantBlack,
  },
  pressableOverlay: {
    flex: 1,
  },
  modalContent: {
    flex: 3,
    backgroundColor: Color.white,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
    color: Color.black,
    fontFamily: Manrope.Bold,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.lightgrey,
    borderRadius: 10,
  },
};

export default FilterModal;