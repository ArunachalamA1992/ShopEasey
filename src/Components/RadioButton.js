import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CheckboxData = ({label, checked, color_code, onPress}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <MCIcon
        name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={25}
        color={!checked ? Color.cloudyGrey : '#309CD2'}
      />
      {color_code && (
        <View
          style={{
            backgroundColor: `${color_code?.toLowerCase()}`,
            width: 20,
            height: 20,
            borderRadius: 100,
            marginLeft: 5,
            borderColor: Color.lightgrey,
            borderWidth: 1,
          }}
        />
      )}
      <Text style={styles.TextData}>{label}</Text>
    </TouchableOpacity>
  );
};

export const RadioData = ({label, checked, color_code, onPress}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Icon
        name={!checked ? 'radio-button-off' : 'radio-button-on'}
        size={25}
        color={!checked ? Color.cloudyGrey : '#309CD2'}
      />
      {color_code && (
        <View
          style={{
            backgroundColor: `${color_code?.toLowerCase()}`,
            width: 20,
            height: 20,
            borderRadius: 100,
            marginLeft: 5,
            borderColor: Color.lightgrey,
            borderWidth: 1,
          }}
        />
      )}
      <Text style={styles.TextData}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#000',
  },
  TextData: {
    fontSize: 14,
    color: Color.black,
    marginLeft: 5,
    fontFamily: Manrope.SemiBold,
    textTransform: 'capitalize',
  },
});
