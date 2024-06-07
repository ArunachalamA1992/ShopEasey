//import liraries
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
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';

// create a component
const ProfileView = () => {
    const navigation = useNavigation();


    return (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ width: '100%', alignItems: 'center', padding: 10, marginVertical: 0 }}>
                    <View style={{ flex: 1, width: '95%', paddingVertical: 30, justifyContent: 'center', alignItems: 'center', marginVertical: 20, backgroundColor: '#ECEFFE' }}>
                        <Image
                            source={require('../../assets/logos/profile.png')}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, width: '90%', alignItems: 'center' }}>

                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'left', fontSize: 18, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Personal Details</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'MaterialIcons'}
                                    iconname={'edit'}
                                    icon_size={16}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ textAlign: 'left', fontSize: 12, color: Color.primary, fontFamily: Manrope.Bold, textDecorationLine: 'underline', letterSpacing: 0.5, paddingStart: 5 }}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '95%', alignItems: 'flex-start', marginVertical: 15, marginTop: 30 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: Color.Venus, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Name</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }}>Arunachalam Annamalai</Text>
                            <View style={{ width: '95%', height: 1, backgroundColor: Color.Venus }}></View>
                        </View>

                        <View style={{ width: '95%', alignItems: 'flex-start', marginVertical: 15 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: Color.Venus, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Email</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }}>arunachalamannamalai@gmail.com</Text>
                            <View style={{ width: '95%', height: 1, backgroundColor: Color.Venus }}></View>
                        </View>

                        <View style={{ width: '95%', alignItems: 'flex-start', marginVertical: 15 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: Color.Venus, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Mobile Number</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }}>+91 9876543210</Text>
                            <View style={{ width: '95%', height: 1, backgroundColor: Color.Venus }}></View>
                        </View>

                        <View style={{ width: '95%', alignItems: 'flex-start', marginVertical: 15 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: Color.Venus, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Date of Birth</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }}>02 JUNE 1999</Text>
                            <View style={{ width: '95%', height: 1, backgroundColor: Color.Venus }}></View>
                        </View>

                        <View style={{ width: '95%', alignItems: 'flex-start', marginVertical: 15 }}>
                            <Text style={{ textAlign: 'left', fontSize: 12, color: Color.Venus, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Gender</Text>
                            <Text style={{ textAlign: 'left', fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }}>Male</Text>
                            <View style={{ width: '95%', height: 1, backgroundColor: Color.Venus }}></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default ProfileView;
