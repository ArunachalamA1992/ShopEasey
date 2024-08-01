import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Searchbar} from 'react-native-paper';
import {Media} from '../../Global/Media';

const {height} = Dimensions.get('screen');
const FollowingSellers = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchtext, setSearchtext] = useState('');
  const [sellerData, setSellerData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [inputs, setInputs] = useState('');

  useEffect(() => {
    setLoading(true);
    getSellersData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, [token]);

  const getSellersData = async () => {
    try {
      const getSellerList = await fetchData.following_seller_list(``, token);
      setSellerData(getSellerList?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const searchItemClick = text => {
    try {
      console.log(';rmfdlgldfl;gmdf  ', text);
      // const newData = sellerData.filter(
      //     function (item) {
      //         const itemData = item.first_name ? item.first_name.toUpperCase() + item.product_count : '';
      //         const textData = text.toUpperCase();
      //         return itemData.indexOf(textData) > -1;
      //     });
      // setSellerData(newData);
    } catch (error) {
      console.log('catch in searchItem_Click : ', error);
    }
  };

  useEffect(() => {
    searchFilterFunction(inputs);
  }, [inputs]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = sellerData.filter(function (item) {
        const itemData = item.first_name
          ? item.first_name.toUpperCase() + item.product_count
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSellerData(newData);
    } else {
      setSellerData(sellerData);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Searchbar
        placeholder={`Search Sellers`}
        placeholderTextColor={Color.cloudyGrey}
        onChangeText={text => setSearchtext(text)}
        value={searchtext}
        style={{
          borderRadius: 5,
          backgroundColor: Color.white,
          borderWidth: 1,
          borderColor: Color.lightgrey,
          color: Color.black,
        }}
        right={() => {
          return (
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                alignItems: 'center',
                bottom: 0,
                justifyContent: 'center',
              }}
              onPress={() => {}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Manrope.SemiBold,
                  color: Color.DullOrange,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          );
        }}
        inputStyle={{color: Color.black}}
        iconColor={Color.cloudyGrey}
      /> */}
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={100}
            borderRadius={10}
            marginTop={10}
          />
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={sellerData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SellerProfile', {
                    vendor_id: item?.vendor_id,
                    data: item,
                  })
                }
                style={{
                  flex: 1,
                  marginTop: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                  padding: 10,
                  backgroundColor: Color.white,
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {item.profile != null || item.profile != '' ? (
                  <Image
                    source={{uri: item.profile}}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'cover',
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: Media.user}}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'cover',
                      borderRadius: 100,
                    }}
                  />
                )}
                <View
                  style={{
                    marginHorizontal: 10,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Manrope.SemiBold,
                    }}
                    numberOfLines={2}>
                    {item.first_name + ' ' + item.last_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 3,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      {item.follow_count} Followers
                    </Text>
                    <View
                      style={{
                        width: 2,
                        height: '80%',
                        backgroundColor: Color.cloudyGrey,
                        marginHorizontal: 10,
                      }}></View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Manrope.Medium,
                      }}>
                      {item.product_count} Products
                    </Text>
                  </View>
                </View>
                {item?.is_follow === true ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: '#0FAD45',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.white,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}>
                      Following
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: '#0FAD45',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.white,
                        fontFamily: Manrope.SemiBold,
                        letterSpacing: 0.5,
                      }}>
                      Follow
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  // height: height / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Manrope.SemiBold,
                    fontSize: 14,
                    color: Color.black,
                  }}>
                  No Following Sellers
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    borderRadius: 5,
    marginVertical: 5,
    marginTop: 20,
  },
  searchInput: {
    width: '79.8%',
    paddingHorizontal: 10,
    fontFamily: 14,
    color: Color.lightBlack,
    fontFamily: Manrope.Medium,
  },
});

export default FollowingSellers;
