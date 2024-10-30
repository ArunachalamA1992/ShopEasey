import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../Global/Color';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import { useSelector } from 'react-redux';
import { Manrope } from '../../Global/FontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Iconviewcomponent } from '../../Components/Icontag';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import ImageResizer from 'react-native-image-resizer';
import { baseUrl } from '../../Config/base_url';

const OrderReview = ({ navigation, route }) => {
  const [orderData] = useState(route.params.orderData);
  const bgcolor = common_fn.getColorName(orderData?.variants?.color);
  const [defaultRating, setDefaultRating] = useState(0);
  const userData = useSelector(state => state.UserReducer.userData);
  const [review, setReview] = useState('');
  var { token } = userData;
  const [image, setImage] = useState([
    {
      fileName: '',
      fileSize: 0,
      height: 0,
      originalPath: '',
      type: '',
      uri: '',
      width: 0,
    },
  ]);
  const [photo, setPhoto] = useState([]);

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

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        console.log('granted', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return true;
      }
    } catch (error) {
      console.log('Error in requesting camera permission: ', error);
      return false;
    }
  };
  const data = photo?.filter(item => item.uri)?.map(item => item.uri);
  // const postReview = async () => {
  //   try {
  //     if (defaultRating > 0 && review != '') {
  //       var data = {
  //         product_id: orderData?.product_id,
  //         rate: defaultRating,
  //         review: review,
  //         images: photo?.filter(item => item.uri)?.map(item => item.uri),
  //       };
  //       const post_review = await fetchData.post_review(data, token);
  //       common_fn.showToast(post_review?.message);
  //     } else {
  //       common_fn.showToast('Please write the review and rating');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  const checkReview = async id => {
    try {
      const review = await fetchData.check_review(id, token);
      return review;
    } catch (error) {
      console.log('error', error);
    }
  };

  const postReview = async () => {
    try {
      const reviewedData = await checkReview(orderData?.order?.id);
      // console.log("reviewedData ----------------- : ", reviewedData);
      if (reviewedData?.status == true) {
        if (defaultRating > 0 && review != '') {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${token}`);

          const formdata = new FormData();
          formdata.append('product_id', orderData?.product_id);
          formdata.append('rate', defaultRating);
          formdata.append('review', review);
          photo.forEach((file, index) => {
            formdata.append('images', {
              uri: file?.uri,
              type: 'image/jpeg',
              name: file?.name,
            });
          });
          // console.log("formdata----------------- : ", formdata);
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          // console.log("Review comments ----------------- : ", requestOptions);

          fetch(`${baseUrl}api/review`, requestOptions)
            .then(response => response.json())
            .then(result => {
              // console.log("Review result ----------------- : ", result);
              common_fn.showToast(result?.message);
              navigation.replace("MyOrders");
            })
            .catch(error => console.error(error));
        } else {
          common_fn.showToast('Please write the review and rating');
        }
      } else {
        common_fn.showToast('Your order has been Reviewed already.');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const resizeImages = [];
    Promise.all(
      image?.map(async (image, index) => {
        var path = image?.uri;
        var maxWidth = 1000,
          maxHeight = 1000,
          compressFormat = 'JPEG',
          quality = 100,
          rotation = 0,
          keepMeta = false,
          options = {};
        var outputPath;
        if (path) {
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              path,
              maxWidth,
              maxHeight,
              compressFormat,
              quality,
              rotation,
              outputPath,
              keepMeta,
              options,
            );
            resizeImages?.push(resizedImage);
          } catch (err) {
            console.log(err);
          }
        }
      }),
    ).then(() => {
      setPhoto([...photo, ...resizeImages]);
    });
  }, [image]);

  const captureImage = async index => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    const isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, async response => {
        const newImage = response.assets[0];
        const updatedProfiles = [...image];
        updatedProfiles[index].fileName = newImage?.fileName;
        updatedProfiles[index].fileSize = newImage?.fileSize;
        updatedProfiles[index].height = newImage?.height;
        updatedProfiles[index].originalPath = newImage?.originalPath;
        updatedProfiles[index].type = newImage?.type;
        updatedProfiles[index].uri = newImage?.uri;
        updatedProfiles[index].width = newImage?.width;
        setImage(updatedProfiles);
      });
    } else {
      common_fn.showToast('Please grant camera permissions to capture image');
    }
  };

  const addImage = async () => {
    setImage([
      ...image,
      {
        fileName: '',
        fileSize: 0,
        height: 0,
        originalPath: '',
        type: '',
        uri: '',
        width: 0,
      },
    ]);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FA' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, backgroundColor: Color.white }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: Color.white,
            }}>
            {orderData?.variants?.productImages?.length > 0 ? (
              <Image
                source={{ uri: orderData?.variants?.productImages?.[0]?.image }}
                style={{
                  width: 100,
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            ) : (
              <Image
                source={{ uri: Media.no_image }}
                style={{
                  width: 100,
                  height: 110,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            )}
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                  }}>
                  Order ID #{orderData?.order?.unique_order_id}

                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.white,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    backgroundColor: Color.green,
                    fontFamily: Manrope.SemiBold,
                    textTransform: 'capitalize',
                    marginHorizontal: 10,
                  }}>
                  {orderData?.status}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.lightBlack,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}
                numberOfLines={1}>
                {orderData?.products?.product_name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  paddingVertical: 3,
                }}>
                {orderData?.variants?.color != '' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderRightWidth: 1,
                      borderRightColor: Color.lightgrey,
                      paddingHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                        marginRight: 5,
                      }}>
                      Color
                    </Text>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: bgcolor,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: Color.primary,
                      }}></View>
                  </View>
                )}
                {orderData?.variants?.size != '' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginHorizontal: 5,
                      borderRightWidth: 1,
                      borderRightColor: Color.lightgrey,
                      paddingHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                        marginRight: 5,
                      }}>
                      Size -
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      {orderData?.variants?.size}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      fontFamily: Manrope.Medium,
                      letterSpacing: 0.5,
                    }}>
                    Quantity -{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}>
                    {orderData?.quantity}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Bold,
                  }}>
                  {orderData?.order?.region_id == 454
                    ? '$'
                    : orderData?.order?.region_id == 453
                      ? 'RM'
                      : '₹'}
                  {orderData?.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: Color.white,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
            }}>
            Product Ratings & Reviews
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.lightgrey,
              fontFamily: Manrope.Medium,
              marginVertical: 5,
            }}>
            Please give your overall ratings
          </Text>
          <View style={styles.productRatingView}>
            {maxRating.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => handleRatingPress(item.rating)}
                  style={{ marginRight: 10 }}>
                  <AntDesign
                    name={item.rating <= defaultRating ? 'star' : 'staro'}
                    size={35}
                    color={Color.sunShade}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
              }}>
              Add Detailed Review
            </Text>
            <TextInput
              style={{
                flex: 1,
                height: 150,
                color: Color.black,
                fontSize: 14,
                fontFamily: Manrope.Medium,
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 5,
                marginTop: 20,
                padding: 10,
              }}
              textAlignVertical="top"
              placeholder="Add a Detailed Review Here"
              placeholderTextColor={Color.lightgrey}
              value={review}
              onChangeText={value => {
                setReview(value);
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Manrope.SemiBold,
              }}>
              Add Photo
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {image?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      captureImage(index);
                    }}
                    style={{ marginRight: 10 }}>
                    {item?.uri != '' ? (
                      <Image
                        source={{ uri: item?.uri }}
                        style={{
                          width: 100,
                          height: 100,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: Color.cloudyGrey,
                          borderRadius: 5,
                          borderStyle: 'dashed',
                          marginVertical: 10,
                          padding: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 100,
                          height: 100,
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderColor: Color.lightgrey,
                          borderRadius: 5,
                          borderStyle: 'dashed',
                          marginVertical: 10,
                          padding: 10,
                        }}>
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={'plus'}
                          icon_size={30}
                          icon_color={'#A0C7EB'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  addImage();
                }}
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'plus-circle'}
                  icon_size={20}
                  icon_color={'#A0C7EB'}
                />
                <Text
                  style={{
                    fontFamily: Manrope.Bold,
                    fontSize: 14,
                    color: Color.primary,
                    textAlign: 'center',
                    marginHorizontal: 5,
                  }}>
                  Add More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            mode="contained"
            onPress={() => { }}
            style={{
              backgroundColor: Color.white,
              borderRadius: 5,
              margin: 10,
              borderWidth: 1,
              borderColor: Color.primary,
              flex: 1,
            }}
            textColor={Color.primary}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              postReview();
            }}
            style={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              margin: 10,
              borderWidth: 1,
              borderColor: Color.primary,
              flex: 1,
            }}
            textColor={Color.white}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    width: '100%',
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
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 14,
    marginRight: 5,
    letterSpacing: 0.5,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.SemiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
});
