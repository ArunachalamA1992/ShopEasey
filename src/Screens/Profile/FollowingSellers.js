import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Color from '../../Global/Color';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const sellerData = [
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'RAJESH QUALITY PRODUCTS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'DIAMOND NATURALS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'SRI GOKULAM ELECTRONICS,FURNITURE, METALS & MOBILES',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'RAJESH QUALITY PRODUCTS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'SRI GOKULAM ELECTRONICS,FURNITURE, METALS & MOBILES',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'DIAMOND NATURALS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'RAJESH QUALITY PRODUCTS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
  {
    seller_id: '0',
    seller_image: 'shipped',
    seller_name: 'RAJESH QUALITY PRODUCTS',
    seller_followers: '4',
    seller_products: '234',
    seller_category: '3',
    seller_join_date: '139 days ago',
  },
];

// create a component
const FollowingSellers = () => {
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
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
      const getSellerList = await fetchData.seller_list(``, token);
      // console.log('getSellerList ==============', getSellerList.data);
      setSellerData(getSellerList?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSellerItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SellerProfile', {data: item})}
        style={{
          width: '100%',
          alignItems: 'center',
          margin: 5,
          borderRadius: 5,
        }}>
        <View
          style={{
            width: '95%',
            height: 100,
            backgroundColor: Color.white,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 100,
            }}>
            {item.profile != null ? (
              <Image
                source={{uri: item.profile}}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/logos/user.png')}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 4,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    fontFamily: Manrope.SemiBold,
                    letterSpacing: 0.5,
                    paddingVertical: 5,
                  }}
                  numberOfLines={2}>
                  {item.first_name + ' ' + item.last_name}
                </Text>
              </View>
              {item?.is_follow === true ? (
                <View
                  style={{
                    flex: 1,
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
                    flex: 1,
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
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 3,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                {item.follow_count}
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  {' '}
                  Followers
                </Text>
              </Text>
              <View
                style={{
                  width: 2,
                  height: '95%',
                  backgroundColor: Color.black,
                  marginHorizontal: 20,
                }}></View>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.SemiBold,
                  letterSpacing: 0.5,
                }}>
                {item.product_count}
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  {' '}
                  Products
                </Text>
              </Text>
            </View>
            {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{width: '50%', fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>{item.mobile} 4565466565456</Text>
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  Mobile </Text>
                            </View>
                            <View style={{ width: 2, height: '95%', backgroundColor: Color.black, marginHorizontal: 10 }}></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={1}>{moment(item.created_at).format('YYYY-MM-DD')}</Text>
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>  D.O.J</Text>
                            </View>
                        </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
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

  const clearInput = () => {
    setInputs('');
    setSellerData(sellerData);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.searchView}>
          <Iconviewcomponent
            Icontag={'AntDesign'}
            iconname={'search1'}
            icon_size={25}
            icon_color={Color.lightBlack}
          />
          <TextInput
            placeholder="Search...."
            onChangeText={text => setSearchtext(text)}
            value={searchtext}
            style={styles.searchInput}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={() => searchItemClick()}
            style={{
              padding: 10,
              paddingHorizontal: 15,
              backgroundColor: Color.primary,
              borderTopEndRadius: 30,
              borderBottomEndRadius: 30,
            }}>
            <Iconviewcomponent
              Icontag={'Ionicons'}
              iconname={'arrow-forward-outline'}
              icon_size={25}
              icon_color={Color.white}
            />
          </TouchableOpacity>
          {/* <TextInputLoginPage
                        placeHolderLabel="Search"
                        maxLengths={30}
                        enteredEmail={inputs}
                        clearValue={clearInput}
                        value={inputs}
                        onChangeText={(text) => {
                            setInputs(text)
                        }}
                    /> */}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          {loading ? (
            <View style={{width: '100%', height: '100%'}}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={130}
                    borderRadius={10}
                    marginTop={10}
                    marginHorizontal={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={130}
                    borderRadius={10}
                    marginTop={10}
                    marginHorizontal={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={130}
                    borderRadius={10}
                    marginTop={10}
                    marginHorizontal={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={130}
                    borderRadius={10}
                    marginTop={10}
                    marginHorizontal={10}
                  />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={130}
                    borderRadius={10}
                    marginTop={10}
                    marginHorizontal={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={sellerData}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => renderSellerItem(item, index)}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.softGrey,
  },
  searchView: {
    // flex: 1,
    width: '90%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    borderWidth: 0.5,
    borderColor: Color.softGrey,
    borderRadius: 50,
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

//make this component available to the app
export default FollowingSellers;
