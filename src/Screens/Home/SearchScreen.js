import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchData from '../../Config/fetchData';
import VoiceSearch from '../../Components/VoiceSearch';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';

const SearchScreen = ({ navigation, route }) => {
  const [searchProduct, setSearchProduct] = useState(
    route.params.searchProduct,
  );
  const [selectData, setSelectData] = useState({});
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [ProductSuggestions, setProductSuggestions] = useState({
    data: [],
    visible: false,
  });

  // console.log('ProductSuggestions?.visible', ProductSuggestions?.visible);

  const [RecentlySearch] = useState([
    {
      id: 1,
      name: 'Polo T-shirt',
      value: 'polo_t_shirt',
    },
    {
      id: 2,
      name: 'Bottom Wear',
      value: 'bottom_wear',
    },
  ]);

  const handleVoiceSearch = query => {
    setSearchProduct(query);
    setVoiceSearchQuery(query);
  };

  const propertySearch = async data => {
    setSearchProduct(data);
    try {
      const data = `filter=${data}`;
      const getData = await fetchData.search(data, token);
      setProductSuggestions({
        data: getData?.data,
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = Page + 1;
      var data = `filter=${searchProduct}&page=${nextPage}&limit=10`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data,
        ];
        setProductSuggestions({ data: updatedData, visible: true });
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };



  const loadSearchMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = Searchpage + 1;
      var data = `filter=${searchProduct?.name}&page=${nextPage}`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data,
        ];
        setProductSuggestions(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('catch in loadSearch_More_Data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  const getSearchData = async () => {
    try {
      if (searchProduct != '') {
        navigation.navigate('SearchDataList', { searchProduct, selectData });
      } else {
        common_fn.showToast('Please Select the Search');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearch = async item => {
    try {
      setProductSuggestions({
        data: [],
        visible: false,
      });

      const data = `filter=${item?.name}`;
      const get_search_data = await fetchData.search(data, token);
      // console.log("GET SEARCG DATA ------------------ : ", get_search_data);

      if (get_search_data?.status === true) {
        setProductSuggestions({
          // data: getData?.data || [],
          data: get_search_data?.status ? get_search_data?.data : [],
          visible: true,
        });
      } else {
        setProductSuggestions({
          data: [],
          visible: true,
        });
      }
      // getData();
    } catch (error) {
      console.log(`catch in handle_Search :`, error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchView}>
        <Icon color={Color.cloudyGrey} name="search" size={25} />
        <TextInput
          placeholder="Search Products"
          value={searchProduct}
          style={{
            flex: 1,
            marginLeft: 10,
            color: Color.cloudyGrey,
            fontSize: 14,
            fontFamily: Manrope.SemiBold,
          }}
          placeholderTextColor={Color.cloudyGrey}
          onChangeText={search => propertySearch(search)}
        />
        {/* <VoiceSearch onSearch={handleVoiceSearch} /> */}
      </TouchableOpacity>

      {ProductSuggestions?.visible == true && searchProduct != '' && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              maxHeight: 200,
              backgroundColor: Color.white,
              padding: 10,
              borderWidth: 1,
              borderColor: Color.lightgrey,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <FlatList
              data={ProductSuggestions?.data}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSearchProduct(item);
                      setSelectData(item);
                      handleSearch(item);
                      // setProductSuggestions({
                      //   data: [],
                      //   visible: false,
                      // });
                    }}
                    style={{
                      width: '90%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: Manrope.Medium,
                        color: Color.black,
                      }}>
                      {item?.name}
                    </Text>
                    {index < ProductSuggestions?.data.length - 1 && (
                      <Divider style={{ height: 1, marginVertical: 5 }} />
                    )}
                  </TouchableOpacity>
                );
              }}
              onEndReached={() => {
                loadSearchMoreData();
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        padding: 5,
                        paddingHorizontal: 20,
                        marginStart: 5,
                        borderRadius: 5,
                        marginVertical: 10,
                        color: Color.primary,
                        fontFamily: Manrope.Bold,
                      }}>
                      No Data
                    </Text>
                  </View>
                );
              }}
              onEndReachedThreshold={3}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 40,
          marginVertical: 10,
          backgroundColor: Color.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
        onPress={() => {
          getSearchData();
        }}>
        <Text style={{ fontSize: 16, color: Color.white }}>Search</Text>
      </TouchableOpacity>
      {/* <View style={{flex: 1, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: Manrope.Bold,
              fontSize: 16,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
            }}>
            Recently Search
          </Text>
          <Text
            style={{
              fontFamily: Manrope.Medium,
              fontSize: 16,
              color: Color.cloudyGrey,
              textTransform: 'capitalize',
              marginHorizontal: 5,
            }}>
            Clear
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {RecentlySearch.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  setSearchProduct(item?.name);
                }}>
                <F6Icon
                  name="arrow-rotate-left"
                  size={20}
                  color={Color.cloudyGrey}
                />
                <Text
                  style={{
                    fontFamily: Manrope.Bold,
                    fontSize: 14,
                    color: Color.black,
                    textTransform: 'capitalize',
                    marginHorizontal: 5,
                    marginVertical: 10,
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.Medium,
            }}>
            In-Progress
          </Text>
        </View>
      </View> */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: Color.lightgrey,
  },
});
