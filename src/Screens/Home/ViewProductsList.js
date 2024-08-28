import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ItemCard from '../../Components/ItemCard';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import Color from '../../Global/Color';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ViewAllProducts = ({navigation, route}) => {
  const {key} = route.params;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [Page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

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
      const latest_products =
        key == 'latest'
          ? await fetchData.list_products(``, token)
          : key == 'topPicks'
          ? await fetchData.list_products(`project=top-picks`, token)
          : await fetchData.list_products(`is_featured=1`, token);
      setProduct(latest_products?.data);
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
      var data = `page=${nextPage}`;
      const response = await fetchData.list_products(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...product, ...response?.data];
        setProduct(updatedData);
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
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      {loading ? (
        <View style={{marginHorizontal: 5}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
        <FlatList
          data={product}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <ItemCard item={item} navigation={navigation} />;
          }}
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
        />
      )}
    </View>
  );
};

export default ViewAllProducts;
