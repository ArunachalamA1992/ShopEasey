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
  NativeModules,
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
const TermsandConditions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);

  const callbackSuccess = (type, code, message) => {
    console.log('callback', type, code, message);
  };

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            source={{uri: Media.terms}}
            style={{
              width: scr_width,
              height: 220,
              resizeMode: 'contain',
            }}
          />

          <View style={{width: '100%', paddingTop: 20}}>
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
              1. INTRODUCTION
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 25,
                }}>
                1.1 We are ADRI SERVICES (MALAYSIA COMPANY REGISTRATION NO :
                202303210594 / 00352291-V), having our business address at 25,
                Jalan Ronggeng 13, Taman Nesa Skudai, Skudai Baru, 81300 Johor
                Bahru, Johor and ADRI ONLINE SHOPPEE PRIVATE LIMITED (INDIA
                CORPORATE IDENTITY NUMBER: U46109TN2023PTC164027, having our
                business address at No. 13/8, New Colony Lake Area, Chrompet
                Sriperumbudur Tiruneemalai Kanchipuram – 600044 Tamil Naidu
                (“SHOPEASEY”).
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  1.2
                  <Text
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    By using the services or opening an account, you signify
                    your irrevocable acceptance of these terms of use. If you do
                    not agree to these terms, please do not use our services or
                    access the platform. If you are below 18 years old or the
                    relevant{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      “age of majority”
                    </Text>{' '}
                    where you live, you must get permission from a parent or
                    legal guardian to open an account and that parent or legal
                    guardian must agree to these terms of use. if you do not
                    know whether you have reached the{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      “age of majority”
                    </Text>{' '}
                    where you live, or do not understand this clause 1.2, please
                    do not create an account until you have asked your parent or
                    legal guardian for help. if you are the parent or legal
                    guardian of a minor who is creating an account, you must
                    accept these terms of service on the minor's behalf and you
                    will be responsible for all use of the account or services,
                    including any transaction made by the minor, whether the
                    minor's account is now open or created later and whether or
                    not the minor is supervised by you during his or her use of
                    our services.
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  1.3
                  <Text
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    We reserve the right at all times, at our sole discretion,
                    to revise these Terms of Use without providing you any
                    notice prior to the effective date of the revision. Your
                    continued use of the Services, this Platform and/or your
                    registration of an Account after the effective date of the
                    revision shall constitute irrevocable acceptance of these
                    Terms of Use and any such revisions.
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  1.4
                  <Text
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    You must read and accept all of the terms and conditions in,
                    and linked to, these Terms of Use.
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  1.5
                  <Text
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    <Text
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    reserves the right to refuse to provide you access to{' '}
                    <Text
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    Platform or Services or to allow you to open an Account for
                    any reason.
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  1.6
                  <Text
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    These Terms of Use are solely for the use of{' '}
                    <Text
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>
                    . The Terms of Use herein are our copyrighted intellectual
                    property. Any of the third parties, even on the extracts of
                    our Terms of Use, for commercial purpose of offering goods
                    and / or services is not permitted.Infringements may be
                    subject to legal action.
                  </Text>
                </Text>
              </View>
            </View>

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
                marginTop: 10,
              }}>
              2. SERVICES
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  2.1 We provide an online platform service for the sale of
                  goods between the buyer (“Buyer”) and the seller (“Seller”)
                  (collectively “you”, “Users” or “Parties”). The actual
                  contract for sale is directly between Buyer and Seller and
                  SHOPEASEY
                </Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 25,
                }}>
                is not a party to that or any other contract between Buyer and
                Seller and accepts no obligations in connection with any such
                contract. Parties to such transaction will be entirely
                responsible for the sales contract between them, the listing of
                goods, warranty of purchase and the like.
                <Text
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  (“SHOPEASEY”).
                </Text>
                <Text
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  is not involved in the transaction between Users.
                </Text>
              </Text>
            </View>

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
                marginTop: 10,
              }}>
              3. ACCOUNTS AND SECURITY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 15,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  3.1 Some functions of our Services require registration for an
                  Account by selecting a unique user identification ("User ID")
                  and password, and by providing certain personal information.
                  If you select a User ID that SHOPEASEY,
                </Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 25,
                }}>
                {' '}
                in its sole discretion, finds offensive or inappropriate,{' '}
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  {' '}
                  SHOPEASEY
                </Text>{' '}
                has the right to suspend or terminate your Account.
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  3.2{' '}
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    You agree to (a) keep your password confidential and use
                    only your User ID and password when logging in, (b) ensure
                    that you log out from your account at the end of each
                    session on{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>
                    , (c) immediately notify{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    of any unauthorised use of your Account, User ID and/or
                    password, and (d) ensure that your Account information is
                    accurate and up-to-date. You are fully responsible for all
                    activities that occur under your User ID and Account even if
                    such activities or uses were not committed by you.{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    will not be liable for any loss or damage arising from
                    unauthorised use of your password or your failure to comply
                    with this Section.
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  3.3{' '}
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    You agree that{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      SHOPEASEY
                    </Text>{' '}
                    may for any reason, in its sole discretion and with or
                    without notice or liability to you, immediately suspend,
                    freeze or terminate your Account and your User ID. Grounds
                    for such actions include, but are not limited to, (a)
                    extended periods of inactivity, as determined by us from
                    time to time, (b) violation of these Terms of Use, (c)
                    illegal, fraudulent, harassing, defamatory, threatening or
                    abusive behaviour (d) having multiple user accounts, (e)
                    buying products on{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    for the purpose of commercial re-sale, (f) abnormal or
                    excessive purchase of products from the same Seller or
                    related group of Sellers, or (g) behaviour that is harmful
                    to other Users, third parties, or the business interests of{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>
                    . Use of an Account for illegal, fraudulent, harassing,
                    defamatory, threatening or abusive purposes may be referred
                    to law enforcement authorities without notice to you. If a
                    legal dispute arises or law enforcement action is commenced
                    relating to your Account or your use of the Services for any
                    reason,{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      {' '}
                      SHOPEASEY
                    </Text>{' '}
                    may terminate your Account immediately with or without
                    notice.
                  </Text>
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              4. RETURNS POLICY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 15,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  4.1 If you are not completely satisfied with your purchase,
                  you may return the item(s) within three (3) days from the date
                  of receipt to the Seller.The item(s) shall be unused, item
                  tags shall not be tampered with, and the item(s) shall be in
                  the original brand packaging (if applicable). You shall also
                  ensure that the item(s) is / are sent in the same condition as
                  it was when received by you and is packaged properly.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  4.2 You may return the item(s) under the following
                  circumstances:-
                </Text>
              </View>
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
                The item was defective and / or damaged on delivery;
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
                The item received is incomplete (missing quantity or
                accessories);
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
                The Seller has delivered an Item that does not match the agreed
                specification (e.g. wrong size, colour, etc.) to You;
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
                The Item delivered to You is materially different from the
                description provided by Seller in the listing of the Item; and
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
                The Item received has physical damage (e.g. dented, scratched,
                shattered)
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  4.3 SHOPEASEY
                  <Text
                    style={{
                      width: '100%',
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Regular,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    shall bear the cost of return of item(s) by you to the
                    respective Seller.
                  </Text>
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              5. REFUNDS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    5.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    You will only be refunded after SHOPEASEY
                  </Text>{' '}
                  has received the confirmation from Seller that Seller has
                  received the returned item. The refund may be made to Buyer’s
                  credit/debit card or designated bank account, whichever is
                  applicable. In the event where{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    SHOPEASEY
                  </Text>{' '}
                  does not hear from Seller within a specified time,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    SHOPEASEY
                  </Text>{' '}
                  is not obliged to refund the applicable sum to Buyer
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              6. COMMUNICATION BETWEEN BUYER AND SELLER
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    6.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  encourages Users to communicate with each other in the event
                  where problem arises in a transaction.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  is a platform for Users to conduct trading, Buyer should
                  contact Seller directly for any issue relating to the item
                  purchased.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              7. PROHIBITIONS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    7.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    You must not misuse SHOPEASEY
                  </Text>{' '}
                  You shall not use any automated systems or software to extract
                  data from{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  for any purpose. You shall not commit or encourage a criminal
                  offence, transmit or distribute a virus including but not
                  limited to Trojan horse, worm, logic bomb or post any other
                  material on the Platform which is malicious, technologically
                  harmful, in breach of confidence or in any way offensive or
                  obscene; hack into; corrupt data; cause annoyance to other
                  users; infringe upon the rights of any other person’s
                  proprietary rights; send any unsolicited advertising or
                  promotional material; or attempt to affect the performance or
                  functionality of any computer facilities of or accessed
                  throughout{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  . Any breach of this provision would constitute an offence
                  under Section 233 of the Communications and Multimedia Act
                  1998. In the event such breach occurs,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  will report the breach to the relevant law enforcement
                  authorities and appropriate legal action will be taken.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              8. DISCLAIMERS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    8.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    The services are provided "as is" and without any
                    warranties, claims or representations made by SHOPEASEY
                  </Text>{' '}
                  of any kind either expressed, implied or statutory with
                  respect to the services, including, without limitation,
                  warranties of quality, performance, non-infringement,
                  merchantability, or fitness for a particular purpose, nor are
                  there any warranties created by course of dealing, course of
                  performance or trade usage. without limiting the foregoing and
                  to the maximum extent permitted by applicable law,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  does not warrant that the services, this site or the functions
                  contained therein will be available, accessible,
                  uninterrupted, timely, secure, accurate, complete or
                  error-free, that defects, if any, will be corrected, or that
                  this site and/or the server that makes the same available are
                  free of viruses, clocks, timers, counters, worms, software
                  locks, drop dead devices, trojan-horses, routings, trap doors,
                  time bombs or any other harmful codes, instructions, programs
                  or components.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    8.2{' '}
                  </Text>
                  You acknowledge that the entire risk arising out of the use or
                  performance of the site and/or the services remains with you
                  by applicable law.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    8.3{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  has no control over and, to the maximum extent permitted by
                  applicable law, does not guarantee or accept any
                  responsibility for: (a) the fitness for purpose, existence,
                  quality, safety or legality of items available via the
                  services; or (b) the ability of sellers to sell items or of
                  buyers to pay for items. if there is a dispute involving one
                  or more users, such users agree to resolve such dispute
                  between themselves directly and, to the maximum extent
                  permitted by applicable law, release{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  from any and all claims, demands and damages arising out of or
                  in connection with any such dispute.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              9. DISPUTES
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    9.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    In the event a problem arises in a transaction, the Buyer
                    and Seller agree to communicate with each other first to
                    attempt to resolve such dispute by mutual discussions, which
                    SHOPEASEY{' '}
                  </Text>
                  shall use reasonable commercial efforts to facilitate. If the
                  matter cannot be resolved by mutual discussions, Users may
                  approach the claims tribunal of their local jurisdiction to
                  resolve any dispute arising from a transaction.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    9.2{' '}
                  </Text>
                  Each Buyer and Seller covenants and agrees that it will not
                  bring suit or otherwise assert any claim against{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  in relation to any transaction made on the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  or any dispute related to such transaction.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    9.3{' '}
                  </Text>
                  Users may send written request to{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  to assist them in resolving issues which may arise from a
                  transaction upon request.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may, at its sole discretion and with absolutely no liability
                  to Seller and Buyer, take all necessary steps to assist Users
                  in resolving their dispute.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              10. FEEDBACK
            </Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    10.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  welcomes information and feedback from our Users which will
                  enable{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  to improve the quality of service provided.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              11. YOUR REPRESENTATIONS AND WARRANTIES
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              11.1 You represent and warrant that:-
            </Text>

            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              a) You possess the legal capacity (and in the case of a minor,
              valid parent or legal guardian consent), right and ability to
              enter into these Terms of Use and to comply with its terms; and
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              b) You will use the Services for lawful purposes only and in
              accordance with these Terms of Use and all applicable laws, rules,
              codes, directives, guidelines, policies and regulations.
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              12. INDEMNITY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    12.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    You agree to indemnify, defend and hold harmless SHOPEASEY
                  </Text>
                  , and its shareholders, subsidiaries, affiliates, directors,
                  officers, agents, co-branders or other partners, and employees
                  (collectively, the "Indemnified Parties") from and against any
                  and all claims, actions, proceedings, and suits and all
                  related liabilities, damages, settlements, penalties, fines,
                  costs and expenses (including, without limitation, any other
                  dispute resolution expenses) incurred by any Indemnified Party
                  arising out of or relating to: (a) any transaction made on the
                  Site, or any dispute in relation to such transaction, (b) the
                  hosting, operation, management and/or administration of the
                  Services by or on behalf of{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  , (c) your use or misuse of the Services, (d) your breach of
                  any law or any rights of a third party, or (e) any Content
                  uploaded by you.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              13. SEVERABILITY
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              13.1 If any provision of these Terms of Use shall be deemed
              unlawful, void, or for any reason unenforceable under the law of
              any jurisdiction, then that provision shall be deemed severable
              from these terms and conditions and shall not affect the validity
              and enforceability of any remaining provisions in such
              jurisdiction nor the validity and enforceability of the provision
              in question under the law of any other jurisdiction.
            </Text>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              14. GOVERNING LAW
            </Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    14.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    These Terms of Use shall be governed by and construed in
                    accordance with the laws of Malaysia without regard to its
                    conflict of law rules. The United Nations Convention on
                    Contracts for the International Sale of Goods and the
                    Uniform Computer Information Transaction Act, to the extent
                    applicable, are expressly disclaimed. Unless otherwise
                    required by applicable laws, any dispute, controversy, claim
                    or difference of any kind whatsoever shall arising out of or
                    relating to these Terms of Use against or relating to{' '}
                  </Text>{' '}
                  or any Indemnified Party under these Terms of Use shall be
                  referred to and finally resolved by arbitration in Malaysia in
                  accordance with the Arbitration Rules of the Asian
                  International Arbitration Centre (Malaysia) (“AIAC Rules”) for
                  the time being in force, which rules are deemed to be
                  incorporated by reference in this Section. There will be one
                  (1) arbitrator and the language of the arbitration shall be
                  English.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              TERMS OF USE(MERCHANT)
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              1. INTRODUCTION
            </Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    1.1{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    We are ADRI SERVICES (MALAYSIA COMPANY REGISTRATION NO:
                    202303210594 / 00352291-V)
                  </Text>
                  , having our business address at 25, Jalan Ronggeng 13, Taman
                  Nesa Skudai, Skudai Baru, 81300 Johor Bahru, Johor and{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    ADRI ONLINE SHOPPEE PRIVATE LIMITED (INDIA CORPORATE
                    IDENTITY NUMBER: U46109TN2023PTC164027)
                  </Text>
                  , having our business address at No. 13/8, New Colony Lake
                  Area, Chrompet Sriperumbudur Tiruneemalai Kanchipuram – 600044
                  Tamil Naidu{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    (“SHOPEASEY”).
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    1.2{' '}
                  </Text>
                  We reserve the right at all times, at our sole discretion, to
                  revise these Terms of Use without providing you any notice
                  prior to the effective date of the revision. Your continued
                  use of the Services, this Platform and/or your registration of
                  an Account after the effective date of the revision shall
                  constitute irrevocable acceptance of these Terms of Use and
                  any such revisions.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    1.3{' '}
                  </Text>
                  You must read and accept all of the terms and conditions in,
                  and linked to, these Terms of Use.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    1.4{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  reserves the right to refuse to provide you access to{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Platform or Services or to allow you to open an Account for
                  any reason.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    1.5{' '}
                  </Text>
                  These Terms of Use are solely for the use of{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  . The Terms of Use herein are our copyrighted intellectual
                  property. Any of the third parties, even on the extracts of
                  our Terms of Use, for commercial purpose of offering goods and
                  / or services is not permitted. Infringements may be subject
                  to legal action.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              2. SERVICES
            </Text>
            <View
              style={{width: '100%', alignItems: 'center', paddingVertical: 0}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    2.1 We provide an online platform service for the sale of
                    goods between the buyer (“Buyer”) and the seller (“Seller”)
                    (collectively “you”, “Users” or “Parties”). The actual
                    contract for sale is directly between Buyer and Seller and
                    SHOPEASEY
                  </Text>
                  . is not a party to that or any other contract between Buyer
                  and Seller and accepts no obligations in connection with any
                  such contract. Parties to such transaction will be entirely
                  responsible for the sales contract between them, the listing
                  of goods, warranty of purchase and the like.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  . is not involved in the transaction between Users.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    2.2 SHOPEASEY
                  </Text>{' '}
                  offers the Seller general services including the listing of
                  your products, order processing, customer services and other
                  additional services that you may request and that we may offer
                  you.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              3. REGISTRATION FEES & FURTHER SUBSCRIPTION
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    3.1 As Seller, you shall pay initial registration fee of
                    10000 Indian Rupee. By paying the initial registration fee,
                    you shall enjoy six (6) months usage of your account and
                    unlimited posting of your selling items. However, once the
                    six (6) month usage of your account lapsed, you shall sign a
                    further subscription agreement with{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      SHOPEASEY,
                    </Text>
                  </Text>{' '}
                  failing which,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY,
                  </Text>{' '}
                  shall at its sole discretion, without notification to you,
                  terminate and / or freeze your account.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    3.2{' '}
                  </Text>
                  Upon successful further subscription with{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  , you as Seller shall bear the Shipping Fee and{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  shall charge 2% sales commission from your monthly total
                  sales. The 2% sales commission is calculated at the last date
                  of every month.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              4. ACCOUNTS AND SECURITY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    4.1 Our Services require registration for an Account by
                    selecting a unique user identification ("User ID") and
                    password, and by providing certain personal information. If
                    you select a User ID that SHOPEASEY,{' '}
                  </Text>{' '}
                  in its sole discretion, finds offensive or inappropriate,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  has the right to suspend or terminate your Account.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    4.2{' '}
                  </Text>
                  You agree to (a) keep your password confidential and use only
                  your User ID and password when logging in, (b) ensure that you
                  log out from your account at the end of each session on{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  , (c) immediately notify{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  of any unauthorised use of your Account, User ID and/or
                  password, and (d) ensure that your Account information is
                  accurate and up-to-date. You are fully responsible for all
                  activities that occur under your User ID and Account even if
                  such activities or uses were not committed by you.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  will not be liable for any loss or damage arising from
                  unauthorised use of your password or your failure to comply
                  with this Section.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    4.3{' '}
                  </Text>
                  You agree that{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may for any reason, in its sole discretion and with or without
                  notice or liability to you, immediately suspend, freeze or
                  terminate your Account and your User ID. Grounds for such
                  actions include, but are not limited to, (a) extended periods
                  of inactivity, as determined by us from time to time, (b)
                  violation of these Terms of Use, (c) illegal, fraudulent,
                  harassing, defamatory, threatening or abusive behaviour or (d)
                  behaviour that is harmful to other Users, third parties, or
                  the business interests of{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  . Use of an Account for illegal, fraudulent, harassing,
                  defamatory, threatening or abusive purposes may be referred to
                  law enforcement authorities without notice to you. If a legal
                  dispute arises or law enforcement action is commenced relating
                  to your Account or your use of the Services for any reason,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may terminate your Account immediately with or without notice.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 0,
                bottom: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    4.4{' '}
                  </Text>
                  As Seller, you may terminate your seller relationship with{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  at any time and without penalty by providing us 14 days
                  written notice of your intention to discontinue the use of our
                  services.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              5. DELIVERY BY SELLER
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    5.1 Unless SHOPEASEY
                  </Text>{' '}
                  approves your usage of cash on delivery as a payment model,
                  you shall not collect any payment from Buyer.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    5.2{' '}
                  </Text>
                  Title and risk of loss for the item sold will remain with you
                  at all times, and{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  will have no liability whatsoever related to the item sold
                  including their shipping, storage, delivery delays, damage or
                  loss through delivery.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    5.3{' '}
                  </Text>
                  The Seller’s responsibilities are as follows:-
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
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
                Upon receiving Order from the Buyer, you shall prepare and ship
                the item within the same day, if not, on the next day to the
                address specified by the Buyer.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
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
                You shall update the status of delivery to the Buyer.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
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
                You shall stop or cancel any Orders if directed by SHOPEASEY
              </Text>
            </View>
            <View
              style={{
                width: '100%',
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
                You shall ensure that SHOPEASEY is at all times supplied with
                updated Order shipment tracking information.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
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
                You shall be responsible for, and bear all risk and liability
                for the sourcing, sale, packaging, labelling, product quality,
                and product warranties (if applicable) for all item(s)
                delivered, and you shall be responsible for all claims in
                relation to such item(s).
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
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
                You shall not require the Buyer to provide any other document
                (except to confirm receipt of delivery) during the delivery
                process.
              </Text>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
                marginTop: 15,
              }}>
              6. RETURN AND REFUND
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    6.1 As Seller, you shall notify{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      SHOPEASEY
                    </Text>
                  </Text>{' '}
                  upon receiving the returned item(s) from the Buyer. You shall
                  within three (3) days, exchange the said item(s) and ship out
                  the exchanged item(s) within the same day, if not, the next
                  day to the Buyer. Should the Buyer decide not to proceed with
                  exchange of the returned item(s), you shall notify and inform{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  within seven (7) days to enable{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  to reimburse the Buyer by making refund to the applicable sum.
                  Should the Seller fail to notify and inform{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  within the stipulated time,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may, at its sole discretion, instruct the Seller to reimburse
                  the Buyer. The refund may be made to Buyer’s credit / debit
                  card or designated bank account, whichever is applicable.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              7. SALES PROCEEDS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    7.1 You authorize SHOPEASEY{' '}
                  </Text>
                  (or its designated providers) to (a) collect the Sales
                  Proceeds and in general any sums due or owing under these Term
                  of Use; (b) calculate and process customer payments, refunds,
                  and adjustments; (c) remit the Net Proceeds; and (d) pay to{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  and to third parties (including Buyers) any amounts you owe to
                  them in relation to your use or transactions on the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY Platform. You acknowledge and agree that payments
                    may be collected from Buyer through authorized service
                    providers (such as logistics providers or offline payment
                    channel operators) on behalf of SHOPEASEY.
                  </Text>
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              8. COMMUNICATION BETWEEN BUYER AND SELLER
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    8.1 SHOPEASEY{' '}
                  </Text>{' '}
                  encourages Users to communicate with each other in the event
                  where problem arises in a transaction.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  is a platform for Users to conduct trading, Buyer should
                  contact Seller directly for any issue relating to the Item
                  purchased.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              9. PROHIBITIONS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    9.1 You must not misuse SHOPEASEY{' '}
                  </Text>{' '}
                  You shall not use any automated systems or software to extract
                  data from{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  for any purpose. You shall not commit or encourage a criminal
                  offence, transmit or distribute a virus including but not
                  limited to Trojan horse, worm, logic bomb or post any other
                  material on the Platform which is malicious, technologically
                  harmful, in breach of confidence or in any way offensive or
                  obscene; hack into; corrupt data; cause annoyance to other
                  users; infringe upon the rights of any other person’s
                  proprietary rights; send any unsolicited advertising or
                  promotional material; or attempt to affect the performance or
                  functionality of any computer facilities of or accessed
                  throughout{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Any breach of this provision would constitute an offence under
                  Section 233 of the Communications and Multimedia Act 1998. In
                  the event such breach occurs,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  will report the breach to the relevant law enforcement
                  authorities and appropriate legal action will be taken.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              10. DISCLAIMERS
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    10.1 The services are provided "as is" and without any
                    warranties, claims or representations made by{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Manrope.Medium,
                        textAlign: 'justify',
                        letterSpacing: 0.5,
                        lineHeight: 25,
                      }}>
                      SHOPEASEY
                    </Text>
                  </Text>{' '}
                  of any kind either expressed, implied or statutory with
                  respect to the services, including, without limitation,
                  warranties of quality, performance, non-infringement,
                  merchantability, or fitness for a particular purpose, nor are
                  there any warranties created by course of dealing, course of
                  performance or trade usage. without limiting the foregoing and
                  to the maximum extent permitted by applicable law,{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  does not warrant that the services, this site or the functions
                  contained therein will be available, accessible,
                  uninterrupted, timely, secure, accurate, complete or
                  error-free, that defects, if any, will be corrected, or that
                  this site and/or the server that makes the same available are
                  free of viruses, clocks, timers, counters, worms, software
                  locks, drop dead devices, trojan-horses, routings, trap doors,
                  time bombs or any other harmful codes, instructions, programs
                  or components.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    10.2{' '}
                  </Text>
                  You acknowledge that the entire risk arising out of the use or
                  performance of the site and/or the services remains with you
                  by applicable law.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    10.3 SHOPEASEY
                  </Text>
                  has no control over and, to the maximum extent permitted by
                  applicable law, does not guarantee or accept any
                  responsibility for: (a) the fitness for purpose, existence,
                  quality, safety or legality of items available via the
                  services; or (b) the ability of sellers to sell items or of
                  buyers to pay for items. if there is a dispute involving one
                  or more users, such users agree to resolve such dispute
                  between themselves directly and, to the maximum extent
                  permitted by applicable law, release{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  from any and all claims, demands and damages arising out of or
                  in connection with any such dispute.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              11. DISPUTES
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    11.1 In the event a problem arises in a transaction, the
                    Buyer and Seller agree to communicate with each other first
                    to attempt to resolve such dispute by mutual discussions,
                    which SHOPEASEY{' '}
                  </Text>{' '}
                  shall use reasonable commercial efforts to facilitate. If the
                  matter cannot be resolved by mutual discussions, Users may
                  approach the claims tribunal of their local jurisdiction to
                  resolve any dispute arising from a transaction.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    11.2{' '}
                  </Text>
                  Each Buyer and Seller covenants and agrees that it will not
                  bring suit or otherwise assert any claim against{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  in relation to any transaction made on the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  or any dispute related to such transaction.
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    11.3{' '}
                  </Text>
                  11.3 Users may send written request to{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  to assist them in resolving issues which may arise from a
                  transaction upon request.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may, at its sole discretion and with absolutely no liability
                  to Seller and Buyer, take all necessary steps to assist Users
                  in resolving their dispute.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              12. NO RESPONSIBILITY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    12.1 SHOPEASEY{' '}
                  </Text>{' '}
                  will have no responsibility with respect to the legality of
                  transactions occurring between Sellers and Buyers relating to
                  the Orders made through SHOPEASEY.
                </Text>
              </View>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              13. YOUR UNDERTAKINGS, REPRESENTATIONS AND WARRANTIES
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              13.1 You undertake, represent and warrant that:-
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              a) You shall (i) comply with all applicable laws and regulations,
              including all anti-bribery, anti-corruption and tax laws relating
              to your activities; (ii) be responsible for and pay all taxes and
              other charges; and (iii) obtain all necessary rights, licences,
              permits, or approvals required for the offer, advertising, and
              sale of your item(s) on or through the SHOPEASEY
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.Regular,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 25,
                  paddingHorizontal: 10,
                  right: 10,
                }}>
                Platform
              </Text>
            </Text>

            <View style={{width: '100%', alignItems: 'center'}}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  bottom: 20,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  b) You shall fulfil all Orders for item(s) at their stated
                  quantity and price to Buyers and be responsible for any error
                  in the Listing Price;
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  c) You ensure that the Listing Price for any item(s) offered
                  to Buyers is at least as favourable as the price offered by
                  you outside the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Platform on other online channels for the same product in like
                  or lesser quantities;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  d) You ensure that the item(s) are of merchantable quality,
                  fit for their purpose, free from defects, and conform to their
                  listed specifications;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  e) You have full unencumbered title in the item(s) and in any
                  materials incorporated in the item(s) and all the item(s) are
                  supplied free of all liens, charges or other security
                  interest;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  f) You shall ensure that the item(s) are not Prohibited,
                  Controlled, Inadequate, Expired and / or Counterfeit Product;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  g) You will provide Seller content that is accurate and up to
                  date. The Seller content must include all text, disclaimers,
                  warnings, notices, labels or other indications required by law
                  to be displayed in connection with the offer, merchandising,
                  advertising or sale of the item(s) and may not contain any
                  sexually explicit, defamatory or obscene materials, or any of
                  yours or a third-party’s marketing material;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  h) Seller Content must be provided in English and/or to the
                  extent required by applicable law, in the language of the
                  countries in which the item(s) are listed for sale through the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Platform.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may arrange for the translation of the Seller Content into
                  local language of the country in which item(s) are listed for
                  sale through the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Platform but{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  is not required to verify the accuracy of the translation
                  process and shall not be liable for any errors or omissions
                  arising from translation;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  bottom: 15,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  i){' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may use mechanisms that rate, or allow Buyers to rate or
                  review, your item(s) and/or your performance as a seller and{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may make these ratings and reviews publicly available.{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  shall not be responsible for the reviews and ratings generated
                  by the mechanisms or Buyers, in respect of any item(s) and/or
                  your performance;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  j){' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  may determine the use and placement of Seller Contents, and
                  the structure, appearance, design, functionality and all other
                  aspects of the{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  Platform;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  k)You shall provide
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    {' '}
                    SHOPEASEY{' '}
                  </Text>
                  with any documentation and information supporting your right
                  to sell the applicable item(s), including the right, license
                  and/or permit to sell such item(s), any documentation giving
                  you the right to distribute the item(s), and if needed, the
                  notarized copy, invoice or other proof thereof at your cost;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  l) You possess the legal capacity (and in the case of a minor,
                  valid parent or legal guardian consent), right and ability to
                  enter into these Terms of Use and to comply with its terms;
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  m) You will use the Services for lawful purposes only and in
                  accordance with these Terms of Use and all applicable laws,
                  rules, codes, directives, guidelines, policies and
                  regulations; and
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  n) You undertake and warrant that all your representations,
                  warranties and undertakings will be fulfilled and will remain
                  true and correct at all times. In the event any of them become
                  unfulfilled, untrue or incorrect, you will promptly inform{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  of the same and rectify the situation to{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>{' '}
                  satisfaction (without prejudice to any other rights or
                  remedies of{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  ).
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              14. INDEMNITY
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    14.1 You agree to indemnify, defend and hold harmless
                    SHOPEASEY,
                  </Text>{' '}
                  and its shareholders, subsidiaries, affiliates, directors,
                  officers, agents, co-branders or other partners, and employees
                  (collectively, the "Indemnified Parties") from and against any
                  and all claims, actions, proceedings, and suits and all
                  related liabilities, damages, settlements, penalties, fines,
                  costs and expenses (including, without limitation, any other
                  dispute resolution expenses) incurred by any Indemnified Party
                  arising out of or relating to: (a) any transaction made on the
                  Site, or any dispute in relation to such transaction, (b) the
                  hosting, operation, management and/or administration of the
                  Services by or on behalf of{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    SHOPEASEY
                  </Text>
                  , (c) your use or misuse of the Services, (d) your breach of
                  any law or any rights of a third party, or (e) any Content
                  uploaded by you.
                </Text>
              </View>
            </View>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              15. SEVERABILITY
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              15.1 If any provision of these Terms of Use shall be deemed
              unlawful, void, or for any reason unenforceable under the law of
              any jurisdiction, then that provision shall be deemed severable
              from these terms and conditions and shall not affect the validity
              and enforceability of any remaining provisions in such
              jurisdiction nor the validity and enforceability of the provision
              in question under the law of any other jurisdiction.
            </Text>

            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              16. NO WAIVER
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.Medium,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              16.1 The failure of a Party to exercise its rights in case of
              breach of contract by the other Party will not be considered as a
              waiver of its rights
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 16,
                paddingVertical: 10,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: 20,
              }}>
              17. GOVERNING LAW
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Regular,
                    textAlign: 'justify',
                    letterSpacing: 0.5,
                    lineHeight: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Medium,
                      textAlign: 'justify',
                      letterSpacing: 0.5,
                      lineHeight: 25,
                    }}>
                    17.1 These Terms of Use shall be governed by and construed
                    in accordance with the laws of Malaysia without regard to
                    its conflict of law rules. The United Nations Convention on
                    Contracts for the International Sale of Goods and the
                    Uniform Computer Information Transaction Act, to the extent
                    applicable, are expressly disclaimed. Unless otherwise
                    required by applicable laws, any dispute, controversy, claim
                    or difference of any kind whatsoever shall arising out of or
                    relating to these Terms of Use against or relating to
                    SHOPEASEY
                  </Text>{' '}
                  or any Indemnified Party under these Terms of Use shall be
                  referred to and finally resolved by arbitration in Malaysia in
                  accordance with the Arbitration Rules of the Asian
                  International Arbitration Centre (Malaysia) (“AIAC Rules”) for
                  the time being in force, which rules are deemed to be
                  incorporated by reference in this Section. There will be one
                  (1) arbitrator and the language of the arbitration shall be
                  English.
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
            width: '100%',
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 0}}>
            <Text
              style={{
                width: '100%',
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
                width: '100%',
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
                width: '100%',
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
                  width: '100%',
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
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
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
                  width: '100%',
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
                  width: '100%',
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
              marginBottom: 10,
            }}>
            <View
              style={{
                width: '100%',
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
                width: '100%',
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
      <FlatList
        data={aboutData}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={() => renderHeaderItem()}
        // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
        ListFooterComponent={() => renderFooterItem()}
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
});

export default TermsandConditions;
