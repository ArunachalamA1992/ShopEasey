import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import CustomRange from '../CustomRange';

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
  //price
  low,
  setLow,
  high,
  setHigh,
  min,
  setMin,
  max,
  setMax,
  handleValueChange,
}) => {
  if (item?.category) {
    return (
      <>
        {item?.category?.map((item, index) => {
          return (
            <>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginVertical: 10,
                }}>
                {item?.category_name}
              </Text>
              {item?.sub_categories?.map((option, index) => {
                return (
                  <RadioData
                    key={index}
                    label={option.sub_category_name}
                    checked={categorySelectedItem == option.id}
                    onPress={() => setcategorySelectedItem(option.id)}
                  />
                );
              })}
            </>
          );
        })}
      </>
    );
  } else if (item?.price) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        <CustomRange
          low={low}
          setLow={setLow}
          high={high}
          setHigh={setHigh}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          handleValueChange={handleValueChange}
        />
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
            <CheckboxData
              key={index}
              label={item.name}
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
          flex: 1,
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        {item?.colors?.map((item, index) => {
          return (
            <CheckboxData
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
  }
  // else if (item?.discounts) {
  //   return (
  //     <View
  //       style={{
  //         marginVertical: 10,
  //       }}>
  //       <Text
  //         style={{
  //           fontSize: 14,
  //           color: Color.black,
  //           fontFamily: Manrope.Bold,
  //           marginVertical: 10,
  //         }}>
  //         Select Discounts
  //       </Text>
  //       {item?.discounts?.map((item, index) => {
  //         return (
  //           <TouchableOpacity
  //             onPress={() => {
  //               handleDiscountPress(item?.id);
  //             }}
  //             key={index}
  //             style={{
  //               borderWidth: 1,
  //               borderColor: discountSelectedItem.includes(item.id)
  //                 ? Color.primary
  //                 : Color.lightgrey,
  //               borderRadius: 10,
  //               marginTop: 10,
  //               alignItems: 'center',
  //             }}>
  //             <Text
  //               style={{
  //                 fontSize: 14,
  //                 color: Color.black,
  //                 fontFamily: Manrope.Bold,
  //                 marginVertical: 10,
  //               }}>
  //               {item?.discounts}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // }
  else if (item?.size) {
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
                borderColor: sizeSelectedItem.includes(item.size)
                  ? Color.primary
                  : Color.lightgrey,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
              }}
              onPress={() => handlesizePress(item.size)}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.black,
                  fontFamily: Manrope.Bold,
                  marginVertical: 10,
                  textTransform: 'uppercase',
                }}>
                {item?.size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  // else if (item?.rating) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         marginVertical: 10,
  //       }}>
  //       <Text
  //         style={{
  //           fontSize: 14,
  //           color: Color.black,
  //           fontFamily: Manrope.Bold,
  //           marginVertical: 10,
  //         }}>
  //         Rating
  //       </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           flex: 1,
  //           justifyContent: 'space-between',
  //           flexWrap: 'wrap',
  //           marginVertical: 10,
  //         }}>
  //         {maxRating.map((item, index) => {
  //           return (
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setDefaultRating(item.rating);
  //               }}
  //               activeOpacity={0.7}
  //               key={index}
  //               style={{marginRight: 5}}>
  //               <FontAwesome
  //                 name={item?.rating <= defaultRating ? 'star' : 'star-o'}
  //                 size={30}
  //                 color={Color.sunShade}
  //               />
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </View>
  //     </View>
  //   );
  // }
};

const VerticalTabView = props => {
  var {navigation, category_id, setFilterVisible, param} = props;
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

  const queryToObject = query => {
    if (query != undefined) {
      const pairs = query?.split('&');
      const result = {};

      pairs?.forEach(pair => {
        const [key, value] = pair?.split('=');

        if (key === 'price') {
          const [minPrice, maxPrice] = value?.split(',');
          result.minPrice = parseInt(minPrice);
          result.maxPrice = parseInt(maxPrice);
        } else {
          result[key] = isNaN(value) ? value : parseInt(value);
        }
      });

      return result;
    }
  };

  const queryObject = queryToObject(param);

  const [low, setLow] = useState(queryObject?.minPrice || 1);
  const [high, setHigh] = useState(queryObject?.maxPrice || 100000);
  const [min, setMin] = useState(queryObject?.minPrice || 1);
  const [max, setMax] = useState(queryObject?.maxPrice || 100000);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const [search, setSearch] = useState('');
  const [searchdiscounts, setSearchdiscounts] = useState('');
  const [discountsSuggestion, setdiscountsSuggestion] = useState({
    data: [],
    visible: false,
  });
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [categoriesData, setCategoriesData] = useState([]);

  const [brandData, setbrandData] = useState([]);

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
    // discounts: [],
    size: [],
    // rating: [],
  });

  const [sizeData, setsizeData] = useState([
    {
      id: 1,
      size: 's',
    },
    {
      id: 2,
      size: 'm',
    },
    {
      id: 3,
      size: 'l',
    },
    {
      id: 4,
      size: 'xl',
    },
    {
      id: 5,
      size: 'xxl',
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
  }, []);

  const prevQueryObject = useRef();

  useEffect(() => {
    if (
      JSON.stringify(prevQueryObject.current) !== JSON.stringify(queryObject)
    ) {
      prevQueryObject.current = queryObject;

      if (queryObject?.brand_id) {
        let brandIds = [];

        if (Array.isArray(queryObject.brand_id)) {
          brandIds = queryObject.brand_id.map(Number);
        } else if (typeof queryObject.brand_id === 'number') {
          brandIds = [queryObject.brand_id];
        } else if (typeof queryObject.brand_id === 'string') {
          brandIds = queryObject.brand_id.split(',').map(Number);
        }
        brandIds.forEach(id => {
          handlebrandPress(id);
        });
      }

      if (queryObject?.color_group !== undefined) {
        let colorIds = [];

        if (Array.isArray(queryObject.color_group)) {
          colorIds = queryObject.color_group.map(Number);
        } else if (typeof queryObject.color_group === 'number') {
          colorIds = [queryObject.color_group];
        } else if (typeof queryObject.color_group === 'string') {
          colorIds = queryObject.color_group.split(',').map(Number);
        }
        colorIds.forEach(colorId => {
          handleColorPress(colorId);
        });
      }

      if (queryObject?.size) {
        let sizeIds = [];

        if (Array.isArray(queryObject.size)) {
          sizeIds = queryObject.size.map(size => size.toLowerCase());
        } else if (typeof queryObject.size === 'string') {
          sizeIds = queryObject.size.split(',').map(size => size.toLowerCase());
        }

        sizeIds.forEach(size => {
          handlesizePress(size);
        });
      }
    }
  }, [queryObject]);

  const getApiData = async () => {
    try {
      // Category
      const list_categories = await fetchData.categories(
        `?id=${category_id}`,
        token,
      );
      setCategoriesData(list_categories?.data);
      //colors
      const list_brand = await fetchData.get_brand(``, token);
      setbrandData(list_brand?.data);
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
    // {
    //   discounts: discountsData,
    // },
    {
      size: sizeData,
    },
    // {
    //   rating: maxRating,
    // },
  ];
  const [categorySelectedItem, setcategorySelectedItem] = useState(
    queryObject?.sub_category_id || 0,
  );
  // const [subSubCategorySelectedItem, setSubSubCategorySelectedItem] = useState(
  //   [],
  // );
  // const handleSubSubCategorySelectedItemPress = itemId => {
  //   if (subSubCategorySelectedItem.includes(itemId)) {
  //     setSubSubCategorySelectedItem(
  //       subSubCategorySelectedItem?.filter(single => single !== itemId),
  //     );
  //     setFilterSelectedItem(
  //       filterSelectedItem?.price?.filter(single => single.price_id !== itemId),
  //     );
  //   } else {
  //     setSubSubCategorySelectedItem([...subSubCategorySelectedItem, itemId]);
  //     const selectedItem = priceData.find(single => single.price_id === itemId);
  //     setFilterSelectedItem([...filterSelectedItem?.price, selectedItem]);
  //   }
  // };
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
      setbrandSelectedItem(prev => prev?.filter(single => single !== itemId));
      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: prev?.brand?.filter(single => single?.id !== itemId),
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      }));
    } else {
      setbrandSelectedItem(prev => [...prev, itemId]);
      const selectedItem = brandData?.find(single => single?.id === itemId);
      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: [...(prev?.brand || []), selectedItem],
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      }));
    }
  };

  const [colorSelectedItem, setcolorSelectedItem] = useState([]);

  const handleColorPress = itemId => {
    if (colorSelectedItem.includes(itemId)) {
      setcolorSelectedItem(prev => prev?.filter(single => single !== itemId));
      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: prev?.colors?.filter(single => single?.id !== itemId),
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      }));
    } else {
      setcolorSelectedItem(prev => [...prev, itemId]);
      const selectedItem = colorData?.find(single => single?.id === itemId);
      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: [...(prev?.colors || []), selectedItem],
        discounts: filterSelectedItem?.discounts,
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      }));
    }
  };

  const [sizeSelectedItem, setsizeSelectedItem] = useState([]);
  const handlesizePress = size => {
    if (sizeSelectedItem.includes(size)) {
      setsizeSelectedItem(prev => prev?.filter(single => single !== size));

      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: prev?.size?.filter(single => single?.size !== size),
        rating: filterSelectedItem?.rating,
      }));
    } else {
      setsizeSelectedItem(prev => [...prev, size]);
      const selectedItem = sizeData?.find(single => single?.size === size);
      setFilterSelectedItem(prev => ({
        category: filterSelectedItem?.category,
        price: filterSelectedItem?.price,
        brand: filterSelectedItem?.brand,
        colors: filterSelectedItem?.colors,
        discounts: filterSelectedItem?.discounts,
        size: [...(prev?.size || []), selectedItem],
        rating: filterSelectedItem?.rating,
      }));
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
          single => single?.id !== itemId,
        ),
        size: filterSelectedItem?.size,
        rating: filterSelectedItem?.rating,
      });
    } else {
      setdiscountSelectedItem([...discountSelectedItem, itemId]);
      const selectedItem = discountsData.find(single => single?.id === itemId);
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
    // 'Discount',
    'Size',
    // 'Rating',
  ];

  const dataPayload = () => {
    let params = '';
    const payload = {
      page: 1,
      size:
        filterSelectedItem?.size
          ?.filter(item => item?.size)
          ?.map(item => item?.size)
          ?.join(',') || '',
      color_group:
        filterSelectedItem?.colors
          ?.filter(item => item?.id)
          ?.map(item => item?.id)
          ?.join(',') || '',
      brand_id: brandSelectedItem?.join(','),
      sub_category_id: categorySelectedItem || '',
      price: low > 0 && high ? `${low},${high}` : '',
    };

    for (const key in payload) {
      if (payload[key] != null && payload[key] !== '') {
        // if (key === 'size' || key === 'color_group' || key === 'price') {
        params += `${key}=${payload[key]}&`;
        // } else {
        //   params += `${key}=${encodeURIComponent(payload[key])}&`;
        // }
      }
    }

    return params.slice(0, -1);
  };

  const applyFilter = async () => {
    try {
      const data = dataPayload();
      navigation.push('ProductList', {
        param: data,
        category_id: category_id,
      });
      setFilterVisible(false);
    } catch (error) {
      console.error('Error in applyFilter:', error);
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
                    fontSize: 14,
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
              //price
              low={low}
              setLow={setLow}
              high={high}
              setHigh={setHigh}
              min={min}
              setMin={setMin}
              max={max}
              setMax={setMax}
              handleValueChange={handleValueChange}
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
              size: [],
            });
            setcategorySelectedItem([]);
            setpriceSelectedItem([]);
            setbrandSelectedItem([]);
            setcolorSelectedItem([]);
            setsizeSelectedItem([]);
            setdiscountSelectedItem([]);
            setDefaultRating(0);
            setLow(1);
            setHigh(100000);
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
          disabled={low > high}
          onPress={() => {
            applyFilter();
          }}
          style={{
            marginVertical: 10,
            backgroundColor: low > high ? Color.lightgrey : Color.primary,
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
