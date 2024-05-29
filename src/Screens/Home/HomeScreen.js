//import liraries
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
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
  Platform,
  Dimensions,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal,
  Linking,
} from 'react-native';
import Color from '../../Global/Color';
import {useDispatch} from 'react-redux';
import {Media} from '../../Global/Media';
import {scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

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
      id: '0',
      category_name: 'Men',
      category_image: require('../../assets/images/male.png'),
    },
    {
      id: '1',
      category_name: 'Women',
      category_image: require('../../assets/images/female.png'),
    },
    {
      id: '2',
      category_name: 'Kid’s Wear',
      category_image: require('../../assets/images/kutties.png'),
    },
    {
      id: '3',
      category_name: 'Snacks',
      category_image: require('../../assets/images/snacks.png'),
    },
    {
      id: '4',
      category_name: 'Baby Care',
      category_image: require('../../assets/images/baby.png'),
    },
    {
      id: '5',
      category_name: 'Personal Care',
      category_image: require('../../assets/images/care.png'),
    },
    {
      id: '6',
      category_name: 'Home Kitchen',
      category_image: require('../../assets/images/kitchen.png'),
    },
    {
      id: '7',
      category_name: 'View All',
      category_image: require('../../assets/images/viewall.png'),
    },
  ]);

  const [hotDealsData, setHotDealsData] = useState([
    {
      id: '0',
      category_name: 'Men',
      category_image: require('../../assets/images/hot_one.png'),
    },
    {
      id: '1',
      category_name: 'Women',
      category_image: require('../../assets/images/hot_two.png'),
    },
    {
      id: '2',
      category_name: 'Kid’s Wear',
      category_image: require('../../assets/images/hot_three.png'),
    },
    {
      id: '3',
      category_name: 'Snacks',
      category_image: require('../../assets/images/hot_one.png'),
    },
    {
      id: '4',
      category_name: 'Baby Care',
      category_image: require('../../assets/images/hot_three.png'),
    },
    {
      id: '5',
      category_name: 'Personal Care',
      category_image: require('../../assets/images/hot_one.png'),
    },
  ]);

  const [bannerData, setBannerData] = useState([
    {
      id: '0',
      ban_name: 'Men',
      ban_image: require('../../assets/images/ban_one.jpg'),
    },
    {
      id: '1',
      ban_name: 'Women',
      ban_image: require('../../assets/images/ban_two.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/ban_three.jpg'),
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
      ban_image: require('../../assets/images/ethnic.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/kids.png'),
    },
    {
      id: '3',
      ban_name: 'Fruits & Snacks',
      ban_image: require('../../assets/images/fruits.png'),
    },
  ]);

  let listRefArr = useRef([]);
  let isListGliding = useRef(false);
  let listOffset = useRef({});
  const [tabIndex, setIndex] = useState(0);

  const [routes] = useState([
    {id: 1, title: 'Buy'},
    {id: 2, title: 'Rent'},
    {id: 3, title: 'Rent'},
    {id: 4, title: 'Rent'},
    {id: 5, title: 'Rent'},
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [BuySection] = useState([
    {id: 1, title: 'Albion Home Interior', data: ['Albion Home Interior']},
    {id: 2, title: 'Albion Advantage', data: ['Albion Advantage']},
    {id: 3, title: 'Home Decor FAQs', data: ['Home Decor FAQs']},
  ]);

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
    scrollY.addListener(({value}) => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
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

      <Animated.SectionList
        sections={BuySection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
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
        renderItem={({item}) => {
          switch (item) {
            case 'Albion Home Interior':
              return (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <View
                    style={{
                      width: '95%',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {}}
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
                        borderColor: Color.cloudyGrey,
                        borderWidth: 0.5,
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
                      flexWrap: 'wrap',
                      marginVertical: 10,
                    }}>
                    <FlatList
                      data={categoryData}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item, index}) => {
                        const lastItem = index === categoryData.length - 1;
                        return (
                          <TouchableOpacity
                            onPress={() => navigation.navigate('category')}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: 10,
                              padding: 10,
                            }}>
                            <View
                              style={{
                                width: 60,
                                height: 60,
                                backgroundColor: '#E6F5F8',
                                borderRadius: 50,
                              }}>
                              <Image
                                source={item.category_image}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  color: Color.black,
                                  font: Manrope.SemiBold,
                                  paddingVertical: 5,
                                }}>
                                {item.category_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                      numColumns={4}
                      columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-around',
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
                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 15,
                        marginTop: 20,
                      }}>
                      <Image
                        source={require('../../assets/images/deals.png')}
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
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        marginVertical: 10,
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
                          width: 25,
                          height: 5,
                          marginTop: 30,
                        }}
                        renderItem={({item}) => (
                          <View
                            style={{
                              width: 320,
                              height: 120,
                              borderRadius: 5,
                              margin: 5,
                            }}>
                            <Image
                              source={item.ban_image}
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              );
            case 'Albion Advantage':
              return (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      width: '100%',
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
                        fontFamily: Manrope.SemiBold,
                      }}>
                      Trending Products
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProductList')}>
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
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {trendData.map((item, index) => {
                        return (
                          <View
                            style={{
                              width: 120,
                              height: 150,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopStartRadius: 5,
                              borderTopRightRadius: 5,
                              margin: 5,
                            }}>
                            <View
                              style={{
                                width: 120,
                                height: 150,
                                borderTopStartRadius: 5,
                                borderTopRightRadius: 5,
                              }}>
                              <Image
                                source={item.ban_image}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                  borderTopStartRadius: 5,
                                  borderTopRightRadius: 5,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                width: 120,
                                height: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Color.primary,
                                position: 'absolute',
                                bottom: 0,
                                borderBottomStartRadius: 5,
                                borderBottomRightRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: Color.white,
                                  fontSize: 14,
                                  fontFamily: Manrope.Bold,
                                  letterSpacing: 0.5,
                                }}>
                                {item.ban_name}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              );
            case 'Home Decor FAQs':
              return (
                <View
                  style={{
                    width: '100%',
                    height: height,
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    marginTop: 15,
                  }}>
                  <View style={{width: '95%', height: 410}}>
                    <Image
                      source={require('../../assets/images/sale.png')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  {/* <View
                                        style={{
                                            width: '95%',
                                            marginVertical: 10,
                                            paddingHorizontal: 15,
                                        }}>
                                        <Text
                                            style={{
                                                width: '95%',
                                                fontSize: 16,
                                                color: 'black',
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>
                                            Why Interior Designing is Important for Everyone
                                        </Text>

                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Turn Your Home into a happy Place
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    paddingVertical: 5,
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Home interior design is not just about aesthetics; it's
                                                about creating a functional and comfortable living
                                                environment.
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Make the Best Use of Your Space
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Personalization: Interior design allows you to
                                                personalise your space, making it a reflection of your
                                                tastes and personality.
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Functionality:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                A well-designed interior optimises space and
                                                functionality, making daily living more convenient and
                                                enjoyable.
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Comfort:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Thoughtfully chosen furnishings and layouts contribute
                                                to a comfortable and cosy atmosphere.
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Increased Value:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                A beautifully designed home often has a higher market
                                                value and can attract potential buyers or renters.
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', marginVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}>
                                                Enhanced Well-Being:
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Your home environment can significantly impact your
                                                mental and emotional well-being.
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            marginVertical: 10,
                                            paddingHorizontal: 15,
                                        }}>
                                        <Text
                                            style={{
                                                width: '95%',
                                                fontSize: 16,
                                                color: 'black',
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>
                                            Our Home Interior Services
                                        </Text>

                                        <View style={{ width: '100%', paddingVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    lineHeight: 25,
                                                }}>
                                                1. Full Home Interior:{' '}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Transform your entire home with the top interior
                                                designers.{' '}
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', paddingVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    lineHeight: 25,
                                                }}>
                                                2. Kitchen and Wardrobe Design:{' '}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Create the kitchen of your dreams and also get your
                                                wardrobe done by the top wardrobe designers, maximising
                                                storage while maintaining elegance.
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', paddingVertical: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: '#333',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    lineHeight: 25,
                                                }}>
                                                3. Furnishing:{' '}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#666',
                                                    textAlign: 'justify',
                                                    fontFamily: 'Poppins-Regular',
                                                    lineHeight: 25,
                                                }}>
                                                Complete your interior transformation with furnishing.
                                            </Text>
                                        </View>
                                    </View>


                                    <View
                                        style={{
                                            width: '95%',
                                            marginVertical: 10,
                                            alignItems: 'center',
                                            paddingHorizontal: 15,
                                        }}>
                                        <Text
                                            style={{
                                                width: '100%',
                                                fontSize: 16,
                                                color: 'black',
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>
                                            Any Queries? We are here to help
                                        </Text>

                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: 10,
                                                backgroundColor: '#FBE9EF',
                                                marginVertical: 10,
                                            }}>
                                            <View
                                                style={{
                                                    flex: 2,
                                                    padding: 5,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#666',
                                                        textAlign: 'justify',
                                                        fontFamily: 'Poppins-Regular',
                                                        lineHeight: 25,
                                                    }}>
                                                    We collaborate with the best-in-class home interior
                                                    and home design company
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        padding: 5,
                                                        paddingHorizontal: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: 'white',
                                                        elevation: 3,
                                                        borderRadius: 40,
                                                    }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Ionicons'}
                                                        iconname={'chatbubble-ellipses-outline'}
                                                        icon_size={20}
                                                        iconstyle={{ color: Color.primary }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            paddingHorizontal: 5,
                                                            color: Color.primary,
                                                            fontFamily: 'Poppins-Bold',
                                                        }}>
                                                        SMS
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginVertical: 15,
                                                        padding: 5,
                                                        paddingHorizontal: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: Color.primary,
                                                        borderRadius: 40,
                                                    }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Feather'}
                                                        iconname={'phone-call'}
                                                        icon_size={18}
                                                        iconstyle={{ color: 'white' }}
                                                    />
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: 'white',
                                                            paddingHorizontal: 5,
                                                            fontFamily: 'Poppins-Bold',
                                                        }}>
                                                        CALL
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginVertical: 20,
                                        }}>
                                        <View
                                            style={{
                                                flex: 3,
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                paddingHorizontal: 10,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    color: Color.primary,
                                                    fontFamily: 'Poppins-Bold',
                                                }}>
                                                Albion Bank Auctions Pvt Ltd
                                            </Text>
                                            <Text
                                                style={{
                                                    width: '95%',
                                                    textAlign: 'justify',
                                                    fontSize: 13,
                                                    color: '#666',
                                                    fontFamily: 'Poppins-SemiBold',
                                                }}
                                                numberOfLines={2}>
                                                India’s No.1 Property Site is now a Superband
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            alignItems: 'center',
                                            marginVertical: 20,
                                        }}>
                                        <View
                                            style={{
                                                width: '95%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() => navigation.replace('AboutUs')}>
                                                <View
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        backgroundColor: '#666',
                                                        borderRadius: 50,
                                                    }}></View>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#666',
                                                        fontFamily: 'Poppins-Regular',
                                                        paddingHorizontal: 5,
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    About Us
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() => navigation.replace('PrivacyPolicy')}>
                                                <View
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        backgroundColor: '#666',
                                                        borderRadius: 50,
                                                    }}></View>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#666',
                                                        fontFamily: 'Poppins-Regular',
                                                        paddingHorizontal: 5,
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    Privacy Policy
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                width: '95%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginVertical: 40,
                                            }}>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() => navigation.replace('TermsCondition')}>
                                                <View
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        backgroundColor: '#666',
                                                        borderRadius: 50,
                                                    }}></View>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#666',
                                                        fontFamily: 'Poppins-Regular',
                                                        paddingHorizontal: 5,
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    Terms & Conditions
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() =>
                                                    Linking.openURL('https://albionpropertyhub.com/')
                                                }>
                                                <View
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        backgroundColor: '#666',
                                                        borderRadius: 50,
                                                    }}></View>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#666',
                                                        fontFamily: 'Poppins-Regular',
                                                        paddingHorizontal: 5,
                                                        textDecorationLine: 'underline',
                                                    }}>
                                                    Website
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
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
  child: {width: Dimensions.get('window').width, justifyContent: 'center'},
  text: {fontSize: 14, textAlign: 'center'},
});

//make this component available to the app
export default HomeScreen;
