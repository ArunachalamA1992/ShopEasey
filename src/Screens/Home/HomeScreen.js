import React, {useState, useEffect} from 'react';
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
  Modal,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import Color from '../../Global/Color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Badge, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scr_width} from '../../Utils/Dimensions';
import CountdownTimer from '../../Components/CountdownTimer';
import ItemCard, {ItemCardHorizontal} from '../../Components/ItemCard';
import * as ImagePicker from 'react-native-image-picker';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDataCount, setUserData} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import common_fn from '../../Config/common_fn';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import PostCompletedModal from '../MyOrders/OrderCompletionModal';
import VoiceSearch from '../../Components/VoiceSearch';

LogBox.ignoreAllLogs();
const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [currentCity, setCurrentCity] = useState('');
  const [height, setHeight] = useState(undefined);
  const [FlashOffers, setFlashOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [imageVisible, setImageVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [latestProducts, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dataCount = useSelector(state => state.UserReducer.count);
  var {wishlist, cart} = dataCount;

  const [OfferBanner] = useState([
    {
      id: '0',
      category_name: 'Men',
      category_image: Media.hot_deal_one,
    },
    {
      id: '1',
      category_name: 'Women',
      category_image: Media.hot_deal_two,
    },
  ]);
  const [hotDealsData] = useState([
    {
      id: 1,
      image: Media.hot_deal_ban_one,
    },
    {
      id: 2,
      image: Media.hot_deal_ban_two,
    },
    {
      id: 3,
      image: Media.hot_deal_ban_one,
    },
    {
      id: 4,
      image: Media.hot_deal_ban_two,
    },
    {
      id: 5,
      image: Media.hot_deal_ban_one,
    },
    {
      id: 6,
      image: Media.hot_deal_ban_two,
    },
  ]);

  const [bannerData, setBannerData] = useState([
    {
      id: '0',
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
    {
      id: '1',
      ban_name: 'Women',
      ban_image: Media.banner_two,
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: Media.banner_three,
    },
    {
      id: '3',
      ban_name: 'Men',
      ban_image: Media.banner_four,
    },
    {
      id: '4',
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
  ]);

  const [trendData, setTrendData] = useState([
    {
      id: '0',
      ban_name: 'Casual Shirts',
      ban_image: require('../../assets/images/casual.png'),
    },
    {
      id: '1',
      ban_name: 'Ethnic Wear',
      ban_image: require('../../assets/images/casual.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/casual.png'),
    },
    {
      id: '3',
      ban_name: 'Fruits & Snacks',
      ban_image: require('../../assets/images/casual.png'),
    },
  ]);

  const [shopSection] = useState([
    {id: 1, title: 'Category Menu', data: ['Category Menu']},
    {id: 2, title: 'banners', data: ['banners']},
    {id: 3, title: 'hot deals', data: ['hot deals']},
    {id: 4, title: 'Trend Brands', data: ['Trend Brands']},
    {id: 5, title: 'Trend Product', data: ['Trend Product']},
    {id: 6, title: 'Offer Banner', data: ['Offer Banner']},
    {id: 7, title: 'Flash Selling', data: ['Flash Selling']},
    {id: 8, title: 'product', data: ['product']},
    {id: 9, title: 'Latest Product', data: ['Latest Product']},
  ]);

  const [visibleData, setVisibleData] = useState(products.slice(0, 4));
  const [showLoadMore, setShowLoadMore] = useState(products.length > 4);

  const loadMoreItems = () => {
    const currentLength = visibleData.length;
    const nextBatch = products.slice(currentLength, currentLength + 8);
    setVisibleData([...visibleData, ...nextBatch]);
    setShowLoadMore(currentLength + 8 < products.length);
  };

  useEffect(() => {
    currentGeolocation();
  }, [currentCity, token]);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.DeviceEventManagerModule,
    );
    const subscription = eventEmitter.addListener(
      'OPEN_PRODUCT_DETAILS',
      event => {
        const {product_id} = event;
        if (product_id) {
          navigation.navigate('ProductDetails', {id: product_id});
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  const currentGeolocation = async () => {
    const locPermissionDenied = await common_fn.locationPermission();
    if (locPermissionDenied) {
      const timeoutId = setTimeout(() => {
        console.error('Location request timed out');
      }, 10000);

      Geolocation.getCurrentPosition(
        async position => {
          clearTimeout(timeoutId);
          const {latitude, longitude} = position.coords;

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const address = response?.data?.address;
            if (address) {
              const city = `${address?.city ?? address?.suburb},${
                address?.country_code
              }`;
              setCurrentCity(city);
            }
          } catch (error) {
            console.error('Error fetching city:', error);
          }
        },
        error => {
          clearTimeout(timeoutId); // Clear the timeout on error
          console.error('Error getting location:', error);
        },
      );
    }
  };

  const calculateTotalDiscountPercentage = type => {
    const filteredProducts = products?.filter(
      product => product?.type === type,
    );

    if (filteredProducts.length === 0) return 0;

    const totalDiscountPercentage = filteredProducts.reduce(
      (total, product) => {
        const discount = parseInt(
          ((product.price - product.discountPrice) / product.price) * 100,
          10,
        );
        return total + discount;
      },
      0,
    );

    return totalDiscountPercentage / filteredProducts.length;
  };

  const [responseCamera, setResponseCamera] = React.useState('');
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');

  const handleVoiceSearch = query => {
    console.log('query------------------', query);
    if (query != '') {
      navigation.navigate('Search', {searchProduct: query});
    }
  };

  const openCameraWithPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            setResponseCamera(response?.assets?.[0]?.uri);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getUserData();
    setLoading(true);
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getFlashDeals();
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getFlashDeals = async () => {
    try {
      const getFlashDeals = await fetchData.flash_Offers(``, token);
      setFlashOffers(getFlashDeals?.data);
      var data = `project=offer`;
      const get_products = await fetchData.list_products(data, token);
      setProducts(get_products?.data);
      setVisibleData(get_products?.data?.slice(0, 4));
      setShowLoadMore(get_products?.data?.length > 4);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getData = async () => {
    try {
      const categories_data = await fetchData.categories(`?limit=12`, token);
      setCategoryData(categories_data?.data);
      const trending_products = await fetchData.list_products(
        `is_trending=1`,
        token,
      );
      setTrendingProducts(trending_products?.data);
      const latest_products = await fetchData.list_products(``, token);
      setLatestProduct(latest_products?.data);
      // var banner_data = `seller=home_page`;
      // const getBannerData = await fetchData.get_banner(banner_data, token);
      // setBannerData(getBannerData?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getCountData();
  }, [token, getCountData, userData]);

  const getCountData = async () => {
    try {
      const getData = await fetchData.profile_data(``, token);
      dispatch(
        setDataCount({
          wishlist: getData?.data?.wishlist_count,
          cart: getData?.data?.cart_count,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = Page + 1;
      var data = `project=offer&page=${nextPage}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...products, ...response?.data];
        setProducts(updatedData);
        // setVisibleData(updatedData?.slice(0, 4));
        // setShowLoadMore(updatedData?.length > 4);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
      {loading ? (
        <View style={{marginHorizontal: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <SkeletonPlaceholder.Item
                  width={180}
                  height={20}
                  borderRadius={10}
                  marginTop={10}
                />
              </View>
              <SkeletonPlaceholder.Item
                width={30}
                height={30}
                borderRadius={100}
                marginHorizontal={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={30}
                height={30}
                borderRadius={100}
                marginHorizontal={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={30}
                height={30}
                borderRadius={100}
                marginHorizontal={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={50}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{alignItems: 'center', mediaType: 10}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={100}
                  marginHorizontal={10}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={10}
                  borderRadius={10}
                  marginTop={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={120}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={20}
              borderRadius={10}
              marginTop={20}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={100}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={100}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={20}
              borderRadius={10}
              marginTop={20}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={100}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'50%'}
                height={100}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={180}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <View
            style={{
              height: 100,
              backgroundColor: Color.primary,
              marginBottom: 30,
            }}>
            <View
              style={{
                backgroundColor: Color.primary,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View
                style={{
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Iconviewcomponent
                      Icontag={'Octicons'}
                      iconname={'location'}
                      icon_size={20}
                      icon_color={Color.white}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.white,
                        marginLeft: 5,
                        textTransform: 'capitalize',
                        fontFamily: Manrope.Bold,
                      }}>
                      {currentCity}
                    </Text>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={{marginHorizontal: 10}}
                  onPress={() => {}}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'notifications-outline'}
                    icon_size={26}
                    icon_color={Color.white}
                    iconstyle={{marginTop: 0}}
                  />
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={{marginHorizontal: 10}}
                  onPress={() => {
                    // navigation.navigate('WishListTab');
                    navigation.navigate('MyRewards');
                  }}>
                  {/* {wishlist != 0 ? (
                    <Badge
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: -10,
                        right: -10,
                        backgroundColor: Color.red,
                        color: Color.white,
                        fontFamily: Manrope.Bold,
                        fontSize: 12,
                      }}>
                      {wishlist}
                    </Badge>
                  ) : null} */}
                  {/* <AntDesign name="hearto" size={22} color={Color.white} /> */}
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'award'}
                    icon_size={22}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 10}}
                  onPress={() => {
                    navigation.navigate('MyCartTab');
                  }}>
                  {cart != 0 ? (
                    <Badge
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: -10,
                        right: -10,
                        backgroundColor: Color.red,
                        color: Color.white,
                        fontFamily: Manrope.Bold,
                        fontSize: 12,
                      }}>
                      {cart}
                    </Badge>
                  ) : null}
                  <Feather name="shopping-cart" size={22} color={Color.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                top: 50,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: Color.white,
                  flexDirection: 'row',
                  marginVertical: 20,
                  alignItems: 'center',
                  borderRadius: 50,
                  width: '90%',
                  height: 50,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                }}
                onPress={() => {
                  navigation.navigate('Search', {searchProduct: ''});
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'search1'}
                  icon_size={20}
                  icon_color={Color.black}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    marginHorizontal: 10,
                  }}
                  numberOfLines={1}>
                  {`Search Products`}
                </Text>
                <VoiceSearch onSearch={handleVoiceSearch} />
                {/* <TouchableOpacity
                  onPress={() => {
                    openCameraWithPermission();
                  }}>
                  <MCIcon
                    color={Color.lightBlack}
                    name="camera-outline"
                    size={20}
                    style={{
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity> */}
              </TouchableOpacity>
            </View>
          </View>
          <Animated.SectionList
            sections={shopSection}
            scrollEnabled={true}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            nestedScrollEnabled
            initialNumToRender={5}
            renderItem={({item}) => {
              switch (item) {
                case 'Category Menu':
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                        // padding: 10,
                      }}>
                      {categoryData?.slice(0, 11)?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: item?.id,
                              });
                            }}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              // marginHorizontal: 10,
                              width: '25%',
                              marginVertical: 10,
                            }}>
                            <View style={{alignItems: 'center'}}>
                              <View
                                style={{
                                  backgroundColor: '#E6F5F8',
                                  borderRadius: 100,
                                  width: 65,
                                  height: 65,
                                }}>
                                <Image
                                  source={{uri: item?.file}}
                                  style={{
                                    width: 65,
                                    height: 65,
                                    resizeMode: 'contain',
                                    borderRadius: 100,
                                  }}
                                />
                              </View>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Color.black,
                                  font: Manrope.SemiBold,
                                  paddingVertical: 5,
                                }}
                                numberOfLines={2}>
                                {item?.category_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('category');
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          // marginHorizontal: 10,
                          marginVertical: 10,
                          width: '25%',
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View
                            style={{
                              backgroundColor: '#fff',
                              borderRadius: 100,
                              width: 65,
                              height: 65,
                            }}>
                            <Image
                              source={require('../../assets/images/viewall.png')}
                              style={{
                                width: 65,
                                height: 65,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 12,
                              color: Color.black,
                              font: Manrope.SemiBold,
                              paddingVertical: 5,
                            }}>
                            View All
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                case 'banners':
                  return (
                    <View
                      style={{
                        width: width,
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <SwiperFlatList
                        autoplay
                        autoplayDelay={5}
                        autoplayLoop
                        index={1}
                        showPagination
                        data={bannerData}
                        paginationActiveColor={Color.primary}
                        paginationStyleItem={{
                          width: 15,
                          height: 3,
                          marginTop: 40,
                          marginHorizontal: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: 560,
                              });
                            }}>
                            <Image
                              source={{uri: item.ban_image}}
                              style={{
                                width: width - 10,
                                height: 130,
                                borderRadius: 5,
                                resizeMode: 'cover',
                                marginHorizontal: 5,
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  );
                case 'hot deals':
                  return (
                    <View
                      style={{
                        marginTop: 20,
                        paddingStart: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: 0,
                          marginTop: 20,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                              }}>
                              H
                            </Text>
                            <Iconviewcomponent
                              Icontag={'MaterialCommunityIcons'}
                              iconname={'fire'}
                              icon_size={20}
                              icon_color={Color.red}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                              }}>
                              T
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Color.black,
                              fontFamily: Manrope.Bold,
                              paddingHorizontal: 5,
                            }}>
                            Deals
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 5,
                            paddingHorizontal: 10,
                            marginHorizontal: 5,
                            backgroundColor: Color.white,
                            borderColor: '#0FAD45',
                            borderWidth: 1,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 8,
                              color: '#0FAD45',
                              fontFamily: Manrope.Bold,
                              letterSpacing: 0.5,
                            }}>
                            UPTO 70% OFF
                          </Text>
                        </View>
                      </View>
                      <FlatList
                        data={hotDealsData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 10,
                              }}
                              onPress={() => {
                                navigation.navigate('ProductList', {
                                  category_id: 560,
                                });
                              }}>
                              <Image
                                source={{uri: item?.image}}
                                style={{
                                  width: 170,
                                  height: 130,
                                  resizeMode: 'contain',
                                }}
                              />
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  );
                case 'Trend Brands':
                  return (
                    <View
                      style={{
                        marginTop: 5,
                        paddingStart: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            textAlign: 'justify',
                            fontWeight: '600',
                            fontFamily: Manrope.Bold,
                          }}>
                          Trending Brands
                        </Text>
                        {/* <TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              textAlign: 'right',
                              fontFamily: Manrope.Bold,
                            }}>
                            View All
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 0,
                        }}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {trendData.map((item, index) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('ProductList', {
                                    category_id: 560,
                                  });
                                }}
                                style={{
                                  width: 150,
                                  height: 170,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  margin: 5,
                                }}>
                                <Image
                                  source={item.ban_image}
                                  style={{
                                    width: 150,
                                    height: 160,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: Color.lightBlack,
                                    paddingHorizontal: 10,
                                    padding: 5,
                                    marginHorizontal: 10,
                                    position: 'absolute',
                                    top: 10,
                                    right: -10,
                                  }}>
                                  <FontAwesome6
                                    name="award"
                                    size={14}
                                    color={Color.white}
                                  />
                                  <Text
                                    style={{
                                      color: Color.white,
                                      fontSize: 12,
                                      fontFamily: Manrope.Medium,
                                      marginHorizontal: 5,
                                    }}>
                                    Best Seller
                                  </Text>
                                </View>
                                {calculateTotalDiscountPercentage(
                                  item?.ban_name,
                                ) != 0 ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      paddingHorizontal: 10,
                                      padding: 5,
                                      position: 'absolute',
                                      top: 40,
                                      right: -10,
                                    }}>
                                    <Image
                                      source={require('../../assets/category/rect.png')}
                                      style={{
                                        width: 60,
                                        height: 30,
                                        resizeMode: 'contain',
                                      }}
                                    />
                                    <Text
                                      style={{
                                        color: Color.white,
                                        fontSize: 12,
                                        right: 20,
                                        fontFamily: Manrope.Medium,
                                        position: 'absolute',
                                      }}>
                                      {calculateTotalDiscountPercentage(
                                        item?.ban_name,
                                      )}{' '}
                                      %
                                    </Text>
                                  </View>
                                ) : null}
                                <View
                                  style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: Color.primary,
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    padding: 5,
                                    bottom: 2,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      color: Color.white,
                                      fontSize: 12,
                                      fontFamily: Manrope.Bold,
                                      letterSpacing: 0.5,
                                    }}>
                                    {item.ban_name}
                                  </Text>
                                  <Icon
                                    name="arrow-forward-circle"
                                    size={25}
                                    color={Color.white}
                                  />
                                </View>
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      </View>
                    </View>
                  );
                case 'Trend Product':
                  return (
                    trendingProducts?.length > 0 && (
                      <View
                        style={{
                          paddingStart: 10,
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 16,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                            }}>
                            Trending Products
                          </Text>
                          {/* <Text
                            style={{
                              fontSize: 14,
                              color: Color.cloudyGrey,
                              fontFamily: Manrope.Bold,
                            }}>
                            View All
                          </Text> */}
                        </View>
                        <FlatList
                          data={trendingProducts}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          renderItem={({item, index}) => {
                            return (
                              <ItemCardHorizontal
                                item={item}
                                navigation={navigation}
                              />
                            );
                          }}
                        />
                      </View>
                    )
                  );
                case 'Offer Banner':
                  return (
                    <View
                      style={{
                        marginTop: 25,
                        backgroundColor: Color.white,
                      }}>
                      <SwiperFlatList
                        autoplay
                        autoplayDelay={5}
                        autoplayLoop
                        index={1}
                        // showPagination
                        data={OfferBanner}
                        // paginationActiveColor={Color.primary}
                        // paginationStyleItem={{
                        //   width: 15,
                        //   height: 3,
                        //   marginTop: 35,
                        //   marginHorizontal: 2,
                        //   justifyContent: 'center',
                        //   alignItems: 'center',
                        // }}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            style={{
                              width: scr_width,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: 560,
                              });
                            }}>
                            <Image
                              source={{uri: item?.category_image}}
                              style={{
                                width: '100%',
                                height: 470,
                                resizeMode: 'cover',
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          backgroundColor: '#F4466E',
                          padding: 10,
                          top: -3,
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
                            icon_color={Color.lightgrey}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              paddingHorizontal: 2,
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
                            icon_color={Color.lightgrey}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              paddingHorizontal: 2,
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
                            icon_color={Color.lightgrey}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              paddingHorizontal: 2,
                            }}>
                            VOUCHER
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          backgroundColor: '#E6F5F860',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: 560,
                              });
                            }}
                            style={{
                              flex: 1,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{uri: Media.flash_sell_ban_one}}
                              style={{
                                height: 100,
                                resizeMode: 'contain',
                                marginHorizontal: 5,
                              }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: 560,
                              });
                            }}
                            style={{
                              flex: 1,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{uri: Media.flash_sell_ban_two}}
                              style={{
                                height: 100,
                                resizeMode: 'contain',
                                marginHorizontal: 5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#0095B6',
                            borderRadius: 10,
                            marginVertical: 10,
                          }}>
                          <MCIcon
                            name="ticket-percent"
                            size={46}
                            color={'#0095B6'}
                          />
                          <View style={{flex: 1, marginLeft: 10}}>
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#0FAD45',
                                fontFamily: Manrope.Medium,
                                paddingHorizontal: 2,
                              }}>
                              Live offer
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                paddingHorizontal: 2,
                              }}>
                              30% OFF
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.lightBlack,
                                fontFamily: Manrope.Medium,
                                paddingHorizontal: 2,
                              }}>
                              Min spent 2000$ of cart value
                            </Text>
                          </View>
                          {/* <View
                            style={{
                              padding: 10,
                              paddingHorizontal: 20,
                              backgroundColor: Color.primary,
                              borderRadius: 5,
                            }}>
                            <Text style={{fontSize: 12, color: Color.white}}>
                              Claim
                            </Text>
                          </View> */}
                          {/* <Button
                            mode="contained"
                            onPress={() => { }}
                            style={{
                              backgroundColor: Color.primary,
                              borderRadius: 5,
                            }}
                            textColor={Color.white}>

                          </Button> */}
                        </View>
                      </View>
                    </View>
                  );
                case 'Flash Selling':
                  return (
                    FlashOffers?.length > 0 &&
                    FlashOffers?.map((item, index) => {
                      const expirationDate = new Date(item?.expired_at);
                      const currentDate = new Date();
                      const difference =
                        expirationDate.getTime() - currentDate.getTime();
                      const seconds = Math.floor(difference / 1000) % 60;
                      const minutes = Math.floor(difference / (1000 * 60)) % 60;
                      const hours =
                        Math.floor(difference / (1000 * 60 * 60)) % 24;
                      const days = Math.floor(
                        difference / (1000 * 60 * 60 * 24),
                      );
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: Color.white,
                            marginHorizontal: 10,
                            padding: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{uri: item.logo}}
                              style={{
                                width: 100,
                                height: 60,
                                resizeMode: 'contain',
                              }}
                            />
                            <CountdownTimer
                              days={days}
                              hours={hours}
                              minutes={minutes}
                              seconds={seconds}
                            />
                          </View>
                        </View>
                      );
                    })
                  );
                case 'product':
                  return (
                    <View
                      style={{
                        backgroundColor: Color.white,
                        marginBottom: 10,
                        padding: 10,
                      }}>
                      <FlatList
                        data={visibleData}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          return (
                            <ItemCard item={item} navigation={navigation} />
                          );
                        }}
                        onEndReached={() => {
                          loadMoreData();
                        }}
                        onEndReachedThreshold={3}
                      />
                      {showLoadMore && (
                        <TouchableOpacity
                          onPress={() => {
                            loadMoreItems();
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: Manrope.Bold,
                              color: Color.primary,
                              marginHorizontal: 5,
                              textDecorationLine: 'underline',
                              textAlign: 'center',
                            }}>
                            See more
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                case 'Latest Product':
                  return (
                    latestProducts?.length > 0 && (
                      <View
                        style={{
                          paddingStart: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 16,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                            }}>
                            Latest Products
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('latest');
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Bold,
                                marginRight: 10,
                              }}>
                              View All
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <FlatList
                          data={latestProducts}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          renderItem={({item, index}) => {
                            return (
                              <ItemCardHorizontal
                                item={item}
                                navigation={navigation}
                              />
                            );
                          }}
                        />
                      </View>
                    )
                  );
              }
            }}
          />
        </>
      )}
      {netInfo_State ? null : (
        <Animated.View
          animation="fadeInRight"
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#626262',
            opacity: 0.5,
            padding: 10,
            marginTop: Platform.OS == 'ios' ? 80 : 0,
          }}>
          <Text style={{color: 'white'}}>No Internet Connection</Text>
        </Animated.View>
      )}

      <Modal transparent={true} animationType="fade" visible={imageVisible}>
        <View style={{backgroundColor: Color.transparantBlack, flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 60,
                top: 200,
                // padding: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setImageVisible(false)}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'closecircleo'}
                icon_size={35}
                icon_color={Color.white}
              />
            </TouchableOpacity>
            <Image
              source={require('../../assets/category/offer.png')}
              style={{
                flex: 1,
                position: 'relative',
                width: 250,
                justifyContent: 'center',
                alignItems: 'center',
                height: 250,
                // transform: [{ rotate: '10deg' }],
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </Modal>
      <PostCompletedModal navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  child: {width: Dimensions.get('window').width, justifyContent: 'center'},
  text: {fontSize: 14, textAlign: 'center'},
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewAllContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 90,
  },
});

export default HomeScreen;
