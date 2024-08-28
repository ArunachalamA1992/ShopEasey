import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import Color from '../../Global/Color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Media} from '../../Global/Media';
import {Manrope} from '../../Global/FontFamily';
import Clipboard from '@react-native-clipboard/clipboard';
import common_fn from '../../Config/common_fn';
import {Button} from 'react-native-paper';

const {width} = Dimensions.get('window');

const MyRewards = () => {
  const [rewardsModal, setRewardsModal] = useState({visible: false, data: {}});
  const [bannerData, setBannerData] = useState([
    {
      id: 1,
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
    {
      id: 2,
      ban_name: 'Women',
      ban_image: Media.banner_two,
    },
    {
      id: 3,
      ban_name: 'Kid’s Wear',
      ban_image: Media.banner_three,
    },
    {
      id: 4,
      ban_name: 'Men',
      ban_image: Media.banner_four,
    },
    {
      id: 5,
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
  ]);

  const [rewardsData, setRewardsData] = useState([
    {
      id: 1,
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-25T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 2,
      ban_name: 'Women',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-23T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 3,
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-23T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 4,
      ban_name: 'Men',
      ban_image: require('../../assets/images/second.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-24T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
    {
      id: 5,
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
      created_at: '2024-05-01T08:00:00Z',
      expired_at: '2024-07-22T13:04:37.163Z',
      coupon_code: 'TestCode',
      coupon_name: 'Test',
    },
  ]);

  const groupRewardsData = () => {
    const groupRewards = {
      ongoing: [],
      missed: [],
    };

    const currentDate = new Date();

    rewardsData.forEach(reward => {
      const expiredDate = new Date(reward.expired_at);
      if (currentDate <= expiredDate) {
        groupRewards.ongoing.push(reward);
      } else {
        groupRewards.missed.push(reward);
      }
    });

    return groupRewards;
  };
  const groupRewards = groupRewardsData();

  const copyToClipboard = data => {
    Clipboard.setString(data?.coupon_code);
    common_fn.showToast('The code has been copied to the clipboard.');
    setRewardsModal({visible: false, data: {}});
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: 180,
            justifyContent: 'center',
            padding: 10,
            backgroundColor: Color.white,
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <SwiperFlatList
            autoplay
            autoplayDelay={1}
            autoplayLoop
            index={1}
            showPagination
            data={bannerData}
            paginationActiveColor={Color.primary}
            paginationStyleItem={{
              width: 30,
              height: 3,
              marginTop: 10,
              marginHorizontal: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={({item}) => (
              <Image
                source={{uri: item.ban_image}}
                style={{
                  width: width,
                  height: 'auto',
                  borderRadius: 5,
                  resizeMode: 'cover',
                  marginHorizontal: 5,
                }}
              />
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            marginTop: 10,
            padding: 10,
          }}>
          <FlatList
            data={[
              {
                category: 'Ongoing Perks Just for You!',
                data: groupRewards['ongoing'],
              },
              {category: 'Rewards You’ve Missed', data: groupRewards['missed']},
            ]}
            keyExtractor={(item, index) => item.category}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  {item.data.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 18,
                          color: Color.lightBlack,
                          fontFamily: Manrope.Bold,
                          marginVertical: 5,
                        }}>
                        {item.category}
                      </Text>
                    </View>
                  )}
                  {item.data.map((single_reward, single_index) => (
                    <TouchableOpacity
                      key={single_index}
                      style={{
                        height: 150,
                        backgroundColor: Color.white,
                        opacity:
                          item?.category == 'Rewards You’ve Missed' ? 0.5 : 1,
                      }}
                      onPress={() => {
                        item?.category == 'Rewards You’ve Missed'
                          ? setRewardsModal({
                              visible: false,
                              data: {},
                            })
                          : setRewardsModal({
                              visible: true,
                              data: single_reward,
                            });
                      }}>
                      <Image
                        source={single_reward.ban_image}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Modal visible={rewardsModal.visible} animationType="slide" transparent>
        <Pressable
          onPress={() => {
            setRewardsModal({visible: false, data: {}});
          }}
          style={{flex: 1, backgroundColor: Color.transparantBlack}}
        />
        <View
          style={{
            backgroundColor: Color.white,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingVertical: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: Color.black,
                marginLeft: 5,
                textTransform: 'capitalize',
                fontFamily: Manrope.Bold,
              }}>
              coupon name :
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                marginLeft: 5,
                textTransform: 'capitalize',
                fontFamily: Manrope.Bold,
              }}>
              {rewardsModal?.data?.coupon_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: Color.black,
                marginLeft: 5,
                textTransform: 'capitalize',
                fontFamily: Manrope.Bold,
              }}>
              coupon Code :
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                marginLeft: 5,
                textTransform: 'capitalize',
                fontFamily: Manrope.Bold,
              }}>
              {' '}
              {rewardsModal?.data?.coupon_code}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              copyToClipboard(rewardsModal?.data);
            }}
            style={{
              marginVertical: 10,
              backgroundColor: Color.primary,
              borderRadius: 10,
              width: '100%',
            }}
            labelStyle={{fontFamily: Manrope.Bold, fontSize: 16}}>
            Copy Code
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default MyRewards;
