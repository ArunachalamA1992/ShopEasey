import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../Global/Color';
import {Manrope} from '../../Global/FontFamily';

const SearchScreen = ({navigation}) => {
  const [searchJob, setSearchJob] = useState('');
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

  const propertySearch = async data => {
    setSearchJob(data);
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  const getSearchData = async () => {
    try {
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        placeholderTextColor={Color.grey}
        style={styles.searchView}
        value={searchJob}
        iconColor={Color.grey}
        inputStyle={{color: Color.black}}
        onChangeText={search => propertySearch(search)}
      />
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
        <Text style={{fontSize: 16, color: Color.white}}>Search</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
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
              fontSize: 18,
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
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {RecentlySearch.map((item, index) => {
            return (
              <View
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
              </View>
            );
          })}
        </View>
      </View>
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
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Color.lightgrey,
  },
});
