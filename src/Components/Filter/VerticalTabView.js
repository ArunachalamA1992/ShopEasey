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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CheckboxData, RadioData} from '../RadioButton';
import common_fn from '../../Config/common_fn';

const TabContent = ({
  item,
  categorySelectedItem,
  setcategorySelectedItem,
  priceSelectedItem,
  handlePricePress,
  brandSelectedItem,
  handlebrandPress,
  colorSelectedItem,
  sizeSelectedItem,
  handleDiscountPress,
  discountSelectedItem,
  handleColorPress,
  handlesizePress,
  countryCode,
  maxRating,
  defaultRating,
  setDefaultRating,
}) => {
  if (item?.category) {
    return (
      <>
        {item?.category?.map((option, index) => {
          return (
            <RadioData
              key={index}
              label={option.category_name}
              checked={categorySelectedItem.id == option.id}
              onPress={() => setcategorySelectedItem(option)}
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
              label={item.color_group_name}
              color_code={item?.color_group_name}
              checked={colorSelectedItem.includes(item.id)}
              onPress={() => handleColorPress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.discounts) {
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
          Select Discounts
        </Text>
        {item?.discounts?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleDiscountPress(item?.id);
              }}
              key={index}
              style={{
                borderWidth: 1,
                borderColor: discountSelectedItem.includes(item.id)
                  ? Color.primary
                  : Color.lightgrey,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginVertical: 10,
                }}>
                {item?.discounts}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } else if (item?.size) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        {item?.size?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                borderWidth: 1,
                borderColor: sizeSelectedItem.includes(item.id)
                  ? Color.primary
                  : Color.lightgrey,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
              }}
              onPress={() => handlesizePress(item.id)}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginVertical: 10,
                }}>
                {item?.size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } else if (item?.rating) {
    return (
      <View
        style={{
          flex: 1,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Color.black,
            fontFamily: Manrope.Bold,
            marginVertical: 10,
          }}>
          Rating
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginVertical: 10,
          }}>
          {maxRating.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setDefaultRating(item.rating);
                }}
                activeOpacity={0.7}
                key={index}
                style={{marginRight: 5}}>
                <FontAwesome
                  name={item?.rating <= defaultRating ? 'star' : 'star-o'}
                  size={30}
                  color={Color.sunShade}
                />
              </TouchableOpacity>
            );
          })}
        </View>
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
  const [searchdiscounts, setSearchdiscounts] = useState('');
  const [discountsSuggestion, setdiscountsSuggestion] = useState({
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

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
      experience: 'poor',
    },
    {
      id: 2,
      rating: 2,
      experience: 'Bad',
    },
    {
      id: 3,
      rating: 3,
      experience: 'Okay',
    },
    {
      id: 4,
      rating: 4,
      experience: 'Average',
    },
    {
      id: 5,
      rating: 5,
      experience: 'Good',
    },
  ]);
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
    discounts: [],
    size: [],
    rating: [],
  });

  const [sizeData, setsizeData] = useState([
    {
      id: 1,
      size: 'L',
    },
    {
      id: 2,
      size: 'M',
    },
    {
      id: 3,
      size: 'S',
    },
  ]);
  const [discountsData, setdiscountsData] = useState([
    {
      id: 1,
      discounts: '10% off or more',
    },
    {
      id: 2,
      discounts: '20% off or more',
    },
    {
      id: 3,
      discounts: '30% off or more',
    },
    {
      id: 4,
      discounts: '40% off or more',
    },
    {
      id: 5,
      discounts: '50% off or more',
    },
    {
      id: 6,
      discounts: '60% off or more',
    },
    {
      id: 7,
      discounts: '70% off or more',
    },
    {
      id: 8,
      discounts: '80% off or more',
    },
    {
      id: 9,
      discounts: '90% off or more',
    },
    {
      id: 10,
      discounts: '100% off or more',
    },
  ]);

  useEffect(() => {
    getApiData();
  }, [categoriesData]);

  const getApiData = async () => {
    try {
      // Category
      const list_categories = await fetchData.categories(``, token);
      setCategoriesData(list_categories?.data);
      //colors
      const list_colors = await fetchData.get_colors(``, token);
      setcolorData(list_colors?.data);
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
      discounts: discountsData,
    },
    {
      size: sizeData,
    },
    {
      rating: maxRating,
    },
  ];
  const [categorySelectedItem, setcategorySelectedItem] = useState({});
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
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    } else {
      setpriceSelectedItem([...priceSelectedItem, itemId]);
      const selectedItem = priceData.find(single => single.price_id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: [...filterSelectedItem?.price, selectedItem],
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
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
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    } else {
      setbrandSelectedItem([...brandSelectedItem, itemId]);
      const selectedItem = brandData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: [...filterSelectedItem?.brand, selectedItem],
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
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
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    } else {
      setcolorSelectedItem([...colorSelectedItem, itemId]);
      const selectedItem = colorData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: [...filterSelectedItem?.colors, selectedItem],
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    }
  };

  const [sizeSelectedItem, setsizeSelectedItem] = useState([]);
  const handlesizePress = itemId => {
    if (sizeSelectedItem.includes(itemId)) {
      setsizeSelectedItem(
        sizeSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size?.filter(single => single.id !== itemId),
        rating: filterSelectedItem?.rating,
      });
    } else {
      setsizeSelectedItem([...sizeSelectedItem, itemId]);
      const selectedItem = sizeData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: [...filterSelectedItem?.size, selectedItem],
        rating: filterSelectedItem?.rating,
      });
    }
  };

  const [discountSelectedItem, setdiscountSelectedItem] = useState([]);
  const handleDiscountPress = itemId => {
    if (discountSelectedItem.includes(itemId)) {
      setdiscountSelectedItem(
        discountSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts?.filter(
          single => single.id !== itemId,
        ),
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    } else {
      setdiscountSelectedItem([...discountSelectedItem, itemId]);
      const selectedItem = discountsData.find(single => single.id === itemId);
      setFilterSelectedItem({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: [...filterSelectedItem?.discounts, selectedItem],
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
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
    const params = new URLSearchParams();
    const payload = {
      page: 1,
      size: filterSelectedItem?.size
        .filter(item => item.size)
        .map(item => item.size)
        .join(','),
      color_group: filterSelectedItem?.colors
        .filter(item => item.id)
        .map(item => item.id)
        .join(','),
    };
    for (const key in payload) {
      if (payload[key] != null && payload[key]?.length > 0) {
        params.append(key, payload[key]);
      }
    }

    const queryString = params.toString();
    const query = queryString.replace('%20', ' ');
    return query;
  };

  const appyFilter = async () => {
    try {
      if (categorySelectedItem?.id == undefined) {
        common_fn.showToast('Please Select the Category');
      } else {
        var data = dataPayload();
        navigation.push('ProductList', {
          param: data,
          category_id: categorySelectedItem?.id,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setdiscountsSuggestion({
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
              setcategorySelectedItem={setcategorySelectedItem}
              priceSelectedItem={priceSelectedItem}
              handlePricePress={handlePricePress}
              brandSelectedItem={brandSelectedItem}
              handlebrandPress={handlebrandPress}
              colorSelectedItem={colorSelectedItem}
              handleColorPress={handleColorPress}
              sizeSelectedItem={sizeSelectedItem}
              handleDiscountPress={handleDiscountPress}
              handlesizePress={handlesizePress}
              discountSelectedItem={discountSelectedItem}
              discountsData={discountsData}
              fetchSuggestions={fetchSuggestions}
              setdiscountsSuggestion={setdiscountsSuggestion}
              discountsSuggestion={discountsSuggestion}
              setSearchdiscounts={setSearchdiscounts}
              searchdiscounts={searchdiscounts}
              countryCode={countryCode}
              maxRating={maxRating}
              defaultRating={defaultRating}
              setDefaultRating={setDefaultRating}
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
              discounts: '',
              size: [],
              rating: [],
            });
            setcategorySelectedItem([]);
            setpriceSelectedItem([]);
            setbrandSelectedItem([]);
            setcolorSelectedItem([]);
            setsizeSelectedItem([]);
            setdiscountSelectedItem([]);
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