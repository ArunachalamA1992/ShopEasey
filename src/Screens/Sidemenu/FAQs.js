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

const FAQs = () => {
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
              source={{uri: Media.faq}}
              style={{
                width: scr_width,
                height: 180,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                1. How can I track my order?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Please click the ‘Track my order’ option under the My Account
                Menu of the Website/App to check the status of your order.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                2. How can I check the delivery options to my location?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                You can verify the delivery availability by entering your
                Pincode in the menu on the product page.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                3. Are the coupons valid? How can I redeem them?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                You can get coupons based on the product you purchase. Please
                tap the ‘Coupons’ option under the My Account Menu of the
                Website/App to claim your coupon.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                4. Does ShopEasey deliver products outside India?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Yes, ShopEasey delivers products in countries like Singapore and
                Malaysia.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                5. What is the Cancellation Policy of ShopEasey?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                You can cancel the ordered product as long as the option for
                cancellation is available on the website/App. Your amount will
                be refunded through the same mode of payment made.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                6. How can I modify my shipping address?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                You can edit the delivery address of your order under the
                ‘Change address’ option. You can find the option under the ‘My
                Account’ Option.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                7. What kind of products are available on ShopEasey?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                ShopEasey includes a lineup of products from categories like
                Clothing, Appliances, Organic items, Pooja items, traditional
                frames, snacks, stationeries, and Silverware. We also include
                authentic products from trusted homemade dealers.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                8. Are the products listed on ShopEasey genuine?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Yes absolutely, ShopEasey includes products from reputed brands
                like Jack & Jones, Butterfly, V-Guard, Preethi, and Louis
                Vuitton to provide high-quality products to our genuine buyers.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                9. What are the benefits of selling my products through
                ShopEasey as a vendor?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                As a product manufacturer/dealer, you can cherish great benefits
                with ShopEasey.Com.We help you sell your products overseas with
                no commission & shipping charge. You can easily make a wide
                range of consumers buy your products.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                10. Do you offer product reviews?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Yes, you may read millions of consumer reviews provided on our
                website. Our customer reviews can provide you with more details
                regarding the functionality and quality of products.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                11. What happens if the customer does not accept the order at
                the time of delivery?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                The quantity of products, the distance, and the delivery date
                are used to determine the delivery charges.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                12. How do delivery fees get determined?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                The quantity of products, the distance, and the delivery date
                are used to determine the delivery charges.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                13. What happens if the recipient is unavailable when the
                delivery is made?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                The delivery partner will attempt a second delivery on the next
                business day if the customer is away for the delivery.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                14. How can I edit or modify my bank accounts?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Your bank account information is editable under the ‘My Account’
                tab.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                15. Where can I find the details of my bank account and billing
                address?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                You can check the information available under the ‘My Account’
                tab.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                16. When can I expect my refund?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Refunds for items canceled before shipment are handled right
                away. Once the delivery partner acknowledges the return of the
                item or items, the reimbursement will be handled if the purchase
                has been dispatched and delivered.
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                If in the unlikely event, the amount is not credited by the
                scheduled date, you can click the 'Help Centre’ option on our
                website to contact our customer care team with any questions or
                concerns.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                17. The right amount of my refund has not been issued. How
                should I proceed?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Please use the 'Need Help' button on our website to contact our
                customer support team with any questions or concerns you may
                have if you don't receive the appropriate amount.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                18. Does ShopEasey impose GST on placed orders?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                All product prices on ShopEasey include GST.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                19. What is ShopEasey's Return Policy?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                Before completing an order, please be sure to review the product
                listing page's amended Returns Policy. For further details
                regarding ShopEasey's Returns Policy, check our website.
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                20. What are the methods available for payments?
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Medium,
                  letterSpacing: 0.5,
                  textAlign: 'justify',
                  lineHeight: 25,
                }}>
                For orders placed through the app, ShopEasey provides a variety
                of payment options. This comprises:
              </Text>
            </View>

            <View style={{width: '95%', marginVertical: 10}}>
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
                    color: Color.lightBlack,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 22,
                  }}>
                  Cash on Delivery (COD)
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
                    color: Color.lightBlack,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 22,
                  }}>
                  Debit/Credit card
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
                    color: Color.lightBlack,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 22,
                  }}>
                  Net Banking
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
                    color: Color.lightBlack,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 22,
                  }}>
                  Digital Wallets (PhonePe and Paytm)
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
                    color: Color.lightBlack,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 22,
                  }}>
                  UPI (PhonePe, Google Pay, Paytm)
                </Text>
              </View>
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
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 0}}>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                letterSpacing: 0.5,
                color: 'black',
                fontWeight: '800',
                fontFamily: Manrope.SemiBold,
                paddingVertical: 5,
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
                  fontFamily: Manrope.SemiBold,
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
              marginVertical: 10,
              marginBottom: 30,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default FAQs;
