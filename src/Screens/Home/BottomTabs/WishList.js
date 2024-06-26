import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';
import {useSelector} from 'react-redux';
import ItemCard from '../../../Components/ItemCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import common_fn from '../../../Config/common_fn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {Media} from '../../../Global/Media';

const {height} = Dimensions.get('screen');
const WishList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [WishlistData, setWishlistData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const countryCode = useSelector(state => state.UserReducer.country);

  useEffect(() => {
    setLoading(true);
    getWishlistData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, [token]);

  const getWishlistData = async () => {
    try {
      const getWislist = await fetchData.list_wishlist(``, token);
      console.log('getWislist?.data', getWislist?.data);
      setWishlistData(getWislist?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggle_WishList = async single => {
    try {
      var data = {
        product_id: single?.product?.id,
        variant_id: single?.variant?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      console.log('wishlist-------------------', wishlist);
      if (wishlist?.status == true) {
        common_fn.showToast(wishlist?.message);
        getWishlistData();
      } else {
        common_fn.showToast(wishlist?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      {loading ? (
        <View style={{}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={WishlistData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            var discount = parseInt(
              ((item?.variant?.org_price - item?.variant?.price) /
                item?.variant?.org_price) *
                100,
            );

            return (
              <TouchableOpacity
                style={styles.product}
                onPress={() => {
                  navigation.replace('ProductDetails', {id: item?.id});
                }}>
                <ImageBackground
                  style={styles.Productimage}
                  source={{
                    uri:
                      item?.variant?.productImages?.length > 0
                        ? item?.variant?.productImages?.image
                        : Media.no_image,
                  }}
                  resizeMode="cover">
                  <View style={styles.imageTopView}>
                    {discount > 0 ? (
                      <View
                        style={{
                          backgroundColor: Color.lightYellow,
                          borderRadius: 5,
                          paddingHorizontal: 10,
                          padding: 3,
                        }}>
                        <Text style={styles.offerText}>{discount}% off</Text>
                      </View>
                    ) : (
                      <View style={{flex: 1}} />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        if (token != undefined) {
                          toggle_WishList(item);
                        } else {
                          navigation.navigate('Auth');
                        }
                      }}
                      style={{
                        backgroundColor: '#FFFFFF80',
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                      }}>
                      <AntDesign name="heart" size={16} color={Color.black} />
                    </TouchableOpacity>
                  </View>
                  <LinearGradient
                    style={styles.locationView}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#1D1D1D78', '#1D1D1D4F', '#1D1D1D08']}>
                    <Octicons name="location" size={15} color={Color.white} />
                    <Text style={styles.locationText}>{item?.location}</Text>
                  </LinearGradient>
                </ImageBackground>
                <View style={styles.contentView}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        flex: 1,
                        color: Color.cloudyGrey,
                        fontSize: 14,
                        fontFamily: Manrope.Medium,
                      }}>
                      {item?.type} - {item?.product?.category?.category_name}
                    </Text>
                    <Text
                      style={{
                        color: Color.red,
                        fontSize: 11,
                        fontFamily: Manrope.Medium,
                      }}>
                      Sold {item?.variant?.sold} / {item?.variant?.stock}
                    </Text>
                  </View>

                  <Text style={styles.productName} numberOfLines={1}>
                    {item?.product?.product_name}
                  </Text>
                  <View
                    style={{
                      width: '36%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.productDiscountPrice} numberOfLines={1}>
                      {countryCode?.symbol}
                      {item?.variant?.price}
                    </Text>
                    <Text style={styles.productPrice} numberOfLines={1}>
                      {countryCode?.symbol}
                      {item?.variant?.org_price}
                    </Text>
                  </View>
                  <View style={styles.productRatingView}>
                    <FontAwesome
                      name="star"
                      size={12}
                      color={Color.lightYellow}
                    />
                    <Text
                      style={{
                        fontFamily: Manrope.Bold,
                        fontSize: 12,
                        paddingHorizontal: 5,
                        color: Color.black,
                      }}>
                      {item?.rating}
                      <Text
                        style={{
                          fontFamily: Manrope.SemiBold,
                          fontSize: 10,
                          color: Color.cloudyGrey,
                          letterSpacing: 0.5,
                        }}>
                        {' '}
                        ({item?.shop?.reviews} Reviews)
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: Color.white,
  },
  product: {
    // width: 190,
    height: 285,
    backgroundColor: Color.white,
    margin: 5,
    borderRadius: 5,
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  Productimage: {
    width: '100%',
    height: 170,
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-between',
    resizeMode: 'contain',
  },
  imageTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  offerText: {
    fontFamily: Manrope.SemiBold,
    fontSize: 10,
    color: Color.lightBlack,
    textAlign: 'center',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  locationText: {
    color: Color.white,
    fontSize: 10,
    fontFamily: Manrope.Bold,
    padding: 5,
  },
  contentView: {
    borderLeftWidth: 1,
    borderLeftColor: Color.lightgrey,
    borderRightWidth: 1,
    borderRightColor: Color.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  categoryName: {
    color: '#777777',
    fontSize: 11,
    flex: 1,
    fontFamily: Manrope.SemiBold,
  },
  productName: {
    color: Color.lightBlack,
    fontSize: 12,
    paddingVertical: 3,
    fontFamily: Manrope.Bold,
    letterSpacing: 0.5,
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 16,
    paddingVertical: 0,
    letterSpacing: 0.5,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.Medium,
    fontSize: 12,
    paddingLeft: 5,
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
