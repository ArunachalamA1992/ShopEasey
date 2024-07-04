import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const [loginType, setLoginType] = useState('');
  const dispatch = useDispatch();

  const isEmail = input => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const isMobile = input => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(input);
  };

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '573868691501-50tudos3b49fgfjar4q841sjmhmmm12e.apps.googleusercontent.com',
        offlineAccess: false,
        // webClientId: '1080007356916-6amrf74qvgd060rprqqeegs06s168dn1.apps.googleusercontent.com',
        // offlineAccess: true,
        // hostedDomain: '',
        // forceConsentPrompt: true,
      });
    } catch (error) {
      console.log('error ----------- : ', error);
    }
  }, []);

  const googleSignIn = async navigation => {
    try {
      const replace = navigation;
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User info ============== :', JSON.stringify(userInfo));
      if (userInfo) {
        var data = {
          region_id: countryCode?.id,
          email: userInfo?.user?.email,
        };
        const updateProfiledata = await fetchData.login_with_gmail(data, null);
        console.log(updateProfiledata);
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
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  const chkNumberError = number => {
    let reg = /^[6-9][0-9]*$/;

    if (number.length === 0) {
      setError('Please enter your mobile number');
    } else if (reg.test(number) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(number) === true) {
      setError('');
    }
  };

  const loginVerify = async () => {
    try {
      setLoading(true);
      const numberIsEmail = isEmail(number);
      const numberIsMobile = isMobile(number);
      if (numberIsEmail || (numberIsMobile && number.length === 10)) {
        var data = {
          region_id: countryCode?.id,
        };
        if (isEmail(number)) {
          data.email = number;
        } else if (isMobile(number)) {
          data.mobile = number;
        }
        const login_data = await fetchData.login_with_otp(data, null);
        if (login_data?.status == true) {
          common_fn.showToast('OTP Sent to your Email');
          navigation.navigate('OTPScreen', {
            number,
            token: login_data?.token,
            loginType,
          });
          setLoading(false);
        } else {
          var msg = login_data?.message;
          setError(msg);
          setLoading(false);
        }
        setLoading(false);
      } else {
        common_fn.showToast(
          'Invalid Phone Number Please Enter Your 10 Digit Phone Number',
        );
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const RegisterVerify = async () => {
    try {
      setLoading(true);
      setLoading(true);
      const numberIsEmail = isEmail(number);
      const numberIsMobile = isMobile(number);
      if (numberIsEmail || (numberIsMobile && number.length === 10)) {
        var data = {
          region_id: countryCode?.id,
        };
        if (isEmail(number)) {
          data.email = number;
        } else if (isMobile(number)) {
          data.mobile = number;
        }
        const Register_data = await fetchData.Register_request_otp(data, null);
        if (Register_data?.status == true) {
          common_fn.showToast('OTP Sent to your Email');
          navigation.navigate('OTPScreen', {
            number,
            token: Register_data?.token,
            loginType,
          });
          setLoading(false);
        } else {
          var msg = Register_data?.message;
          setError(msg);
          setLoading(false);
        }
        setLoading(false);
      } else {
        common_fn.showToast(
          'Invalid Phone Number Please Enter Your 10 Digit Phone Number',
        );
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: 10,
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            iconstyle={{color: Color.primary, marginHorizontal: 5}}
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
          Mobile Number/Email
        </Text>
        <View style={{marginVertical: 10}}>
          <View style={styles.NumberBoxConatiner}>
            {/* <Text style={styles.numberCountryCode}>+91</Text> */}
            <TextInput
              placeholder="Mobile number or Email"
              placeholderTextColor={Color.cloudyGrey}
              value={number}
              maxLength={isMobile(number) ? 10 : undefined}
              autoFocus={
                isMobile(number) && number.length === 10 ? false : true
              }
              onChangeText={input => {
                chkNumber(input);
                chkNumberError(input);
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
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          //   flex: 1,
          justifyContent: 'center',
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
            source={{uri: Media.google_icon}}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.SemiBold,
              paddingHorizontal: 10,
            }}>
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
      {loginType == '' && (
        <View
          style={{
            //   flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
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
      )}
      {loginType == '' ? (
        <View
          style={{
            //   flex: 1,
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.Bold,
              // paddingHorizontal: 10,
            }}>
            Don't Have An Account?
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
              setLoginType('Register');
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                fontFamily: Manrope.Bold,
                paddingHorizontal: 10,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            //   flex: 1,
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.Bold,
              // paddingHorizontal: 10,
            }}>
            You Already have an account
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
              setLoginType('');
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                fontFamily: Manrope.Bold,
                paddingHorizontal: 10,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 10,
          // justifyContent: 'flex-end',
          // padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 12,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Medium,
              letterSpacing: 0.5,
              lineHeight: 22,
            }}>
            By tapping continue with google, You agree to{' '}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 12,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              lineHeight: 22,
            }}>
            ShopEasey
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              fontSize: 12,
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
    justifyContent: 'center',
  },
  NumberBoxConatiner: {
    display: 'flex',
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: Manrope.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
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
