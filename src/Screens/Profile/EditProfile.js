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
                    //   setProfileImage(response?.assets);
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
                // setProfileImage(response?.assets);
            });
        } catch (error) {
            console.log('catch in Image_picker  ', error);
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


    function sale_toggleBottomView() {
        try {
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
                                height: 300,
                                minHeight: 200,
                                alignItems: 'center',
                                borderTopStartRadius: 20,
                                borderTopEndRadius: 20,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    padding: 15,
                                    paddingStart: 30,
                                    backgroundColor: '#FBE9EF',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTopStartRadius: 30,
                                    borderTopEndRadius: 30,
                                }}>
                                <Text style={{ fontSize: 18, color: 'black', fontFamily: Manrope.SemiBold }}>Select Gender</Text>
                                <TouchableOpacity
                                    onPress={() => setSaleBottomSheetVisible(false)}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'closecircleo'}
                                        icon_size={22}
                                        iconstyle={{ color: Color.primary, marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {genderData.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => selectedPrice(item)} style={{ width: '100%', alignItems: 'center', backgroundColor: selectgender === item.gender_name ? Color.primary : Color.white }}>
                                            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                                <Text style={{ fontSize: 16, color: selectgender === item.gender_name ? Color.white : Color.lightBlack, fontFamily: Manrope.SemiBold, paddingVertical: 5 }}>{item.gender_name}</Text>
                                            </View>
                                            <View style={{ width: '95%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                                        </TouchableOpacity>
                                    )
                                }
                                )}
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
                        <TouchableOpacity onPress={() => {
                            setImageVisible(true);
                        }}>
                            <Image
                                source={require('../../assets/logos/profile.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#DBF8FF', bottom: -10, left: 35, borderRadius: 40, padding: 10, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
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
                            <TouchableOpacity onPress={sale_toggleBottomView} style={[styles.NumberBoxConatiner, { flex: 1, alignItems: 'center' }]}>
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

                <Modal transparent={true} animationType="slide" visible={imageVisible}>
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
                </Modal>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                {sale_BottomSheetmenu()}
            </ScrollView>
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
