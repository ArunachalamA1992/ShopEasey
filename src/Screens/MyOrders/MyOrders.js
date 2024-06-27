import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';
import {TabView, TabBar} from 'react-native-tab-view';
import {Media} from '../../Global/Media';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {height} = Dimensions.get('screen');

const Placed = ({token, index}) => {
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
      const order_data = await fetchData.list_order(``, token);
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 10}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        Total Amount -{' '}
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                          ? 'RM'
                          : '₹'}
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const Pending = ({token, index}) => {
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
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 10}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: '#FFA500',
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        Total Amount -{' '}
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                          ? 'RM'
                          : '₹'}
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const Proccesed = ({token, index}) => {
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
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 10}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: '#FFA500',
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        Total Amount -{' '}
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                          ? 'RM'
                          : '₹'}
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const OnShipping = ({token, index}) => {
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
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 10}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        Total Amount -{' '}
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                          ? 'RM'
                          : '₹'}
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const ArrivedOrders = ({token, index}) => {
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
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 10}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: Color.green,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        Total Amount -{' '}
                        {item?.order?.region_id == 454
                          ? '$'
                          : item?.order?.region_id == 453
                          ? 'RM'
                          : '₹'}
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const CancelledOrders = ({token, index}) => {
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
      setOrderData(order_data?.data);
      setOrderLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {OrderLoading ? (
        <View style={{padding: 5}}>
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
          renderItem={({item, index}) => {
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
                      source={{uri: item?.variants?.productImages?.[0]?.image}}
                      style={{
                        width: 100,
                        height: 130,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.no_image}}
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
                        Order ID #{item?.order?.id}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.white,
                          padding: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: Color.red,
                          fontFamily: Manrope.SemiBold,
                          textTransform: 'capitalize',
                          marginHorizontal: 10,
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
                      {item?.variants?.color != '' && (
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
                      {item?.variants?.size != '' && (
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
                        {item?.price}
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
                      fontSize: 16,
                      color: Color.primary,
                      fontFamily: Manrope.Bold,
                    }}>
                    Track order
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={16}
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
                  No Products Found
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

const MyOrders = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const countryCode = useSelector(state => state.UserReducer.country);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const getStatus = async () => {
    try {
      const status_data = await fetchData.list_status(``, token);
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
      .replace(/^\w/, c => c.toUpperCase())
      .replace(/orders|shipping/i, match => ` ${match}`),
  }));

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'placed':
        return (
          <Placed
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
      case 'pending':
        return (
          <Pending
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
      case 'processed':
        return (
          <Proccesed
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
      case 'onshipping':
        return (
          <OnShipping
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
      case 'arrivedorders':
        return (
          <ArrivedOrders
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
      case 'cancelledorders':
        return (
          <CancelledOrders
            navigation={navigation}
            token={token}
            index={index}
            countryCode={countryCode}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <SkeletonPlaceholder.Item
                  width={'80%'}
                  height={50}
                  borderRadius={10}
                />
                <SkeletonPlaceholder.Item
                  width={'20%'}
                  height={50}
                  borderRadius={10}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
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
          <View
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
          </View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            swipeEnabled={false}
            onIndexChange={setIndex}
            style={{flex: 1}}
            initialLayout={{width: layout.width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{
                  backgroundColor: Color.white,
                  height: 50,
                  marginBottom: 10,
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
                  backgroundColor: Color.black,
                  height: '100%',
                  borderRadius: 50,
                }}
                activeColor={Color.white}
                inactiveColor={Color.cloudyGrey}
                renderLabel={({route, focused, color}) => (
                  <View
                    style={{
                      backgroundColor: focused ? Color.black : Color.white,
                      borderRadius: 25,
                    }}>
                    <Text
                      style={{color, fontSize: 14, fontFamily: Manrope.Bold}}>
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
