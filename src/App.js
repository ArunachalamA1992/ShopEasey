import React, {useEffect, useState} from 'react';
import {
  Linking,
  LogBox,
  NativeEventEmitter,
  StatusBar,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider, useDispatch} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
// import {navigationRef} from '../RootNavigation';
import Store from './Redux/Store';
import SplashScreen from './SplashScreen';
import OnboardScreen from './Screens/Onboarding/OnboardScreen';
import Color from './Global/Color';
import TabNavigator, {Auth} from './route';
import OnboardTwo from './Screens/Onboarding/OnboardTwo';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from './Screens/Home/ProductList';
import ProductDetails from './Screens/Home/ProductDetails';
import CategoryScreen from './Screens/Home/CategoryScreen';
import SearchScreen from './Screens/Home/SearchScreen';
import {Manrope} from './Global/FontFamily';
import PrivacyPolicy from './Screens/Sidemenu/PrivacyPolicy';
import TermsandConditions from './Screens/Sidemenu/TermsandConditions';
import FollowingSellers from './Screens/Profile/FollowingSellers';
import SellerProfile from './Screens/Profile/SellerProfile';
import AddCard from './Screens/MyOrders/AddCard';
import firebase from '@react-native-firebase/app';
import AddAddress from './Screens/Address/AddAddress';
import {setCountryCode, setUserData} from './Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyOrders from './Screens/MyOrders/MyOrders';
import OrderConfirmation from './Screens/Cart/OrderConfirmation';
import TrackOrder from './Screens/MyOrders/TrackOrder';
import DeliveredOrder from './Screens/MyOrders/DeliveredOrder';
import OrderReview from './Screens/MyOrders/OrderReview';
import ReturnRefundPolicy from './Screens/Sidemenu/ReturnRefundPolicy';
import AboutUs from './Screens/Sidemenu/AboutUs';
import ContactUs from './Screens/Sidemenu/ContactUs';
import FAQs from './Screens/Sidemenu/FAQs';
import MyRewards from './Screens/Sidemenu/MyRewards';
import NotificationSettings from './Screens/Sidemenu/NotificationSettings';
import {Paypal} from './Components/Paypal';
import AccountSettings from './Screens/Sidemenu/AccountSettings';
import ProfileView from './Screens/Profile/ProfileView';
import EditProfile from './Screens/Profile/EditProfile';
import SelectAddress from './Screens/Address/SelectAddress';
import SearchDataList from './Screens/Home/SearchDataList';
import {setUserId, setUserProperties} from './analytics';
import {NativeModules} from 'react-native';
import {checkUpdate} from '../InAppUpdate';
import WishList from './Screens/Wishlist/WishList';
import ForegroundHandler from './Components/pushNotify/ForegroundHandler';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Stripe} from './Components/Stripe';
import NotificationScreen from './Screens/Home/NotificationScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs;
export const navigationRef = React.createRef();

const MyDrawer = () => {
  const dispatch = useDispatch();
  const [isCountryCodeSelected, setIsCountryCodeSelected] = useState(false);

  const linking = {
    prefixes: ['https://shopeasey.com/product', 'shopeasey://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        ProductDetails: {
          path: ':id',
        },
      },
    },
  };

  useEffect(() => {
    getUserData();

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
      const countryData = await AsyncStorage.getItem('countryData');
      if (countryData === null) {
        navigationRef.current?.navigate('OnboardScreen');
        return;
      } else {
        dispatch(setCountryCode(JSON.parse(countryData)));
        setIsCountryCodeSelected(true);
        await handleInitialUrl();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [pendingDeepLink, setPendingDeepLink] = useState(null);

  const handleDeepLink = ({url}) => {
    if (isCountryCodeSelected) {
      try {
        const route = url.replace(/.*?:\/\//g, '');
        const route_value = route.match(/\/([^\/]+)\/?$/)[1];
        const value = route_value.split('?id=');
        navigationRef.current?.navigate('ProductDetails', {
          id: value[0],
          variant_id: value[1],
        });
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    } else {
      setPendingDeepLink(url);
      navigationRef.current?.navigate('OnboardScreen');
    }
  };

  const handleInitialUrl = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({url: initialUrl});
      }
    } catch (error) {
      console.error('Error handling initial URL:', error);
    }
  };

  useEffect(() => {
    if (isCountryCodeSelected && pendingDeepLink) {
      handleDeepLink({url: pendingDeepLink});
      setPendingDeepLink(null);
    }
  }, [isCountryCodeSelected]);

  const subscription = Linking.addEventListener('url', handleDeepLink);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.DeviceEventManagerModule,
    );
    const subscription = eventEmitter.addListener(
      'OPEN_PRODUCT_DETAILS',
      event => {
        const {product_id} = event;
        if (product_id) {
          if (isCountryCodeSelected) {
            navigationRef.current?.navigate('ProductDetails', {id: product_id});
          } else {
            navigationRef.current?.navigate('OnboardScreen');
          }
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [isCountryCodeSelected]);

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardScreen"
            component={OnboardScreen}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const logAppOpen = async () => {
  await analytics().logAppOpen();
};

const App = () => {
  useEffect(() => {
    checkUpdate();
  }, []);

  const firebaseConfig = {
    apiKey: 'AIzaSyDi0wxP2QTmOcNdbfyHP3Qb_5C_gAgcJ1A',
    authDomain: 'shopeasey-8855b.firebaseapp.com',
    projectId: 'shopeasey-8855b',
    appId: '1:573868691501:android:776bd7b34bfb80e69428a4',
  };

  useEffect(() => {
    setUserId('1');
    setUserProperties({product: 'ShopEasey'});
  }, []);

  useEffect(() => {
    try {
      logAppOpen();
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (error) {
      console.log('catch in useEffect_App: ', error);
    }
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51OChFxI0wQSu3P50i3ypxVwKVdDj0i56PjXMcmkeHTVJkI8nq6lBgUMLc2g3dezysH6ssCqjZ9gtfT2fzSqLHq9y00Jd17QQ0P">
      <Provider store={Store}>
        <MyDrawer />
      </Provider>
    </StripeProvider>
  );
};

const MainApp = () => {
  return (
    <>
      <ForegroundHandler />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardScreen"
          component={OnboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardTwo"
          component={OnboardTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishList}
          options={({navigation, route}) => ({
            headerTitle: 'Wish List',
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
          name="category"
          component={CategoryScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Category',
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
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
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
          name="SearchDataList"
          component={SearchDataList}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
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
          name="TermsandConditions"
          component={TermsandConditions}
          options={({navigation, route}) => ({
            headerTitle: 'Terms & Conditions',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={({navigation, route}) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="FollowingSellers"
          component={FollowingSellers}
          options={({navigation, route}) => ({
            headerTitle: 'Following Sellers',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SellerProfile"
          component={SellerProfile}
          options={({navigation, route}) => ({
            headerTitle: 'Seller Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={({navigation, route}) => ({
            headerTitle: 'Add Card Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={({navigation, route}) => ({
            headerTitle: 'Add address',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: Color.black, textAlign: 'center'},
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
          name="MyOrders"
          component={MyOrders}
          options={({navigation, route}) => ({
            headerTitle: 'My Orders',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="TrackingDetails"
          component={TrackOrder}
          options={({navigation, route}) => ({
            headerTitle: 'Tracking Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="DeliveredOrder"
          component={DeliveredOrder}
          options={({navigation, route}) => ({
            headerTitle: 'Order Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="OrderReview"
          component={OrderReview}
          options={({navigation, route}) => ({
            headerTitle: 'Leave a Review',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="OrderConfirmation"
          component={OrderConfirmation}
          options={({navigation, route}) => ({
            headerTitle: 'Order Confirmation',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="notification"
          component={NotificationScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Notification',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="ReturnRefundPolicy"
          component={ReturnRefundPolicy}
          options={({navigation, route}) => ({
            headerTitle: 'Return & Refund Policy',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="AboutUs"
          component={AboutUs}
          options={({navigation, route}) => ({
            headerTitle: 'About Us',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="ContactUs"
          component={ContactUs}
          options={({navigation, route}) => ({
            headerTitle: 'Contact Us',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="FAQs"
          component={FAQs}
          options={({navigation, route}) => ({
            headerTitle: 'FAQs',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="MyRewards"
          component={MyRewards}
          options={({navigation, route}) => ({
            headerTitle: 'My Rewards',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="NotificationSettings"
          component={NotificationSettings}
          options={({navigation, route}) => ({
            headerTitle: 'Notification Settings',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="AccountSettings"
          component={AccountSettings}
          options={({navigation, route}) => ({
            headerTitle: 'Account Settings',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="ProfileView"
          component={ProfileView}
          options={({navigation, route}) => ({
            headerTitle: 'Profile View',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="EditProfile"
          component={EditProfile}
          options={({navigation, route}) => ({
            headerTitle: 'Edit Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="SelectAddress"
          component={SelectAddress}
          options={({navigation, route}) => ({
            headerTitle: 'Select Delivery Address',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontSize: 18,
              fontFamily: Manrope.Bold,
            },
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
          name="Paypal"
          component={Paypal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Stripe"
          component={Stripe}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;
