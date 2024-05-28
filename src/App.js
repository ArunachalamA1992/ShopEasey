import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar, View, Linking } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from './Redux/Store';
import SplashScreen from './SplashScreen';
import OnboardScreen from './Screens/Onboarding/OnboardScreen';
import Color from './Global/Color';
import TabNavigator, { Auth } from './route';
import OnboardTwo from './Screens/Onboarding/OnboardTwo';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import WishList from './Screens/Home/BottomTabs/WishList';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from './Screens/Home/ProductList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dispatch = useDispatch();

  const linking = {
    prefixes: ['https://fobes.in/jobs', 'fobes://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        DetailedScreen: {
          path: '/:slug',
        },
      },
    },
  };

  // useEffect(() => {
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

  //   getUserData();
  // }, [dispatch]);

  // useEffect(() => {
  //   const handleDeepLink = ({url}) => {
  //     try {
  //       const route = url.replace(/.*?:\/\//g, '');
  //       const id = route.match(/\/([^\/]+)\/?$/)[1];
  //       // navigation.navigate('DetailedScreen', { slug });
  //     } catch (error) {
  //       console.error('Error handling deep link:', error);
  //     }
  //   };

  //   const subscription = Linking.addEventListener('url', handleDeepLink);

  //   const handleInitialUrl = async () => {
  //     try {
  //       const initialUrl = await Linking.getInitialURL();
  //       if (initialUrl) {
  //         handleDeepLink({url: initialUrl});
  //       }
  //     } catch (error) {
  //       console.error('Error handling initial URL:', error);
  //     }
  //   };

  //   handleInitialUrl();

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ swipeEnabled: false }}
          drawerContent={props => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="DetailedScreen"
            component={DetailedScreen}
            options={{headerShown: false}}
          /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();
  // const [getData, setGetData] = useState([]);
  // const userData = useSelector(state => state.UserReducer.userData);
  // var {token} = userData;
  // const notificationCount = useSelector(
  //   state => state.UserReducer.notificationCount,
  // );

  // const getNotificationData = async () => {
  //   try {
  //     const notifyData = await fetchData.notification(null, token);
  //     if (notifyData) {
  //       setGetData(notifyData.data);
  //     }
  //   } catch (error) {
  //     console.log('catch in getNotification_Data : ', error);
  //   }
  // };

  // useEffect(() => {
  //   const notify = setInterval(() => {
  //     getNotificationData();
  //     unreadNotify();
  //   }, 2000);
  //   return () => {
  //     clearInterval(notify);
  //   };
  // }, [getData, userData, notificationCount]);

  // const unreadNotify = async () => {
  //   let unreadNotifications = getData.filter(
  //     notification => notification?.read_at == null,
  //   );
  //   // setUnreadCount(unreadNotifications.length);
  //   dispatch(setNotificationCount(unreadNotifications.length));
  // };

  return (
    <>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardScreen"
          component={OnboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardTwo"
          component={OnboardTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wishlist"
          component={WishList}
          options={({ navigation, route }) => ({
            headerTitle: 'Wish List',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Color.black },
            headerStyle: { backgroundColor: Color.white },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />


        <Stack.Screen
          name="ProductList"
          component={ProductList}
          // options={({navigation, route}) => ({
          //   headerTitle: 'Product List',
          //   headerTitleAlign: 'center',
          //   headerTitleStyle: {color: Color.black},
          //   headerStyle: {backgroundColor: Color.white},
          //   headerLeft: () => (
          //     <View style={{marginHorizontal: 10}}>
          //       <Icon
          //         name="arrow-back"
          //         size={30}
          //         color={Color.black}
          //         onPress={() => navigation.goBack()}
          //       />
          //     </View>
          //   ),
          // })}
          options={{ headerShown: false }}
        />

        {/*  <Stack.Screen
          name="Notification"
          component={Notification}
          options={({navigation, route}) => ({
            headerTitle: 'Notification',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black},
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="basicdetails"
          component={BasicDetails}
          options={({navigation, route}) => ({
            headerTitle: 'Basic Details',
            headerTitleStyle: {color: Color.black},
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.black}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        /> */}

      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
