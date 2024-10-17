import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import common_fn from '../../Config/common_fn';
import { Media } from '../../Global/Media';
import { Manrope } from '../../Global/FontFamily';
import StepIndicator from 'react-native-step-indicator';
import FOIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Divider } from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 15,
  labelAlign: 'flex-start',
  stepIndicatorLabelCurrentStyle: 'capitalize',
  currentStepIndicatorSize: 35,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.white,
  stepIndicatorCurrentColor: Color.white,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,
  separatorFinishedColor: Color.primary,
  stepIndicatorFinishedColor: Color.white,
  stepIndicatorLabelFinishedColor: Color.white,
  finishedStepLabelColor: Color.black,
  separatorUnFinishedColor: Color.lightgrey,
  stepIndicatorUnFinishedColor: Color.white,
  stepIndicatorLabelUnFinishedColor: Color.white,
};

const TrackOrder = ({ navigation, route }) => {
  const [orderData] = useState(route.params.orderData);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);
  const bgcolor = common_fn.getColorName(orderData?.variants?.color);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  const filteredOrderData = orderStatus?.filter(
    order => !['abandoned', 'pending', 'cancelled']?.includes(order.status),
  );

  const labels = filteredOrderData?.map(order => order.status);

  const currentPosition = filteredOrderData.findIndex(
    order => order.status === orderData?.status,
  );

  console.log("orderData ============= : ", orderData);


  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token]);

  const myorderData = async () => {
    try {
      const order_status = await fetchData.list_status(``, token);
      setOrderStatus(order_status?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const cancelOrder = async () => {
  //   try {
  //     Alert.alert(
  //       '',
  //       'Do you want cancel this product',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'OK',
  //           onPress: async () => {
  //             var data = {
  //               status: 6,
  //             };
  //             const order_status = await fetchData.update_order(
  //               `${orderData?.id}`,
  //               data,
  //               token,
  //             );
  //             common_fn.showToast(order_status?.message);
  //             myorderData();
  //             setOrderLoading(false);
  //           },
  //         },
  //       ],
  //       { cancelable: false },
  //     );
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const addDays = days => {
    let date = new Date(orderData?.order?.created_at);
    date.setDate(date.getDate() + days);
    return date;
  };
  const addextractDays = (days, date) => {
    let till_date = new Date(date);
    till_date.setDate(till_date.getDate() + days);
    return till_date;
  };

  const deliveryDate = addDays(8);
  const tilldate = addextractDays(4, deliveryDate);
  console.log('deliveryDate', deliveryDate, tilldate);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FA' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, backgroundColor: Color.white }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: Color.white,
            }}>
            {orderData?.variants?.productImages?.length > 0 ? (
              <Image
                source={{ uri: orderData?.variants?.productImages?.[0]?.image }}
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
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                  }}>
                  Order ID #{orderData?.order?.id}
                </Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    color: Color.white,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 50,
                    backgroundColor: Color.green,
                    fontFamily: Manrope.SemiBold,
                    textTransform: 'capitalize',
                    marginHorizontal: 0,
                  }}>
                  {orderData?.status}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                }}
                numberOfLines={2}>
                {orderData?.products?.product_name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  paddingVertical: 3,
                }}>
                {orderData?.variants?.color != '' && (
                  <>
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
                        Color :
                      </Text>
                      <View
                        style={{
                          width: 15,
                          height: 15,
                          backgroundColor: bgcolor,
                          borderRadius: 30,
                          borderWidth: 1,
                          borderColor: Color.primary,
                        }}></View>
                    </View>
                    <View
                      style={{
                        width: 1,
                        height: 20,
                        backgroundColor: Color.lightgrey,
                      }}
                    />
                  </>
                )}
                {/* {orderData?.variants?.size != ''( */}
                <>
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
                        marginRight: 5,
                      }}>
                      Size :
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      {orderData?.variants?.size != null ? orderData?.variants?.size : "--"}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 1,
                      height: 20,
                      backgroundColor: Color.lightgrey,
                    }}
                  />
                </>
                {/* )} */}
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
                    Quantity :{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    {orderData?.quantity}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Bold,
                  }}>
                  {orderData?.order?.region_id == 454
                    ? '$'
                    : orderData?.order?.region_id == 453
                      ? 'RM'
                      : '₹'}
                  {orderData?.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 10, backgroundColor: Color.white, padding: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Manrope.SemiBold,
              paddingVertical: 5,
              color: Color.black,
            }}>
            Order Details
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: Manrope.Medium,
                paddingVertical: 5,
                color: Color.black,
              }}>
              Order Id:
            </Text>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.Medium,
              }}>
              # {orderData?.order?.unique_order_id}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: Manrope.Medium,
                paddingVertical: 5,
                color: Color.black,
              }}>
              Name:
            </Text>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.Medium,
              }}>
              {orderData?.order?.user_address?.name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                fontFamily: Manrope.Medium,
                paddingVertical: 5,
                color: Color.black,
              }}>
              Address:
            </Text>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.Medium,
              }}>
              {orderData?.order?.user_address?.address_line1}
            </Text>
          </View>
          {orderData?.status_id != 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                  paddingVertical: 5,
                  color: Color.black,
                }}>
                Payment Method:
              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                }}>
                {orderData?.order?.payment_method}
              </Text>
            </View>
          )}
          {/* {orderData?.status_id != 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                  paddingVertical: 5,
                  color: Color.black,
                }}>
                Tracking Id:
              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                }}>
                AMKRTSUWYSGW
              </Text>
            </View>
          )} */}
          {orderData?.status_id != 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                  paddingVertical: 5,
                  color: Color.black,
                }}>
                Expected Delivery:
              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 14,
                  fontFamily: Manrope.Medium,
                }}>
                {moment(deliveryDate).format('ddd, MMM D')}
                {'  '} To{'  '}
                {moment(tilldate).format('ddd, MMM D')}
              </Text>
            </View>
          )}
        </View>
        {orderData?.status_id != 0 && (
          <>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: Color.white,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Manrope.SemiBold,
                  paddingVertical: 5,
                  color: Color.black,
                }}>
                Order Status
              </Text>
              <View
                style={{
                  height: 300,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentPosition}
                  stepCount={filteredOrderData.length}
                  labels={labels}
                  direction="vertical"
                  renderStepIndicator={({ position, stepStatus }) => {
                    switch (stepStatus) {
                      case 'current':
                        return (
                          <FOIcon
                            name="radio-btn-active"
                            size={20}
                            color={Color.primary}
                          />
                        );
                      case 'finished':
                        return (
                          <FOIcon
                            name="radio-btn-active"
                            size={20}
                            color={Color.primary}
                          />
                        );
                      case 'unfinished':
                        return (
                          <FOIcon
                            name="radio-btn-active"
                            size={20}
                            color={Color.lightgrey}
                          />
                        );
                      default:
                        return null;
                    }
                  }}
                />
                <Divider style={{ height: 1, marginVertical: 10 }} />
                {/* <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Manrope.Bold,
                      color: Color.primary,
                      textAlign: 'center',
                    }}>
                    View More
                  </Text>
                  <Icon
                    name="chevron-forward"
                    size={18}
                    color={Color.primary}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
            {/* <Button
              mode="contained"
              onPress={() => {
                cancelOrder();
              }}
              style={{
                backgroundColor: Color.white,
                borderRadius: 10,
                margin: 10,
                borderWidth: 1,
                borderColor: Color.primary,
              }}
              textColor={Color.primary}>
              Cancel Order
            </Button> */}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackOrder;
