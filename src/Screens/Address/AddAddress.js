import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Manrope } from '../../Global/FontFamily';
import { StackActions, useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Media } from '../../Global/Media';
import { CheckboxData, RadioData } from '../../Components/RadioButton';
import { useSelector } from 'react-redux';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';

const AddAddress = ({ route }) => {
  const navigation = useNavigation();
  const [itemData] = useState(route.params.item);
  const [CheckOut] = useState(route.params.CheckOut);
  const [status] = useState(route.params.status);
  const [username, setUsername] = useState(itemData?.name);
  const [phone, setphone] = useState(itemData?.phone);
  const [houseAddr, setHouseAddr] = useState(itemData?.address_line1);
  const [landAddr, setLandAddr] = useState(itemData?.address_line1);
  const [pincode, setPincode] = useState(itemData?.pincode);
  const [landmark, setLandmark] = useState(itemData?.landmark);
  const [selectedAddItem, setSelectedAddItem] = useState('Home');
  const countryCode = useSelector(state => state.UserReducer.country);
  const [selectType, setSelectType] = useState('State');
  const [selectState, setSelectState] = useState({});
  const [selectCity, setSelectCity] = useState({});
  const [selectAddressType, setSelectAddressType] = useState({});
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(itemData?.is_default);
  const userData = useSelector(state => state.UserReducer.userData);
  var { token } = userData;
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [stateloadMore, setStateLoadMore] = useState(false);
  const [statePage, setStatePage] = useState(1);
  const [stateendReached, setStateEndReached] = useState(false);
  const [cityloadMore, setCityLoadMore] = useState(false);
  const [cityPage, setCityPage] = useState(1);
  const [cityendReached, setCityEndReached] = useState(false);

  async function addAddressClick() {
    try {
      if (
        username != '' &&
        phone != '' &&
        houseAddr != '' &&
        landAddr != '' &&
        pincode != '' &&
        selectedAddItem != ''
      ) {
        var data = {
          name: username,
          phone: phone,
          address_line1: houseAddr,
          address_line2: landAddr,
          city_id: selectCity?.city_id,
          state_id: selectState?.state_id,
          country: countryCode?.country,
          pincode: pincode,
          landmark: landmark,
          address_type: selectAddressType?.name,
          is_default: defaultAddress == true ? 1 : 0,
        };
        const add_address = await fetchData.add_address(data, token);
        console.log('add_address', add_address);
        if (add_address?.status == true) {
          navigation.dispatch(
            StackActions.replace('OrderConfirmation', { CheckOut }),
          );
          common_fn.showToast(add_address?.message);
        } else {
          common_fn.showToast(add_address?.message);
        }
      } else {
        common_fn.showToast('Please enter mandatory fields');
      }
    } catch (error) {
      console.log('catch in addAddress_Click ', error);
    }
  }

  async function updateAddressClick() {
    try {
      if (
        username != '' &&
        phone != '' &&
        houseAddr != '' &&
        landAddr != '' &&
        pincode != '' &&
        selectedAddItem != ''
      ) {
        var data = {
          name: username,
          phone: phone,
          address_line1: houseAddr,
          address_line2: landAddr,
          city_id: selectCity?.city_id,
          state_id: selectState?.state_id,
          country: countryCode?.country,
          pincode: pincode,
          landmark: landmark,
          address_type: selectAddressType?.name,
          is_default: defaultAddress == true ? 1 : 0,
        };
        var param = itemData?.id;
        const update_address = await fetchData.update_address(
          param,
          data,
          token,
        );
        console.log('update_address', update_address);
        if (update_address?.status == true) {
          navigation.goBack();
          common_fn.showToast(update_address?.message);
        } else {
          common_fn.showToast(update_address?.message);
        }
      } else {
        common_fn.showToast('Please enter mandatory fields');
      }
    } catch (error) {
      console.log('catch in addAddress_Click ', error);
    }
  }

  function sale_toggleBottomView(type) {
    try {
      setSelectType(type);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }

  useEffect(() => {
    if (itemData?.address_type) {
      setSelectAddressType({ name: itemData.address_type });
    }
    if (itemData?.city) {
      setSelectCity({ city_id: itemData?.city_id, city: itemData.city });
    }
    if (itemData?.state) {
      setSelectState({ state_id: itemData?.state_id, state: itemData.state });
    }
  }, [itemData]);

  const [addressType, setAddressType] = useState([
    {
      id: 1,
      name: 'Home',
      icon: '',
    },
    {
      id: 2,
      name: 'Office',
      icon: '',
    },
    {
      id: 3,
      name: 'Shop',
      icon: '',
    },
    {
      id: 4,
      name: 'Other',
      icon: '',
    },
  ]);

  useEffect(() => {
    getData();
    getCityData();
  }, [token, selectState]);

  const getData = async () => {
    try {
      const getState = await fetchData.get_state_data(``, token);
      setStateData(getState?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getCityData = async () => {
    try {
      var data = `state_id=${selectState?.state_id}`;
      const getCity = await fetchData.get_state_data(data, token);
      setCityData(getCity?.data[0]?.cities);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMoreStateData = async () => {
    if (stateloadMore || stateendReached) {
      return;
    }
    setStateLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = 'page=' + nextPage;
      const response = await fetchData.get_state_data(data, token);
      if (response?.data.length > 0) {
        setStatePage(nextPage);
        const updatedData = [...stateData, ...response?.data];
        setStateData(updatedData);
      } else {
        setStateEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setStateLoadMore(false);
    }
  };

  const loadMoreCityData = async () => {
    if (cityloadMore || cityendReached) {
      return;
    }
    setCityLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = `state_id=${selectState?.state_id}&page=${nextPage}`;
      const response = await fetchData.get_state_data(data, token);
      if (response?.data.length > 0) {
        setCityPage(nextPage);
        const updatedData = [...cityData, ...response?.data];
        setCityData(updatedData);
      } else {
        setCityEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setCityLoadMore(false);
    }
  };

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={() => setSaleBottomSheetVisible(false)}
            onBackdropPress={() => setSaleBottomSheetVisible(false)}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 350,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Manrope.Medium,
                  }}>
                  Select {selectType}
                </Text>
                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: Color.primary, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView style={{ flex: 1 }}>
                  {selectType == 'State' ? (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <FlatList
                        data={stateData}
                        keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              key={item + index}
                              onPress={() => {
                                setSelectState(item);
                                setSaleBottomSheetVisible(false);
                              }}
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                margin: 5,
                                backgroundColor:
                                  selectState?.state === item.state
                                    ? Color.primary
                                    : '#f3f3f3',
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color:
                                      selectState?.state === item.state
                                        ? Color.white
                                        : Color.black,
                                    fontFamily: Manrope.Medium,
                                  }}>
                                  {item.state}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                        onEndReached={() => {
                          loadMoreStateData();
                        }}
                        onEndReachedThreshold={3}
                      />
                    </View>) :
                    null}
                  {selectType == 'City' ? (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <FlatList
                        data={cityData}
                        keyExtractor={(item, index) => item + index}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              key={item + index}
                              onPress={() => {
                                setSelectCity(item);
                                setSaleBottomSheetVisible(false);
                              }}
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                margin: 5,
                                backgroundColor:
                                  selectCity?.city === item.city
                                    ? Color.primary
                                    : '#f3f3f3',
                              }}>
                              <View
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color:
                                      selectCity?.city === item.city
                                        ? Color.white
                                        : Color.black,
                                    fontFamily: Manrope.Medium,
                                  }}>
                                  {item.city}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                        onEndReached={() => {
                          loadMoreCityData();
                        }}
                        onEndReachedThreshold={3}
                      />
                    </View>)
                    : null}
                </ScrollView>
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.Bold,
            }}>
            Contact Details
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
              }}>
              Full Name *
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter Your Name"
                placeholderTextColor={Color.cloudyGrey}
                value={username}
                onChangeText={value => {
                  setUsername(value);
                }}
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                alignItems: 'center',
                fontSize: 14,
                color: Color.lightBlack,
                marginBottom: 10,
                fontFamily: Manrope.Medium,
              }}>
              Mobile Number *
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter Your Phone Number"
                placeholderTextColor={Color.cloudyGrey}
                value={phone}
                onChangeText={value => {
                  setphone(value);
                }}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          {/* <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
              }}>
              Alternate Phone Number
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter Your Alternate Phone Number"
                placeholderTextColor={Color.cloudyGrey}
                value={alterphone}
                onChangeText={value => {
                  setAlterPhone(value);
                }}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
          </View> */}
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
              }}>
              House No / Building Name *
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter House No, Building Name (Required)"
                placeholderTextColor={Color.cloudyGrey}
                value={houseAddr}
                onChangeText={value => {
                  setHouseAddr(value);
                }}
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
              }}>
              Street Name / Area / Colony *
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter Street Name / Area / Colony"
                placeholderTextColor={Color.cloudyGrey}
                value={landAddr}
                onChangeText={value => {
                  setLandAddr(value);
                }}
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ width: '45%', marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                }}>
                Country *
              </Text>
              <View style={styles.NumberBoxConatiner}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: countryCode?.country_image }}
                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.lightBlack,
                      fontFamily: Manrope.SemiBold,
                      marginHorizontal: 10,
                    }}>
                    {countryCode?.country}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: '45%', marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                }}>
                State *
              </Text>
              <TouchableOpacity
                onPress={() => sale_toggleBottomView('State')}
                style={styles.NumberBoxConatiner}>
                <Text
                  style={{
                    fontFamily: Manrope.SemiBold,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                  }}>
                  {selectState?.state != ''
                    ? selectState?.state
                    : 'Select State'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ width: '45%', marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                }}>
                City *
              </Text>
              <TouchableOpacity
                onPress={() => sale_toggleBottomView('City')}
                style={styles.NumberBoxConatiner}>
                <Text
                  style={{
                    fontFamily: Manrope.SemiBold,
                    fontSize: 14,
                    color: Color.cloudyGrey,
                  }}>
                  {selectCity?.city != '' ? selectCity?.city : 'Select City'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '45%', marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 10,
                  color: Color.lightBlack,
                  fontFamily: Manrope.Medium,
                }}>
                Pincode *
              </Text>
              <View style={styles.NumberBoxConatiner}>
                <TextInput
                  style={styles.numberTextBox}
                  placeholder="Enter Pincode"
                  placeholderTextColor={Color.cloudyGrey}
                  value={pincode?.toString()}
                  onChangeText={value => {
                    setPincode(value);
                  }}
                  maxLength={6}
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
              }}>
              Landmark (Optional)
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                style={styles.numberTextBox}
                placeholder="Enter Landmark "
                placeholderTextColor={Color.cloudyGrey}
                value={landmark}
                onChangeText={value => {
                  setLandmark(value);
                }}
                keyboardType="name-phone-pad"
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.lightBlack,
                fontFamily: Manrope.Medium,
                marginBottom: 10,
              }}>
              Type of address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {addressType?.map((option, index) => {
                return (
                  <RadioData
                    key={index}
                    label={option.name}
                    checked={selectAddressType?.name == option.name}
                    onPress={() => {
                      setSelectAddressType(option);
                    }}
                  />
                );
              })}
            </View>
          </View>

          <CheckboxData
            label={'Mark As Default Address'}
            checked={defaultAddress}
            onPress={() => {
              setDefaultAddress(!defaultAddress);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              status == 'ADD' ? addAddressClick() : updateAddressClick();
            }}
            style={{
              height: 50,
              backgroundColor: Color.primary,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.white,
                fontFamily: Manrope.Medium,
              }}>
              {status == 'ADD' ? 'Add Address' : 'Update'}
            </Text>
          </TouchableOpacity>

          {sale_BottomSheetmenu()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  NumberBoxConatiner: {
    paddingHorizontal: 10,
    backgroundColor: '#F0F4F7',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    // borderColor: Color.softGrey,
    // borderWidth: 1,
    borderRightColor: 5,
  },
  numberCountryCode: {
    justifyContent: 'center',
    color: Color.black,
    fontSize: 14,
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    color: Color.black,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: Manrope.Medium,
  },
});

export default AddAddress;
