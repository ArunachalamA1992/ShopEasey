import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
import HomeScreen from './Screens/Home/HomeScreen';
import Color from './Global/Color';
import {Iconviewcomponent} from './Components/Icontag';
import WishList from './Screens/Home/BottomTabs/WishList';
import MyCart from './Screens/Home/BottomTabs/MyCart';
import Profile from './Screens/Home/BottomTabs/Profile';
import Login from './Screens/Auth/Login';
import OTPScreen from './Screens/Auth/OTPScreen';
import {NavigationDrawerStructure} from './Components/Nav/NavDrawer';
import {Manrope} from './Global/FontFamily';
import PrivacyPolicy from './Screens/Sidemenu/PrivacyPolicy';
import TermsandConditions from './Screens/Sidemenu/TermsandConditions';
import FAQs from './Screens/Sidemenu/FAQs';
import ContactUs from './Screens/Sidemenu/ContactUs';
import AboutUs from './Screens/Sidemenu/AboutUs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleStyle: {color: Color.black},
          headerStyle: {backgroundColor: Color.white, elevation: 0},
          headerLeft: () => (
            <View
              style={{
                width: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NavigationDrawerStructure navigation={navigation} home={true} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}>
                  Shop Easey
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                width: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{right: 30}} onPress={() => {}}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'notifications-outline'}
                  icon_size={26}
                  icon_color={Color.black}
                  iconstyle={{marginTop: 0}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{right: 15}}
                onPress={() => {
                  // navigation.navigate('Notification');
                }}>
                {/* <Badge
                  badgeStyle={{
                    backgroundColor: Color.primary,
                    position: 'absolute',
                    right: 0,
                    zIndex: 1,
                  }}>
                  00
                </Badge> */}
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'cart-outline'}
                  icon_size={22}
                  icon_color={Color.black}
                  iconstyle={{marginTop: 0}}
                />
              </TouchableOpacity>
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
        name="ContactUs"
        component={ContactUs}
        options={({navigation, route}) => ({
          headerTitle: 'Contact Us',
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
        name="FAQs"
        component={FAQs}
        options={({navigation, route}) => ({
          headerTitle: 'FAQs',
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
        options={({navigation}) => ({
          headerTitle: 'Wish List',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.black},
          headerStyle: {backgroundColor: Color.white, elevation: 0},
          headerLeft: () => (
            <NavigationDrawerStructure navigation={navigation} home={true} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{right: 10}}
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              <Badge
                badgeStyle={{
                  backgroundColor: Color.primary,
                  position: 'absolute',
                  right: 0,
                  zIndex: 1,
                }}>
                {notificationCount}
              </Badge>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'notifications-outline'}
                icon_size={26}
                icon_color={Color.black}
              />
            </TouchableOpacity>
          ),
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
        options={({navigation}) => ({
          headerTitle: 'My Cart',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.black},
          headerStyle: {backgroundColor: Color.white, elevation: 0},
          headerLeft: () => (
            <NavigationDrawerStructure navigation={navigation} home={true} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{right: 10}}
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              <Badge
                badgeStyle={{
                  backgroundColor: Color.primary,
                  position: 'absolute',
                  right: 0,
                  zIndex: 1,
                }}>
                {notificationCount}
              </Badge>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'notifications-outline'}
                icon_size={26}
                icon_color={Color.black}
              />
            </TouchableOpacity>
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
        options={({navigation}) => ({
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.black},
          headerStyle: {backgroundColor: Color.white, elevation: 0},
          headerLeft: () => (
            <NavigationDrawerStructure navigation={navigation} home={true} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{right: 10}}
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              <Badge
                badgeStyle={{
                  backgroundColor: Color.primary,
                  position: 'absolute',
                  right: 0,
                  zIndex: 1,
                }}>
                {notificationCount}
              </Badge>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'notifications-outline'}
                icon_size={26}
                icon_color={Color.black}
              />
            </TouchableOpacity>
          ),
        })}
      />
      {/* <Stack.Screen
        name="profileIntro"
        component={IntroductionScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Profile',
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
      />
      <Stack.Screen
        name="Education"
        component={EducationDetails}
        options={({navigation, route}) => ({
          headerTitle: 'Education Details',
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
      />
      <Stack.Screen
        name="Experience"
        component={EmploymentDetails}
        options={({navigation, route}) => ({
          headerTitle: 'Employement Details',
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
      />
      <Stack.Screen
        name="Project"
        component={ProjectScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Projects',
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
      />
      <Stack.Screen
        name="StepEducation"
        component={StepEducation}
        options={({navigation, route}) => ({
          headerTitle: 'Select Education',
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
      />
      <Stack.Screen
        name="StepEmployment"
        component={StepEmployment}
        options={({navigation, route}) => ({
          headerTitle: 'Select Employment',
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
  );
};

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {height: 55},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route?.name === 'HomeTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'home'}
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'person-circle'}
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
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'person-circle'}
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
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="WishListTab"
        component={WishListStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MyCartTab"
        component={MyCartStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
