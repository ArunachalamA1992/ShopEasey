//import liraries
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Linking,
} from 'react-native';
import Color from '../../Global/Color';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Media} from '../../Global/Media';
import {scr_width} from '../../Utils/Dimensions';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';

const aboutData = [
  {
    id: '0',
    abt_title: 'Fill details online',
    abt_subText: 'Fill in your details in a fully customized legal template',
  },
];

// create a component
const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: scr_width}}>
            <Image
              source={{uri: Media.privacy}}
              style={{
                width: scr_width,
                height: 220,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={{width: '95%', padding: 10, paddingVertical: 20}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              PRIVACY POLICY - GENERAL
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We furnish the general privacy terms for you to have an in-depth
                glance.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We collect personal information like your contact, billing,
                credit, and profile details.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We utilize privacy information for business objectives like
                completing transactions, billing products, responding to service
                requests, and protecting our assets.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We do not furnish your personal information to any third parties
                until they get recognized under our terms & conditions. We use a
                variety of physical or digital protocols to
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                protect your personal information.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We implement reasonable methods to delete your personal
                information when we no longer need it.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              Access and choice
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We use website cookies and other secured technologies to
                restrict children below 13 years.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We implement best practices for location-based services
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We might provide access to location-based information to enable
                third parties to deliver you the required service.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                You can modify your contact information on our website by
                accessing the profile.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                You can delete the information that is not mandatory to us by
                logging into your profile on our website.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', padding: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: '#333',
                fontFamily: Manrope.SemiBold,
                fontWeight: '800',
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              Frequent updates
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={20}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                We keep changing these privacy policies from period to period
                and you should always stay tuned with us to know the latest
                changes.
              </Text>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
    }
  }

  function renderFooterItem(item, index) {
    try {
      return (
        <View
          style={{
            width: '95%',
            padding: 10,
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                letterSpacing: 0.5,
                color: 'black',
                fontWeight: '800',
                fontFamily: Manrope.SemiBold,
              }}>
              Contact Us
            </Text>

            <Text
              style={{
                width: '100%',
                paddingHorizontal: 10,
                fontSize: 13,
                color: Color.cloudyGrey,
                fontFamily: Manrope.Regular,
                textAlign: 'justify',
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>
            <Text
              style={{
                width: '100%',
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.lightBlack,
                paddingTop: 10,
                fontFamily: Manrope.SemiBold,
                textAlign: 'justify',
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              13/8, 13th Cross Street Shastri Colony, Chromepet, Chennai, Tamil
              Nadu 600044, India
            </Text>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}
              onPress={() => {
                Linking.openURL('tel:9629332301');
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={14}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  letterSpacing: 0.5,
                  fontFamily: Manrope.SemiBold,
                  paddingHorizontal: 10,
                }}>
                (+91) 9629-332-301
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                Linking.openURL('mailto:info@shopeasey.com');
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={14}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 16,
                  letterSpacing: 0.5,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  paddingHorizontal: 10,
                }}>
                info@shopeasey.com
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.softGrey,
              paddingVertical: 2,
              marginVertical: 20,
            }}></View>
          <View
            style={{width: '95%', flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 0,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E6F5F8',
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: Color.primary,
              }}>
              <Image
                source={require('../../assets/logos/main_logo.png')}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  width: '95%',
                  fontSize: 18,
                  textAlign: 'justify',
                  color: Color.primary,
                  letterSpacing: 0.5,
                  fontFamily: Manrope.SemiBold,
                  paddingVertical: 5,
                }}>
                Shop Easey
              </Text>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                }}
                numberOfLines={2}>
                India’s No.1 Trade is now a Superband
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.softGrey,
              paddingVertical: 2,
              marginVertical: 20,
            }}></View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginVertical: 0,
            }}>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AboutUs')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsandConditions')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://shopeasey.com/')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: Manrope.Regular,
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                    letterSpacing: 0.5,
                  }}>
                  Website
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderFooterItem's Free_rental : ", error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Color.primary}
        translucent={false}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      {/* {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            } */}

      <View
        style={{
          width: '100%',
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <FlatList
          data={aboutData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // width: scr_width,
    // height: scr_height,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default PrivacyPolicy;
