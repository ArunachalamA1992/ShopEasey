//import liraries
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Color from '../../Global/Color';
import { Manrope } from '../../Global/FontFamily';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-native-paper';

// create a component
const AccountSettings = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // *********************   EMAIL *********************//
    const [isOrderSwitchOn, setIsOrderSwitchOn] = useState(false);
    const [isProSwitchOn, setIsProSwitchOn] = useState(false);
    const [isNewsSwitchOn, setIsNewsSwitchOn] = useState(false);

    const changeCountryClick = () => {
        try {
            Alert.alert(
                'Alert',
                'Are you sure you want to change the Country?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => setIsOrderSwitchOn(true) },
                ],
                { cancelable: false }
            )
        } catch (error) {
            console.log('catch in change_Country : ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', backgroundColor: '#F5F6FA' }}>

                <View style={{
                    backgroundColor: Color.white,
                    padding: 10,
                }}>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'justify',
                            color: Color.black,
                            fontFamily: Manrope.SemiBold,
                            letterSpacing: 0.5,
                            lineHeight: 22,
                            padding: 5,
                        }}>
                        About ShopEasey
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            textAlign: 'justify',
                            color: Color.cloudyGrey,
                            fontFamily: Manrope.Light,
                            letterSpacing: 0.5,
                            lineHeight: 22,
                            paddingHorizontal: 10, paddingVertical: 5
                        }}>
                        Moving to a new country can be both exciting and challenging. MoveEasy is here to make your transition as smooth as possible. Our mobile app is designed to provide you with all the tools and resources you need to settle into your new home seamlessly.
                    </Text>
                </View>
                <TouchableOpacity onPress={() => { changeCountryClick() }}
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        marginVertical: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                                padding: 5,
                            }}>
                            Change Country
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                textAlign: 'justify',
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Light,
                                letterSpacing: 0.5,
                                lineHeight: 22,
                                paddingHorizontal: 10,
                            }}>
                            Seamlessly transition to your new country with personalized local guides, language assistance, and essential services. Download now and make your move stress-free!
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <Switch
                            value={isOrderSwitchOn}
                            onValueChange={setIsOrderSwitchOn}
                            color={Color.primary}
                        />
                    </View>
                </TouchableOpacity>

                {/* <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        marginVertical: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                                padding: 3,
                            }}>
                            Promotional Offers
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'justify',
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Light,
                                letterSpacing: 0.5,
                                lineHeight: 22,
                                padding: 3,
                            }}>
                            Stay informed at every step of your order journey, from
                            confirmation to delivery
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <Switch
                            value={isProSwitchOn}
                            onValueChange={setIsProSwitchOn}
                            color={Color.primary}
                        />
                    </View>
                </View>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        padding: 10,
                        marginVertical: 10,
                    }}>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                                color: Color.black,
                                fontFamily: Manrope.Bold,
                                letterSpacing: 0.5,
                                padding: 3,
                            }}>
                            News and Updates
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'justify',
                                color: Color.cloudyGrey,
                                fontFamily: Manrope.Light,
                                letterSpacing: 0.5,
                                lineHeight: 22,
                                padding: 3,
                            }}>
                            Stay informed at every step of your order journey, from
                            confirmation to delivery
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <Switch
                            value={isNewsSwitchOn}
                            onValueChange={setIsNewsSwitchOn}
                            color={Color.primary}
                        />
                    </View>
                </View> */}
            </View>
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default AccountSettings;
