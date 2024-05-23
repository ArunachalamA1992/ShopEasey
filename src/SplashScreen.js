import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Color from './Global/Color';
import { Gilmer } from './Global/FontFamily';

const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  var { replace } = navigation;

    useEffect(() => {
      try {
        const SplashLoad = setTimeout(() => {
          // getloginData();
          // getUserData();
          navigation.replace('OnboardScreen');
        }, 3000);
        return () => clearInterval(SplashLoad);
      } catch (error) {
        console.log('catch in splash_Screen ', error);
      }
    }, []);

  //   const getUserData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('user_data');
  //       if (value !== null) {
  //         dispatch(setUserData(JSON.parse(value)));
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   const getloginData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('UserState');
  //       if (value !== null) {
  //         const {onboardVisible} = JSON.parse(value);
  //         if (onboardVisible) {
  //           navigation.replace('OnboardOne');
  //           return;
  //         }
  //       }

  //       const user_data = await AsyncStorage.getItem('user_data');
  //       if (!user_data) {
  //         navigation.replace('Auth');
  //         return;
  //       }

  //       const {token} = JSON.parse(user_data);
  //       if (!token) {
  //         navigation.replace('OnboardOne');
  //       } else {
  //         dispatch(setUserData(user_data));
  //         navigation.replace('TabNavigator');
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/logos/main.png')}
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
      {/* <Animated.Text
        style={[
          { fontSize: 20, color: Color.primary, fontFamily: Gilmer.SemiBold },
          { transform: [{ scale: imageScale }] },
        ]}>
        Fobes
      </Animated.Text> */}
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
