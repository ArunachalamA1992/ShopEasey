import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { BottomSheet } from 'react-native-btr';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../Config/fetchData';
import { Media } from '../../Global/Media';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import common_fn from '../../Config/common_fn';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { setDataCount } from '../../Redux';
import { RefreshControl } from 'react-native-gesture-handler';
import { ItemCardHorizontal } from '../../Components/ItemCard';

const { height } = Dimensions.get('screen');

const MyCart = ({ }) => {
  const navigation = useNavigation();
  const [defaultRating, setDefaultRating] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [CheckOut, setCheckOut] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressCount] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [bottomData, setBottomData] = useState({});
  const [loading, setLoading] = useState(false);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // console.log("countryCode ============= :", countryCode?.id);

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

  const toggle_WishList = async () => {
    try {
      var data = {
        product_id: bottomData?.product?.id,
        variant_id: bottomData?.variant?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      if (wishlist?.status == true) {
        common_fn.showToast(wishlist?.message);
        deleteCartData();
        getCartData();
        getCountData();
        setSaleBottomSheetVisible(false);
        // if (selectedData?.includes(bottomData?.id)) {
        //   setSelectedData(selectedData.filter(id => id !== bottomData?.id));
        // }
        // setCheckOut(
        //   CheckOut.filter(CheckOutItem => CheckOutItem?.id !== item.id),
        // );
        setSelectedData(selectedData.filter(id => id !== item.id));
      } else {
        common_fn.showToast(wishlist?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      getAPIData();
    }, [token, cartData])
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getAPIData();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [token,countryCode]);

  const getAPIData = async () => {
    try {
      //recommended Products
      const top_picks = await fetchData.list_products(
        `project=top-picks&region_id=${countryCode?.id}`,
        token,
      );
      setRecommendedProducts(top_picks?.data);
      //cart Data
      const getCart = await fetchData.list_cart(
        `region_id=${countryCode?.id}`,
        token,
      );
      // console.log("Cart resp ---------- : ", getCart?.data);

      setCartData(getCart?.data);
    } catch (error) {
      console.log('catch in getAPIData_MyCart', error);
    }
  };

  useEffect(() => {
    getCountData();
    setLoading(true);
    getCartData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, [token, addressData]);

  const getCartData = useCallback(
    async (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      }
      try {
        const getCart = await fetchData.list_cart(
          `region_id=${countryCode?.id}`,
          token,
        );
        // console.log("GET CART ============= :",getCart?.data);

        setCartData(getCart?.data);
        const getaddress = await fetchData.list_address(``, token);
        // console.log("setAddressCount ============= : ", getaddress);

        setAddressCount(getaddress?.count);
        setLoading(false);
      } catch (error) {
        console.log('catch in getCartData_MyCart:', error);
      } finally {
        if (isRefreshing) {
          setRefreshing(false);
        }
      }
    },
    [token],
  );

  const handleRefresh = () => {
    getCartData(true);
    getCountData();
  };

  const updateCartData = async (id, status, quantity) => {
    try {
      var param = `${id}`;
      var data = {
        quantity: 0,
      };
      if (status == 'plus') {
        data.quantity += quantity + 1;
      } else {
        data.quantity += quantity - 1;
      }
      const update_cart = await fetchData.update_cart(param, data, token);
      if (update_cart?.status == true) {
        // common_fn.showToast(update_cart?.message);
        getCartData();
        getCountData();
      } else {
        common_fn.showToast(update_cart?.message);
      }
    } catch (error) {
      console.log('catch in updateCartData_MyCart', error);
    }
  };

  const deleteCartData = async () => {
    try {
      var param = `${bottomData?.id}`;
      const delete_cart = await fetchData.delete_cart(param, token);
      // console.log("remove cart --------------- : ", delete_cart);

      common_fn.showToast(delete_cart?.message);
      setSaleBottomSheetVisible(false);
      getCartData();
      getCountData();
      // if (selectedData?.includes(bottomData?.id)) {
      //   setSelectedData(selectedData.filter(id => id !== bottomData?.id));
      // }
      // setCheckOut(
      //   CheckOut.filter(CheckOutItem => CheckOutItem?.id !== item.id),
      // );
      setSelectedData(selectedData.filter(id => id !== item.id));
    } catch (error) {
      console.log('catch in deleteCartData :', error);
      // console.log('catch in deleteCartData :', error.response.data);
    }
  };

  const handleCheckboxToggle = item => {
    if (selectedData?.includes(item?.id)) {
      setSelectedData(selectedData.filter(id => id !== item.id));
      // setCheckOut(
      //   CheckOut.filter(CheckOutItem => CheckOutItem?.id !== item.id),
      // );
    } else {
      setSelectedData([...selectedData, item.id]);
      // setCheckOut([...CheckOut, item]);
    }
  };
  const handleSelectAll = () => {
    if (selectedData.length === cartData.length) {
      setSelectedData([]);
    } else {
      const allIds = cartData.map(item => item.id);
      setSelectedData(allIds);
    }
  };

  const total_price = cartData
    .filter(item =>
      // selectedData.length === 0 ||
      selectedData.includes(item.id),
    )
    .reduce((accumulator, item) => {
      const price = item?.variant?.offer_price
        ? item?.variant?.offer_price
        : item.variant?.price || 0;
      const priceMargin = countryCode?.price_margin || 1;
      const quantity = item?.quantity || 0;

      return (
        accumulator +
        price *
        // / priceMargin
        quantity
      );
    }, 0)
    .toFixed(2);

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
      console.log('catch in getCountData_MyCart', error);
    }
  };

  function sale_BottomSheetmenu() {
    try {
      return (
        <BottomSheet
          visible={salebottomSheetVisible}
          onBackButtonPress={() => {
            setSaleBottomSheetVisible(false);
          }}
          onBackdropPress={() => {
            setSaleBottomSheetVisible(false);
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: 140,
              padding: 10,
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
              }}>
              Move from Cart
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
              }}>
              Are you sure want to remove this product from cart?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={async () => {
                  setSaleBottomSheetVisible(false);
                }}
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: Color.white,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  deleteCartData();
                }}
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: Color.primary,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.white,
                    fontFamily: Manrope.Bold,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
              {/* {bottomData?.variant?.is_wishlisted == false && (
                <TouchableOpacity
                  onPress={() => {
                    toggle_WishList();
                  }}
                  style={{
                    flex: 1,
                    height: 40,
                    backgroundColor: Color.primary,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.white,
                      fontFamily: Manrope.Bold,
                    }}>
                    Move to wishlist
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        </BottomSheet>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  // console.log('length ------------ :', cartData?.length);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      {loading ? (
        <View style={{ marginHorizontal: 5 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={150}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={150}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={150}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={150}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          {cartData?.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                handleSelectAll();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <MCIcon
                name={
                  cartData?.length == selectedData.length
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={25}
                color={
                  cartData?.length == selectedData.length
                    ? Color.primary
                    : Color.black
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  marginLeft: 5,
                }}>
                Select All
              </Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
              const originalPrice = item?.variant?.org_price;
              // / countryCode?.price_margin;
              const offerPrice = item?.variant?.offer_price
                ? item?.variant?.offer_price
                : item?.variant?.price;
              // / countryCode?.price_margin;

              const discount = parseFloat(
                ((originalPrice - offerPrice) / originalPrice) * 100,
              ).toFixed(2);
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: Color.white,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    borderRadius: 10,
                    flexDirection: 'row',
                    // alignItems: 'center',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      navigation.navigate('ProductDetails', {
                        id: item?.product?.id,
                        variant_id: item?.variant?.id,
                      });
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleCheckboxToggle(item);
                      }}
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: -10,
                        left: -10,
                      }}>
                      <MCIcon
                        name={
                          selectedData.includes(item.id)
                            ? 'checkbox-marked'
                            : 'checkbox-blank-outline'
                        }
                        size={25}
                        color={
                          selectedData.includes(item.id)
                            ? Color.primary
                            : Color.black
                        }
                      />
                    </TouchableOpacity>
                    {item?.variant?.productImages?.length > 0 ? (
                      <Image
                        source={{ uri: item?.variant?.productImages?.[0]?.image }}
                        style={{
                          width: 125,
                          height: 145,
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: Media.no_image }}
                        style={{
                          width: 125,
                          height: 125,
                          resizeMode: 'contain',
                          borderRadius: 10,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 10,
                        color: Color.red,
                        fontFamily: Manrope.SemiBold,
                        // position: 'absolute',
                        // bottom: 10,
                        // right: 30,
                        marginTop: 10,
                        textAlign: 'center',
                      }}>{`(Only ${item?.variant?.stock} Stocks)`}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ProductDetails', {
                          id: item?.product?.id,
                          variant_id: item?.variant?.id,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.SemiBold,
                        }}
                        numberOfLines={2}>
                        {item?.product?.product_name}
                      </Text>
                      <View style={styles.productRatingView}>
                        {maxRating.map((item, index) => {
                          return (
                            <View activeOpacity={0.7} key={index} style={{}}>
                              <AntDesign
                                name={
                                  item.rating <= defaultRating
                                    ? 'star'
                                    : 'staro'
                                }
                                size={14}
                                color={Color.sunShade}
                              />
                            </View>
                          );
                        })}
                        <Text
                          style={{
                            fontFamily: Manrope.Bold,
                            fontSize: 12,
                            paddingHorizontal: 5,
                            color: Color.black,
                          }}>
                          {item?.rating}
                          <Text
                            style={{
                              fontFamily: Manrope.SemiBold,
                              fontSize: 10,
                              color: Color.cloudyGrey,
                              letterSpacing: 0.5,
                            }}>
                            {' '}
                            ({item?.reviews} Reviews)
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.productDiscountPrice}>
                          {countryCode?.symbol}
                          {parseFloat(
                            item?.variant?.offer_price
                              ? item?.variant?.offer_price
                              : item?.variant?.price,
                            // / countryCode?.price_margin,
                          ).toFixed(2)}{' '}
                          <Text style={styles.productPrice}>
                            {countryCode?.symbol}
                            {parseFloat(
                              item?.variant?.org_price,
                              // / countryCode?.price_margin,
                            ).toFixed(2)}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 3,
                        }}>
                        {item?.variant?.color != '' &&
                          item?.variant?.color != null && (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                borderRightWidth: 1,
                                borderRightColor: Color.lightgrey,
                                paddingHorizontal: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.cloudyGrey,
                                  fontFamily: Manrope.Medium,
                                  marginRight: 5,
                                }}>
                                Color
                              </Text>
                              <View
                                style={{
                                  width: 15,
                                  height: 15,
                                  backgroundColor: item?.variant?.color_code,
                                  borderRadius: 30,
                                  borderWidth: 1,
                                  borderColor: Color.primary,
                                }}></View>
                            </View>
                          )}
                        {item?.variant?.size != '' ||
                          (item?.variant?.size != null && (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                borderRightWidth: 1,
                                borderRightColor: Color.lightgrey,
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.black,
                                  fontFamily: Manrope.Medium,
                                  marginRight: 5,
                                }}>
                                Size -
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.black,
                                  fontFamily: Manrope.Bold,
                                }}>
                                {item?.variant?.size}
                              </Text>
                            </View>
                          ))}
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#0FAD45',
                          fontFamily: Manrope.Bold,
                          letterSpacing: 0.5,
                        }}
                        numberOfLines={1}>
                        Save {discount}% OFF
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                      }}>
                      <View
                        style={{
                          // flex: 1,
                          // height: 40,
                          marginTop: 10,
                          borderColor: Color.Venus,
                          borderWidth: 1,
                          borderRadius: 5,
                          // backgroundColor: Color.white,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        {item?.quantity > 1 ? (
                          <TouchableOpacity
                            onPress={() => {
                              updateCartData(item?.id, 'minus', item?.quantity);
                            }}
                            style={{
                              // flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 5,
                              paddingHorizontal: 10,
                              borderRightWidth: 1,
                              borderRightColor: Color.cloudyGrey,
                            }}>
                            <Iconviewcomponent
                              Icontag={'AntDesign'}
                              iconname={'minus'}
                              icon_size={18}
                              icon_color={Color.black}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setBottomData(item);
                              setSaleBottomSheetVisible(
                                !salebottomSheetVisible,
                              );
                            }}
                            style={{
                              // flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 5,
                              paddingHorizontal: 10,
                              backgroundColor: Color.white,
                              borderRightWidth: 1,
                              borderRightColor: Color.cloudyGrey,
                            }}>
                            <Iconviewcomponent
                              Icontag={'AntDesign'}
                              iconname={'delete'}
                              icon_size={18}
                              icon_color={Color.black}
                            />
                          </TouchableOpacity>
                        )}
                        <View
                          style={{
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 15,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Color.cloudyGrey,
                              fontFamily: Manrope.SemiBold,
                            }}>
                            {item.quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            updateCartData(item?.id, 'plus', item?.quantity);
                          }}
                          disabled={item?.quantity === item?.variant?.stock}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                            paddingHorizontal: 10,
                            backgroundColor:
                              item?.quantity === item?.variant?.stock
                                ? Color.lightgrey
                                : Color.white,
                            borderLeftWidth: 1,
                            borderLeftColor: Color.cloudyGrey,
                            opacity:
                              item?.quantity === item?.variant?.stock ? 0.5 : 1,
                          }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'plus'}
                            icon_size={18}
                            icon_color={Color.black}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* <TouchableOpacity
                    onPress={() => {
                      deleteCartData(item?.id);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      marginHorizontal: 5,
                      backgroundColor: Color.white,
                      borderWidth: 1,
                      borderColor: Color.black,
                      borderRadius: 50,
                    }}>
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'delete'}
                      icon_size={18}
                      icon_color={Color.black}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        fontFamily: Manrope.Bold,
                        marginHorizontal: 5,
                      }}
                      numberOfLines={1}>
                      Delete
                    </Text>
                  </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    height: height / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{ uri: Media.empty_cart }}
                    style={{
                      width: 250,
                      height: 250,
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }}
                  />
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />

          {cartData.length == 0 && recommendedProducts?.length > 0 && (
            <View
              style={{
                paddingLeft: 10,
                marginVertical: 10,
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
                  Recommended
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('viewProducts', {
                      key: 'topPicks',
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Bold,
                    }}>
                    More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recommendedProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <ItemCardHorizontal item={item} navigation={navigation} />
                  );
                }}
              />
            </View>
          )}
          {cartData.length > 0 ? (
            <View
              style={{
                marginVertical: 5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Medium,
                    }}>
                    Total Price
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Color.black,
                      fontFamily: Manrope.Bold,
                    }}
                    numberOfLines={1}>
                    {countryCode?.symbol} {parseFloat(total_price).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedData?.length > 0) {
                        // console.log("CHECK OUT ---------------- :", CheckOut + "  selectedData ========== : " + selectedData);
                        if (addressData > 0) {
                          navigation.navigate('OrderConfirmation', {
                            CheckOut: CheckOut,
                            ids: selectedData,
                            buyNow: "Cart"
                          });

                        } else {
                          navigation.navigate('AddAddress', {
                            item: {},
                            CheckOut: CheckOut,
                            ids: selectedData,
                            status: 'ADD',
                          });
                        }
                      } else {
                        common_fn.showToast(
                          'Please select at least one product to checkout',
                        );
                      }
                    }}
                    style={{
                      width: '100%',
                      height: 45,
                      backgroundColor:
                        selectedData?.length > 0
                          ? Color.primary
                          : Color.lightgrey,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.white,
                        fontFamily: Manrope.Bold,
                      }}>
                      Go to checkout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
        </>
      )}
      {sale_BottomSheetmenu()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  customRatingBarStyle: {
    width: '100%',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 14,
    marginRight: 5,
    letterSpacing: 0.5,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.SemiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
});

export default MyCart;
