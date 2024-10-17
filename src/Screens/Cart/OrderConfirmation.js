import React, { useState, useEffect } from 'react';
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
  LogBox,
  StatusBar,
  Modal,
  Pressable,
  FlatList,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import common_fn from '../../Config/common_fn';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../Config/fetchData';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Media } from '../../Global/Media';
import { setOrderCancelVisible, setOrderSuccessVisible } from '../../Redux';
import RazorpayCheckout from 'react-native-razorpay';
import Clipboard from '@react-native-clipboard/clipboard';
import { useStripe } from '@stripe/stripe-react-native';

LogBox.ignoreAllLogs();
const { height } = Dimensions.get('screen');

const OrderConfirmation = ({ navigation, route }) => {
  const { CheckOut, ids } = route.params;
  const [OrderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectAddress, setSelectAddress] = useState({});
  const [couponModal, setCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const countryCode = useSelector(state => state.UserReducer.country);
  const [address, setAddress] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      getCartData();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCartData = async () => {
    try {
      var data = `id=${ids?.join(',')}&region_id=${countryCode?.id}`;
      const getCart = await fetchData.list_cart(data, token);
      setOrderData(getCart?.data);
      const getaddress = await fetchData.list_address(``, token);
      setAddress(getaddress?.data);
    } catch (error) {
      console.log('error------', error);
    }
  };

  const deleteAddress = async id => {
    try {
      Alert.alert(
        '',
        'Do you want to remove your address?',
        [
          {
            text: 'No',
            onPress: async () => { },
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                var param = `${id}`;
                const getAddress = await fetchData.delete_address(
                  param,
                  '',
                  token,
                );

                common_fn.showToast(getAddress?.message);
              } catch (error) {
                console.log('Error deleting address:', error);
                common_fn.showToast(
                  'Failed to delete address. Please try again.',
                );
              }
            },
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.log('error------', error);
    }
  };

  var selectedData = ids?.length > 0 ? OrderData : CheckOut;
  const [isExpanded, setIsExpanded] = useState(false);

  const [paymentMethod] = useState([
    {
      id: 1,
      name: 'online',
      icon: 'online',
    },
    // {
    //   id: 2,
    //   name: 'cash on delivery',
    //   icon: 'rupee',
    // },
  ]);

  const [rewardsData, setRewardsData] = useState([
    {
      id: 1,
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-25T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 2,
      ban_name: 'Women',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-23T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 3,
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-23T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 4,
      ban_name: 'Men',
      ban_image: require('../../assets/images/second.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-24T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 5,
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-22T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
  ]);

  const groupRewardsData = () => {
    const groupRewards = {
      ongoing: [],
    };

    const currentDate = new Date();

    rewardsData.forEach(reward => {
      const expiredDate = new Date(reward.expired_at);
      if (currentDate <= expiredDate) {
        groupRewards.ongoing.push(reward);
      }
    });

    return groupRewards;
  };
  const groupRewards = groupRewardsData();

  const copyToClipboard = data => {
    Clipboard.setString(data);
    common_fn.showToast('The code has been copied to the clipboard.');
    fetchCopiedText();
    setCouponModal(false);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCouponCode(text);
  };

  useEffect(() => {
    if (selectedData?.length == 1) {
      setIsExpanded(true);
    }
    if (address.length > 0 && selectAddress?.city == undefined) {
      const defaultAddress = address.find(item => item?.is_default === 1);
      setSelectAddress(defaultAddress || address[0]);
    }
  }, [address, selectedData]);

  const original_total = selectedData
    ?.reduce((accumulator, item) => {
      const price = item.variant?.org_price;
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

  const Sub_total = selectedData?.reduce((accumulator, item) => {
    const price = item?.variant?.offer_price ?? item.variant?.price;
    const priceMargin = countryCode?.price_margin || 1;
    const quantity = item?.quantity || 0;

    return (
      accumulator +
      price *
      // / priceMargin
      quantity
    );
  }, 0);

  const discount_price = selectedData
    ?.reduce((accumulator, item) => {
      const orgPrice = item.variant?.org_price ?? 0;
      const offerPrice = item.variant?.offer_price ?? item.variant?.price;
      const priceMargin = countryCode?.price_margin ?? 1;
      const quantity = item?.quantity ?? 0;

      const discountedPrice =
        (orgPrice -
          // / priceMargin
          offerPrice) *
        // / priceMargin
        quantity;

      return accumulator + discountedPrice;
    }, 0)
    .toFixed(2);

  const product_tax = selectedData?.map(orderItem => {
    return orderItem?.tax
      ?.map(item => {
        if (item?.region_id == countryCode?.id) {
          return item.tax * orderItem?.quantity || 0;
        }
        return 0;
      })
      .reduce((acc, curr) => acc + curr, 0);
  });
  const overall_tax = product_tax?.reduce((acc, curr) => acc + curr, 0);

  const postOrder = async () => {
    try {
      const total_price = parseFloat(
        Sub_total + overall_tax + (countryCode?.id == 452 ? 0 : 10),
      );
      // const data = {
      //   total: total_price,
      //   payment_method:
      //     selectPayment?.name === 'cash on delivery' ? 'COD' : 'ONLINE',
      //   order: selectedData?.flatMap(item =>
      //     item.tax?.flatMap(tax_item => {
      //       if (tax_item?.region_id == countryCode?.id) {
      //         return {
      //           address_id: selectAddress?.id,
      //           total: item?.variant?.offer_price
      //             ? item?.variant?.offer_price
      //             : item?.variant?.price +
      //               // / countryCode?.price_margin
      //               tax_item?.tax * item?.quantity,
      //           sub_total: item?.variant?.offer_price
      //             ? item?.variant?.offer_price
      //             : item?.variant?.price,
      //           // / countryCode?.price_margin
      //           tax: tax_item?.tax * item?.quantity,
      //           products: {
      //             product_id: item?.product?.id,
      //             variant_id: item?.variant?.id,
      //             quantity: item?.quantity,
      //             price: item?.variant?.offer_price
      //               ? item?.variant?.offer_price
      //               : item?.variant?.price,
      //             //  / countryCode?.price_margin
      //             tax: tax_item?.tax * item?.quantity,
      //           },
      //         };
      //       }
      //       return [];
      //     }),
      //   ),
      // };
      const data = {
        total: total_price,
        sub_total: parseFloat(Sub_total),
        payment_method:
          selectPayment?.name === 'cash on delivery' ? 'COD' : 'ONLINE',
        shipping_charge: countryCode?.id == 452 ? 0 : 10,
        address_id: selectAddress?.id,
        tax: 0,
        products: selectedData?.flatMap(item =>
          item.tax?.flatMap(tax_item => {
            if (tax_item?.region_id == countryCode?.id) {
              return {
                product_id: item?.product?.id,
                variant_id: item?.variant?.id ?? item.id,
                quantity: item?.quantity ?? 1,
                price:
                  (item?.offer_price || item?.variant?.offer_price
                    ? item?.variant?.offer_price ?? item?.offer_price
                    : item?.variant?.price ?? item?.price) *
                  (item?.quantity ?? 1),
                tax: 0,
              };
            }
            return [];
          }),
        ),
      };
      // console.log('data----------------------------------', JSON.stringify(data)
      // );
      const post_order = await fetchData.postOrder(data, token);
      // console.log('post_order', post_order);
      if (selectPayment?.name === 'cash on delivery') {
        handleCODOrder(post_order);
      } else {
        if (countryCode?.id == 452) {
          handleOnlineOrder(post_order);
        } else {
          // navigation.navigate('paypal', {
          //   approval_url: post_order?.approval_url,
          //   data: post_order?.data,
          //   orders: post_order?.orders,
          // });
          navigation.navigate('Stripe', {
            approval_url: post_order?.approval_url,
            data: post_order?.data,
            orders: post_order?.orders,
          });
          // openPaymentSheet();
        }
      }
    } catch (error) {
      console.error('Error in postOrder:', error);
      common_fn.showToast(
        'An error occurred while placing the order. Please try again.',
      );
    }
  };

  const handleCODOrder = post_order => {
    if (post_order?.status === true) {
      common_fn.showToast(post_order?.message);
      navigation.replace('TabNavigator');
      dispatch(setOrderSuccessVisible(true));
    } else {
      common_fn.showToast(post_order?.message);
      dispatch(setOrderCancelVisible(true));
    }
  };

  const handleOnlineOrder = post_order => {
    RazorpayCheckout.open(post_order?.data)
      .then(async ({ razorpay_signature, razorpay_payment_id }) => {
        const data = {
          order_id: post_order?.data?.order_id,
          payment_id: razorpay_payment_id,
          orders: post_order?.orders,
        };

        // console.log("sign data ====================== : ",JSON.stringify(data)+"razorpay_signature =-========= :"+razorpay_signature);
        
        const placeOrder = await fetchData.verify_pay(
          data,
          token,
          razorpay_signature,
        );
        // console.log("placeOrder ---------------:", placeOrder);
        
        dispatch(setOrderSuccessVisible(true));
        navigation?.replace('TabNavigator');
        common_fn.showToast(post_order?.message);
      })
      .catch(error => {
        console.error('Error in RazorpayCheckout:', error);
        dispatch(setOrderCancelVisible(true));
        common_fn.showToast('Payment failed. Please try again.');
        navigation?.replace('TabNavigator');
      });
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
      } else {
        common_fn.showToast(update_cart?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'dark-content'} />
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
      <View style={{ flex: 1, backgroundColor: Color.softGrey }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingVertical: 20,
              backgroundColor: Color.white,
              elevation: 1,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                }}>
                Delivered Address
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddAddress', {
                    item: {},
                    CheckOut: CheckOut,
                    ids: ids,
                    status: 'ADD',
                  })
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'plus'}
                  icon_size={14}
                  iconstyle={{ color: Color.primary }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: Color.primary,
                    fontFamily: Manrope.SemiBold,
                    paddingHorizontal: 5,
                  }}>
                  Add Address
                </Text>
              </TouchableOpacity>
            </View>
            {address?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => setSelectAddress(item)}
                    style={{ marginRight: 10, marginTop: 10 }}>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={
                        item?.id == selectAddress?.id
                          ? 'radio-button-on'
                          : 'radio-button-off-sharp'
                      }
                      icon_size={22}
                      iconstyle={{ color: Color.lightBlack }}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        paddingVertical: 5,
                        color: Color.lightBlack,
                        fontFamily: Manrope.Medium,
                        letterSpacing: 0.5,
                      }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        paddingVertical: 2,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                        letterSpacing: 0.5,
                      }}>
                      {item?.phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        paddingVertical: 5,
                        color: Color.lightBlack,
                        fontFamily: Manrope.Medium,
                        letterSpacing: 0.5,
                      }}>
                      {item?.address_type}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Regular,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.address_line1}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddAddress', {
                        item,
                        CheckOut: CheckOut,
                        ids: ids,
                        status: 'UPDATE',
                      });
                    }}
                    style={{ marginHorizontal: 10 }}>
                    <FIcon name="pencil" size={20} color={Color.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteAddress(item?.id);
                    }}
                    style={{ marginHorizontal: 15 }}>
                    <Iconviewcomponent
                      Icontag={'MaterialCommunityIcons'}
                      iconname={'delete'}
                      icon_size={22}
                      iconstyle={{ color: Color.red }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              paddingVertical: 10,
              backgroundColor: Color.white,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}
              style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: Color.white,
                elevation: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  paddingHorizontal: 10,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                Your Order Items
              </Text>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={
                  isExpanded ? 'chevron-small-up' : 'chevron-small-down'
                }
                icon_size={25}
                icon_color={Color.black}
              />
            </TouchableOpacity>
            {isExpanded ? (
              <View style={{ width: '100%' }}>
                {selectedData?.map(item => {
                  var discount = parseFloat(
                    100 -
                    ((item?.variant?.org_price -
                      // / countryCode?.price_margin
                      item?.variant?.offer_price
                      ? item?.variant?.offer_price
                      : item?.variant?.price) /
                      // / countryCode?.price_margin
                      item?.variant?.org_price) *
                    // / countryCode?.price_margin
                    100,
                  ).toFixed(2);
                  return (
                    <View
                      style={{
                        backgroundColor: Color.white,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 10,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <View style={{}}>
                        {item?.variant?.productImages?.length > 0 ? (
                          <Image
                            source={{
                              uri: item?.variant?.productImages?.[0]?.image,
                            }}
                            style={{
                              width: 120,
                              height: 120,
                              resizeMode: 'cover',
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Image
                            source={{ uri: Media.no_image }}
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
                            fontSize: 10,
                            color: Color.red,
                            fontFamily: Manrope.SemiBold,
                            marginTop: 10,
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
                              //  / countryCode?.price_margin,
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
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingVertical: 3,
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
                                  marginHorizontal: 5,
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
                                  Size -
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                  }}>
                                  {item?.variant?.size}
                                </Text>
                              </View>
                            ))}
                          {/* <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                letterSpacing: 0.5,
                              }}>
                              Quantity -{' '}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Manrope.SemiBold,
                              }}>
                              {item?.quantity}
                            </Text>
                          </View> */}
                        </View>
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
                            <TouchableOpacity
                              onPress={() => {
                                updateCartData(
                                  item?.id,
                                  'minus',
                                  item?.quantity,
                                );
                              }}
                              disabled={item?.quantity == 1}
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
                                updateCartData(
                                  item?.id,
                                  'plus',
                                  item?.quantity,
                                );
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
                                  item?.quantity === item?.variant?.stock
                                    ? 0.5
                                    : 1,
                              }}>
                              <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'plus'}
                                icon_size={18}
                                icon_color={Color.black}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}

                {/* <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    paddingVertical: 10,
                    margin: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E7F7EC',
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'truck-outline'}
                    icon_size={25}
                    icon_color={Color.black}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      paddingHorizontal: 10,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    Delivery by tomorrow,
                  </Text>
                </View> */}
              </View>
            ) : null}
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 5,
              backgroundColor: Color.white,
              padding: 10,
            }}>
            <View
              style={{
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#ECEFFE',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Iconviewcomponent
                  Icontag={'MaterialCommunityIcons'}
                  iconname={'brightness-percent'}
                  icon_size={24}
                  icon_color={Color.black}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    paddingHorizontal: 10,
                    fontFamily: Manrope.SemiBold,
                    letterSpacing: 0.5,
                  }}>
                  Offers & Rewards
                </Text>
              </View>
              <TouchableOpacity
                disabled={couponCode == ''}
                style={{
                  backgroundColor:
                    couponCode == '' ? Color.lightgrey : Color.primary,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.white,
                    fontFamily: Manrope.Bold,
                  }}>
                  Apply Now
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: Color.cloudyGrey,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
              }}
              onPress={() => {
                setCouponModal(true);
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  paddingHorizontal: 5,
                  fontFamily: Manrope.SemiBold,
                  textAlign: 'center',
                }}>
                View More Coupon's
              </Text>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'chevron-forward'}
                icon_size={14}
                icon_color={Color.cloudyGrey}
                iconstyle={{ marginTop: 5 }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 10,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Medium,
                textAlign: 'center',
                // marginVertical: 5,
              }}>
              OR
            </Text>
            <TextInput
              placeholder="Enter your Coupon Code"
              placeholderTextColor={Color.cloudyGrey}
              value={couponCode}
              onChangeText={text => {
                setCouponCode(text);
              }}
              style={{
                backgroundColor: 'white',
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: '100%',
                height: 40,
                color: Color.black,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              paddingBottom: 15,
              backgroundColor: Color.white,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
                paddingHorizontal: 10,
                fontFamily: Manrope.SemiBold,
              }}>
              Payment Method
            </Text>
            <View
              style={
                {
                  // paddingVertical: 10,
                }
              }>
              {paymentMethod?.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}>
                    {/* <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={item?.icon}
                      icon_size={22}
                      iconstyle={{color: Color.primary}}
                    /> */}
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: Color.black,
                        paddingHorizontal: 10,
                        fontFamily: Manrope.Medium,
                        textTransform: 'capitalize',
                      }}>
                      {item?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setSelectPayment(item)}
                      style={{ marginEnd: 20 }}>
                      <Iconviewcomponent
                        Icontag={'Ionicons'}
                        iconname={
                          item?.name == selectPayment?.name
                            ? 'radio-button-on'
                            : 'radio-button-off-sharp'
                        }
                        icon_size={22}
                        iconstyle={{ color: Color.lightBlack }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 0,
              paddingVertical: 10,
              backgroundColor: Color.softGrey,
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: Color.white,
                paddingVertical: 10,
                paddingHorizontal: 10,
                elevation: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  paddingHorizontal: 10,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                Shipping Details
              </Text>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                  }}>
                  Total Price ( {selectedData?.length} Items )
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {original_total}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  Discount
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {discount_price}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  Sub Total ( {selectedData?.length} Items )
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {parseFloat(Sub_total).toFixed(2)}
                </Text>
              </View>
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                  }}>
                  Tax
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {overall_tax}
                </Text>
              </View> */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                  }}>
                  Shipping
                </Text>
                {/* {console.log(countryCode, '??????????????')
                } */}
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {countryCode?.id == 452 ? 0 : 10}
                  {/* {countryCode?.shipping_charge == 0 ? 99 : 10} */}
                </Text>
              </View>
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  Delivery Charges
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  Free Delievery
                </Text>
              </View> */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: Color.lightgrey,
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'left',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'right',
                    color: Color.primary,
                    fontFamily: Manrope.Bold,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {parseFloat(
                    Sub_total + overall_tax + (countryCode?.id == 452 ? 0 : 10),
                  ).toFixed(2)}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: Color.white,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 10,
              }}>
              <View style={{ paddingHorizontal: 10, elevation: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Manrope.SemiBold,
                    letterSpacing: 0.5,
                  }}>
                  Return/Refund Policy
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.lightBlack,
                    textAlign: 'justify',
                    paddingVertical: 5,
                    fontFamily: Manrope.Light,
                    lineHeight: 22,
                  }}
                  numberOfLines={4}>
                  ShopEasey reserves the right to return the relevant amount to
                  you without informing the Seller again if we don't hear from
                  them within.{' '}
                  <Text
                    onPress={() => navigation.navigate('ReturnRefundPolicy')}
                    style={{
                      color: Color.primary,
                      fontFamily: Manrope.SemiBold,
                      fontSize: 14,
                      paddingVertical: 5,
                    }}>
                    Read More
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
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
            {parseFloat(
              Sub_total + overall_tax + (countryCode?.id == 452 ? 0 : 10),
            ).toFixed(2)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              if (selectPayment && selectPayment.name) {
                postOrder();
              } else {
                common_fn.showToast('Please select the payment method');
              }
            }}
            style={{
              width: '100%',
              height: 45,
              backgroundColor:
                selectPayment && selectPayment.name
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
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={couponModal} transparent animationType="slide">
        <Pressable
          onPress={() => {
            setCouponModal(false);
          }}
          style={{ flex: 1, backgroundColor: Color.transparantBlack }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={() => {
              setCouponModal(false);
            }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'closecircleo'}
              icon_size={25}
              iconstyle={{ color: Color.primary, marginRight: 10 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: Color.black,
              fontFamily: Manrope.Bold,
              marginVertical: 10,
            }}>
            Select your coupon
          </Text>
          <FlatList
            data={[
              {
                category: 'Ongoing Perks Just for You!',
                data: groupRewards['ongoing'],
              },
            ]}
            keyExtractor={(item, index) => item.category}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  {item?.data?.length > 0 ? (
                    item?.data?.map((single_reward, single_index) => (
                      <TouchableOpacity
                        key={single_index}
                        style={{
                          height: 150,
                          backgroundColor: Color.white,
                          opacity:
                            item?.category == 'Rewards You’ve Missed' ? 0.5 : 1,
                        }}
                        onPress={() => {
                          copyToClipboard(single_reward?.coupon_code);
                        }}>
                        <Image
                          source={single_reward.ban_image}
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 150,
                      }}>
                      <Text
                        style={{
                          fontFamily: Manrope.SemiBold,
                          fontSize: 14,
                          color: Color.black,
                        }}>
                        No Coupon Found
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  NumberBoxConatiner: {
    display: 'flex',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    color: Color.black,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: Manrope.Medium,
    letterSpacing: 0.5,
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 16,
    marginRight: 5,
    marginVertical: 5,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.SemiBold,
    fontSize: 14,
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
});

export default OrderConfirmation;
