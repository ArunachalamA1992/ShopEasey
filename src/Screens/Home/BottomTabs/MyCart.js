import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import { Manrope } from '../../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Media } from '../../../Global/Media';
import { BottomSheet } from 'react-native-btr';


const MyCart = () => {
  const navigation = useNavigation();

  const [defaultRating, setDefaultRating] = useState(0);
  const [counter, setCounter] = useState(0);
  const [cartData, setCartData] = useState([
    {
      order_id: '0',
      ordered_id: '#0095',
      ordered_image: Media.tshirt_men_two,
      order_name: 'Blended Cotton Navy Shirt Men',
      order_brand_name: 'Oxford Button',
      order_color: 'Blue',
      order_size: 'M',
      order_quantity: '1',
      order_price: '500.00',
      order_disc_price: '350.00',
      order_stocks_quan: '3',
      qty: 1,
    },
    {
      order_id: '1',
      ordered_id: '#0001',
      ordered_image: Media.tshirt_three,
      order_name: 'Oxford Button-Down Shirt',
      order_brand_name: 'Dress Shirt',
      order_color: 'Yellow',
      order_size: 'M',
      order_quantity: '1',
      order_price: '1500.00',
      order_disc_price: '1200.00',
      order_stocks_quan: '8',
      qty: 1,
    },
    {
      order_id: '2',
      ordered_id: '#002',
      ordered_image: Media.tshirt_four,
      order_name: 'Blended Cotton Navy - Dress Shirt',
      order_brand_name: 'HENLEY',
      order_color: 'Red',
      order_size: 'L',
      order_quantity: '1',
      order_price: '750.00',
      order_disc_price: '500.00',
      order_stocks_quan: '5',
      qty: 1,
    },
    {
      order_id: '3',
      ordered_id: '#003',
      ordered_image: Media.tshirt_one,
      order_name: 'Blended Cotton Navy - Plaid Shirt',
      order_brand_name: 'HALF SLEEVES',
      order_color: 'Purple',
      order_size: 'M',
      order_quantity: '1',
      order_price: '5500.00',
      order_disc_price: '5000.00',
      order_stocks_quan: '7',
      qty: 1,
    },
    {
      order_id: '4',
      ordered_id: '#004',
      ordered_image: Media.tshirt_three,
      order_name: 'HALF SLEEVES T-SHIRTS',
      order_brand_name: 'POLO',
      order_color: 'Blue',
      order_size: 'XL',
      order_quantity: '1',
      order_price: '7000.00',
      order_disc_price: '6000.00',
      order_stocks_quan: '1',
      qty: 1,
    },
  ]);
  const [bottomData, setBottomData] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [ordertotalValue, setOrderTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [refresh, setRefresh] = useState(''); // <- Add if your view not Rerender

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

  const statusColor = (value) => {
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
        return '#CAAA34'; // default color
    }
  }

  const getColor = (value) => {
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
  }


  useEffect(() => {
    // const calculateTotal = () => {
    //   const total = cartData.reduce((sum, item) => sum + item.order_price, 0);
    //   setTotalValue(total);
    // };

    // calculateTotal();
    let totalQuantity = 0;
    let totalPrice = 0;

    cartData.forEach((item) => {
      totalQuantity += item.order_quantity;
      totalPrice += item.order_quantity * item.order_price;
    })
    setTotalQuantity(totalQuantity)
    setTotalValue(totalPrice)

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
    setRefresh(Math.random()); // <- Add if your view not Rerender
  };

  const handleDecrease = (item, index) => {
    const temp = cartData;
    temp[index].qty = temp[index].qty - 1;
    setCartData(temp);
    setRefresh(Math.random()); // <- Add if your view not Rerender
  };


  const renderOrderItem = ({ item, index }) => {
    try {
      let totQuantity = item.order_price * item.qty
      // console.log("Quantity ================= :", item.order_price * item.qty);
      // setOrderTotalValue(totQuantity);
      return (
        <View style={{ width: '95%', alignItems: 'center', backgroundColor: Color.white, marginVertical: 5 }}>
          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.white, paddingVertical: 10 }}>
            <View style={{ width: 150, height: 170, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
              <Image
                source={{ uri: item.ordered_image }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
              <View style={{ width: '100%', }}>
                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>Brand -</Text>
                    <Text style={{ width: '80%', fontSize: 13, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={1}>Polo</Text>
                  </View>
                  <TouchableOpacity onPress={() => sale_toggleBottomView(item)}
                    style={{ flex: 1, padding: 5 }}>
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'delete'}
                      icon_size={22}
                      icon_color={Color.Venus}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ width: '60%', fontSize: 13, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }} numberOfLines={2}>{item.order_name}</Text>
              </View>

              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '36%', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.productDiscountPrice} numberOfLines={1}>$ {item.order_price}</Text>
                  <Text style={styles.productPrice} numberOfLines={1}>${item.order_disc_price}</Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 12, color: '#0FAD45', fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Save 100% OFF</Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Color - </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ paddingHorizontal: 5, fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{item.order_color}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Size - </Text>
                  <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>{item.order_size}</Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Quantity</Text>
                <View style={{ width: 120, height: 35, marginHorizontal: 10, marginTop: 5, borderColor: Color.Venus, borderWidth: 0.5, borderRadius: 5, backgroundColor: Color.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleDecrease(item, index)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, paddingHorizontal: 10 }}>
                    <Iconviewcomponent
                      Icontag={'Feather'}
                      iconname={'minus'}
                      icon_size={18}
                      icon_color={Color.black}
                    />
                  </TouchableOpacity>
                  <View style={{ width: 1, height: '95%', backgroundColor: Color.Venus }}></View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.cloudyGrey, fontFamily: Manrope.SemiBold }}>{item.qty}</Text>
                  </View>
                  <View style={{ width: 1, height: '95%', backgroundColor: Color.Venus }}></View>
                  <TouchableOpacity onPress={() => handleIncrease(item, index)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, paddingHorizontal: 10 }}>
                    <Iconviewcomponent
                      Icontag={'Feather'}
                      iconname={'plus'}
                      icon_size={18}
                      icon_color={Color.black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={{ width: '100%', height: 1, backgroundColor: Color.lightgrey, marginVertical: 10 }}></View> */}
        </View>
      );
    } catch (error) {
      console.log('catch in renderOrder_Item: ', error);
    }
  }

  function sale_toggleBottomView(item) {
    try {
      setBottomData(item)
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
                    iconstyle={{ color: Color.primary, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', alignItems: 'center', backgroundColor: Color.white }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Color.white }}>
                  <View style={{ width: 130, height: 170, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Image
                      source={{ uri: bottomData.ordered_image }}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                      <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>Brand -</Text>
                          <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={1}>{bottomData.order_brand_name}</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 13, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingVertical: 5 }} numberOfLines={2}>{bottomData.order_name}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.productDiscountPrice, { width: '55%' }]} numberOfLines={1}>$ {bottomData.order_price}</Text>
                        <Text style={styles.productPrice} numberOfLines={1}>${bottomData.order_disc_price}</Text>
                      </View>
                      <View style={{ width: '100%', paddingHorizontal: 5 }}>
                        <Text style={{ fontSize: 12, color: '#0FAD45', fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>Save 100% OFF</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 5 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Color - </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ paddingHorizontal: 5, fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{bottomData.order_color}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Size - </Text>
                        <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>{bottomData.order_size}</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Quantity - </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ paddingHorizontal: 5, fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>{bottomData.order_quantity}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => removeItem(bottomData.order_id)} style={{ width: '90%', height: 45, backgroundColor: Color.primary, borderRadius: 45, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Remove Item</Text>
              </TouchableOpacity>

            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  function selectedPrice(item, index) {
    try {
      setSelectName(item.name);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }


  const removeItem = (id) => {
    const newData = cartData.filter(item => item.order_id !== id);
    setCartData(newData);
    setSaleBottomSheetVisible(false)
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.softGrey, alignItems: 'center' }}>
      {/* <View style={{ width: '95%', alignItems: 'center' }}>
        <View style={{ width: '95%', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: Color.mediumGrey }}>
          <View>
            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'truck-delivery'}
              icon_size={20}
              icon_color={Color.lightBlack}
            />
          </View>
          <Text style={{ fontSize: 14, color: Color.lightBlack, paddingHorizontal: 10, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Free Shipping Vouchers with shopeasey</Text>
        </View>
      </View> */}

      <View style={{ flex: 2, width: '100%', alignItems: 'center', marginVertical: 5, }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => renderOrderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            style={{ width: '95%' }}
          />
        </ScrollView>
      </View>
      <View style={{ flex: 0, width: '95%', marginVertical: 5, justifyContent: 'flex-end', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Total Price</Text>
            <Text style={{ fontSize: 18, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>$ {totalValue}</Text>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate("OrderConfirmation")} style={{ width: '100%', height: 50, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Go to checkout</Text>
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
    alignItems: 'center', paddingVertical: 5
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 14,
    marginRight: 5, letterSpacing: 0.5
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.SemiBold,
    fontSize: 11, letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
});


export default MyCart;
