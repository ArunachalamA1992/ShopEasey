//import liraries
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    View,
    ScrollView,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Dimensions,
    LogBox,
    StatusBar,
    FlatList,
    PermissionsAndroid,
    Pressable, ImageBackground,
    Modal,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Media } from '../../Global/Media';
import CountdownTimer from '../../Components/CountdownTimer';
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { products } from '../../Config/Content';
import ItemCard from '../../Components/ItemCard';
import { TextStroke } from '../../Utils/TextStroke';

LogBox.ignoreAllLogs();

// create a component
const SellerProfile = () => {

    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);

    const [defaultRating, setDefaultRating] = useState('4');
    const [visibleData, setVisibleData] = useState(products);
    const [steelData, setSteelData] = useState([
        {
            steel_id: 1,
            steel_name: "Tshirts",
            steel_under: "UNDER",
            steel_price: "249",
            steel_image: require('../../assets/category/steel_one.png'),
        },
        {
            steel_id: 1,
            steel_name: "Headphones",
            steel_under: "FROM",
            steel_price: "599",
            steel_image: require('../../assets/category/steel_two.png'),
        },
        {
            steel_id: 1,
            steel_name: "Home Decor",
            steel_under: "FROM",
            steel_price: "1500",
            steel_image: require('../../assets/category/steel_three.png'),
        },
        {
            steel_id: 1,
            steel_name: "Tshirts",
            steel_under: "UNDER",
            steel_price: "249",
            steel_image: require('../../assets/category/steel_one.png'),
        },
    ]);

    const [shopSection] = useState([
        { id: 1, title: 'Category Menu', data: ['Category Menu'] },
        { id: 2, title: 'banners', data: ['banners'] },
        { id: 3, title: 'hot deals', data: ['hot deals'] },
        { id: 4, title: 'Trend Product', data: ['Trend Product'] },
        { id: 5, title: 'Offer Banner', data: ['Offer Banner'] },
        { id: 6, title: 'Flash Selling', data: ['Flash Selling'] },
        { id: 7, title: 'product', data: ['product'] },
        { id: 8, title: 'Steel the deals', data: ['Steel the deals'] },
        { id: 9, title: 'Discounts', data: ['Discounts'] },
    ]);

    const [maxRating, setMaxRating] = useState([
        {
            id: 1,
            rating: 1,
            experience: 'poor',
        },
        {
            id: 2,
            rating: 2,
            experience: 'Bad',
        },
        {
            id: 3,
            rating: 3,
            experience: 'Okay',
        },
        {
            id: 4,
            rating: 4,
            experience: 'Average',
        },
        {
            id: 5,
            rating: 5,
            experience: 'Good',
        },
    ]);
    const [shopData, setShopData] = useState([
        {
            shop_id: 1,
            shop_name: "Clothing",
            shop_image: require('../../assets/category/couple.png'),
        },
        {
            shop_id: 1,
            shop_name: "Grooming",
            shop_image: require('../../assets/category/grom.png'),
        },
        {
            shop_id: 1,
            shop_name: "Watches",
            shop_image: require('../../assets/category/watch.png'),
        },
        {
            shop_id: 1,
            shop_name: "Home Appliance",
            shop_image: require('../../assets/category/tv.png'),
        },
        {
            shop_id: 1,
            shop_name: "Clothing",
            shop_image: require('../../assets/category/couple.png'),
        },
    ]);

    const [OfferBanner] = useState([
        {
            id: '0',
            category_name: 'Men',
            category_image: Media.hot_deal_one,
        },
        // {
        //     id: '1',
        //     category_name: 'Women',
        //     category_image: Media.hot_deal_two,
        // },
    ]);

    const handleRatingPress = item => {
        if (defaultRating === item) {
            setDefaultRating(null);
        } else {
            setDefaultRating(item);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.primary} barStyle={'dark-content'} />

            <Animated.SectionList
                sections={shopSection}
                scrollEnabled={true}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                nestedScrollEnabled
                initialNumToRender={5}
                renderItem={({ item }) => {
                    switch (item) {
                        case 'Category Menu':
                            return (
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, paddingVertical: 15 }}>
                                    <View style={{ width: '95%', alignItems: 'center' }}>
                                        <View style={{ width: '95%', paddingVertical: 10 }}>
                                            <Image
                                                source={{ uri: Media.male_image }}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                <View>
                                                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Shopeasey</Text>
                                                </View>
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>1.2 k
                                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Followers</Text></Text>
                                                    <View style={{ width: 2, height: '95%', backgroundColor: Color.black, marginHorizontal: 20 }}></View>
                                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>500 +
                                                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Products</Text></Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <View style={{ padding: 7, paddingHorizontal: 20, backgroundColor: Color.shop_green, borderRadius: 3 }}>
                                                    <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Following</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                            {maxRating.map((item, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        key={index}
                                                        onPress={() => handleRatingPress(item.rating)}
                                                        style={{}}>
                                                        <Iconviewcomponent
                                                            Icontag={'FontAwesome'}
                                                            iconname={item.rating <= defaultRating ? 'star' : 'star-o'}
                                                            icon_size={16}
                                                            icon_color={Color.sunShade}
                                                        />
                                                    </TouchableOpacity>
                                                );
                                            })}
                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, marginHorizontal: 5, }}>
                                                4
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'banners':
                            return (
                                <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, marginTop: 20, marginVertical: 10, paddingVertical: 15 }}>
                                    <View style={{ width: '95%' }}>
                                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingVertical: 5 }}>About Shopeasey</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'justify', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                                    </View>
                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Joined</Text>
                                            <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }} numberOfLines={1}>5 Years ago</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Products</Text>
                                            <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }} numberOfLines={1}>Total 200+ Products</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Follow Us</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ padding: 5 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Entypo'}
                                                        iconname={'linkedin'}
                                                        icon_size={16}
                                                        icon_color={Color.primary}
                                                    />
                                                </View>
                                                <View style={{ padding: 5 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'FontAwesome'}
                                                        iconname={'facebook-f'}
                                                        icon_size={16}
                                                        icon_color={Color.primary}
                                                    />
                                                </View>
                                                <View style={{ padding: 5 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'FontAwesome'}
                                                        iconname={'youtube-play'}
                                                        icon_size={16}
                                                        icon_color={Color.primary}
                                                    />
                                                </View>
                                                <View style={{ padding: 5 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Feather'}
                                                        iconname={'x'}
                                                        icon_size={16}
                                                        icon_color={Color.primary}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'hot deals':
                            return (
                                <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, marginVertical: 10, paddingVertical: 15 }}>
                                    <View style={{ width: '95%' }}>
                                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingVertical: 5 }}>Shop by category</Text>
                                    </View>
                                    <View style={{ width: '95%' }}>
                                        <FlatList
                                            data={shopData}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            alignItems: 'center',
                                                            margin: 10, marginHorizontal: 10
                                                        }}>
                                                        <ImageBackground
                                                            source={require('../../assets/category/vector.png')}
                                                            style={{
                                                                width: 80,
                                                                height: 80,
                                                                resizeMode: 'contain',
                                                            }}
                                                        >
                                                            <Image
                                                                source={item.shop_image}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    resizeMode: 'center',
                                                                }}
                                                            />
                                                        </ImageBackground>
                                                        <Text style={{ fontSize: 12, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, textTransform: 'capitalize', paddingVertical: 5 }}>{item.shop_name}</Text>
                                                    </View>
                                                );
                                            }}

                                        />
                                    </View>
                                </View>
                            );
                        case 'Trend Product':
                            return (
                                <View style={{ width: scr_width, backgroundColor: Color.white, marginVertical: 10 }}>
                                    <FlatList
                                        data={OfferBanner}
                                        horizontal
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={{ width: scr_width, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image
                                                        source={require('../../assets/category/flat.png')}
                                                        style={{
                                                            width: '100%',
                                                            height: 340,
                                                            resizeMode: 'contain',
                                                        }}
                                                    />
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            );
                        case 'Offer Banner':
                            return (
                                <View style={{ width: scr_width, backgroundColor: Color.white, alignItems: 'center', paddingVertical: 10, marginVertical: 10 }}>

                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Top picks for you</Text>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>See All</Text>
                                    </View>
                                    <View style={{ width: '95%', alignItems: 'center' }}>
                                        <FlatList
                                            data={visibleData}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return <ItemCard item={item} navigation={navigation} />;
                                            }}
                                            style={{ width: '100%', }}
                                        />
                                    </View>
                                </View>
                            );
                        case 'Flash Selling':
                            return (
                                <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, paddingVertical: 10, marginVertical: 10 }}>
                                    <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10, }}>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#ECEFFE', borderTopStartRadius: 15, borderTopRightRadius: 15 }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/logos/black_logo.png')}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingVertical: 3 }}>WELCOME 200</Text>
                                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 3 }}>On min. purchase of 3 items</Text>
                                                <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingVertical: 3 }}>* GET 50% OFFER</Text>
                                            </View>
                                            <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Text style={{ textAlign: 'right', fontSize: 10, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, paddingVertical: 3, transform: [{ rotate: '-90deg' }] }}>. T&C Apply</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.5} style={{ width: '95%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: Color.primary, borderBottomStartRadius: 10, borderBottomRightRadius: 10 }}>
                                            <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Shop Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10 }}>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>New Arrivals</Text>
                                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>See All</Text>
                                        </View>

                                        <View style={{ width: '95%', paddingVertical: 10 }}>
                                            <FlatList
                                                data={visibleData}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    return <ItemCard item={item} navigation={navigation} />;
                                                }}

                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'product':
                            return (
                                <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, marginVertical: 10, }}>
                                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                        <Image
                                            source={require('../../assets/category/flash_sale.png')}
                                            style={{ width: '95%', height: 80, resizeMode: 'contain' }}
                                        />
                                        <CountdownTimer
                                            days={0}
                                            hours={1}
                                            minutes={5}
                                            seconds={1}
                                        />
                                    </View>
                                    <View style={{ width: '95%' }}>
                                        <FlatList
                                            data={visibleData}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return <ItemCard item={item} navigation={navigation} />;
                                            }}

                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly',
                                            backgroundColor: Color.black,
                                            padding: 10,
                                            top: 10, paddingVertical: 15
                                        }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialCommunityIcons'}
                                                iconname={'brightness-percent'}
                                                icon_size={22}
                                                icon_color={Color.white}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: Color.white,
                                                    fontFamily: Manrope.SemiBold,
                                                    letterSpacing: 0.5,
                                                    paddingHorizontal: 5,
                                                }}>
                                                COUPON
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialCommunityIcons'}
                                                iconname={'truck-delivery'}
                                                icon_size={22}
                                                icon_color={Color.white}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: Color.white,
                                                    fontFamily: Manrope.SemiBold,
                                                    letterSpacing: 0.5,
                                                    paddingHorizontal: 5,
                                                }}>
                                                FREE SHIPPING
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialIcons'}
                                                iconname={'local-offer'}
                                                icon_size={20}
                                                icon_color={Color.white}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: Color.white,
                                                    fontFamily: Manrope.SemiBold,
                                                    letterSpacing: 0.5,
                                                    paddingHorizontal: 5,
                                                }}>
                                                VOUCHER
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            );

                        case 'Steel the deals':
                            return (
                                <View style={{ width: '100%', height: 350, alignItems: 'center', backgroundColor: Color.white, marginVertical: 10, marginTop: 20 }}>
                                    <ImageBackground
                                        source={require('../../assets/category/steel_bg.jpg')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'contain',
                                        }}
                                    >
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                            <TextStroke stroke={2} color={'#000000'}>
                                                {/* <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>STEEL THE DEALS</Text> */}
                                                <Text style={{
                                                    fontSize: 24,
                                                    color: '#FFFFFF'
                                                }}> STEEL THE DEALS </Text>
                                            </TextStroke>
                                        </View>

                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}>
                                                {steelData.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity style={{ width: 150, height: 230, margin: 5, borderWidth: 0.5, borderRadius: 5 }}>
                                                            <View style={{ flex: 5, width: '100%', height: 80 }}>
                                                                <Image
                                                                    source={item.steel_image}
                                                                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, borderBottomStartRadius: 5, borderBottomRightRadius: 5 }}>
                                                                <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, textAlign: 'justify', paddingVertical: 3 }}>{item.steel_name}</Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                                                                    <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, textAlign: 'justify' }}>{item.steel_under} </Text>
                                                                    <Text style={{ fontSize: 15, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, textAlign: 'justify' }}> ₹{item.steel_price}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </ScrollView>
                                        </View>
                                    </ImageBackground>
                                </View>

                            );
                        case 'Discounts':
                            return (
                                <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, marginVertical: 10, paddingVertical: 20 }}>
                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Discounts for you</Text>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>See All</Text>
                                    </View>
                                    <View style={{ width: '95%' }}>
                                        <FlatList
                                            data={visibleData}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return <ItemCard item={item} navigation={navigation} />;
                                            }}

                                        />
                                    </View>
                                </View>

                            );
                    }
                }}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.softGrey, alignItems: 'center',
    },
});

//make this component available to the app
export default SellerProfile;
