import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from './Global/Color';
import {setAsync, setCountryCode, setDataCount, setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from './Config/fetchData';
import NetInfo from '@react-native-community/netinfo';
// import {NetworkState} from './Utils/utils';

const SplashScreen = ({navigation}) => {
  const imageScale = new Animated.Value(0.1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const setNetInfo = () => {
    NetInfo.fetch().then(state => {
      setLoading(state.isConnected);
    });
  };

  useEffect(() => {
    setNetInfo();
  }, []);

  useEffect(() => {
    try {
      if (loading) {
        const SplashLoad = setTimeout(() => {
          getloginData();
          getUserData();
        }, 3000);
        return () => clearInterval(SplashLoad);
      }
    } catch (error) {
      console.log('catch in splash_Screen ', error);
    }
  }, [loading]);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

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
      if (countryData === null) {
        navigation.replace('OnboardScreen');
        return;
      }
      dispatch(setCountryCode(JSON.parse(countryData)));

      const userStateValue = await AsyncStorage.getItem('UserState');
      if (userStateValue) {
        dispatch(setAsync(JSON.parse(userStateValue)));
        const {onboardVisible} = JSON.parse(userStateValue);
        if (onboardVisible) {
          navigation.replace('TabNavigator');
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
        const getData = await fetchData.profile_data(``, token);
        dispatch(
          setDataCount({
            wishlist: getData?.data?.wishlist_count,
            cart: getData?.data?.cart_count,
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* {!loading && <NetworkState setNetInfo={setNetInfo} />} */}
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
