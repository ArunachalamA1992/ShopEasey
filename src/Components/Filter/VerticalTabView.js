import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Manrope} from '../../Global/FontFamily';
import Color from '../../Global/Color';
import {Button, Divider, Searchbar} from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import axios from 'axios';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import {CheckboxData, RadioData} from '../RadioButton';

const TabContent = ({
  item,
  categorySelectedItem,
  handleCategoryPress,
  priceSelectedItem,
  handlePricePress,
  brandSelectedItem,
  handlebrandPress,
  colorSelectedItem,
  handleColorPress,
  industrySelectedItem,
  handleIndustryPress,
  worktypeSelectedItem,
  handleWorkTypePress,
  locationData,
  fetchSuggestions,
  setLocationSuggestion,
  LocationSuggestion,
  setSearchLocation,
  searchLocation,
  countryCode,
}) => {
  if (item?.category) {
    return (
      <>
        {item?.category?.map((option, index) => {
          return (
            <RadioData
              key={index}
              label={option.category_name}
              checked={categorySelectedItem.includes(option.id)}
              onPress={() => handleCategoryPress(option.id)}
            />
          );
        })}
      </>
    );
  } else if (item?.price) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.price?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={`${countryCode?.symbol} ${item.price}`}
              checked={priceSelectedItem.includes(item.price_id)}
              onPress={() => handlePricePress(item.price_id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.brand) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.brand?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.title}
              checked={brandSelectedItem.includes(item.id)}
              onPress={() => handlebrandPress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.colors) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.colors?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.name}
              checked={colorSelectedItem.includes(item.id)}
              onPress={() => handleColorPress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.location) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Color.black,
            fontFamily: Manrope.Bold,
            marginVertical: 10,
          }}>
          Select Location
        </Text>
        <Searchbar
          placeholder="Search Location"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={searchLocation}
          icon={() => (
            <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
          )}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => {
            setSearchLocation(search);
            fetchSuggestions(search);
          }}
        />
        {LocationSuggestion?.data?.length != 0 && (
          <View
            style={{
              maxHeight: 200,
              padding: 10,
              backgroundColor: Color.white,
              elevation: 3,
              borderRadius: 5,
              marginTop: 5,
            }}>
            {LocationSuggestion?.data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchLocation(item?.display_name?.split(',')[0]);
                    setLocationSuggestion({
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
                    {item?.display_name?.split(',')[0]}
                  </Text>
                  {index < LocationSuggestion?.data.length - 1 && (
                    <Divider style={{height: 1, marginVertical: 5}} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  } else if (item?.industry) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        {item?.industry?.map((item, index) => {
          return (
            <CheckboxData
              key={index}
              label={item.name}
              checked={industrySelectedItem.includes(item.id)}
              onPress={() => handleIndustryPress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.work_type) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.work_type?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.title}
              checked={worktypeSelectedItem?.includes(item.id)}
              onPress={() => handleWorkTypePress(item.id)}
            />
          );
        })}
      </View>
    );
  }
};

const VerticalTabView = props => {
  var {navigation} = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const countryCode = useSelector(state => state.UserReducer.country);
  const [priceData, setPriceData] = useState([
    {
      price_id: 1,
      price: '199',
    },
    {
      price_id: 2,
      price: '499',
    },
    {
      price_id: 3,
      price: '2999',
    },
    {
      price_id: 4,
      price: '4999',
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [categoriesData, setCategoriesData] = useState([]);

  const [brandData, setbrandData] = useState([
    {
      id: 1,
      title: 'Jack & Jones',
      value: 'Jack & Jones',
    },
    {
      id: 2,
      title: 'Louis Philippe',
      value: 'Louis Philippe',
    },
  ]);

  const [colorData, setcolorData] = useState([]);

  const [worktypeData] = useState([
    {
      id: 1,
      title: 'on-site',
      value: 0,
    },
    {
      id: 2,
      title: 'Remote',
      value: 1,
    },
  ]);

  const [filterSelectedItem, setFilterSelectedItem] = useState({
    category: [],
    price: [],
    brand: [],
    colors: [],
    location: [],
    industry: [],
    work_type: [],
  });

  const [industryData, setIndustryData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    getApiData();
  }, [categoriesData]);

  const getApiData = async () => {
    try {
      // Category
      const list_categories = await fetchData.categories(``, token);
      console.log('list_categories?.data', list_categories?.data);
      setCategoriesData(list_categories?.data);
    } catch (error) {
      console.log('Filter error', error);
    }
  };

  const filterOptions = [
    {
      category: categoriesData,
    },
    {
      price: priceData,
    },
    {
      brand: brandData,
    },
    {
      colors: colorData,
    },
    {
      location: LocationSuggestion,
    },
    {
      industry: industryData,
    },
    {
      work_type: [
        {
          id: 1,
          title: 'on-site',
          value: 0,
        },
        {
          id: 2,
          title: 'Remote',
          value: 1,
        },
      ],
    },
  ];
  const [categorySelectedItem, setcategorySelectedItem] = useState([]);
  const handleCategoryPress = itemId => {
    if (categorySelectedItem.includes(itemId)) {
      setcategorySelectedItem(
        categorySelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category?.filter(
          single => single.id !== itemId,
        ),
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setcategorySelectedItem([...categorySelectedItem, itemId]);
      const selectedItem = categoriesData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: [...filterSelectedItem?.category, selectedItem],
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [priceSelectedItem, setpriceSelectedItem] = useState([]);
  const handlePricePress = itemId => {
    if (priceSelectedItem.includes(itemId)) {
      setpriceSelectedItem(
        priceSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price?.filter(
          single => single.price_id !== itemId,
        ),
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setpriceSelectedItem([...priceSelectedItem, itemId]);
      const selectedItem = priceData.find(single => single.price_id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: [...filterSelectedItem?.price, selectedItem],
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [brandSelectedItem, setbrandSelectedItem] = useState([]);
  const handlebrandPress = itemId => {
    if (brandSelectedItem.includes(itemId)) {
      setbrandSelectedItem(
        brandSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand?.filter(
          single => single.id !== itemId,
        ),
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setbrandSelectedItem([...brandSelectedItem, itemId]);
      const selectedItem = brandData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: [...filterSelectedItem?.brand, selectedItem],
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [colorSelectedItem, setcolorSelectedItem] = useState([]);
  const handleColorPress = itemId => {
    if (colorSelectedItem.includes(itemId)) {
      setcolorSelectedItem(
        colorSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors?.filter(
          single => single.id !== itemId,
        ),
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setcolorSelectedItem([...colorSelectedItem, itemId]);
      const selectedItem = colorData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: [...filterSelectedItem?.colors, selectedItem],
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [industrySelectedItem, setIndustrySelectedItem] = useState([]);
  const handleIndustryPress = itemId => {
    if (industrySelectedItem.includes(itemId)) {
      setIndustrySelectedItem(
        industrySelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry?.filter(
          single => single.id !== itemId,
        ),
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setIndustrySelectedItem([...industrySelectedItem, itemId]);
      const selectedItem = industryData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: [...filterSelectedItem?.industry, selectedItem],
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [worktypeSelectedItem, setWorktypeSelectedItem] = useState([]);
  const handleWorkTypePress = itemId => {
    if (worktypeSelectedItem.includes(itemId)) {
      setWorktypeSelectedItem(
        worktypeSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type?.filter(
          single => single.id !== itemId,
        ),
      });
    } else {
      setWorktypeSelectedItem([...worktypeSelectedItem, itemId]);
      const selectedItem = worktypeData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: [...filterSelectedItem?.work_type, selectedItem],
      });
    }
  };
  const tabs = [
    'Category',
    'Price',
    'Brand',
    'Colors',
    'Discount',
    'Size',
    'Rating',
  ];

  const dataPayload = () => {
    const payload = {
      page: 1,
      location: filterSelectedItem?.location?.city,
      price_id: filterSelectedItem?.price
        .filter(item => item.price_id)
        .map(item => item.price_id)
        .join(','),
      colors_id: filterSelectedItem?.colors
        .filter(item => item.id)
        .map(item => item.id)
        .join(','),
      industry_type_id: filterSelectedItem?.industry
        .filter(item => item.industry_type_id)
        .map(item => item.industry_type_id)
        .join(','),
      created_at: filterSelectedItem?.category
        .filter(item => item.value)
        .map(item => item.value)
        .join(','),
      is_remote: filterSelectedItem?.category
        .filter(item => item.value)
        .map(item => item.value)
        .join(','),
      place: searchLocation,
    };

    const queryString = Object.entries(payload)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return queryString;
  };

  const appyFilter = async () => {
    try {
      var data = dataPayload();
      navigation.navigate('FilterList', {item: data});
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setLocationSuggestion({
        data: response?.data,
        visible: true,
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <ScrollView
          style={{flex: 2, backgroundColor: '#EAEAEF'}}
          showsVerticalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={{
                  padding: 10,
                  backgroundColor:
                    selectedTab === index ? Color.primary : '#EAEAEF',
                  marginTop: 2,
                }}
                onPress={() => setSelectedTab(index)}>
                <Text
                  style={{
                    fontSize: 16,
                    color: selectedTab === index ? Color.white : Color.black,
                    fontFamily: Manrope.SemiBold,
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
              {index < tabs.length - 1 && (
                <Divider style={{height: 2, backgroundColor: Color.white}} />
              )}
            </>
          ))}
        </ScrollView>
        <View style={{flex: 2, backgroundColor: Color.white, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TabContent
              item={filterOptions?.[selectedTab]}
              categorySelectedItem={categorySelectedItem}
              handleCategoryPress={handleCategoryPress}
              priceSelectedItem={priceSelectedItem}
              handlePricePress={handlePricePress}
              brandSelectedItem={brandSelectedItem}
              handlebrandPress={handlebrandPress}
              colorSelectedItem={colorSelectedItem}
              handleColorPress={handleColorPress}
              industrySelectedItem={industrySelectedItem}
              handleIndustryPress={handleIndustryPress}
              worktypeSelectedItem={worktypeSelectedItem}
              handleWorkTypePress={handleWorkTypePress}
              locationData={locationData}
              fetchSuggestions={fetchSuggestions}
              setLocationSuggestion={setLocationSuggestion}
              LocationSuggestion={LocationSuggestion}
              setSearchLocation={setSearchLocation}
              searchLocation={searchLocation}
              countryCode={countryCode}
            />
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Color.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Button
          mode="contained"
          onPress={() => {
            setFilterSelectedItem({
              category: [],
              price: [],
              brand: [],
              colors: [],
              location: '',
              industry: [],
              work_type: [],
            });
            setcategorySelectedItem([]);
            setpriceSelectedItem([]);
            setbrandSelectedItem([]);
            setcolorSelectedItem([]);
            setIndustrySelectedItem([]);
            setWorktypeSelectedItem([]);
          }}
          style={{
            marginVertical: 10,
            backgroundColor: Color.white,
            borderRadius: 10,
          }}
          textColor="#000"
          labelStyle={{fontFamily: Manrope.Bold, fontSize: 16}}>
          Clear Filters
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            appyFilter();
          }}
          style={{
            marginVertical: 10,
            backgroundColor: Color.primary,
            borderRadius: 50,
            width: '50%',
          }}
          labelStyle={{fontFamily: Manrope.Bold, fontSize: 16}}>
          Apply
        </Button>
      </View>
    </View>
  );
};

export default VerticalTabView;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Color.black,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Color.cloudyGrey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Color.black,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginTop: 10,
  },
});
