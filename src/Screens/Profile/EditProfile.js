import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
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
import {Iconviewcomponent} from '../../Components/Icontag';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {BottomSheet} from 'react-native-btr';
import {baseUrl} from '../../Config/base_url';
import {useSelector} from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import {Media} from '../../Global/Media';

const genderData = [
  {
    gender_id: '0',
    gender_name: 'Male',
  },
  {
    gender_id: '1',
    gender_name: 'Female',
  },
  {
    gender_id: '2',
    gender_name: 'Transgender',
  },
];

// create a component
const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params.profileData;
  const rootuserData = useSelector(state => state.UserReducer.userData);
  var {token} = rootuserData;
  console.log('USER =========== :', token);

  const [firstName, setfirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [phoneNumber, setPhoneNumber] = useState(userData.mobile);
  const [email, setEmail] = useState(userData.email);
  const [nameValidError, setnameValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const [imageVisible, setImageVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(userData.profile);
  const [image, setImage] = useState([]);

  const [gender, setGender] = useState('Male');
  const [userdob, setUserdob] = useState(userData.dob);
  const [dateofBirth, setDateOfBirth] = useState(
    new Date().toLocaleDateString().replace(/\b(\d)\b/g, '0$1'),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectgender, setSelectGender] = useState(userData.gender);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [selectBtm, setSelectBtm] = useState('');

  // useEffect(() => {
  //     uploadProfileImage();
  // }, [profileImage?.length]);

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

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return true;
      }
    } catch (error) {
      console.log('Error in requesting camera permission: ', error);
      return false;
    }
  };

  useEffect(() => {
    const resizeImages = [];
    Promise.all(
      profileImage.map(async (image, index) => {
        var path = image?.uri;
        var maxWidth = 1000,
          maxHeight = 1000,
          compressFormat = 'JPEG',
          quality = 100,
          rotation = 0,
          keepMeta = false,
          options = {};
        var outputPath;

        if (path) {
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              path,
              maxWidth,
              maxHeight,
              compressFormat,
              quality,
              rotation,
              outputPath,
              keepMeta,
              options,
            );
            resizeImages.push(resizedImage);
          } catch (err) {
            console.log(err);
          }
        }
      }),
    ).then(() => {
      setImage(resizeImages);
    });
  }, [profileImage.length]);

  const captureImage = async () => {
    try {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30,
        saveToPhotos: true,
      };
      const isCameraPermitted = await requestCameraPermission();
      if (isCameraPermitted) {
        launchCamera(options, async response => {
          setProfileImage(response?.assets);
        });
      } else {
        console.log('Please grant camera permissions to capture image.');
      }
    } catch (error) {
      console.log('Error in capturing image: ', error);
    }
  };

  const imagePicker = async from => {
    try {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        selectionLimit: 0,
      };
      launchImageLibrary(options, async response => {
        setProfileImage(response?.assets);
        // await uploadProfileImage();
        setSaleBottomSheetVisible(false);
      });
    } catch (error) {
      console.log('catch in Image_picker  ', error);
    }
  };

  // const uploadProfileImage = async () => {
  //     try {
  //         if (profileImage?.length > 0) {
  //             const formData = new FormData();
  //             const { uri, fileName, type } = profileImage?.[0];
  //             formData.append('profile', { uri, type, name: fileName });
  //             console.log('Image upload response:', JSON.stringify(formData));

  //             const response = await axios.post(`${baseUrl}/api/auth/user/update_profile`,
  //                 formData,
  //                 {
  //                     headers: {
  //                         'Content-Type': 'multipart/form-data',
  //                         Authorization: `Bearer ${token}`,
  //                     },
  //                 },
  //             );
  //             console.log('Image upload response:', response);
  //             // common_fn.showToast(response?.data?.message);
  //         }
  //     } catch (error) {
  //         console.log('Error uploading profile image:', error);
  //     }
  // };

  function profileUpdate() {
    try {
      if (
        firstName != '' &&
        lastName != '' &&
        email != '' &&
        phoneNumber != ''
      ) {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);

        const formdata = new FormData();
        var {uri, fileName, name} = image[0];
        formdata.append('profile', {uri, type: 'image/jpeg', name});
        formdata.append('profile', profileImage);
        formdata.append('first_name', firstName);
        formdata.append('last_name', lastName);
        formdata.append('dob', dateofBirth);
        formdata.append('gender', selectgender);
        formdata.append('email', email);
        formdata.append('mobile', phoneNumber);

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        console.log(
          'requestOptions  ------------ ',
          JSON.stringify(requestOptions),
        );
        fetch(`${baseUrl}/api/auth/user/update_profile`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('Result ===========   ', result);
            if (result?.message === 'Data Updated Successfully') {
              ToastAndroid.show(
                'Your Profile Has Been Updated Successfully',
                ToastAndroid.SHORT,
              );
              navigation.navigate('Profile');
            } else {
              ToastAndroid.show('Please Try Again Later', ToastAndroid.SHORT);
            }
          })

          .catch(error => console.error('catch in profile_update :', error));

        // console.log("Name ===== : ", firstName + "\n" + "Email ======== :" + email + "\n" + "Phone ==========" + phone
        //     + "DOB ======== :" + dateofBirth + "\n" + "Gender ==========" + selectgender
        // );
        // ToastAndroid.show("Your profile updated successfully", ToastAndroid.SHORT)
        // navigation.navigate("Profile")
      } else {
        ToastAndroid.show(
          'Please select all the mandatory fields',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('catch in profile_Update ', error);
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setDateOfBirth(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  function sale_toggleBottomView(action) {
    try {
      // console.log("click ============ : ", action);
      setSelectBtm(action);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: selectBtm == 'Profile' ? 180 : 300,
                minHeight: selectBtm == 'Profile' ? 150 : 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 15,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopStartRadius: 30,
                  borderTopEndRadius: 30,
                }}>
                <Text
                  style={{
                    width: '80%',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: Manrope.SemiBold,
                  }}
                  numberOfLines={2}>
                  {selectBtm == 'Profile'
                    ? 'Please pick your image from camera or gallery'
                    : 'Select Gender'}
                </Text>
                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={24}
                    iconstyle={{color: Color.primary, marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '100%', alignItems: 'center'}}>
                {selectBtm == 'Profile' ? (
                  <View style={{width: '95%'}}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => captureImage()}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 0.5,
                          borderColor: Color.cloudyGrey,
                          borderRadius: 5,
                          paddingVertical: 10,
                        }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: Color.primary,
                            padding: 10,
                            borderRadius: 30,
                          }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            icon_size={18}
                            icon_color={'white'}
                            iconname={'camera'}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Manrope.SemiBold,
                            marginHorizontal: 10,
                          }}>
                          Camera
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: 2,
                          height: '100%',
                          backgroundColor: Color.white,
                        }}></View>

                      <TouchableOpacity
                        onPress={() => imagePicker()}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 0.5,
                          borderColor: Color.cloudyGrey,
                          borderRadius: 5,
                          paddingVertical: 10,
                        }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: Color.primary,
                            padding: 10,
                            borderRadius: 30,
                          }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            icon_size={18}
                            icon_color={'white'}
                            iconname={'picture'}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Manrope.SemiBold,
                            marginHorizontal: 10,
                          }}>
                          Gallery
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {selectBtm == 'Gender' ? (
                  <View style={{width: '100%'}}>
                    {genderData.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => selectedPrice(item)}
                          style={{
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor:
                              selectgender === item.gender_name
                                ? Color.primary
                                : Color.white,
                          }}>
                          <View
                            style={{
                              width: '95%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color:
                                  selectgender === item.gender_name
                                    ? Color.white
                                    : Color.lightBlack,
                                fontFamily: Manrope.SemiBold,
                                paddingVertical: 5,
                              }}>
                              {item.gender_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '95%',
                              height: 0.5,
                              backgroundColor: Color.cloudyGrey,
                            }}></View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  function selectedPrice(item, index) {
    try {
      setSelectGender(item.gender_name);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }
  console.log('profileImage', profileImage);
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            padding: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.white,
              marginVertical: 10,
            }}>
            {/* {proimage?.length != 0 ? (
              <Image
                source={{ uri: proimage[0]?.uri }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            ) : profile?.length > 0 ? (
              <Image
                source={{
                  uri:
                    // base_profile +
                    profile,
                }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            ) : (
              <Image
                source={{ uri: Media.Userpng }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                }}
              />
            )} */}
            {profileImage?.length > 0 ? (
              <Image
                source={{uri: profileImage?.[0]?.uri}}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                }}
              />
            ) : (
              <Image
                source={{uri: Media.user}}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => sale_toggleBottomView('Profile')}
              style={{
                backgroundColor: '#DBF8FF',
                bottom: -10,
                left: 35,
                borderRadius: 40,
                padding: 10,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'account-edit-outline'}
                icon_size={16}
                icon_color={Color.lightBlack}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                First Name *
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
                  placeholder="Enter First Name"
                  placeholderTextColor={Color.cloudyGrey}
                  value={firstName}
                  onChangeText={value => {
                    setfirstName(value);
                  }}
                  keyboardType="name-phone-pad"
                />
              </View>
            </View>

            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                Last Name *
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
                  placeholder="Enter Last Name"
                  placeholderTextColor={Color.cloudyGrey}
                  value={lastName}
                  onChangeText={value => {
                    setLastName(value);
                  }}
                  keyboardType="name-phone-pad"
                />
              </View>
            </View>

            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 0}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                Enter Your Email Address *
              </Text>
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
                    width: '100%',
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
            </View>

            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                Enter Your Phone Number *
              </Text>
              <View style={styles.NumberBoxConatiner}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone'}
                  icon_size={22}
                  iconstyle={{color: Color.cloudyGrey}}
                />
                <TextInput
                  style={styles.numberTextBox}
                  placeholder="Enter Your Phone Number"
                  placeholderTextColor={Color.cloudyGrey}
                  value={'+91' + phoneNumber}
                  onChangeText={value => {
                    setPhoneNumber(value);
                  }}
                  keyboardType="phone-pad"
                  maxLength={14}
                />
              </View>
            </View>

            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                Enter Your Date of Birth *
              </Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={[
                  styles.NumberBoxConatiner,
                  {flex: 1, alignItems: 'center'},
                ]}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'calendar'}
                  icon_size={22}
                  iconstyle={{color: Color.cloudyGrey}}
                />
                <Text
                  style={[
                    styles.numberTextBox,
                    {
                      width: '100%',
                      textAlign: 'left',
                      paddingHorizontal: 20,
                      textAlignVertical: 'center',
                    },
                  ]}>
                  {!userData?.dob ? dateofBirth : userData.dob}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{width: '90%', alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingVertical: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}>
                Select Gender *
              </Text>
              <TouchableOpacity
                onPress={() => sale_toggleBottomView('Gender')}
                style={[
                  styles.NumberBoxConatiner,
                  {flex: 1, alignItems: 'center'},
                ]}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'transgender-alt'}
                  icon_size={22}
                  iconstyle={{color: Color.cloudyGrey}}
                />
                <Text
                  style={[
                    styles.numberTextBox,
                    {
                      width: '100%',
                      textAlign: 'left',
                      paddingHorizontal: 20,
                      textAlignVertical: 'center',
                    },
                  ]}>
                  {selectgender}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => profileUpdate()}
              style={{
                width: '90%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.primary,
                borderRadius: 5,
                marginVertical: 30,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: Color.white,
                  fontFamily: Manrope.Medium,
                }}>
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        {/* <Modal transparent={true} animationType="slide" visible={imageVisible}>
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: Color.transparantBlack,
                        }}
                        onPress={() => {
                            setImageVisible(false);
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: Color.white,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            padding: 20,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                marginHorizontal: 5,
                            }}>
                            Please pick your image from camera or gallery
                        </Text>
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 10,
                            }}>
                            <TouchableOpacity
                                onPress={() => captureImage()}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginHorizontal: 5,
                                    borderWidth: 1,
                                    borderColor: Color.lightgrey,
                                    borderRadius: 10,
                                    padding: 10,
                                }}>
                                <Iconviewcomponent
                                    viewstyle={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: Color.primary,
                                        padding: 10,
                                        borderRadius: 30,
                                    }}
                                    Icontag={'AntDesign'}
                                    icon_size={18}
                                    icon_color={'white'}
                                    iconname={'camera'}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: Color.black,
                                        fontFamily: Manrope.Bold,
                                        marginHorizontal: 5,
                                    }}>
                                    Camera
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => imagePicker()}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginHorizontal: 5,
                                    borderWidth: 1,
                                    borderColor: Color.lightgrey,
                                    borderRadius: 10,
                                    padding: 10,
                                }}>
                                <Iconviewcomponent
                                    viewstyle={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: Color.primary,
                                        padding: 10,
                                        borderRadius: 30,
                                    }}
                                    Icontag={'AntDesign'}
                                    icon_size={18}
                                    icon_color={'white'}
                                    iconname={'picture'}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: Color.black,
                                        fontFamily: Manrope.Bold,
                                        marginHorizontal: 5,
                                    }}>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
      </ScrollView>
      {sale_BottomSheetmenu()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  NumberBoxConatiner: {
    display: 'flex',
    paddingHorizontal: 15,
    backgroundColor: '#DBF8FF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    justifyContent: 'center',
    color: Color.black,
    fontSize: 14,
    alignItems: 'center',
    paddingHorizontal: 15,
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

//make this component available to the app
export default EditProfile;
