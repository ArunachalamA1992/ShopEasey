import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../Global/Color';
import {Manrope} from '../../../Global/FontFamily';
import fetchData from '../../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from '../../../Components/ItemCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import common_fn from '../../../Config/common_fn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {Media} from '../../../Global/Media';
import {setDataCount} from '../../../Redux';
import {ActivityIndicator} from 'react-native-paper';

const {height} = Dimensions.get('screen');
const WishList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [WishlistData, setWishlistData] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(null);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const countryCode = useSelector(state => state.UserReducer.country);

  useEffect(() => {
    setLoading(true);
    getWishlistData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, [token]);

  const getWishlistData = useCallback(
    async (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      }
      console.log('Fetching wishlist data with token:', token);
      try {
        const getWishlist = await fetchData.list_wishlist('', token);
        if (getWishlist?.status == true) {
          setWishlistData(getWishlist.data);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching wishlist data:', error);
      } finally {
        if (isRefreshing) {
          setRefreshing(false);
        }
      }
    },
    [token],
  );

  useEffect(() => {
    if (token) {
      console.log('Token is present, fetching wishlist data...');
      getWishlistData();
    } else {
      console.log('Token is not present, skipping data fetch.');
    }
  }, [getWishlistData, token]);

  const handleRefresh = () => {
    getWishlistData(true);
    getCountData();
  };

  const toggleWishlist = async single => {
    setLoadingWishlist(single?.product?.id);
    try {
      const data = {
        product_id: single?.product?.id,
        variant_id: single?.variant?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      console.log('Wishlist toggle response:', wishlist);
      common_fn.showToast(wishlist?.message);
      if (wishlist?.status === true) {
        handleRefresh();
        getWishlistData();
        getCountData();
      }
    } catch (error) {
      console.log('Error toggling wishlist:', error);
    } finally {
      setLoadingWishlist(null);
    }
  };

  useEffect(() => {
    getCountData();
  }, [token, getCountData, userData]);

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
            const isLoading = loadingWishlist === item.product.id;
            return (
              <View style={{width: '50%'}}>
                <TouchableOpacity
                  style={styles.product}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {id: item?.id});
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
                      <TouchableOpacity
                        onPress={() => {
                          if (token != undefined) {
                            toggleWishlist(item);
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
                          <AntDesign name="heart" size={16} color={Color.red} />
                        )}
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
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.productDiscountPrice}>
                        {countryCode?.symbol}
                        {item?.variant?.price}
                      </Text>
                      <Text style={styles.productPrice}>
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
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  height: height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Manrope.SemiBold,
                    fontSize: 14,
                    color: Color.black,
                  }}>
                  No Wishlist
                </Text>
              </View>
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
    flex: 1,
    borderWidth: 1,
    borderColor: Color.lightgrey,
  },
  Productimage: {
    width: '100%',
    height: 170,
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
