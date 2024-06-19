import React, { useEffect } from 'react';
import { LogBox, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from '../RootNavigation';
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
import ProductDetails from './Screens/Home/ProductDetails';
import CategoryScreen from './Screens/Home/CategoryScreen';
import SearchScreen from './Screens/Home/SearchScreen';
import { Manrope } from './Global/FontFamily';
import PrivacyPolicy from './Screens/Sidemenu/PrivacyPolicy';
import TermsandConditions from './Screens/Sidemenu/TermsandConditions';
import FollowingSellers from './Screens/Profile/FollowingSellers';
import SellerProfile from './Screens/Profile/SellerProfile';
import AddCard from './Screens/MyOrders/AddCard';
import firebase from '@react-native-firebase/app'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs;

const MyDrawer = () => {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ swipeEnabled: false }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{ headerShown: false }}
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

  // Your Firebase config object
  const firebaseConfig = {
    apiKey: 'AIzaSyDi0wxP2QTmOcNdbfyHP3Qb_5C_gAgcJ1A',
    authDomain: 'shopeasey-8855b.firebaseapp.com',
    projectId: 'shopeasey-8855b',
    appId: '1:573868691501:android:776bd7b34bfb80e69428a4',
  };

  useEffect(() => {
    try {
      logAppOpen();
      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (error) {
      console.log("catch in useEffect_App: ", error);
    }
  }, [])

  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="category"
          component={CategoryScreen}
          options={({ navigation, route }) => ({
            headerTitle: 'Category',
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
          name="Search"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
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
          name="TermsandConditions"
          component={TermsandConditions}
          options={({ navigation, route }) => ({
            headerTitle: 'Terms & Conditions',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: { color: Color.white },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Following Sellers',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Seller Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
          options={({ navigation, route }) => ({
            headerTitle: 'Add Card Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Color.white,
              fontFamily: Manrope.Bold,
              fontSize: 18,
            },
            headerStyle: { backgroundColor: Color.primary },
            headerLeft: () => (
              <View style={{ marginHorizontal: 10 }}>
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
      </Stack.Navigator>
    </>
  );
};

export default App;

