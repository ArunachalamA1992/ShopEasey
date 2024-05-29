import React from 'react';
import {Text, View} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';

const MyCart = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: Manrope.Bold,
          color: Color.black,
          marginHorizontal: 5,
        }}>
        No Cart
      </Text>
    </View>
  );
};

export default MyCart;
