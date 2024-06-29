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
  LogBox,
  StatusBar,
  FlatList,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';
import CountdownTimer, {
  SellerCountdownTimer,
} from '../../Components/CountdownTimer';
import {scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation, useRoute} from '@react-navigation/native';
import {products} from '../../Config/Content';
import ItemCard, {ItemCardHorizontal} from '../../Components/ItemCard';
import {TextStroke} from '../../Utils/TextStroke';
import moment from 'moment';
import {useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';

LogBox.ignoreAllLogs();

const SellerProfile = ({route}) => {
  const navigation = useNavigation();
  const [vendor_id] = useState(route.params.vendor_id);
  const [sellerData, setSellerData] = useState({});
  const [topPicks, setTopPicks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [FlashOffers, setFlashOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [defaultRating, setDefaultRating] = useState(sellerData?.rating);

  const [shopSection] = useState([
    {id: 1, title: 'Profile', data: ['Profile']},
    {id: 2, title: 'About', data: ['About']},
    {id: 3, title: 'Shop Categories', data: ['Shop Categories']},
    {id: 4, title: 'OfferBanner', data: ['OfferBanner']},
    {id: 5, title: 'Top Picks', data: ['Top Picks']},
    {id: 6, title: 'Offer Coupon', data: ['Offer Coupon']},
    {id: 7, title: 'New Arrival', data: ['New Arrival']},
    {id: 8, title: 'flash deals', data: ['flash deals']},
    {id: 9, title: 'Steel deals', data: ['Steel deals']},
  ]);

  const [steelData, setSteelData] = useState([
    {
      steel_id: 1,
      steel_name: 'Tshirts',
      steel_under: 'UNDER',
      steel_price: '249',
      steel_image: require('../../assets/category/steel_one.png'),
    },
    {
      steel_id: 1,
      steel_name: 'Headphones',
      steel_under: 'FROM',
      steel_price: '599',
      steel_image: require('../../assets/category/steel_two.png'),
    },
    {
      steel_id: 1,
      steel_name: 'Home Decor',
      steel_under: 'FROM',
      steel_price: '1500',
      steel_image: require('../../assets/category/steel_three.png'),
    },
    {
      steel_id: 1,
      steel_name: 'Tshirts',
      steel_under: 'UNDER',
      steel_price: '249',
      steel_image: require('../../assets/category/steel_one.png'),
    },
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

  const currentDate = moment();
  const yourDate = moment(sellerData?.created_at);
  const [resultDate, setResultDate] = useState(null);

  useEffect(() => {
    const daysAgo = currentDate.diff(yourDate, 'days');
    const hoursAgo = currentDate.diff(yourDate, 'hours');
    const minutesAgo = currentDate.diff(yourDate, 'minutes');

    if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
      setResultDate('Just now');
    } else {
      let result;

      if (Math.abs(daysAgo) > 0) {
        result = `${Math.abs(daysAgo)} day${
          Math.abs(daysAgo) !== 1 ? 's' : ''
        } ago`;
      } else if (Math.abs(hoursAgo) > 0) {
        result = `${Math.abs(hoursAgo)} hour${
          Math.abs(hoursAgo) !== 1 ? 's' : ''
        } ago`;
      } else {
        result = `${Math.abs(minutesAgo)} minute${
          Math.abs(minutesAgo) !== 1 ? 's' : ''
        } ago`;
      }

      setResultDate(result);
    }
  }, [currentDate, yourDate]);

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  const followStatusClick = async () => {
    try {
      // const myHeaders = new Headers();
      // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTk0Njk4MDgsImV4cCI6MTcxOTcyOTAwOH0.LRoLafMH5SboZ_Ny6mlVOQF37eH23EV9E2OYcxS7fjM");

      // const formdata = new FormData();

      // const requestOptions = {
      //   method: "PUT",
      //   headers: myHeaders,
      //   body: formdata,
      //   redirect: "follow"
      // };

      // fetch("http://192.168.0.178:5000/api/follow/1", requestOptions)
      //   .then((response) => response.text())
      //   .then((result) => console.log("1111111111111 ========= ", result))
      //   .catch((error) => console.error(error));

      ToastAndroid.show('Still progresss', ToastAndroid.SHORT);
    } catch (error) {
      console.log('catch in followStatusClick : ', error);
    }
  };

  useEffect(() => {
    getData();
    getFlashDeals();
  }, []);

  const getData = async () => {
    try {
      var data = `id=${vendor_id}`;
      const getdata = await fetchData.seller_list(data, token);
      setSellerData(getdata?.data?.[0]);
      var product_data = `project=top-picks&vendor_id=${vendor_id}`;
      const get_products = await fetchData.list_products(product_data, token);
      setTopPicks(get_products?.data);
      var arrival_data = `vendor_id=${vendor_id}`;
      const get_Arrival = await fetchData.list_products(arrival_data, token);
      setNewArrivals(get_Arrival?.data);
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
      <StatusBar backgroundColor={Color.primary} barStyle={'dark-content'} />
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
            case 'Profile':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  {sellerData?.profile != null ? (
                    <Image
                      source={{uri: sellerData?.profile}}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'cover',
                        borderRadius: 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.user}}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'cover',
                        borderRadius: 100,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Manrope.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {sellerData?.first_name + ' ' + sellerData?.last_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Medium,
                          }}>
                          {sellerData?.follow_count} Followers
                        </Text>
                        <View
                          style={{
                            width: 2,
                            height: '80%',
                            backgroundColor: Color.cloudyGrey,
                            marginHorizontal: 10,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Medium,
                          }}>
                          {sellerData?.product_count} Products
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {maxRating.map((item, index) => {
                          return (
                            <View
                              activeOpacity={0.7}
                              key={index}
                              style={{
                                marginRight: 5,
                              }}>
                              <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={
                                  item.rating <= defaultRating
                                    ? 'star'
                                    : 'star-o'
                                }
                                icon_size={16}
                                icon_color={Color.sunShade}
                              />
                            </View>
                          );
                        })}
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Medium,
                            marginHorizontal: 5,
                          }}>
                          ({sellerData?.rating} Rating)
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      {sellerData?.is_follow == true ? (
                        <View
                          style={{
                            padding: 7,
                            paddingHorizontal: 20,
                            backgroundColor: Color.shop_green,
                            borderRadius: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              fontFamily: Manrope.Medium,
                              letterSpacing: 0.5,
                            }}>
                            Following
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => followStatusClick()}
                          style={{
                            padding: 7,
                            paddingHorizontal: 20,
                            backgroundColor: Color.shop_green,
                            borderRadius: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.white,
                              fontFamily: Manrope.Medium,
                              letterSpacing: 0.5,
                            }}>
                            Follow
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            case 'About':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                      letterSpacing: 0.5,
                      paddingVertical: 5,
                    }}>
                    About {`${sellerData?.first_name} ${sellerData?.last_name}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'justify',
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                      lineHeight: 22,
                      paddingVertical: 10,
                    }}>
                    ShopEasey is one of the fast-growing authorized dealers,
                    with our wings widespread in India, Singapore, and Malaysia.
                    Presenting in simple verbs, ShopEasey is a one-stop shop for
                    all customer requirements. ShopEasey aims to give customers
                    in India, Singapore, and Malaysia a hassle-free and
                    enjoyable shopping experience by offering a large selection
                    of goods from top-tier brands & genuine handmade retailers.
                    The brand focuses on delivering quality products to its
                    consumers with reliable services.
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                          letterSpacing: 0.5,
                        }}
                        numberOfLines={1}>
                        Joined
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Medium,
                          marginTop: 5,
                        }}
                        numberOfLines={1}>
                        {resultDate}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}
                        numberOfLines={1}>
                        Products
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Medium,
                          marginTop: 5,
                        }}
                        numberOfLines={1}>
                        Total {sellerData?.product_count}+ Products
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}>
                        Follow Us
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 5,
                        }}>
                        <Iconviewcomponent
                          Icontag={'Entypo'}
                          iconname={'linkedin'}
                          icon_size={16}
                          icon_color={Color.primary}
                        />
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={'facebook-f'}
                          icon_size={16}
                          icon_color={Color.primary}
                        />
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={'youtube-play'}
                          icon_size={16}
                          icon_color={Color.primary}
                        />
                        {/* <Iconviewcomponent
                          Icontag={'FontAwesome6Brands'}
                          iconname={'x-twitter'}
                          icon_size={16}
                          icon_color={Color.primary}
                        /> */}
                      </View>
                    </View>
                  </View>
                </View>
              );
            case 'Shop Categories':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    Shop by category
                  </Text>
                  <FlatList
                    data={sellerData?.categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            padding: 10,
                          }}
                          onPress={() => {
                            navigation.navigate('ProductList', {
                              category_id: item?.id,
                            });
                          }}>
                          <ImageBackground
                            source={require('../../assets/category/vector.png')}
                            style={{
                              width: 80,
                              height: 80,
                              resizeMode: 'contain',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={{uri: item?.file}}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                resizeMode: 'contain',
                              }}
                            />
                          </ImageBackground>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              textTransform: 'capitalize',
                              paddingVertical: 5,
                            }}>
                            {item?.category_name
                              ?.substring(0, 15)
                              .concat('...')}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            case 'OfferBanner':
              return (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../assets/category/flat.png')}
                    style={{
                      width: scr_width,
                      height: 340,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              );
            case 'Top Picks':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Manrope.Bold,
                      }}>
                      Top picks for you
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      See All
                    </Text>
                  </View>
                  <FlatList
                    data={topPicks}
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
              );
            case 'Offer Coupon':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                      backgroundColor: '#ECEFFE',
                      borderTopStartRadius: 15,
                      borderTopRightRadius: 15,
                    }}>
                    <Image
                      source={require('../../assets/logos/black_logo.png')}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: 'contain',
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#171717',
                          fontFamily: Manrope.SemiBold,
                          paddingVertical: 3,
                        }}>
                        WELCOME 200
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Medium,
                          paddingVertical: 3,
                        }}>
                        On min. purchase of 3 items
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          fontFamily: Manrope.SemiBold,
                          paddingVertical: 3,
                        }}>
                        * GET 50% OFFER
                      </Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'right',
                        fontSize: 8,
                        color: Color.black,
                        fontFamily: Manrope.Bold,
                        transform: [{rotate: '-90deg'}],
                      }}>
                      . T&C Apply
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      paddingVertical: 10,
                      backgroundColor: Color.primary,
                      borderBottomStartRadius: 10,
                      borderBottomRightRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.white,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                        textAlign: 'center',
                      }}>
                      Shop Now
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            case 'New Arrival':
              return (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Manrope.Bold,
                      }}>
                      New Arrivals
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      See All
                    </Text>
                  </View>
                  <FlatList
                    data={newArrivals}
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
              );
            case 'flash deals':
              return (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  {FlashOffers?.length > 0 &&
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
                            marginVertical: 10,
                            padding: 10,
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: item.logo}}
                            style={{
                              width: 120,
                              height: 60,
                              resizeMode: 'cover',
                            }}
                          />
                          <SellerCountdownTimer
                            days={days}
                            hours={hours}
                            minutes={minutes}
                            seconds={seconds}
                          />
                        </View>
                      );
                    })}
                  <FlatList
                    data={products}
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
                    onEndReached={() => {
                      loadMoreData();
                    }}
                    onEndReachedThreshold={3}
                  />
                </View>
              );
            case 'Steel deals':
              return (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: Color.black,
                      padding: 10,
                    }}>
                    <View
                      style={{
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
                  <ImageBackground
                    source={require('../../assets/category/steel_bg.jpg')}
                    style={{
                      width: '100%',
                      height: 350,
                      resizeMode: 'contain',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                      }}>
                      <TextStroke stroke={1} color={Color.white}>
                        <Text
                          style={{
                            fontSize: 24,
                            color: Color.primary,
                          }}>
                          {' '}
                          STEEL THE DEALS{' '}
                        </Text>
                      </TextStroke>
                    </View>
                    <FlatList
                      data={steelData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              borderRadius: 10,
                              height: 180,
                              marginLeft: 10,
                              paddingVertical: 20,
                            }}>
                            <Image
                              source={item.steel_image}
                              style={{
                                resizeMode: 'contain',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                            />
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Color.white,
                                borderBottomStartRadius: 5,
                                borderBottomRightRadius: 5,
                                paddingVertical: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Color.cloudyGrey,
                                  fontFamily: Manrope.SemiBold,
                                }}>
                                {item.steel_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingVertical: 3,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.black,
                                    fontFamily: Manrope.Bold,
                                  }}>
                                  {item.steel_under}{' '}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.primary,
                                    fontFamily: Manrope.Bold,
                                  }}>
                                  ₹{item.steel_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </ImageBackground>
                </View>
              );
            // case 'Discounts':
            //   return (
            //     <View
            //       style={{
            //         width: '100%',
            //         alignItems: 'center',
            //         backgroundColor: Color.white,
            //         marginVertical: 10,
            //         paddingVertical: 20,
            //       }}>
            //       <View
            //         style={{
            //           width: '95%',
            //           flexDirection: 'row',
            //           justifyContent: 'space-between',
            //           alignItems: 'center',
            //           paddingVertical: 10,
            //         }}>
            //         <Text
            //           style={{
            //             fontSize: 16,
            //             color: Color.black,
            //             fontFamily: Manrope.SemiBold,
            //             letterSpacing: 0.5,
            //           }}>
            //           Discounts for you
            //         </Text>
            //         <Text
            //           style={{
            //             fontSize: 14,
            //             color: Color.cloudyGrey,
            //             fontFamily: Manrope.Medium,
            //             letterSpacing: 0.5,
            //           }}>
            //           See All
            //         </Text>
            //       </View>
            //       <View style={{width: '95%'}}>
            //         <FlatList
            //           data={visibleData}
            //           horizontal
            //           showsHorizontalScrollIndicator={false}
            //           renderItem={({item, index}) => {
            //             return <ItemCard item={item} navigation={navigation} />;
            //           }}
            //         />
            //       </View>
            //     </View>
            //   );
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default SellerProfile;
