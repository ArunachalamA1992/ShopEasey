import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import Color from './Global/Color';
import { Media } from './Global/Media';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    try {
      const splash = setTimeout(() => {
        navigation.replace('OnboardScreen');
      }, 3000);
      return () => clearInterval(splash);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://shopeasey.s3.ap-south-1.amazonaws.com/mobile/assets/logos/main.png" }}
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
