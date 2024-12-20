import React, { useState, useEffect, useCallback } from 'react';
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
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ActivityIndicator, Badge, Button, Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import CountdownTimer from '../../Components/CountdownTimer';
import ItemCard, { ItemCardHorizontal } from '../../Components/ItemCard';
import * as ImagePicker from 'react-native-image-picker';
import { Media } from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDataCount, setUserData } from '../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import common_fn from '../../Config/common_fn';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import PostCompletedModal from '../Cart/OrderCompletionModal';
import VoiceSearch from '../../Components/VoiceSearch';
import LinearGradient from 'react-native-linear-gradient';
import ProfileModal from '../../Components/ProfileModal';
import { G } from 'react-native-svg';

LogBox.ignoreAllLogs();
const { width } = Dimensions.get('window');

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

  const { token } = userData;
  console.log("Token -------------------- : ", token);
  const [imageVisible, setImageVisible] = useState(true);
  const [profileVisible, setProfileVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [latestProducts, setLatestProduct] = useState([]);
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [FeaturedloadMore, setFeaturedLoadMore] = useState(false);
  const [FeaturedPage, setFeaturedPage] = useState(1);
  const [FeaturedendReached, setFeaturedEndReached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [FeaturedShowLoadMore, setFeaturedShowLoadMore] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  const dataCount = useSelector(state => state.UserReducer.count);
  var { wishlist, cart } = dataCount;
  const [notificationData, setNotificationData] = useState(0)
  // console.log("countryCode *********************** : ", countryCode?.country);

  // const [currentCountry, setCurrentCountry] = useState('');
  // const [countryImage, setCountryImage] = useState('');


  const [bannerData, setBannerData] = useState([]);
  const [profileData, setProfileData] = useState({});
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
    {
      id: 4,
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
    { id: 1, title: 'Category Menu', data: ['Category Menu'] },
    { id: 2, title: 'banners', data: ['banners'] },
    { id: 3, title: 'hot deals', data: ['hot deals'] },
    { id: 4, title: 'Trend Brands', data: ['Trend Brands'] },
    { id: 5, title: 'Trend Product', data: ['Trend Product'] },
    { id: 6, title: 'Offer Banner', data: ['Offer Banner'] },
    { id: 7, title: 'Flash Selling', data: ['Flash Selling'] },
    { id: 8, title: 'product', data: ['product'] },
    { id: 9, title: 'Featured Product', data: ['Featured Product'] },
    { id: 10, title: 'Latest Product', data: ['Latest Product'] },
  ]);

  // useEffect(() => {
  //   currentGeolocation();
  // }, [currentCity]);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.DeviceEventManagerModule,
    );
    const subscription = eventEmitter.addListener(
      'OPEN_PRODUCT_DETAILS',
      event => {
        const { product_id } = event;
        if (product_id) {
          navigation.navigate('ProductDetails', { id: product_id });
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      getNotification();
    }, 3000);
  }, [token]);

  const getNotification = async () => {
    try {
      const notification_list = await fetchData.notification(null, token);
      // console.log('notification_list ************************** 111', notification_list?.data.length);
      if (notification_list) {
        setNotificationData(notification_list?.data?.length);

        // Calculate unread notifications
        const unread = notification_list?.data.filter(item => !item.read_at).length;
        setNotificationData(unread);
      }
      else {
        setNotificationData([]);
        console.log('Else in getNotification: ', error);
      }
    } catch (error) {
      console.log('catch in get_Notification: ', error);
    }
  }


  // const getNotification = useCallback(async () => {
  //   try {
  //     const notification_list = await fetchData.notification(null, token);
  //     console.log('notification_list ************************** 111', notification_list?.data.length);
  //     if (notification_list) {
  //       setNotificationData(notification_list?.data?.length);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }, [token]);

  // const currentGeolocation = async () => {
  //   const locPermissionDenied = await common_fn.locationPermission();
  //   if (locPermissionDenied) {
  //     const timeoutId = setTimeout(() => {
  //       console.error('Location request timed out');
  //     }, 10000);

  //     Geolocation.getCurrentPosition(
  //       async position => {
  //         clearTimeout(timeoutId);
  //         const { latitude, longitude } = position.coords;

  //         try {
  //           const locationPublish = `${latitude},${longitude}`; //PUBLISH
  //           const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=AIzaSyCpCJVGt4r1JHIrkRPHDgA0q6RCppCmE3s`;
  //           fetch(url)
  //             .then((response) => response.json())  // Parse the JSON from the response
  //             .then((data) => {
  //               if (data.results && data.results.length > 0) {
  //                 // Loop through address components to find the city
  //                 const addressComponents = data.results[0].address_components;
  //                 let city = "";
  //                 addressComponents.forEach((component) => {
  //                   if (component.types.includes("locality")) {
  //                     city = component.long_name;
  //                   }
  //                 });

  //                 if (city) {
  //                   console.log("City Name: =====================", city);
  //                   setCurrentCity(city);
  //                 } else {
  //                   console.log("------------ City not found ------------");
  //                 }
  //               } else {
  //                 console.log("-------------- No results found -----------");
  //               }
  //             })
  //             .catch((e) => {
  //               console.log("Error: ", e);
  //             });

  //           // const response = await axios.get(
  //           //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //           // );
  //           // const address = response?.data?.address;
  //           // if (address) {
  //           //   const city = `${address?.city ?? address?.suburb},${address?.country_code
  //           //     }`;
  //           //   setCurrentCity(city);
  //           // }
  //         } catch (error) {
  //           console.error('Error fetching city:', error);
  //         }
  //       },
  //       error => {
  //         clearTimeout(timeoutId); // Clear the timeout on error
  //         console.error('Error getting location:', error);
  //       },
  //     );
  //   }
  //   else {
  //     console.error('Location Permission Neede');
  //   }
  // };

  // const currentGeolocation = async () => {
  //   const locPermissionDenied = await common_fn.locationPermission();
  //   if (locPermissionDenied) {
  //     const timeoutId = setTimeout(() => {
  //       console.error('Location request timed out');
  //     }, 10000);

  //     Geolocation.getCurrentPosition(
  //       async position => {
  //         try {
  //           const { latitude, longitude } = position.coords;
  //           console.log("latitude ===============:", latitude);
  //           // API call to reverse geocode
  //           const response = await axios.get(
  //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //           );

  //           console.log("Full Address Response ===============:", response.data);

  //           const address = response.data?.address;
  //           if (address) {
  //             // Check multiple possible fields for city-like information
  //             const city = address.city || address.town || address.village || address.municipality || address.suburb;
  //             const countryCode = address.country_code || '';
  //             const formattedCity = city ? `${city}, ${countryCode}` : 'Location not found';

  //             console.log("Current City:", formattedCity);
  //             setCurrentCity(formattedCity);
  //           }
  //         } catch (error) {
  //           console.error('Error fetching city:', error);
  //         }
  //       },
  //       error => {
  //         console.error('Error getting location:', error);
  //       }
  //     );


  //   }
  // };

  // const currentGeolocation = async () => {
  //   try {
  //     const locPermissionGranted = await common_fn.locationPermission(); // Check if permission is granted
  //     if (locPermissionGranted === 'granted') { // Only proceed if permission is granted
  //       const timeoutId = setTimeout(() => {
  //         console.error('Location request timed out');
  //       }, 10000);

  //       Geolocation.getCurrentPosition(
  //         async position => {
  //           clearTimeout(timeoutId); // Clear timeout when position is received
  //           const { latitude, longitude } = position.coords;
  //           // console.log("latitude ------------- : ", latitude + "    longitude ------------- : ", longitude);
  //           try {
  //             // const response = await axios.get(
  //             //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //             // );

  //             // GOOGLE API KEYS
  //             // AIzaSyAa_wlLYoGavSgqqmIUjSKarZ8kudhZZr8
  //             // AIzaSyCpCJVGt4r1JHIrkRPHDgA0q6RCppCmE3s

  //             const response = await axios.get(
  //               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCpCJVGt4r1JHIrkRPHDgA0q6RCppCmE3s`
  //             );
  //             const address = response?.data?.results[0]?.formatted_address;
  //             // const address = response?.data?.address;

  //             let locationData = { door: "", locality: "", city: "", region: "", country: "" };

  //             let result = address.split(",")
  //             locationData.city = result[3];
  //             locationData.region = result[4];
  //             locationData.country = result[5];
  //             setCurrentCity(locationData.city); // Update the city state
  //             // data = address.split(',')
  //             // city = data[0].match(/^\w+/g)

  //             // res = {
  //             //   'city': city[1],
  //             //   'region': data[4],
  //             //   'country': data[5]
  //             // }
  //             console.log("******************", locationData.city);  // Outputs: "Coimbatore"

  //             // function extractCity(address) {
  //             //   // Split the address into parts by commas
  //             //   const parts = address.split(',');

  //             //   // Find the city (generally the second to last element before the state)
  //             //   const city = parts.find((part) => part.trim().match(/Tamil Nadu/i) === null && part.trim().match(/\d{6}/) === null && part.trim().match(/India/i) === null);

  //             //   return city.trim();  // Return the city name after trimming extra spaces
  //             // }

  //             // const cityName = extractCity(address);


  //             // if (address) {
  //             //   const city = `${address?.city ?? address?.suburb}, ${address?.country_code}`;

  //             //   setCurrentCity(city); // Update the city state
  //             // }
  //           } catch (error) {
  //             console.error('Error fetching city:', error);
  //           }
  //         },
  //         error => {
  //           clearTimeout(timeoutId); // Clear the timeout on error
  //           console.error('Error getting location:', error.message); // Use error.message for better error info
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } // Location options
  //       );
  //     } else {
  //       console.error('Location Permission Needed');
  //     }
  //   } catch (error) {
  //     console.log("catch in currentGeolocation_HomeScreen : ", error);

  //   }
  // };


  useEffect(() => {
    setLoading(true);
    getUserData();
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    getFlashDeals();
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      // console.log("value ///////////////////", value);
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }

    } catch (error) {
      console.log('catch in getUser_Data_HomeScreen :', error);
    }
  };

  const getFlashDeals = async () => {
    try {
      const getFlashDeals = await fetchData.flash_Offers(``, token);
      setFlashOffers(getFlashDeals?.data);
      var data = `project=offer&region_id=${countryCode?.id}`;
      const get_products = await fetchData.list_products(data, token);
      console.log("flash -------------------- : ", get_products?.data);

      setProducts(get_products?.data);
      setShowLoadMore(true);
    } catch (error) {
      console.log('catch in getFlash_Deals_HomeScreen :', error);
    }
  };

  const getData = async () => {
    try {
      const categories_data = await fetchData.categories(`?limit=14`, token);
      console.log("CATEGORY =================== :", categories_data);
      setCategoryData(categories_data?.data);

      const trending_products = await fetchData.list_products(
        `is_trending=1&region_id=${countryCode?.id}`,
        token,
      );
      console.log("Trending =================== :", trending_products?.data);
      setTrendingProducts(trending_products?.data);

      const latest_products = await fetchData.list_products(
        `region_id=${countryCode?.id}`,
        token,
      );
      console.log("Latest =================== :", latest_products?.data);
      setLatestProduct(latest_products?.data);

      const fetured_products = await fetchData.list_products(
        `is_featured=1&region_id=${countryCode?.id}`,
        token,
      );
      // console.log("Featured =================== :", fetured_products?.data);
      setFeaturedProducts(fetured_products?.data);
      setFeaturedShowLoadMore(true);

      //banner
      var banner_data = `seller=home_page`;
      const getBannerData = await fetchData.get_banner(banner_data, null);
      // console.log("Banner =================== :", getBannerData?.data)
      setBannerData(getBannerData?.data);
      //profile

      const profile = await fetchData.profile_data(``, token);
      console.log("Profile =================== :", profile?.data)
      setProfileData(profile.data);

    } catch (error) {
      console.log('catch in get_Data_HomeScreen :', error.response ? error.response.data : error.message);

      // if (error.response?.data?.message === "Token expired or Unauthorized") {
      //   const newToken = userData?.token;
      //   if (newToken) {
      //     // Retry getData with the new token
      //     return await getData();
      //   } else {
      //     console.log('Failed to refresh token, redirecting to login.');
      //   }
      // } else {
      //   console.log('catch in get_Data_HomeScreen :', error.response?.data || error.message);
      // }

    }
  };

  useEffect(() => {
    getCountData();
  }, [token, userData]);

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
      console.log('catch in getCount_Data :', error);
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
    try {
      setVoiceSearchQuery(query);
      propertySearch(query);
    } catch (error) {
      console.log("catch in handleVoiceSearch : ", error);
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

  const loadMoreData = async () => {
    if (loadMore || endReached) return;
    setLoadMore(true);

    try {
      const nextPage = Page + 1;
      var data = `project=offer&page=${nextPage}&region_id=${countryCode?.id}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...products, ...response?.data];
        setProducts(updatedData);
        setShowLoadMore(true);
      } else {
        setEndReached(true);
        setShowLoadMore(false);
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
      var data = `is_featured=1&page=${nextPage}&region_id=${countryCode?.id}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setFeaturedPage(nextPage);
        const updatedData = [...FeaturedProducts, ...response?.data];
        setFeaturedProducts(updatedData);
        setFeaturedShowLoadMore(true);
      } else {
        setFeaturedEndReached(true);
        setFeaturedShowLoadMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFeaturedLoadMore(false);
    }
  };

  const latestLoadMoreData = async () => {
    try {
      if (latestloadMore || latestendReached) {
        return;
      }
      setlatestloadMore(true);
      try {
        const nextPage = latestPage + 1;
        var data = `page=${nextPage}&region_id=${countryCode?.id}`;
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
        console.log('error');
      }
    } catch (error) {
      console.log("catch in latestLoad_MoreData : ", error);
    }
  };

  const [searchProduct, setSearchProduct] = useState('');
  const [selectData, setSelectData] = useState({});
  const [searchloadMore, setSearchLoadMore] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchendReached, setSearchEndReached] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [ProductSuggestions, setProductSuggestions] = useState({
    data: [],
    visible: false,
  });

  const propertySearch = async input => {
    try {

      setSearchProduct(input);
      setSearchLoader(true);
      const data = `filter=${input}`;
      // const data = `filter=${input}&page=1&limit=10`;
      // console.log("TYPING DATA----------- :", data);
      // const getData = await fetchData.search(data, token);
      // // console.log("getData search ---------------- : ", getData);
      // if (getData?.status === true) {
      //   // const fetured_products = await fetchData.list_products(
      //   //   `is_featured=1&region_id=${countryCode?.id}`,
      //   //   token,
      //   // );

      //   setProductSuggestions({
      //     data: getData?.data || [],
      //     visible: true,
      //   });

      // } else {
      //   setProductSuggestions({
      //     data: [],
      //     visible: true,
      //   });
      // }



      const fetchPromise = fetchData.search(data, token);

      // Set a timeout of 5 seconds (5000 ms)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 3000)
      );

      const getData = await Promise.race([fetchPromise, timeoutPromise]);

      if (getData?.status === true) {
        setProductSuggestions({
          data: getData?.data || [],
          visible: true,
        });
      } else {
        setProductSuggestions({
          data: [],
          visible: true,
        });
      }
      setSearchLoader(false);
    } catch (error) {
      setSearchLoader(false);
      console.log('catch in propertySearch :', error);
    }
  };

  const loadSearchMoreData = async () => {
    if (searchloadMore || searchendReached) {
      return;
    }
    setSearchLoadMore(true);
    try {
      const nextPage = searchPage + 1;
      var data = `filter=${searchProduct?.name}&page=${nextPage}&limit=10`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setSearchPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data,
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
        searchProduct: item,
        selectData: item,
      });
      setSearchProduct('');
      setSelectData({});
    } catch (error) {
      console.log('catch in getSearch_Data :', error);
    }
  };

  useEffect(() => {
    const checkAsyncStorage = async (key, condition, setter) => {
      const item = await AsyncStorage.getItem(key);
      if (!item && condition) {
        setter(true);
        await AsyncStorage.setItem(key, 'true');
      }
    };

    const modalCondition = token !== undefined;
    const profileCondition =
      token !== undefined &&
      (!profileData.first_name ||
        !profileData.last_name ||
        !profileData.email ||
        !profileData.mobile);

    const checkConditions = async () => {
      await checkAsyncStorage('modalShown', modalCondition, setImageVisible);
      await checkAsyncStorage(
        'profileShown',
        profileCondition,
        setProfileVisible,
      );
    };

    checkConditions();
  }, [token, profileData]);

  const gradiantColors = ['#0D71BA', '#2994CB', '#0D71BA'];

  return (
    <SafeAreaView style={styles.container}>
      {/* <LinearGradient
        style={
          {
            // height: StatusBar.currentHeight,
          }
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={gradiantColors}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle={'light-content'}
        translucent
      /> */}
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
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      )}
      {loading ? (
        <View
          style={{ marginHorizontal: 10, backgroundColor: Color.white, flex: 1 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
                style={{ alignItems: 'center', mediaType: 10 }}>
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
          {/* <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled> */}
          <LinearGradient
            style={
              {
                // height: 120,
              }
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
                  alignItems: 'center', paddingHorizontal: 10
                }}>
                {/* <Iconviewcomponent
                  Icontag={'Octicons'}
                  iconname={'location'}
                  icon_size={20}
                  icon_color={Color.white}
                /> */}
                <Image
                  source={{ uri: countryCode?.country_image }}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.white,
                    paddingHorizontal: 5,
                    textTransform: 'capitalize',
                    fontFamily: Manrope.SemiBold, letterSpacing: 0.5
                  }}>
                  {countryCode?.country}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.navigate('notification')}>
                  {notificationData.length > 0 ? null :
                    <View style={{ position: 'absolute', zIndex: 999, top: -5, right: -5 }}>
                      <Badge
                        badgeStyle={{
                          position: 'absolute',
                          zIndex: 999,
                          backgroundColor: Color.red,
                          color: Color.white,
                          fontFamily: Manrope.Bold,
                          fontSize: 12,
                        }} maxLength={3} >
                        {notificationData}
                      </Badge>
                    </View>}
                  <Feather name="bell" size={24} color={Color.white} style={{ top: 0 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() => navigation.navigate('MyRewards')}>
                  <Iconviewcomponent
                    Icontag={'FontAwesome5'}
                    iconname={'award'}
                    icon_size={24}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
              </View>
            </View>
            {/* </View> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={{ uri: Media.main_white_logo }}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'cover',
                }}
              />
              <View
                activeOpacity={0.5}
                style={{
                  backgroundColor: Color.white,
                  flexDirection: 'row',
                  marginVertical: 10,
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
                  width: '70%',
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
          </LinearGradient>
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
                    <LinearGradient
                      style={{
                        // height: 480,
                        // backgroundColor: Color.primary,
                        marginBottom: 10,
                      }}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#0D71BA', '#2994CB', '#0D71BA']}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginTop: 10,
                          paddingVertical: 10,
                          paddingHorizontal: 5,
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
                                  source={{ uri: item?.file }}
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
                          <View style={{ alignItems: 'center' }}>
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
                  );
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
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('ProductList', {
                                category_id: 560,
                              });
                            }}>
                            <Image
                              source={{ uri: item.file_path }}
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
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#fff', '#fff']}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
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
                        renderItem={({ item, index }) => {
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
                                source={{ uri: item?.file_path }}
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
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#fff', '#fff']}>
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
                                    {item.banners.map((single_item, index) => (
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
                                    ))}
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
                          renderItem={({ item, index }) => {
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
                        renderItem={({ item }) => (
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
                              source={{ uri: item?.file_path }}
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
                          {categorizedData?.offer_banner?.map((item, index) => {
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
                                  source={{ uri: item?.file_path }}
                                  style={{
                                    height: 100,
                                    resizeMode: 'contain',
                                    marginHorizontal: 5,
                                  }}
                                />
                              </TouchableOpacity>
                            );
                          })}
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
                              source={{ uri: item.logo }}
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
                    <View>
                      {products?.length > 0 && (
                        <>
                          <Image
                            source={{ uri: Media.flash_ban }}
                            style={{ width: Dimensions.get('window').width, height: 70 }}
                          />
                          <LinearGradient
                            style={{
                              marginBottom: 10,
                              padding: 10,
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#FF0066', '#fff']}>
                            <FlatList
                              data={products}
                              numColumns={2}
                              showsVerticalScrollIndicator={false}
                              renderItem={({ item, index }) => {
                                return (
                                  <ItemCard item={item} navigation={navigation} />
                                );
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
                            {showLoadMore && (
                              <TouchableOpacity
                                onPress={() => {
                                  loadMoreData();
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
                                    color: Color.white,
                                    marginHorizontal: 5,
                                    textDecorationLine: 'underline',
                                    textAlign: 'center',
                                  }}>
                                  More
                                </Text>
                                <Icon
                                  name="chevron-forward-circle"
                                  size={15}
                                  color={Color.white}
                                  style={{ marginTop: 5 }}
                                />
                              </TouchableOpacity>
                            )}
                          </LinearGradient>
                        </>
                      )}
                    </View>
                  );
                case 'Featured Product':
                  return (
                    <View>
                      <Image
                        source={{ uri: Media.featured_ban }}
                        style={{ width: Dimensions.get('window').width, height: 70 }}
                      />
                      {FeaturedProducts?.length > 0 && (
                        <LinearGradient
                          style={{
                            paddingHorizontal: 10,
                          }}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#0D71BA', '#2994CB', '#fff']}>
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 10,
                            }}>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 16,
                                color: Color.white,
                                fontFamily: Manrope.SemiBold,
                              }}>
                              Featured Products
                            </Text>
                            <TouchableOpacity
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
                          </TouchableOpacity>
                          </View> */}
                          <FlatList
                            data={FeaturedProducts}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                              // console.log("item ==============", item);

                              return (
                                <ItemCard item={item} navigation={navigation} />
                              );
                            }}
                          />
                          {FeaturedShowLoadMore && (
                            <TouchableOpacity
                              onPress={() => {
                                featuredLoadMoreData();
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
                                  color: Color.white,
                                  marginHorizontal: 5,
                                  textAlign: 'center',
                                }}>
                                More
                              </Text>
                              <Icon
                                name="chevron-forward-circle"
                                size={18}
                                color={Color.white}
                                style={{ marginTop: 5 }}
                              />
                            </TouchableOpacity>
                          )}
                        </LinearGradient>
                      )}
                    </View>
                  );
                case 'Latest Product':
                  return (
                    latestProducts?.length > 0 && (
                      <View style={{ marginTop: 1 }}>
                        <Image
                          source={{ uri: Media.latest_ban }}
                          style={{ width: Dimensions.get('window').width, height: 70 }}
                        />
                        <LinearGradient
                          style={{
                            paddingBottom: 10,
                            paddingHorizontal: 10
                          }}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#840BB0', '#fff']}>
                          <FlatList
                            data={latestProducts}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                              return (
                                <ItemCard item={item} navigation={navigation} />
                              );
                            }}
                            onEndReached={() => {
                              latestLoadMoreData();
                            }}
                            onEndReachedThreshold={0.1}
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
                          {/* <TouchableOpacity
                              onPress={() => {
                                latestLoadMoreData();
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
                                  color: Color.white,
                                  marginHorizontal: 5,
                                  textAlign: 'center',
                                }}>
                                More
                              </Text>
                              <Icon
                                name="chevron-forward-circle"
                                size={18}
                                color={Color.white}
                                style={{marginTop: 5}}
                              />
                            </TouchableOpacity> */}
                        </LinearGradient>
                      </View>
                    )
                  );
              }
            }}
          />
          {/* </ScrollView> */}
          {ProductSuggestions?.visible == true && searchProduct != '' && (
            <View
              style={{
                width: '100%',
                position: 'absolute',
                alignItems: 'center',
                top: 115,
                zIndex: 1, right: 10
              }}>
              <View
                style={{
                  width: '90%',
                  maxHeight: 250,
                  backgroundColor: Color.white,
                  padding: 10,
                  marginTop: 5,
                  borderWidth: 1, right: -10,
                  borderColor: Color.lightgrey,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                {/* {searchLoader ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator />
                  </View>
                ) : ( */}
                <ScrollView showsVerticalScrollIndicator={false}>
                  <FlatList
                    data={ProductSuggestions?.data}
                    scrollEnabled
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {
                      // console.log("item------------ :", item);

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
                              color: Color.black, paddingVertical: 5
                            }}>
                            {item?.name}
                          </Text>
                          {index < ProductSuggestions?.data.length - 1 && (
                            <Divider style={{ height: 1, marginVertical: 5 }} />
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
                </ScrollView>
                {/* )} */}
              </View>
            </View>
          )}

          {/* <Modal transparent={true} animationType="fade" visible={imageVisible}>
            <View style={{ backgroundColor: Color.transparantBlack, flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View  style={{
                      position: 'absolute',
                      top: scr_height * 0.35,
                      right: 40,
                      zIndex: 1,
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                  <TouchableOpacity
                    onPress={() => {
                      setImageVisible(false);
                    }}
                   >
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
          </Modal> */}

          {(profileData.first_name != null || profileData.mobile != null)
            ? null :
            <ProfileModal
              profileVisible={profileVisible}
              setProfileVisible={setProfileVisible}
            />
          }
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
  child: { width: Dimensions.get('window').width, justifyContent: 'center' },
  text: { fontSize: 14, textAlign: 'center' },
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
