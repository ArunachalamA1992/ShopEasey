//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';

// create a component
const OnboardScreen = () => {
  const navigation = useNavigation();

  const [selectname, setSelectName] = useState('India');
  const [selectImage, setSelectImage] = useState(Media.india_flag);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [countryData, setCountryData] = useState([
    {
      id: '0',
      flag_image: Media.india_flag,
      name: 'India',
      sign: 'Indian Ruperr (₹)',
    },
    {
      id: '1',
      flag_image: Media.singapore_flag,
      name: 'Singapore',
      sign: 'Singapore Dollar (SGD)',
    },
    {
      id: '2',
      flag_image: Media.malay_flag,
      name: 'Malaysia',
      sign: 'Malaysian Ringgit (MYR)',
    },
  ]);
  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  function sale_toggleBottomView(type) {
    try {
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
                height: 330,
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
                  Select Country
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

              <View style={{ width: '100%', alignItems: 'center' }}>
                {countryData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item + index}
                      onPress={() => selectedPrice(item)}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15,
                        margin: 7,
                        backgroundColor:
                          selectname === item.name ? Color.primary : '#f3f3f3',
                      }}>
                      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Image
                          source={{ uri: item.flag_image }}
                          style={{ width: 30, height: 30, resizeMode: 'contain' }}
                        />
                      </View>
                      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color:
                              selectname === item.name
                                ? Color.white
                                : Color.black,
                            marginHorizontal: 10,
                            fontFamily: Manrope.Medium,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color:
                              selectname === item.name
                                ? Color.white
                                : Color.black,
                            marginHorizontal: 10,
                            fontFamily: Manrope.Medium,
                          }}>
                          {item.sign}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
      setSelectImage(item.flag_image);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: Media.onboard_main }}
        style={styles.image}
      />

      <View
        style={{
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
          bottom: 0,
          height: 330,
          backgroundColor: Color.white,
          borderTopStartRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{ width: '95%', padding: 10 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 20,
              color: Color.black,
              fontFamily: Manrope.ExtraBold,
              paddingHorizontal: 10,
              paddingVertical: 5,
              letterSpacing: 1,
            }}>
            Hello!
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Medium,
              paddingHorizontal: 10,
              lineHeight: 22,
            }}>
            Discover the joy of convenient and secure online shopping with
            Shopeasey, your trusted destination for a vast selection of
            products.
          </Text>
        </View>
        <View style={{ width: '95%', padding: 10 }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              lineHeight: 22,
            }}>
            Select Your Region
          </Text>

          <TouchableOpacity
            onPress={() => sale_toggleBottomView()}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
              backgroundColor: Color.white,
              borderColor: Color.lightgrey,
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={{ uri: selectImage }}
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                {selectname}
              </Text>

              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'chevron-small-down'}
                icon_size={24}
                iconstyle={{ color: Color.lightBlack, marginRight: 10 }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('OnboardTwo')}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
              backgroundColor: Color.primary,
              borderColor: Color.lightgrey,
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.white,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                lineHeight: 22, textTransform: 'uppercase'
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {sale_BottomSheetmenu()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  image: {
    width: scr_width,
    height: scr_height,
    resizeMode: 'cover',
  },
});

//make this component available to the app
export default OnboardScreen;
