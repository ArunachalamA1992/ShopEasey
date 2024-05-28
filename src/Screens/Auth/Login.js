//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';

// create a component
const Login = () => {

    const navigation = useNavigation();

    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);

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

    return (
        <View style={styles.container}>
            <View style={{ flex: 3, width: '94%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 30, color: Color.black, fontFamily: Manrope.SemiBold, }}>Login to</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'left', fontSize: 40, color: Color.black, fontFamily: Manrope.SemiBold, }}>Shopeasey</Text>
                    <Iconviewcomponent
                        Icontag={'MaterialIcons'}
                        iconname={'shopping-bag'}
                        icon_size={50}
                        iconstyle={{ color: Color.primary, marginHorizontal: 5, }}
                    />
                </View>
            </View>
            <View style={{ flex: 3, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text style={{ width: '90%', textAlign: 'left', fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>Enter Mobile Number</Text>
                <View style={{ marginVertical: 10 }}>
                    <View style={styles.NumberBoxConatiner}>
                        <Text style={styles.numberCountryCode}>+91</Text>
                        <TextInput
                            placeholder="Mobile Number"
                            placeholderTextColor={Color.cloudyGrey}
                            value={number}
                            keyboardType="phone-pad"
                            maxLength={10}
                            autoFocus={number.length == 10 ? false : true}
                            onChangeText={number => {
                                chkNumber(number);
                                chkNumberError(number);
                            }}
                            style={styles.numberTextBox}
                        />
                    </View>
                    {error && <Text style={styles.invalidLogin}>{error}</Text>}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("OTPScreen", { number })}
                    style={{ width: '90%', height: 50, marginVertical: 10, backgroundColor: Color.primary, borderColor: Color.primary, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 14, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 1, lineHeight: 22 }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5, width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: '45%', height: 0.5, backgroundColor: Color.transparantBlack, borderRadius: 5 }}></View>
                <Text style={{ textAlign: 'center', fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}> or </Text>
                <View style={{ width: '45%', height: 0.5, backgroundColor: Color.transparantBlack, borderRadius: 5 }}></View>
            </View>
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>


                <TouchableOpacity
                    style={{ width: '90%', height: 50, flexDirection: 'row', marginVertical: 10, backgroundColor: Color.white, borderColor: Color.cloudyGrey, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Image
                        source={require('../../assets/images/google.png')}
                        style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }}>Login With Google</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'justify', fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22 }}>By tapping continue with google, You agree to </Text>
                    <Text style={{ textAlign: 'justify', fontSize: 12, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>ShopEasey</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.primary, textDecorationLine: 'underline', fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'justify', fontSize: 12, paddingHorizontal: 5, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22 }}>and</Text>
                    <TouchableOpacity>
                        <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.primary, textDecorationLine: 'underline', fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        display: "flex",
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        width: '90%',
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
        textAlign: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: 5, paddingHorizontal: 5
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
        display: "flex",
        width: '90%',
        height: 50,
        borderLeftColor: Color.Venus,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 16,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Manrope.SemiBold,
        alignItems: "flex-start",
    },
});

//make this component available to the app
export default Login;
