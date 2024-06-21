import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Manrope} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {BottomSheet} from 'react-native-btr';
import {Media} from '../../Global/Media';
import {CheckboxData, RadioData} from '../../Components/RadioButton';

const AddAddress = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [phone, setphone] = useState('');
  const [alterphone, setAlterPhone] = useState('');
  const [houseAddr, setHouseAddr] = useState('');
  const [landAddr, setLandAddr] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [selectedAddItem, setSelectedAddItem] = useState('Home');

  const [selectType, setSelectType] = useState('State');
  const [selectname, setSelectName] = useState('Tamil Nadu');
  const [cityName, setCityName] = useState('Chennai');
  const [selectImage, setSelectImage] = useState(Media.india_flag);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [selectAddressType, setSelectAddressType] = useState({});
  const [defaultAddress, setDefaultAddress] = useState(false);

  const [stateData, setStateData] = useState([
    {
      id: '0',
      state_name: 'Tamil Nadu',
      state_sign: 'Indian Ruperr (₹)',
    },
    {
      id: '1',
      state_name: 'Andhra Pradesh',
      state_sign: 'Singapore Dollar (SGD)',
    },
    {
      id: '2',
      state_name: 'Kerala',
      state_sign: 'Malaysian Ringgit (MYR)',
    },
    {
      id: '3',
      state_name: 'Karnataka',
      state_sign: 'Malaysian Ringgit (MYR)',
    },
    {
      id: '4',
      state_name: 'Jammu & Kashmir',
      state_sign: 'Malaysian Ringgit (MYR)',
    },
    {
      id: '5',
      state_name: 'Maharashtra',
      state_sign: 'Malaysian Ringgit (MYR)',
    },
  ]);

  const [cityData, setCityData] = useState([
    {
      id: '0',
      city_name: 'Chennai',
    },
    {
      id: '1',
      city_name: 'Coimbatore',
    },
    {
      id: '2',
      city_name: 'Salem',
    },
    {
      id: '3',
      city_name: 'Tiruchy',
    },
    {
      id: '4',
      city_name: 'Madurai',
    },
    {
      id: '5',
      city_name: 'Erode',
    },
    {
      id: '6',
      city_name: 'Thiruvannamalai',
    },
  ]);

  function addAddressClick() {
    try {
      if (
        username != '' &&
        phone != '' &&
        houseAddr != '' &&
        landAddr != '' &&
        pincode != '' &&
        selectedAddItem != ''
      ) {
        console.log(
          'Username ======= :' +
            username +
            '\n' +
            'phone =========== ' +
            phone +
            '\n' +
            'alter phone ========' +
            alterphone +
            '\n' +
            'houseAddr ======= ' +
            houseAddr +
            '\n' +
            'landAddr ======== ' +
            landAddr +
            '\n' +
            'city ========= ' +
            cityName +
            '\n' +
            'state ========== ' +
            selectname +
            '\n' +
            'pincode ========== ' +
            pincode +
            '\n' +
            'selectedAddItem ========== ' +
            selectedAddItem,
        );
        ToastAndroid.show(
          'Your address is updated successfully',
          ToastAndroid.SHORT,
        );
        navigation.navigate('SelectAddress');
      } else {
        ToastAndroid.show('Please enter mandatory fields', ToastAndroid.SHORT);
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

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
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
                    iconstyle={{color: Color.primary, marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <ScrollView style={{flex: 1}}>
                  {selectType == 'State' ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                      {stateData.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={item + index}
                            onPress={() => selectedState(item)}
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                              margin: 5,
                              backgroundColor:
                                selectname === item.state_name
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
                                    selectname === item.state_name
                                      ? Color.white
                                      : Color.black,
                                  fontFamily: Manrope.Medium,
                                }}>
                                {item.state_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ) : null}
                  {selectType == 'City' ? (
                    <View style={{width: '100%', alignItems: 'center'}}>
                      {cityData.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={item + index}
                            onPress={() => selectedCity(item)}
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                              margin: 5,
                              backgroundColor:
                                cityName === item.city_name
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
                                    cityName === item.city_name
                                      ? Color.white
                                      : Color.black,
                                  fontFamily: Manrope.Medium,
                                }}>
                                {item.city_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ) : null}
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

  function selectedState(item, index) {
    try {
      setSelectName(item.state_name);
      // setSelectImage(item.flag_image);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function selectedCity(item, index) {
    try {
      setCityName(item.city_name);
      // setSelectImage(item.flag_image);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

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

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
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
            <View style={{width: '45%', marginVertical: 10}}>
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
                    source={{uri: Media.india_flag}}
                    style={{width: 30, height: 30, resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.lightBlack,
                      fontFamily: Manrope.SemiBold,
                      marginHorizontal: 10,
                    }}>
                    India
                  </Text>
                </View>
              </View>
            </View>
            <View style={{width: '45%', marginVertical: 10}}>
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
                <Text>{selectname}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '45%', marginVertical: 10}}>
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
                <Text>{cityName}</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '45%', marginVertical: 10}}>
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
                  value={pincode}
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
                keyboardType="number-pad"
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
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
                    checked={selectAddressType?.id == option.id}
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
            checked={!defaultAddress}
            onPress={() => {
              setDefaultAddress(!defaultAddress);
            }}
          />
          <TouchableOpacity
            onPress={() => addAddressClick()}
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
              Add Address
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
