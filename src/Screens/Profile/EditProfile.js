//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
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
    View, ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { BottomSheet } from 'react-native-btr';
import { baseUrl, base_image_url } from '../../Config/base_url';
import { useSelector } from 'react-redux';
import { Media } from '../../Global/Media';
import axios from 'axios';
import common_fn from '../../Config/common_fn';

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
    }
];


// create a component
const EditProfile = () => {
    const navigation = useNavigation();

    const userData = useSelector(state => state.UserReducer.userData);
    console.log("USER =========== : ", userData);
    var { name, profile, mobile, token } = userData;

    const [username, setUsername] = useState('');
    const [phone, setphone] = useState('');
    const [email, setEmail] = useState('');
    const [nameValidError, setnameValidError] = useState('');
    const [emailValidError, setEmailValidError] = useState('');

    const [imageVisible, setImageVisible] = useState(false);
    const [profileImage, setProfileImage] = useState([]);

    const [gender, setGender] = useState('Male');
    const [dateofBirth, setDateOfBirth] = useState(new Date().toLocaleDateString().replace(/\b(\d)\b/g, '0$1'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selectgender, setSelectGender] = useState('Male');
    const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
    const [selectBtm, setSelectBtm] = useState('');

    useEffect(() => {
        uploadProfileImage();
    }, [profileImage?.length]);


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
                    await uploadProfileImage();
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
                console.log("Gallery ======== : ", JSON.stringify(response));
                setProfileImage(response?.assets);
                await uploadProfileImage();
                setSaleBottomSheetVisible(false);
            });
        } catch (error) {
            console.log('catch in Image_picker  ', error);
        }
    };

    const uploadProfileImage = async () => {
        try {
            if (profileImage?.length > 0) {
                const formData = new FormData();
                const { uri, fileName, type } = profileImage?.[0];
                formData.append('profile', { uri, type, name: fileName });
                console.log('Image upload response:', JSON.stringify(formData));

                const response = await axios.post(`${baseUrl}/api/auth/user/update_profile`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                console.log('Image upload response:', response);
                // common_fn.showToast(response?.data?.message);
            }
        } catch (error) {
            console.log('Error uploading profile image:', error);
        }
    };

    function profileUpdate() {
        try {
            if (username != "" && email != "" && phone != "" && dateofBirth != "" && selectgender != "") {
                console.log("Name ===== : ", username + "\n" + "Email ======== :" + email + "\n" + "Phone ==========" + phone
                    + "DOB ======== :" + dateofBirth + "\n" + "Gender ==========" + selectgender
                );
                ToastAndroid.show("Your profile updated successfully", ToastAndroid.SHORT)
                navigation.navigate("Profile")

            } else {
                ToastAndroid.show("Please select all the mandatory fields", ToastAndroid.SHORT)
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

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDateOfBirth(moment(date).format('DD/MM/YYYY'));
        hideDatePicker();
    };


    function sale_toggleBottomView(action) {
        try {
            // console.log("click ============ : ", action);
            setSelectBtm(action)
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
                                <Text style={{ width: '80%', fontSize: 16, color: 'black', fontFamily: Manrope.SemiBold }} numberOfLines={2}>{selectBtm == 'Profile' ? 'Please pick your image from camera or gallery' : 'Select Gender'}</Text>
                                <TouchableOpacity
                                    onPress={() => setSaleBottomSheetVisible(false)}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'closecircleo'}
                                        icon_size={24}
                                        iconstyle={{ color: Color.primary, marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {selectBtm == 'Profile' ?
                                    <View style={{ width: '95%' }}>
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
                                                    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                    borderWidth: 0.5, borderColor: Color.cloudyGrey, borderRadius: 5,
                                                    paddingVertical: 10
                                                }}>
                                                <View style={{
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
                                            <View style={{ width: 2, height: '100%', backgroundColor: Color.white }}></View>

                                            <TouchableOpacity
                                                onPress={() => imagePicker()}
                                                style={{
                                                    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                    borderWidth: 0.5, borderColor: Color.cloudyGrey, borderRadius: 5,
                                                    paddingVertical: 10
                                                }}>
                                                <View style={{
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
                                    : null}
                                {selectBtm == 'Gender' ?
                                    <View style={{ width: '100%' }}>
                                        {
                                            genderData.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => selectedPrice(item)} style={{ width: '100%', alignItems: 'center', backgroundColor: selectgender === item.gender_name ? Color.primary : Color.white }}>
                                                        <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                                            <Text style={{ fontSize: 16, color: selectgender === item.gender_name ? Color.white : Color.lightBlack, fontFamily: Manrope.SemiBold, paddingVertical: 5 }}>{item.gender_name}</Text>
                                                        </View>
                                                        <View style={{ width: '95%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            )
                                        }
                                    </View>
                                    : null}
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
            setSelectGender(item.gender_name)
            setSaleBottomSheetVisible(false);
        } catch (error) {
            console.log('catch in Home_interior select_City :', error);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ width: '100%', alignItems: 'center', padding: 10, marginVertical: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, marginVertical: 10 }}>
                        <View style={{ width: 120, height: 120, backgroundColor: Color.white, elevation: 1, borderRadius: 100 }}>

                            {profile != '' || profile != null ? (
                                <Image
                                    source={{ uri: profile }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        borderColor: Color.lightgrey,
                                    }}
                                />
                            ) : (
                                <Image
                                    source={Media.user}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        borderColor: Color.lightgrey,
                                    }}
                                />
                            )}

                        </View>
                        <TouchableOpacity onPress={() => sale_toggleBottomView("Profile")} style={{ backgroundColor: '#DBF8FF', bottom: -10, left: 35, borderRadius: 40, padding: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'account-edit-outline'}
                                icon_size={16}
                                icon_color={Color.lightBlack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>

                        <View style={{ width: '90%', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Enter Name *</Text>
                            <View style={styles.NumberBoxConatiner}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'user'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                                <TextInput
                                    style={styles.numberTextBox}
                                    placeholder="Enter Your Name"
                                    placeholderTextColor={Color.cloudyGrey}
                                    value={username}
                                    onChangeText={value => {
                                        setUsername(value);
                                    }}
                                    keyboardType="name-phone-pad"
                                />
                            </View>
                        </View>

                        <View style={{ width: '90%', alignItems: 'center', marginVertical: 0 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Enter Your Email Address *</Text>
                            <View style={styles.NumberBoxConatiner}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'mail'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey }}
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
                                        paddingVertical: 10, paddingHorizontal: 10,
                                        fontSize: 14,
                                        color: 'red',
                                    }}>
                                    {emailValidError}
                                </Text>
                            ) : null}
                        </View>

                        <View style={{ width: '90%', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Enter Your Phone Number *</Text>
                            <View style={styles.NumberBoxConatiner}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                                <TextInput
                                    style={styles.numberTextBox}
                                    placeholder="Enter Your Phone Number"
                                    placeholderTextColor={Color.cloudyGrey}
                                    value={phone}
                                    onChangeText={value => {
                                        setphone(value);
                                    }}
                                    keyboardType="phone-pad"
                                    maxLength={14}
                                />
                            </View>
                        </View>

                        <View style={{ width: '90%', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Enter Your Date of Birth *</Text>
                            <TouchableOpacity onPress={showDatePicker} style={[styles.NumberBoxConatiner, { flex: 1, alignItems: 'center' }]}>
                                <Iconviewcomponent
                                    Icontag={'AntDesign'}
                                    iconname={'calendar'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                                <Text style={[styles.numberTextBox, { width: '100%', textAlign: 'left', paddingHorizontal: 20, textAlignVertical: 'center' }]}>{dateofBirth}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '90%', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Select Gender *</Text>
                            <TouchableOpacity onPress={() => sale_toggleBottomView("Gender")} style={[styles.NumberBoxConatiner, { flex: 1, alignItems: 'center' }]}>
                                <Iconviewcomponent
                                    Icontag={'FontAwesome'}
                                    iconname={'transgender-alt'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.cloudyGrey }}
                                />
                                <Text style={[styles.numberTextBox, { width: '100%', textAlign: 'left', paddingHorizontal: 20, textAlignVertical: 'center' }]}>{selectgender}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => profileUpdate()} style={{ width: '90%', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5, marginVertical: 30 }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: Color.white, fontFamily: Manrope.Medium }}>UPDATE</Text>
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
