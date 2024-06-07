//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Color from '../../Global/Color';
import { useNavigation } from '@react-navigation/native';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { scr_height, scr_width } from '../../Utils/Dimensions';

const orderListData = [
    {
        'id': '0',
        'order_name': 'OnShipping'
    },
    {
        'id': '1',
        'order_name': 'Delivered'
    },
    {
        'id': '2',
        'order_name': 'Cancelled'
    },
    {
        'id': '3',
        'order_name': 'Returned'
    },
    {
        'id': '4',
        'order_name': 'Waiting'
    }
]

const orderData = [
    {
        'order_id': '#0095',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Blue',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#001',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'White',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#002',
        'order_status': 'Delivered',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Yellow',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#003',
        'order_status': 'Cancelled',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Purple',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#004',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Red',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#0005',
        'order_status': 'Returned',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Red',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#0005',
        'order_status': 'Returned',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Blue',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#0005',
        'order_status': 'Returned',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Yellow',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
]

// create a component
const MyOrders = () => {
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);
    const [selectFilter, setSelectFilter] = useState('OnShipping');
    const [selFilter, setSelFilter] = useState('OnShipping');
    const [selColor, setSelColor] = useState('Blue');


    function selectDataItem(item) {
        try {
            setSelFilter(item.order_name)
            setSelectFilter(item.id);
        } catch (error) {
            console.log('catch in selectData_Item: ', error);
        }
    }

    const statusColor = (value) => {
        switch (value) {
            case 'OnShipping':
                return '#CAAA34';
            case 'Delivered':
                return '#0FAD45';
            case 'Cancelled':
                return '#FF5360';
            case 'Returned':
                return '#4C1930';
            default:
                return '#CAAA34'; // default color
        }
    }

    const getColor = (value) => {
        switch (value) {
            case 'Blue':
                return '#0D71BA';
            case 'White':
                return '#ffffff';
            case 'Yellow':
                return '#CAAA34';
            case 'Purple':
                return '#4C1930';
            case 'Red':
                return '#ff0000';
            case 'Green':
                return '#0FAD45';
            default:
                return 'black'; // default color
        }
    }

    function renderOrderItem(item, index) {
        try {
            console.log("kldgklsdkgkl  ", item.order_color);
            const bgcolor = getColor(item.order_color);
            const statusBgColor = statusColor(item.order_status)
            return (
                <View style={{ width: '100%', alignItems: 'center', margin: 5, }}>
                    <View style={{ width: '95%', alignItems: 'center', borderRadius: 5, borderColor: Color.Venus, borderWidth: 0.5, backgroundColor: Color.white }}>
                        <View style={{ width: '100%', height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: Color.white }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../assets/category/cat_men.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Order ID :</Text>
                                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Manrope.Bold, paddingHorizontal: 5, letterSpacing: 0.5 }}>#0095</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 12, color: Color.white, padding: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: statusBgColor, letterSpacing: 0.5, fontFamily: Manrope.SemiBold, textTransform: 'capitalize' }}>{item.order_status}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 3 }}>
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={2}>Blended Cotton Navy Shirt Men</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Color - </Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 15, height: 15, backgroundColor: bgcolor, borderRadius: 30, borderWidth: 0.5, borderColor: Color.primary }}></View>
                                            <Text style={{ paddingHorizontal: 5, fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.order_color}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Size - </Text>
                                        <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>L</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Quantity - </Text>
                                        <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>1</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 3 }}>
                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>$ 350.00</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: Color.Venus, borderStyle: 'dashed', zIndex: 0, }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1, backgroundColor: 'white', zIndex: 1 }} />
                        </View>
                        <TouchableOpacity style={{ width: '95%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Track order</Text>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward-outline'}
                                icon_size={16}
                                icon_color={Color.primary}
                                iconstyle={{ paddingHorizontal: 10, top: 2.5, }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in renderOrder_Item: ', error);
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, alignItems: 'center' }}>

                <View style={styles.searchView}>
                    <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={'search1'}
                        icon_size={25}
                        icon_color={Color.lightBlack}
                    />
                    <TextInput style={styles.searchInput} placeholder="Search...." returnKeyType='done' />
                    <TouchableOpacity style={{ padding: 10, paddingHorizontal: 15, backgroundColor: Color.primary, borderTopEndRadius: 30, borderBottomEndRadius: 30 }}>
                        <Iconviewcomponent
                            Icontag={'Ionicons'}
                            iconname={'checkmark-done'}
                            icon_size={25}
                            icon_color={Color.white}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 5, }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {orderListData?.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => selectDataItem(item)} style={{ justifyContent: 'center', alignItems: 'center', margin: 5, padding: 7, paddingHorizontal: 15, backgroundColor: selectFilter == item.id ? Color.primary : Color.white, borderWidth: 0.5, borderColor: selectFilter == item.id ? Color.primary : Color.Venus, borderRadius: 30 }}>
                                    <Text style={{ fontSize: 12, color: selectFilter == item.id ? Color.white : Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.order_name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={orderData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, index }) => renderOrderItem(item, index)}
                            showsVerticalScrollIndicator={false}
                        />
                    </ScrollView>
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.softGrey
    },
    searchView: {
        // flex: 1, 
        width: '90%',
        backgroundColor: Color.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        borderWidth: 0.5, borderColor: Color.Venus,
        borderRadius: 50, marginVertical: 10, marginTop: 20
    },
    searchInput: {
        width: '79.8%', paddingHorizontal: 10,
        fontFamily: 14, color: Color.lightBlack, fontFamily: Manrope.Medium
    },
    CategoryContainer: {
        backgroundColor: Color.white,
        flexDirection: 'row',
    },
});

//make this component available to the app
export default MyOrders;
