import React, { useState } from 'react';
import {
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
import { products } from '../../Config/Content';

const ProductList = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const categoryList = [
    {
      id: 1,
      name: 'Indian wear',
    },
    {
      id: 2,
      name: 'Top wear',
    },
    {
      id: 3,
      name: 'Bottom wear',
    },
    {
      id: 4,
      name: 'Inner wear',
    },
  ];

  const handleCategory = item => {
    setSelectedCategory(item);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={Color.white} />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <AntDesign name="search1" size={22} color={Color.cloudyGrey} />
          <TextInput style={styles.searchInput} placeholder="Search...." />
        </View>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <AntDesign name="hearto" size={22} color={Color.white} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Badge
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -10,
              right: -10,
              backgroundColor: Color.white,
              color: Color.black,
              fontFamily: Manrope.Bold,
            }}>
            {0}
          </Badge>
          <Feather name="shopping-cart" size={22} color={Color.white} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: Color.white }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center', paddingVertical: 10
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.black,
              padding: 10,
              borderRadius: 5, marginHorizontal: 10
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
          <View style={{ flex: 4, width: '95%', alignItems: 'center' }}>
            <FlatList
              data={categoryList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const isFocused = item.name === selectedCategory.name;
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: isFocused ? Color.primary : Color.white,
                      padding: 3,
                      paddingHorizontal: 10,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: isFocused ? Color.primary : Color.cloudyGrey,
                      margin: 5,
                      marginHorizontal: 5,
                    }}
                    onPress={() => handleCategory(item)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        fontFamily: Manrope.SemiBold,
                        color: isFocused ? Color.white : Color.lightBlack,
                        paddingVertical: 5,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <ItemCard item={item} navigation={navigation} />;
          }}
        />
      </View>
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
    // flex: 1, 
    width: '70%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 50,
  },
  searchInput: {},
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
