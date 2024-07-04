//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, TextInput,
    ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';

const addressData = [
    {
        'addr_id': '0',
        'addr_name': 'Home',
        'addr_address': 'No. 120, W Periasamy Rd, R S Puram West, Coimbatore, Tamil Nadu 641002, India'
    },
    {
        'addr_id': '1',
        'addr_name': 'Work',
        'addr_address': '23, vinayagar kovil street, krishnasamy nagar, ramanathapuram, coimbatore - 641045, Tamil Nadu 641002, India'
    },
    // {
    //     'addr_id': '2',
    //     'addr_name': 'Office',
    // 'addr_address': 'Home'
    // }
]

// create a component
const SelectAddress = () => {

    const navigation = useNavigation();
    const [selectaddr, setSelectAddr] = useState('Male');
    function renderAddressItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '95%', flexDirection: 'row', height: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome5'}
                                iconname={'map-marker-alt'}
                                icon_size={24}
                                iconstyle={{ color: Color.primary }}
                            />
                        </View>
                        <View style={{ flex: 5, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, textAlign: 'justify', color: Color.black, paddingVertical: 5, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>{item.addr_name}</Text>
                            <Text style={{ fontSize: 14, textAlign: 'justify', paddingVertical: 5, color: Color.cloudyGrey, fontFamily: Manrope.Light, letterSpacing: 0.5 }}>{item.addr_address}</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            {selectaddr == item.addr_id ?
                                <TouchableOpacity onPress={() => setSelectAddr(item.addr_id)}>
                                    <Iconviewcomponent
                                        Icontag={'Fontisto'}
                                        iconname={'radio-btn-active'}
                                        icon_size={24}
                                        iconstyle={{ color: Color.primary }}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => setSelectAddr(item.addr_id)}>
                                    <Iconviewcomponent
                                        Icontag={'Fontisto'}
                                        iconname={'radio-btn-passive'}
                                        icon_size={24}
                                        iconstyle={{ color: Color.lightBlack }}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={{ width: '95%', height: 0.5, backgroundColor: Color.Venus, marginVertical: 15 }}></View>
                </View>
            );
        } catch (error) {
            console.log("catch in renderAddress_Item ", error);
        }
    }

    function applyButtonClick() {
        try {
            console.log("clicked  ================= : ", selectaddr);
            navigation.navigate("Profile")
        } catch (error) {
            console.log("catch in applyButton_Click ", error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Color.white, alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: scr_width, height: scr_height, alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={addressData}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => renderAddressItem(item, index)}
                                showsVerticalScrollIndicator={false}
                            />
                        </ScrollView>

                    </View>
                    <View style={{ width: '100%', flex: 1, bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("AddAddress", {
                            item: "",
                            CheckOut: "",
                            status: '',
                        })} style={{ width: '90%', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, borderColor: Color.primary, borderWidth: 1, borderRadius: 5, marginVertical: 0 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'plus'}
                                icon_size={22}
                                iconstyle={{ color: Color.primary }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 14, color: Color.primary, fontFamily: Manrope.SemiBold, paddingHorizontal: 5 }}>Add New Address</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => applyButtonClick()} style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5, marginVertical: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: Color.white, fontFamily: Manrope.Medium }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SelectAddress;
