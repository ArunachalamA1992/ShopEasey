import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Color from '../Global/Color';
import {Manrope} from '../Global/FontFamily';
import LinearGradient from 'react-native-linear-gradient';

const ItemCard = props => {
  const {item, navigation} = props;
  var discount = parseInt(
    ((item?.price - item?.discountPrice) / item?.price) * 100,
  );
  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => {
        navigation.replace('ProductDetails', {item});
      }}>
      <ImageBackground
        style={styles.Productimage}
        source={{uri: item.images[0].image}}
        resizeMode="cover"
        onError={error => console.log('Image loading error:', error)}>
        <View style={styles.imageTopView}>
          <View
            style={{
              backgroundColor: Color.lightYellow,
              borderRadius: 5,
              paddingHorizontal: 10,
              padding: 5,
            }}>
            <Text style={styles.offerText}>{discount}% off</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF80',
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <AntDesign name="hearto" size={16} color={Color.black} />
          </TouchableOpacity>
        </View>
        <LinearGradient
          style={styles.locationView}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1D1D1D78', '#1D1D1D4F', '#1D1D1D08']}>
          <Octicons name="location" size={15} color={Color.white} />
          <Text style={styles.locationText}>{item.location}</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.contentView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.categoryName}>{item.type}</Text>
          <Text
            style={{
              color: Color.red,
              fontSize: 14,
              fontFamily: Manrope.Medium,
            }}>
            Sold 0/1
          </Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDiscountPrice}>
          ${item.discountPrice}{' '}
          <Text style={styles.productPrice}>${item.price}</Text>
        </Text>
        <View style={styles.productRatingView}>
          <FontAwesome name="star" size={15} color={Color.lightYellow} />
          <Text
            style={{
              fontFamily: Manrope.Bold,
              fontSize: 14,
              color: Color.black,
            }}>
            {item.rating}
            <Text
              style={{
                fontFamily: Manrope.Bold,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              {' '}
              ({item?.shop?.reviews} Reviews)
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: Color.white,
  },
  product: {
    margin: 5,
    flex: 1,
  },
  Productimage: {
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
    resizeMode: 'contain',
  },
  imageTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  offerText: {
    fontFamily: Manrope.Bold,
    fontSize: 12,
    color: Color.black,
    textAlign: 'center',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  locationText: {
    color: Color.white,
    fontSize: 12,
    fontFamily: Manrope.Bold,
    padding: 5,
  },
  contentView: {
    borderLeftWidth: 1,
    borderLeftColor: Color.lightgrey,
    borderRightWidth: 1,
    borderRightColor: Color.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  categoryName: {
    color: '#777777',
    fontSize: 14,
    flex: 1,
    fontFamily: Manrope.Bold,
  },
  productName: {
    color: Color.lightBlack,
    fontSize: 14,
    fontFamily: Manrope.Bold,
  },
  productDiscountPrice: {
    color: Color.black,
    fontFamily: Manrope.Bold,
    fontSize: 18,
  },
  productPrice: {
    color: Color.smokeyGrey,
    fontFamily: Manrope.Medium,
    fontSize: 14,
    paddingLeft: 25,
    textDecorationLine: 'line-through',
  },
  productRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
