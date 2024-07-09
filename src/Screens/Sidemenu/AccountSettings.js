import React, {useState} from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import common_fn from '../../Config/common_fn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../../Redux';

const AccountSettings = ({navigation}) => {
  const dispatch = useDispatch();

  const rootuserData = useSelector(state => state.UserReducer.userData);
  var {token} = rootuserData;
  const [isOrderSwitchOn, setIsOrderSwitchOn] = useState(false);
  const [isProSwitchOn, setIsProSwitchOn] = useState(false);
  const [isNewsSwitchOn, setIsNewsSwitchOn] = useState(false);

  const changeCountryClick = () => {
    try {
      Alert.alert(
        'Alert',
        'Are you sure you want to change the Country?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('OnboardScreen');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('catch in change_Country : ', error);
    }
  };

  const removeUserClick = () => {
    try {
      Alert.alert(
        'Alert',
        'Are you sure you want to Remove/Delete account?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              Linking.openURL(`https://shopeasey.com/delete-user/${token}`);
              AsyncStorage.clear();
              navigation.replace('OnboardScreen');
              dispatch(setUserData({}));
              common_fn.showToast('Your account has beed deleted');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('catch in change_Country : ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F5F6FA',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'justify',
              color: Color.black,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              lineHeight: 22,
              padding: 5,
            }}>
            About ShopEasey
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'justify',
              color: Color.cloudyGrey,
              fontFamily: Manrope.Light,
              letterSpacing: 0.5,
              lineHeight: 22,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            Moving to a new country can be both exciting and challenging.
            MoveEasy is here to make your transition as smooth as possible. Our
            mobile app is designed to provide you with all the tools and
            resources you need to settle into your new home seamlessly.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Color.white,
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'justify',
                color: Color.black,
                fontFamily: Manrope.Bold,
                letterSpacing: 0.5,
                padding: 5,
              }}>
              Change Country
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'justify',
                color: Color.cloudyGrey,
                fontFamily: Manrope.Light,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingHorizontal: 10,
              }}>
              Seamlessly transition to your new country with personalized local
              guides, language assistance, and essential services. Download now
              and make your move stress-free!
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Button
              mode="contained"
              onPress={() => {
                changeCountryClick();
              }}
              style={{
                marginVertical: 10,
                borderRadius: 50,
                marginHorizontal: 5,
                backgroundColor: Color.primary,
              }}>
              Change
            </Button>
          </View>
        </View>

        {token != undefined && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Color.white,
              padding: 10,
            }}>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'justify',
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  letterSpacing: 0.5,
                  padding: 5,
                }}>
                Remove Account
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'justify',
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Light,
                  letterSpacing: 0.5,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}>
                If you want to remove, and tap Remove account. This will delete
                all associated data and content from your device
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                removeUserClick();
              }}
              style={{
                flex: 0,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: Color.primary,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 14, color: Color.white}}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        marginVertical: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                                padding: 3,
                            }}>
                            Promotional Offers
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'justify',
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Light,
                                letterSpacing: 0.5,
                                lineHeight: 22,
                                padding: 3,
                            }}>
                            Stay informed at every step of your order journey, from
                            confirmation to delivery
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <Switch
                            value={isProSwitchOn}
                            onValueChange={setIsProSwitchOn}
                            color={Color.primary}
                        />
                    </View>
                </View>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        marginVertical: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                                padding: 3,
                            }}>
                            News and Updates
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'justify',
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Light,
                                letterSpacing: 0.5,
                                lineHeight: 22,
                                padding: 3,
                            }}>
                            Stay informed at every step of your order journey, from
                            confirmation to delivery
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <Switch
                            value={isNewsSwitchOn}
                            onValueChange={setIsNewsSwitchOn}
                            color={Color.primary}
                        />
                    </View>
                </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

export default AccountSettings;
