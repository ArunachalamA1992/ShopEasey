//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Gilmer, Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { Media } from '../../Global/Media';

// create a component
const OnboardTwo = () => {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Image
                    source={{ uri: Media.welcome }}
                    style={styles.image}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 22, color: Color.black, fontFamily: Manrope.ExtraBold, paddingHorizontal: 10, paddingVertical: 10, letterSpacing: 1 }}>Welcome to Shopeasey</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Light, paddingHorizontal: 10, letterSpacing: 0.5, lineHeight: 22 }}>Discover the joy of convenient and secure online shopping with Shopeasey.</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '40%', flexDirection: 'row', backgroundColor: '#F0F9FB', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Image
                                source={{ uri: Media.coupon_icon }}
                                // source={require('../../assets/images/coupon.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingHorizontal: 10 }}>Free Coupon</Text>
                        </View>
                        <View style={{ width: '40%', flexDirection: 'row', backgroundColor: '#F0F9FB', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Image
                                source={{ uri: Media.voucher_icon }}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingHorizontal: 10 }}>Voucher</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#F0F9FB', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Image
                                source={{ uri: Media.van_icon }}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, paddingHorizontal: 10 }}>Free Shipping</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ flex: 1.2, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Auth")}
                    style={{ width: '90%', height: 50, flexDirection: 'row', marginVertical: 10, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, textTransform: 'uppercase' }}>Sign in </Text>
                    <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={'arrowright'}
                        icon_size={22}
                        iconstyle={{ color: Color.white, paddingHorizontal: 5 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={() => navigation.navigate("OTPScreen")}
                    style={{ width: '90%', height: 50, marginVertical: 10, backgroundColor: Color.white, borderColor: Color.cloudyGrey, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22, textTransform: 'uppercase' }}>Continue as guest</Text>
                </TouchableOpacity>
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
    image: {
        width: scr_width,
        height: scr_height,
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default OnboardTwo;
