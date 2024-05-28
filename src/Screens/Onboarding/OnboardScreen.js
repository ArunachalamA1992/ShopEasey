//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import { Gilmer, Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Iconviewcomponent } from '../../Components/Icontag';

// create a component
const OnboardScreen = () => {

    const navigation = useNavigation();


    const [selectname, setSelectName] = useState('India');
    const [selectImage, setSelectImage] = useState('https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-the-national-flag-of-india-png-image_2845292.jpg');
    const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
    const [countryData, setCountryData] = useState([
        {
            'id': '0',
            'flag_image': 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-the-national-flag-of-india-png-image_2845292.jpg',
            'name': 'India'
        },
        {
            'id': '1',
            'flag_image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdBWMmm4KDzXEodCRuj10qgKhb87kYxG7VaFBHuc-u-WxUUxmQxGVKcqo5XAxlyVl-qM&usqp=CAU',
            'name': 'Singapore'
        },
        {
            'id': '2',
            'flag_image': 'https://e7.pngegg.com/pngimages/416/106/png-clipart-flag-of-malaysia-flag-of-the-united-states-national-flag-flag-miscellaneous-flag.png',
            'name': 'Malaysia'
        },
    ]);
    const imageScale = new Animated.Value(0.1);

    Animated.timing(imageScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();



    function sale_toggleBottomView(type) {
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

                            <View style={{ width: '100%', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: Color.black, fontFamily: Gilmer.Medium }}>Select Country</Text>
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
                                {countryData.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={item + index} onPress={() => selectedPrice(item)} style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, margin: 5, backgroundColor: selectname === item.name ? Color.primary : '#f3f3f3' }}>
                                            <Image
                                                source={{ uri: item.flag_image }}
                                                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: selectname === item.name ? Color.white : Color.black,
                                                    marginHorizontal: 10,
                                                    fontFamily: Gilmer.Medium,
                                                }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
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
            setSelectName(item.name);
            setSelectImage(item.flag_image);
            setSaleBottomSheetVisible(false);
        } catch (error) {
            console.log('catch in Home_interior select_City :', error);
        }
    }


    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/onboard_shop.png')}
                style={styles.image}
            />

            <View style={{ width: '100%', position: 'absolute', alignItems: 'center', bottom: 0, height: 300, backgroundColor: Color.white, borderTopStartRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ width: '95%', padding: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 24, color: Color.black, fontFamily: Manrope.ExtraBold, paddingHorizontal: 10, paddingVertical: 5, letterSpacing: 1 }}>Hello!</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 15, color: Color.cloudyGrey, fontFamily: Manrope.Medium, paddingHorizontal: 10, letterSpacing: 0.5, lineHeight: 22 }}>Discover the joy of convenient and secure online shopping with Shopeasey, your trusted destination for a vast selection of products.</Text>
                </View>
                <View style={{ width: '95%', padding: 10, }}>
                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>Select Your Region</Text>

                    <TouchableOpacity
                        onPress={() => sale_toggleBottomView()}
                        style={{ width: '100%', height: 45, marginVertical: 10, backgroundColor: Color.white, borderColor: Color.lightgrey, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Image
                                source={{ uri: selectImage }}
                                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: 16, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{selectname}</Text>

                            <Iconviewcomponent
                                Icontag={'Entypo'}
                                iconname={'chevron-small-down'}
                                icon_size={24}
                                iconstyle={{ color: Color.lightBlack, marginRight: 10 }}
                            />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate("OnboardTwo")}
                        style={{ width: '100%', height: 45, marginVertical: 10, backgroundColor: Color.primary, borderColor: Color.lightgrey, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>Get Started</Text>
                    </TouchableOpacity>

                </View>

            </View>

            {sale_BottomSheetmenu()}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    image: {
        width: scr_width,
        height: scr_height,
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default OnboardScreen;
