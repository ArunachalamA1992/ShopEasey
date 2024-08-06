import React, {useEffect} from 'react';
import {
  BackHandler,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import VerticalTabView from './VerticalTabView';

const FilterModal = props => {
  const {setFilterVisible, filterVisible, navigation, category_id} = props;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [filterVisible]);

  const handleBackPress = () => {
    if (filterVisible) {
      setFilterVisible(false);
      return true;
    }
    return false;
  };

  return (
    <Modal visible={filterVisible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <Pressable
          onPress={() => setFilterVisible(false)}
          style={styles.pressableOverlay}
        />
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.closeButton}>
              <Icon name="close" size={18} color={Color.primary} />
            </TouchableOpacity>
          </View>
          <VerticalTabView
            navigation={navigation}
            visible={filterVisible}
            category_id={category_id}
            setFilterVisible={setFilterVisible}
          />
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
    fontSize: 18,
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
