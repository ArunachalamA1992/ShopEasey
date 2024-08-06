//import liraries
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Modal,
  Button,
  Alert,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from '../../Components/OTPInput';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';
import RNOtpVerify from 'react-native-otp-verify';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const OTPScreen = ({ route, AppState }) => {
  const navigation = useNavigation();
  const [number] = useState(route.params.number);
  const [token, setToken] = useState(route.params.token);
  const [loginType] = useState(route.params.loginType);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const countryCode = useSelector(state => state.UserReducer.country);

  const isEmail = input => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const isMobile = input => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(input);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const ResendOTP = async number => {
    setSeconds(30);
    var data = {
      region_id: countryCode?.id,
    };
    if (isEmail(number)) {
      data.email = number;
    } else if (isMobile(number)) {
      data.mobile = number;
    }
    const ResendOtpVerify =
      loginType == ''
        ? await fetchData.login_with_otp(data, null)
        : await fetchData.Register_request_otp(data, null);
    if (ResendOtpVerify?.status == true) {
      setToken(ResendOtpVerify?.token)
      if (Platform.OS === 'android') {
        common_fn.showToast(ResendOtpVerify?.message);
      } else {
        Alert.alert(ResendOtpVerify?.message);
      }
    } else {
      var msg = ResendOtpVerify?.message;
      setError(msg);
    }
  };

  const chkOTPError = OTP => {
    let reg = /^[6-9][0-9]*$/;

    if (OTP.length === 0) {
      setError('Enter Your OTP Code');
    } else if (reg.test(OTP) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(OTP) === true) {
      setError('');
    }
  };

  const VerifyOTP = async () => {
    setLoading(true);
    if (otpCode.length == 4) {
      var data = {
        otp: otpCode,
        region_id: countryCode?.id,
      };
      if (isEmail(number)) {
        data.email = number;
      } else if (isMobile(number)) {
        data.mobile = number;
      }
      const VerifyOTP =
        loginType == ''
          ? await fetchData.login_verify_otp(data, token)
          : await fetchData.Register_verify_otp(data, token);
      if (VerifyOTP?.status == true) {
        const UserLogin = {
          ...VerifyOTP?.data,
          token: VerifyOTP?.token,
        };
        await AsyncStorage.setItem('user_data', JSON.stringify(UserLogin));
        navigation.replace('TabNavigator');
        common_fn.showToast(`Welcome to ShopEasey`);
      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(
          'Invalid OTP Code Please Enter Your 4 Digit OTP Code',
        );
      } else {
        alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
        setLoading(false);
        setVisible(false);
      }
    }
  };

  const requestSMSPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs access to your SMS messages.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startListeningForOtp();
        } else {
          console.log('SMS permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestSMSPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash()
        .then(hash => console.log('Hash:', hash))
        .catch(error => console.error('Error getting hash:', error));

      startListeningForOtp();
    }
  }, []);

  useEffect(() => {
    console.log('OTPCode changed:', otpCode);
  }, [otpCode]);

  const otpHandler = message => {
    try {
      const otpMatch = /(\d{4})/g.exec(message);
      if (otpMatch && otpMatch[1]) {
        const otpDigit = otpMatch[1];
        setOTPCode(prevOTP => prevOTP + otpDigit);
        if (otpCode.length + otpDigit.length === 4) {
          console.log('Complete OTP received:', otpCode + otpDigit);
        }
      } else {
        console.log('No valid OTP found in the message:', message);
      }
    } catch (e) {
      console.error('Error extracting OTP:', e);
    }
  };

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(receivedSMS => {
        console.log('Received SMS:', receivedSMS);
        // setOTPCode('1234');
        RNOtpVerify.addListener(otpHandler.bind(this));
      })
      .catch(error => console.error('Error getting SMS:', error));
  };
  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            justifyContent: 'center',
            padding: 10,
          }}>
          <Modal visible={visible} transparent={true} animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: Color.transparantBlack,
                justifyContent: 'center',
                padding: 15,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: Manrope.Bold,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Permissions
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                      marginHorizontal: 10,
                    }}>
                    <Icon name="camera" size={16} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#333',
                          fontFamily: Manrope.SemiBold,
                        }}>
                        Albion would like to Access the Camera?
                      </Text>
                      <View style={{ width: '95%', alignItems: 'flex-start' }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 13,
                            color: '#666',
                            fontFamily: Manrope.Regular,
                            lineHeight: 20,
                          }}>
                          Albion Property Hub requires camera access to allow
                          you to take photos directly from your phone while
                          posting your property. This makes the process quick
                          and convenient, ensuring you can showcase your
                          property effectively
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                      marginHorizontal: 10,
                    }}>
                    <Icon name="location" size={16} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#333',
                          fontFamily: Manrope.SemiBold,
                        }}>
                        Albion want to access your location
                      </Text>
                      <View style={{ width: '95%', alignItems: 'flex-start' }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 13,
                            color: '#666',
                            fontFamily: Manrope.Regular,
                            lineHeight: 20,
                          }}>
                          Our app automatically accesses your location via GPS
                          to deliver nearby properties tailored to your area.
                          You don't need to provide it manually, making it
                          effortless to find properties in your desired
                          location.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  {/* <TouchableOpacity onPress={() => declineApp(navigation)} style={{ width: '45%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: primarycolor, borderRadius: 40, }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Decline</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => VerifyOTP(navigation)}
                    style={{
                      width: '100%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                    }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Manrope.Bold,
                fontSize: 20,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
                letterSpacing: 0.5,
              }}>
              Enter OTP
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
                letterSpacing: 0.5,
                paddingTop: 10,
                textAlign: 'center',
              }}>
              Enter the verification code we sent to your number{' '}
              <Text
                style={{
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                }}>
                {isMobile(number) && countryCode?.mobile_prefix}
                {number?.substring(0, 2).concat('*** **') +
                  number.substring(7, 9) +
                  number.substring(9)}
              </Text>
            </Text>
            <Text style={styles.invalidLogin}>{error}</Text>
            <View style={styles.otpInputView}>
              <OTPInput
                inputRef={inputRef}
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={4}
                setIsPinReady={setIsPinReady}
                chkOTPError={chkOTPError}
              />
            </View>
            {seconds > 0 || minutes > 0 ? (
              <View style={styles.noReceivecodeView}>
                <Text style={styles.noReceiveText}>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              <View style={styles.noReceivecodeView}>
                <TouchableOpacity onPress={() => ResendOTP(number)}>
                  <Text style={styles.resendOtp}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={() => VerifyOTP(navigation)}
              style={{
                width: '90%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary,
                borderRadius: 5,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Button
            title={'Confirm'}
            titleStyle={{}}
            buttonStyle={{
              height: 70,
              width: '100%',
              backgroundColor: Color.primary,
              borderRadius: 20,
              marginVertical: 10,
            }}
            color={Color.primary}
            onPress={() => VerifyOTP(navigation)}
            loading={loading}
          /> */}
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  otpInputView: {
    marginVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReceivecodeView: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 15,
  },
  noReceiveText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: Manrope.Medium,
  },
  resendOtp: {
    color: Color.black,
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: Manrope.SemiBold,
    color: Color.red,
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default OTPScreen;
