import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../Global/Color';
import { Gilmer, Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';


const ProductList = () => {

    const navigation = useNavigation();

    const [selectedCategory, setSelectedCategory] = useState([]);
    const products = [
        {
            id: 1,
            name: 'Brand TShirt Yellow',
            image: require('../../assets/images/1.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 2,
            name: 'Brand TShirt Yellow',
            image: require('../../assets/images/2.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 3,
            name: 'Brand TShirt Yellow',
            image: require('../../assets/images/3.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 4,
            name: 'Brand TShirt Yellow',
            image: require('../../assets/images/4.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 5,
            name: 'Brand TShirt Yellow',
            image: require('../../assets/images/5.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 6,
            name: 'Brand TShirt',
            image: require('../../assets/images/6.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 7,
            name: 'Brand rt',
            image: require('../../assets/images/7.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
        {
            id: 8,
            name: 'Bramknd rt',
            image: require('../../assets/images/8.png'),
            category: 'TShirt-Men',
            price: 800,
            discountPrice: 300,
            offer: 50,
            rating: 4.5,
            reviews: 244,
            location: 'Chennai,India',
        },
    ];


    const categoryList = [

        {
            id: 1,
            name: 'Indian wear',
        },
        {
            id: 2,
            name: 'Top wear',
        },
        {
            id: 3,
            name: 'Bottom wear',
        },
        {
            id: 4,
            name: 'Inner wear',
        },
    ];


    const handleCategory = item => {
        setSelectedCategory(item);
    };


    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={25} color={Color.white} />
                </TouchableOpacity>
                <View style={styles.searchView}>
                    <AntDesign name="search1" size={25} color={Color.black} />
                    <TextInput style={styles.searchInput} placeholder="Search...." />
                </View>
                <TouchableOpacity>
                    <AntDesign name="hearto" size={25} color={Color.white} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name="shopping-cart" size={25} color={Color.white} />
                </TouchableOpacity>
            </View>

            {/* Body */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                    <Feather name="filter" size={20} color={Color.black} />
                    <Text
                        style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Medium, paddingHorizontal: 10 }}>
                        Filter
                    </Text>
                </View>
                <View style={{ flex: 4, backgroundColor: Color.white, paddingVertical: 5 }}>
                    <FlatList
                        data={categoryList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const isFocused = item.name === selectedCategory.name;
                            return (
                                <TouchableOpacity
                                    style={{ backgroundColor: isFocused ? Color.primary : Color.white, padding: 5, paddingHorizontal: 20, borderRadius: 40, borderWidth: 0.5, borderColor: Color.primary, margin: 5, marginHorizontal: 5 }}
                                    onPress={() => handleCategory(item)}>
                                    <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: Manrope.SemiBold, color: isFocused ? Color.white : Color.black, paddingVertical: 5 }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        style={{ width: '95%' }}
                    />
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <FlatList
                    data={products}
                    contentContainerStyle={styles.productContainer}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.product} onPress={() => { }}>
                                <ImageBackground
                                    style={styles.Productimage}
                                    source={item.image}>
                                    <View style={styles.imageTopView}>
                                        <Text style={styles.offerText}>{item.offer} %off</Text>
                                        <TouchableOpacity style={styles.like}>
                                            <AntDesign name="hearto" size={15} color={Color.black} />
                                        </TouchableOpacity>
                                    </View>
                                    <LinearGradient
                                        style={styles.locationView}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#1D1D1D78', '#1D1D1D4F', '#1D1D1D08']}>
                                        <Ionicons
                                            name="location-outline"
                                            size={15}
                                            color={Color.white}
                                        />
                                        <Text style={styles.locationText}>{item.location}</Text>
                                    </LinearGradient>
                                </ImageBackground>


                                <View style={styles.contentView}>
                                    <Text style={styles.categoryName}>{item.category}</Text>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productDiscountPrice}>
                                        ${item.discountPrice}{' '}
                                        <Text style={styles.productPrice}>${item.price}</Text>
                                    </Text>
                                    <View style={styles.productRatingView}>
                                        <FontAwesome
                                            name="star"
                                            size={15}
                                            color={Color.lightYellow}
                                        />
                                        <Text>
                                            {item.rating}
                                            <Text> ({item.reviews} reviews)</Text>
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    );
};


export default ProductList;


const { height, width } = Dimensions.get('screen');


const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.primary,
        padding: height * 0.02,


        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchView: {
        backgroundColor: Color.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        borderRadius: 50,
        gap: width * 0.02,
    },
    searchInput: {
        width: width * 0.4,
        paddingVertical: 8,
    },
    CategoryContainer: {
        backgroundColor: Color.white,
        flexDirection: "row"
    },
    categoriesView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: width * 0.02,
        paddingVertical: 5,
        marginHorizontal: width * 0.02,
        marginVertical: height * 0.02,
        backgroundColor: Color.white,
        borderWidth: 1,
        borderRadius: 30,
        gap: 5,
    },
    categoriesText: {
        color: Color.black,
        fontSize: 16, padding: 2
    },
    productContainer: {
        width: '100%',
        backgroundColor: Color.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.4,
    },
    product: {
        width: width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: width * 0.04,
    },
    Productimage: {
        width: width * 0.44,
        height: height * 0.2,
        justifyContent: 'space-between',
        resizeMode: 'cover',
    },
    imageTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: width * 0.02,
    },
    offerText: {
        backgroundColor: Color.lightYellow,
        fontFamily: Gilmer.Heavy,
        fontSize: 10,
        textAlignVertical: 'center',
        paddingVertical: 2,
        paddingHorizontal: width * 0.01,
    },
    like: {
        backgroundColor: Color.white,
        padding: 3,
        borderRadius: 50,
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    locationText: {
        color: Color.white,
        fontSize: 12,
        fontFamily: Gilmer.Medium,
        padding: width * 0.01,
    },
    contentView: {
        width: width * 0.438,
        borderWidth: 0.2,
        borderColor: Color.cloudyGrey,
        borderTopWidth: 0,
        // padding: 0.04,
        padding: width * 0.02,
        gap: 5,
    },
    categoryName: {
        color: Color.cloudyGrey,
        fontSize: 12,
    },
    productName: {
        color: Color.black,
        fontSize: 14,
    },
    productDiscountPrice: {
        color: Color.black,
        fontFamily: Gilmer.Bold,
        fontSize: 16,
    },
    productPrice: {
        color: Color.smokeyGrey,
        fontFamily: Gilmer.Medium,
        fontSize: 12,
        paddingLeft: 25,
    },
    productRatingView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.01,
    },
});



