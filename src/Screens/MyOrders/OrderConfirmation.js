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
  LogBox,
  StatusBar,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { BottomSheet } from 'react-native-btr';
import { Checkbox } from 'react-native-paper';
import common_fn from '../../Config/common_fn';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../Config/fetchData';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { Media } from '../../Global/Media';
import { setOrderCancelVisible, setOrderSuccessVisible } from '../../Redux';
import RazorpayCheckout from 'react-native-razorpay';

let dummyText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

LogBox.ignoreAllLogs();

const OrderConfirmation = ({ navigation, route }) => {
  const [CheckOut] = useState(route.params.CheckOut);
  console.log("Check out ============ : ", CheckOut);
  const [loading, setLoading] = useState(false);
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectPayment, setSelectPayment] = useState(null);
  const [selectAddress, setSelectAddress] = useState({});
  const [tax, setTax] = useState(10);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const countryCode = useSelector(state => state.UserReducer.country);
  const [address, setAddress] = useState([]);
  const [username, setUsername] = useState('');
  const [cardnumber, setCardNumber] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [cvvNumber, setCVVNumber] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

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

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setNumLines(discriptiontextShown ? undefined : 3);
  }, [discriptiontextShown]);

  const onDescriptionTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [discriptiontextShown],
  );

  useEffect(() => {
    if (address.length > 0) {
      setSelectAddress(address[0]);
    }
  }, [address]);

  const toggleTextShown = () => {
    setDiscriptiontextShown(!discriptiontextShown);
    setNumLines();
  };

  const cardSubmitClick = () => {
    try {
      if (
        username != '' &&
        cardnumber != '' &&
        monthYear != '' &&
        cvvNumber != ''
      ) {
        console.log('Success');
        ToastAndroid.show('Your card details is added', ToastAndroid.SHORT);
        sale_toggleBottomView();
      } else {
        ToastAndroid.show('Please fill mandatory fields', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('catch in cardSubmit_Click : ', error);
    }
  };

  function sale_toggleBottomView(type) {
    try {
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in sale_toggleBottomView :', error);
    }
  }

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
      const getaddress = await fetchData.list_address(``, token);
      setAddress(getaddress?.data);
    } catch (error) {
      console.log('error------', error);
    }
  };

  const Sub_total = CheckOut?.reduce((accumulator, item) => {
    return accumulator + (item.variant?.price * item?.quantity || 0);
  }, 0);

  const discount_price = CheckOut?.reduce((accumulator, item) => {
    return (
      accumulator +
      ((item.variant?.org_price - item.variant?.price) * item?.quantity || 0)
    );
  }, 0);

  const postOrder = async () => {
    try {
      const total_price = Sub_total + tax;
      const data = {
        address_id: selectAddress?.id,
        region_id: countryCode?.id,
        total: total_price,
        sub_total: Sub_total,
        tax: tax,
        payment_method:
          selectPayment?.name === 'cash on delivery' ? 'COD' : 'ONLINE',
        products: CheckOut?.map(item => ({
          product_id: item?.product?.id,
          variant_id: item?.variant?.id,
          quantity: item?.quantity,
          price: item?.variant?.price,
          tax: tax,
        })),
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
      .then(async ({ razorpay_signature, razorpay_payment_id }) => {
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

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
            <View
              style={{
                backgroundColor: '#DBF8FF',
                width: '100%',
                height: 500,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                  }}>
                  Add Card
                </Text>
                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: Color.primary, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '95%', alignItems: 'center' }}>
                <View style={{ width: '95%', alignItems: 'center' }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      paddingVertical: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Medium,
                    }}>
                    Name of the card *
                  </Text>
                  <View style={styles.NumberBoxConatiner}>
                    <TextInput
                      style={styles.numberTextBox}
                      placeholder="Enter Your Name"
                      placeholderTextColor={Color.cloudyGrey}
                      value={username}
                      onChangeText={value => {
                        setUsername(value);
                      }}
                      keyboardType="name-phone-pad"
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      paddingVertical: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Medium,
                    }}>
                    Card Number *
                  </Text>
                  <View style={styles.NumberBoxConatiner}>
                    <TextInput
                      style={styles.numberTextBox}
                      placeholder="XXXX XXXX XXXX XXXX"
                      placeholderTextColor={Color.cloudyGrey}
                      value={cardnumber}
                      onChangeText={value => {
                        setCardNumber(value);
                      }}
                      keyboardType="number-pad"
                      maxLength={16}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      width: '47%',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingVertical: 10,
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      Expiry Month/Year *
                    </Text>
                    <View style={styles.NumberBoxConatiner}>
                      <TextInput
                        style={styles.numberTextBox}
                        placeholder="MM/YYYY"
                        placeholderTextColor={Color.cloudyGrey}
                        value={monthYear}
                        onChangeText={value => {
                          setMonthYear(value);
                        }}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  <View style={{ width: 2, height: '100%' }}></View>
                  <View
                    style={{
                      width: '47%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingVertical: 10,
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      CVV *
                    </Text>
                    <View style={styles.NumberBoxConatiner}>
                      <TextInput
                        style={styles.numberTextBox}
                        placeholder="CVV"
                        placeholderTextColor={Color.cloudyGrey}
                        value={cvvNumber}
                        onChangeText={value => {
                          setCVVNumber(value);
                        }}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Checkbox
                    color={Color.primary}
                    uncheckedColor={`#FA4616`}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    style={{ fontSize: 16 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                      letterSpacing: 0.5,
                      textAlign: 'justify',
                    }}>
                    Save this card for faster checkout
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => cardSubmitClick()}
                  activeOpacity={0.5}
                  style={{
                    width: '95%',
                    height: 50,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Color.primary,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.white,
                      fontFamily: Manrope.Medium,
                      textTransform: 'uppercase',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in sale_BottomSheetmenu ', error);
    }
  }

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
                        status: 'UPDATE',
                      });
                    }}
                    style={{ marginHorizontal: 10 }}>
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
            {CheckOut?.[0] ?


              CheckOut?.map(item => {
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
                      padding: 10,
                    }}>
                    <View style={{ flex: 1 }}>
                      {item?.variant?.productImages?.length > 0 ? (
                        <Image
                          source={{
                            uri: item?.variant?.productImages?.[0]?.image,
                          }}
                          style={{
                            width: 150,
                            height: 170,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: Media.no_image }}
                          style={{
                            width: 150,
                            height: 170,
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
                          position: 'absolute',
                          bottom: 10,
                          right: 30,
                          textAlign: 'center',
                        }}>{`(Only ${item?.variant?.stock} Stocks)`}</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.SemiBold,
                        }}>
                        {item?.product?.product_name}
                      </Text>
                      <View
                        style={{
                          marginVertical: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
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
                              // position: 'absolute',
                              // bottom: 10,
                              // right: 20,
                              textAlign: 'center',
                              marginTop: 5,
                            }}>{`(Only ${item?.variant?.stock} Stocks)`}</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.cloudyGrey,
                              fontFamily: Manrope.Medium,
                            }}>
                            Qty-{' '}
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
                  </View>
                );
              }) :
              isExpanded ? (
                <View style={{ width: '100%' }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      backgroundColor: Color.white,
                    }}>


                    {CheckOut?.map(item => {
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
                            padding: 10,
                          }}>
                          <View style={{ flex: 1 }}>
                            {item?.variant?.productImages?.length > 0 ? (
                              <Image
                                source={{
                                  uri: item?.variant?.productImages?.[0]?.image,
                                }}
                                style={{
                                  width: 150,
                                  height: 170,
                                  resizeMode: 'cover',
                                  borderRadius: 10,
                                }}
                              />
                            ) : (
                              <Image
                                source={{ uri: Media.no_image }}
                                style={{
                                  width: 150,
                                  height: 170,
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
                                position: 'absolute',
                                bottom: 10,
                                right: 30,
                                textAlign: 'center',
                              }}>{`(Only ${item?.variant?.stock} Stocks)`}</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Manrope.SemiBold,
                              }}>
                              {item?.product?.product_name}
                            </Text>
                            <View
                              style={{
                                marginVertical: 10,
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
                                fontSize: 14,
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
                              }}>
                              {item?.variant?.size != '' && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginRight: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Manrope.Medium,
                                      letterSpacing: 0.5,
                                    }}>
                                    Size-{' '}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: Color.black,
                                      fontFamily: Manrope.SemiBold,
                                    }}>
                                    {item?.variant?.size}
                                  </Text>
                                </View>
                              )}
                              {item?.variant?.color && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginRight: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Manrope.Medium,
                                      letterSpacing: 0.5,
                                    }}>
                                    Color-{' '}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        paddingHorizontal: 5,
                                        fontSize: 14,
                                        color: Color.black,
                                        fontFamily: Manrope.SemiBold,
                                        letterSpacing: 0.5,
                                      }}>
                                      {common_fn.getColorName(
                                        item?.variant?.color,
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              )}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  marginRight: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.cloudyGrey,
                                    fontFamily: Manrope.Medium,
                                  }}>
                                  Qty-{' '}
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
                        </View>
                      );
                    })}
                  </View>

                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      marginVertical: 10,
                      paddingVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#E7F7EC',
                    }}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome5'}
                      iconname={'truck'}
                      icon_size={20}
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
              ) : null

            }
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
                  Price ( {CheckOut?.length} Items )
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
                  {tax}
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
                  {Sub_total + tax}
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
            {Sub_total + tax}
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
    letterSpacing: 0.5,
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
