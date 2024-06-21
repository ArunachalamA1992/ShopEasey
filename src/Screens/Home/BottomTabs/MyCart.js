import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../../Components/Icontag';
import {BottomSheet} from 'react-native-btr';
import {useSelector} from 'react-redux';
import fetchData from '../../../Config/fetchData';
import {Media} from '../../../Global/Media';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import common_fn from '../../../Config/common_fn';

const MyCart = ({}) => {
  const navigation = useNavigation();

  const [defaultRating, setDefaultRating] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [CheckOut, setCheckOut] = useState([]);
  console.log('selectedData', CheckOut);
  const [cartData, setCartData] = useState([]);
  const [bottomData, setBottomData] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [ordertotalValue, setOrderTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [refresh, setRefresh] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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

  const statusColor = value => {
    switch (value) {
      case 'OnShipping':
        return '#CAAA34';
      case 'Delivered':
        return '#0FAD45';
      case 'Cancelled':
        return '#FF5360';
      case 'Returned':
        return '#4C1930';
      default:
        return '#CAAA34';
    }
  };

  const getColor = value => {
    switch (value) {
      case 'Blue':
        return '#0D71BA';
      case 'White':
        return '#ffffff';
      case 'Yellow':
        return '#CAAA34';
      case 'Purple':
        return '#4C1930';
      case 'Red':
        return '#ff0000';
      case 'Green':
        return '#0FAD45';
      default:
        return 'black'; // default color
    }
  };

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    setTotalQuantity(totalQuantity);
    setTotalValue(totalPrice);
  }, [cartData]);

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  const handleIncrease = (item, index) => {
    const temp = cartData;
    temp[index].qty = temp[index].qty + 1;
    setCartData(temp);
    setRefresh(Math.random());
  };

  const handleDecrease = (item, index) => {
    const temp = cartData;
    temp[index].qty = temp[index].qty - 1;
    setCartData(temp);
    setRefresh(Math.random());
  };

  function sale_toggleBottomView(item) {
    try {
      setBottomData(item);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }

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
                backgroundColor: 'white',
                width: '100%',
                height: 300,
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
                  Remove From Cart ?
                </Text>
                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={24}
                    iconstyle={{color: Color.primary, marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '95%',
                  alignItems: 'center',
                  backgroundColor: Color.white,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: Color.white,
                  }}>
                  <View
                    style={{
                      width: 130,
                      height: 170,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <Image
                      source={{uri: bottomData.ordered_image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '95%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          width: '95%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.Venus,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                            }}
                            numberOfLines={1}>
                            Brand -
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: Color.lightBlack,
                              fontFamily: Manrope.Medium,
                              letterSpacing: 0.5,
                              paddingHorizontal: 5,
                            }}
                            numberOfLines={1}>
                            {bottomData.order_brand_name}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: Color.black,
                          fontFamily: Manrope.Medium,
                          letterSpacing: 0.5,
                          paddingVertical: 5,
                        }}
                        numberOfLines={2}>
                        {bottomData.order_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[styles.productDiscountPrice, {width: '55%'}]}
                          numberOfLines={1}>
                          $ {bottomData.order_price}
                        </Text>
                        <Text style={styles.productPrice} numberOfLines={1}>
                          ${bottomData.order_disc_price}
                        </Text>
                      </View>
                      <View style={{width: '100%', paddingHorizontal: 5}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#0FAD45',
                            fontFamily: Manrope.Bold,
                            letterSpacing: 0.5,
                          }}
                          numberOfLines={1}>
                          Save 100% OFF
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingVertical: 5,
                      }}>
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
                          Color -{' '}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                            }}>
                            {bottomData.order_color}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Medium,
                            letterSpacing: 0.5,
                          }}>
                          Size -{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Manrope.SemiBold,
                          }}>
                          {bottomData.order_size}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
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
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                            }}>
                            {bottomData.order_quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeItem(bottomData.order_id)}
                style={{
                  width: '90%',
                  height: 45,
                  backgroundColor: Color.primary,
                  borderRadius: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.white,
                    fontFamily: Manrope.SemiBold,
                    letterSpacing: 0.5,
                  }}>
                  Remove Item
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  const removeItem = id => {
    const newData = cartData?.filter(item => item.order_id !== id);
    setCartData(newData);
    setSaleBottomSheetVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCartData();
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const getCartData = async () => {
    try {
      const getCart = await fetchData.list_cart(``, token);
      setCartData(getCart?.data);
    } catch (error) {
      console.log('error', error);
    }
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
      common_fn.showToast(update_cart?.message);
    } catch (error) {
      console.log('error', error);
    }
  };
  const deleteCartData = async id => {
    try {
      var param = `${id}`;
      const delete_cart = await fetchData.delete_cart(param, token);
      common_fn.showToast(delete_cart?.message);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleCheckboxToggle = item => {
    if (selectedData.includes(item.id)) {
      setSelectedData(selectedData.filter(id => id !== item.id));
      setCheckOut([...CheckOut, item]);
    } else {
      setSelectedData([...selectedData, item.id]);
      setCheckOut([...CheckOut, item]);
    }
  };

  var total_price = cartData.reduce((accumulator, item) => {
    return accumulator + (item.variant?.price * item?.quantity || 0);
  }, 0);

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
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
                alignItems: 'center',
                padding: 10,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    handleCheckboxToggle(item);
                  }}
                  style={{position: 'absolute', zIndex: 1, top: 10, left: 10}}>
                  <MCIcon
                    name={
                      selectedData.includes(item.id)
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={30}
                    color={
                      selectedData.includes(item.id)
                        ? Color.primary
                        : Color.black
                    }
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: Media.no_image}}
                  style={{
                    width: 150,
                    height: 170,
                    resizeMode: 'contain',
                  }}
                />
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
                <View style={styles.productRatingView}>
                  {maxRating.map((item, index) => {
                    return (
                      <View activeOpacity={0.7} key={index} style={{}}>
                        <AntDesign
                          name={item.rating <= defaultRating ? 'star' : 'staro'}
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
                    ${item?.variant?.price}{' '}
                    <Text style={styles.productPrice}>
                      ${item?.variant?.org_price}
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
                    justifyContent: 'center',
                    alignItems: 'center',
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
                          deleteCartData(item?.id);
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
                  <TouchableOpacity
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
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
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
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
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
              $ {total_price}
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderConfirmation', {selectedData})
              }
              style={{
                width: '100%',
                height: 45,
                backgroundColor: Color.primary,
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
