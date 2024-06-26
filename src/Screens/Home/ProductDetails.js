// import React, {useCallback, useEffect, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   Modal,
//   Pressable,
//   ScrollView,
//   Share,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Color from '../../Global/Color';
// import {Manrope} from '../../Global/FontFamily';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Badge, Button} from 'react-native-paper';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import ImageView from '../../Components/imageView';
// import {Media} from '../../Global/Media';
// import moment from 'moment';
// import {products} from '../../Config/Content';
// import ItemCard, {ItemCardHorizontal} from '../../Components/ItemCard';
// import {scr_height, scr_width} from '../../Utils/Dimensions';
// import {Iconviewcomponent} from '../../Components/Icontag';
// import fetchData from '../../Config/fetchData';
// import RenderHtml from 'react-native-render-html';
// import {useDispatch, useSelector} from 'react-redux';
// import common_fn from '../../Config/common_fn';
// import {setDataCount} from '../../Redux/user/UserAction';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import {useNavigation} from '@react-navigation/native';

// const ProductDetails = ({route}) => {
//   const navigation = useNavigation();
//   const [id] = useState(route?.params?.id);
//   const [singleData, setSingleData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [resultDate, setResultDate] = useState(null);
//   const countryCode = useSelector(state => state.UserReducer.country);
//   const dataCount = useSelector(state => state.UserReducer.count);
//   var {wishlist, cart} = dataCount;
//   const [topPicks, setTopPicks] = useState([]);
//   const [Categories_data, setCategories_data] = useState([]);
//   const [reviewsData, setReviewsData] = useState({});
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedVariantId, setSelectedVariantId] = useState(null);
//   const [sizeVisible, setSizeVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [wishlistVariantId, setWishlistVariantId] = useState(null);
//   const [selectedVariantData, setSelectedVariantData] = useState({});
//   const [productImages, setProductImages] = useState([]);

//   const handleColorPress = item => {
//     setSelectedColor(item?.color);
//     setSelectedVariantId(item?.id);
//     setSelectedVariantData(item);
//     setSelectedSize(null);
//     setSizeVisible(true);
//     setWishlistVariantId(item?.id);
//     setProductImages(item?.productImages);
//   };

//   const handleSizePress = item => {
//     setSelectedSize(item?.size);
//     setSelectedVariantId(item?.id);
//     setWishlistVariantId(item?.id);
//     setSelectedVariantData(item);
//     setProductImages(item?.productImages);
//   };
//   const dispatch = useDispatch();
//   const filteredSizes = singleData?.variants?.filter(
//     variant => !selectedColor || variant.color === selectedColor,
//   );

//   const [defaultRating, setDefaultRating] = useState(singleData?.shop?.rating);
//   const [tabIndex, setIndex] = useState(0);
//   const userData = useSelector(state => state.UserReducer.userData);
//   var {token} = userData;

//   const [maxRating, setMaxRating] = useState([
//     {
//       id: 1,
//       rating: 1,
//       experience: 'poor',
//     },
//     {
//       id: 2,
//       rating: 2,
//       experience: 'Bad',
//     },
//     {
//       id: 3,
//       rating: 3,
//       experience: 'Okay',
//     },
//     {
//       id: 4,
//       rating: 4,
//       experience: 'Average',
//     },
//     {
//       id: 5,
//       rating: 5,
//       experience: 'Good',
//     },
//   ]);

//   var discount = parseInt(
//     ((selectedVariantData?.org_price - selectedVariantData?.price) /
//       selectedVariantData?.org_price) *
//       100,
//   );
//   const currentDate = moment();
//   const yourDate = moment(singleData?.vendor?.updated_at);

//   useEffect(() => {
//     const daysAgo = currentDate.diff(yourDate, 'days');
//     const hoursAgo = currentDate.diff(yourDate, 'hours');
//     const minutesAgo = currentDate.diff(yourDate, 'minutes');

//     if (daysAgo === 0 && hoursAgo === 0 && minutesAgo === 0) {
//       setResultDate('Just now');
//     } else {
//       let result;

//       if (Math.abs(daysAgo) > 0) {
//         result = `${Math.abs(daysAgo)} day${
//           Math.abs(daysAgo) !== 1 ? 's' : ''
//         } ago`;
//       } else if (Math.abs(hoursAgo) > 0) {
//         result = `${Math.abs(hoursAgo)} hour${
//           Math.abs(hoursAgo) !== 1 ? 's' : ''
//         } ago`;
//       } else {
//         result = `${Math.abs(minutesAgo)} minute${
//           Math.abs(minutesAgo) !== 1 ? 's' : ''
//         } ago`;
//       }
//       setResultDate(result);
//     }
//   }, [currentDate, yourDate, singleData]);

//   const handleRatingPress = item => {
//     if (defaultRating === item) {
//       setDefaultRating(null);
//     } else {
//       setDefaultRating(item);
//     }
//   };

//   const [showMoreButton, setShowMoreButton] = useState(false);
//   const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
//   const [numLines, setNumLines] = useState(undefined);

//   useEffect(() => {
//     setNumLines(discriptiontextShown ? undefined : 3);
//   }, [discriptiontextShown]);

//   const onDescriptionTextLayout = useCallback(
//     e => {
//       if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
//         setShowMoreButton(true);
//         setNumLines(3);
//       }
//     },
//     [discriptiontextShown],
//   );

//   const toggleTextShown = () => {
//     setDiscriptiontextShown(!discriptiontextShown);
//     setNumLines();
//   };

//   const [review_tab] = useState([
//     {
//       id: 1,
//       name: 'All',
//     },
//     {
//       id: 2,
//       name: 'Top Reviews',
//     },
//     {
//       id: 3,
//       name: 'Most Recent',
//     },
//   ]);

//   useEffect(() => {
//     setLoading(true);
//     getData().finally(() => {
//       setLoading(false);
//     });
//     getCountData();
//   }, []);

//   const getData = async () => {
//     try {
//       var p_data = `${id}`;
//       const product_data = await fetchData.single_property(p_data, token);
//       setSingleData(product_data?.data);
//       setProductImages(product_data?.data?.variants?.[0]?.productImages);
//       setSelectedVariantData(product_data?.data?.variants?.[0]);
//       //top picks
//       var top_picks_data = `project=top-picks`;
//       const top_picks = await fetchData.list_products(top_picks_data, token);
//       setTopPicks(top_picks?.data);
//       //review data
//       var review_data = `${id}`;
//       const reviewData = await fetchData.get_review(review_data, token);
//       setReviewsData(reviewData);
//       setLoading(false);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const setFollowProfile = async id => {
//     try {
//       var param = `${id}`;
//       const setFollow = await fetchData.post_follow(param, {}, token);
//       console.log('setFollow---------------', setFollow);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   useEffect(() => {
//     getCategoriesData();
//   }, []);

//   const getCategoriesData = async () => {
//     try {
//       //you may also like this
//       var like_this_param = `category_id=${singleData?.category_id}`;
//       const like_this_data = await fetchData.list_products(
//         like_this_param,
//         token,
//       );
//       setCategories_data(like_this_data?.data);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const setAdd_cart = async () => {
//     try {
//       if (selectedVariantId != null) {
//         var data = {
//           product_id: singleData?.id,
//           variant_id: selectedVariantId,
//         };
//         const add_to_cart = await fetchData.add_to_cart(data, token);
//         if (add_to_cart?.status == true) {
//           common_fn.showToast(add_to_cart?.message);
//           setModalVisible(false);
//           getCountData();
//           getData();
//         } else {
//           common_fn.showToast(add_to_cart?.message);
//           setModalVisible(false);
//         }
//       } else {
//         common_fn.showToast('Please Select the Color or Size');
//         setModalVisible(true);
//       }
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const setBuyNow = () => {
//     try {
//       if (selectedVariantId != null) {
//         var CheckOut = [
//           {
//             quantity: 1,
//             product: singleData,
//             variant: selectedVariantData,
//           },
//         ];
//         navigation.navigate('OrderConfirmation', {CheckOut});
//         setModalVisible(false);
//       } else {
//         common_fn.showToast('Please Select the Color or Size');
//         setModalVisible(true);
//       }
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const toggle_WishList = async single => {
//     try {
//       const wishlist_id =
//         selectedVariantId != null
//           ? selectedVariantId
//           : selectedVariantData?.id || null;
//       var data = {
//         product_id: single?.id,
//         variant_id: wishlist_id,
//       };
//       const wishlist = await fetchData.toggle_wishlists(data, token);
//       if (wishlist?.status == true) {
//         common_fn.showToast(wishlist?.message);
//         setModalVisible(false);
//         getCountData();
//         getData();
//       } else {
//         common_fn.showToast(wishlist?.message);
//         setModalVisible(false);
//       }
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const getCountData = async () => {
//     try {
//       const getData = await fetchData.profile_data(``, token);
//       dispatch(
//         setDataCount({
//           wishlist: getData?.data?.wishlist_count,
//           cart: getData?.data?.cart_count,
//         }),
//       );
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const share_product = async id => {
//     const jobDeepLink = `https://shopeasey.com/product/${id}`;
//     const message = `Check out this Product: ${jobDeepLink}`;

//     try {
//       await Share.share({message});
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
//   const hasNonEmptyColor = singleData?.variants?.some(
//     item => item?.color && item?.color !== '',
//   );
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Color.white,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           padding: 10,
//           backgroundColor: Color.white,
//         }}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{padding: 5}}>
//           <Icon name="arrow-back" size={30} color={Color.black} />
//         </TouchableOpacity>
//         <View style={{marginHorizontal: 10, flex: 1}}>
//           <Text
//             style={{
//               color: Color.black,
//               fontSize: 14,
//               fontFamily: Manrope.Bold,
//             }}>
//             {singleData?.category?.category_name}
//           </Text>
//           <Text
//             style={{
//               color: Color.cloudyGrey,
//               fontSize: 12,
//               fontFamily: Manrope.Medium,
//             }}>
//             {singleData?.type}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={{marginHorizontal: 10}}
//           onPress={() => {
//             share_product(singleData?.id);
//           }}>
//           <Icon name="share-social" size={25} color={Color.black} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{marginHorizontal: 10}}
//           onPress={() => {
//             navigation.navigate('WishListTab');
//           }}>
//           <Badge
//             style={{
//               position: 'absolute',
//               zIndex: 1,
//               top: -10,
//               right: -10,
//               backgroundColor: Color.red,
//               color: Color.white,
//               fontFamily: Manrope.Bold,
//             }}>
//             {wishlist}
//           </Badge>
//           <AntDesign name="hearto" size={25} color={Color.black} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{marginHorizontal: 10}}
//           onPress={() => {
//             navigation.navigate('MyCartTab');
//           }}>
//           <Badge
//             style={{
//               position: 'absolute',
//               zIndex: 1,
//               top: -10,
//               right: -10,
//               backgroundColor: Color.red,
//               color: Color.white,
//               fontFamily: Manrope.Bold,
//             }}>
//             {cart}
//           </Badge>
//           <Feather name="shopping-cart" size={25} color={Color.black} />
//         </TouchableOpacity>
//       </View>
//       {loading ? (
//         <View style={{padding: 10}}>
//           <SkeletonPlaceholder>
//             <SkeletonPlaceholder.Item style={{}}>
//               <SkeletonPlaceholder.Item
//                 width={'100%'}
//                 height={300}
//                 borderRadius={10}
//               />
//               <SkeletonPlaceholder.Item
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                 }}>
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                 />
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                   marginHorizontal={10}
//                 />
//               </SkeletonPlaceholder.Item>
//               <SkeletonPlaceholder.Item
//                 width={120}
//                 height={20}
//                 borderRadius={50}
//                 marginHorizontal={10}
//                 marginTop={10}
//               />
//               <SkeletonPlaceholder.Item
//                 width={200}
//                 height={20}
//                 borderRadius={10}
//                 marginTop={10}
//               />
//               <SkeletonPlaceholder.Item
//                 width={200}
//                 height={20}
//                 borderRadius={10}
//                 marginTop={10}
//               />
//               <SkeletonPlaceholder.Item
//                 width={200}
//                 height={20}
//                 borderRadius={10}
//                 marginTop={10}
//               />
//               <SkeletonPlaceholder.Item
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                 }}>
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                 />
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                   marginHorizontal={10}
//                 />
//               </SkeletonPlaceholder.Item>
//               <SkeletonPlaceholder.Item
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                 }}>
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                 />
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                   marginHorizontal={10}
//                 />
//               </SkeletonPlaceholder.Item>
//               <SkeletonPlaceholder.Item
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                 }}>
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                 />
//                 <SkeletonPlaceholder.Item
//                   width={120}
//                   height={20}
//                   borderRadius={50}
//                   marginHorizontal={10}
//                 />
//               </SkeletonPlaceholder.Item>
//               <SkeletonPlaceholder.Item
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   marginTop: 20,
//                 }}>
//                 <SkeletonPlaceholder.Item
//                   width={'45%'}
//                   height={50}
//                   borderRadius={10}
//                 />
//                 <SkeletonPlaceholder.Item
//                   width={'45%'}
//                   height={50}
//                   borderRadius={10}
//                   marginHorizontal={10}
//                 />
//               </SkeletonPlaceholder.Item>
//             </SkeletonPlaceholder.Item>
//           </SkeletonPlaceholder>
//         </View>
//       ) : (
//         <>
//           <View style={{flex: 1}}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//               <View
//                 style={{
//                   width: '100%',
//                   backgroundColor: Color.white,
//                   padding: 10,
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (token != undefined) {
//                       toggle_WishList(singleData);
//                     } else {
//                       navigation.navigate('Auth');
//                     }
//                   }}
//                   style={{
//                     position: 'absolute',
//                     right: 10,
//                     top: 10,
//                     zIndex: 1,
//                     backgroundColor: '#FFFFFF80',
//                     width: 25,
//                     height: 25,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 100,
//                   }}>
//                   <AntDesign
//                     name={
//                       selectedVariantData?.is_wishlisted ? 'heart' : 'hearto'
//                     }
//                     size={20}
//                     color={
//                       selectedVariantData?.is_wishlisted
//                         ? Color.red
//                         : Color.black
//                     }
//                   />
//                 </TouchableOpacity>
//                 {productImages?.length > 0 ? (
//                   <ImageView images={productImages} />
//                 ) : (
//                   <Image
//                     source={{uri: Media.no_image}}
//                     style={{width: '100%', height: 250, resizeMode: 'contain'}}
//                   />
//                 )}
//                 {singleData?.variants?.map((item, index) => {
//                   console.log(
//                     'item?.--------------------------------',
//                     item?.productImages?.[0]?.image,
//                   );
//                   if (item?.color && item?.color !== '') {
//                     return (
//                       <TouchableOpacity
//                         key={index}
//                         style={{marginHorizontal: 10, marginTop: 20}}
//                         onPress={() => {
//                           setSelectedVariantId(item?.id);
//                           setSelectedVariantData(item);
//                         }}>
//                         <Image
//                           source={{
//                             uri: Media.user,
//                           }}
//                           style={{
//                             width: 100,
//                             height: 100,
//                             resizeMode: 'contain',
//                           }}
//                         />
//                       </TouchableOpacity>
//                     );
//                   }
//                 })}
//                 <View
//                   style={{
//                     backgroundColor: Color.white,
//                     marginTop: 50,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingTop: 10,
//                     }}>
//                     <Text
//                       style={{
//                         color: Color.cloudyGrey,
//                         fontSize: 13,
//                         fontFamily: Manrope.Medium,
//                       }}>
//                       {singleData?.type} - {singleData?.category?.category_name}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         backgroundColor: Color.lightBlack,
//                         paddingHorizontal: 10,
//                         borderRadius: 2,
//                         padding: 7,
//                         marginHorizontal: 10,
//                       }}>
//                       <FontAwesome6
//                         name="award"
//                         size={14}
//                         color={Color.white}
//                       />
//                       <Text
//                         style={{
//                           color: Color.white,
//                           fontSize: 10,
//                           fontFamily: Manrope.Medium,
//                           marginHorizontal: 5,
//                         }}>
//                         Best Seller
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={{marginVertical: 10}}>
//                     <Text
//                       style={{
//                         color: Color.lightBlack,
//                         fontSize: 15,
//                         fontFamily: Manrope.SemiBold,
//                       }}>
//                       {singleData?.product_name}
//                     </Text>
//                     {reviewsData?.data?.length > 0 && (
//                       <View
//                         style={[
//                           styles.customRatingBarStyle,
//                           {alignItems: 'center', marginTop: 5},
//                         ]}>
//                         {maxRating.map((item, index) => {
//                           return (
//                             <View
//                               activeOpacity={0.7}
//                               key={index}
//                               style={{marginRight: 5}}>
//                               <FontAwesome
//                                 name={
//                                   reviewsData.count <= defaultRating
//                                     ? 'star'
//                                     : 'star-o'
//                                 }
//                                 size={18}
//                                 color={Color.sunShade}
//                               />
//                             </View>
//                           );
//                         })}
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             color: Color.black,
//                             fontFamily: Manrope.Bold,
//                             marginHorizontal: 5,
//                           }}>
//                           {reviewsData.count}
//                           <Text
//                             style={{
//                               fontSize: 14,
//                               color: Color.cloudyGrey,
//                               fontFamily: Manrope.Bold,
//                               marginHorizontal: 5,
//                             }}>
//                             {' '}
//                             {`(${reviewsData.count} Reviews)`}
//                           </Text>
//                         </Text>
//                       </View>
//                     )}
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         paddingVertical: 5,
//                       }}>
//                       <Text style={styles.productDiscountPrice}>
//                         {countryCode?.symbol}
//                         {selectedVariantData?.price}{' '}
//                         <Text style={styles.productPrice}>
//                           {countryCode?.symbol}
//                           {selectedVariantData?.org_price}
//                         </Text>
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: Manrope.ExtraBold,
//                           fontSize: 12,
//                           color: '#0FAD45',
//                           borderWidth: 1,
//                           borderColor: '#0FAD45',
//                           paddingHorizontal: 10,
//                         }}>
//                         {discount}% OFF
//                       </Text>
//                     </View>
//                     <Text
//                       style={{
//                         fontFamily: Manrope.SemiBold,
//                         fontSize: 12,
//                         color: Color.red,
//                       }}>
//                       ( Only {selectedVariantData?.stock} pending )
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         color: Color.cloudyGrey,
//                         fontFamily: Manrope.SemiBold,
//                       }}>
//                       Production :
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Color.lightBlack,
//                         fontFamily: Manrope.Bold,
//                         marginRight: 10,
//                       }}>
//                       {' '}
//                       Damage Protection
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Color.blue,
//                         fontFamily: Manrope.Bold,
//                         textDecorationLine: 'underline',
//                       }}>
//                       Learn More
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginVertical: 5,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 13,
//                         color: Color.cloudyGrey,
//                         fontFamily: Manrope.SemiBold,
//                         marginRight: 10,
//                       }}>
//                       Shipping :
//                     </Text>
//                     <FontAwesome5
//                       name="shipping-fast"
//                       size={18}
//                       color={Color.primary}
//                     />
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Color.lightBlack,
//                         fontFamily: Manrope.Bold,
//                         marginHorizontal: 10,
//                       }}>
//                       {' '}
//                       Free Shipping
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       marginVertical: 10,
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       flexWrap: 'wrap',
//                     }}>
//                     <Image
//                       source={{uri: Media.return}}
//                       style={{width: 20, height: 20}}
//                     />
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: Color.cloudyGrey,
//                         textAlign: 'justify',
//                         marginLeft: 5,
//                       }}>
//                       15-Day Returns{' '}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => {
//                         navigation?.navigate('TermsandConditions');
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.lightBlack,
//                           textAlign: 'justify',
//                           fontWeight: '600',
//                           textDecorationLine: 'underline',
//                         }}>
//                         Terms & Conditions
//                       </Text>
//                     </TouchableOpacity>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: Color.cloudyGrey,
//                         textAlign: 'justify',
//                       }}>
//                       {' '}
//                       and{' '}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => {
//                         navigation?.navigate('PrivacyPolicy');
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.lightBlack,
//                           textAlign: 'justify',
//                           fontWeight: '600',
//                           letterSpacing: 0.5,
//                           textDecorationLine: 'underline',
//                         }}>
//                         Privacy Policy
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     width: scr_width,
//                     paddingVertical: 5,
//                     marginVertical: 10,
//                     backgroundColor: Color.softGrey,
//                   }}></View>
//                 {singleData?.variants?.length > 0 && (
//                   <View>
//                     <View>
//                       {hasNonEmptyColor ? (
//                         <>
//                           <View style={styles.colorContainer}>
//                             <Text style={styles.label}>Color :</Text>
//                             <View style={styles.colorOptions}>
//                               {singleData?.variants?.map((item, index) => {
//                                 if (item?.color && item?.color !== '') {
//                                   return (
//                                     <TouchableOpacity
//                                       key={index}
//                                       style={[
//                                         styles.colorOption,
//                                         {
//                                           borderColor:
//                                             selectedColor === item?.color
//                                               ? Color.primary
//                                               : Color.lightgrey,
//                                         },
//                                       ]}
//                                       onPress={() => handleColorPress(item)}
//                                       disabled={item?.stock == 0}>
//                                       <View
//                                         style={[
//                                           styles.colorView,
//                                           {backgroundColor: item?.color},
//                                         ]}
//                                       />
//                                       <Text style={styles.colorNameText}>
//                                         {common_fn.getColorName(item?.color)}
//                                       </Text>
//                                     </TouchableOpacity>
//                                   );
//                                 }
//                                 return null;
//                               })}
//                             </View>
//                           </View>
//                           <View style={styles.separator}></View>
//                         </>
//                       ) : null}

//                       {(sizeVisible ||
//                         !singleData?.variants?.some(
//                           variant => variant.color,
//                         )) && (
//                         <View style={styles.sizeContainer}>
//                           <Text style={styles.sizeLabel}>Size :</Text>
//                           <View style={styles.sizeOptions}>
//                             {filteredSizes?.map((item, index) => (
//                               <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                   styles.sizeOption,
//                                   {
//                                     borderColor:
//                                       selectedSize === item?.size
//                                         ? Color.primary
//                                         : Color.white,
//                                   },
//                                 ]}
//                                 onPress={() => handleSizePress(item)}
//                                 disabled={item?.stock == 0}>
//                                 <View
//                                   style={[
//                                     styles.sizeView,
//                                     {
//                                       backgroundColor:
//                                         item?.stock == 0
//                                           ? '#EEEEEE80'
//                                           : '#EEEEEE',
//                                     },
//                                   ]}>
//                                   <Text style={styles.sizeText}>
//                                     {item?.size}
//                                   </Text>
//                                 </View>
//                                 {item?.stock == 0 && (
//                                   <Text style={styles.soldText}>sold</Text>
//                                 )}
//                               </TouchableOpacity>
//                             ))}
//                           </View>
//                         </View>
//                       )}
//                     </View>
//                     <Modal
//                       visible={modalVisible}
//                       transparent={true}
//                       animationType="slide"
//                       onRequestClose={() => setModalVisible(false)}>
//                       <Pressable
//                         onPress={() => setModalVisible(false)}
//                         style={styles.modalBackground}
//                       />
//                       <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>
//                           Please select a color and/or size:
//                         </Text>

//                         {singleData?.variants?.some(
//                           variant => variant.color,
//                         ) && (
//                           <View style={styles.colorContainer}>
//                             <Text style={styles.label}>Color :</Text>
//                             <View style={styles.colorOptions}>
//                               {singleData?.variants?.map((item, index) => {
//                                 if (item?.color && item?.color !== '') {
//                                   return (
//                                     <TouchableOpacity
//                                       key={index}
//                                       style={[
//                                         styles.colorOption,
//                                         {
//                                           borderColor:
//                                             selectedColor === item?.color
//                                               ? Color.primary
//                                               : Color.lightgrey,
//                                         },
//                                       ]}
//                                       onPress={() => handleColorPress(item)}
//                                       disabled={item?.stock == 0}>
//                                       <View
//                                         style={[
//                                           styles.colorView,
//                                           {backgroundColor: item?.color},
//                                         ]}
//                                       />
//                                       <Text style={styles.colorNameText}>
//                                         {common_fn.getColorName(item?.color)}
//                                       </Text>
//                                     </TouchableOpacity>
//                                   );
//                                 }
//                                 return null;
//                               })}
//                             </View>
//                           </View>
//                         )}

//                         <View style={styles.separator}></View>

//                         {(sizeVisible ||
//                           !singleData?.variants?.some(
//                             variant => variant.color,
//                           )) && (
//                           <View style={styles.sizeContainer}>
//                             <Text style={styles.sizeLabel}>Size :</Text>
//                             <View style={styles.sizeOptions}>
//                               {filteredSizes?.map((item, index) => (
//                                 <TouchableOpacity
//                                   key={index}
//                                   style={[
//                                     styles.sizeOption,
//                                     {
//                                       borderColor:
//                                         selectedSize === item?.size
//                                           ? Color.primary
//                                           : Color.white,
//                                     },
//                                   ]}
//                                   onPress={() => handleSizePress(item)}
//                                   disabled={item?.stock == 0}>
//                                   <View
//                                     style={[
//                                       styles.sizeView,
//                                       {
//                                         backgroundColor:
//                                           item?.stock == 0
//                                             ? '#EEEEEE80'
//                                             : '#EEEEEE',
//                                       },
//                                     ]}>
//                                     <Text style={styles.sizeText}>
//                                       {item?.size}
//                                     </Text>
//                                   </View>
//                                   {item?.stock == 0 && (
//                                     <Text style={styles.soldText}>sold</Text>
//                                   )}
//                                 </TouchableOpacity>
//                               ))}
//                             </View>
//                           </View>
//                         )}

//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             marginTop: 20,
//                           }}>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             style={{
//                               width: '50%',
//                               height: 50,
//                               bottom: 10,
//                               marginHorizontal: 5,
//                               flexDirection: 'row',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               borderRadius: 5,
//                               backgroundColor: Color.white,
//                               borderWidth: 1,
//                               borderColor: Color.lightBlack,
//                             }}
//                             onPress={() => {
//                               if (selectedVariantData?.in_cart) {
//                                 navigation.navigate('MyCartTab');
//                               } else {
//                                 if (token != undefined) {
//                                   setAdd_cart();
//                                 } else {
//                                   navigation.navigate('Auth');
//                                 }
//                               }
//                             }}>
//                             <Iconviewcomponent
//                               Icontag={'AntDesign'}
//                               iconname={'shoppingcart'}
//                               icon_size={20}
//                               icon_color={Color.black}
//                             />
//                             <Text
//                               style={{
//                                 fontSize: 14,
//                                 color: Color.black,
//                                 fontFamily: Manrope.SemiBold,
//                                 letterSpacing: 0.5,
//                                 paddingHorizontal: 10,
//                               }}>
//                               {selectedVariantData?.in_cart
//                                 ? `Go to Cart`
//                                 : `Add to Cart`}
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             activeOpacity={0.5}
//                             style={{
//                               width: '50%',
//                               height: 50,
//                               bottom: 10,
//                               marginHorizontal: 5,
//                               flexDirection: 'row',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               borderRadius: 5,
//                               backgroundColor: Color.primary,
//                             }}
//                             onPress={() => {
//                               if (token != undefined) {
//                                 setBuyNow();
//                               } else {
//                                 navigation.navigate('Auth');
//                               }
//                             }}>
//                             <Iconviewcomponent
//                               Icontag={'Feather'}
//                               iconname={'shopping-bag'}
//                               icon_size={20}
//                               icon_color={Color.white}
//                             />
//                             <Text
//                               style={{
//                                 fontSize: 14,
//                                 color: Color.white,
//                                 fontFamily: Manrope.SemiBold,
//                                 letterSpacing: 0.5,
//                                 paddingHorizontal: 10,
//                               }}>
//                               Buy Now
//                             </Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </Modal>
//                   </View>
//                 )}
//                 <View
//                   style={{
//                     backgroundColor: '#F0F9FB',
//                     padding: 10,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <View
//                       style={{
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <Image
//                         source={{uri: Media.user}}
//                         style={{
//                           width: 100,
//                           height: 100,
//                           resizeMode: 'cover',
//                           borderRadius: 100,
//                         }}
//                       />
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.white,
//                           fontFamily: Manrope.Medium,
//                           backgroundColor: Color.green,
//                           padding: 7,
//                           paddingHorizontal: 15,
//                           letterSpacing: 0.5,
//                           borderRadius: 5,
//                           bottom: 10,
//                         }}>
//                         Preferred
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'center',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.black,
//                           fontFamily: Manrope.Bold,
//                           letterSpacing: 0.5,
//                         }}>
//                         {singleData?.vendor?.business_name}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.Light,
//                           paddingVertical: 3,
//                         }}>
//                         {resultDate}
//                       </Text>
//                       <View
//                         style={{
//                           ...styles.customRatingBarStyle,
//                           marginTop: 5,
//                           alignItems: 'center',
//                         }}>
//                         {maxRating.map((item, index) => {
//                           return (
//                             <TouchableOpacity
//                               activeOpacity={0.7}
//                               key={index}
//                               onPress={() => handleRatingPress(item.rating)}
//                               style={{}}>
//                               <AntDesign
//                                 name={
//                                   item.rating <= defaultRating
//                                     ? 'star'
//                                     : 'staro'
//                                 }
//                                 size={14}
//                                 color={Color.sunShade}
//                               />
//                             </TouchableOpacity>
//                           );
//                         })}
//                         <Text
//                           style={{
//                             fontSize: 14,
//                             color: Color.black,
//                             fontFamily: Manrope.Bold,
//                             marginHorizontal: 5,
//                           }}>
//                           {singleData?.vendor?.rating}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           marginVertical: 10,
//                         }}>
//                         <Button
//                           mode="contained"
//                           onPress={() => {
//                             navigation.navigate('SellerProfile', {
//                               vendor_id: singleData?.vendor?.id,
//                             });
//                           }}
//                           style={{
//                             backgroundColor: Color.primary,
//                             borderRadius: 5,
//                           }}
//                           icon={() => (
//                             <Feather
//                               name="shopping-bag"
//                               color={Color.white}
//                               size={18}
//                             />
//                           )}
//                           textColor={Color.white}>
//                           View Shop
//                         </Button>
//                         <Button
//                           mode="contained"
//                           onPress={() => {
//                             setFollowProfile(singleData?.vendor?.id);
//                           }}
//                           style={{
//                             marginHorizontal: 10,
//                             borderRadius: 5,
//                             backgroundColor: Color.white,
//                             borderColor: Color.lightgrey,
//                             borderWidth: 1,
//                           }}
//                           textColor={Color.black}>
//                           Follow
//                         </Button>
//                       </View>
//                     </View>
//                   </View>
//                 </View>

//                 {/* <View
//                   style={{
//                     width: '95%',
//                     backgroundColor: Color.white,
//                     padding: 10,
//                     marginTop: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       color: Color.black,
//                       fontFamily: Manrope.SemiBold,
//                       letterSpacing: 0.5,
//                     }}>
//                     Product Details
//                   </Text>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Category
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Men polo t-shirt
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Protection
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Damage Protection
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Material
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Cotton
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Brand
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         U.S Polo
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Material
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Cotton
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       width: '95%',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flex: 1,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Medium,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Country of Origin
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flex: 2,
//                         justifyContent: 'flex-start',
//                         alignItems: 'flex-start',
//                       }}>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.lightBlack,
//                           fontFamily: Manrope.SemiBold,
//                           letterSpacing: 0.5,
//                           padding: 5,
//                         }}>
//                         Chennai, India
//                       </Text>
//                     </View>
//                   </View>
//                 </View> */}

//                 <View
//                   style={{
//                     padding: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       color: Color.black,
//                       fontFamily: Manrope.SemiBold,
//                     }}>
//                     Product Description
//                   </Text>
//                   <RenderHtml
//                     contentWidth={'100%'}
//                     source={{html: singleData?.description}}
//                   />
//                 </View>
//                 {reviewsData?.data?.length > 0 && (
//                   <View
//                     style={{
//                       padding: 10,
//                       marginTop: 10,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         color: Color.black,
//                         fontFamily: Manrope.SemiBold,
//                         letterSpacing: 0.5,
//                       }}>
//                       Product Ratings & Reviews
//                     </Text>
//                     <View style={styles.productRatingView}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                         }}>
//                         <FontAwesome
//                           name="star"
//                           size={12}
//                           color={Color.lightYellow}
//                         />
//                         <Text
//                           style={{
//                             fontFamily: Manrope.Bold,
//                             fontSize: 12,
//                             paddingHorizontal: 5,
//                             color: Color.black,
//                             letterSpacing: 0.5,
//                           }}>
//                           {singleData.rating}{' '}
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           fontFamily: Manrope.Bold,
//                           fontSize: 12,
//                           color: Color.cloudyGrey,
//                           letterSpacing: 0.5,
//                         }}>
//                         {'  '}({reviewsData?.count} Reviews)
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         width: '100%',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         marginVertical: 5,
//                       }}>
//                       {review_tab?.map((item, index) => {
//                         return (
//                           <TouchableOpacity
//                             onPress={() => {
//                               setIndex(index);
//                             }}
//                             style={{
//                               borderWidth: 1,
//                               borderColor:
//                                 tabIndex == index
//                                   ? Color.primary
//                                   : Color.lightgrey,
//                               padding: 5,
//                               paddingHorizontal: 10,
//                               borderRadius: 50,
//                               margin: 5,
//                               backgroundColor:
//                                 tabIndex == index ? '#0D71BA30' : Color.white,
//                             }}
//                             key={index}>
//                             <Text
//                               style={{
//                                 fontFamily: Manrope?.Medium,
//                                 fontSize: 12,
//                                 paddingHorizontal: 10,
//                                 color:
//                                   tabIndex == index
//                                     ? Color.primary
//                                     : Color.black,
//                               }}>
//                               {item?.name}
//                             </Text>
//                           </TouchableOpacity>
//                         );
//                       })}
//                     </View>
//                     <View
//                       style={{
//                         width: '100%',
//                         alignItems: 'center',
//                         marginVertical: 5,
//                       }}>
//                       {reviewsData?.data?.map((item, index) => {
//                         return (
//                           <View style={{width: '100%', alignItems: 'center'}}>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                               }}>
//                               <View
//                                 style={{
//                                   flex: 1,
//                                   justifyContent: 'center',
//                                   alignItems: 'center',
//                                 }}>
//                                 <Image
//                                   source={{uri: Media?.user}}
//                                   style={{
//                                     width: 70,
//                                     height: 70,
//                                     resizeMode: 'contain',
//                                     borderRadius: 100,
//                                   }}
//                                 />
//                               </View>
//                               <View
//                                 style={{
//                                   flex: 3.5,
//                                   justifyContent: 'flex-start',
//                                   alignItems: 'flex-start',
//                                 }}>
//                                 <View
//                                   style={{
//                                     flexDirection: 'row',
//                                     alignItems: 'center',
//                                   }}>
//                                   <View>
//                                     <Text
//                                       style={{
//                                         fontFamily: Manrope?.Bold,
//                                         fontSize: 14,
//                                         color: Color.black,
//                                         letterSpacing: 0.5,
//                                       }}>
//                                       {item?.review}
//                                     </Text>
//                                   </View>
//                                   <View
//                                     style={{
//                                       flexDirection: 'row',
//                                       alignItems: 'center',
//                                       backgroundColor: '#F1FBEF',
//                                       borderRadius: 5,
//                                       padding: 5,
//                                       paddingHorizontal: 10,
//                                       marginHorizontal: 10,
//                                     }}>
//                                     <FontAwesome
//                                       name="star"
//                                       size={13}
//                                       color={Color.lightYellow}
//                                     />
//                                     <Text
//                                       style={{
//                                         fontFamily: Manrope.Bold,
//                                         fontSize: 12,
//                                         color: Color.black,
//                                         paddingHorizontal: 5,
//                                       }}>
//                                       {item?.rate}
//                                     </Text>
//                                   </View>
//                                 </View>
//                                 <View style={{width: '100%'}}>
//                                   <Text
//                                     style={{
//                                       textAlign: 'justify',
//                                       fontFamily: Manrope.Light,
//                                       fontSize: 12,
//                                       color: Color.cloudyGrey,
//                                       letterSpacing: 0.5,
//                                       lineHeight: 22,
//                                     }}>
//                                     {item?.review}
//                                   </Text>
//                                 </View>
//                               </View>
//                             </View>
//                             <View
//                               style={{
//                                 marginVertical: 10,
//                                 backgroundColor: Color.softGrey,
//                                 paddingVertical: 1,
//                               }}></View>
//                           </View>
//                         );
//                       })}
//                     </View>
//                     <View
//                       style={{
//                         width: '100%',
//                         justifyContent: 'flex-end',
//                         alignItems: 'flex-end',
//                         marginVertical: 0,
//                       }}>
//                       <TouchableOpacity onPress={() => {}}>
//                         <Text
//                           style={{
//                             fontFamily: Manrope?.SemiBold,
//                             fontSize: 13,
//                             color: Color.lightBlack,
//                             textDecorationLine: 'underline',
//                             letterSpacing: 0.5,
//                           }}>
//                           View All Reviews
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 )}
//                 {topPicks?.length > 0 && (
//                   <View
//                     style={{
//                       padding: 10,
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         marginVertical: 10,
//                       }}>
//                       <Text
//                         style={{
//                           flex: 1,
//                           fontSize: 16,
//                           color: Color.black,
//                           fontFamily: Manrope.SemiBold,
//                         }}>
//                         Recommended
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 14,
//                           color: Color.cloudyGrey,
//                           fontFamily: Manrope.Bold,
//                         }}>
//                         See more
//                       </Text>
//                     </View>
//                     <FlatList
//                       data={topPicks}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       renderItem={({item, index}) => {
//                         return (
//                           <ItemCardHorizontal
//                             item={item}
//                             navigation={navigation}
//                           />
//                         );
//                       }}
//                     />
//                   </View>
//                 )}
//                 {Categories_data?.length > 0 && (
//                   <View
//                     style={{
//                       padding: 10,
//                       marginBottom: 10,
//                     }}>
//                     <Text
//                       style={{
//                         flex: 1,
//                         fontSize: 16,
//                         color: Color.black,
//                         fontFamily: Manrope.Bold,
//                       }}>
//                       YOU MAY ALSO LIKE
//                     </Text>
//                     <FlatList
//                       data={Categories_data}
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       renderItem={({item, index}) => {
//                         return (
//                           <ItemCardHorizontal
//                             item={item}
//                             navigation={navigation}
//                           />
//                         );
//                       }}
//                     />
//                   </View>
//                 )}
//               </View>
//             </ScrollView>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginHorizontal: 10,
//             }}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={{
//                 width: '50%',
//                 height: 50,
//                 bottom: 10,
//                 marginHorizontal: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 5,
//                 backgroundColor: Color.white,
//                 borderWidth: 1,
//                 borderColor: Color.lightBlack,
//               }}
//               onPress={() => {
//                 if (selectedVariantData?.in_cart) {
//                   navigation.navigate('MyCartTab');
//                 } else {
//                   if (token != undefined) {
//                     setAdd_cart();
//                   } else {
//                     navigation.navigate('Auth');
//                   }
//                 }
//               }}>
//               <Iconviewcomponent
//                 Icontag={'AntDesign'}
//                 iconname={'shoppingcart'}
//                 icon_size={20}
//                 icon_color={Color.black}
//               />
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: Color.black,
//                   fontFamily: Manrope.SemiBold,
//                   letterSpacing: 0.5,
//                   paddingHorizontal: 10,
//                 }}>
//                 {selectedVariantData?.in_cart ? `Go to Cart` : `Add to Cart`}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={{
//                 width: '50%',
//                 height: 50,
//                 bottom: 10,
//                 marginHorizontal: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 5,
//                 backgroundColor: Color.primary,
//               }}
//               onPress={() => {
//                 if (token != undefined) {
//                   setBuyNow();
//                 } else {
//                   navigation.navigate('Auth');
//                 }
//               }}>
//               <Iconviewcomponent
//                 Icontag={'Feather'}
//                 iconname={'shopping-bag'}
//                 icon_size={20}
//                 icon_color={Color.white}
//               />
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: Color.white,
//                   fontFamily: Manrope.SemiBold,
//                   letterSpacing: 0.5,
//                   paddingHorizontal: 10,
//                 }}>
//                 Buy Now
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default ProductDetails;

// const styles = StyleSheet.create({
//   productDiscountPrice: {
//     color: Color.black,
//     fontFamily: Manrope.SemiBold,
//     fontSize: 20,
//     marginRight: 10,
//   },
//   productPrice: {
//     color: Color.smokeyGrey,
//     fontFamily: Manrope.SemiBold,
//     fontSize: 14,
//     textDecorationLine: 'line-through',
//   },
//   customRatingBarStyle: {
//     flexDirection: 'row',
//   },
//   starImageStyle: {
//     width: 35,
//     height: 35,
//     resizeMode: 'cover',
//   },
//   productRatingView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//   },
//   colorContainer: {
//     width: '95%',
//     alignItems: 'center',
//     backgroundColor: Color.white,
//   },
//   label: {
//     width: '95%',
//     fontSize: 16,
//     color: Color.black,
//     fontFamily: Manrope.SemiBold,
//     marginVertical: 10,
//   },
//   colorOptions: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   colorOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginRight: 5,
//     borderWidth: 1,
//     borderColor: Color.lightgrey,
//     padding: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   colorView: {
//     width: 16,
//     height: 16,
//     borderRadius: 100,
//     borderWidth: 1,
//     borderColor: Color.cloudyGrey,
//   },
//   colorNameText: {
//     fontSize: 12,
//     color: Color.black,
//     fontFamily: Manrope.Bold,
//     marginHorizontal: 10,
//     textTransform: 'capitalize',
//   },
//   separator: {
//     width: '100%',
//     paddingVertical: 5,
//     marginVertical: 10,
//     backgroundColor: Color.softGrey,
//   },
//   sizeContainer: {
//     backgroundColor: Color.white,
//     padding: 10,
//   },
//   sizeLabel: {
//     fontSize: 16,
//     paddingHorizontal: 5,
//     color: Color.black,
//     fontFamily: Manrope.SemiBold,
//   },
//   sizeOptions: {
//     width: '95%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginVertical: 10,
//   },
//   sizeOption: {
//     marginHorizontal: 10,
//     borderWidth: 1,
//   },
//   sizeView: {
//     padding: 10,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   sizeText: {
//     fontSize: 12,
//     color: Color.black,
//     fontFamily: Manrope.Bold,
//     textAlign: 'center',
//   },
//   soldText: {
//     fontSize: 12,
//     color: Color.red,
//     fontFamily: Manrope.Bold,
//     textAlign: 'center',
//     textTransform: 'uppercase',
//   },
//   selectedVariantText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Color.black,
//     fontFamily: Manrope.Bold,
//     textAlign: 'center',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Color.transparantBlack,
//   },
//   modalContainer: {
//     width: '100%',
//     backgroundColor: Color.white,
//     padding: 20,
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: Color.black,
//     fontFamily: Manrope.SemiBold,
//     textAlign: 'center',
//   },
//   selectVariantContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   selectVariantLabel: {
//     fontSize: 16,
//     color: Color.black,
//     fontFamily: Manrope.Bold,
//     marginBottom: 10,
//   },
//   selectVariantButton: {
//     backgroundColor: Color.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   selectVariantButtonText: {
//     fontSize: 14,
//     color: Color.white,
//     fontFamily: Manrope.Bold,
//   },
// });
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';
import {Badge, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImageView from '../../Components/imageView';
import {Media} from '../../Global/Media';
import moment from 'moment';
import {products} from '../../Config/Content';
import ItemCard, {ItemCardHorizontal} from '../../Components/ItemCard';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import RenderHtml from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';
import {setDataCount} from '../../Redux/user/UserAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useNavigation} from '@react-navigation/native';

const ProductDetails = ({route}) => {
  const navigation = useNavigation();
  const [id] = useState(route?.params?.id);
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
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistVariantId, setWishlistVariantId] = useState(null);
  const [selectedVariantData, setSelectedVariantData] = useState({});
  const [productImages, setProductImages] = useState([]);

  const handleColorPress = async item => {
    setLoading(true);
    setSelectedColor(item?.color);
    setSelectedVariantId(item?.id);
    // setSelectedVariantData(item);
    // setSelectedSize(null);
    // setSizeVisible(true);
    // setWishlistVariantId(item?.id);
    // setProductImages(item?.productImages);
    try {
      var param = id;
      var data = `color=${item?.color}`;
      console.log('data', data);
      const color_change = await fetchData.single_property(param, data, token);
      setSingleData(color_change?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizePress = item => {
    setSelectedSize(item?.size);
    setSelectedVariantId(item?.id);
  };
  const dispatch = useDispatch();
  const filteredSizes = singleData?.variants_list?.color?.filter(
    variant => !selectedColor || variant.color === selectedColor,
  );

  const [defaultRating, setDefaultRating] = useState(singleData?.shop?.rating);
  const [tabIndex, setIndex] = useState(0);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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
    ((singleData?.org_price - singleData?.price) / singleData?.org_price) * 100,
  );
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
  }, []);

  const getData = async () => {
    try {
      var param = `${id}`;
      const product_data = await fetchData.single_property(param, ``, token);
      setSingleData(product_data?.data);
      setProductImages(product_data?.data?.productImages);
      setSelectedVariantData(product_data?.data?.variants_list?.[0]);
      //top picks
      var top_picks_data = `project=top-picks`;
      const top_picks = await fetchData.list_products(top_picks_data, token);
      setTopPicks(top_picks?.data);
      //review data
      var review_data = `${id}`;
      const reviewData = await fetchData.get_review(review_data, token);
      setReviewsData(reviewData);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const setFollowProfile = async id => {
    try {
      var param = `${id}`;
      const setFollow = await fetchData.post_follow(param, {}, token);
      console.log('setFollow---------------', setFollow);
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
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
          getCountData();
          getData();
        } else {
          common_fn.showToast(add_to_cart?.message);
          setModalVisible(false);
        }
      } else {
        common_fn.showToast('Please Select the Color or Size');
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
          },
        ];
        navigation.navigate('OrderConfirmation', {CheckOut});
        setModalVisible(false);
      } else {
        common_fn.showToast('Please Select the Color or Size');
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggle_WishList = async single => {
    try {
      const wishlist_id = single?.id;
      var data = {
        product_id: single?.id,
        variant_id: wishlist_id,
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

  const share_product = async id => {
    const jobDeepLink = `https://shopeasey.com/product/${id}`;
    const message = `Check out this Product: ${jobDeepLink}`;

    try {
      await Share.share({message});
    } catch (error) {
      console.error(error.message);
    }
  };
  const hasNonEmptyColor = singleData?.variants_list?.color?.some(
    item => item?.color && item?.color !== '',
  );
  console.log('singleData?.productImages', singleData?.productImages?.[0]?.id);
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
            }}>
            {singleData?.type}
          </Text>
        </View>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            share_product(singleData?.id);
          }}>
          <Icon name="share-social" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('WishListTab');
          }}>
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
            {wishlist}
          </Badge>
          <AntDesign name="hearto" size={25} color={Color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => {
            navigation.navigate('MyCartTab');
          }}>
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
            {cart}
          </Badge>
          <Feather name="shopping-cart" size={25} color={Color.black} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
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
                  width={120}
                  height={20}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={120}
                height={20}
                borderRadius={50}
                marginHorizontal={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={200}
                height={20}
                borderRadius={10}
                marginTop={10}
              />
              <SkeletonPlaceholder.Item
                width={200}
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
                  width={120}
                  height={20}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={50}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <SkeletonPlaceholder.Item
                  width={'45%'}
                  height={50}
                  borderRadius={10}
                />
                <SkeletonPlaceholder.Item
                  width={'45%'}
                  height={50}
                  borderRadius={10}
                  marginHorizontal={10}
                />
              </SkeletonPlaceholder.Item>
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
                    right: 10,
                    top: 10,
                    zIndex: 1,
                    backgroundColor: '#FFFFFF80',
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <AntDesign
                    name={singleData?.is_wishlisted ? 'heart' : 'hearto'}
                    size={20}
                    color={singleData?.is_wishlisted ? Color.red : Color.black}
                  />
                </TouchableOpacity>
                {singleData?.productImages?.length > 0 ? (
                  <ImageView images={singleData?.productImages} />
                ) : (
                  <Image
                    source={{uri: Media.no_image}}
                    style={{width: '100%', height: 250, resizeMode: 'contain'}}
                  />
                )}
                {/* {singleData?.variants_list?.color?.map((item, index) => {
                  if (item?.color && item?.color !== '') {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{marginHorizontal: 10, marginTop: 20}}
                        onPress={() => {
                          setSelectedVariantId(item?.id);
                          setSelectedVariantData(item);
                        }}>
                        <Image
                          source={{
                            uri: Media.user,
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }
                })} */}
                <View
                  style={{
                    backgroundColor: Color.white,
                    marginTop: 50,
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
                      {singleData?.type} -{' '}
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
                          return (
                            <View
                              activeOpacity={0.7}
                              key={index}
                              style={{marginRight: 5}}>
                              <FontAwesome
                                name={
                                  reviewsData.count <= defaultRating
                                    ? 'star'
                                    : 'star-o'
                                }
                                size={18}
                                color={Color.sunShade}
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
                          {reviewsData.count}
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
                        {singleData?.price}{' '}
                        <Text style={styles.productPrice}>
                          {countryCode?.symbol}
                          {singleData?.org_price}
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
                    <Text
                      style={{
                        fontFamily: Manrope.SemiBold,
                        fontSize: 12,
                        color: Color.red,
                      }}>
                      ( Only {singleData?.stock} pending )
                    </Text>
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
                      15-Day Returns{' '}
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
                                        borderColor:
                                          selectedColor === item?.color
                                            ? Color.primary
                                            : Color.lightgrey,
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
                                    <Text style={styles.colorNameText}>
                                      {item?.color}
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
                                style={[
                                  styles.sizeOption,
                                  {
                                    borderColor:
                                      selectedSize === item?.size
                                        ? Color.primary
                                        : Color.white,
                                  },
                                ]}
                                onPress={() => handleSizePress(item)}
                                disabled={item?.stock == 0}>
                                <View
                                  style={[
                                    styles.sizeView,
                                    {
                                      backgroundColor:
                                        item?.stock == 0
                                          ? '#EEEEEE80'
                                          : '#EEEEEE',
                                    },
                                  ]}>
                                  <Text style={styles.sizeText}>
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
                        Please select a color and/or size:
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
                                            borderColor:
                                              selectedColor === item?.color
                                                ? Color.primary
                                                : Color.lightgrey,
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
                                        <Text style={styles.colorNameText}>
                                          {item?.color}
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
                                  style={[
                                    styles.sizeOption,
                                    {
                                      borderColor:
                                        selectedSize === item?.size
                                          ? Color.primary
                                          : Color.white,
                                    },
                                  ]}
                                  onPress={() => handleSizePress(item)}
                                  disabled={item?.stock == 0}>
                                  <View
                                    style={[
                                      styles.sizeView,
                                      {
                                        backgroundColor:
                                          item?.stock == 0
                                            ? '#EEEEEE80'
                                            : '#EEEEEE',
                                      },
                                    ]}>
                                    <Text style={styles.sizeText}>
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
                            if (singleData?.in_cart) {
                              navigation.navigate('MyCartTab');
                            } else {
                              if (token != undefined) {
                                setAdd_cart();
                              } else {
                                navigation.navigate('Auth');
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
                            {singleData?.in_cart ? `Go to Cart` : `Add to Cart`}
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
                            backgroundColor: Color.primary,
                          }}
                          onPress={() => {
                            if (token != undefined) {
                              setBuyNow();
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
                    backgroundColor: '#F0F9FB',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: Media.user}}
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
                          paddingHorizontal: 15,
                          letterSpacing: 0.5,
                          borderRadius: 5,
                          bottom: 10,
                        }}>
                        Preferred
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Manrope.Bold,
                          letterSpacing: 0.5,
                        }}>
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
                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              key={index}
                              onPress={() => handleRatingPress(item.rating)}
                              style={{}}>
                              <AntDesign
                                name={
                                  item.rating <= defaultRating
                                    ? 'star'
                                    : 'staro'
                                }
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
                          {singleData?.product?.vendor?.rating}
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
                          onPress={() => {
                            navigation.navigate('SellerProfile', {
                              vendor_id: singleData?.product?.vendor?.id,
                            });
                          }}
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
                          onPress={() => {
                            setFollowProfile(singleData?.product?.vendor?.id);
                          }}
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

                {/* <View
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
                      fontFamily: Manrope.SemiBold,
                      letterSpacing: 0.5,
                    }}>
                    Product Details
                  </Text>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Category
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        Men polo t-shirt
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Protection
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        Damage Protection
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Material
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        Cotton
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Brand
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        U.S Polo
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Material
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        Cotton
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '95%',
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
                          letterSpacing: 0.5,
                          padding: 5,
                        }}>
                        Country of Origin
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
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
                        Chennai, India
                      </Text>
                    </View>
                  </View>
                </View> */}

                <View
                  style={{
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
                  <RenderHtml
                    contentWidth={'100%'}
                    source={{html: singleData?.product?.description}}
                  />
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
                          {singleData.rating}{' '}
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
                      {review_tab?.map((item, index) => {
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
                      })}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      {reviewsData?.data?.map((item, index) => {
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
                                      {item?.review}
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
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginVertical: 0,
                      }}>
                      <TouchableOpacity onPress={() => {}}>
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
                  </View>
                )}
                {topPicks?.length > 0 && (
                  <View
                    style={{
                      padding: 10,
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
                      padding: 10,
                      marginBottom: 10,
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
                if (singleData?.in_cart) {
                  navigation.navigate('MyCartTab');
                } else {
                  if (token != undefined) {
                    setAdd_cart();
                  } else {
                    navigation.navigate('Auth');
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
                {singleData?.in_cart ? `Go to Cart` : `Add to Cart`}
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
                backgroundColor: Color.primary,
              }}
              onPress={() => {
                if (token != undefined) {
                  setBuyNow();
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: Color.black,
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
    padding: 10,
  },
  sizeLabel: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: Color.black,
    fontFamily: Manrope.SemiBold,
  },
  sizeOptions: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  sizeOption: {
    marginHorizontal: 10,
    borderWidth: 1,
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
    color: Color.black,
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
