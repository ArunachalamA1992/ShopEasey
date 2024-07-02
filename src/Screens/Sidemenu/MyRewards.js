//import liraries
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
  LogBox,
  StatusBar,
  FlatList,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import Color from '../../Global/Color';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Media} from '../../Global/Media';
import {Manrope} from '../../Global/FontFamily';

const {width} = Dimensions.get('window');

// create a component
const MyRewards = () => {
  const [bannerData, setBannerData] = useState([
    {
      id: '0',
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
    {
      id: '1',
      ban_name: 'Women',
      ban_image: Media.banner_two,
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: Media.banner_three,
    },
    {
      id: '3',
      ban_name: 'Men',
      ban_image: Media.banner_four,
    },
    {
      id: '4',
      ban_name: 'Men',
      ban_image: Media.banner_one,
    },
  ]);

  const [rewardsData, setRewardsData] = useState([
    {
      id: '0',
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
    },
    {
      id: '1',
      ban_name: 'Women',
      ban_image: require('../../assets/images/first.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/first.png'),
    },
    {
      id: '3',
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
    },
    {
      id: '4',
      ban_name: 'Men',
      ban_image: require('../../assets/images/first.png'),
    },
  ]);

  const [missingrewardsData, setMissingRewardsData] = useState([
    {
      id: '0',
      ban_name: 'Men',
      ban_image: require('../../assets/images/second.png'),
    },
    {
      id: '1',
      ban_name: 'Women',
      ban_image: require('../../assets/images/second.png'),
    },
    {
      id: '2',
      ban_name: 'Kid’s Wear',
      ban_image: require('../../assets/images/second.png'),
    },
  ]);

  // const [rewardsData, setRewardsData] = useState(
  //     [
  //         {
  //             id: '0',
  //             ban_name: 'reward_one',
  //             ban_image: require('../../assets/images/first.png'),
  //         },
  //         {
  //             id: '1',
  //             ban_name: 'reward_two',
  //             ban_image: require('../../assets/images/second.png'),
  //         },
  //         {
  //             id: '2',
  //             ban_name: 'reward_three',
  //             ban_image: require('../../assets/images/first.png'),
  //         },
  //         {
  //             id: '3',
  //             ban_name: 'reward_four',
  //             ban_image: require('../../assets/images/second.png'),
  //         },
  //         {
  //             id: '4',
  //             ban_name: 'reward_five',
  //             ban_image: require('../../assets/images/second.png'),
  //         },
  //     ]
  // )

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 30,
          marginVertical: 0,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
          backgroundColor: Color.white,
        }}>
        <View
          style={{
            width: '100%',
            height: 180,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
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
              marginTop: 30,
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
      </View>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 10,
            paddingVertical: 10,
            elevation: 2,
          }}>
          <Text
            style={{
              width: '95%',
              textAlign: 'justify',
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
            }}>
            Ongoing Perks Just for You!
          </Text>

          <View
            style={{
              width: '100%',
              marginVertical: 10,
              backgroundColor: Color.white,
            }}>
            <FlatList
              data={rewardsData}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 390,
                      height: 135,
                      margin: 10,
                      alignItems: 'center',
                      backgroundColor: Color.white,
                    }}>
                    <Image
                      source={item.ban_image}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
              style={{width: '100%'}}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 10,
            paddingVertical: 10,
            elevation: 2,
          }}>
          <Text
            style={{
              width: '95%',
              textAlign: 'justify',
              fontSize: 16,
              color: Color.black,
              fontFamily: Manrope.SemiBold,
              letterSpacing: 0.5,
            }}>
            Rewards You’ve Missed
          </Text>

          <View
            style={{
              width: '100%',
              marginVertical: 10,
              backgroundColor: Color.white,
            }}>
            <FlatList
              data={missingrewardsData}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    disabled
                    style={{
                      width: 390,
                      height: 135,
                      margin: 10,
                      alignItems: 'center',
                      backgroundColor: Color.softGrey,
                    }}>
                    <Image
                      source={item.ban_image}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
              style={{width: '100%'}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
});

//make this component available to the app
export default MyRewards;
