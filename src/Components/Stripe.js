import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderCancelVisible, setOrderSuccessVisible} from '../Redux';
import fetchData from '../Config/fetchData';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';

export const Stripe = ({route}) => {
  const navigation = useNavigation();
  const [approvalUrl, setApprovalUrl] = useState(route.params.approval_url);
  const [data] = useState(route.params.data);
  const [orders] = useState(route.params.orders);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const userData = useSelector(state => state.UserReducer.userData);
  const {token} = userData;
  const dispatch = useDispatch();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    async function initializePaymentSheet() {
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: 'your-payment-intent-client-secret',
        merchantDisplayName: 'Your App Name',
        appearance: {
          colors: {
            primary: '#000000',
            background: '#ffffff',
            componentBackground: '#f3f3f3',
            componentBorder: '#d1d1d1',
            componentDivider: '#e1e1e1',
            primaryText: '#000000',
            secondaryText: '#757575',
          },
          shapes: {
            borderRadius: 12,
            borderWidth: 1,
          },
          primaryButton: {
            colors: {
              background: '#1f77b4',
              text: '#ffffff',
            },
            borderRadius: 12,
          },
        },
      });

      if (!error) {
        console.log('error');
      }
    }

    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      console.log('Payment failed', error.message);
    } else {
      console.log('Payment successful');
    }
  };

  const parseUrlParams = url => {
    const params = {};
    const queryString = url.split('?')[1];
    if (queryString) {
      const pairs = queryString.split('&');
      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }
    return params;
  };

  const _onNavigationStateChange = async webViewState => {
    if (webViewState.url.includes('https://shopeasey.com/complete-order')) {
      setApprovalUrl(null);

      const urlParams = parseUrlParams(webViewState.url);
      const session_id = urlParams.session_id;

      if (session_id) {
        try {
          const verifyData = {
            total: data?.total,
            currency: data?.currency,
            session_id: session_id,
            //         payment_id: paymentId,
            orders: orders,
          };
          const verifyOrderResponse = await fetchData.verify_order(
            verifyData,
            token,
          );

          if (verifyOrderResponse?.status) {
            navigation.dispatch(StackActions.replace('TabNavigator'));
            dispatch(setOrderSuccessVisible(true));
          } else {
            navigation.dispatch(StackActions.replace('TabNavigator'));
            dispatch(setOrderCancelVisible(true));
          }
        } catch (err) {
          dispatch(setOrderCancelVisible(true));
          navigation.dispatch(StackActions.replace('TabNavigator'));
        }
        // axios
        //   .post(
        //     `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        //     {payer_id: session_id},
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${accessToken}`,
        //       },
        //     },
        //   )
        //   .then(response => {
        //     console.log('Payment execution response:', response.data);
        //     dispatch(setOrderSuccessVisible(true));
        //     navigation.navigate('TabNavigator');
        //   })
        //   .catch(err => {
        //     console.log('Error executing payment:', err);
        //     dispatch(setOrderCancelVisible(true));
        //     navigation.navigate('TabNavigator');
        //   });
      } else {
        console.log('session_id or PaymentID is missing');
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {approvalUrl ? (
        <WebView
          style={{height: '100%', width: '100%'}}
          source={{uri: approvalUrl}}
          onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
