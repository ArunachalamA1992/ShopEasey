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
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';

const sellerData = [
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'RAJESH QUALITY PRODUCTS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'DIAMOND NATURALS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'SRI GOKULAM ELECTRONICS,FURNITURE, METALS & MOBILES',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'RAJESH QUALITY PRODUCTS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'SRI GOKULAM ELECTRONICS,FURNITURE, METALS & MOBILES',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'DIAMOND NATURALS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'RAJESH QUALITY PRODUCTS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
    {
        'seller_id': '0',
        'seller_image': 'shipped',
        'seller_name': 'RAJESH QUALITY PRODUCTS',
        'seller_followers': '4',
        'seller_products': '234',
        'seller_category': '3',
        'seller_join_date': '139 days ago',
    },
]


// create a component
const FollowingSellers = () => {

    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);


    const renderSellerItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("SellerProfile")} style={{ width: '100%', alignItems: 'center', margin: 5, borderRadius: 5, }}>
                <View style={{ width: '95%', height: 120, backgroundColor: Color.white, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100 }}>
                        <Image
                            source={require('../../assets/logos/profile.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain', borderRadius: 100
                            }}
                        />
                    </View>
                    <View style={{ flex: 4, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingVertical: 5 }} numberOfLines={2}>{item.seller_name}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#0FAD45', padding: 5 }}>
                                <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Following</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.seller_followers}
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Followers</Text></Text>
                            <View style={{ width: 2, height: '95%', backgroundColor: Color.black, marginHorizontal: 20 }}></View>
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.seller_products}
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Products</Text></Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.seller_category}
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Category </Text></Text>
                            <View style={{ width: 2, height: '95%', backgroundColor: Color.black, marginHorizontal: 20 }}></View>
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.seller_join_date}
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  D.O.J</Text></Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
                            iconname={'arrow-forward-outline'}
                            icon_size={25}
                            icon_color={Color.white}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={sellerData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, index }) => renderSellerItem(item, index)}
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
        height: 45,
        borderWidth: 0.5, borderColor: Color.softGrey,
        borderRadius: 50, marginVertical: 5, marginTop: 20
    },
    searchInput: {
        width: '79.8%', paddingHorizontal: 10,
        fontFamily: 14, color: Color.lightBlack, fontFamily: Manrope.Medium
    },
});

//make this component available to the app
export default FollowingSellers;
