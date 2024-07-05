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
  LogBox,
  StatusBar,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import common_fn from '../../Config/common_fn';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import FIcon from 'react-native-vector-icons/FontAwesome';
import {Media} from '../../Global/Media';
import {setOrderCancelVisible, setOrderSuccessVisible} from '../../Redux';
import RazorpayCheckout from 'react-native-razorpay';

LogBox.ignoreAllLogs();

const OrderConfirmation = ({navigation, route}) => {
  const [CheckOut] = useState(route.params.CheckOut);
  const [OrderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectAddress, setSelectAddress] = useState({});
  const countryCode = useSelector(state => state.UserReducer.country);
  const [address, setAddress] = useState([]);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(OrderData?.length == 1);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [paymentMethod] = useState([
    {
      id: 1,
      name: 'online',
      icon: 'online',
    },
    {
      id: 2,
      name: 'cash on delivery',
      icon: 'rupee',
    },
  ]);

  useEffect(() => {
    if (address.length > 0) {
      setSelectAddress(address[0]);
    }
  }, [address]);

  useEffect(() => {
    setLoading(true);
    getCartData()
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

  const getCartData = async () => {
    try {
      var data = `id=${CheckOut?.join(',')}`;
      const getCart = await fetchData.list_cart(data, token);
      setOrderData(getCart?.data);
      const getaddress = await fetchData.list_address(``, token);
      setAddress(getaddress?.data);
    } catch (error) {
      console.log('error------', error);
    }
  };

  const Sub_total = OrderData?.reduce((accumulator, item) => {
    return accumulator + (item.variant?.price * item?.quantity || 0);
  }, 0);

  const discount_price = OrderData?.reduce((accumulator, item) => {
    return (
      accumulator +
      ((item.variant?.org_price - item.variant?.price) * item?.quantity || 0)
    );
  }, 0);

  const product_tax = OrderData?.map(orderItem => {
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
      const total_price = Sub_total + overall_tax;
      const data = {
        address_id: selectAddress?.id,
        region_id: countryCode?.id,
        total: total_price,
        sub_total: Sub_total,
        tax: overall_tax,
        payment_method:
          selectPayment?.name === 'cash on delivery' ? 'COD' : 'ONLINE',
        products: OrderData?.flatMap(item =>
          item.tax?.flatMap(tax_item => {
            if (tax_item?.region_id == countryCode?.id) {
              return {
                product_id: item?.product?.id,
                variant_id: item?.variant?.id,
                quantity: item?.quantity,
                price: item?.variant?.price,
                tax: tax_item?.tax * item?.quantity,
              };
            }
            return [];
          }),
        ),
      };
      const post_order = await fetchData.postOrder(data, token);
      if (selectPayment?.name === 'cash on delivery') {
        handleCODOrder(post_order);
      } else {
        if (countryCode?.id == 452) {
          handleOnlineOrder(post_order);
        } else {
          navigation.navigate('Paypal', {
            approval_url: post_order?.approval_url,
            data: post_order?.data,
          });
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
      .then(async ({razorpay_signature, razorpay_payment_id}) => {
        const data = {
          unique_order_id: post_order?.unique_order_id,
          order_id: post_order?.data?.order_id,
          payment_id: razorpay_payment_id,
        };
        const placeOrder = await fetchData.verify_pay(
          data,
          token,
          razorpay_signature,
        );
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
          <Text style={{color: 'white'}}>No Internet Connection</Text>
        </Animated.View>
      )}
      <View style={{flex: 1, backgroundColor: Color.softGrey}}>
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
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                }}>
                Delivered Address
              </Text>
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
                    style={{marginRight: 10, marginTop: 10}}>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={
                        item?.id == selectAddress?.id
                          ? 'radio-button-on'
                          : 'radio-button-off-sharp'
                      }
                      icon_size={22}
                      iconstyle={{color: Color.lightBlack}}
                    />
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
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
                        status: 'UPDATE',
                      });
                    }}
                    style={{marginHorizontal: 10}}>
                    <FIcon name="pencil" size={20} color={Color.primary} />
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
                iconname={'chevron-small-down'}
                icon_size={25}
                icon_color={Color.black}
              />
            </TouchableOpacity>
            {isExpanded ? (
              <View style={{width: '100%'}}>
                {OrderData?.map(item => {
                  var discount =
                    100 -
                    parseInt(
                      ((item?.variant?.org_price - item?.variant?.price) /
                        item?.variant?.org_price) *
                        100,
                    );
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: Color.white,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 10,
                        flexDirection: 'row',
                        padding: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('ProductDetails', {
                          id: item?.product?.id,
                        });
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
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingVertical: 3,
                          }}>
                          {item?.variant?.color != '' && (
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
                          {item?.variant?.size != '' && (
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
                          )}
                          <View
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
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                <View
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
                    Delivery by tomorrow, Free Delivery
                  </Text>
                </View>
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.primary,
                    fontFamily: Manrope.Bold,
                  }}>
                  Apply Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 5,
              padding: 10,
              paddingBottom: 20,
              backgroundColor: Color.white,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                paddingHorizontal: 10,
                fontFamily: Manrope.SemiBold,
              }}>
              Payment Method
            </Text>
            <View
              style={{
                paddingVertical: 10,
              }}>
              {paymentMethod?.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
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
                        letterSpacing: 0.5,
                        textTransform: 'capitalize',
                      }}>
                      {item?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setSelectPayment(item)}
                      style={{marginEnd: 20}}>
                      <Iconviewcomponent
                        Icontag={'Ionicons'}
                        iconname={
                          item?.name == selectPayment?.name
                            ? 'radio-button-on'
                            : 'radio-button-off-sharp'
                        }
                        icon_size={22}
                        iconstyle={{color: Color.lightBlack}}
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
                Total
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
                    letterSpacing: 0.5,
                  }}>
                  Price ( {OrderData?.length} Items )
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
                  {Sub_total}
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
                    letterSpacing: 0.5,
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
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'right',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    paddingHorizontal: 5,
                  }}
                  numberOfLines={2}>
                  {countryCode?.symbol}
                  {Sub_total + overall_tax}
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
              <View style={{paddingHorizontal: 10, elevation: 1}}>
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
            {Sub_total + overall_tax}
          </Text>
        </View>
        <View style={{flex: 1}}>
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

      {/* {sale_BottomSheetmenu()} */}
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
