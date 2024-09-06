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
  TextInput,
  ImageBackground,
} from 'react-native';
import Color from '../../Global/Color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {ActivityIndicator, Badge, Button, Divider} from 'react-native-paper';
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
import PostCompletedModal from '../Cart/OrderCompletionModal';
import VoiceSearch from '../../Components/VoiceSearch';
import LinearGradient from 'react-native-linear-gradient';

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
  const [latestloadMore, setlatestloadMore] = useState(false);
  const [latestPage, setlatestPage] = useState(1);
  const [latestendReached, setlatestendReached] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [imageVisible, setImageVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [latestProducts, setLatestProduct] = useState([]);
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [FeaturedloadMore, setFeaturedLoadMore] = useState(false);
  const [FeaturedPage, setFeaturedPage] = useState(1);
  const [FeaturedendReached, setFeaturedEndReached] = useState(false);
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

  const [bannerData, setBannerData] = useState([]);
  const splitByCategory = data => {
    return data.reduce((result, item) => {
      const category = item.category;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(item);
      return result;
    }, {});
  };

  const categorizedData = splitByCategory(bannerData);

  const [trendData, setTrendData] = useState([
    {
      id: 1,
      ban_image: require('../../assets/Brands/banner-down-1.png'),
      banners: [
        {
          id: 1,
          image: require('../../assets/Brands/men1.jpg'),
        },
        {
          id: 2,
          image: require('../../assets/Brands/men2.jpg'),
        },
        {
          id: 3,
          image: require('../../assets/Brands/men3.jpg'),
        },
        {
          id: 4,
          image: require('../../assets/Brands/men4.jpg'),
        },
      ],
    },
    {
      id: 2,
      ban_image: require('../../assets/Brands/img4.png'),
      banners: [
        {
          id: 1,
          image: require('../../assets/Brands/img1.jpg'),
        },
        {
          id: 2,
          image: require('../../assets/Brands/img2.jpg'),
        },
        {
          id: 3,
          image: require('../../assets/Brands/img3.jpg'),
        },
        {
          id: 4,
          image: require('../../assets/Brands/men4.jpg'),
        },
      ],
    },
    {
      id: 3,
      ban_image: require('../../assets/Brands/banner-down-2.png'),
      banners: [
        {
          id: 1,
          image: require('../../assets/Brands/slide-1.png'),
        },
        {
          id: 2,
          image: require('../../assets/Brands/slide-2.png'),
        },
        {
          id: 3,
          image: require('../../assets/Brands/slide-3.png'),
        },
      ],
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
    {id: 9, title: 'Featured Product', data: ['Featured Product']},
    {id: 10, title: 'Latest Product', data: ['Latest Product']},
  ]);

  const [FeaturedVisibleData, setFeaturedVisibleData] = useState(
    FeaturedProducts.slice(0, 4),
  );
  const [FeaturedShowLoadMore, setFeaturedShowLoadMore] = useState(
    FeaturedProducts.length > 4,
  );

  const loadFeaturedMoreItems = () => {
    const currentLength = FeaturedVisibleData.length;
    const nextBatch = FeaturedProducts.slice(currentLength, currentLength + 8);
    setFeaturedVisibleData([...FeaturedVisibleData, ...nextBatch]);
    setFeaturedShowLoadMore(currentLength + 8 < FeaturedProducts.length);
  };

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
    // if (query != '') {
    //   navigation.navigate('Search', {searchProduct: query});
    // }
    setVoiceSearchQuery(query);
    propertySearch(query);
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
      const categories_data = await fetchData.categories(`?limit=14`, token);
      setCategoryData(categories_data?.data);
      const trending_products = await fetchData.list_products(
        `is_trending=1`,
        token,
      );
      setTrendingProducts(trending_products?.data);
      const latest_products = await fetchData.list_products(``, token);
      setLatestProduct(latest_products?.data);

      const fetured_products = await fetchData.list_products(
        `is_featured=1`,
        token,
      );
      setFeaturedProducts(fetured_products?.data);
      setFeaturedVisibleData(fetured_products?.data?.slice(0, 4));
      setFeaturedShowLoadMore(fetured_products?.data?.length > 4);

      //banner
      var banner_data = `seller=home_page`;
      const getBannerData = await fetchData.get_banner(banner_data, null);
      setBannerData(getBannerData?.data);
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

  const featuredLoadMoreData = async () => {
    if (FeaturedloadMore || FeaturedendReached) {
      return;
    }
    setFeaturedLoadMore(true);
    try {
      const nextPage = FeaturedPage + 1;
      var data = `is_featured=1&page=${nextPage}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setFeaturedPage(nextPage);
        const updatedData = [...FeaturedProducts, ...response?.data];
        setFeaturedProducts(updatedData);
      } else {
        setFeaturedEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFeaturedLoadMore(false);
    }
  };

  const latestLoadMoreData = async () => {
    if (latestloadMore || latestendReached) {
      return;
    }
    setlatestloadMore(true);
    try {
      const nextPage = latestPage + 1;
      var data = `page=${nextPage}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setlatestPage(nextPage);
        const updatedData = [...latestProducts, ...response?.data];
        setLatestProduct(updatedData);
      } else {
        setlatestendReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setlatestloadMore(false);
    }
  };

  const [searchProduct, setSearchProduct] = useState('');
  const [selectData, setSelectData] = useState({});
  const [searchloadMore, setSearchLoadMore] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchendReached, setSearchEndReached] = useState(false);
  const [ProductSuggestions, setProductSuggestions] = useState({
    data: [],
    visible: false,
  });

  const propertySearch = async input => {
    setSearchProduct(input);
    try {
      const data = `filter=${input}&page=1&limit=10`;
      const getData = await fetchData.search(data, token);
      setProductSuggestions({
        data: getData?.data?.keyword?.rows,
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadSearchMoreData = async () => {
    if (searchloadMore || searchendReached) {
      return;
    }
    setSearchLoadMore(true);
    try {
      const nextPage = searchPage + 1;
      var data = `filter=${searchProduct}&page=${nextPage}&limit=10`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setSearchPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data?.keyword?.rows,
        ];
        setProductSuggestions(updatedData);
      } else {
        setSearchEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setSearchLoadMore(false);
    }
  };

  const getSearchData = async item => {
    try {
      setProductSuggestions({
        data: [],
        visible: false,
      });
      navigation.navigate('SearchDataList', {
        searchProduct: item?.keyword,
        selectData: item,
      });
      setSearchProduct('');
      setSelectData({});
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const checkModalShown = async () => {
      const modalShown = await AsyncStorage.getItem('modalShown');
      if (!modalShown && token !== undefined) {
        setImageVisible(true);
        await AsyncStorage.setItem('modalShown', 'true');
      }
    };

    checkModalShown();
    // if (token !== undefined) {
    //   setImageVisible(true);
    // }
  }, [token]);

  const gradiantColors = ['#0D71BA', '#2994CB', '#0D71BA'];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={{
          height: StatusBar.currentHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={gradiantColors}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent
      />
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
      {loading ? (
        <View
          style={{marginHorizontal: 10, backgroundColor: Color.white, flex: 1}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <View style={{flex: 1}}> */}
              <SkeletonPlaceholder.Item
                width={180}
                height={20}
                borderRadius={10}
                marginTop={10}
              />
              {/* </View> */}
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
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
              style={{
                height: 480,
                // backgroundColor: Color.primary,
                marginBottom: 10,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#0D71BA', '#2994CB', '#0D71BA']}>
              {/* <View
              style={{
                height: 120,
                backgroundColor: Color.primary,
                marginBottom: 30,
              }}> */}
              {/* <ImageBackground
                source={Media.home_back}
                style={{
                  width: '100%',
                  height: 160,
                  opacity: 0.5,
                  resizeMode: 'contain',
                }}
              /> */}
              <View
                style={{
                  // position: 'absolute',
                  // top: -20,
                  // bottom: 0,
                  // left: 0,
                  // right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
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
                      fontSize: 16,
                      color: Color.white,
                      marginLeft: 5,
                      textTransform: 'capitalize',
                      fontFamily: Manrope.Bold,
                    }}>
                    {currentCity}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() => navigation.navigate('notification')}>
                    <Feather name="bell" size={24} color={Color.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() => navigation.navigate('MyRewards')}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome5'}
                      iconname={'award'}
                      icon_size={24}
                      icon_color={Color.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginHorizontal: 10}}
                    onPress={() => navigation.navigate('MyCartTab')}>
                    {cart !== 0 && (
                      <Badge
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: -10,
                          right: -10,
                          backgroundColor: Color.red,
                          color: Color.white,
                          fontFamily: Manrope.Bold,
                          fontSize: 13,
                        }}>
                        {cart}
                      </Badge>
                    )}
                    <Feather
                      name="shopping-cart"
                      size={24}
                      color={Color.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* </View> */}

              <View
                style={{
                  width: '100%',
                  // position: 'absolute',
                  alignItems: 'center',
                  // top: 70,
                }}>
                <View
                  activeOpacity={0.5}
                  style={{
                    backgroundColor: Color.white,
                    flexDirection: 'row',
                    marginVertical: 20,
                    alignItems: 'center',
                    borderRadius:
                      ProductSuggestions?.visible == true && searchProduct != ''
                        ? 20
                        : 50,
                    borderBottomLeftRadius:
                      ProductSuggestions?.visible == true && searchProduct != ''
                        ? 0
                        : 50,
                    borderBottomRightRadius:
                      ProductSuggestions?.visible == true && searchProduct != ''
                        ? 0
                        : 50,
                    width: '90%',
                    height: 50,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                  }}
                  // onPress={() => {
                  //   navigation.navigate('Search', {searchProduct: ''});
                  // }}
                >
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'search1'}
                    icon_size={20}
                    icon_color={Color.black}
                  />
                  {/* <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    marginHorizontal: 10,
                  }}
                  numberOfLines={1}>
                  {`Search Products`}
                </Text> */}
                  <TextInput
                    placeholder="Search Products"
                    value={searchProduct}
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      color: Color.cloudyGrey,
                      fontSize: 14,
                      fontFamily: Manrope.SemiBold,
                    }}
                    placeholderTextColor={Color.cloudyGrey}
                    onChangeText={search => propertySearch(search)}
                  />
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
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  padding: 10,
                }}>
                {categoryData?.slice(0, 14)?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('ProductList', {
                          category_id: item?.id,
                        });
                      }}
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        // marginHorizontal: 10,
                        width: '20%',
                        marginVertical: 10,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#E6F5F8',
                          borderRadius: 100,
                          width: 50,
                          height: 50,
                        }}>
                        <Image
                          source={{uri: item?.file}}
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: Color.white,
                          font: Manrope.SemiBold,
                          paddingVertical: 5,
                        }}
                        numberOfLines={2}>
                        {item?.category_name}
                      </Text>
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
                    width: '20%',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 100,
                        width: 50,
                        height: 50,
                      }}>
                      <Image
                        source={require('../../assets/images/viewall.png')}
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: Color.white,
                        font: Manrope.SemiBold,
                        paddingVertical: 5,
                      }}>
                      View All
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {ProductSuggestions?.visible == true && searchProduct != '' && (
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  top: 125,
                  zIndex: 1,
                }}>
                <View
                  style={{
                    width: '90%',
                    maxHeight: 200,
                    backgroundColor: Color.white,
                    padding: 10,
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}>
                  <FlatList
                    data={ProductSuggestions?.data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            getSearchData(item);
                          }}
                          style={{
                            width: '90%',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: Manrope.Medium,
                              color: Color.black,
                            }}>
                            {item?.keyword}
                          </Text>
                          {index < ProductSuggestions?.data.length - 1 && (
                            <Divider style={{height: 1, marginVertical: 5}} />
                          )}
                        </TouchableOpacity>
                      );
                    }}
                    onEndReached={() => {
                      loadSearchMoreData();
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 10,
                            width: '100%',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              padding: 5,
                              paddingHorizontal: 20,
                              marginStart: 5,
                              borderRadius: 5,
                              marginVertical: 10,
                              color: Color.primary,
                              fontFamily: Manrope.Bold,
                            }}>
                            No Data
                          </Text>
                        </View>
                      );
                    }}
                    onEndReachedThreshold={3}
                  />
                </View>
              </View>
            )}
            <Animated.SectionList
              sections={shopSection}
              scrollEnabled={false}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={1}
              nestedScrollEnabled
              initialNumToRender={5}
              renderItem={({item}) => {
                switch (item) {
                  // case 'Category Menu':
                  //   return (
                  //     <View
                  //       style={{
                  //         flexDirection: 'row',
                  //         flexWrap: 'wrap',
                  //         justifyContent: 'space-between',
                  //         alignItems: 'flex-start',
                  //         marginTop: 10,
                  //         // padding: 10,
                  //       }}>
                  //       {categoryData?.slice(0, 14)?.map((item, index) => {
                  //         return (
                  //           <TouchableOpacity
                  //             key={index}
                  //             onPress={() => {
                  //               navigation.navigate('ProductList', {
                  //                 category_id: item?.id,
                  //               });
                  //             }}
                  //             style={{
                  //               justifyContent: 'flex-start',
                  //               alignItems: 'center',
                  //               // marginHorizontal: 10,
                  //               width: '20%',
                  //               marginVertical: 10,
                  //             }}>
                  //             <View
                  //               style={{
                  //                 backgroundColor: '#E6F5F8',
                  //                 borderRadius: 100,
                  //                 width: 50,
                  //                 height: 50,
                  //               }}>
                  //               <Image
                  //                 source={{uri: item?.file}}
                  //                 style={{
                  //                   width: 50,
                  //                   height: 50,
                  //                   resizeMode: 'contain',
                  //                   borderRadius: 100,
                  //                 }}
                  //               />
                  //             </View>
                  //             <Text
                  //               style={{
                  //                 textAlign: 'center',
                  //                 fontSize: 12,
                  //                 color: Color.black,
                  //                 font: Manrope.SemiBold,
                  //                 paddingVertical: 5,
                  //               }}
                  //               numberOfLines={2}>
                  //               {item?.category_name}
                  //             </Text>
                  //           </TouchableOpacity>
                  //         );
                  //       })}
                  //       <TouchableOpacity
                  //         onPress={() => {
                  //           navigation.navigate('category');
                  //         }}
                  //         style={{
                  //           justifyContent: 'center',
                  //           alignItems: 'center',
                  //           // marginHorizontal: 10,
                  //           marginVertical: 10,
                  //           width: '20%',
                  //         }}>
                  //         <View style={{alignItems: 'center'}}>
                  //           <View
                  //             style={{
                  //               backgroundColor: '#fff',
                  //               borderRadius: 100,
                  //               width: 50,
                  //               height: 50,
                  //             }}>
                  //             <Image
                  //               source={require('../../assets/images/viewall.png')}
                  //               style={{
                  //                 width: 50,
                  //                 height: 50,
                  //                 resizeMode: 'contain',
                  //               }}
                  //             />
                  //           </View>
                  //           <Text
                  //             style={{
                  //               textAlign: 'center',
                  //               fontSize: 12,
                  //               color: Color.black,
                  //               font: Manrope.SemiBold,
                  //               paddingVertical: 5,
                  //             }}>
                  //             View All
                  //           </Text>
                  //         </View>
                  //       </TouchableOpacity>
                  //     </View>
                  //   );
                  case 'banners':
                    return (
                      <View
                        style={{
                          width: width,
                          flexDirection: 'row',
                          marginTop: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <SwiperFlatList
                          autoplay
                          autoplayDelay={5}
                          autoplayLoop
                          index={1}
                          showPagination
                          data={categorizedData?.main_banner}
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
                                source={{uri: item.file_path}}
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
                      <LinearGradient
                        style={{
                          marginTop: 20,
                          paddingStart: 10,
                        }}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#F5DE83', '#fff']}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 0,
                            marginTop: 20,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
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
                              UPTO 30% OFF
                            </Text>
                          </View>
                        </View>
                        <FlatList
                          data={categorizedData?.hot_deals_banner}
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
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  padding: 10,
                                }}
                                onPress={() => {
                                  navigation.navigate('ProductList', {
                                    category_id: 560,
                                  });
                                }}>
                                <Image
                                  source={{uri: item?.file_path}}
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
                      </LinearGradient>
                    );
                  case 'Trend Brands':
                    return (
                      <LinearGradient
                        style={{
                          paddingStart: 10,
                        }}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#F5DE83', '#fff']}>
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
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                  }}>
                                  <View
                                    style={{
                                      width: 150,
                                      height: 200,
                                      justifyContent: 'flex-end',
                                    }}>
                                    <ScrollView
                                      horizontal
                                      showsHorizontalScrollIndicator={false}
                                      contentContainerStyle={{
                                        flexDirection: 'row',
                                      }}>
                                      {item.banners.map(
                                        (single_item, index) => (
                                          <Image
                                            key={index}
                                            source={single_item.image}
                                            style={{
                                              width: 150,
                                              height: 170,
                                              borderRadius: 10,
                                              marginRight: 10,
                                            }}
                                          />
                                        ),
                                      )}
                                    </ScrollView>
                                    <ImageBackground
                                      source={item.ban_image}
                                      style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: 150,
                                        left: 0,
                                        right: 0,
                                        height: 60,
                                      }}
                                    />
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </LinearGradient>
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
                          data={categorizedData?.carousel_banner}
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
                                source={{uri: item?.file_path}}
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
                            // padding: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            {categorizedData?.offer_banner?.map(
                              (item, index) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('ProductList', {
                                        category_id: 560,
                                      });
                                    }}
                                    style={{
                                      borderRadius: 10,
                                      width: '50%',
                                    }}>
                                    <Image
                                      source={{uri: item?.file_path}}
                                      style={{
                                        height: 100,
                                        resizeMode: 'contain',
                                        marginHorizontal: 5,
                                      }}
                                    />
                                  </TouchableOpacity>
                                );
                              },
                            )}
                          </View>
                          {/* <View
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
                        </View> */}
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
                        const minutes =
                          Math.floor(difference / (1000 * 60)) % 60;
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
                            }}
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
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
                              more
                            </Text>
                            <Icon
                              name="chevron-forward-circle"
                              size={15}
                              color={Color.white}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  case 'Featured Product':
                    return (
                      FeaturedProducts?.length > 0 && (
                        <LinearGradient
                          style={{
                            paddingHorizontal: 10,
                          }}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#F99245', '#fff']}>
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
                              Featured Products
                            </Text>
                            {/* <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('viewProducts', {
                                key: 'featured',
                              });
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
                          </TouchableOpacity> */}
                          </View>
                          <FlatList
                            data={FeaturedVisibleData}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => {
                              return (
                                <ItemCard item={item} navigation={navigation} />
                              );
                            }}
                            onEndReached={() => {
                              featuredLoadMoreData();
                            }}
                            onEndReachedThreshold={3}
                          />
                          {FeaturedShowLoadMore && (
                            <TouchableOpacity
                              onPress={() => {
                                loadFeaturedMoreItems();
                              }}
                              style={{
                                padding: 5,
                                flexDirection: 'row',
                                backgroundColor: Color.transparentWhite,
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontFamily: Manrope.Bold,
                                  color: Color.primary,
                                  marginHorizontal: 5,
                                  textAlign: 'center',
                                }}>
                                More
                              </Text>
                              <Icon
                                name="chevron-forward-circle"
                                size={18}
                                color={Color.primary}
                                style={{marginTop: 5}}
                              />
                            </TouchableOpacity>
                          )}
                        </LinearGradient>
                      )
                    );
                  case 'Latest Product':
                    return (
                      latestProducts?.length > 0 && (
                        <View
                          style={{
                            paddingStart: 10,
                            backgroundColor: '#CBC3E350',
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
                          </View>
                          <FlatList
                            data={latestProducts}
                            numColumns={2}
                            renderItem={({item, index}) => {
                              return (
                                <ItemCard item={item} navigation={navigation} />
                              );
                            }}
                            onEndReachedThreshold={3}
                            onEndReached={() => {
                              latestLoadMoreData();
                            }}
                            ListFooterComponent={() => {
                              return (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  {latestloadMore && (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: Color.black,
                                          marginHorizontal: 10,
                                          fontFamily: Manrope.Medium,
                                        }}>
                                        Loading...
                                      </Text>
                                      <ActivityIndicator />
                                    </View>
                                  )}
                                </View>
                              );
                            }}
                          />
                        </View>
                      )
                    );
                }
              }}
            />
          </ScrollView>
          <Modal transparent={true} animationType="fade" visible={imageVisible}>
            <View style={{backgroundColor: Color.transparantBlack, flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 130,
                    right: 20,
                    zIndex: 1,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setImageVisible(false);
                    }}>
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'closecircleo'}
                      icon_size={35}
                      icon_color={Color.white}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductList', {
                      category_id: 560,
                    });
                    setImageVisible(false);
                  }}>
                  <Image
                    source={Media.popup}
                    style={{
                      width: 250,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 250,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <PostCompletedModal navigation={navigation} />
        </>
      )}
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
