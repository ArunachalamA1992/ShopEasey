import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import { TabView, TabBar } from 'react-native-tab-view';
import { Media } from '../../Global/Media';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { height } = Dimensions.get('screen');

const Placed = ({ token, index, navigation, countryCode }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=1`, token);
      console.log("orderssss ---------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            // console.log("--------------- : ", item?.order);

            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID : #{item?.order?.unique_order_id}
                      </Text>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                      {item?.variants?.size == '' ||
                        item?.variants?.size == null ? (
                        <View />
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              paddingHorizontal: 5,
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
                              {item?.variants?.size}
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
                          Quantity :{' '}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('TrackingDetails', { orderData: item });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
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
                  No Order's Placed
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const Missing = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=0`, token);
      console.log("Missing ------------------ : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              Color
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
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
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
                              {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('TrackingDetails', {orderData: item});
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity> */}
              </View>
            );
          }}
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
                  No Missing Order's
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const Pending = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=2`, token);
      console.log("Pending --------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>

                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              Color
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
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
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
                              {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('TrackingDetails', { orderData: item });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
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
                  No Pending Orders
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const Proccesed = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=3`, token);
      console.log("Processed --------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              Color
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
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
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
                              {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('TrackingDetails', { orderData: item });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
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
                  No Order's Proccesed
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const OnShipping = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=4`, token);
      console.log("OnShipping --------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>

                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              Color
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
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
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
                              {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}
                    onPress={() => {
                      navigation.navigate('TrackingDetails', { orderData: item });
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
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
                  No Order's Shipped
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const ArrivedOrders = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=5`, token);
      console.log("ArrivedOrders --------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
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
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>

                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={2}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              Color
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
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
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
                              Size -
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                              }}>
                              {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                            ? 'RM'
                            : '₹'}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('DeliveredOrder', { orderData: item });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    View order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={15}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
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
                  No Order's Delivered
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const CancelledOrders = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=6`, token);
      console.log("Cancell Orders --------------- : ", JSON.stringify(order_data));

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 5 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: Media.no_image }}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={1}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              backgroundColor: bgcolor,
                              borderRadius: 30,
                              borderWidth: 1,
                              borderColor: Color.primary,
                            }}></View>
                        </View>
                      )}
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
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
                            {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$ '
                          : item?.order?.region_id == 453
                            ? 'RM '
                            : '₹ '}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
                      id: item?.product_id,
                      variant_id: item?.variants?.id,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Re-order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity> */}
              </View>
            );
          }}
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
                  No Order's Cancelled
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const CancelledRequested = ({ token, index, navigation }) => {
  const [OrderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderLoading(true);
    myorderData()
      .then(() => setOrderLoading(false))
      .catch(error => {
        console.log('Error fetching data:', error);
        setOrderLoading(false);
      });
  }, [token, index]);

  const myorderData = async () => {
    try {
      const order_data = await fetchData.list_order(`status=7`, token);
      console.log("Cancel Requested --------------- : ", order_data);

      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {OrderLoading ? (
        <View style={{ padding: 5 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const bgcolor = common_fn.getColorName(item?.variants?.color);
            // const statusBgColor = statusColor(item?.order_status);
            return (
              <View
                key={index}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    padding: 10,
                    backgroundColor: Color.white,
                  }}>
                  {item?.variants?.productImages?.length > 0 ? (
                    <Image
                      source={{ uri: item?.variants?.productImages?.[0]?.image }}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: Media.no_image }}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
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
                        }}>
                        Order ID #{item?.order?.unique_order_id}
                      </Text>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 2 }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 20,
                          borderRadius: 50,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 0,
                        }}>
                        {item?.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}
                      numberOfLines={1}>
                      {item?.products?.product_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 3,
                      }}>
                      {item?.variants?.color != '' ||
                        item?.variants?.color != null ? (
                        <View />
                      ) : (
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
                              backgroundColor: bgcolor,
                              borderRadius: 30,
                              borderWidth: 1,
                              borderColor: Color.primary,
                            }}></View>
                        </View>
                      )}
                      {item?.variants?.size != '' ||
                        item?.variants?.size != null ? (
                        <View />
                      ) : (
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
                            {item?.variants?.size}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingVertical: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}>
                        {item?.order?.region_id == 454
                          ? '$ '
                          : item?.order?.region_id == 453
                            ? 'RM '
                            : '₹ '}
                        {item?.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: Color.lightgrey,
                    borderStyle: 'dashed',
                  }}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
                      id: item?.product_id,
                      variant_id: item?.variants?.id,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Re-order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
                    icon_color={Color.primary}
                  />
                </TouchableOpacity> */}
              </View>
            );
          }}
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
                  No Cancelled Requested Items
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const MyOrders = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const countryCode = useSelector(state => state.UserReducer.country);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const getStatus = async () => {
    try {
      const status_data = await fetchData.list_status(``, token);
      console.log("MyOrders_getStatus --------------- : ", status_data);

      setStatus(status_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getStatus();
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const uniqueStatuses = [
    ...new Set(status?.slice(1)?.map(item => item?.status)),
  ];

  const routes = uniqueStatuses.map(status => ({
    key: status,
    title: status
      ?.replace(/^\w/, c => c.toUpperCase())
      ?.replace(/orders|shipping/i, match => ` ${match}`),
  }));

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'placed':
        return (
          <Placed
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'missing':
        return (
          <Missing
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'pending':
        return (
          <Pending
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'processed':
        return (
          <Proccesed
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'shipped':
        return (
          <OnShipping
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'delivered':
        return (
          <ArrivedOrders
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'cancelled':
        return (
          <CancelledOrders
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
      case 'cancel requested':
        return (
          <CancelledRequested
            token={token}
            index={index}
            countryCode={countryCode}
            navigation={navigation}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={50}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={50}
                  borderRadius={50}
                  marginHorizontal={10}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={50}
                  borderRadius={50}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={100}
                borderRadius={10}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 5,
                borderColor: Color.lightgrey,
                marginVertical: 10,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                width: '80%',
                height: 50,
                padding: 5,
                paddingHorizontal: 10,
              }}
              onPress={() => {}}>
              <Icon
                style={{width: 20, height: 20}}
                color={Color.lightgrey}
                name="search"
                size={20}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  paddingTop: 2,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  marginHorizontal: 10,
                }}
                numberOfLines={1}>
                {`Search`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                backgroundColor: Color.white,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Color.lightgrey,
              }}
              onPress={() => {}}>
              <F6Icon color={Color.lightgrey} name="sliders" size={20} />
            </TouchableOpacity>
          </View> */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            swipeEnabled={false}
            onIndexChange={setIndex}
            // style={{flex: 1}}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{
                  backgroundColor: Color.white,
                  // height: 50,
                  // marginBottom: 10,
                  elevation: 0,
                  overflow: 'hidden',
                }}
                scrollEnabled
                labelStyle={{
                  color: Color.cloudyGrey,
                  fontSize: 12,
                  fontFamily: Manrope.Bold,
                  textTransform: 'capitalize',
                  borderWidth: 1,
                  borderColor: Color.cloudyGrey,
                }}
                indicatorStyle={{
                  backgroundColor: Color.primary,
                  borderRadius: 50,
                }}
                activeColor={Color.white}
                inactiveColor={Color.cloudyGrey}
                renderLabel={({ route, focused, color }) => (
                  <View
                    style={{
                      backgroundColor: focused ? Color.primary : Color.white,
                      borderRadius: 25,
                      padding: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderColor: Color.lightgrey,
                    }}>
                    <Text
                      style={{ color, fontSize: 14, fontFamily: Manrope.Bold }}>
                      {route.title}
                    </Text>
                  </View>
                )}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 0.5,
    borderColor: Color.Venus,
    borderRadius: 50,
    marginVertical: 10,
    marginTop: 20,
  },
  searchInput: {
    width: '79.8%',
    paddingHorizontal: 10,
    fontFamily: 14,
    color: Color.lightBlack,
    fontFamily: Manrope.Medium,
  },
  CategoryContainer: {
    backgroundColor: Color.white,
    flexDirection: 'row',
  },
});

export default MyOrders;
