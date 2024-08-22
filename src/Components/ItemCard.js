import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import {Media} from '../Global/Media';
import {useDispatch, useSelector} from 'react-redux';
import common_fn from '../Config/common_fn';
import fetchData from '../Config/fetchData';
import {setDataCount} from '../Redux';
import {ActivityIndicator} from 'react-native-paper';

const ItemCard = props => {
  const countryCode = useSelector(state => state.UserReducer.country);
  const {item: initialItem, navigation} = props;
  const userData = useSelector(state => state.UserReducer.userData);
  const [loadingWishlist, setLoadingWishlist] = useState(null);
  const [reviewsData, setReviewsData] = useState({});
  const {token} = userData;
  const [item, setItem] = useState(initialItem);
  const dispatch = useDispatch();

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const originalPrice =
    item?.variants?.[0]?.org_price / countryCode?.price_margin;
  const offerPrice = item?.variants?.[0]?.offer_price
    ? item?.variants?.[0]?.offer_price
    : item?.variants?.[0]?.price / countryCode?.price_margin;

  const discount = parseFloat(
    ((originalPrice - offerPrice) / originalPrice) * 100,
  ).toFixed(2);

  const getProduct = async () => {
    try {
      const data = `id=${item?.id}`;
      const product_data = await fetchData.list_products(data, token);
      setItem(product_data?.data[0]);
      var review_data = `${item?.id}`;
      const reviewData = await fetchData.get_review(review_data, token);
      setReviewsData(reviewData);
    } catch (error) {
      console.log('Error loading products:', error);
    }
  };

  const toggle_WishList = async single => {
    setLoadingWishlist(single?.id);
    try {
      const data = {
        product_id: single?.id,
        variant_id: single?.variants[0]?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      if (wishlist?.status === true) {
        common_fn.showToast(wishlist?.message);
        getCountData();
        getProduct();
      } else {
        common_fn.showToast(wishlist?.message);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingWishlist(null);
    }
  };

  const getCountData = async () => {
    try {
      const getData = await fetchData.profile_data(``, token);
      dispatch(
        setDataCount({
          wishlist: getData?.data?.wishlist_count,
          cart: getData?.data?.cart_count,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  const isLoading = loadingWishlist === item.id;
  return (
    <View style={{width: '50%'}}>
      <TouchableOpacity
        style={styles.product}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            id: item?.id,
            variant_id: item?.variants[0]?.id,
          });
        }}>
        <ImageBackground
          style={styles.Productimage}
          source={{
            uri:
              item?.variants?.[0]?.productImages?.length > 0
                ? item?.variants?.[0]?.productImages?.[0]?.image
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
            {/* <TouchableOpacity
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
              {isLoading ? (
                <ActivityIndicator size="small" color={Color.red} />
              ) : (
                <AntDesign
                  name={item?.variants?.[0]?.is_wishlisted ? 'heart' : 'hearto'}
                  size={18}
                  color={
                    item?.variants?.[0]?.is_wishlisted ? Color.red : Color.black
                  }
                />
              )}
            </TouchableOpacity> */}
          </View>
          <LinearGradient
            style={styles.locationView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#1D1D1D78', '#1D1D1D4F', '#1D1D1D08']}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Octicons name="location" size={15} color={Color.white} />
              <Text style={styles.locationText}>{item?.vendor?.country}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Feather name="camera" size={15} color={Color.white} />
              <Text style={styles.locationText}>
                {item?.variants?.[0]?.productImages?.length}
              </Text>
            </View>
            {/* <Text
            style={{
              color: Color.white,
              fontSize: 12,
              fontFamily: Manrope.Medium,
              backgroundColor: Color.cloudyGrey,
              borderRadius: 50,
              padding: 5,
            }}>
            {item?.variants?.length} Variants
          </Text> */}
          </LinearGradient>
        </ImageBackground>
        <View style={styles.contentView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                flex: 1,
                color: Color.cloudyGrey,
                fontSize: 12,
                fontFamily: Manrope.Medium,
              }}>
              {item?.type && `${item?.type} - `}
              {item?.category?.category_name}
            </Text>
            <Text
              style={{
                color: Color.red,
                fontSize: 11,
                fontFamily: Manrope.Medium,
              }}>
              Sold {item?.variants?.[0]?.sold} / {item?.variants?.[0]?.stock}
            </Text>
          </View>

          <Text style={styles.productName} numberOfLines={2}>
            {item?.product_name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.productDiscountPrice}>
              {countryCode?.symbol}
              {parseFloat(
                item?.variants?.[0]?.offer_price
                  ? item?.variants?.[0]?.offer_price
                  : item?.variants?.[0]?.price / countryCode?.price_margin,
              ).toFixed(2)}
            </Text>
            <Text style={styles.productPrice}>
              {countryCode?.symbol}
              {parseFloat(
                item?.variants?.[0]?.org_price / countryCode?.price_margin,
              ).toFixed(2)}
            </Text>
          </View>
          {/* <Text style={styles.productDiscountPrice} numberOfLines={1}>
          ${item.discountPrice}{' '}
          <Text style={styles.productPrice}>${item.price}</Text>
        </Text> */}
          {reviewsData?.data?.length > 0 && (
            <View style={styles.productRatingView}>
              <FontAwesome name="star" size={12} color={Color.lightYellow} />
              <Text
                style={{
                  fontFamily: Manrope.Bold,
                  fontSize: 12,
                  paddingHorizontal: 5,
                  color: Color.black,
                }}>
                {reviewsData?.rating}
                <Text
                  style={{
                    fontFamily: Manrope.SemiBold,
                    fontSize: 10,
                    color: Color.cloudyGrey,
                    letterSpacing: 0.5,
                  }}>
                  {' '}
                  ({reviewsData.count} Reviews)
                </Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const ItemCardHorizontal = props => {
  const countryCode = useSelector(state => state.UserReducer.country);
  const {item: initialItem, navigation} = props;
  const userData = useSelector(state => state.UserReducer.userData);
  const {token} = userData;
  const [reviewsData, setReviewsData] = useState({});
  const [item, setItem] = useState(initialItem);
  const dispatch = useDispatch();

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const originalPrice =
    item?.variants?.[0]?.org_price / countryCode?.price_margin;
  const offerPrice = item?.variants?.[0]?.offer_price
    ? item?.variants?.[0]?.offer_price
    : item?.variants?.[0]?.price / countryCode?.price_margin;

  const discount = parseFloat(
    ((originalPrice - offerPrice) / originalPrice) * 100,
  ).toFixed(2);

  const getProduct = async () => {
    try {
      const data = `id=${item?.id}`;
      const product_data = await fetchData.list_products(data, token);
      setItem(product_data?.data[0]);
      var review_data = `${item?.id}`;
      const reviewData = await fetchData.get_review(review_data, token);
      setReviewsData(reviewData);
    } catch (error) {
      console.log('Error loading products:', error);
    }
  };

  const toggle_WishList = async single => {
    try {
      const data = {
        product_id: single?.id,
        variant_id: single?.variants[0]?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      if (wishlist?.status === true) {
        common_fn.showToast(wishlist?.message);
        getCountData();
        getProduct();
      } else {
        common_fn.showToast(wishlist?.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getCountData = async () => {
    try {
      const getData = await fetchData.profile_data(``, token);
      dispatch(
        setDataCount({
          wishlist: getData?.data?.wishlist_count,
          cart: getData?.data?.cart_count,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 170,
        backgroundColor: Color.white,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.lightgrey,
      }}
      onPress={() => {
        navigation.push('ProductDetails', {
          id: item?.id,
          variant_id: item?.variants[0]?.id,
        });
      }}>
      <ImageBackground
        style={styles.Productimage}
        source={{
          uri:
            item?.variants?.[0]?.productImages?.length > 0
              ? item?.variants?.[0]?.productImages?.[0]?.image
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
          {/* <TouchableOpacity
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
            <AntDesign
              name={item?.variants?.[0]?.is_wishlisted ? 'heart' : 'hearto'}
              size={18}
              color={
                item?.variants?.[0]?.is_wishlisted ? Color.red : Color.black
              }
            />
          </TouchableOpacity> */}
        </View>
        <LinearGradient
          style={styles.locationView}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1D1D1D78', '#1D1D1D4F', '#1D1D1D08']}>
          <Octicons name="location" size={15} color={Color.white} />
          <Text style={styles.locationText}>{item?.vendor?.country}</Text>
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
            {item?.type && `${item?.type} - `}
            {item?.category?.category_name}
          </Text>
        </View>

        <Text style={styles.productName} numberOfLines={1}>
          {item?.product_name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.productDiscountPrice}>
            {countryCode?.symbol}
            {parseFloat(
              item?.variants?.[0]?.offer_price
                ? item?.variants?.[0]?.offer_price
                : item?.variants?.[0]?.price / countryCode?.price_margin,
            ).toFixed(2)}
          </Text>
          <Text style={styles.productPrice}>
            {countryCode?.symbol}
            {parseFloat(
              item?.variants?.[0]?.org_price / countryCode?.price_margin,
            ).toFixed(2)}
          </Text>
        </View>
        {/* <Text style={styles.productDiscountPrice} numberOfLines={1}>
          ${item.discountPrice}{' '}
          <Text style={styles.productPrice}>${item.price}</Text>
        </Text> */}
        {reviewsData?.data?.length > 0 && (
          <View style={styles.productRatingView}>
            <FontAwesome name="star" size={12} color={Color.lightYellow} />
            <Text
              style={{
                fontFamily: Manrope.Bold,
                fontSize: 12,
                paddingHorizontal: 5,
                color: Color.black,
              }}>
              {reviewsData?.rating}
              <Text
                style={{
                  fontFamily: Manrope.SemiBold,
                  fontSize: 10,
                  color: Color.cloudyGrey,
                  letterSpacing: 0.5,
                }}>
                {' '}
                ({reviewsData.count} Reviews)
              </Text>
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: Color.white,
  },
  product: {
    // width: 190,
    // height: 300,
    backgroundColor: Color.white,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    flex: 1,
  },
  Productimage: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 10,
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
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    // borderLeftWidth: 1,
    // borderLeftColor: Color.lightgrey,
    // borderRightWidth: 1,
    // borderRightColor: Color.lightgrey,
    // borderBottomWidth: 1,
    // borderBottomColor: Color.lightgrey,
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
