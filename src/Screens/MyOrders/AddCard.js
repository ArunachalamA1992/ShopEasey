import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform, View, Text,
    SafeAreaView,
} from 'react-native'
import LottieView from 'lottie-react-native'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import { useNavigation } from '@react-navigation/native'
import { Checkbox } from 'react-native-paper';
import Color from '../../Global/Color'
import { Manrope } from '../../Global/FontFamily'

const AddCard = () => {

    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);

    const formMethods = useForm({
        // to trigger the validation on the blur event
        mode: 'onBlur',
        defaultValues: {
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: '',
        },
    })
    const { handleSubmit, formState } = formMethods

    function onSubmit(model) {
        navigation.navigate("OrderConfirmation");
        // Alert.alert('Success: ' + JSON.stringify(model))
    }

    return (
        <FormProvider {...formMethods}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.avoider}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <CreditCardForm
                        LottieView={LottieView}
                        horizontalStart
                        overrides={{
                            labelText: {
                                marginTop: 16,
                            },
                        }}
                    />
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
                </KeyboardAvoidingView>
                {/* {formState.isValid && ( */}
                {/* <Button
                    style={styles.button}
                    title={'CONFIRM PAYMENT'}
                    onPress={handleSubmit(onSubmit)}
                /> */}
                {/* )} */}
            </SafeAreaView>
        </FormProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avoider: {
        flex: 1,
        padding: 36,
    },
    button: {
        margin: 36,
        marginTop: 0,
    },
})

//make this component available to the app
export default AddCard;
