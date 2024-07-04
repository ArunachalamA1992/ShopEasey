import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import ItemCard from '../../Components/ItemCard';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { setDataCount } from '../../Redux';

const { height } = Dimensions.get('screen');
const ProductList = ({ route }) => {
  const [category_id] = useState(route.params.category_id);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  const { token } = userData;
  const dispatch = useDispatch();
  const [CategoryData, setCategoryData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(false);
  const [sub_cat_id, setSub_cat_id] = useState(0);
  const dataCount = useSelector(state => state.UserReducer.count);
  const { wishlist, cart } = dataCount;
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData();
    getCountData();
  }, [category_id]);

  const getData = async () => {
    try {
      var data = `/${category_id}`;
      loadInitialProducts(category_id);
      const categories_data = await fetchData.categories(data, token);
      // let query = `category_id=${category_id}`;
      // const product_data = await fetchData.list_products(query, token);
      // setProducts(product_data?.data);
      setCurrentLevel(false);
      setCategoryData(categories_data?.data?.sub_categories);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadInitialProducts = async (
    catId,
    subCatId = null,
    subSubCatId = null,
  ) => {
    try {
      setLoading(true);
      setPage(1);
      setEndReached(false);
      let query = `category_id=${catId}`;
      if (subCatId) query += `&sub_category_id=${subCatId}`;
      if (subSubCatId) query += `&sub_sub_category_id=${subSubCatId}`;
      const product_data = await fetchData.list_products(query, token);
      setProducts(product_data?.data);
    } catch (error) {
      console.log('Error loading products:', error);
    } finally {
      setLoading(false);
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

  const handleCategory = async item => {
    try {
      setSelectedCategory(item);
      setCurrentLevel(currentLevel ? false : true);
      setSub_cat_id(item?.id);
      const categories_data = currentLevel
        ? await fetchData.sub_sub_categories(`${item.id}`, token)
        : await fetchData.sub_categories(`${item.id}`, token);
      setCategoryData(categories_data?.data);
      loadInitialProducts(
        category_id,
        currentLevel ? sub_cat_id : item.id,
        currentLevel ? item.id : null,
      );
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
      let query = `category_id=${category_id}&page=${nextPage}`;
      if (currentLevel) query += `&sub_category_id=${sub_cat_id}`;
      if (selectedCategory?.id)
        query += `&sub_sub_category_id=${selectedCategory?.id}`;
      const response = await fetchData.list_products(query, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...products, ...response?.data];
        setProducts(updatedData);
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
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={Color.white} />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <AntDesign name="search1" size={22} color={Color.cloudyGrey} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search...."
            placeholderTextColor={Color.cloudyGrey}
          />
        </View>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate('WishListTab');
          }}>
          {wishlist != 0 ?
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
            </Badge> : null}
          <AntDesign name="hearto" size={22} color={Color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 10, padding: 5 }}
          onPress={() => {
            navigation.navigate('MyCartTab');
          }}>
          {cart != 0 ?
            <Badge
              style={{
                position: 'absolute',
                zIndex: 1,
                top: -5,
                right: -5,
                backgroundColor: Color.red,
                color: Color.white,
                fontFamily: Manrope.Bold,
                fontSize: 12,
              }}>
              {cart}
            </Badge> : null}
          <Feather name="shopping-cart" size={22} color={Color.white} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{ marginHorizontal: 5 }}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={40}
                borderRadius={10}
                marginTop={10}
                marginRight={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
              <SkeletonPlaceholder.Item
                width={'45%'}
                height={200}
                borderRadius={10}
                marginTop={10}
                marginHorizontal={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            {products.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  padding: 10,
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}>
                <Feather name="filter" size={16} color={Color.white} />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.white,
                    fontFamily: Manrope.Medium,
                    paddingHorizontal: 10,
                  }}>
                  Filter
                </Text>
              </View>
            ) : null}
            <FlatList
              data={CategoryData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const isFocused = currentLevel
                  ? item.sub_sub_category_name ===
                  selectedCategory?.sub_sub_category_name
                  : item.sub_category_name ===
                  selectedCategory?.sub_category_name;

                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: isFocused ? Color.primary : Color.white,
                      padding: 3,
                      paddingHorizontal: 10,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: isFocused ? Color.primary : Color.cloudyGrey,
                      margin: 5,
                    }}
                    onPress={() => {
                      handleCategory(item);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        fontFamily: Manrope.SemiBold,
                        color: isFocused ? Color.white : Color.lightBlack,
                        paddingVertical: 5,
                      }}>
                      {currentLevel
                        ? item.sub_sub_category_name
                        : item.sub_category_name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <FlatList
            data={products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <ItemCard item={item} navigation={navigation} />;
            }}
            onEndReached={() => {
              loadMoreData();
            }}
            onEndReachedThreshold={3}
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
                    No Products Found
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchView: {
    flex: 1,
    // width: '75%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  searchInput: {
    width: '90%',
    fontSize: 14,
    color: Color.black,
    fontFamily: Manrope.SemiBold,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  CategoryContainer: {
    backgroundColor: Color.white,
    flexDirection: 'row',
  },
  categoriesView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 30,
    gap: 5,
  },
  categoriesText: {
    color: Color.black,
    fontSize: 16,
    padding: 2,
  },
  productContainer: {
    backgroundColor: Color.white,
  },
  product: {
    margin: 5,
    flex: 1,
  },
  Productimage: {
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  imageTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  offerText: {
    backgroundColor: Color.lightYellow,
    fontFamily: Manrope.Bold,
    fontSize: 12,
    color: Color.black,
    borderRadius: 5,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  locationText: {
    color: Color.white,
    fontSize: 12,
    fontFamily: Manrope.Bold,
    padding: 5,
  },
  contentView: {
    borderLeftWidth: 1,
    borderLeftColor: Color.lightgrey,
    borderRightWidth: 1,
    borderRightColor: Color.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  categoryName: {
    color: '#777777',
    fontSize: 14,
    flex: 1,
    fontFamily: Manrope.Bold,
  },
  productName: {
    color: Color.lightBlack,
    fontSize: 14,
    fontFamily: Manrope.Bold,
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 18,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.Medium,
    fontSize: 14,
    paddingLeft: 25,
    textDecorationLine: 'line-through',
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
