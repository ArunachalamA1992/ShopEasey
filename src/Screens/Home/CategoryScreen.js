import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CategoryScreen = ({navigation}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const categories_data = await fetchData.categories(``, token);
      setCategoryData(categories_data?.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      {loading ? (
        <View style={{marginHorizontal: 10}}>
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
          renderItem={({item, index}) => {
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
                    backgroundColor: '#FCECE8',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Image
                    source={{uri: item?.file}}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'contain',
                      borderRadius: 100,
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
                      font: Manrope.ExtraBold,
                      paddingVertical: 5,
                    }}>
                    {item?.category_name}
                  </Text>
                  {/* <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    font: Manrope.SemiBold,
                    paddingVertical: 5,
                  }}>
                  {item?.products_count} Products
                </Text> */}
                </View>
                <View style={{marginHorizontal: 10}}>
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CategoryScreen;
