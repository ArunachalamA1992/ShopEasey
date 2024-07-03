import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './Screens/Home/HomeScreen';
import Color from './Global/Color';
import { Iconviewcomponent } from './Components/Icontag';
import WishList from './Screens/Home/BottomTabs/WishList';
import MyCart from './Screens/Home/BottomTabs/MyCart';
import Profile from './Screens/Home/BottomTabs/Profile';
import Login from './Screens/Auth/Login';
import OTPScreen from './Screens/Auth/OTPScreen';
import { NavigationDrawerStructure } from './Components/Nav/NavDrawer';
import { Manrope } from './Global/FontFamily';
import PrivacyPolicy from './Screens/Sidemenu/PrivacyPolicy';
import TermsandConditions from './Screens/Sidemenu/TermsandConditions';
import FAQs from './Screens/Sidemenu/FAQs';
import ContactUs from './Screens/Sidemenu/ContactUs';
import AboutUs from './Screens/Sidemenu/AboutUs';
import EditProfile from './Screens/Profile/EditProfile';
import MyOrders from './Screens/MyOrders/MyOrders';
import AddAddress from './Screens/Address/AddAddress';
import SelectAddress from './Screens/Address/SelectAddress';
import ProfileView from './Screens/Profile/ProfileView';
import OrderConfirmation from './Screens/MyOrders/OrderConfirmation';
import FollowingSellers from './Screens/Profile/FollowingSellers';
import SellerProfile from './Screens/Profile/SellerProfile';
import { setDataCount } from './Redux';
import fetchData from './Config/fetchData';
import ProductList from './Screens/Home/ProductList';
import ProductDetails from './Screens/Home/ProductDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation, route }) => ({
          headerTitle: 'About Us',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="ContactUs"
        component={ContactUs}
        options={({ navigation, route }) => ({
          headerTitle: 'Contact Us',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="FAQs"
        component={FAQs}
        options={({ navigation, route }) => ({
          headerTitle: 'FAQs',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation, route }) => ({
          headerTitle: 'Privacy Policy',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
    </Stack.Navigator>
  );
};

export const WishListStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="Wishlist">
      <Stack.Screen
        name="Wishlist"
        component={WishList}
        options={({ navigation }) => ({
          headerTitle: 'Wish List',
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
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{right: 10}}
          //     onPress={() => {
          //       navigation.navigate('Notification');
          //     }}>
          //     <Badge
          //       badgeStyle={{
          //         backgroundColor: Color.primary,
          //         position: 'absolute',
          //         right: 0,
          //         zIndex: 1,
          //       }}>
          //       {notificationCount}
          //     </Badge>
          //     <Iconviewcomponent
          //       Icontag={'Ionicons'}
          //       iconname={'notifications-outline'}
          //       icon_size={26}
          //       icon_color={Color.black}
          //     />
          //   </TouchableOpacity>
          // ),
        })}
      />
    </Stack.Navigator>
  );
};

export const MyCartStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="MyCart">
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={({ navigation }) => ({
          headerTitle: 'My Cart',
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
        name="OrderConfirmation"
        component={OrderConfirmation}
        options={({ navigation, route }) => ({
          headerTitle: 'Order Confirmation',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'My Account',
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
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{ right: 10 }}
          //     onPress={() => {
          //       navigation.navigate('Notification');
          //     }}>
          //     <Badge
          //       badgeStyle={{
          //         backgroundColor: Color.primary,
          //         position: 'absolute',
          //         right: 0,
          //         zIndex: 1,
          //       }}>
          //       {notificationCount}
          //     </Badge>
          //     <Iconviewcomponent
          //       Icontag={'Ionicons'}
          //       iconname={'notifications-outline'}
          //       icon_size={26}
          //       icon_color={Color.black}
          //     />
          //   </TouchableOpacity>
          // ),
        })}
      />

      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        options={({ navigation, route }) => ({
          headerTitle: 'Profile View',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="EditProfile"
        component={EditProfile}
        options={({ navigation, route }) => ({
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="MyOrders"
        component={MyOrders}
        options={({ navigation, route }) => ({
          headerTitle: 'My Orders',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="SelectAddress"
        component={SelectAddress}
        options={({ navigation, route }) => ({
          headerTitle: 'Select Delivery Address',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="AddAddress"
        component={AddAddress}
        options={({ navigation, route }) => ({
          headerTitle: 'Add address',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="FollowingSellers"
        component={FollowingSellers}
        options={({ navigation, route }) => ({
          headerTitle: 'Following Sellers',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
        name="SellerProfile"
        component={SellerProfile}
        options={({ navigation, route }) => ({
          headerTitle: 'Seller Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 18,
            fontFamily: Manrope.Bold,
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
    </Stack.Navigator>
  );
};

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const dataCount = useSelector(state => state.UserReducer.count);
  var { wishlist, cart } = dataCount;

  const dispatch = useDispatch();

  useEffect(() => {
    getCountData();
  }, [token]);

  const getCountData = async () => {
    try {
      const getData = await fetchData.profile_data(``, token);
      dispatch(
        setDataCount({
          wishlist: getData?.data?.wishlist_count,
          cart: getData?.data?.cart_count,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 55 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route?.name === 'HomeTab') {
            return focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'home'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Home
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'home-outline'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route?.name === 'WishListTab') {
            return focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'heart'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Wishlist
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'heart-outline'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Wishlist
                </Text>
              </View>
            );
          } else if (route?.name === 'MyCartTab') {
            return focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'cart-sharp'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  My Cart
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'cart-outline'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  My Cart
                </Text>
              </View>
            );
          } else if (route?.name === 'ProfileTab') {
            return focused ? (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={'user'}
                    icon_size={25}
                    icon_color={Color.primary}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Profile
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'user-o'}
                  icon_size={22}
                  icon_color={'#999999'}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? Color.primary : '#999999',
                    fontFamily: Manrope.Bold,
                  }}>
                  Profile
                </Text>
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.smokeyGrey,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WishListTab"
        component={WishListStack}
        options={{
          headerShown: false,
          tabBarBadge: wishlist,
        }}
      />
      <Tab.Screen
        name="MyCartTab"
        component={MyCartStack}
        options={{
          headerShown: false,
          tabBarBadge: cart,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
