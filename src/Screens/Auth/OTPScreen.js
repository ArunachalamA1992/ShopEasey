//import liraries
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import OTPInput from '../../Components/OTPInput';
import {Media} from '../../Global/Media';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const OTPScreen = ({route, AppState}) => {
  const navigation = useNavigation();
  const [number] = useState(route.params.number);
  const [token] = useState(route.params.token);
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
    const ResendOtpVerify =
      loginType == ''
        ? await fetchData.login_verify_otp(
            {
              mobile: number,
              otp: otpCode,
              region_id: countryCode?.id,
            },
            token,
          )
        : await fetchData.Register_verify_otp(
            {
              mobile: number,
              otp: otpCode,
              region_id: countryCode?.id,
            },
            token,
          );
    if (ResendOtpVerify?.status == true) {
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
      const VerifyOTP =
        loginType == ''
          ? await fetchData.login_verify_otp(
              {
                mobile: number,
                otp: otpCode,
                region_id: countryCode?.id,
              },
              token,
            )
          : await fetchData.Register_verify_otp(
              {
                mobile: number,
                otp: otpCode,
                region_id: countryCode?.id,
              },
              token,
            );
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
  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', flex: 1}}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
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
                      <View style={{width: '95%', alignItems: 'flex-start'}}>
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
                      <View style={{width: '95%', alignItems: 'flex-start'}}>
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
                    <Text style={{fontSize: 14, color: 'white'}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={{
              flex: 2,
              width: '100%',
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
              }}>
              Enter the verification code we sent to your
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  letterSpacing: 0.5,
                }}>
                number{' '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                }}>
                +91 {number?.substring(0, 5).concat('*****')}
              </Text>
            </View>
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
                width: '80%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                Verify
              </Text>
            </TouchableOpacity>
            {/* <Button
                            title={'Submit'}
                            titleStyle={{}}
                            buttonStyle={{
                                height: 50,
                                backgroundColor: Color.primary,
                                borderRadius: 10,
                                marginVertical: 10,
                            }}
                            onPress={() => {
                                // VerifyOTP(navigation);
                                // checkPermmissions()
                            }}
                            loading={loading}
                        /> */}
          </View>
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
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  noReceiveText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: Manrope.Medium,
  },
  resendOtp: {
    color: Color.primary,
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
