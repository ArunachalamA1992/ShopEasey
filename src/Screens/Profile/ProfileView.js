import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Divider} from 'react-native-paper';

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
    <View style={styles.container}>
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
          <View style={{}}>
            <View
              style={{
                flex: 1,
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ECEFFE',
                borderRadius: 10,
              }}>
              {profileData.profile?.length > 0 ? (
                <Image
                  source={{uri: profileData.profile}}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Image
                  source={{uri: Media.profile_image}}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Manrope.SemiBold,
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
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.SemiBold,
                      textDecorationLine: 'underline',
                      marginLeft: 5,
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Bold,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    paddingVertical: 5,
                    textTransform: 'capitalize',
                  }}>
                  {profileData.first_name + ' ' + profileData.last_name}
                </Text>
                <Divider style={{height: 1, marginVertical: 10}} />
              </View>
              {email != null ? (
                <View
                  style={{
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.Venus,
                      fontFamily: Manrope.Bold,
                    }}>
                    Email
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                    }}>
                    {profileData.email}
                  </Text>
                  <Divider style={{height: 1, marginVertical: 10}} />
                </View>
              ) : null}

              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                  }}>
                  Mobile Number
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                  }}>
                  {profileData.mobile}
                </Text>
                <Divider style={{height: 1, marginVertical: 10}} />
              </View>

              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                  }}>
                  Date of Birth
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                  }}>
                  {profileData.dob}
                </Text>
                <Divider style={{height: 1, marginVertical: 10}} />
              </View>

              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.Venus,
                    fontFamily: Manrope.Bold,
                  }}>
                  Gender
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textTransform: 'capitalize',
                  }}>
                  {profileData.gender}
                </Text>
                <Divider style={{height: 1, marginVertical: 10}} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});

export default ProfileView;
