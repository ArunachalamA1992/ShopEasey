import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImageView from '../../Components/imageView';
import { Media } from '../../Global/Media';
import moment from 'moment';
import ItemCard, { ItemCardHorizontal } from '../../Components/ItemCard';
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import { setCountryCode, setDataCount } from '../../Redux/user/UserAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { id, variant_id } = route.params;

  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);
  const [sizeChartVisible, setSizeChartVisible] = useState(false);
  const [resultDate, setResultDate] = useState(null);
  const countryCode = useSelector(state => state.UserReducer.country);
  // console.log("countryCode------  :" + JSON.stringify(countryCode));
  const dataCount = useSelector(state => state.UserReducer.count);
  var { wishlist, cart } = dataCount;
  const [topPicks, setTopPicks] = useState([]);
  const [Categories_data, setCategories_data] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [reviewsData, setReviewsData] = useState({});
  const [reviewsloadMore, setreviewsLoadMore] = useState(false);
  const [reviewsPage, setreviewsPage] = useState(1);
  const [reviewsendReached, setreviewsEndReached] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [defaultRating, setDefaultRating] = useState(0);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [addressData, setAddressCount] = useState(0);

  const maxRating = [1, 2, 3, 4, 5];

  const currentDate = moment();
  const yourDate = moment(singleData?.created_at);
  const windowDimensions = useWindowDimensions();
  const htmlRef = useRef(null);

  useEffect(() => {
    if (htmlRef?.current) {
      htmlRef?.current?.setNativeProps({ contentWidth: windowDimensions?.width });
    }
  }, [windowDimensions?.width]);

  useEffect(() => {
    setSelectedColor(singleData?.color);
    setSelectedSize(singleData?.size);
    setSelectedAge(singleData?.age);
    setSelectedGender(singleData?.gender);
    setSelectedMaterial(singleData?.material);
    getCountryData();
  }, [singleData]);

  const handleDeepLink = url => {
    try {
      const route = url.replace(/.*?:\/\//g, '');
      const route_value = route.match(/\/([^\/]+)\/?$/)[1];
      const value = route_value.split('?id=');
      const id = value[0];
      const variant_id = value[1] ? value[1].split('&')[0] : null;
      navigation.navigate(
        'ProductDetails',
        {
          id,
          variant_id,
        },
        { merge: true },
      );
    } catch (error) {
      console.error('Error handling deep link:', error);
    }
  };

  const handleInitialUrl = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    } catch (error) {
      console.error('Error handling initial URL:', error);
    }
  };

  const getCountryData = async () => {
    try {
      const countryData = await AsyncStorage.getItem('countryData');
      if (countryData === null) {
        navigation.replace('OnboardScreen');
        return;
      }
      dispatch(setCountryCode(JSON.parse(countryData)));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePropertyPress = async (type, value, has) => {
    try {
      setLoading(true);
      let data = '';

      if (!has) {
        switch (type) {
          case 'color':
            setSelectedColor(null);
            data = `color=${value}`;
            break;
          case 'age':
            setSelectedAge(null);
            data = `age=${value}`;
            break;
          case 'gender':
            setSelectedGender(null);
            data = `gender=${value}`;
            break;
          case 'material':
            setSelectedMaterial(null);
            data = `material=${value}`;
            break;
          case 'size':
            setSelectedSize(null);
            data = `size=${value}`;
            break;
          default:
            break;
        }

        try {
          let param = `${id}`;
          data += `&region_id=${countryCode?.id}`
          console.log('Sending only current param *********************:', data);
          const responseData = await fetchData.single_property(
            param,
            data,
            token,
          );

          setSingleData(responseData?.data);
        } catch (error) {
          console.log('Error fetching property data:', error);
        } finally {
          setLoading(false);
        }
        return;
      }

      switch (type) {
        case 'color':
          setSelectedColor(value);
          break;
        case 'age':
          setSelectedAge(value);
          break;
        case 'gender':
          setSelectedGender(value);
          break;
        case 'material':
          setSelectedMaterial(value);
          break;
        case 'size':
          setSelectedSize(value);
          break;
        default:
          break;
      }
      try {
        let param = `${id}`;
        data = `region_id=${countryCode?.id}&${type}=${value}`;

        if (selectedSize && type !== 'size') data += `&size=${selectedSize}`;
        if (selectedColor && type !== 'color')
          data += `&color=${selectedColor}`;
        if (selectedAge && type !== 'age') data += `&age=${selectedAge}`;
        if (selectedGender && type !== 'gender')
          data += `&gender=${selectedGender}`;
        if (selectedMaterial && type !== 'material')
          data += `&material=${selectedMaterial}`;

        console.log('data-------------------********', data);
        const responseData = await fetchData.single_property(
          param,
          data,
          token,
        );
        setSingleData(responseData?.data);
      } catch (error) {
        console.log('Error fetching property data:', error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const rating = parseFloat(reviewsData?.rating || '0');
    setDefaultRating(rating);
  }, [reviewsData]);

  const originalPrice = singleData?.org_price;
  // / countryCode?.price_margin;
  const offerPrice = singleData?.offer_price
    ? singleData?.offer_price
    : singleData?.price;
  // / countryCode?.price_margin;

  const discount = parseFloat(
    ((originalPrice - offerPrice) / originalPrice) * 100,
  ).toFixed(2);

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
      setResultDate(result);
    }
  }, [currentDate, yourDate, singleData]);

  useEffect(() => {
    setLoading(true);
    handleInitialUrl();
    getData().finally(() => {
      setLoading(false);
    });
    getCountData();
  }, [id]);

  const getData = async () => {
    try {
      const productData = await fetchData.single_property(
        `${id}?id=${variant_id}&region_id=${countryCode?.id}`,
        '',
        token,
      );
      // console.log("productData ------------- : ", productData);
      setSingleData(productData?.data);
      // top picks
      const topPicksData = await fetchData.list_products(
        `project=top-picks&region_id=${countryCode?.id}`,
        token,
      );
      // console.log("top-picks ------------- : ", topPicksData);

      setTopPicks(topPicksData?.data);
      //you may also like this
      var like_this_param = `category_id=${productData?.data?.product?.category_id}&region_id=${countryCode?.id}`;
      const like_this_data = await fetchData.list_products(
        like_this_param,
        token,
      );
      setCategories_data(like_this_data?.data);
      // Reviews
      const reviewData = await fetchData.get_review(id, token);
      console.log("REVIEW DATAS ----------------:",reviewData);
      
      setReviewsData(reviewData);
      setShowLoadMore(true);
      // Follow Status
      const sellerData = await fetchData.seller_list(
        `vendor_id=${singleData?.product?.vendor?.id}`,
        token,
      );
      setFollowStatus(sellerData?.data?.[0]?.is_follow);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = Page + 1;
      var data = `category_id=${singleData?.product?.category_id}&region_id=${countryCode?.id}&page=${nextPage}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...Categories_data, ...response?.data];
        setCategories_data(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  const loadReviewData = async () => {
    if (reviewsloadMore || reviewsendReached) {
      return;
    }
    setreviewsLoadMore(true);
    try {
      const nextPage = reviewsPage + 1;
      var data = `id?page=${nextPage}`;
      const response = await fetchData.get_review(data, token);
      if (response?.data.length > 0) {
        setreviewsPage(nextPage);
        const updatedData = [...reviewsData, ...response?.data];
        setReviewsData(updatedData);
        setShowLoadMore(true);
      } else {
        setreviewsEndReached(true);
        setShowLoadMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setreviewsLoadMore(false);
    }
  };

  const [showLoadMore, setShowLoadMore] = useState(false);

  const setFollowProfile = async id => {
    try {
      var param = `${id}`;
      const setFollow = await fetchData.post_follow(param, {}, token);
      if (setFollow.status?.message == 'Follow successful') {
        setFollowStatus(true);
      } else {
        setFollowStatus(false);
      }
      getData();
      common_fn.showToast(setFollow?.message);
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
          // if (singleData?.is_wishlisted == true) {
          //   toggle_WishList(singleData);
          // }
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
          getCountData();
          getData();
          // navigation.navigate('MyCartTab');
        } else {
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
          navigation.navigate('Auth');
        }
      } else {
        common_fn.showToast(`Please Select the 
                        Please select a{' '}
                          ${singleData?.variants_list?.color?.length > 0 &&
          'color'
          }
                          ${singleData?.variants_list?.color?.length > 0 &&
          singleData?.variants_list?.size?.length > 0 &&
          ' or '
          }
                          ${singleData?.variants_list?.size?.length > 0 &&
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
        navigation.navigate('OrderConfirmation', { CheckOut, ids: [], buyNow: "BuyNow" });
        setModalVisible(false);
      } else {
        common_fn.showToast(`Please Select the
                              ${singleData?.variants_list?.color?.length > 0 &&
          'color'
          }
                              ${singleData?.variants_list?.color?.length > 0 &&
          singleData?.variants_list?.size?.length > 0 &&
          ' or '
          }
                              ${singleData?.variants_list?.size?.length > 0 &&
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
      setInterval(async () => {
        const getaddress = await fetchData.list_address(``, token);
        // console.log("address --------------- :", getaddress);
        setAddressCount(getaddress?.count);
      }, 1000);


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

  const splitByHighlights = data => {
    const highlights = [];

    data?.forEach(item => {
      const highlight = item?.highlight;
      if (highlight) {
        highlights.push(item);
      }
    });

    return highlights;
  };

  const highlightData = splitByHighlights(singleData?.product?.features);
  const materialdata = [
    {
      id: 1,
      name: 'category',
      value: singleData?.product?.category?.category_name,
    },
    {
      id: 2,
      name: 'Material',
      value: singleData?.material,
    },
    {
      id: 3,
      name: 'Country of Origin',
      value: singleData?.product?.vendor?.country,
    },
    {
      id: 4,
      name: 'Package Count',
      value: singleData?.package_count,
    },
    {
      id: 5,
      name: 'Package Unit',
      value: singleData?.package_unit,
    },
    {
      id: 6,
      name: 'Package Weight',
      value: singleData?.package_weight,
    },
  ];

  const addDays = days => {
    let date = new Date();
    date?.setDate(date?.getDate() + days);
    return date;
  };
  const deliveryDate = addDays(8);

  // console.log("singleData?.offer_price : singleData?.price ==== :", singleData?.offer_price + "dgfdgklk" + singleData?.price);


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
          style={{ padding: 5 }}>
          <Icon name="arrow-back" size={30} color={Color.black} />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10, flex: 1 }}>
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
          style={{ marginHorizontal: 10 }}
          onPress={() => {
            share_product(singleData?.product_id);
          }}>
          <Icon name="share-social" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
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
          style={{ marginHorizontal: 10 }}
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
        <View style={{ padding: 10 }}>
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
          <View style={{ flex: 1 }}>
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
                    source={{ uri: Media.no_image }}
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
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              marginRight: 10,
                              marginTop: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              handlePropertyPress(
                                'color',
                                item?.color,
                                item?.has,
                              );
                            }}>
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
                                source={{ uri: item?.image }}
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
                  <View style={{ marginVertical: 10 }}>
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
                          { alignItems: 'center', marginTop: 5 },
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
                        {parseFloat(singleData?.offer_price ? singleData?.offer_price : singleData?.price).toFixed(2)}{' '}
                        {/* {singleData?.org_price > singleData?.offer_price &&
                          singleData?.org_price > 0 && ( */}
                        {(singleData?.offer_price ? singleData?.offer_price : singleData?.price) < singleData?.org_price && <Text style={styles.productPrice}>
                          {countryCode?.symbol}
                          {parseFloat(singleData?.org_price).toFixed(2)}
                        </Text>}
                        {/* )} */}
                      </Text>
                      {(singleData?.offer_price ? singleData?.offer_price : singleData?.price) < singleData?.org_price && <Text
                        style={{
                          fontFamily: Manrope.ExtraBold,
                          fontSize: 12,
                          color: '#0FAD45',
                          borderWidth: 1,
                          borderColor: '#0FAD45',
                          paddingHorizontal: 10,
                        }}>
                        {discount}% OFF
                      </Text>}
                    </View>
                    {singleData?.stock == 0 && (
                      <Text
                        style={{
                          fontFamily: Manrope.SemiBold,
                          fontSize: 14,
                          color: Color.red,
                        }}>
                        Sold Out
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.SemiBold,
                      marginVertical: 5,
                    }}>
                    Your order will be delivered by{' '}
                    {moment(deliveryDate).format('ddd, MMM D')}
                  </Text>

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
                        {countryCode?.symbol} {countryCode?.shipping_charge}
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
                      source={{ uri: Media.return }}
                      style={{ width: 20, height: 20 }}
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
                  {highlightData?.length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          fontFamily: Manrope.Bold,
                          padding: 5,
                        }}>
                        Highlights
                      </Text>
                      {highlightData?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderColor: Color.lightBlack,
                              borderRadius: 5,
                              borderWidth: 1,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.cloudyGrey,
                                  fontFamily: Manrope.Medium,
                                  padding: 5,
                                }}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderLeftColor: Color.lightBlack,
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Color.lightBlack,
                                  fontFamily: Manrope.SemiBold,
                                  padding: 5,
                                }}>
                                {item?.value}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  {singleData?.gender != null && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              { paddingHorizontal: 10, paddingVertical: 5 },
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
                                    onPress={() => {
                                      handlePropertyPress(
                                        'color',
                                        item?.color,
                                        item?.has,
                                      );
                                    }}>
                                    <View
                                      style={[
                                        styles.colorView,
                                        { backgroundColor: item?.color_code },
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
                      <>
                        <View style={styles.sizeContainer}>
                          <Text style={styles.sizeLabel}>Size :</Text>
                          <View style={styles.sizeOptions}>
                            {singleData?.variants_list?.size?.map(
                              (item, index) => (
                                <TouchableOpacity
                                  key={index}
                                  style={styles.sizeOption}
                                  onPress={() => {
                                    handlePropertyPress(
                                      'size',
                                      item?.size,
                                      item?.has,
                                    );
                                  }}>
                                  <View
                                    style={[
                                      styles.sizeView,
                                      {
                                        backgroundColor: !item?.has
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
                                  {/* {!item?.has && (
                                    <Text style={styles.soldText}>sold</Text>
                                  )} */}
                                </TouchableOpacity>
                              ),
                            )}
                          </View>
                        </View>
                        <View style={styles.separator}></View>
                      </>
                    ) : null}
                    {singleData?.product?.sub_sub_category?.size_chart && (
                      <TouchableOpacity
                        onPress={() => {
                          setSizeChartVisible(true);
                        }}>
                        <Text
                          style={{
                            fontFamily: Manrope.Bold,
                            fontSize: 16,
                            color: Color.blue,
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>
                          Size Chart
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Modal
                      transparent={true}
                      visible={sizeChartVisible}
                      animationType="slide">
                      <View
                        style={{
                          backgroundColor: Color.transparantBlack,
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 10,
                        }}>
                        <TouchableOpacity
                          style={{ position: 'absolute', right: 10, top: 10 }}
                          onPress={() => {
                            setSizeChartVisible(false);
                          }}>
                          <Text
                            style={{
                              opacity: 1,
                              color: Color.red,
                              fontWeight: 'bold',
                              fontSize: 20,
                              paddingHorizontal: 5,
                            }}>
                            Close
                          </Text>
                          <Icon
                            name={'close-circle'}
                            size={40}
                            color={Color.red}
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            width: '100%',
                            backgroundColor: '#fff', // Adding background color for modal content
                            paddingVertical: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            paddingHorizontal: 30,
                          }}>
                          {singleData?.product?.sub_sub_category?.size_chart ? (
                            <>
                              <Image
                                source={{
                                  uri: singleData?.product?.sub_sub_category
                                    ?.size_chart,
                                }}
                                style={{
                                  width: '100%',
                                  height: 200,
                                  resizeMode: 'contain',
                                }}
                              />
                              <View style={styles.separator}></View>
                            </>
                          ) : (
                            <Text>No size chart available</Text> // Handle when no size chart is available
                          )}
                        </View>
                      </View>
                    </Modal>

                    {singleData?.variants_list?.age?.length > 0 ? (
                      <>
                        <View style={styles.colorContainer}>
                          <Text style={styles.label}>Age :</Text>
                          <View
                            style={[
                              styles.colorOptions,
                              { paddingHorizontal: 10, paddingVertical: 5 },
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
                                    onPress={() => {
                                      handlePropertyPress(
                                        'age',
                                        item?.age,
                                        item?.has,
                                      );
                                    }}>
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
                              { paddingHorizontal: 10, paddingVertical: 5 },
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
                                    onPress={() => {
                                      handlePropertyPress(
                                        'gender',
                                        item?.gender,
                                        item?.has,
                                      );
                                    }}>
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
                              { paddingHorizontal: 10, paddingVertical: 5 },
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
                                    onPress={() => {
                                      handlePropertyPress(
                                        'material',
                                        item?.material,
                                        item?.has,
                                      );
                                    }}>
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
                                      onPress={() => {
                                        handlePropertyPress(
                                          'color',
                                          item?.color,
                                          item?.has,
                                        );
                                      }}>
                                      <View
                                        style={[
                                          styles.colorView,
                                          { backgroundColor: item?.color_code },
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
                        <>
                          <View style={styles.sizeContainer}>
                            <Text style={styles.sizeLabel}>Size :</Text>
                            <View style={styles.sizeOptions}>
                              {singleData?.variants_list?.size?.map(
                                (item, index) => (
                                  <TouchableOpacity
                                    key={index}
                                    style={styles.sizeOption}
                                    onPress={() => {
                                      handlePropertyPress(
                                        'size',
                                        item?.size,
                                        item?.has,
                                      );
                                    }}>
                                    <View
                                      style={[
                                        styles.sizeView,
                                        {
                                          backgroundColor: !item?.has
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
                                    {/* {!item?.has && (
                                      <Text style={styles.soldText}>sold</Text>
                                    )} */}
                                  </TouchableOpacity>
                                ),
                              )}
                            </View>
                          </View>
                          <View style={styles.separator}></View>
                        </>
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
                        source={{ uri: Media.user }}
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
                        marginLeft: 15,
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
                        <TouchableOpacity
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
                            {followStatus ? 'Following' : 'Follow'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
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
                  <View style={{ width: scr_width }}>
                    <RenderHtml
                      ref={htmlRef}
                      tagsStyles={styles.htmlStyles}
                      contentWidth={'100%'}
                      source={{ html: singleData?.product?.description }}
                    />
                  </View>
                </View>
                {singleData?.product?.features?.length > 0 ? (
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
                        marginBottom: 10,
                      }}>
                      Product Details
                    </Text>
                    {singleData?.product?.features?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: Color.lightBlack,
                            borderRadius: 5,
                            borderWidth: 1,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Medium,
                                padding: 5,
                              }}>
                              {item?.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderLeftColor: Color.lightBlack,
                              borderLeftWidth: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.lightBlack,
                                fontFamily: Manrope.SemiBold,
                                padding: 5,
                              }}>
                              {item?.value}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
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
                        marginBottom: 10,
                      }}>
                      Product Details
                    </Text>
                    {materialdata?.map((item, index) => {
                      return (
                        item?.value != null && (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderColor: Color.lightBlack,
                              borderRadius: 5,
                              borderWidth: 1,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.cloudyGrey,
                                  fontFamily: Manrope.Medium,
                                  padding: 5,
                                }}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderLeftColor: Color.lightBlack,
                                borderLeftWidth: 1,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: Color.lightBlack,
                                  fontFamily: Manrope.SemiBold,
                                  padding: 5,
                                }}>
                                {item?.value}
                              </Text>
                            </View>
                          </View>
                        )
                      );
                    })}
                  </View>
                )}
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
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      {reviewsData?.data?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{ width: '100%', alignItems: 'center' }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={{ uri: Media?.user }}
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
                                <View style={{ width: '100%' }}>
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
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                  }}>
                                  {item?.images?.map((image, image_index) => (
                                    <Image
                                      key={image_index}
                                      source={{ uri: image }}
                                      style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        marginBottom: 10,
                                        marginLeft: 5,
                                      }}
                                      resizeMode="cover"
                                    />
                                  ))}
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
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            loadReviewData();
                          }}>
                          <Text
                            style={{
                              fontFamily: Manrope?.SemiBold,
                              fontSize: 12,
                              color: Color.lightBlack,
                              textDecorationLine: 'underline',
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
                          More
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={topPicks}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
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
                      data={Categories_data.filter(item => item.id !== id)}
                      numColumns={2}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) =>
                        <ItemCard item={item} navigation={navigation} />
                      }
                      onEndReached={() => {
                        loadMoreData();
                      }}
                      onEndReachedThreshold={3}
                    />
                    {/* {SuggestionLoadMore && (
                      <TouchableOpacity
                        onPress={() => {
                          loadSuggestionItems();
                        }}
                        style={{
                          padding: 10,
                          borderWidth: 1,
                          borderColor: Color.primary,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Manrope.Bold,
                            color: Color.primary,
                            marginHorizontal: 5,
                            textDecorationLine: 'underline',
                            textAlign: 'center',
                          }}>
                          See more
                        </Text>
                      </TouchableOpacity>
                    )} */}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          {singleData?.status == 1 && singleData?.stock > 0 ? (
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
          ) : singleData?.status == 1 && singleData?.stock == 0 ? (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 16,
                  fontFamily: Manrope.SemiBold,
                }}>
                This product is currently Unavailable
              </Text>
            </View>
          ) : (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 16,
                  fontFamily: Manrope.SemiBold,
                }}>
                This product is not available in your region.
              </Text>
            </View>
          )}
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
      lineHeight: 20, padding: 0
    },
    h1: {
      fontSize: 20,
      color: '#000000',
    },
    p: {
      fontSize: 16,
      textAlign: 'justify',
      margin: 2, padding: 0
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
    paddingVertical: 2,
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
    marginBottom: 5,
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
