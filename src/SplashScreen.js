import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from './Global/Color';
import {setCountryCode, setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const imageScale = new Animated.Value(0.1);
  const dispatch = useDispatch();

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  useEffect(() => {
    try {
      const SplashLoad = setTimeout(() => {
        getloginData();
        getUserData();
      }, 3000);
      return () => clearInterval(SplashLoad);
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getloginData = async () => {
    try {
      const countryData = await AsyncStorage.getItem('countryData');
      console.log('countryData', countryData);
      if (countryData === null) {
        navigation.replace('OnboardScreen');
        return;
      }
      dispatch(setCountryCode(JSON.parse(countryData)));

      const value = await AsyncStorage.getItem('UserState');
      if (value !== null) {
        const {onboardVisible} = JSON.parse(value);
        if (onboardVisible) {
          navigation.replace('OnboardScreen');
          return;
        }
      }

      const user_data = await AsyncStorage.getItem('user_data');
      if (!user_data) {
        navigation.replace('OnboardScreen');
        return;
      }

      const {token} = JSON.parse(user_data);
      if (!token) {
        navigation.replace('OnboardScreen');
      } else {
        dispatch(setUserData(user_data));
        navigation.replace('TabNavigator');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: 'https://shopeasey.s3.ap-south-1.amazonaws.com/mobile/assets/logos/main.png',
        }}
        style={[styles.image, {transform: [{scale: imageScale}]}]}
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
