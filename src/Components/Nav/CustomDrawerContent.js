import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../Icontag';
import {Media} from '../../Global/Media';
import common_fn from '../../Config/common_fn';

const CustomDrawerContent = props => {
  const [itemSelected, setItemSelected] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var {first_name, last_name, name, email, role} = userData;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const clickHistory = () => {
    setVisible(!visible);
    common_fn.Accordion;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      <View
        // onPress={() => {
        //   props.navigation.navigate('ProfileTab');
        // }}
        style={{
          backgroundColor: Color.primary,
          height: 250,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 20,
        }}>
        <Image
          source={Media.main_logo}
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
            borderRadius: 100,
            marginTop: 30,
            marginHorizontal: 10,
          }}
        />
        <View style={{flex: 1, marginHorizontal: 10, paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: Color.white,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
            }}
            numberOfLines={1}>
            Arunachalam Annamalai
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.white,
              fontFamily: Manrope.Medium,
              letterSpacing: 0.5,
              marginVertical: 5,
            }}>
            +91 9876543210
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10, marginBottom: 50}}>
          <View
            style={{
              backgroundColor:
                itemSelected === 'home' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('jobs');
                props.navigation.navigate('Home');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'home'}
                icon_size={22}
                icon_color={
                  itemSelected === 'home' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: itemSelected === 'home' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'home' ? Manrope.Bold : Manrope.Medium,
                }}>
                Dashboard
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'favorite' ? Color.primary : Color.white,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('favorite');
                props.navigation.navigate('Wishlist');
              }}>
              <Iconviewcomponent
                Icontag={'FontAwesome'}
                iconname={'bookmark'}
                icon_size={22}
                icon_color={
                  itemSelected === 'favorite' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color:
                    itemSelected === 'favorite' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'favorite' ? Manrope.Bold : Manrope.Medium,
                }}>
                Wish List
              </Text>
            </TouchableOpacity>
          </View>
          <Divider style={{height: 1, marginVertical: 10}} />
          <View
            style={{
              backgroundColor:
                itemSelected === 'helps' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 10,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('helps');
                clickHistory();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'information-circle'}
                  icon_size={24}
                  icon_color={
                    itemSelected === 'helps' ? Color.white : Color.primary
                  }
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 10,
                    color: itemSelected === 'helps' ? Color.white : Color.black,
                    fontFamily:
                      itemSelected === 'helps' ? Manrope.Bold : Manrope.Medium,
                  }}>
                  Help and Support
                </Text>
              </View>
              <Icon
                name={visible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={itemSelected === 'helps' ? Color.white : Color.black}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: Color.white,
              marginVertical: 5,
            }}>
            {visible && (
              <View style={{paddingHorizontal: 10}}>
                <View
                  style={{
                    backgroundColor:
                      itemSelected === 'About' ? Color.primary : Color.white,
                    // marginVertical: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 5,
                      paddingVertical: 10,
                      padding: 5,
                    }}
                    onPress={() => {
                      setItemSelected('About');
                      props.navigation.navigate('AboutUs');
                    }}>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'information-circle'}
                      icon_size={24}
                      icon_color={
                        itemSelected === 'About' ? Color.white : Color.primary
                      }
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        width: 150,
                        marginLeft: 15,
                        color:
                          itemSelected === 'About'
                            ? Color.white
                            : Color.lightBlack,
                        fontFamily: Manrope.Bold,
                      }}>
                      About Us
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor:
                      itemSelected === 'contact' ? Color.primary : Color.white,
                    // marginVertical: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 5,
                      paddingVertical: 10,
                      padding: 5,
                    }}
                    onPress={() => {
                      setItemSelected('contact');
                      props.navigation.navigate('ContactUs');
                    }}>
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'contacts'}
                      icon_size={24}
                      icon_color={
                        itemSelected === 'contact' ? Color.white : Color.primary
                      }
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        width: 150,
                        marginLeft: 15,
                        color:
                          itemSelected === 'contact'
                            ? Color.white
                            : Color.lightBlack,
                        fontFamily: Manrope.Bold,
                      }}>
                      Contact Us
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor:
                      itemSelected === 'faq' ? Color.primary : Color.white,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 5,
                      paddingVertical: 10,
                      padding: 5,
                    }}
                    onPress={() => {
                      setItemSelected('faq');
                      props.navigation.navigate('FAQs');
                    }}>
                    <Iconviewcomponent
                      Icontag={'MaterialCommunityIcons'}
                      iconname={'frequently-asked-questions'}
                      icon_size={24}
                      icon_color={
                        itemSelected === 'faq' ? Color.white : Color.primary
                      }
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        width: 150,
                        marginLeft: 15,
                        color:
                          itemSelected === 'faq'
                            ? Color.white
                            : Color.lightBlack,
                        fontFamily: Manrope.Bold,
                      }}>
                      FAQs
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'PrivacyPolicy' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 5,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('PrivacyPolicy');
                props.navigation.navigate('PrivacyPolicy');
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'shield-lock'}
                icon_size={24}
                icon_color={
                  itemSelected === 'PrivacyPolicy' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color:
                    itemSelected === 'PrivacyPolicy'
                      ? Color.white
                      : Color.black,
                  fontFamily:
                    itemSelected === 'PrivacyPolicy'
                      ? Manrope.Bold
                      : Manrope.Medium,
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'termscondition' ? Color.primary : Color.white,
              marginVertical: 0,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('termscondition');
                props.navigation.navigate('TermsandConditions');
              }}>
              <Iconviewcomponent
                Icontag={'FontAwesome'}
                iconname={'legal'}
                icon_size={22}
                icon_color={
                  itemSelected === 'termscondition'
                    ? Color.white
                    : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color:
                    itemSelected === 'termscondition'
                      ? Color.white
                      : Color.black,
                  fontFamily:
                    itemSelected === 'termscondition'
                      ? Manrope.Bold
                      : Manrope.Medium,
                }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              backgroundColor:
                itemSelected === 'settings' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('settings');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'settings'}
                icon_size={24}
                icon_color={
                  itemSelected === 'settings' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color:
                    itemSelected === 'settings' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'settings' ? Manrope.Bold : Manrope.Medium,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              backgroundColor:
                itemSelected === 'share' ? Color.primary : Color.white,
              marginVertical: 0,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('share');
                // onShare();
                common_fn.showToast(
                  'Only apps that are currently available on the Play Store can be shared',
                );
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={
                  itemSelected === 'share'
                    ? 'share-social-sharp'
                    : 'share-social'
                }
                icon_size={22}
                icon_color={
                  itemSelected === 'share' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: itemSelected === 'share' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'share' ? Manrope.Bold : Manrope.Medium,
                }}>
                Share the app
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor:
                itemSelected === 'Logout' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 5,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('Logout');
                props.navigation.navigate('Auth');
                AsyncStorage.clear();
                dispatch(setUserData({}));
                dispatch(setOnBoardVisible(false));
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'logout'}
                icon_size={22}
                icon_color={
                  itemSelected === 'Logout' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: itemSelected === 'Logout' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'Logout' ? Manrope.Bold : Manrope.Medium,
                }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default CustomDrawerContent;
