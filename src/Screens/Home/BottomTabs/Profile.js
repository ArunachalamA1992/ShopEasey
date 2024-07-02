import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../../Global/Media';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../../Config/fetchData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {setUserData} from '../../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../../Config/common_fn';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    setLoading(true);
    getData().finally(() => {
      setLoading(false);
    });
  }, [token]);

  const getData = async () => {
    try {
      const profile = await fetchData.profile_data(``, token);
      setProfileData(profile.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{padding: 10}}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={100}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item style={{marginHorizontal: 10}}>
                  <SkeletonPlaceholder.Item
                    width={150}
                    height={10}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <SkeletonPlaceholder.Item
                    width={250}
                    height={10}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
              <View>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={1}
                  borderRadius={100}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginTop={10}
                  />
                  <View style={{flex: 1}}>
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={20}
                      borderRadius={10}
                      marginTop={10}
                      marginHorizontal={10}
                    />
                  </View>
                  <SkeletonPlaceholder.Item
                    width={30}
                    height={30}
                    borderRadius={100}
                    marginTop={10}
                  />
                </SkeletonPlaceholder.Item>
              </View>
            </SkeletonPlaceholder>
          </View>
        ) : (
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.softGrey,
                  borderRadius: 100,
                }}>
                {profileData.profile?.length > 0 ? (
                  <Image
                    source={{uri: profileData.profile}}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: Media.user}}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                      borderRadius: 100,
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}
                  numberOfLines={2}>
                  {profileData.first_name && profileData.last_name
                    ? profileData.first_name + ' ' + profileData.last_name
                    : '--------'}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}
                  numberOfLines={1}>
                  {profileData.email ? profileData.email : '-- -- ---'}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                backgroundColor: Color.softGrey,
                paddingVertical: 2,
              }}></View>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileView')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'user'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Your Profile
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('MyOrders')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'shoppingcart'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    My Orders
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate('MyRewards')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'award'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    My Rewards
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('SelectAddress')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'map-marker-alt'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Address
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              {/* <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View> */}

              {/* <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'card-outline'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Saved Cards
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity> */}

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('FollowingSellers')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome'}
                    iconname={'building-o'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Following Sellers
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate('NotificationSettings')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'notifications-outline'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Notification Setting
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              {/* <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialIcons'}
                    iconname={'manage-accounts'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Account Settings
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: Color.softGrey,
                paddingVertical: 2,
                marginVertical: 10,
              }}></View>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate('ReturnRefundPolicy')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Octicons'}
                    iconname={'circle-slash'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Return & Refund Policy
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'lock'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Privacy Policy
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('TermsandConditions')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'open-book'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Terms & Conditions
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => {
                  common_fn.showToast(
                    'Only apps that are currently available on the Play Store can be shared',
                  );
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'user-plus'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Invite Friends
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('AboutUs')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'information-circle-outline'}
                    icon_size={22}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    About Us
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('ContactUs')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'contacts'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Contact Us
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: Color.Venus,
                  marginVertical: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => navigation.navigate('FAQs')}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'questioncircleo'}
                    icon_size={20}
                    icon_color={Color.lightBlack}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.lightBlack,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    FAQ’s
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={18}
                    icon_color={Color.cloudyGrey}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 50,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#ECEFFE',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'headset'}
                    icon_size={20}
                    icon_color={Color.primary}
                  />
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                      letterSpacing: 0.5,
                    }}>
                    Feel free to ask! We're here to help
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OnboardScreen');
                  AsyncStorage.clear();
                  dispatch(setUserData({}));
                }}
                style={{
                  width: '90%',
                  height: 50,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Color.white,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;
