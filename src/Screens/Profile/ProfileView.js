import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// create a component
const ProfileView = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.UserReducer.userData);
  var {first_name, last_name, profile, email, mobile, dob, gender, token} =
    userData;

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      getData().finally(() => setLoading(false));
    } catch (error) {
      console.log('catch in Profile_View :', error);
    }
  }, [token]);

  const getData = async () => {
    try {
      const profile = await fetchData.profile_data(``, token);
      setProfileData(profile.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item style={{}}>
                <SkeletonPlaceholder.Item width="100%" height={150} />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={150}
                  borderRadius={10}
                  style={{marginTop: 10}}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={150}
                  borderRadius={10}
                  style={{marginTop: 10}}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={150}
                  borderRadius={10}
                  style={{marginTop: 10}}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={150}
                  borderRadius={10}
                  style={{marginTop: 10}}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={150}
                  borderRadius={10}
                  style={{marginTop: 10}}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 10,
              marginVertical: 0,
            }}>
            <View
              style={{
                flex: 1,
                width: '95%',
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                backgroundColor: '#ECEFFE',
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
                  source={{uri: Media.profile_image}}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </View>
            <View style={{flex: 1, width: '90%', alignItems: 'center'}}>
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  Personal Details
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      profileData: profileData,
                    })
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Iconviewcomponent
                    Icontag={'MaterialIcons'}
                    iconname={'edit'}
                    icon_size={16}
                    icon_color={Color.primary}
                  />
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 12,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                      textDecorationLine: 'underline',
                      letterSpacing: 0.5,
                      paddingStart: 5,
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '95%',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                    paddingVertical: 5,
                    textTransform: 'capitalize',
                  }}>
                  {profileData.first_name + ' ' + profileData.last_name}
                </Text>
                <View
                  style={{
                    width: '95%',
                    height: 1,
                    backgroundColor: Color.Venus,
                  }}></View>
              </View>
              {email != null ? (
                <View
                  style={{
                    width: '95%',
                    alignItems: 'flex-start',
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 12,
                      color: Color.Venus,
                      fontFamily: Manrope.Bold,
                      letterSpacing: 0.5,
                    }}>
                    Email
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                      paddingVertical: 5,
                    }}>
                    {profileData.email}
                  </Text>
                  <View
                    style={{
                      width: '95%',
                      height: 1,
                      backgroundColor: Color.Venus,
                    }}></View>
                </View>
              ) : null}

              <View
                style={{
                  width: '95%',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}>
                  Mobile Number
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                    paddingVertical: 5,
                  }}>
                  {profileData.mobile}
                </Text>
                <View
                  style={{
                    width: '95%',
                    height: 1,
                    backgroundColor: Color.Venus,
                  }}></View>
              </View>

              <View
                style={{
                  width: '95%',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}>
                  Date of Birth
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                    paddingVertical: 5,
                  }}>
                  {profileData.dob}
                </Text>
                <View
                  style={{
                    width: '95%',
                    height: 1,
                    backgroundColor: Color.Venus,
                  }}></View>
              </View>

              <View
                style={{
                  width: '95%',
                  alignItems: 'flex-start',
                  marginVertical: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                  }}>
                  Gender
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                    paddingVertical: 5,
                    textTransform: 'capitalize',
                  }}>
                  {profileData.gender}
                </Text>
                <View
                  style={{
                    width: '95%',
                    height: 1,
                    backgroundColor: Color.Venus,
                  }}></View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default ProfileView;
