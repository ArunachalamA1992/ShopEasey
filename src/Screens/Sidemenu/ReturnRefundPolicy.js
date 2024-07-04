//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Media } from '../../Global/Media';
import { scr_width } from '../../Utils/Dimensions';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';

const aboutData = [
  {
    id: '0',
    abt_title: 'Fill details online',
    abt_subText: 'Fill in your details in a fully customized legal template',
  },
];

// create a component
const ReturnRefundPolicy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

  function renderHeaderItem() {
    try {
      return (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: scr_width }}>
            <Image
              source={{ uri: Media.returnrefund }}
              style={{
                width: scr_width,
                height: 220,
                resizeMode: 'contain',
              }}
            />
          </View>

          <Text
            style={{
              width: '100%',
              paddingHorizontal: 5,
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Manrope.SemiBold,
              paddingVertical: 20,
              textAlign: 'justify',
              letterSpacing: 0.5,
              lineHeight: 25,
            }}>
            Before the ShopEasey Guarantee Period ends, as specified in the
            Terms of Service, Buyer may request a refund and/or return of the
            purchased items (the "Item"), subject to the terms and conditions in
            this Refunds and Return Policy and the Terms of Service.
          </Text>
          <View style={{ width: '95%', padding: 10 }}>
            <Text
              style={{
                width: '100%',
                fontSize: 18,
                color: Color.black,
                fontFamily: Manrope.Bold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              Return and Refund Policy
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                color: Color.lightBlack,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
                paddingVertical: 10,
              }}>
              1. Request Notification
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 25,
              }}>
              If your order is still being delivered within 15 days, you can
              apply for a return or replacement. Once we receive your request
              for both return and replacement, we will notify you within 2 to 3
              business days via email or phone call.
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 25,
              }}>
              You may only request a refund or return of the item under the
              following conditions:
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
                iconstyle={{ marginTop: 0 }}
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
                If the item is not delivered
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
                iconstyle={{ marginTop: 0 }}
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
                If the item delivered is broken or faulty;
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
                iconstyle={{ marginTop: 0 }}
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
                If the item is not complete (it lacks attachments or the
                necessary number);
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
                iconstyle={{ marginTop: 0 }}
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
                If the item delivered does not match the agreed-upon
                specification (e.g., it is the incorrect size, color, etc.); It
                significantly differs from the Seller's description in the
                item's listing;{' '}
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
                iconstyle={{ marginTop: 0 }}
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
                The item received is a fake one;
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
                iconstyle={{ marginTop: 0 }}
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
                The item is defective (e.g., malfunctions, does not function as
                intended); the item has physical damage (e.g., dented,
                scratched, shattered);
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
                iconstyle={{ marginTop: 0 }}
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
                expired goods; or
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
                iconstyle={{ marginTop: 0 }}
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
                empty or suspicious packages.
              </Text>
            </View>
          </View>

          <View style={{ width: '95%', padding: 10 }}>
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
              2. Requirements for Returning
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 25,
              }}>
              You must make sure the item is returned unused and with its tag
              (if any) still attached to receive a refund or change of mind.
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
                iconstyle={{ marginTop: 0 }}
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
                Returns must be made for items in their original, undamaged
                packing, with shrink wrap and seals still in place.
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
                iconstyle={{ marginTop: 0 }}
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
                Returning all accessories, manuals, and tags that came with the
                purchase is also required;
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
                iconstyle={{ marginTop: 0 }}
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
                For Clothing and other wearables: Items ought to be clean,
                unwashed, unworn (apart from try-on sessions), and free of wear
                or use indicators.
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
                iconstyle={{ marginTop: 0 }}
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
                Products for health and beauty must be as good as new and in
                their original packaging.
              </Text>
            </View>
          </View>

          <View style={{ width: '95%', padding: 10 }}>
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
              3. Liability for Both Returned and Forwarded Shipping Charges
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
                iconstyle={{ marginTop: 0 }}
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
                If the seller makes an unintentional mistake (i.e., delivers an
                incomplete, damaged, or incorrect item), the seller will pay the
                customer's forward and return shipping costs.
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
                iconstyle={{ marginTop: 0 }}
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
                If the buyer decides to alter their mind, they must first obtain
                the seller's approval, depending on the type of item. The cost
                of return shipping will be borne by the vendor.
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
                iconstyle={{ marginTop: 0 }}
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
                ShopEasey will decide who is responsible for the return shipping
                cost at its sole discretion if the vendor and the buyer disagree
                about who should pay the shipping cost.
              </Text>
            </View>
          </View>

          <View style={{ width: '95%', padding: 10 }}>
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
              4. Refund Process
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
                iconstyle={{ marginTop: 0 }}
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
                You will not be refunded until ShopEasey has verified with the
                seller that they have received the returned item.
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
                iconstyle={{ marginTop: 0 }}
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
                ShopEasey reserves the right to return the relevant amount to
                you without informing the Seller again if we don't hear from
                them within the allotted period.
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
                iconstyle={{ marginTop: 0 }}
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
                The refund can be made only through The "Original Payment
                Method" you used when making the first purchase.
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
                iconstyle={{ marginTop: 0 }}
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
                For any reason (including, but not limited to, the Original
                Payment Method's invalidity or inability to process payments),
                ShopEasey will not be able to process the refund using the
                original payment method. You are requested to understand and
                accept that:{' '}
              </Text>
            </View>
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
              (i) ShopEasey may process the refund by issuing ShopEasey vouchers
              (equivalent to the refund amount) within a deadline that is
              specified; and
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
                paddingVertical: 5,
              }}>
              (ii) After ShopEasey issues the vouchers, you will have no more
              rights or claims against ShopEasey regarding the refund.
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
                iconstyle={{ marginTop: 0 }}
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
                If the refund request is approved by us and the necessary
                resources have been sent to you, the required amount will be
                automatically deducted from your balance with respect to the
                Terms and Conditions.
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
                iconstyle={{ marginTop: 0 }}
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
                You can also request a refund if your order is shown as
                ‘Completed’ but have not received it.
              </Text>
            </View>
          </View>

          <View style={{ width: '95%', padding: 10 }}>
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
              5. Buyer-Seller Communication
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
                iconstyle={{ marginTop: 0 }}
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
                If an issue with a transaction comes up, ShopEasey urges Users
                to get in touch with one another (Buyer & Seller).
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
                iconstyle={{ marginTop: 0 }}
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
                Since ShopEasey serves as a platform for user-to-user trade, any
                issues pertaining to the purchased item should be addressed
                directly by buyers and sellers.
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
          <View style={{ width: '100%', alignItems: 'center' }}>
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
                  iconstyle={{ color: Color.primary }}
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
                  iconstyle={{ color: Color.primary }}
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
            style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
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
                  fontFamily: Manrope.SemiBold, paddingVertical: 5
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
          style={{ width: '95%' }}
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
export default ReturnRefundPolicy;
