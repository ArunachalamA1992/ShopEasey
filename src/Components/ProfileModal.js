import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import common_fn from '../Config/common_fn';
import {useSelector} from 'react-redux';
import fetchData from '../Config/fetchData';
import {ActivityIndicator} from 'react-native-paper';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import {Iconviewcomponent} from './Icontag';
import {baseUrl} from '../Config/base_url';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../Global/Media';

const ProfileModal = ({profileVisible, setProfileVisible}) => {
  const navigation = useNavigation();
  const rootuserData = useSelector(state => state.UserReducer.userData);
  var {token} = rootuserData;
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const countryCode = useSelector(state => state.UserReducer.country);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('Email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const profile = await fetchData.profile_data(``, token);
      setfirstName(profile.data?.first_name);
      setLastName(profile.data?.last_name);
      setPhoneNumber(profile.data?.mobile);
      setEmail(profile.data?.email);
    } catch (error) {
      console.log('error', error);
    }
  };

  const profileUpdate = async () => {
    try {
      if (firstName && lastName && email && phoneNumber) {
        setUpdateLoader(true);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const formdata = new FormData();

        formdata.append('first_name', firstName);
        formdata.append('last_name', lastName);
        formdata.append('email', email);
        formdata.append('mobile', phoneNumber);

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        const response = await fetch(
          `${baseUrl}api/auth/user/update_profile`,
          requestOptions,
        );
        const result = await response.json();

        if (result?.status) {
          common_fn.showToast(result?.message);
          setProfileVisible(false);
          setUpdateLoader(false);
        } else {
          console.error('Profile update failed:', result);
          common_fn.showToast(result?.message);
          setUpdateLoader(false);
        }
      } else {
        common_fn.showToast('Please select all the mandatory fields');
        setUpdateLoader(false);
      }
    } catch (error) {
      console.error('Error in profileUpdate:', error);
      common_fn.showToast('An error occurred. Please try again later.');
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={profileVisible}>
      <View
        style={{
          backgroundColor: Color.transparantBlack,
          flex: 1,
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.white,
            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={{uri: Media.logo}}
            style={{
              width: 90,
              height: 100,
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.Bold,
              marginVertical: 10,
            }}>
            Please fill out the form to Continue Shopping
          </Text>
          <View style={styles.NumberBoxConatiner}>
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'user'}
              icon_size={22}
              iconstyle={{color: Color.cloudyGrey}}
            />
            <TextInput
              style={styles.numberTextBox}
              placeholder="First Name"
              placeholderTextColor={Color.cloudyGrey}
              value={firstName}
              onChangeText={value => {
                setfirstName(value);
              }}
              keyboardType="name-phone-pad"
            />
          </View>
          <View style={styles.NumberBoxConatiner}>
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'user'}
              icon_size={22}
              iconstyle={{color: Color.cloudyGrey}}
            />
            <TextInput
              style={styles.numberTextBox}
              placeholder="Enter Last Name"
              placeholderTextColor={Color.cloudyGrey}
              value={lastName}
              onChangeText={value => {
                setLastName(value);
              }}
              keyboardType="name-phone-pad"
            />
          </View>
          <View style={styles.NumberBoxConatiner}>
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'mail'}
              icon_size={22}
              iconstyle={{color: Color.cloudyGrey}}
            />
            <TextInput
              style={styles.numberTextBox}
              placeholder="Enter Your Email Address"
              placeholderTextColor={Color.cloudyGrey}
              value={email}
              onChangeText={value => {
                setEmail(value);
                handleValidEmail(value);
              }}
              keyboardType="email-address"
            />
          </View>
          {emailValidError ? (
            <Text
              style={{
                textAlign: 'left',
                fontFamily: Manrope.Regular,
                paddingVertical: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: 'red',
              }}>
              {emailValidError}
            </Text>
          ) : null}
          <View style={styles.NumberBoxConatiner}>
            <Iconviewcomponent
              Icontag={'Feather'}
              iconname={'phone'}
              icon_size={22}
              iconstyle={{color: Color.cloudyGrey}}
            />
            <Text style={styles.numberCountryCode}>
              {countryCode?.mobile_prefix}
            </Text>
            <TextInput
              style={styles.numberTextBox}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={Color.cloudyGrey}
              value={phoneNumber?.toString()}
              onChangeText={value => {
                setPhoneNumber(value);
              }}
              keyboardType="number-pad"
              maxLength={
                countryCode?.id == 452 || countryCode?.id == 453 ? 10 : 8
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => profileUpdate()}
            style={{
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.primary,
              borderRadius: 5,
              marginVertical: 30,
              width: '100%',
            }}>
            {updateLoader ? (
              <ActivityIndicator color={Color.white} />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: Color.white,
                  fontFamily: Manrope.Medium,
                }}>
                UPDATE
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  NumberBoxConatiner: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.black,
    marginTop: 10,
  },
  numberCountryCode: {
    justifyContent: 'center',
    color: Color.black,
    fontSize: 14,
    alignItems: 'center',
    paddingLeft: 15,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    color: Color.black,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: Manrope.Medium,
  },
});
