import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import StepIndicator from 'react-native-step-indicator';
import FOIcon from 'react-native-vector-icons/Fontisto';
import {Button} from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import {ItemCardHorizontal} from '../../Components/ItemCard';

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  separatorStrokeDasharray: '2 2',
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.black,
  labelSize: 15,
  currentStepIndicatorSize: 30,
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

const steps = [
  {label: 'Order Confirmation', date: '03 June 2024'},
  {label: 'Order Delivered', date: '04 June 2024'},
];

const renderLabel = ({position, stepStatus, label, currentPosition}) => {
  return (
    <View style={styles.labelContainer}>
      <Text
        style={[
          styles.label,
          {
            color:
              position === currentPosition
                ? customStyles.currentStepLabelColor
                : customStyles.labelColor,
          },
        ]}>
        {label}
      </Text>
      <Text
        style={[
          styles.date,
          {
            color:
              position === currentPosition
                ? customStyles.currentStepLabelColor
                : customStyles.labelColor,
          },
        ]}>
        {steps[position].date}
      </Text>
    </View>
  );
};

const DeliveredOrder = ({navigation, route}) => {
  const [orderData] = useState(route.params.orderData);
  const [loading, setLoading] = useState(false);
  const bgcolor = common_fn.getColorName(orderData?.variants?.color);
  const [pdfPath, setPdfPath] = useState(null);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => {
      setLoading(false);
    });
  }, []);

  const getData = async () => {
    try {
      var top_picks_data = `project=top-picks`;
      const top_picks = await fetchData.list_products(top_picks_data, token);
      setRecommended(top_picks?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 10, backgroundColor: Color.white}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: Color.white,
            }}>
            {orderData?.variants?.productImages?.length > 0 ? (
              <Image
                source={{uri: orderData?.variants?.productImages?.[0]?.image}}
                style={{
                  width: 100,
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            ) : (
              <Image
                source={{uri: Media.no_image}}
                style={{
                  width: 100,
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
            <View style={{flex: 1, marginHorizontal: 10}}>
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
                  Order ID #{orderData?.order?.id}
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
                  {orderData?.status}
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
                {orderData?.variants?.size != '' && (
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
                      {orderData?.variants?.size}
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              padding: 10,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E7F7EC',
              borderWidth: 1,
              borderColor: '#7BD299',
              borderRadius: 5,
            }}>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'truck-outline'}
              icon_size={25}
              icon_color={Color.black}
            />
            <Text
              style={{
                fontSize: 12,
                color: Color.black,
                paddingHorizontal: 10,
                fontFamily: Manrope.Medium,
              }}>
              Delivered on 04 JUNE 2024 ( Free Delivery )
            </Text>
          </View>
        </View>
        <View
          style={{marginTop: 10, padding: 10, backgroundColor: Color.white}}>
          <View
            style={{
              marginTop: 10,
              height: 140,
              borderWidth: 1,
              borderColor: Color.lightgrey,
              padding: 10,
              borderRadius: 10,
            }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={2}
              stepCount={2}
              labels={steps.map(step => step.label)}
              direction="vertical"
              renderStepIndicator={({position, stepStatus}) => {
                switch (stepStatus) {
                  case 'finished':
                    return (
                      <FOIcon
                        name="radio-btn-active"
                        size={20}
                        color={Color.primary}
                      />
                    );
                }
              }}
              renderLabel={renderLabel}
            />
            {/* <Divider style={{height: 1, marginVertical: 10}} /> */}
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
              <Icon name="chevron-forward" size={18} color={Color.primary} />
            </TouchableOpacity> */}
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('OrderReview', {orderData});
          }}
          style={{
            backgroundColor: Color.white,
            borderRadius: 5,
            margin: 10,
            borderWidth: 1,
            borderColor: Color.primary,
          }}
          textColor={Color.primary}>
          Add Reviews
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            const data = common_fn.generatePDF(orderData);
            setPdfPath(data);
          }}
          style={{
            backgroundColor: Color.primary,
            borderRadius: 5,
            margin: 10,
            borderWidth: 1,
            borderColor: Color.primary,
          }}
          textColor={Color.white}>
          Download Invoice
        </Button>
        {/* {pdfPath && (
          <Pdf
            source={{uri: pdfPath}}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
          />
        )} */}
        {recommended?.length > 0 && (
          <View
            style={{
              padding: 10,
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
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Bold,
                }}>
                See more
              </Text>
            </View>
            <FlatList
              data={recommended}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <ItemCardHorizontal item={item} navigation={navigation} />
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveredOrder;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    fontFamily: Manrope.Bold,
  },
  date: {
    fontSize: 12,
    fontFamily: Manrope.Regular,
    marginTop: 2,
  },
});
