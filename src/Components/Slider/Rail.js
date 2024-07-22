import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../Global/Color';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    backgroundColor: Color.lightgrey,
  },
});
