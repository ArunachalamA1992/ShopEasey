import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../Global/Color';
import { categoryData } from '../../Config/Content';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';

const CategoryScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      <FlatList
        data={categoryData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
          const lastItem = index === categoryData.length - 1;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductList')}
              style={{
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: Color.lightgrey,
                borderRadius: 10,
                paddingBottom: 10,
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#FCECE8',
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Image
                  source={{ uri: item.category_image }}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginHorizontal: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    font: Manrope.ExtraBold,
                    paddingVertical: 5,
                  }}>
                  {item.category_name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    font: Manrope.SemiBold,
                    paddingVertical: 5,
                  }}>
                  {item.products_count} Products
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryScreen;
