//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    View,
    FlatList,
    TextInput,
    Keyboard,
    ScrollView,
    Image,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    SectionList,
    Alert,
    Platform, Dimensions,
    UIManager,
    LayoutAnimation,
    LogBox,
    Modal,
    Linking,
} from 'react-native';
import Color from '../../Global/Color';
import { useDispatch } from 'react-redux';
import { Media } from '../../Global/Media';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { moment } from 'moment'


LogBox.ignoreAllLogs();

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

// create a component
const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);
    const [categoryData, setCategoryData] = useState([
        {
            'id': '0',
            'category_name': 'Men',
            'category_image': require('../../assets/images/male.png')
        },
        {
            'id': '1',
            'category_name': 'Women',
            'category_image': require('../../assets/images/female.png')
        },
        {
            'id': '2',
            'category_name': 'Kid’s Wear',
            'category_image': require('../../assets/images/kutties.png')
        },
        {
            'id': '3',
            'category_name': 'Snacks',
            'category_image': require('../../assets/images/snacks.png')
        },
        {
            'id': '4',
            'category_name': 'Baby Care',
            'category_image': require('../../assets/images/baby.png')
        },
        {
            'id': '5',
            'category_name': 'Personal Care',
            'category_image': require('../../assets/images/care.png')
        },
        {
            'id': '6',
            'category_name': 'Home Kitchen',
            'category_image': require('../../assets/images/kitchen.png')
        },
        {
            'id': '7',
            'category_name': 'View All',
            'category_image': require('../../assets/images/viewall.png')
        },

    ]);

    const [currentHour, setCurrentHour] = useState('');
    const [currentMinutes, setCurrentMinutes] = useState('');
    const [currentSec, setCurrentSec] = useState('');

    const [hotDealsData, setHotDealsData] = useState([
        {
            'id': '0',
            'category_name': 'Men',
            'category_image': require('../../assets/images/deal_one.png')
        },
        {
            'id': '1',
            'category_name': 'Women',
            'category_image': require('../../assets/images/deal_two.png')
        },
    ]);

    const [bannerData, setBannerData] = useState([
        {
            'id': '0',
            'ban_name': 'Men',
            'ban_image': require('../../assets/images/ban_one.jpg')
        },
        {
            'id': '1',
            'ban_name': 'Women',
            'ban_image': require('../../assets/images/ban_two.png')
        },
        {
            'id': '2',
            'ban_name': 'Kid’s Wear',
            'ban_image': require('../../assets/images/ban_three.jpg')
        },
    ]);

    const [trendData, setTrendData] = useState([
        {
            'id': '0',
            'ban_name': 'Casual Shirts',
            'ban_image': require('../../assets/images/casual.png')
        },
        {
            'id': '1',
            'ban_name': 'Ethnic Wear',
            'ban_image': require('../../assets/images/ethnic.png')
        },
        {
            'id': '2',
            'ban_name': 'Kid’s Wear',
            'ban_image': require('../../assets/images/kids.png')
        },
        {
            'id': '3',
            'ban_name': 'Fruits & Snacks',
            'ban_image': require('../../assets/images/fruits.png')
        },
    ]);

    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    let listOffset = useRef({});
    const [tabIndex, setIndex] = useState(0);

    const [routes] = useState([
        { id: 1, title: 'Buy' },
        { id: 2, title: 'Rent' },
        { id: 3, title: 'Rent' },
        { id: 4, title: 'Rent' },
        { id: 5, title: 'Rent' },
    ]);
    const scrollY = useRef(new Animated.Value(0)).current;

    const [BuySection] = useState([
        { id: 1, title: 'Category Menu', data: ['Category Menu'] },
        { id: 2, title: 'Trend Product', data: ['Trend Product'] },
        { id: 3, title: 'Offer Banner', data: ['Offer Banner'] },
        { id: 4, title: 'Flash Selling', data: ['Flash Selling'] },
    ]);

    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        const interval = setInterval(() => {
            setCurrentHour(hours);
            setCurrentMinutes(min);
            setCurrentSec(sec)
        }, 1000);
        return () => clearInterval(interval);

    }, [currentHour, currentMinutes, currentSec]);

    // useEffect(() => {
    //     try {
    //         const unsubscribe = NetInfo.addEventListener(state => {
    //             setNetinfo(state.isConnected);
    //         });
    //         return () => unsubscribe;
    //     } catch (error) {
    //         console.log('catch in Home_interior use_Effect :', error);
    //     }
    // }, []);

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
    };

    const syncScrollOffset = () => {
        // const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach(item => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }

            <Animated.SectionList
                sections={BuySection}
                scrollEnabled={true}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                // contentContainerStyle={{
                //   paddingTop: HeaderHeight,
                //   minHeight: windowHeight - TabBarHeight,
                // }}
                nestedScrollEnabled
                initialNumToRender={5}
                renderItem={({ item }) => {
                    switch (item) {
                        case 'Category Menu':
                            return (
                                <View style={{ width: '100%', alignItems: 'center' }}>

                                    <View
                                        style={{
                                            width: '95%',
                                            alignItems: 'center',
                                            paddingHorizontal: 15, marginVertical: 10,
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => {

                                            }}
                                            activeOpacity={0.5}
                                            style={{
                                                marginRight: 5,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                flex: 1,
                                                width: '100%',
                                                height: 50,
                                                backgroundColor: Color.white,
                                                borderColor: Color.cloudyGrey, borderWidth: 0.5,
                                                paddingHorizontal: 10,
                                            }}>
                                            <View style={{}}>
                                                <Iconviewcomponent
                                                    Icontag={'Feather'}
                                                    iconname={'search'}
                                                    icon_size={25}
                                                    icon_color={Color.lightgrey}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    paddingTop: 2,
                                                    paddingHorizontal: 10,
                                                    color: Color.lightgrey,
                                                    fontFamily: Manrope.Medium,
                                                }}
                                                numberOfLines={1}>
                                                {`Search Products`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                            flexWrap: 'wrap', marginVertical: 10
                                        }}>

                                        <FlatList
                                            data={categoryData}
                                            keyExtractor={(item, index) => item + index}
                                            renderItem={({ item, index }) => {
                                                const lastItem = index === categoryData.length - 1;
                                                return (
                                                    <TouchableOpacity onPress={() => navigation.navigate("ProductList")} style={{ justifyContent: 'center', alignItems: 'center', margin: 10, padding: 10 }}>
                                                        <View style={{ width: 60, height: 60, backgroundColor: '#E6F5F8', borderRadius: 50 }}>
                                                            <Image
                                                                source={item.category_image}
                                                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                            />
                                                            <Text style={{ textAlign: 'center', fontSize: 12, color: Color.black, font: Manrope.SemiBold, paddingVertical: 5 }}>{item.category_name}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            numColumns={4}
                                            columnWrapperStyle={{
                                                flex: 1,
                                                justifyContent: "space-around"
                                            }}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            alignItems: 'center',
                                            marginVertical: 20,
                                        }}>
                                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginTop: 20 }}>
                                            <Image
                                                source={require('../../assets/images/deals.png')}
                                                style={{ width: 100, height: 30, resizeMode: 'contain' }}
                                            />
                                            <View style={{ padding: 5, paddingHorizontal: 10, marginHorizontal: 10, backgroundColor: Color.white, borderColor: '#0FAD45', borderWidth: 1, borderRadius: 5, }}>
                                                <Text style={{ fontSize: 10, color: '#0FAD45', fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>UPTO 70% OFF</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <SwiperFlatList
                                                autoplay
                                                autoplayDelay={1}
                                                autoplayLoop
                                                index={1}
                                                showPagination
                                                data={bannerData}
                                                paginationActiveColor={Color.primary}
                                                paginationStyleItem={{ width: 20, height: 5, marginTop: 25, justifyContent: 'center', alignItems: 'center' }}
                                                renderItem={({ item }) => (
                                                    <View style={{ width: 320, height: 120, borderRadius: 5, margin: 5 }}>
                                                        <Image
                                                            source={item.ban_image}
                                                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                        />
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'Trend Product':
                            return (
                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                    }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: Color.black,
                                                textAlign: 'justify',
                                                lineHeight: 25,
                                                fontFamily: Manrope.SemiBold,
                                            }}>
                                            Trending Products
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("ProductList")} >
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: Color.lightBlack,
                                                    textAlign: 'right',
                                                    lineHeight: 25,
                                                    fontFamily: Manrope.Medium,
                                                }}>
                                                View All
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        width: '100%', flexDirection: 'row',
                                        alignItems: 'center', marginVertical: 10
                                    }}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            {trendData.map((item, index) => {
                                                return (
                                                    <View style={{ width: 140, height: 160, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 5, borderTopRightRadius: 5, margin: 5 }}>
                                                        <View style={{ width: 140, height: 160, borderTopStartRadius: 5, borderTopRightRadius: 5, }}>
                                                            <Image
                                                                source={item.ban_image}
                                                                style={{ width: '100%', height: '100%', resizeMode: 'contain', borderTopStartRadius: 5, borderTopRightRadius: 5, }}
                                                            />
                                                        </View>
                                                        <View style={{ width: 140, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, position: 'absolute', bottom: 0, borderBottomStartRadius: 5, borderBottomRightRadius: 5 }}>
                                                            <Text style={{ color: Color.white, fontSize: 14, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>{item.ban_name}</Text>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>
                            );
                        case 'Offer Banner':
                            return (
                                <View style={{ width: '95%', backgroundColor: Color.white, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {hotDealsData.map((item, index) => {
                                            return (
                                                <View style={{ width: 380, height: 420, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                                    <Image
                                                        source={item.category_image}
                                                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                    />
                                                </View>
                                            );
                                        })}
                                    </ScrollView>
                                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#F4466E', paddingVertical: 10, top: -1 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialCommunityIcons'}
                                                iconname={'brightness-percent'}
                                                icon_size={22}
                                                icon_color={Color.lightgrey}
                                            />
                                            <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 2 }}>COUPON</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialCommunityIcons'}
                                                iconname={'truck-delivery'}
                                                icon_size={22}
                                                icon_color={Color.lightgrey}
                                            />
                                            <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 2 }}>FREE SHIPPING</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Iconviewcomponent
                                                Icontag={'MaterialIcons'}
                                                iconname={'local-offer'}
                                                icon_size={20}
                                                icon_color={Color.lightgrey}
                                            />
                                            <Text style={{ fontSize: 12, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, paddingHorizontal: 2 }}>VOUCHER</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor: '#E6F5F8' }}>
                                        <View style={{ width: '100%', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/off_one.png')}
                                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                />
                                            </View>
                                            <View style={{ width: 3, height: 3, backgroundColor: Color.white }}></View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/off_two.png')}
                                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/images/off_three.jpg')}
                                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );

                        case 'Flash Selling':
                            return (
                                <View style={{ width: '95%', backgroundColor: Color.white, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>

                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: '#E6F5F8' }}>
                                        <View style={{ width: 100, height: 70, alignItems: 'center', padding: 5 }}>
                                            <Image
                                                source={require('../../assets/images/flash.png')}
                                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                            />
                                        </View>
                                        <View style={{ marginHorizontal: 10, padding: 5 }}>
                                            <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Ends In</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                <View style={{ padding: 10, paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.cloudyGrey, borderRadius: 5, backgroundColor: Color.white, elevation: 0.5 }}>
                                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{currentHour}</Text>
                                                </View>
                                                <View style={{ padding: 10, paddingHorizontal: 10, marginHorizontal: 10, borderWidth: 0.5, borderColor: Color.cloudyGrey, borderRadius: 5, backgroundColor: Color.white, elevation: 0.5 }}>
                                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{currentMinutes}</Text>
                                                </View>
                                                <View style={{ padding: 10, paddingHorizontal: 10, borderWidth: 0.5, borderColor: Color.cloudyGrey, borderRadius: 5, backgroundColor: Color.white, elevation: 0.5 }}>
                                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{currentSec}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor: '#E6F5F8' }}>
                                        <View style={{ width: '100%', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/off_one.png')}
                                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                />
                                            </View>
                                            <View style={{ width: 3, height: 3, backgroundColor: Color.white }}></View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/off_two.png')}
                                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/images/off_three.jpg')}
                                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                            />
                                        </View>
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
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    child: { width: Dimensions.get('window').width, justifyContent: 'center' },
    text: { fontSize: 14, textAlign: 'center' },
});

//make this component available to the app
export default HomeScreen;
