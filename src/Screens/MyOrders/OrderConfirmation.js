//import liraries
import React, { useState, useEffect, useCallback } from 'react';
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
    FlatList, TextInput,
    PermissionsAndroid,
    Modal,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { BottomSheet } from 'react-native-btr';
import { Checkbox } from 'react-native-paper';

let dummyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const orderData = [
    {
        'order_id': '#0095',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy Shirt Men',
        'order_color': 'Blue',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#000',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy',
        'order_color': 'White',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#000',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy',
        'order_color': 'White',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    },
    {
        'order_id': '#000',
        'order_status': 'shipped',
        'order_name': 'Blended Cotton Navy',
        'order_color': 'White',
        'order_size': 'M',
        'order_quantity': '1',
        'order_price': '350.00',
    }
]

LogBox.ignoreAllLogs();
// create a component
const OrderConfirmation = () => {

    const navigation = useNavigation();

    const [netInfo_State, setNetinfo] = useState(true);
    const [intialItem, setintialItem] = useState('');
    const [height, setHeight] = useState(undefined);
    const [selectaddr, setSelectAddr] = useState('Paypal');
    const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [cardnumber, setCardNumber] = useState('');
    const [monthYear, setMonthYear] = useState('');
    const [cvvNumber, setCVVNumber] = useState('');
    const [checked, setChecked] = useState(false);

    const [shopSection] = useState([
        { id: 1, title: 'Delivery Address', data: ['Delivery Address'] },
        { id: 2, title: 'Order Items', data: ['Order Items'] },
        { id: 3, title: 'Coupon', data: ['Coupon'] },
        { id: 4, title: 'Price Details', data: ['Price Details'] },
        { id: 5, title: 'Place Order', data: ['Place Order'] }
    ]);

    const [showMoreButton, setShowMoreButton] = useState(false);
    const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);

    const [isExpanded, setIsExpanded] = useState(false);


    useEffect(() => {
        setNumLines(discriptiontextShown ? undefined : 3);
    }, [discriptiontextShown]);

    const onDescriptionTextLayout = useCallback(
        e => {
            if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [discriptiontextShown],
    );

    const toggleTextShown = () => {
        setDiscriptiontextShown(!discriptiontextShown);
        setNumLines();
    };

    const cardSubmitClick = () => {
        try {
            if (username != "" && cardnumber != "" && monthYear != "" && cvvNumber != "") {
                console.log("Success");
                ToastAndroid.show("Your card details is added", ToastAndroid.SHORT);
                sale_toggleBottomView();
            } else {
                ToastAndroid.show("Please fill mandatory fields", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("catch in cardSubmit_Click : ", error);
        }
    }


    function sale_toggleBottomView(type) {
        try {
            setSaleBottomSheetVisible(!salebottomSheetVisible);
        } catch (error) {
            console.log('Catch in sale_toggleBottomView :', error);
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
                                backgroundColor: '#DBF8FF',
                                width: '100%',
                                height: 500,
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
                                    Add Card
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
                            <View style={{ width: '95%', alignItems: 'center', }}>
                                <View style={{ width: '95%', alignItems: 'center' }}>
                                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Name of the card *</Text>
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
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '95%', alignItems: 'center', marginVertical: 5 }}>
                                    <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Card Number *</Text>
                                    <View style={styles.NumberBoxConatiner}>
                                        <TextInput
                                            style={styles.numberTextBox}
                                            placeholder="XXXX XXXX XXXX XXXX"
                                            placeholderTextColor={Color.cloudyGrey}
                                            value={cardnumber}
                                            onChangeText={value => {
                                                setCardNumber(value);
                                            }}
                                            keyboardType="number-pad"
                                            maxLength={16}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                                    <View style={{ width: '47%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>Expiry Month/Year *</Text>
                                        <View style={styles.NumberBoxConatiner}>
                                            <TextInput
                                                style={styles.numberTextBox}
                                                placeholder="MM/YYYY"
                                                placeholderTextColor={Color.cloudyGrey}
                                                value={monthYear}
                                                onChangeText={value => {
                                                    setMonthYear(value);
                                                }}
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                    </View>
                                    <View style={{ width: 2, height: '100%' }}></View>
                                    <View style={{ width: '47%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ width: '100%', textAlign: 'left', paddingVertical: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Manrope.Medium }}>CVV *</Text>
                                        <View style={styles.NumberBoxConatiner}>
                                            <TextInput
                                                style={styles.numberTextBox}
                                                placeholder="CVV"
                                                placeholderTextColor={Color.cloudyGrey}
                                                value={cvvNumber}
                                                onChangeText={value => {
                                                    setCVVNumber(value);
                                                }}
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <Checkbox
                                        color={Color.primary} uncheckedColor={`#FA4616`}
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}
                                        style={{ fontSize: 16 }}
                                    />
                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, textAlign: 'justify' }}>Save this card for faster checkout</Text>
                                </View>
                                <TouchableOpacity onPress={() => cardSubmitClick()} activeOpacity={0.5} style={{ width: '95%', height: 50, marginVertical: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 14, color: Color.white, fontFamily: Manrope.Medium, textTransform: 'uppercase' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheet>
                </View>
            );
        } catch (error) {
            console.log('catch in sale_BottomSheetmenu ', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.primary} barStyle={'dark-content'} />
            {
                netInfo_State ? null : (
                    <Animated.View
                        animation="fadeInRight"
                        style={{
                            flex: 1,
                            position: 'absolute',
                            zIndex: 9999,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#626262',
                            opacity: 0.5,
                            padding: 10,
                            marginTop: Platform.OS == 'ios' ? 80 : 0,
                        }}>
                        <Text style={{ color: 'white' }}>No Internet Connection</Text>
                    </Animated.View>
                )
            }

            <View style={{ flex: 1, backgroundColor: Color.softGrey }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: Color.softGrey }}>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, backgroundColor: Color.white, elevation: 1 }}>
                            <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Delivered Address</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Manrope.Medium, letterSpacing: 0.5, textDecorationLine: 'underline' }}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', paddingHorizontal: 20, }}>
                                <Text style={{ fontSize: 14, paddingVertical: 5, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Arunachalam Annamalai</Text>
                                <Text style={{ fontSize: 12, paddingVertical: 2, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>+91 9876543210</Text>
                            </View>
                            <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 20, }}>
                                <Text style={{ fontSize: 14, paddingVertical: 5, color: Color.lightBlack, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Home</Text>
                                <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Regular, letterSpacing: 0.5 }} numberOfLines={2}>No. 120, W Periasamy Rd, R S Puram West, Coimbatore, Tamil Nadu 641002, India</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, paddingVertical: 10, backgroundColor: Color.white }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsExpanded(!isExpanded);
                                }}
                                style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: Color.white, elevation: 1 }}>
                                <Text style={{ fontSize: 16, color: Color.black, paddingHorizontal: 10, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Your Order Items</Text>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'chevron-small-down'}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                            </TouchableOpacity>

                            {isExpanded ?
                                <View style={{ width: '100%', alignItems: 'center', }}>
                                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10, backgroundColor: Color.white }}>
                                        {orderData.map((item, index) => {
                                            return (
                                                <View style={{ width: '100%', height: 150, alignItems: 'center' }}>
                                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image
                                                                source={require('../../assets/category/cat_men.png')}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    resizeMode: 'contain',
                                                                }}
                                                            />
                                                        </View>
                                                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Brand :</Text>
                                                                    <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Manrope.Bold, paddingHorizontal: 5, letterSpacing: 0.5 }}>US-Polo</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 3 }}>
                                                                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }} numberOfLines={2}>{item.order_name}</Text>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 3 }}>
                                                                <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>$ 350.00</Text>
                                                                <Text style={styles.productPrice}>$ 200.00</Text>
                                                                <Text style={{ fontSize: 14, color: '#0FAD45', fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>Save 55% OFF</Text>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Color - </Text>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Text style={{ paddingHorizontal: 5, fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>blue</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Size - </Text>
                                                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>L</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Quantity - </Text>
                                                                    <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.SemiBold }}>1</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', height: 1, backgroundColor: Color.lightgrey }}></View>
                                                </View>
                                            );
                                        })}
                                    </View>

                                    <View style={{ width: '90%', flexDirection: 'row', marginVertical: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E7F7EC' }}>
                                        <Iconviewcomponent
                                            Icontag={'MaterialCommunityIcons'}
                                            iconname={'brightness-percent'}
                                            icon_size={20}
                                            icon_color={Color.lightBlack}
                                        />
                                        <Text style={{ fontSize: 14, color: Color.lightBlack, paddingHorizontal: 10, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Delivery by tomorrow, Free Delivery</Text>
                                    </View>
                                </View> : null}
                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 0, paddingVertical: 10, backgroundColor: Color.softGrey }}>
                            <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff', elevation: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Iconviewcomponent
                                        Icontag={'MaterialCommunityIcons'}
                                        iconname={'brightness-percent'}
                                        icon_size={24}
                                        icon_color={Color.lightBlack}
                                    />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, paddingHorizontal: 10, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Offers & Rewards</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 13, color: Color.primary, fontFamily: Manrope.Bold, letterSpacing: 0.5 }}>Apply Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', marginVertical: 5, paddingVertical: 10, paddingBottom: 20, backgroundColor: Color.white }}>
                            <View style={{ width: '100%', backgroundColor: Color.white, paddingVertical: 20, paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 16, color: Color.black, paddingHorizontal: 10, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Payment Method</Text>
                            </View>

                            <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 5 }}>
                                        <View style={{ marginEnd: 0, alignItems: 'center', }}>
                                            <Image
                                                source={require('../../assets/category/master_card.png')}
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                        <Text style={{ fontSize: 14, color: Color.black, fontFamily: Manrope.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }}>Credit / Debit Card</Text>
                                    </View>
                                    <View style={{ marginEnd: 10 }}>
                                        <TouchableOpacity>
                                            <Iconviewcomponent
                                                Icontag={'AntDesign'}
                                                iconname={'pluscircleo'}
                                                icon_size={24}
                                                icon_color={Color.primary}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("AddCard")} activeOpacity={0.5} style={{ width: '90%', marginVertical: 10, height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 16, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Add Card</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey, marginVertical: 10 }}></View>

                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Image
                                        source={require('../../assets/category/paypal.png')}
                                        style={{
                                            width: 35,
                                            height: 35,
                                            resizeMode: 'contain',
                                        }}
                                    /> */}
                                    <Iconviewcomponent
                                        Icontag={'FontAwesome'}
                                        iconname={'rupee'}
                                        icon_size={12}
                                        icon_color={Color.white}
                                    />
                                    <Text style={{ fontSize: 14, color: Color.black, paddingHorizontal: 10, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Paypal</Text>
                                </View>
                                {selectaddr == "Paypal" ?
                                    <TouchableOpacity onPress={() => setSelectAddr("Paypal")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-active'}
                                            icon_size={22}
                                            iconstyle={{ color: Color.primary }}
                                        />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setSelectAddr("Paypal")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-passive'}
                                            icon_size={22}
                                            iconstyle={{ color: Color.lightBlack }}
                                        />
                                    </TouchableOpacity>}
                            </View>
                            <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey, marginVertical: 10 }}></View>
                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 10 }}>
                                    <View style={{ padding: 5, paddingHorizontal: 8, backgroundColor: Color.primary, borderRadius: 40 }}>
                                        <Iconviewcomponent
                                            Icontag={'FontAwesome'}
                                            iconname={'rupee'}
                                            icon_size={12}
                                            icon_color={Color.white}
                                        />
                                    </View>
                                    <Text style={{ fontSize: 14, color: Color.black, paddingHorizontal: 10, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Cash on delivery</Text>
                                </View>
                                {selectaddr == "Cash" ?
                                    <TouchableOpacity onPress={() => setSelectAddr("Cash")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-active'}
                                            icon_size={22}
                                            iconstyle={{ color: Color.primary }}
                                        />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setSelectAddr("Cash")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-passive'}
                                            icon_size={22}
                                            iconstyle={{ color: Color.lightBlack }}
                                        />
                                    </TouchableOpacity>}
                            </View>

                            {/* <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ padding: 5, paddingHorizontal: 10, backgroundColor: Color.primary, borderRadius: 40 }}>
                                        <Iconviewcomponent
                                            Icontag={'FontAwesome'}
                                            iconname={'rupee'}
                                            icon_size={14}
                                            icon_color={Color.white}
                                        />
                                    </View>
                                    <Text style={{ fontSize: 16, color: Color.lightBlack, paddingHorizontal: 10, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Cash on delivery</Text>
                                </View>
                                {selectaddr == "Cash" ?
                                    <TouchableOpacity onPress={() => setSelectAddr("Cash")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-active'}
                                            icon_size={24}
                                            iconstyle={{ color: Color.primary }}
                                        />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setSelectAddr("Cash")} style={{ marginEnd: 20 }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'radio-btn-passive'}
                                            icon_size={24}
                                            iconstyle={{ color: Color.lightBlack }}
                                        />
                                    </TouchableOpacity>}
                            </View> */}
                        </View>

                        <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', marginVertical: 0, paddingVertical: 10, backgroundColor: Color.softGrey }}>
                            <View style={{ width: '100%', backgroundColor: Color.white, paddingVertical: 10, paddingHorizontal: 10, elevation: 1 }}>
                                <Text style={{ fontSize: 16, color: Color.black, paddingHorizontal: 10, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Total</Text>

                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3, marginTop: 10 }}>
                                    <Text style={{ fontSize: 12, textAlign: 'left', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Price ( 1 Items )</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'right', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={2}>$1500.65</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 }}>
                                    <Text style={{ fontSize: 12, textAlign: 'left', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Discount</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'right', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={2}>$10</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 3 }}>
                                    <Text style={{ fontSize: 12, textAlign: 'left', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Delivery Charges</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'right', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={2}>Free Delievery</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, marginTop: 0 }}>
                                    <Text style={{ fontSize: 14, textAlign: 'left', color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Total Amount</Text>
                                    <Text style={{ fontSize: 16, textAlign: 'right', color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5, paddingHorizontal: 5 }} numberOfLines={2}>$1490.65</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', backgroundColor: Color.white, paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ paddingHorizontal: 10, elevation: 1 }}>
                                    <Text
                                        style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>
                                        Return/Refund Policy
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: Color.lightBlack,
                                            textAlign: 'justify', paddingVertical: 5,
                                            fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22
                                        }}
                                        numberOfLines={numLines}
                                        onTextLayout={onDescriptionTextLayout}>
                                        {!discriptiontextShown
                                            ? dummyText
                                                .split('\n')
                                                .join('')
                                                .substring(0, 120)
                                                .concat('...')
                                            : dummyText.split('\n').join('')}{' '}
                                        {showMoreButton || numLines >= 3 || numLines == undefined ? (
                                            <Text
                                                onPress={toggleTextShown}
                                                style={{
                                                    color: Color.primary,
                                                    fontFamily: Manrope.SemiBold,
                                                    fontSize: 14, paddingVertical: 5
                                                }}>
                                                {discriptiontextShown ? 'Read Less' : 'Read More'}
                                            </Text>
                                        ) : null}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 0, paddingVertical: 15, backgroundColor: Color.white, elevation: 5 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Manrope.Medium, letterSpacing: 0.5 }}>Total Amount</Text>
                    <Text style={{ width: '100%', textAlign: 'center', fontSize: 18, color: Color.black, fontFamily: Manrope.Bold, letterSpacing: 0.5 }} numberOfLines={1}>$1490.65</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                    <TouchableOpacity style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5 }}>
                        <Text style={{ fontSize: 14, color: Color.white, fontFamily: Manrope.SemiBold, letterSpacing: 0.5 }}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {sale_BottomSheetmenu()}

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.softGrey,
    },
    productPrice: {
        color: Color.smokeyGrey,
        fontFamily: Manrope.SemiBold,
        fontSize: 12, paddingHorizontal: 5,
        textDecorationLine: 'line-through',
    },
    NumberBoxConatiner: {
        display: 'flex',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberTextBox: {
        flex: 1,
        height: 50,
        color: Color.black,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: Manrope.Medium, letterSpacing: 0.5
    },
});

//make this component available to the app
export default OrderConfirmation;
