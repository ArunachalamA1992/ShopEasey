import React, { useCallback, useEffect, useState } from 'react';
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
import { FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import fetchData from '../../Config/fetchData';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import ItemCard from '../../Components/ItemCard';
import VoiceSearch from '../../Components/VoiceSearch';

const { height } = Dimensions.get('screen');
const SearchDataList = ({ navigation, route }) => {
  // console.log("SEARCH PRODUCT --------------- : ", route.params.searchProduct);

  const [searchProduct, setSearchProduct] = useState(
    route.params.searchProduct,
  );
  const [selectData, setSelectData] = useState(route.params.selectData);

  // console.log("SELECT DATA --------------- : ", route.params.selectData);
  const [ProductData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SearchloadMore, setSearchLoadMore] = useState(false);
  const [Searchpage, setSearchPage] = useState(1);
  const [SearchendReached, setSearchEndReached] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);
  const [ProductSuggestions, setProductSuggestions] = useState({
    data: [],
    visible: false,
  });
  const countryCode = useSelector(state => state.UserReducer.country);

  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  // console.log("token --------------- : ", token);

  const handleVoiceSearch = query => {
    setVoiceSearchQuery(query);
  };

  useEffect(() => {
    getData();
  }, [selectData, countryCode]);

  const getData = useCallback(async () => {
    try {
      setProductSuggestions({
        data: [],
        visible: false,
      });
      // console.log("selectData?.type --------------- : ", selectData);
      setProductData([])
      const data = `${selectData && `keywords=${selectData?.name}`}&region_id=${countryCode?.id}`;
      // console.log("get data --------------- : ", data);
      const Product_list = await fetchData.list_products(data, token);
      // console.log("Product_list --------------- : ", Product_list);
      setProductData(Product_list?.data);
    } catch (error) {
      console.log('catch in get_Data :', error);
    } finally {
      setLoading(false);
    }
  }, [searchProduct]);



  // const handleSearch = async (item) => {
  //   try {
  //     setLoading(true);
  //     setProductSuggestions({
  //       data: [],
  //       visible: false,
  //     });

  //     const data = `filter=${item?.name}`;
  //     const get_search_data = await fetchData.search(data, token);
  //     // console.log("GET SEARCG DATA ------------------ : ", get_search_data);

  //     if (get_search_data?.status === true) {
  //       setProductSuggestions({
  //         // data: getData?.data || [],
  //         data: get_search_data?.status ? get_search_data?.data : [],
  //         visible: true,
  //       });
  //     } else {
  //       setProductSuggestions({
  //         data: [],
  //         visible: false,
  //       });
  //     }
  //     // getData();
  //     // setSearchModalVisible(false);
  //   } catch (error) {
  //     console.log(`catch in handle_Search :`, error);
  //   }
  // };

  const handleSearch = async (item) => {
    try {
      setLoading(true);
      setProductSuggestions({
        data: [],
        visible: false,
      });

      const data = `filter=${item?.name}`;
      const get_search_data = await fetchData.search(data, token);

      if (get_search_data?.status === true) {
        // Set the filtered data to the ProductData state
        setProductData(get_search_data?.data || []);
      } else {
        setProductData([]); // Clear data if no results
      }
    } catch (error) {
      console.log(`catch in handle_Search:`, error);
    } finally {
      setLoading(false);
    }
  };

  const propertySearch = async input => {
    setSearchProduct(input);
    setSearchLoader(true);
    try {
      // console.log("input --------------- : ", input);
      setProductSuggestions({
        data: [],
        visible: false,
      });
      const data = `filter=${input}`;
      // const data = `filter=${input}&page=1&limit=10`;
      const getData = await fetchData.search(data, token);
      // console.log("getData SEARCH--------------- : ", getData);

      if (getData?.status === true) {
        setProductSuggestions({
          data: getData?.data || [],
          visible: true,
        });

      } else {
        setProductSuggestions({
          data: [],
          visible: false,
        });
      }
      setSearchLoader(false);
    } catch (error) {
      console.log('catch in Search_Data_List :', error);
      setSearchLoader(false);
    }
  };


  const loadSearchMoreData = async () => {
    if (SearchloadMore || SearchendReached) {
      return;
    }
    setSearchLoadMore(true);
    try {
      const nextPage = Searchpage + 1;
      var data = `filter=${searchProduct?.name}&page=${nextPage}`;
      const filterData = await fetchData.search(data, token);
      if (filterData.length > 0) {
        setSearchPage(nextPage);
        const updatedData = [
          ...ProductSuggestions,
          ...filterData?.data,
        ];
        setProductSuggestions(updatedData);
      } else {
        setSearchEndReached(true);
      }
    } catch (error) {
      console.error('catch in loadSearch_More_Data:', error);
    } finally {
      setSearchLoadMore(false);
    }
  };

  const loadMoreData = async () => {
    console.log("loadMoreData called"); // Debug Start Point
    console.log("loadMore:", loadMore, "endReached:", endReached);

    // if (loadMore || endReached) {
    //   console.log("Skipping loadMoreData...");
    //   return;
    // }

    setLoadMore(true);
    try {
      const nextPage = page + 1;
      console.log("DATA --------------- :", selectData?.name+ "REGION ---------- :"+countryCode?.id+"PAGE -------------- :"+nextPage);
      const data = `keywords=${selectData?.name}&region_id=${countryCode?.id}&page=${nextPage}`;
      // const data = `keywords=${selectData?.name}&region_id=${countryCode?.id}&page=${nextPage}`;

      const filterData = await fetchData.list_products(data, token);

      if (filterData?.data?.length > 0) {
        setPage(nextPage);
        const updatedData = [...ProductData, ...filterData?.data];
        console.log("SEARCH updatedData *******************", updatedData);
        setProductData(updatedData);
      } else {
        console.log("No more data to load");
        setEndReached(true);
      }
    } catch (error) {
      console.error("Error in loadMoreData:", error);
    } finally {
      setLoadMore(false);
      console.log("loadMore reset to false");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchModal}>
        <Searchbar
          placeholder="Search Products Here"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={searchProduct?.name}
          iconColor={Color.black}
          inputStyle={{ color: Color.black }}
          onChangeText={search => {
            // console.log("search ********************** : ", search);

            const sanitizedSearch = search.replace(/[^a-zA-Z0-9\s]/g, '');
            propertySearch(sanitizedSearch);
          }}
          clearIcon={false}
          // icon={searchProduct != '' ? 'close' : 'search'}
          onIconPress={() => {
            setSearchProduct('');
            setProductSuggestions({
              data: [],
              visible: false,
            });
            setProductData([]);
          }}
        />

        {ProductSuggestions?.visible == true && searchProduct != '' && (
          <View
            style={{
              maxHeight: 200,
              padding: 10,
              backgroundColor: Color.white,
              elevation: 3,
              borderRadius: 5,
              marginTop: 5,
              borderWidth: 1,
              borderColor: Color.lightgrey,
            }}>
            {searchLoader ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : (
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
                onEndReachedThreshold={0.5}
                ListEmptyComponent={() => {
                  if (ProductSuggestions?.data && ProductData?.length != 0) {
                    return null
                  }
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
              />
            )}
          </View>
        )}
      </View>

      {loading ? (
        <View style={{ padding: 10 }}>
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
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={ProductData}
          numColumns={2}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <ItemCard item={item} navigation={navigation} />;
          }}
          ListEmptyComponent={() => {
            if (ProductSuggestions?.data && ProductData?.length != 0) {
              return null
            }
            return (
              <View
                style={{
                  height: height / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  width: '100%',
                }}>
                <ActivityIndicator size={'large'} color={Color.primary}></ActivityIndicator>
                {/* <Text
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
                </Text> */}
              </View>
            );
          }}
          onEndReached={() => {
            console.log("end reached *********");
            loadMoreData();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {loadMore && ProductData?.length > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
  },
  searchButton: {
    marginVertical: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: Color.primary,
  },
});
