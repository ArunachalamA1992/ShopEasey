import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
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
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
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
      });
    } catch (error) {
      console.log('error ----------- : ', error);
    }
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        var data = {
          first_name: userInfo?.user?.givenName,
          last_name: userInfo?.user?.familyName,
          profile: userInfo?.user?.photo,
          region_id: countryCode?.id,
          email: userInfo?.user?.email,
        };
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

  const chkNumber = number => {
    setNumber(number);
    const isValidLength =
      countryCode?.id === 454 ? number?.length === 8 : number?.length === 10;
    const mobileRegex = countryCode?.id === 454 ? /^[0-9]{8}$/ : /^[0-9]{10}$/;
    if (mobileRegex.test(number) && isValidLength) {
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
      const num_len = countryCode?.id == 454 ? 8 : 10;
      if (number != '') {
        if (numberIsEmail || (numberIsMobile && number.length === num_len)) {
          var data = {
            region_id: countryCode?.id,
          };
          if (isEmail(number)) {
            data.email = number;
          } else if (isMobile(number)) {
            data.mobile = number;
          }
          const login_data = await fetchData.login_with_otp(data, null);
          if (login_data?.status) {
            common_fn.showToast(login_data?.message);
            navigation.dispatch(
              StackActions.replace('OTPScreen', {
                number,
                token: login_data?.token,
                loginType,
              }),
            );
            setLoading(false);
          } else {
            var msg = login_data?.message;
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
              `Invalid ${
                countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
              }  Number`,
            );
          }
          setLoading(false);
        }
      } else {
        common_fn.showToast(
          `Enter your ${
            countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
          } or email id`,
        );
      }
    } catch (error) {
      console.log('error', error);
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
        if (numberIsEmail || (numberIsMobile && number.length === num_len)) {
          var data = {
            region_id: countryCode?.id,
          };
          if (isEmail(number)) {
            data.email = number;
          } else if (isMobile(number)) {
            data.mobile = number;
          }

          const Register_data = await fetchData.Register_request_otp(
            data,
            null,
          );

          if (Register_data?.status) {
            common_fn.showToast(Register_data?.message);
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
          let reg = /[A-Za-z- #*;,.<>\{\}\[\]\\\/]/gi;
          if (reg.test(number)) {
            common_fn.showToast(`Invalid Email ID`);
          } else {
            common_fn.showToast(
              `Invalid ${
                countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
              }  Number`,
            );
          }
          setLoading(false);
        }
      } else {
        common_fn.showToast(
          `Enter your ${
            countryCode?.id == 452 ? 'Phone' : 'Whatsapp'
          } or email id`,
        );
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
          // flex: 1,
          // justifyContent: 'flex-end',
          // alignItems: 'flex-start',
          padding: 10,
          marginTop: 20,
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
          {countryCode?.id == 452 ? 'Mobile' : 'WhatsApp'} Number/Email
        </Text>
        <View style={{marginVertical: 10}}>
          <View style={styles.NumberBoxConatiner}>
            {/* <Text style={styles.numberCountryCode}>+91</Text> */}
            <TextInput
              placeholder={
                countryCode?.id == 452 ? 'Mobile' : 'WhatsApp Number or Email'
              }
              placeholderTextColor={Color.cloudyGrey}
              value={number}
              maxLength={
                isMobile(number) && [452, 453, 454].includes(countryCode?.id)
                  ? countryCode?.id == 454
                    ? 8
                    : 10
                  : undefined
              }
              autoFocus={
                countryCode?.id == 454 && number?.length == 8
                  ? false
                  : (countryCode?.id == 454 && number?.length == 10) ||
                    (countryCode?.id == 453 && number?.length == 10)
                  ? false
                  : true
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
            {loginType == '' ? 'Login With Google' : 'Register With Google'}
          </Text>
        </TouchableOpacity>
      </View>
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
          {loginType == ''
            ? "Don't Have An Account?"
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 12,
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
