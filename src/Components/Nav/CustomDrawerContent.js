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
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Gilmer} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../Icontag';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCompleteProfile, setOnBoardVisible, setUserData} from '../../Redux';
import common_fn from '../../Config/common_fn';

const CustomDrawerContent = props => {
  const [itemSelected, setItemSelected] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var {first_name, last_name, name, email, role} = userData;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [customDrawer] = useState([
    {
      id: 1,
      name: 'Applied Jobs',
      navigate: 'AppliedJobs',
      icon: 'location-arrow',
      icontag: 'FontAwesome5',
    },
    {
      id: 2,
      name: 'Favorite Jobs',
      navigate: 'SavedJobsTab',
      icon: 'bookmark',
      icontag: 'FontAwesome',
    },
    {
      id: 3,
      name: 'Helps and Support',
      navigate: '',
      icon: 'information-circle',
      icontag: 'Ionicons',
    },
    {
      id: 4,
      name: 'Privacy Policy',
      navigate: 'PrivacyPolicy',
      icon: 'shield-lock',
      icontag: 'MaterialCommunityIcons',
    },
    {
      id: 5,
      name: 'Terms & Conditions',
      navigate: 'TermsCondition',
      icon: 'legal',
      icontag: 'FontAwesome',
    },
    {
      id: 6,
      name: 'Settings',
      navigate: '',
      icon: 'settings',
      icontag: 'Ionicons',
    },
    {
      id: 7,
      name: 'Share the app',
      navigate: '',
      icon: 'share-social',
      icontag: 'Ionicons',
    },
  ]);

  const clickHistory = () => {
    setVisible(!visible);
    common_fn.Accordion;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProfileTab');
        }}
        style={{
          backgroundColor: Color.primary,
          height: 200,
          alignItems: 'flex-start',
          justifyContent: 'center',
          // flexDirection: 'row',
          padding: 10,
        }}>
        <Image
          source={Media.user}
          style={{
            width: 90,
            height: 90,
            resizeMode: 'contain',
            borderRadius: 100,
            marginTop: 20,
          }}
        />
        <View style={{flex: 1, marginHorizontal: 5}}>
          <Text
            style={{
              fontSize: 20,
              color: Color.white,
              fontFamily: Gilmer.Bold,
              textTransform: 'capitalize',
            }}
            numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.white,
              fontFamily: Gilmer.SemiBold,
              marginVertical: 5,
            }}>
            {email}
          </Text>
        </View>
        {/* <Icon
          name="chevron-forward"
          size={18}
          color={Color.white}
          style={{ marginRight: 10 }}
        /> */}
      </TouchableOpacity>
      {/* <FlatList
        data={customDrawer}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor:
                  itemSelected === item?.name ? Color.primary : Color.white,
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
                  setItemSelected(item?.name);
                }}>
                <Iconviewcomponent
                  Icontag={item?.icontag}
                  iconname={item?.icon}
                  icon_size={22}
                  icon_color={
                    itemSelected === item?.name ? Color.white : Color.primary
                  }
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    color:
                      itemSelected === item?.name ? Color.white : Color.black,
                    fontFamily:
                      itemSelected === item?.name ? Gilmer.Bold : Gilmer.Medium,
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
              {item?.id > 1 && item.id == 2 && (
                <Divider style={{height: 1, marginVertical: 10}} />
              )}
            </View>
          );
        }}
      />
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
          }}>
          <Iconviewcomponent
            Icontag={'MaterialCommunityIcons'}
            iconname={'logout'}
            icon_size={22}
            icon_color={itemSelected === 'Logout' ? Color.white : Color.primary}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              color: itemSelected === 'Logout' ? Color.white : Color.black,
              fontFamily:
                itemSelected === 'Settings' ? Gilmer.Bold : Gilmer.Medium,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10, marginBottom: 50}}>
          <View
            style={{
              backgroundColor:
                itemSelected === 'jobs' ? Color.primary : Color.white,
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
                props.navigation.navigate('AppliedJobs');
              }}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'home'}
                icon_size={22}
                icon_color={
                  itemSelected === 'jobs' ? Color.white : Color.primary
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: itemSelected === 'jobs' ? Color.white : Color.black,
                  fontFamily:
                    itemSelected === 'jobs' ? Gilmer.Bold : Gilmer.Medium,
                }}>
                Applied Jobs
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                itemSelected === 'favorite' ? Color.primary : Color.white,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
                paddingVertical: 15,
                padding: 10,
              }}
              onPress={() => {
                setItemSelected('favorite');
                props.navigation.navigate('SavedJobsTab');
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
                    itemSelected === 'favorite' ? Gilmer.Bold : Gilmer.Medium,
                }}>
                Favorite Jobs
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
                      itemSelected === 'helps' ? Gilmer.Bold : Gilmer.Medium,
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
                        fontFamily: Gilmer.Bold,
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
                        fontFamily: Gilmer.Bold,
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
                        fontFamily: Gilmer.Bold,
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
                paddingVertical: 10,
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
                      ? Gilmer.Bold
                      : Gilmer.Medium,
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
                props.navigation.navigate('TermsCondition');
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
                      ? Gilmer.Bold
                      : Gilmer.Medium,
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
                    itemSelected === 'settings' ? Gilmer.Bold : Gilmer.Medium,
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
                    itemSelected === 'share' ? Gilmer.Bold : Gilmer.Medium,
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
                    itemSelected === 'Logout' ? Gilmer.Bold : Gilmer.Medium,
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
