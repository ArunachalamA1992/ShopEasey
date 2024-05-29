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
} from 'react-native';
import Color from '../../Global/Color';
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
import {scr_width} from '../../Utils/Dimensions';
import CountdownTimer from '../../Components/CountdownTimer';
import ItemCard from '../../Components/ItemCard';

LogBox.ignoreAllLogs();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [hotDealsData, setHotDealsData] = useState([
    {
      id: '0',
      category_name: 'Men',
      category_image: require('../../assets/images/deal_one.png'),
    },
    {
      id: '1',
      category_name: 'Women',
      category_image: require('../../assets/images/deal_two.png'),
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
              }}>
              Location
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                style={{width: 20, height: 20}}
                color={Color.primary}
                name="location"
                size={20}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginHorizontal: 5,
                  textTransform: 'capitalize',
                }}>
                Malaysia
              </Text>
              <Icon name="caret-down" size={18} color={Color.black} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => {}}>
            <Iconviewcomponent
              Icontag={'Ionicons'}
              iconname={'notifications-outline'}
              icon_size={26}
              icon_color={Color.black}
              iconstyle={{marginTop: 0}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{marginHorizontal: 10}}>
            <AntDesign name="hearto" size={25} color={Color.black} />
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
            <Feather name="shopping-cart" size={25} color={Color.black} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Color.white,
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
            borderRadius: 10,
            width: '100%',
            height: 45,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: Color.lightgrey,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Icon color={Color.cloudyGrey} name="search" size={25} />
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
            color={Color.cloudyGrey}
            name="microphone"
            size={25}
            style={{
              marginHorizontal: 5,
            }}
          />
          <MCIcon
            color={Color.cloudyGrey}
            name="camera-outline"
            size={25}
            style={{
              marginHorizontal: 5,
            }}
          />
        </TouchableOpacity>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {categoryData.slice(0, 7).map((item, index) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProductList')}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
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
                            source={item.category_image}
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
                          {item.category_name.substring(0, 10).concat('...')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('category')}>
                    <View style={styles.viewAllContainer}>
                      <Image
                        source={require('../../assets/images/viewall.png')}
                        style={{
                          width: 60,
                          height: 60,
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
                    marginVertical: 10,
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
                      width: 20,
                      height: 5,
                      marginTop: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    renderItem={({item}) => (
                      <View
                        style={{
                          margin: 5,
                        }}>
                        <Image
                          source={item.ban_image}
                          style={{
                            width: 300,
                            height: 120,
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
                <View>
                  <View
                    style={{
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
                </View>
              );
            case 'Trend Product':
              return (
                <View
                  style={{
                    padding: 10,
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
                      marginVertical: 10,
                    }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {trendData.map((item, index) => {
                        return (
                          <View
                            style={{
                              width: 140,
                              height: 160,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderTopStartRadius: 5,
                              borderTopRightRadius: 5,
                              margin: 5,
                            }}>
                            <View
                              style={{
                                width: 140,
                                height: 160,
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
                                width: 140,
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
            case 'Offer Banner':
              return (
                <View
                  style={{
                    backgroundColor: Color.white,
                  }}>
                  <FlatList
                    data={hotDealsData}
                    horizontal
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={item?.category_image}
                            style={{
                              width: scr_width,
                              height: 420,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      );
                    }}
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
                      backgroundColor: '#E6F5F860',
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/images/off_one.png')}
                        style={{
                          height: 100,
                          resizeMode: 'contain',
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                      />
                      <Image
                        source={require('../../assets/images/off_two.png')}
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
                      }}>
                      <MCIcon
                        name="ticket-percent"
                        size={50}
                        color={'#0095B6'}
                      />
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#0FAD45',
                            fontFamily: Manrope.Medium,
                            letterSpacing: 0.5,
                            paddingHorizontal: 2,
                          }}>
                          Live offer
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: Color.black,
                            fontFamily: Manrope.Bold,
                            letterSpacing: 0.5,
                            paddingHorizontal: 2,
                          }}>
                          30% OFF
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
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
                    backgroundColor: Color.white,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Image
                      source={require('../../assets/images/flash.png')}
                      style={{
                        width: 120,
                        height: 80,
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
                    backgroundColor: Color.white,
                    padding: 10,
                  }}>
                  <FlatList
                    data={visibleData}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return <ItemCard item={item} navigation={navigation} />;
                    }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    // padding: 10,
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
