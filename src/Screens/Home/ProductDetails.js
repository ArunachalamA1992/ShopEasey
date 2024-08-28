import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImageView from '../../Components/imageView';
import {Media} from '../../Global/Media';
import moment from 'moment';
import {ItemCardHorizontal} from '../../Components/ItemCard';
import {scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import RenderHtml from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';
import {setCountryCode, setDataCount} from '../../Redux/user/UserAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';

const ProductDetails = ({route, navigation}) => {
  const {id, variant_id} = route.params;
  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);
  const [resultDate, setResultDate] = useState(null);
  const countryCode = useSelector(state => state.UserReducer.country);
  const dataCount = useSelector(state => state.UserReducer.count);
  var {wishlist, cart} = dataCount;
  const [topPicks, setTopPicks] = useState([]);
  const [Categories_data, setCategories_data] = useState([]);
  const [reviewsData, setReviewsData] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [followStatus, setFollowStatus] = useState('Follow');

  useEffect(() => {
    setSelectedColor(singleData?.color);
    setSelectedSize(singleData?.size);
    setSelectedAge(singleData?.age);
    setSelectedGender(singleData?.gender);
    setSelectedMaterial(singleData?.material);
    getCountryData();
  }, [singleData]);

  const getCountryData = async () => {
    try {
      const countryData = await AsyncStorage.getItem('countryData');
      console.log('countryData', countryData);
      if (countryData === null) {
        navigation.replace('OnboardScreen');
        return;
      }
      dispatch(setCountryCode(JSON.parse(countryData)));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleColorPress = async item => {
    setLoading(true);
    setSelectedColor(item?.color);
    // setSelectedVariantData(item);
    // setSelectedSize(null);
    // setSizeVisible(true);
    // setWishlistVariantId(item?.id);
    // setProductImages(item?.productImages);
    try {
      var param = id;
      var data = `color=${item?.color}`;
      const color_data = await fetchData.single_property(param, data, token);
      setSingleData(color_data?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgePress = async item => {
    setLoading(true);
    setSelectedAge(item?.age);
    // setSelectedVariantData(item);
    // setSelectedSize(null);
    // setSizeVisible(true);
    // setWishlistVariantId(item?.id);
    // setProductImages(item?.productImages);
    try {
      var param = id;
      var data = `age=${item?.age}`;
      const age_data = await fetchData.single_property(param, data, token);
      setSingleData(age_data?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenderPress = async item => {
    setLoading(true);
    setSelectedGender(item?.gender);
    // setSelectedVariantData(item);
    // setSelectedSize(null);
    // setSizeVisible(true);
    // setWishlistVariantId(item?.id);
    // setProductImages(item?.productImages);
    try {
      var param = id;
      var data = `gender=${item?.gender}`;
      const gender_data = await fetchData.single_property(param, data, token);
      setSingleData(gender_data?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialPress = async item => {
    setLoading(true);
    setSelectedMaterial(item?.material);
    // setSelectedVariantData(item);
    // setSelectedSize(null);
    // setSizeVisible(true);
    // setWishlistVariantId(item?.id);
    // setProductImages(item?.productImages);
    try {
      var param = id;
      var data = `material=${item?.material}`;
      const material_data = await fetchData.single_property(param, data, token);
      setSingleData(material_data?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizePress = async item => {
    // setLoading(true);
    setSelectedSize(item?.size);
    try {
      var param = id;
      var data = `size=${item?.size}`;
      if (selectedColor != null) {
        data += `&color=${selectedColor}`;
      }
      const size_data = await fetchData.single_property(param, data, token);
      setSingleData(size_data?.data);
      // setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const dispatch = useDispatch();
  const filteredSizes = singleData?.variants_list?.color?.filter(
    variant => !selectedColor || variant.color === selectedColor,
  );

  const [defaultRating, setDefaultRating] = useState(0);
  console.log('defaultRating', defaultRating);
  useEffect(() => {
    const rating = parseFloat(reviewsData?.rating || '0');
    setDefaultRating(rating);
  }, [reviewsData]);

  const [tabIndex, setIndex] = useState(0);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [addressData, setAddressCount] = useState(0);

  const maxRating = [1, 2, 3, 4, 5];

  const originalPrice = singleData?.org_price / countryCode?.price_margin;
  const offerPrice = singleData?.offer_price
    ? singleData?.offer_price
    : singleData?.price / countryCode?.price_margin;

  const discount = parseFloat(
    ((originalPrice - offerPrice) / originalPrice) * 100,
  ).toFixed(2);

  const currentDate = moment();
  const yourDate = moment(singleData?.updated_at);

  useEffect(() => {
    const daysAgo = currentDate.diff(yourDate, 'days');
    const hoursAgo = currentDate.diff(yourDate, 'hours');
    const minutesAgo = currentDate.diff(yourDate, 'minutes');

    if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
      setResultDate('Just now');
    } else {
      let result;

      if (Math.abs(daysAgo) > 0) {
        result = `${Math.abs(daysAgo)} day${
          Math.abs(daysAgo) !== 1 ? 's' : ''
        } ago`;
      } else if (Math.abs(hoursAgo) > 0) {
        result = `${Math.abs(hoursAgo)} hour${
          Math.abs(hoursAgo) !== 1 ? 's' : ''
        } ago`;
      } else {
        result = `${Math.abs(minutesAgo)} minute${
          Math.abs(minutesAgo) !== 1 ? 's' : ''
        } ago`;
      }
      setResultDate(result);
    }
  }, [currentDate, yourDate, singleData]);

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

  useEffect(() => {
    setLoading(true);
    getData().finally(() => {
      setLoading(false);
    });
    getCountData();
  }, [id]);

  const getData = async () => {
    try {
      var param = `${id}?id=${variant_id}`;
      const product_data = await fetchData.single_property(param, ``, token);
      setSingleData(product_data?.data);
      //top picks
      var top_picks_data = `project=top-picks`;
      const top_picks = await fetchData.list_products(top_picks_data, token);
      setTopPicks(top_picks?.data);
      //review data
      var review_data = `${id}`;
      const reviewData = await fetchData.get_review(review_data, token);
      setReviewsData(reviewData);
      setVisibleData(reviewData?.data?.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const [visibleData, setVisibleData] = useState(
    reviewsData?.data?.slice(0, 4),
  );
  const [showLoadMore, setShowLoadMore] = useState(
    reviewsData?.data?.length > 4,
  );

  const loadMoreItems = () => {
    const newVisibleData = reviewsData?.data?.slice(0, visibleData?.length + 8);
    setVisibleData(newVisibleData);
    setShowLoadMore(newVisibleData.length < reviewsData?.data?.length);
  };

  const setFollowProfile = async id => {
    try {
      var param = `${id}`;
      const setFollow = await fetchData.post_follow(param, {}, token);
      if (setFollow.status == true) {
        setFollowStatus('Follow');
      } else {
        setFollowStatus('UnFollow');
      }
      getData();
      common_fn.showToast(setFollow?.message);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    try {
      //you may also like this
      var like_this_param = `category_id=${singleData?.product?.category_id}`;
      const like_this_data = await fetchData.list_products(
        like_this_param,
        token,
      );
      setCategories_data(like_this_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setAdd_cart = async () => {
    try {
      const colorVariants = singleData?.variants_list?.color || [];
      const sizeVariants = singleData?.variants_list?.size || [];

      const isColorSelected = selectedColor != null;
      const isSizeSelected = selectedSize != null;

      const noVariants =
        colorVariants.length === 0 && sizeVariants.length === 0;
      const isSelectionValid =
        (colorVariants.length === 0 || isColorSelected) &&
        (sizeVariants.length === 0 || isSizeSelected);

      if (noVariants || isSelectionValid) {
        var data = {
          product_id: singleData?.product_id,
          variant_id: singleData?.id,
        };
        const add_to_cart = await fetchData.add_to_cart(data, token);
        if (add_to_cart?.status == true) {
          if (singleData?.is_wishlisted == true) {
            toggle_WishList(singleData);
          }
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
          getCountData();
          getData();
          navigation.navigate('MyCartTab');
        } else {
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
        }
      } else {
        common_fn.showToast(`Please Select the 
                        Please select a{' '}
                          ${
                            singleData?.variants_list?.color?.length > 0 &&
                            'color'
                          }
                          ${
                            singleData?.variants_list?.color?.length > 0 &&
                            singleData?.variants_list?.size?.length > 0 &&
                            ' or '
                          }
                          ${
                            singleData?.variants_list?.size?.length > 0 &&
                            'size'
                          }
                          `);
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const setBuyNow = () => {
    try {
      const colorVariants = singleData?.variants_list?.color || [];
      const sizeVariants = singleData?.variants_list?.size || [];

      const isColorSelected = selectedColor != null;
      const isSizeSelected = selectedSize != null;

      const noVariants =
        colorVariants.length === 0 && sizeVariants.length === 0;
      const isSelectionValid =
        (colorVariants.length === 0 || isColorSelected) &&
        (sizeVariants.length === 0 || isSizeSelected);

      if (noVariants || isSelectionValid) {
        var CheckOut = [
          {
            quantity: 1,
            product: singleData?.product,
            variant: {
              id: singleData?.id,
              product_id: singleData?.product_id,
              size: singleData?.size,
              color: singleData?.color,
              color_code: singleData?.color_code,
              color_group: singleData?.color_group,
              material: singleData?.material,
              package_unit: singleData?.package_unit,
              package_content: singleData?.package_content,
              package_weight: singleData?.package_weight,
              org_price: singleData?.org_price,
              price: singleData?.price,
              stock: singleData?.stock,
              sold: singleData?.sold,
              status: singleData?.status,
              created_at: singleData?.created_at,
              updated_at: singleData?.updated_at,
              is_wishlisted: singleData?.is_wishlisted,
              in_cart: singleData?.in_cart,
              productImages: singleData?.productImages,
              offer: singleData?.offer,
            },
            tax: singleData?.tax,
          },
        ];
        navigation.navigate('OrderConfirmation', {CheckOut, ids: []});
        setModalVisible(false);
      } else {
        common_fn.showToast(`Please Select the
                              ${
                                singleData?.variants_list?.color?.length > 0 &&
                                'color'
                              }
                              ${
                                singleData?.variants_list?.color?.length > 0 &&
                                singleData?.variants_list?.size?.length > 0 &&
                                ' or '
                              }
                              ${
                                singleData?.variants_list?.size?.length > 0 &&
                                'size'
                              }`);
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggle_WishList = async single => {
    try {
      var data = {
        product_id: single?.product_id,
        variant_id: single?.id,
      };
      const wishlist = await fetchData.toggle_wishlists(data, token);
      if (wishlist?.status == true) {
        common_fn.showToast(wishlist?.message);
        setModalVisible(false);
        getCountData();
        getData();
      } else {
        common_fn.showToast(wishlist?.message);
        setModalVisible(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getCountData = async () => {
    try {
      const getaddress = await fetchData.list_address(``, token);
      setAddressCount(getaddress?.count);
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

  // const share_product = async id => {
  //   const jobDeepLink = `https://shopeasey.com/product/${id}?id=${singleData?.id}`;

  //   const options = {
  //     title: singleData?.product_name,
  //     message: `Check out this Product: ${jobDeepLink}`,
  //   };
  //   try {
  //     await Share.share(options);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  const share_product = async item => {
    try {
      const image_url = singleData?.productImages?.[0]?.image;
      const base64String = await common_fn.urlToBase64(image_url);
      const jobDeepLink = `https://shopeasey.com/product/${id}?id=${singleData?.id}`;

      const shareOptions = {
        title: 'Share via',
        message: `Check out this property: ${jobDeepLink}`,
        url: `data:image/jpeg;base64,${base64String}`,
        type: 'image/jpeg',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const hasNonEmptyColor = singleData?.variants_list?.color?.some(
    item => item?.color && item?.color !== '',
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: Color.white,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
          <Icon name="arrow-back" size={30} color={Color.black} />
        </TouchableOpacity>
        <View style={{marginHorizontal: 10, flex: 1}}>
          <Text
            style={{
              color: Color.black,
              fontSize: 14,
              fontFamily: Manrope.Bold,
            }}>
            {singleData?.product?.category?.category_name}
          </Text>
          <Text
            style={{
              color: Color.cloudyGrey,
              fontSize: 12,
              fontFamily: Manrope.Medium,
            }}
            numberOfLines={1}>
            {singleData?.product?.product_name}
          </Text>
        </View>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            share_product(singleData?.product_id);
          }}>
          <Icon name="share-social" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('WishListTab');
          }}>
          {wishlist != 0 ? (
            <Badge
              style={{
                position: 'absolute',
                zIndex: 1,
                top: -10,
                right: -10,
                backgroundColor: Color.red,
                color: Color.white,
                fontFamily: Manrope.Bold,
                fontSize: 12,
              }}>
              {wishlist}
            </Badge>
          ) : null}
          <AntDesign name="hearto" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('MyCartTab');
          }}>
          {cart != 0 ? (
            <Badge
              style={{
                position: 'absolute',
                zIndex: 1,
                top: -10,
                right: -10,
                backgroundColor: Color.red,
                color: Color.white,
                fontFamily: Manrope.Bold,
                fontSize: 12,
              }}>
              {cart}
            </Badge>
          ) : null}
          <Feather name="shopping-cart" size={25} color={Color.black} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={300}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'30%'}
              height={20}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={20}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={'20%'}
              height={40}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={'20%'}
              height={40}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'30%'}
                height={40}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: Color.white,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (token != undefined) {
                      toggle_WishList(singleData);
                    } else {
                      navigation.navigate('Auth');
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: 40,
                    top: 15,
                    zIndex: 1,
                    backgroundColor: '#FFFFFF80',
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <AntDesign
                    name={singleData?.is_wishlisted ? 'heart' : 'hearto'}
                    size={24}
                    color={singleData?.is_wishlisted ? Color.red : Color.black}
                  />
                </TouchableOpacity>
                {singleData?.productImages?.length > 0 ? (
                  <ImageView images={singleData?.productImages} />
                ) : (
                  <Image
                    source={{uri: Media.no_image}}
                    style={{
                      width: '100%',
                      height: 250,
                      resizeMode: 'contain',
                    }}
                  />
                )}
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: Color.white,
                    marginTop: 50,
                  }}>
                  {singleData?.variants_list?.color?.length > 1 && (
                    <FlatList
                      data={singleData?.variants_list?.color}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              marginRight: 10,
                              marginTop: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => handleColorPress(item)}>
                            <View
                              key={index}
                              style={{
                                borderWidth: 1,
                                borderColor:
                                  selectedColor === item?.color
                                    ? Color.primary
                                    : Color.lightgrey,
                                borderRadius: 100,
                                padding: 10,
                              }}>
                              <Image
                                source={{uri: item?.image}}
                                style={{
                                  width: 50,
                                  height: 50,
                                  resizeMode: 'contain',
                                  borderRadius: 100,
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: Color.black,
                                fontSize: 12,
                                fontFamily: Manrope.Medium,
                              }}>
                              {item?.color?.split('')[0] == '#'
                                ? common_fn.getColorName(item?.color)
                                : item?.color}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: Color.white,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                    <Text
                      style={{
                        color: Color.cloudyGrey,
                        fontSize: 13,
                        fontFamily: Manrope.Medium,
                      }}>
                      {singleData?.type && `${singleData?.type}-`}
                      {singleData?.product?.category?.category_name}
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
                      <FontAwesome6
                        name="award"
                        size={14}
                        color={Color.white}
                      />
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
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{
                        color: Color.lightBlack,
                        fontSize: 15,
                        fontFamily: Manrope.SemiBold,
                      }}>
                      {singleData?.product?.product_name}
                    </Text>
                    {reviewsData?.data?.length > 0 && (
                      <View
                        style={[
                          styles.customRatingBarStyle,
                          {alignItems: 'center', marginTop: 5},
                        ]}>
                        {maxRating.map((item, index) => {
                          let iconName;
                          if (item <= Math.floor(defaultRating)) {
                            iconName = 'star';
                          } else if (
                            item === Math.ceil(defaultRating) &&
                            defaultRating % 1 !== 0
                          ) {
                            iconName = 'star-half-full';
                          } else {
                            iconName = 'star-o';
                          }

                          return (
                            <View
                              activeOpacity={0.7}
                              key={index}
                              style={{
                                marginRight: 5,
                              }}>
                              <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={iconName}
                                icon_size={16}
                                icon_color={Color.sunShade}
                              />
                            </View>
                          );
                        })}
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Manrope.Bold,
                            marginHorizontal: 5,
                          }}>
                          {reviewsData.rating}
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.cloudyGrey,
                              fontFamily: Manrope.Bold,
                              marginHorizontal: 5,
                            }}>
                            {' '}
                            {`(${reviewsData.count} Reviews)`}
                          </Text>
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                      }}>
                      <Text style={styles.productDiscountPrice}>
                        {countryCode?.symbol}
                        {parseFloat(
                          singleData?.offer_price
                            ? singleData?.offer_price
                            : singleData?.price / countryCode?.price_margin,
                        ).toFixed(2)}{' '}
                        <Text style={styles.productPrice}>
                          {countryCode?.symbol}
                          {parseFloat(
                            singleData?.org_price / countryCode?.price_margin,
                          ).toFixed(2)}
                        </Text>
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
                    {/* <Text
                      style={{
                        fontFamily: Manrope.SemiBold,
                        fontSize: 12,
                        color: Color.red,
                      }}>
                      ( Only {singleData?.stock} pending )
                    </Text> */}
                  </View>

                  <View
                    style={{
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
                    {/* <Text
                      style={{
                        fontSize: 14,
                        color: Color.blue,
                        fontFamily: Manrope.Bold,
                        textDecorationLine: 'underline',
                      }}>
                      Learn More
                    </Text> */}
                  </View>
                  {countryCode?.id != 452 && (
                    <View
                      style={{
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
                        {countryCode?.symbol} {10}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    <Image
                      source={{uri: Media.return}}
                      style={{width: 20, height: 20}}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textAlign: 'justify',
                        marginLeft: 5,
                      }}>
                      3-Day Returns{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation?.navigate('TermsandConditions');
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.lightBlack,
                          textAlign: 'justify',
                          fontWeight: '600',
                          textDecorationLine: 'underline',
                        }}>
                        Terms & Conditions
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        textAlign: 'justify',
                      }}>
                      {' '}
                      and{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation?.navigate('PrivacyPolicy');
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.lightBlack,
                          textAlign: 'justify',
                          fontWeight: '600',
                          letterSpacing: 0.5,
                          textDecorationLine: 'underline',
                        }}>
                        Privacy Policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {singleData?.gender != null && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}>
                        Gender
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                        }}>
                        {singleData?.gender}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    width: scr_width,
                    paddingVertical: 5,
                    marginVertical: 10,
                    backgroundColor: Color.softGrey,
                  }}></View>
                <View>
                  <View>
                    {singleData?.variants_list?.color?.length > 0 ? (
                      <>
                        <View style={styles.colorContainer}>
                          <Text style={styles.label}>Color :</Text>
                          <View
                            style={[
                              styles.colorOptions,
                              {paddingHorizontal: 10, paddingVertical: 5},
                            ]}>
                            {singleData?.variants_list?.color?.map(
                              (item, index) => {
                                // if (item?.color && item?.color !== '') {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={[
                                      styles.colorOption,
                                      {
                                        backgroundColor:
                                          selectedColor === item?.color
                                            ? '#0D71BA50'
                                            : Color.white,
                                      },
                                    ]}
                                    onPress={() => handleColorPress(item)}
                                    disabled={item?.stock == 0}>
                                    <View
                                      style={[
                                        styles.colorView,
                                        {backgroundColor: item?.color_code},
                                      ]}
                                    />
                                    <Text
                                      style={[
                                        styles.colorNameText,
                                        {
                                          color: Color.black,
                                        },
                                      ]}>
                                      {item?.color?.split('')[0] == '#'
                                        ? common_fn.getColorName(item?.color)
                                        : item?.color}
                                    </Text>
                                  </TouchableOpacity>
                                );
                                // }
                                // return null;
                              },
                            )}
                          </View>
                        </View>
                        <View style={styles.separator}></View>
                      </>
                    ) : null}

                    {singleData?.variants_list?.size?.length > 0 ? (
                      <View style={styles.sizeContainer}>
                        <Text style={styles.sizeLabel}>Size :</Text>
                        <View style={styles.sizeOptions}>
                          {singleData?.variants_list?.size?.map(
                            (item, index) => (
                              <TouchableOpacity
                                key={index}
                                style={styles.sizeOption}
                                onPress={() => handleSizePress(item)}
                                disabled={item?.stock == 0}>
                                <View
                                  style={[
                                    styles.sizeView,
                                    {
                                      backgroundColor:
                                        item?.stock == 0
                                          ? '#EEEEEE80'
                                          : selectedSize === item?.size
                                          ? '#0D71BA50'
                                          : '#EEEEEE',
                                    },
                                  ]}>
                                  <Text
                                    style={[
                                      styles.sizeText,
                                      {
                                        color: Color.black,
                                      },
                                    ]}>
                                    {item?.size}
                                  </Text>
                                </View>
                                {item?.stock == 0 && (
                                  <Text style={styles.soldText}>sold</Text>
                                )}
                              </TouchableOpacity>
                            ),
                          )}
                        </View>
                      </View>
                    ) : null}

                    {singleData?.variants_list?.age?.length > 0 ? (
                      <>
                        <View style={styles.colorContainer}>
                          <Text style={styles.label}>Age :</Text>
                          <View
                            style={[
                              styles.colorOptions,
                              {paddingHorizontal: 10, paddingVertical: 5},
                            ]}>
                            {singleData?.variants_list?.age?.map(
                              (item, index) => {
                                // if (item?.age && item?.age !== '') {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={[
                                      styles.colorOption,
                                      {
                                        backgroundColor:
                                          selectedAge === item?.age
                                            ? '#0D71BA50'
                                            : Color.white,
                                      },
                                    ]}
                                    onPress={() => handleAgePress(item)}
                                    disabled={item?.stock == 0}>
                                    <View
                                      style={[
                                        styles.colorView,
                                        {backgroundColor: item?.age},
                                      ]}
                                    />
                                    <Text
                                      style={[
                                        styles.colorNameText,
                                        {
                                          color: Color.black,
                                        },
                                      ]}>
                                      {item?.age}
                                    </Text>
                                  </TouchableOpacity>
                                );
                                // }
                                // return null;
                              },
                            )}
                          </View>
                        </View>
                        <View style={styles.separator}></View>
                      </>
                    ) : null}

                    {singleData?.variants_list?.gender?.length > 0 ? (
                      <>
                        <View style={styles.colorContainer}>
                          <Text style={styles.label}>Gender :</Text>
                          <View
                            style={[
                              styles.colorOptions,
                              {paddingHorizontal: 10, paddingVertical: 5},
                            ]}>
                            {singleData?.variants_list?.gender?.map(
                              (item, index) => {
                                // if (item?.gender && item?.gender !== '') {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={[
                                      styles.colorOption,
                                      {
                                        backgroundColor:
                                          selectedGender === item?.gender
                                            ? '#0D71BA50'
                                            : Color.white,
                                      },
                                    ]}
                                    onPress={() => handleGenderPress(item)}
                                    disabled={item?.stock == 0}>
                                    <View
                                      style={[
                                        styles.colorView,
                                        {backgroundColor: item?.gender},
                                      ]}
                                    />
                                    <Text
                                      style={[
                                        styles.colorNameText,
                                        {
                                          color: Color.black,
                                        },
                                      ]}>
                                      {item?.gender}
                                    </Text>
                                  </TouchableOpacity>
                                );
                                // }
                                // return null;
                              },
                            )}
                          </View>
                        </View>
                        <View style={styles.separator}></View>
                      </>
                    ) : null}

                    {singleData?.variants_list?.material?.length > 0 ? (
                      <>
                        <View style={styles.colorContainer}>
                          <Text style={styles.label}>Material :</Text>
                          <View
                            style={[
                              styles.colorOptions,
                              {paddingHorizontal: 10, paddingVertical: 5},
                            ]}>
                            {singleData?.variants_list?.material?.map(
                              (item, index) => {
                                // if (item?.material && item?.material !== '') {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={[
                                      styles.colorOption,
                                      {
                                        backgroundColor:
                                          selectedMaterial === item?.material
                                            ? '#0D71BA50'
                                            : Color.white,
                                      },
                                    ]}
                                    onPress={() => handleMaterialPress(item)}
                                    disabled={item?.stock == 0}>
                                    <View
                                      style={[
                                        styles.colorView,
                                        {backgroundColor: item?.material},
                                      ]}
                                    />
                                    <Text
                                      style={[
                                        styles.colorNameText,
                                        {
                                          color: Color.black,
                                        },
                                      ]}>
                                      {item?.material}
                                    </Text>
                                  </TouchableOpacity>
                                );
                                // }
                                // return null;
                              },
                            )}
                          </View>
                        </View>
                        <View style={styles.separator}></View>
                      </>
                    ) : null}
                  </View>
                  <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}>
                    <Pressable
                      onPress={() => setModalVisible(false)}
                      style={styles.modalBackground}
                    />
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>
                        Please select a{' '}
                        {singleData?.variants_list?.color?.length > 0 &&
                          'color'}
                        {singleData?.variants_list?.color?.length > 0 &&
                          singleData?.variants_list?.size?.length > 0 &&
                          ' or '}
                        {singleData?.variants_list?.size?.length > 0 && 'size'}
                      </Text>

                      {singleData?.variants_list?.color?.length > 0 ? (
                        <>
                          <View style={styles.colorContainer}>
                            <Text style={styles.label}>Color :</Text>
                            <View style={styles.colorOptions}>
                              {singleData?.variants_list?.color?.map(
                                (item, index) => {
                                  // if (item?.color && item?.color !== '') {
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      style={[
                                        styles.colorOption,
                                        {
                                          backgroundColor:
                                            selectedColor === item?.color
                                              ? '#0D71BA50'
                                              : Color.white,
                                        },
                                      ]}
                                      onPress={() => handleColorPress(item)}
                                      disabled={item?.stock == 0}>
                                      <View
                                        style={[
                                          styles.colorView,
                                          {backgroundColor: item?.color_code},
                                        ]}
                                      />
                                      <Text
                                        style={[
                                          styles.colorNameText,
                                          {
                                            color: Color.black,
                                          },
                                        ]}>
                                        {item?.color?.split('')[0] == '#'
                                          ? common_fn.getColorName(item?.color)
                                          : item?.color}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                  // }
                                  // return null;
                                },
                              )}
                            </View>
                          </View>
                          <View style={styles.separator}></View>
                        </>
                      ) : null}

                      {singleData?.variants_list?.size?.length > 0 ? (
                        <View style={styles.sizeContainer}>
                          <Text style={styles.sizeLabel}>Size :</Text>
                          <View style={styles.sizeOptions}>
                            {singleData?.variants_list?.size?.map(
                              (item, index) => (
                                <TouchableOpacity
                                  key={index}
                                  style={styles.sizeOption}
                                  onPress={() => handleSizePress(item)}
                                  disabled={item?.stock == 0}>
                                  <View
                                    style={[
                                      styles.sizeView,
                                      {
                                        backgroundColor:
                                          item?.stock == 0
                                            ? '#EEEEEE80'
                                            : selectedSize === item?.size
                                            ? '#0D71BA50'
                                            : '#EEEEEE',
                                      },
                                    ]}>
                                    <Text
                                      style={[
                                        styles.sizeText,
                                        {
                                          color: Color.black,
                                        },
                                      ]}>
                                      {item?.size}
                                    </Text>
                                  </View>
                                  {item?.stock == 0 && (
                                    <Text style={styles.soldText}>sold</Text>
                                  )}
                                </TouchableOpacity>
                              ),
                            )}
                          </View>
                        </View>
                      ) : null}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 20,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={{
                            width: '50%',
                            height: 50,
                            bottom: 10,
                            marginHorizontal: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor: Color.white,
                            borderWidth: 1,
                            borderColor: Color.lightBlack,
                          }}
                          onPress={() => {
                            if (singleData?.stock == 0) {
                            } else {
                              if (singleData?.in_cart) {
                                navigation.navigate('MyCartTab');
                              } else {
                                if (token != undefined) {
                                  setAdd_cart();
                                } else {
                                  navigation.navigate('Auth');
                                }
                              }
                            }
                          }}>
                          <Iconviewcomponent
                            Icontag={'Ionicons'}
                            iconname={
                              singleData?.stock == 0 ? 'notifications' : 'cart'
                            }
                            icon_size={20}
                            icon_color={Color.black}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              paddingHorizontal: 10,
                            }}>
                            {singleData?.stock == 0
                              ? 'Notify Me'
                              : singleData?.in_cart
                              ? `Go to Cart`
                              : `Add to Cart`}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={{
                            width: '50%',
                            height: 50,
                            bottom: 10,
                            marginHorizontal: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor:
                              singleData?.stock == 0
                                ? Color.lightgrey
                                : Color.primary,
                          }}
                          disabled={singleData?.stock == 0}
                          onPress={() => {
                            if (token != undefined) {
                              if (addressData > 0) {
                                setBuyNow();
                              } else {
                                navigation.navigate('AddAddress', {
                                  item: {},
                                  CheckOut: [
                                    {
                                      quantity: 1,
                                      product: singleData?.product,
                                      variant: {
                                        id: singleData?.id,
                                        product_id: singleData?.product_id,
                                        size: singleData?.size,
                                        color: singleData?.color,
                                        color_code: singleData?.color_code,
                                        color_group: singleData?.color_group,
                                        material: singleData?.material,
                                        package_unit: singleData?.package_unit,
                                        package_content:
                                          singleData?.package_content,
                                        package_weight:
                                          singleData?.package_weight,
                                        org_price: singleData?.org_price,
                                        price: singleData?.price,
                                        stock: singleData?.stock,
                                        sold: singleData?.sold,
                                        status: singleData?.status,
                                        created_at: singleData?.created_at,
                                        updated_at: singleData?.updated_at,
                                        is_wishlisted:
                                          singleData?.is_wishlisted,
                                        in_cart: singleData?.in_cart,
                                        productImages:
                                          singleData?.productImages,
                                        offer: singleData?.offer,
                                      },
                                      tax: singleData?.tax,
                                    },
                                  ],
                                  status: 'ADD',
                                });
                              }
                            } else {
                              navigation.navigate('Auth');
                            }
                          }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'shopping-bag'}
                            icon_size={20}
                            icon_color={Color.white}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.white,
                              fontFamily: Manrope.SemiBold,
                              letterSpacing: 0.5,
                              paddingHorizontal: 10,
                            }}>
                            Buy Now
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
                {/* ))} */}
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#F0F9FB',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: Media.user}}
                        style={{
                          width: 70,
                          height: 70,
                          resizeMode: 'cover',
                          borderRadius: 100,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          color: Color.white,
                          fontFamily: Manrope.Medium,
                          backgroundColor: '#0FAD45',
                          padding: 5,
                          paddingHorizontal: 15,
                          marginTop: -10,
                          borderRadius: 5,
                        }}>
                        Preferred
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                        }}
                        onPress={() => {
                          if (token != undefined) {
                            navigation.push('SellerProfile', {
                              vendor_id: singleData?.product?.vendor?.id,
                            });
                          } else {
                            navigation.navigate('Auth');
                          }
                        }}
                        numberOfLines={2}>
                        {singleData?.product?.vendor?.business_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.lightBlack,
                          fontFamily: Manrope.Light,
                          paddingVertical: 3,
                        }}>
                        {resultDate}
                      </Text>
                      <View
                        style={{
                          ...styles.customRatingBarStyle,
                          marginTop: 5,
                          alignItems: 'center',
                        }}>
                        {maxRating.map((item, index) => {
                          let iconName;
                          if (item <= Math.floor(defaultRating)) {
                            iconName = 'star';
                          } else if (
                            item === Math.ceil(defaultRating) &&
                            defaultRating % 1 !== 0
                          ) {
                            iconName = 'star-half-full';
                          } else {
                            iconName = 'star-o';
                          }

                          return (
                            <View
                              activeOpacity={0.7}
                              key={index}
                              style={{
                                marginRight: 5,
                              }}>
                              <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={iconName}
                                icon_size={16}
                                icon_color={Color.sunShade}
                              />
                            </View>
                          );
                        })}
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Manrope.Bold,
                            marginHorizontal: 5,
                          }}>
                          {singleData?.product?.vendor?.rating}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 5,
                            padding: 10,
                          }}
                          onPress={() => {
                            if (token != undefined) {
                              navigation.push('SellerProfile', {
                                vendor_id: singleData?.product?.vendor?.id,
                              });
                            } else {
                              navigation.navigate('Auth');
                            }
                          }}>
                          <Feather
                            name="shopping-bag"
                            color={Color.white}
                            size={18}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.white,
                              fontFamily: Manrope.Bold,
                              marginHorizontal: 5,
                            }}>
                            View Shop
                          </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: Color.white,
                            borderRadius: 5,
                            padding: 10,
                            marginHorizontal: 10,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            if (token != undefined) {
                              setFollowProfile(singleData?.product?.vendor?.id);
                            } else {
                              navigation.navigate('Auth');
                            }
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Manrope.Bold,
                              marginHorizontal: 5,
                            }}>
                            {followStatus}
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    Product Details
                  </Text>
                  {singleData?.product?.features != null &&
                    singleData?.product?.features?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                padding: 5,
                              }}>
                              {item?.id}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.lightBlack,
                                fontFamily: Manrope.SemiBold,
                                letterSpacing: 0.5,
                                padding: 5,
                              }}>
                              {item?.first_name}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>

                <View
                  style={{
                    width: '100%',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    Product Description
                  </Text>
                  <View style={{width: scr_width}}>
                    <RenderHtml
                      tagsStyles={styles.htmlStyles}
                      contentWidth={'100%'}
                      source={{html: singleData?.product?.description}}
                    />
                  </View>
                </View>
                {reviewsData?.data?.length > 0 && (
                  <View
                    style={{
                      padding: 10,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}>
                      Product Ratings & Reviews
                    </Text>
                    <View style={styles.productRatingView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
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
                            letterSpacing: 0.5,
                          }}>
                          {reviewsData.rating}{' '}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: Manrope.Bold,
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          letterSpacing: 0.5,
                        }}>
                        {'  '}({reviewsData?.count} Reviews)
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      {/* {review_tab?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setIndex(index);
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor:
                                tabIndex == index
                                  ? Color.primary
                                  : Color.lightgrey,
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
                                fontSize: 12,
                                paddingHorizontal: 10,
                                color:
                                  tabIndex == index
                                    ? Color.primary
                                    : Color.black,
                              }}>
                              {item?.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })} */}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      {visibleData?.map((item, index) => {
                        return (
                          <View style={{width: '100%', alignItems: 'center'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={{uri: Media?.user}}
                                  style={{
                                    width: 70,
                                    height: 70,
                                    resizeMode: 'contain',
                                    borderRadius: 100,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 3.5,
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View>
                                    <Text
                                      style={{
                                        fontFamily: Manrope?.Bold,
                                        fontSize: 14,
                                        color: Color.black,
                                        letterSpacing: 0.5,
                                      }}>
                                      {item?.User != null
                                        ? item?.User?.first_name
                                        : 'Shopeasey User'}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      backgroundColor: '#F1FBEF',
                                      borderRadius: 5,
                                      padding: 5,
                                      paddingHorizontal: 10,
                                      marginHorizontal: 10,
                                    }}>
                                    <FontAwesome
                                      name="star"
                                      size={13}
                                      color={Color.lightYellow}
                                    />
                                    <Text
                                      style={{
                                        fontFamily: Manrope.Bold,
                                        fontSize: 12,
                                        color: Color.black,
                                        paddingHorizontal: 5,
                                      }}>
                                      {item?.rate}
                                    </Text>
                                  </View>
                                </View>
                                <View style={{width: '100%'}}>
                                  <Text
                                    style={{
                                      textAlign: 'justify',
                                      fontFamily: Manrope.Light,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      letterSpacing: 0.5,
                                      lineHeight: 22,
                                    }}>
                                    {item?.review}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                marginVertical: 10,
                                backgroundColor: Color.softGrey,
                                paddingVertical: 1,
                              }}></View>
                          </View>
                        );
                      })}
                    </View>
                    {showLoadMore && (
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          marginVertical: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            loadMoreItems();
                          }}>
                          <Text
                            style={{
                              fontFamily: Manrope?.SemiBold,
                              fontSize: 13,
                              color: Color.lightBlack,
                              textDecorationLine: 'underline',
                              letterSpacing: 0.5,
                            }}>
                            View All Reviews
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
                {topPicks?.length > 0 && (
                  <View
                    style={{
                      paddingLeft: 10,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Manrope.SemiBold,
                        }}>
                        Recommended
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('viewProducts', {
                            key: 'topPicks',
                          });
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Bold,
                          }}>
                          See more
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={topPicks}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <ItemCardHorizontal
                            item={item}
                            navigation={navigation}
                          />
                        );
                      }}
                    />
                  </View>
                )}
                {Categories_data?.length > 0 && (
                  <View
                    style={{
                      paddingLeft: 10,
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Manrope.Bold,
                        marginBottom: 10,
                      }}>
                      YOU MAY ALSO LIKE
                    </Text>
                    <FlatList
                      data={Categories_data}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <ItemCardHorizontal
                            item={item}
                            navigation={navigation}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                width: '50%',
                height: 50,
                bottom: 10,
                marginHorizontal: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: Color.white,
                borderWidth: 1,
                borderColor: Color.lightBlack,
              }}
              onPress={() => {
                if (singleData?.stock == 0) {
                } else {
                  if (singleData?.in_cart) {
                    navigation.navigate('MyCartTab');
                  } else {
                    if (token != undefined) {
                      setAdd_cart();
                    } else {
                      navigation.navigate('Auth');
                    }
                  }
                }
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'shoppingcart'}
                icon_size={20}
                icon_color={Color.black}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  paddingHorizontal: 10,
                }}>
                {singleData?.stock == 0
                  ? 'Notify Me'
                  : singleData?.in_cart
                  ? `Go to Cart`
                  : `Add to Cart`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                width: '50%',
                height: 50,
                bottom: 10,
                marginHorizontal: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor:
                  singleData?.stock == 0 ? Color.lightgrey : Color.primary,
              }}
              disabled={singleData?.stock == 0}
              onPress={() => {
                if (token != undefined) {
                  if (addressData > 0) {
                    setBuyNow();
                  } else {
                    navigation.navigate('AddAddress', {
                      item: {},
                      CheckOut: [
                        {
                          quantity: 1,
                          product: singleData?.product,
                          variant: {
                            id: singleData?.id,
                            product_id: singleData?.product_id,
                            size: singleData?.size,
                            color: singleData?.color,
                            color_code: singleData?.color_code,
                            color_group: singleData?.color_group,
                            material: singleData?.material,
                            package_unit: singleData?.package_unit,
                            package_content: singleData?.package_content,
                            package_weight: singleData?.package_weight,
                            org_price: singleData?.org_price,
                            price: singleData?.price,
                            stock: singleData?.stock,
                            sold: singleData?.sold,
                            status: singleData?.status,
                            created_at: singleData?.created_at,
                            updated_at: singleData?.updated_at,
                            is_wishlisted: singleData?.is_wishlisted,
                            in_cart: singleData?.in_cart,
                            productImages: singleData?.productImages,
                            offer: singleData?.offer,
                          },
                          tax: singleData?.tax,
                        },
                      ],
                      status: 'ADD',
                    });
                  }
                } else {
                  navigation.navigate('Auth');
                }
              }}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'shopping-bag'}
                icon_size={20}
                icon_color={Color.white}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.white,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                  paddingHorizontal: 10,
                }}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
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
  htmlStyles: {
    body: {
      width: '90%',
      fontFamily: Manrope.SemiBold,
      color: Color.cloudyGrey,
      fontSize: 12,
      lineHeight: 20,
    },
    h1: {
      fontSize: 20,
      color: '#000000',
    },
    p: {
      fontSize: 16,
      textAlign: 'justify',
    },
    strong: {
      fontWeight: '500',
    },
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  colorContainer: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  label: {
    width: '95%',
    fontSize: 16,
    color: Color.black,
    fontFamily: Manrope.SemiBold,
    marginVertical: 10,
  },
  colorOptions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    marginRight: 5,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    padding: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  colorView: {
    width: 16,
    height: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Color.cloudyGrey,
  },
  colorNameText: {
    fontSize: 12,
    fontFamily: Manrope.Bold,
    marginHorizontal: 10,
    textTransform: 'capitalize',
  },
  separator: {
    width: '100%',
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: Color.softGrey,
  },
  sizeContainer: {
    backgroundColor: Color.white,
    padding: 5,
  },
  sizeLabel: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: Color.black,
    fontFamily: Manrope.SemiBold,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  sizeOption: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  sizeView: {
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  sizeText: {
    fontSize: 12,
    fontFamily: Manrope.Bold,
    textAlign: 'center',
  },
  soldText: {
    fontSize: 12,
    color: Color.red,
    fontFamily: Manrope.Bold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  selectedVariantText: {
    marginTop: 10,
    fontSize: 16,
    color: Color.black,
    fontFamily: Manrope.Bold,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.transparantBlack,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Color.white,
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: Color.black,
    fontFamily: Manrope.SemiBold,
    textAlign: 'center',
  },
  selectVariantContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectVariantLabel: {
    fontSize: 16,
    color: Color.black,
    fontFamily: Manrope.Bold,
    marginBottom: 10,
  },
  selectVariantButton: {
    backgroundColor: Color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectVariantButtonText: {
    fontSize: 14,
    color: Color.white,
    fontFamily: Manrope.Bold,
  },
});
