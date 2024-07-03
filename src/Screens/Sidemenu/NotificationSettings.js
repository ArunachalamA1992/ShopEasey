//import liraries
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
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-native-paper';

// create a component
const NotificationSettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [statusClick, setStatusClick] = useState('Email');
  // *********************   EMAIL *********************//
  const [isOrderSwitchOn, setIsOrderSwitchOn] = useState(false);
  const [isProSwitchOn, setIsProSwitchOn] = useState(false);
  const [isNewsSwitchOn, setIsNewsSwitchOn] = useState(false);

  // *********************   SMS *********************//
  const [isSMSOrderSwitchOn, setIsSMSOrderSwitchOn] = useState(false);
  const [isSMSProSwitchOn, setIsSMSProSwitchOn] = useState(false);
  const [isSMSNewsSwitchOn, setIsSMSNewsSwitchOn] = useState(false);

  // *********************   WHATSAPP *********************//
  const [isWHATSOrderSwitchOn, setIsWHATSOrderSwitchOn] = useState(false);
  const [isWHATSProSwitchOn, setIsWHATSProSwitchOn] = useState(false);
  const [isWHATSNewsSwitchOn, setIsWHATSNewsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Color.white,
          }}>
          <TouchableOpacity
            onPress={() => {
              setStatusClick('Email');
            }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: statusClick == 'Email' ? 18 : 16,
                color: statusClick == 'Email' ? Color.primary : Color.black,
                fontFamily: Manrope.Bold,
                letterSpacing: 0.5,
                paddingVertical: 15,
              }}>
              Email
            </Text>
            <View
              style={{
                width: '100%',
                height: 3,
                marginVertical: 5,
                backgroundColor:
                  statusClick == 'Email' ? Color.primary : Color.softGrey,
                borderRadius: 30,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setStatusClick('SMS');
            }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: statusClick == 'SMS' ? 18 : 16,
                color: statusClick == 'SMS' ? Color.primary : Color.black,
                fontFamily: Manrope.Bold,
                letterSpacing: 0.5,
                paddingVertical: 15,
              }}>
              SMS
            </Text>
            <View
              style={{
                width: '100%',
                height: 3,
                marginVertical: 5,
                backgroundColor:
                  statusClick == 'SMS' ? Color.primary : Color.softGrey,
                borderRadius: 30,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setStatusClick('Whatsapp');
            }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: statusClick == 'Whatsapp' ? 18 : 16,
                color: statusClick == 'Whatsapp' ? Color.primary : Color.black,
                fontFamily: Manrope.Bold,
                letterSpacing: 0.5,
                paddingVertical: 15,
              }}>
              Whatsapp
            </Text>
            <View
              style={{
                width: '100%',
                height: 3,
                marginVertical: 5,
                backgroundColor:
                  statusClick == 'Whatsapp' ? Color.primary : Color.softGrey,
                borderRadius: 30,
              }}></View>
          </TouchableOpacity>
        </View>

        {statusClick == 'Email' ? (
          <View style={{ width: '100%', backgroundColor: '#F5F6FA' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  Order Updates
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Your order has been updated! Check the app for the latest status and delivery details.
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isOrderSwitchOn}
                  onValueChange={setIsOrderSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  Promotional Offers
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Exciting deals just for you! Open the app to discover our latest promotional offers and save big today!
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isProSwitchOn}
                  onValueChange={setIsProSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  News and Updates
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Stay informed! Check out the latest news and updates in the app now to stay ahead of the curve.
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isNewsSwitchOn}
                  onValueChange={setIsNewsSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>
          </View>
        ) : null}
        {statusClick == 'SMS' ? (
          <View style={{ width: '100%', backgroundColor: '#F5F6FA' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  Order Updates
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Your order has been updated! Check the app for the latest status and delivery details.
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isSMSOrderSwitchOn}
                  onValueChange={setIsSMSOrderSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, padding: 10, marginVertical: 10 }}>
              <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', }}>
                <Text style={{ fontSize: 16, textAlign: 'justify', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, padding: 3 }}>Notification updates</Text>
                <Text style={{ fontSize: 14, textAlign: 'justify', color: Color.cloudyGrey, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22, padding: 3 }}>You have new notifications! Open the app to see the latest updates and stay informed about important activities.</Text>
              </View>
              <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Switch value={isSMSProSwitchOn} onValueChange={setIsSMSProSwitchOn} color={Color.primary} />
              </View>
            </View>


            {/*     <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, padding: 10, marginVertical: 10 }}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 16, textAlign: 'justify', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, padding: 3 }}>News and Updates</Text>
                                <Text style={{ fontSize: 14, textAlign: 'justify', color: Color.cloudyGrey, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22, padding: 3 }}>Stay informed at every step of your order journey, from confirmation to delivery</Text>
                            </View>
                            <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                            </View>
                        </View> */}
          </View>
        ) : null}
        {statusClick == 'Whatsapp' ? (
          <View style={{ width: '100%', backgroundColor: '#F5F6FA' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  Order Updates
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Your order has been updated! Check the app for the latest status and delivery details.
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isWHATSOrderSwitchOn}
                  onValueChange={setIsWHATSOrderSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    letterSpacing: 0.5,
                    padding: 3,
                  }}>
                  Promotional Offers
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                    letterSpacing: 0.5,
                    lineHeight: 22,
                    padding: 3,
                  }}>
                  Exciting deals just for you! Open the app to discover our latest promotional offers and save big today!
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Switch
                  value={isWHATSProSwitchOn}
                  onValueChange={setIsWHATSProSwitchOn}
                  color={Color.primary}
                />
              </View>
            </View>

            {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: Color.white, padding: 10, marginVertical: 10 }}>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 16, textAlign: 'justify', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, padding: 3 }}>News and Updates</Text>
                                <Text style={{ fontSize: 14, textAlign: 'justify', color: Color.cloudyGrey, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22, padding: 3 }}>Stay informed at every step of your order journey, from confirmation to delivery</Text>
                            </View>
                            <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                            </View>
                        </View> */}
          </View>
        ) : null}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
});

//make this component available to the app
export default NotificationSettings;
