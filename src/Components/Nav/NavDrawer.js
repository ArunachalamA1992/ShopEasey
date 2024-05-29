import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../Global/Color';

export const NavigationDrawerStructure = ({navigation, home}) => {
  var {toggleDrawer} = navigation;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => toggleDrawer()}
        style={{borderColor: Color.smokeyGrey}}>
        <F5Icon
          name={'align-left'}
          color={home == true ? Color.black : Color.black}
          size={25}
          style={{marginStart: 15}}
        />
      </TouchableOpacity>
    </View>
  );
};
