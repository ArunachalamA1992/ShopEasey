import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  Searchbar,
} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import fetchData from '../../Config/fetchData';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import ItemCard from '../../Components/ItemCard';
import VoiceSearch from '../../Components/VoiceSearch';

const {height} = Dimensions.get('screen');
const SearchDataList = ({navigation, route}) => {
  const [searchProduct, setSearchProduct] = useState(
    route.params.searchProduct,
  );
  const [selectData, setSelectData] = useState(route.params.selectData);
  const [ProductData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SearchloadMore, setSearchLoadMore] = useState(false);
  const [Searchpage, setSearchPage] = useState(1);
  const [SearchendReached, setSearchEndReached] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');
  const [ProductSuggestions, setProductSuggestions] = useState({
    data: [],
    visible: false,
  });

  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const handleVoiceSearch = query => {
    setVoiceSearchQuery(query);
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      var data = `${selectData?.type}=${selectData?.value}`;
      const Product_list = await fetchData.list_products(data, token);
      setProductData(Product_list?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [searchProduct, token]);

  useEffect(() => {
    getData();
  }, [token]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = `filter=${searchProduct}&page=1&limit=10`;
      const get_search_data = await fetchData.search(data, token);
      setSearchModalVisible(false);
      getData();
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const propertySearch = async input => {
    setSearchProduct(input);
    try {
      const data = `filter=${searchProduct}&page=1&limit=10`;
      const getData = await fetchData.search(data, token);
      setProductSuggestions({
        data: getData?.data?.keyword?.rows,
        visible: true,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadSearchMoreData = async () => {
    if (SearchloadMore || SearchendReached) {
      return;
    }
    setSearchLoadMore(true);
    try {
      const nextPage = Searchpage + 1;
      var data = `filter=${searchProduct}&page=${nextPage}&limit=10`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setSearchPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data?.keyword?.rows,
        ];
        setProductSuggestions(updatedData);
      } else {
        setSearchEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setSearchLoadMore(false);
    }
  };

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = `${selectData?.type}=${selectData?.value}&page=${nextPage}`;
      const filterData = await fetchData.list_products(data, token);
      if (filterData?.data?.length > 0) {
        setPage(nextPage);
        const updatedData = [...ProductData, ...filterData?.data];
        setProductData(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSearchModalVisible(true)}
        activeOpacity={0.7}
        style={{
          width: '100%',
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          borderRadius: 50,
          marginBottom: 10,
          borderColor: Color.lightgrey,
          borderWidth: 1,
        }}>
        <FIcon name="search" size={18} color={Color.cloudyGrey} />
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: Color.cloudyGrey,
            fontFamily: Manrope.Medium,
            marginHorizontal: 10,
          }}
          numberOfLines={1}>
          {`Search for ${searchProduct}`}
        </Text>
        <VoiceSearch onSearch={handleVoiceSearch} />
      </TouchableOpacity>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
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
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={ProductData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <ItemCard item={item} navigation={navigation} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: height / 2,
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
                  Product Not Found
                </Text>
              </View>
            );
          }}
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
          ListFooterComponent={() => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {loadMore && ProductData?.length > 0 && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.black,
                        marginHorizontal: 10,
                        fontFamily: Manrope.Medium,
                      }}>
                      Loading...
                    </Text>
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
      <Modal
        visible={isSearchModalVisible}
        transparent={true}
        animationType={'fade'}>
        <Pressable
          style={{
            backgroundColor: Color.transparantBlack,
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
          onPress={() => setSearchModalVisible(false)}
        />
        <View style={styles.searchModal}>
          {/* <Text
            style={{
              fontSize: 14,
              fontFamily: Manrope.Medium,
              color: Color.cloudyGrey,
              marginVertical: 5,
            }}>
            Enter Product Data
          </Text> */}
          <Searchbar
            placeholder="Search Products"
            placeholderTextColor={Color.grey}
            style={styles.searchView}
            value={searchProduct}
            iconColor={Color.grey}
            inputStyle={{color: Color.black}}
            onChangeText={search => {
              const sanitizedSearch = search.replace(/[^a-zA-Z0-9\s]/g, '');
              propertySearch(sanitizedSearch);
            }}
          />

          {ProductSuggestions?.visible == true && (
            <View
              style={{
                maxHeight: 200,
                padding: 10,
                backgroundColor: Color.white,
                elevation: 3,
                borderRadius: 5,
                marginTop: 5,
              }}>
              <FlatList
                data={ProductSuggestions?.data}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSearchProduct(item?.keyword);
                        setSelectData(item);
                        setProductSuggestions({
                          data: [],
                          visible: false,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Manrope.Medium,
                          color: Color.black,
                        }}>
                        {item?.keyword}
                      </Text>
                      {index < ProductSuggestions?.data.length - 1 && (
                        <Divider style={{height: 1, marginVertical: 5}} />
                      )}
                    </TouchableOpacity>
                  );
                }}
                onEndReached={() => {
                  loadSearchMoreData();
                }}
                onEndReachedThreshold={3}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Button
              mode="contained"
              onPress={() => {
                setSearchModalVisible(false);
              }}
              style={styles.searchButton}>
              cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                handleSearch();
              }}
              style={styles.searchButton}>
              Search
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchDataList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginBottom: 10,
  },
  searchModal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    padding: 20,
  },
  searchButton: {
    marginVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: Color.primary,
  },
});
