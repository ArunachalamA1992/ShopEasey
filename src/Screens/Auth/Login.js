import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Media } from '../../Global/Media';
import messaging from '@react-native-firebase/messaging';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  console.log("countryCode *********************:", countryCode);

  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  const isEmail = input => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return emailRegex.test(input);
  };

  const isMobile = input => {
    const mobileRegex = countryCode?.id === 454 ? /^[0-9]{8}$/ : 453 ? /^[0-9]{10}$/ : /^[6-9][0-9]{9}$/;
    return mobileRegex.test(input);
  };

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '573868691501-50tudos3b49fgfjar4q841sjmhmmm12e.apps.googleusercontent.com',
        offlineAccess: false,
      });
      getFCMToken();
    } catch (error) {
      console.log('catch in useEffext_Sigin ----------- : ', error);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  const getFCMToken = async () => {
    try {
      console.log("jksdgjksdhkghjksdghk");

      let fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log("NEW -------------- :", fcmToken);
      if (!fcmToken) {
        try {
          const newToken = await messaging().getToken();


          if (newToken) {
            await AsyncStorage.setItem('fcmToken', newToken);
            setToken(newToken);
          } else {
            console.log('No token returned from FCM');
          }
        } catch (error) {
          console.log('Error while fetching new FCM token:', error);
        }
      } else {
        console.log('FCM Token already exists, no need to fetch a new one.');
        setToken(fcmToken); // Use the existing token
      }
    } catch (error) {
      console.log('Error in getFCMToken function:', error);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        const data = {
          first_name: userInfo?.user?.givenName,
          last_name: userInfo?.user?.familyName,
          profile: userInfo?.user?.photo,
          region_id: countryCode?.id,
          email: userInfo?.user?.email,
          fcm_token: token,
        };
        console.log('Form data ================= : ', data);

        const updateProfiledata = await fetchData.login_with_gmail(data, null);
        if (updateProfiledata.message) {
          const UserLogin = {
            ...updateProfiledata?.data,
            token: updateProfiledata?.token,
          };
          await AsyncStorage.setItem('user_data', JSON.stringify(UserLogin));
          navigation.replace('TabNavigator');
          common_fn.showToast(`Welcome to ShopEasey`);
        }
      }
    } catch (error) {
      console.log('catch in google_Signing', error);
    }
  };

  const chkNumber = (number) => {
    setNumber(number);

    // Set min and max length dynamically based on country code
    const minLength =
      countryCode?.id === 454 ? 8 : countryCode?.id === 453 ? 10 : 10;
    const maxLength =
      countryCode?.id === 454 ? 9 : countryCode?.id === 453 ? 11 : 10;

    // Define regex for mobile number validation
    const mobileRegex = /^[0-9]*$/; // Allow only digits

    // Validate length and format
    if (
      mobileRegex.test(number) &&
      number.length >= minLength &&
      number.length <= maxLength
    ) {
      Keyboard.dismiss(); // Dismiss keyboard on valid input
    }
  };

  const chkNumberError = (number) => {
    const minLength =
      countryCode?.id === 454 ? 8 : countryCode?.id === 453 ? 10 : 10;
    const maxLength =
      countryCode?.id === 454 ? 9 : countryCode?.id === 453 ? 11 : 10;

    let reg = /^[6-9][0-9]*$/; // Starting digit validation

    if (number.length === 0) {
      setError('Please enter your mobile number');
    } else if (number.length < minLength) {
      setError(`Number must be at least ${minLength} digits`);
    } else if (number.length > maxLength) {
      setError(`Number must not exceed ${maxLength} digits`);
    } else if (!reg.test(number)) {
      setError('Invalid number format');
    } else {
      setError(''); // Clear error if valid
    }
  };
  const loginVerify = async () => {
    try {
      setLoading(true);

      const numberIsEmail = isEmail(number);
      const numberIsMobile = isMobile(number);

      // Set min and max length dynamically based on country code
      const minLength =
        countryCode?.id === 454 ? 8 : countryCode?.id === 453 ? 10 : 10;
      const maxLength =
        countryCode?.id === 454 ? 9 : countryCode?.id === 453 ? 11 : 10;

      if (number !== '') {
        // console.log("MOBILE ------------- ", numberIsMobile + "Email -------------- :" + numberIsEmail);
        if (
          numberIsEmail || numberIsMobile &&
          (
            number.length >= minLength &&
            number.length <= maxLength)
        ) {

          const data = {
            region_id: countryCode?.id,
            ...(isEmail(number) ? { email: number } : { mobile: number }),
          };

          console.log("token ---------------- :", token);

          // Call the API
          const login_data = await fetchData.login_with_otp(data, null);
          console.log('login_data resp ================:', login_data);

          if (login_data?.status) {
            common_fn.showToast(login_data?.message);
            navigation.dispatch(
              StackActions.replace('OTPScreen', {
                number,
                token: null,
                loginType,
                fcmToken: token,
              })
            );
          } else {
            setError(login_data?.message || 'Login failed');
          }
        } else {
          common_fn.showToast(
            `Invalid ${countryCode?.id === 452 ? 'Phone' : 'WhatsApp'
            } Number`
          );
        }
      } else {
        common_fn.showToast(
          `Enter your ${countryCode?.id === 452 ? 'Phone' : 'WhatsApp'
          } or Email ID`
        );
      }
    } catch (error) {
      console.log('error', error);
      common_fn.showToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const RegisterVerify = async () => {
    try {
      setLoading(true);
      const numberIsEmail = isEmail(number);
      const numberIsMobile = isMobile(number);
      const num_len = countryCode?.id == 454 ? 8 : 10;

      if (number != '') {
        if (numberIsEmail || (number.length === num_len)) {
          var data = {
            region_id: countryCode?.id,
          };
          if (isEmail(number)) {
            data.email = number;
          } else {
            data.mobile = number;
          }

          console.log("Request -------------- :", data);
          const Register_data = await fetchData.Register_request_otp(
            data,
            null,
          );
          console.log("Response -------------- :", Register_data);

          if (Register_data?.status) {
            common_fn.showToast(Register_data?.message);
            navigation.navigate('OTPScreen', {
              number,
              token: Register_data?.token,
              loginType,
              fcmToken: token,
            });
            setLoading(false);
          } else {
            var msg = Register_data?.message;
            setError(msg);
            setLoading(false);
          }
          setLoading(false);
        } else {
          let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;
          if (reg.test(number)) {
            common_fn.showToast(`Invalid Email ID`);
          } else {
            common_fn.showToast(
              `Invalid ${countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
              }  Number`,
            );
          }
          setLoading(false);
        }
      } else {
        common_fn.showToast(
          `Enter your ${countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
          } or email id`,
        );
      }
    } catch (error) {
      console.log('catch in Register_Verify_', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 10,
          // marginTop: 20,
        }}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 26,
            color: Color.black,
            fontFamily: Manrope.SemiBold,
          }}>
          {loginType == '' ? 'Login to' : 'Register to'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 34,
              color: Color.black,
              fontFamily: Manrope.Bold,
            }}>
            Shopeasey
          </Text>
          <Iconviewcomponent
            Icontag={'MaterialIcons'}
            iconname={'shopping-bag'}
            icon_size={42}
            iconstyle={{ color: Color.primary, marginHorizontal: 5 }}
          />
        </View>
      </View>
      <View
        style={{
          //   flex: 1,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Color.black,
            fontFamily: Manrope.Bold,
            marginTop: 10,
          }}>
          {countryCode?.id == 452 ? 'Mobile' : 'WhatsApp'} Number/Email
        </Text>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.NumberBoxConatiner}>
            {number.match(/[a-z]/i) ? (
              <View />
            ) : (
              <Text style={styles.numberCountryCode}>
                {countryCode?.mobile_prefix}
              </Text>
            )}
            <TextInput
              placeholder={
                countryCode?.id === 452 ? 'Mobile' : 'WhatsApp Number or Email'
              }
              placeholderTextColor={Color.cloudyGrey}
              value={number}
              maxLength={
                isMobile(number) && [452, 453, 454].includes(countryCode?.id)
                  ? countryCode?.id === 454
                    ? 9 // Singapore max length
                    : countryCode?.id === 453
                      ? 11 // Malaysia max length
                      : 10 // India max length
                  : undefined
              }
              onChangeText={(input) => {
                chkNumber(input); // Validate number dynamically
                // chkNumberError(input); // Show error feedback
              }}
              style={styles.numberTextBox}
            />
          </View>
          {error && <Text style={styles.invalidLogin}>{error}</Text>}
        </View>
        <TouchableOpacity
          onPress={() => {
            loginType == '' ? loginVerify() : RegisterVerify();
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 20,
            backgroundColor: Color.primary,
            borderColor: Color.primary,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              lineHeight: 22,
            }}>
            {loginType == '' ? 'LOGIN' : 'REGISTER'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: 'row',
            marginVertical: 10,
            backgroundColor: Color.white,
            borderColor: Color.cloudyGrey,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            googleSignIn();
          }}>
          <Image
            source={{ uri: Media.google_icon }}
            style={{ width: 30, height: 30, resizeMode: 'contain' }}
          />
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.SemiBold,
              paddingHorizontal: 10,
            }}>
            {loginType == '' ? 'Login With Google' : 'Register With Google'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //   flex: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center', marginVertical: 10
        }}>
        <View
          style={{
            width: '45%',
            height: 0.5,
            backgroundColor: Color.transparantBlack,
            borderRadius: 5,
          }}></View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: Color.cloudyGrey,
            fontFamily: Manrope.SemiBold,
            letterSpacing: 0.5,
            lineHeight: 22,
          }}>
          {' '}
          or{' '}
        </Text>
        <View
          style={{
            width: '45%',
            height: 0.5,
            backgroundColor: Color.transparantBlack,
            borderRadius: 5,
          }}></View>
      </View>
      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
          padding: 10,
          // marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Color.black,
            fontFamily: Manrope.SemiBold,
            // paddingHorizontal: 10,
          }}>
          {loginType == ''
            ? "Don't have an account?"
            : 'You already have an account'}
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: 'row',
            marginVertical: 10,
            backgroundColor: Color.white,
            borderColor: Color.cloudyGrey,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            loginType == '' ? setLoginType('Register') : setLoginType('');
            setNumber('');
            setError(false);
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Manrope.Bold,
              paddingHorizontal: 10,
            }}>
            {loginType == '' ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          paddingHorizontal: 10,
          justifyContent: 'flex-end',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 13,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Medium,
              lineHeight: 22,
            }}>
            By tapping continue with google, You agree to{' '}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 12,
              color: Color.black,
              fontFamily: Manrope.Bold,
              lineHeight: 22,
            }}>
            ShopEasey
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsandConditions')}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.primary,
                textDecorationLine: 'underline',
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 13,
              paddingHorizontal: 5,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Medium,
              letterSpacing: 0.5,
              lineHeight: 22,
            }}>
            and
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.primary,
                textDecorationLine: 'underline',
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  NumberBoxConatiner: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    fontSize: 16,
    fontFamily: Manrope.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
  },
  invalidLogin: {
    fontSize: 12,
    fontFamily: Manrope.Light,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  numberTextBox: {
    flex: 1,
    display: 'flex',
    height: 50,
    borderLeftColor: Color.Venus,
    borderLeftWidth: 1,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    fontFamily: Manrope.SemiBold,
    alignItems: 'flex-start',
  },
});

export default Login;