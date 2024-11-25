import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { height } = Dimensions.get('screen');
const CategoryScreen = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;

  useEffect(() => {
    setLoading(true);
    getData()
      .then(() => setLoading(false))
      .catch(error => {
        setLoading(false);
      });
  }, []);

  const getData = async () => {
    try {
      const categories_data = await fetchData.categories(``, token);
      console.log("Categories ----------------:  ", categories_data?.data);

      setCategoryData(categories_data?.data);

      categories_data.data.forEach((item, index) => {
        console.log(`Category ${index + 1} - ${item.category_name}: ${item.sub_categories.length} sub-categories`);
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
      let query = `page=${nextPage}`;
      const response = await fetchData.categories(query, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...categoryData, ...response?.data];
        setCategoryData(updatedData);
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
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      {loading ? (
        <View style={{ marginHorizontal: 10 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item>
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
          data={categoryData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            console.log("CATEGORY ITEMS ---------------- :", item.sub_categories);
            // const subCategoryNames = item.sub_categories.map(subCategory => subCategory.sub_category_name);
            // console.log("11111111111111111---------------- :", subCategoryNames);

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductList', {
                    category_id: item?.id,
                  });
                }}
                style={{
                  margin: 5,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: Color.lightgrey,
                  borderRadius: 5,
                  // paddingBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#D9EDFF',
                    borderRadius: 10,
                    // padding: 10,
                  }}>
                  <Image
                    source={{ uri: item?.file }}
                    style={{
                      width: 90,
                      height: 90,
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 20,
                  }}>

                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      font: Manrope.Bold,
                      paddingVertical: 5, letterSpacing: 0.5
                    }}>
                    {item?.category_name != null ? item?.category_name : '-- -- --'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      font: Manrope.SemiBold,
                      paddingVertical: 5, letterSpacing: 0.5
                    }}>
                    {item.sub_categories.length} Sub Categories
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward-outline'}
                    icon_size={20}
                    icon_color={Color.lightgrey}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
          showsVerticalScrollIndicator={false}
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
                  No Categories Found
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default CategoryScreen;
