import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {BottomSheet} from 'react-native-btr';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../../Config/fetchData';
import {Media} from '../../../Global/Media';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import common_fn from '../../../Config/common_fn';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {setDataCount} from '../../../Redux';
import {RefreshControl} from 'react-native-gesture-handler';

const {height} = Dimensions.get('screen');

const MyCart = ({}) => {
  const navigation = useNavigation();
  const [defaultRating, setDefaultRating] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [CheckOut, setCheckOut] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressCount] = useState(0);
  const [bottomData, setBottomData] = useState('');
  const [loading, setLoading] = useState(false);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

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
        getCartData();
        getCountData();
        setSaleBottomSheetVisible(false);
      } else {
        common_fn.showToast(wishlist?.message);
      }
    } catch (error) {
      console.log('error', error);
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
  }, [token]);

  const getCartData = useCallback(
    async (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      }
      try {
        const getCart = await fetchData.list_cart(``, token);
        setCartData(getCart?.data);
        const getaddress = await fetchData.list_address(``, token);
        setAddressCount(getaddress?.count);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
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
        common_fn.showToast(update_cart?.message);
        getCartData();
        getCountData();
      } else {
        common_fn.showToast(update_cart?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteCartData = async () => {
    try {
      var param = `${bottomData?.id}`;
      const delete_cart = await fetchData.delete_cart(param, token);
      common_fn.showToast(delete_cart?.message);
      setSaleBottomSheetVisible(false);
      getCartData();
      getCountData();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCheckboxToggle = item => {
    if (selectedData?.includes(item?.id)) {
      setSelectedData(selectedData.filter(id => id !== item.id));
      setCheckOut(
        CheckOut.filter(CheckOutItem => CheckOutItem?.id !== item.id),
      );
    } else {
      setSelectedData([...selectedData, item.id]);
      setCheckOut([...CheckOut, item]);
    }
  };

  var total_price = cartData.reduce((accumulator, item) => {
    return accumulator + (item.variant?.price * item?.quantity || 0);
  }, 0);

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
              Are you sure want to move this product from cart?
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
                  deleteCartData();
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
                  Remove
                </Text>
              </TouchableOpacity>
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
            </View>
          </View>
        </BottomSheet>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      {loading ? (
        <View style={{marginHorizontal: 5}}>
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
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              var discount =
                100 -
                parseInt(
                  ((item?.variant?.org_price - item?.variant?.price) /
                    item?.variant?.org_price) *
                    100,
                );
              return (
                <View
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
                  <View style={{}}>
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
                    {item?.variant?.productImages?.length == 0 ? (
                      <Image
                        source={{uri: item?.variant?.productImages?.[0]?.image}}
                        style={{
                          width: 120,
                          height: 120,
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={{uri: Media.no_image}}
                        style={{
                          width: 120,
                          height: 120,
                          resizeMode: 'contain',
                          borderRadius: 10,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.red,
                        fontFamily: Manrope.SemiBold,
                        // position: 'absolute',
                        // bottom: 10,
                        // right: 30,
                        marginTop: 5,
                        textAlign: 'center',
                      }}>{`(Only ${item?.variant?.stock} Stocks)`}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                                item.rating <= defaultRating ? 'star' : 'staro'
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
                        {item?.variant?.price}{' '}
                        <Text style={styles.productPrice}>
                          {countryCode?.symbol}
                          {item?.variant?.org_price}
                        </Text>
                      </Text>
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
                            padding: 5,
                            paddingHorizontal: 10,
                            borderLeftWidth: 1,
                            borderLeftColor: Color.cloudyGrey,
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
                          disabled={item?.quantity == item?.variant?.stock}
                          style={{
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                            paddingHorizontal: 10,
                            backgroundColor:
                              item?.quantity == item?.variant?.stock
                                ? Color.lightgrey
                                : Color.white,
                            borderLeftWidth: 1,
                            borderLeftColor: Color.cloudyGrey,
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
                    height: height / 1.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Manrope.SemiBold,
                      fontSize: 14,
                      color: Color.black,
                    }}>
                    No products added to cart
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
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
                    {countryCode?.symbol}
                    {total_price}
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
                      if (CheckOut?.length > 0) {
                        if (addressData > 0) {
                          navigation.navigate('OrderConfirmation', {CheckOut});
                        } else {
                          navigation.navigate('AddAddress', {
                            item: {},
                            CheckOut: CheckOut,
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
                        CheckOut?.length > 0 ? Color.primary : Color.lightgrey,
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
    </View>
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
