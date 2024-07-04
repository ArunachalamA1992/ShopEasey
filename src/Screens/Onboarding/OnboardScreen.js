import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import fetchData from '../../Config/fetchData';
import { setCountryCode } from '../../Redux';
import { useDispatch } from 'react-redux';
import { getAnalytics } from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';

const OnboardScreen = () => {
  const navigation = useNavigation();

  const [selectname, setSelectName] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const imageScale = new Animated.Value(0.1);
  const dispatch = useDispatch();

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

  const onboardData = async item => {
    try {
      setSelectName(item.country);
      setSelectImage(item.country_image);
      dispatch(setCountryCode(item));
      setSaleBottomSheetVisible(false);
      await AsyncStorage.setItem('countryData', JSON.stringify(item));
    } catch (error) {
      console.log('error', error);
    }
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
                backgroundColor: Color.white,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  padding: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                  }}>
                  Select Country
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSaleBottomSheetVisible(false);
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircle'}
                    icon_size={22}
                    iconstyle={{ color: Color.primary, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              {countryData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item + index}
                    onPress={() => {
                      onboardData(item);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 15,
                      margin: 5,
                      borderRadius: 10,
                      backgroundColor:
                        selectname === item.country ? Color.primary : '#f3f3f3',
                    }}>
                    <Image
                      source={{ uri: item.country_image }}
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color:
                          selectname === item.country
                            ? Color.white
                            : Color.black,
                        marginHorizontal: 10,
                        fontFamily: Manrope.SemiBold,
                      }}>
                      {item.country}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          selectname === item.country
                            ? Color.white
                            : Color.black,
                        marginHorizontal: 10,
                        fontFamily: Manrope.SemiBold,
                      }}>
                      {item.currency_code}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  // Inside your component
  const handleSignUpButtonClick = () => {
    console.log('Log Event Start');
    // Track the "Sign Up" button click event

    getAnalytics().logEvent('bicket', {
      id: '3745092',
      item: 'Mens grey shirt',
      description: ['round neck', 'long sleeved'],
      size: 'L',
    });
    console.log('=========== Log ============ ');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const onboard_data = await fetchData.list_countries({}, null);
      setCountryData(onboard_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        // source={{
        //   uri: 'https://shopeasey.s3.ap-south-1.amazonaws.com/mobile/assets/images/onboard_shop.png',
        // }}
        source={require('../../assets/images/onboard_shop.png')}
        style={styles.image}
      />

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: 330, padding: 10,
          backgroundColor: Color.white,
          borderTopStartRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 20,
              color: Color.black,
              fontFamily: Manrope.ExtraBold,
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
            }}>
            Discover the joy of convenient and secure online shopping with
            Shopeasey, your trusted destination for a vast selection of
            products.
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightBlack,
              fontFamily: Manrope.SemiBold,
            }}>
            Select Your Region
          </Text>

          <TouchableOpacity
            onPress={() => sale_toggleBottomView()}
            style={{
              height: 50,
              marginVertical: 10,
              backgroundColor: Color.white,
              borderColor: Color.lightgrey,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: selectImage }}
                style={{ width: 30, height: 50, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Bold,
                  paddingHorizontal: 10,
                }}>
                {selectname == '' ? 'Select Your Country' : selectname}
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
            onPress={() => {
              if (selectname != '') {
                navigation.navigate('OnboardTwo');
              } else {
                common_fn.showToast('Please Select the Region');
              }
            }}
            disabled={selectname == '' ? true : false}
            style={{
              height: 50,
              marginVertical: 10,
              backgroundColor: selectname != '' ? Color.primary : Color.softGrey,
              borderColor: Color.lightgrey,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.white,
                fontFamily: Manrope.SemiBold,
                textTransform: 'uppercase',
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

export default OnboardScreen;
