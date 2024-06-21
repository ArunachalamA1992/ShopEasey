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
  Pressable,
  Modal,
} from 'react-native';
import Color from '../../Global/Color';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {categoryData, products} from '../../Config/Content';
import {Badge, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import CountdownTimer from '../../Components/CountdownTimer';
import ItemCard from '../../Components/ItemCard';
import * as ImagePicker from 'react-native-image-picker';
import {Media} from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import common_fn from '../../Config/common_fn';
import axios from 'axios';

LogBox.ignoreAllLogs();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [currentCity, setCurrentCity] = useState('');
  const [height, setHeight] = useState(undefined);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [imageVisible, setImageVisible] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

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
      ban_image: require('../../assets/images/onboard_shop.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/kutties.png'),
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
    {id: 4, title: 'Trend Product', data: ['Trend Product']},
    {id: 5, title: 'Offer Banner', data: ['Offer Banner']},
    {id: 6, title: 'Flash Selling', data: ['Flash Selling']},
    {id: 6, title: 'product', data: ['product']},
  ]);

  const [visibleData, setVisibleData] = useState(products?.slice(0, 4));
  const [showLoadMore, setShowLoadMore] = useState(products.length > 4);

  const loadMoreItems = () => {
    const newVisibleData = products?.slice(0, visibleData.length + 8);
    setVisibleData(newVisibleData);
    setShowLoadMore(newVisibleData.length < products.length);
  };

  useEffect(() => {
    currentGeolocation();
  }, [currentCity, token]);

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
              const city = `${address?.city},${address?.country_code}`;

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

  const [responseCamera, setResponseCamera] = React.useState([]);

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
            setResponseCamera(response?.assets);
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
    getData();
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

  const getData = async () => {
    try {
      const categories_data = await fetchData.categories(``, token);
      setCategoryData(categories_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'dark-content'} />
      <View
        style={{
          height: 80,
          backgroundColor: Color.primary,
          marginBottom: 30,
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: Color.primary,
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
                  Icontag={'Fontisto'}
                  iconname={'map-marker-alt'}
                  icon_size={25}
                  icon_color={Color.white}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.white,
                    marginHorizontal: 10,
                    textTransform: 'capitalize',
                    fontFamily: Manrope.Bold,
                  }}>
                  {currentCity}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => {}}>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'notifications-outline'}
                icon_size={26}
                icon_color={Color.white}
                iconstyle={{marginTop: 0}}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 10}}>
              <AntDesign name="hearto" size={22} color={Color.white} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 10}}>
              <Badge
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: -10,
                  right: -10,
                  backgroundColor: Color.red,
                  color: Color.white,
                  fontFamily: Manrope.Bold,
                }}>
                {0}
              </Badge>
              <Feather name="shopping-cart" size={22} color={Color.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
            top: 40,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: Color.white,
              flexDirection: 'row',
              marginVertical: 20,
              alignItems: 'center',
              borderRadius: 10,
              width: '90%',
              height: 55,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: Color.lightgrey,
            }}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'search1'}
              icon_size={25}
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
              {`Search products`}
            </Text>
            <MCIcon
              color={Color.lightBlack}
              name="microphone"
              size={25}
              style={{
                marginHorizontal: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                openCameraWithPermission();
              }}>
              <MCIcon
                color={Color.lightBlack}
                name="camera-outline"
                size={25}
                style={{
                  marginHorizontal: 5,
                }}
              />
            </TouchableOpacity>
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
                    marginVertical: 20,
                  }}>
                  {categoryData?.slice(0, 7)?.map((item, index) => {
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
                          marginHorizontal: 10,
                          marginVertical: 10,
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <View
                            style={{
                              backgroundColor: '#E6F5F8',
                              borderRadius: 100,
                              width: 60,
                              height: 60,
                            }}>
                            <Image
                              source={{uri: item?.file}}
                              style={{
                                width: 60,
                                height: 60,
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
                            }}>
                            {item?.category_name.substring(0, 10).concat('...')}
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
                      marginHorizontal: 10,
                      marginVertical: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: '#E6F5F8',
                          borderRadius: 100,
                          width: 60,
                          height: 60,
                        }}>
                        <Image
                          source={require('../../assets/images/viewall.png')}
                          style={{
                            width: 60,
                            height: 60,
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
                    flexDirection: 'row',
                    marginVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={1}
                    autoplayLoop
                    index={1}
                    showPagination
                    data={bannerData}
                    paginationActiveColor={Color.primary}
                    paginationStyleItem={{
                      width: 15,
                      height: 3,
                      marginTop: 35,
                      marginHorizontal: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    renderItem={({item}) => (
                      <View
                        style={{
                          margin: 5,
                        }}>
                        <Image
                          source={{uri: item.ban_image}}
                          style={{
                            width: scr_width - 50,
                            height: 130,
                            borderRadius: 10,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
              );
            case 'hot deals':
              return (
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 0,
                      marginTop: 20,
                    }}>
                    <Image
                      source={{uri: Media.hot_deal_image}}
                      style={{width: 100, height: 30, resizeMode: 'contain'}}
                    />
                    <View
                      style={{
                        padding: 5,
                        paddingHorizontal: 10,
                        marginHorizontal: 10,
                        backgroundColor: Color.white,
                        borderColor: '#0FAD45',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#0FAD45',
                          fontFamily: Manrope.Bold,
                          letterSpacing: 0.5,
                        }}>
                        UPTO 70% OFF
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '95%'}}>
                    <FlatList
                      data={hotDealsData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 10,
                              marginVertical: 10,
                            }}>
                            <Image
                              source={{uri: item?.image}}
                              style={{
                                width: 180,
                                height: 120,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            case 'Trend Product':
              return (
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        textAlign: 'justify',
                        lineHeight: 25,
                        fontFamily: Manrope.Bold,
                      }}>
                      Trending Products
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProductList')}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          textAlign: 'right',
                          fontFamily: Manrope.Bold,
                        }}>
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {trendData.map((item, index) => {
                        // console.log("lsdglksdklgkl  ", calculateTotalDiscountPercentage(
                        //   item?.ban_name,
                        // ));
                        return (
                          <View
                            style={{
                              width: 150,
                              height: 170,
                              justifyContent: 'center',
                              alignItems: 'center',
                              // borderTopStartRadius: 10,
                              // borderTopRightRadius: 10,
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
                            {calculateTotalDiscountPercentage(item?.ban_name) !=
                            0 ? (
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
                                // borderBottomStartRadius: 10,
                                // borderBottomRightRadius: 10,
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
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              );
            case 'Offer Banner':
              return (
                <View
                  style={{
                    width: scr_width,
                    backgroundColor: Color.white,
                  }}>
                  {/* <FlatList
                    data={OfferBanner}
                    horizontal
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{ width: scr_width, flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={{ uri: item?.category_image }}
                            style={{
                              width: '100%',
                              height: 420,
                              resizeMode: 'cover',
                            }}
                          />
                        </View>
                      );
                    }}
                  /> */}
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={5}
                    autoplayLoop
                    index={1}
                    showPagination
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
                      <View
                        style={{
                          width: scr_width,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item?.category_image}}
                          style={{
                            width: '100%',
                            height: 420,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    )}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      backgroundColor: '#F4466E',
                      padding: 10,
                      top: -10,
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
                      width: '95%',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#E6F5F860',
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{uri: Media.flash_sell_ban_one}}
                        style={{
                          height: 100,
                          resizeMode: 'contain',
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                      />
                      <Image
                        source={{uri: Media.flash_sell_ban_two}}
                        style={{
                          height: 100,
                          resizeMode: 'contain',
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
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
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#0FAD45',
                            fontFamily: Manrope.Medium,
                            letterSpacing: 0.5,
                            paddingHorizontal: 2,
                          }}>
                          Live offer
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Manrope.Bold,
                            letterSpacing: 0.5,
                            paddingHorizontal: 2,
                          }}>
                          30% OFF
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.lightBlack,
                            fontFamily: Manrope.Medium,
                            letterSpacing: 0.5,
                            paddingHorizontal: 2,
                          }}>
                          Min spent 2000$ of cart value
                        </Text>
                      </View>
                      <Button
                        mode="contained"
                        onPress={() => {}}
                        style={{
                          backgroundColor: Color.primary,
                          borderRadius: 5,
                        }}
                        textColor={Color.white}>
                        Claim
                      </Button>
                    </View>
                  </View>
                </View>
              );
            case 'Flash Selling':
              return (
                <View
                  style={{
                    width: '95%',
                    alignItems: 'center',
                    backgroundColor: Color.white,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: Media.flash_sell_image}}
                      style={{
                        width: 100,
                        height: 60,
                        resizeMode: 'contain',
                      }}
                    />
                    <CountdownTimer
                      days={0}
                      hours={1}
                      minutes={5}
                      seconds={1}
                    />
                  </View>
                </View>
              );
            case 'product':
              return (
                <View
                  style={{
                    width: '95%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: Color.white,
                    marginBottom: 10,
                  }}>
                  <FlatList
                    data={visibleData}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return <ItemCard item={item} navigation={navigation} />;
                    }}
                    style={{width: '100%'}}
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
          }
        }}
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
