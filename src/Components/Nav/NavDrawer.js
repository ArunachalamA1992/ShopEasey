import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';

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
      {/* <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontSize: 11,
            color: Color.black,
            fontFamily: Gilmer.Medium,
          }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            width: '100%',
            textAlign: 'justify',
            fontSize: 14,
            color: Color.black,
            fontFamily: Gilmer.SemiBold,
          }}
          numberOfLines={1}>
          Aruanchalam Annamalai
        </Text>
      </View> */}
    </View>
  );
};
