import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';
import {useDispatch} from 'react-redux';
import {setOnBoardVisible} from '../../Redux';

const OnboardTwo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image source={{uri: Media.welcome}} style={styles.image} />
      </View>
      <View
        style={{
          marginVertical: 20,
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: Color.black,
              fontFamily: Manrope.ExtraBold,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            Welcome to Shopeasey
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: Color.cloudyGrey,
              fontFamily: Manrope.Medium,
              paddingHorizontal: 10,
            }}>
            Discover the joy of convenient and secure online shopping with
            Shopeasey.
          </Text>
        </View>
        <View style={{alignItems: 'center', padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                backgroundColor: '#F0F9FB',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginHorizontal: 5,
              }}>
              {/* <Image
                source={{uri: Media.coupon_icon}}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              /> */}
              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'truck-fast'}
                icon_size={22}
                iconstyle={{color: Color.primary}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}>
                Secure Delivery
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                backgroundColor: '#F0F9FB',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginHorizontal: 5,
              }}>
              <Image
                source={{uri: Media.voucher_icon}}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}>
                Voucher
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: '60%',
                flexDirection: 'row',
                backgroundColor: '#F0F9FB',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginHorizontal: 5,
              }}>
              {/* <Image
                source={{uri: Media.van_icon}}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              /> */}

              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'customerservice'}
                icon_size={22}
                iconstyle={{color: Color.primary}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}>
                Support 24/7
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F0F9FB',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Image
                source={{ uri: Media.van_icon }}
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}>
                Free Shipping
              </Text>
            </View>
          </View> */}
        </View>
      </View>
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setOnBoardVisible(true));
            navigation.navigate('Auth');
          }}
          style={{
            // width: '90%',
            height: 50,
            flexDirection: 'row',
            marginVertical: 10,
            backgroundColor: Color.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
            Sign in{' '}
          </Text>
          <Iconviewcomponent
            Icontag={'AntDesign'}
            iconname={'arrowright'}
            icon_size={22}
            iconstyle={{color: Color.white, paddingHorizontal: 5}}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            height: 50,
            marginVertical: 10,
            backgroundColor: Color.white,
            borderColor: Color.cloudyGrey,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            dispatch(setOnBoardVisible(true));
            navigation.replace('TabNavigator');
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
              lineHeight: 22,
              textTransform: 'uppercase',
            }}>
            Continue as guest
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  image: {
    width: scr_width,
    height: scr_height,
    resizeMode: 'contain',
  },
});

export default OnboardTwo;
