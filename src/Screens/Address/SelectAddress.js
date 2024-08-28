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
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {Manrope} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import common_fn from '../../Config/common_fn';

const selectAddressess = () => {
  const navigation = useNavigation();
  const [selectAddress, setSelectAddress] = useState({});
  const [addressData, setAddressData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  useEffect(() => {
    getAddressData();
  }, []);

  useEffect(() => {
    if (addressData.length > 0) {
      const defaultAddress = addressData.find(item => item?.is_default === 1);
      setSelectAddress(defaultAddress);
    }
  }, [addressData]);

  const getAddressData = async () => {
    try {
      const getaddress = await fetchData.list_address(``, token);
      console.log('getaddress', getaddress);
      setAddressData(getaddress?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const defaultAddress = async () => {
    try {
      var data = {
        is_default: 1,
      };
      if (selectAddress?.id != undefined) {
        const updateAddress = await fetchData.update_address(
          selectAddress?.id,
          data,
          token,
        );
        if (updateAddress) {
          common_fn.showToast(updateAddress?.message);
        }
      } else {
        common_fn.showToast('please select the address to make default');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <FlatList
        data={addressData}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Color.lightgrey,
                padding: 10,
                marginTop: 10,
              }}>
              <Iconviewcomponent
                Icontag={'Octicons'}
                iconname={'location'}
                icon_size={24}
                iconstyle={{color: Color.primary, marginTop: 5}}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'justify',
                    color: Color.black,
                    fontFamily: Manrope.Bold,
                  }}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingVertical: 2,
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  {item?.phone}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 5,
                    color: Color.lightBlack,
                    fontFamily: Manrope.Medium,
                    letterSpacing: 0.5,
                  }}>
                  {item?.address_type}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'justify',
                    color: Color.cloudyGrey,
                    fontFamily: Manrope.Light,
                  }}>
                  {item.address_line1}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <TouchableOpacity onPress={() => setSelectAddress(item)}>
                  <Iconviewcomponent
                    Icontag={'Fontisto'}
                    iconname={
                      selectAddress?.id == item.id
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                    icon_size={20}
                    iconstyle={{color: Color.primary}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddAddress', {
              item: {},
              CheckOut: [],
              ids: [],
              status: 'ADD',
            })
          }
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.white,
            borderColor: Color.primary,
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Iconviewcomponent
            Icontag={'FontAwesome'}
            iconname={'plus'}
            icon_size={20}
            iconstyle={{color: Color.primary}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: Color.primary,
              fontFamily: Manrope.SemiBold,
              paddingHorizontal: 5,
            }}>
            Add New Address
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => defaultAddress()}
          style={{
            width: '100%',
            height: 50,
            backgroundColor:
              selectAddress?.id == undefined ? Color.lightgrey : Color.primary,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}
          disabled={selectAddress?.id == undefined}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: Color.white,
              fontFamily: Manrope.SemiBold,
            }}>
            Make as default
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default selectAddressess;
