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
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImageView from '../../Components/imageView';
import { Media } from '../../Global/Media';
import moment from 'moment';
import { products } from '../../Config/Content';
import ItemCard from '../../Components/ItemCard';
import { scr_height, scr_width } from '../../Utils/Dimensions';

const ProductDetails = ({ navigation, route }) => {
  const [itemData] = useState(route?.params?.item);
  const [resultDate, setResultDate] = useState(null);
  const [defaultRating, setDefaultRating] = useState(itemData?.shop?.rating);
  const [tabIndex, setIndex] = useState(0);

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

  var discount = parseInt(
    ((itemData?.price - itemData?.discountPrice) / itemData?.price) * 100,
  );
  const currentDate = moment();
  const yourDate = moment(itemData?.shop?.active);

  useEffect(() => {
    const daysAgo = currentDate.diff(yourDate, 'days');
    const hoursAgo = currentDate.diff(yourDate, 'hours');
    const minutesAgo = currentDate.diff(yourDate, 'minutes');

    if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
      setResultDate('Just now');
    } else {
      let result;

      if (Math.abs(daysAgo) > 0) {
        result = `${Math.abs(daysAgo)} day${Math.abs(daysAgo) !== 1 ? 's' : ''
          } ago`;
      } else if (Math.abs(hoursAgo) > 0) {
        result = `${Math.abs(hoursAgo)} hour${Math.abs(hoursAgo) !== 1 ? 's' : ''
          } ago`;
      } else {
        result = `${Math.abs(minutesAgo)} minute${Math.abs(minutesAgo) !== 1 ? 's' : ''
          } ago`;
      }
      console.log('result', result);
      setResultDate(result);
    }
  }, [currentDate, yourDate, itemData]);

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  useEffect(() => {
    setNumLines(discriptiontextShown ? undefined : 3);
  }, [discriptiontextShown]);

  const onDescriptionTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [discriptiontextShown],
  );

  const toggleTextShown = () => {
    setDiscriptiontextShown(!discriptiontextShown);
    setNumLines();
  };

  const [review_tab] = useState([
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Top Reviews',
    },
    {
      id: 3,
      name: 'Most Recent',
    },
  ]);

  return (
    <View style={{ width: scr_width, height: scr_height, backgroundColor: Color.white }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: Color.white,
        }}>
        <TouchableOpacity onPress={() => navigation.replace("ProductList")} style={{ padding: 5 }}>
          <Icon
            name="arrow-back"
            size={30}
            color={Color.black}

          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <Text
            style={{
              color: Color.black,
              fontSize: 14,
              fontFamily: Manrope.Bold,
            }}>
            {itemData?.category}
          </Text>
          <Text
            style={{
              color: Color.cloudyGrey,
              fontSize: 12,
              fontFamily: Manrope.Medium,
            }}>
            {itemData?.type}
          </Text>
        </View>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Icon name="share-social" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Badge
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -10,
              right: -10,
              backgroundColor: Color.red,
              color: Color.white,
              fontFamily: Manrope.Bold,
            }}>
            {0}
          </Badge>
          <AntDesign name="hearto" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Badge
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -10,
              right: -10,
              backgroundColor: Color.red,
              color: Color.white,
              fontFamily: Manrope.Bold,
            }}>
            {0}
          </Badge>
          <Feather name="shopping-cart" size={25} color={Color.black} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.white, paddingVertical: 10 }}>
          <ImageView images={itemData?.images} />
          <View
            style={{
              width: '95%', alignItems: 'center',
              backgroundColor: Color.white,
              marginTop: 50
            }}>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
              <Text
                style={{
                  color: Color.cloudyGrey,
                  fontSize: 13,
                  fontFamily: Manrope.Medium,
                }}>
                {itemData?.type} - {itemData?.category}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Color.lightBlack,
                  paddingHorizontal: 10,
                  borderRadius: 2,
                  padding: 7,
                  marginHorizontal: 10,
                }}>
                <FontAwesome6 name="award" size={14} color={Color.white} />
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 10,
                    fontFamily: Manrope.Medium,
                    marginHorizontal: 5,
                  }}>
                  Best Seller
                </Text>
              </View>
            </View>
            <View style={{ width: '95%', marginVertical: 10, }}>
              <Text style={{ color: Color.lightBlack, fontSize: 15, fontFamily: Manrope.SemiBold }}>
                {itemData?.name}
              </Text>

              <View style={[styles.customRatingBarStyle, { alignItems: 'center', marginTop: 1 }]}>
                {maxRating.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => handleRatingPress(item.rating)}
                      style={{}}>
                      <FontAwesome
                        name={item.rating <= defaultRating ? 'star' : 'star-o'}
                        size={14}
                        color={Color.sunShade}
                      />
                    </TouchableOpacity>
                  );
                })}
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                    marginHorizontal: 5,
                  }}>
                  {itemData?.shop?.rating}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center', paddingVertical: 5
                }}>
                <Text style={styles.productDiscountPrice}>
                  ${itemData.discountPrice}{' '}
                  <Text style={styles.productPrice}>${itemData.price}</Text>
                </Text>
                <Text
                  style={{
                    fontFamily: Manrope.ExtraBold,
                    fontSize: 12,
                    color: '#0FAD45',
                    borderWidth: 1,
                    borderColor: '#0FAD45',
                    paddingHorizontal: 10,
                  }}>
                  {discount}% OFF
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: Manrope.SemiBold,
                  fontSize: 12,
                  color: Color.red,
                }}>
                ( Only {itemData?.stocks} pending )
              </Text>
            </View>

            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.SemiBold,
                }}>
                Production :
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Bold,
                  marginRight: 10,
                }}>
                {' '}
                Damage Protection
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.blue,
                  fontFamily: Manrope.Bold,
                  textDecorationLine: 'underline',
                }}>
                Learn More
              </Text>
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.cloudyGrey,
                  fontFamily: Manrope.SemiBold,
                  marginRight: 10,
                }}>
                Shipping :
              </Text>
              <FontAwesome5
                name="shipping-fast"
                size={18}
                color={Color.primary}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Bold,
                  marginHorizontal: 10,
                }}>
                {' '}
                Free Shipping
              </Text>
            </View>
            <View
              style={{
                width: '95%', marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <Image source={Media.return} style={{ width: 20, height: 20 }} />
              <Text
                style={{
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                  marginLeft: 5, letterSpacing: 0.5
                }}>
                15-Day Returns{' '}
              </Text>
              <TouchableOpacity onPress={() => { }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.lightBlack, textAlign: 'justify',
                    fontWeight: '600', letterSpacing: 0.5,
                    textDecorationLine: 'underline',
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  textAlign: 'justify', letterSpacing: 0.5
                }}>
                {' '}
                and{' '}
              </Text>
              <TouchableOpacity onPress={() => { }} style={{ paddingTop: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.lightBlack, textAlign: 'justify',
                    fontWeight: '600', letterSpacing: 0.5,
                    textDecorationLine: 'underline',
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: scr_width, paddingVertical: 5, marginVertical: 10, backgroundColor: Color.softGrey }}></View>
          <View
            style={{
              width: '95%', alignItems: 'center',
              backgroundColor: Color.white,
              // padding: 10,
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope?.SemiBold,
                marginVertical: 10,
              }}>
              Color :
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {itemData?.color?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      margin: 5,
                      // marginTop: 10,
                      borderWidth: 1,
                      borderColor: Color.lightgrey,
                      padding: 10, paddingHorizontal: 10,
                      borderRadius: 5,
                      // backgroundColor: item?.quantity == 0 ? '#EEEEEE' : Color.white,
                    }}
                    disable={item?.quantity == 0}>
                    <View
                      style={{
                        backgroundColor: item?.color,
                        width: 16,
                        height: 16,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: Color.cloudyGrey,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        fontFamily: Manrope?.Bold,
                        marginHorizontal: 10,
                        textTransform: 'capitalize',
                      }}>
                      {item?.color}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ width: scr_width, paddingVertical: 5, marginVertical: 10, backgroundColor: Color.softGrey }}></View>

          <View
            style={{
              width: '95%',
              backgroundColor: Color.white,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 16, paddingHorizontal: 5,
                color: Color.black,
                fontFamily: Manrope?.SemiBold,
              }}>
              Size :
            </Text>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                flexWrap: 'wrap', marginVertical: 10,
              }}>
              {itemData?.size?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginHorizontal: 10,
                    }}
                    disable={item?.quantity == 0}>
                    <View
                      style={{
                        // width: 50,
                        // height: 50,
                        padding: 10, paddingHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                          item?.quantity == 0 ? '#EEEEEE80' : '#EEEEEE',
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          fontFamily: Manrope?.Bold,
                          textAlign: 'center',
                        }}>
                        {item?.size}
                      </Text>
                    </View>
                    {item?.quantity == 0 && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.red,
                          fontFamily: Manrope?.Bold,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                        }}>
                        sold
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ width: scr_width, paddingVertical: 5, marginVertical: 10, backgroundColor: Color.softGrey }}></View>

          <View
            style={{
              width: '100%',
              backgroundColor: '#F0F9FB',
              padding: 10,
              // marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={Media.user}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.white,
                    fontFamily: Manrope.Medium,
                    backgroundColor: Color.green,
                    padding: 7,
                    paddingHorizontal: 15, letterSpacing: 0.5,
                    borderRadius: 5, bottom: 10
                  }}>
                  Preferred
                </Text>
              </View>
              <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.Bold, letterSpacing: 0.5,
                  }}>
                  {itemData?.shop?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.lightBlack,
                    fontFamily: Manrope.Light, paddingVertical: 3
                  }}>
                  {resultDate}
                </Text>
                <View style={{ ...styles.customRatingBarStyle, marginTop: 5, alignItems: 'center' }}>
                  {maxRating.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        onPress={() => handleRatingPress(item.rating)}
                        style={{}}>
                        <AntDesign
                          name={item.rating <= defaultRating ? 'star' : 'staro'}
                          size={14}
                          color={Color.sunShade}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.Bold,
                      marginHorizontal: 5,
                    }}>
                    {itemData?.shop?.rating}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Button
                    mode="contained"
                    onPress={() => { navigation.replace("SellerProfile") }}
                    style={{
                      backgroundColor: Color.primary,
                      borderRadius: 5,
                    }}
                    icon={() => (
                      <Feather
                        name="shopping-bag"
                        color={Color.white}
                        size={18}
                      />
                    )}
                    textColor={Color.white}>
                    View Shop
                  </Button>

                  <Button
                    mode="contained"
                    onPress={() => { }}
                    style={{
                      marginHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: Color.white,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                    }}
                    textColor={Color.black}>
                    Follow
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              backgroundColor: Color.white,
              padding: 10,
              marginTop: 10,
            }}>
            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>
              Product Details
            </Text>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Category</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>Men polo t-shirt</Text>
              </View>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Protection</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>Damage Protection</Text>
              </View>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Material</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>Cotton</Text>
              </View>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Brand</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>U.S Polo</Text>
              </View>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Material</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>Cotton</Text>
              </View>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5, padding: 5 }}>Country of Origin</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, padding: 5 }}>Chennai, India</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              backgroundColor: Color.white,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.SemiBold, letterSpacing: 0.5
              }}>
              Product Description
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: Color.lightBlack,
                textAlign: 'justify', paddingVertical: 5,
                fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22
              }}
              numberOfLines={numLines}
              onTextLayout={onDescriptionTextLayout}>
              {!discriptiontextShown
                ? itemData?.description
                  .split('\n')
                  .join('')
                  .substring(0, 120)
                  .concat('...')
                : itemData?.description.split('\n').join('')}{' '}
              {showMoreButton || numLines >= 3 || numLines == undefined ? (
                <Text
                  onPress={toggleTextShown}
                  style={{
                    color: Color.primary,
                    fontFamily: Manrope.SemiBold,
                    fontSize: 14, paddingVertical: 5
                  }}>
                  {discriptiontextShown ? 'Read Less' : 'Read More'}
                </Text>
              ) : null}
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              backgroundColor: Color.white,
              padding: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.SemiBold, letterSpacing: 0.5
              }}>
              Product Ratings & Reviews
            </Text>
            <View style={styles.productRatingView}>
              <View style={{ backgroundColor: Color.green, borderRadius: 5, padding: 5, paddingHorizontal: 7, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="star" size={12} color={Color.lightYellow} />
                <Text
                  style={{
                    fontFamily: Manrope.Bold,
                    fontSize: 12, paddingHorizontal: 5,
                    color: Color.white, letterSpacing: 0.5
                  }}>
                  {itemData.rating} </Text>
              </View>
              <Text
                style={{
                  fontFamily: Manrope.Bold,
                  fontSize: 12,
                  color: Color.cloudyGrey, letterSpacing: 0.5
                }}>
                {'  '}({itemData?.shop?.reviews} Reviews)
              </Text>

            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              {review_tab?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(index);
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        tabIndex == index ? Color.primary : Color.lightgrey,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 50,
                      margin: 5,
                      backgroundColor:
                        tabIndex == index ? '#0D71BA30' : Color.white,
                    }}
                    key={index}>
                    <Text
                      style={{
                        fontFamily: Manrope?.Medium,
                        fontSize: 12, paddingHorizontal: 10,
                        color: tabIndex == index ? Color.primary : Color.black,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              {itemData?.reviews?.map((item, index) => {
                return (
                  // <View
                  //   key={index}
                  //   style={{
                  //     flex: 1,
                  //     flexDirection: 'row',
                  //     alignItems: 'center',
                  //     borderWidth: 1,
                  //     borderColor: Color.lightgrey,
                  //     borderRadius: 5,
                  //     padding: 5,
                  //     marginTop: 10,
                  //   }}>
                  //   <Image
                  //     source={Media.user}
                  //     style={{
                  //       width: 70,
                  //       height: 70,
                  //       resizeMode: 'contain',
                  //       borderRadius: 100,
                  //     }}
                  //   />
                  //   <View
                  //     style={{
                  //       flex: 1,
                  //     }}>
                  //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  //       <Text
                  //         style={{
                  //           fontFamily: Manrope?.Bold,
                  //           fontSize: 16,
                  //           color: Color.black,
                  //         }}>
                  //         {item?.review}
                  //       </Text>
                  //       <View
                  //         style={{
                  //           ...styles.productRatingView,
                  //           marginHorizontal: 10,
                  //         }}>
                  //         <FontAwesome
                  //           name="star"
                  //           size={15}
                  //           color={Color.lightYellow}
                  //         />
                  //         <Text
                  //           style={{
                  //             fontFamily: Manrope.Bold,
                  //             fontSize: 14,
                  //             color: Color.black,
                  //           }}>
                  //           {itemData?.shop?.rating}
                  //         </Text>
                  //       </View>
                  //     </View>
                  //     <Text
                  //       style={{
                  //         flex: 1,
                  //         fontFamily: Manrope.Medium,
                  //         fontSize: 12,
                  //         color: Color.cloudyGrey,
                  //       }}>
                  //       {item.content}
                  //     </Text>
                  //   </View>
                  // </View>
                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={Media.user}
                          style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'contain',
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      <View style={{ flex: 3.5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View>
                            <Text
                              style={{
                                fontFamily: Manrope?.Bold,
                                fontSize: 14,
                                color: Color.black, letterSpacing: 0.5,
                              }}>
                              {item?.review}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1FBEF', borderRadius: 5, padding: 5, paddingHorizontal: 10, marginHorizontal: 10 }}>
                            <FontAwesome
                              name="star"
                              size={13}
                              color={Color.lightYellow}
                            />
                            <Text
                              style={{
                                fontFamily: Manrope.Bold,
                                fontSize: 12,
                                color: Color.black, paddingHorizontal: 5,
                              }}>
                              {itemData?.shop?.rating}
                            </Text>
                          </View>
                        </View>
                        <View style={{ width: '100%' }}>
                          <Text
                            style={{
                              textAlign: 'justify',
                              fontFamily: Manrope.Light,
                              fontSize: 12,
                              color: Color.cloudyGrey, letterSpacing: 0.5, lineHeight: 22
                            }}>
                            {item.content}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ width: '100%', marginVertical: 10, backgroundColor: Color.softGrey, paddingVertical: 1 }}></View>
                  </View>
                );
              })}
            </View>
            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', marginVertical: 0 }}>
              <TouchableOpacity onPress={() => { }}>
                <Text
                  style={{
                    fontFamily: Manrope?.SemiBold,
                    fontSize: 13,
                    color: Color.lightBlack,
                    textDecorationLine: 'underline', letterSpacing: 0.5
                  }}>
                  View All Reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '95%', alignItems: 'center',
              backgroundColor: Color.white,
              padding: 10,
              marginBottom: 70,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <ItemCard item={item} navigation={navigation} />;
              }}
            />
          </View>
          {/* <View
            style={{
              width: '95%', alignItems: 'center',
              backgroundColor: Color.white,
              padding: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.Bold,
              }}>
              YOU MAY ALSO LIKE
            </Text>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <ItemCard item={item} navigation={navigation} />;
              }}
            />
          </View> */}
        </View>
      </ScrollView >
    </View >
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.SemiBold,
    fontSize: 20,
    marginRight: 10,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.SemiBold,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  customRatingBarStyle: {
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
});
