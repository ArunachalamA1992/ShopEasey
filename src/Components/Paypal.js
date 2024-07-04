import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderCancelVisible, setOrderSuccessVisible} from '../Redux';

export const Paypal = ({route, navigation}) => {
  const [approvalUrl, setApprovalUrl] = useState(route.params.approval_url);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const userData = useSelector(state => state.UserReducer.userData);
  const {token} = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPaypalToken = async () => {
      try {
        const clientId =
          'AQvp5BgthrL3r0egKxH5OH78sfQ7xJ02oLoCeEydx5k8JDW_7zB3i1Qbhao9ny_LiyyUnBlfzwxXoi-s';
        const secret =
          'EMGFaXjyR7_bR8-8a8aW33DY3QtQv81xZaiMvIneY-z1rX0_ymyaKEB5Lng5zsXio_Te3HqOJLTQ4wSy';
        const auth = btoa(`${clientId}:${secret}`);

        const tokenResponse = await axios.post(
          'https://api.sandbox.paypal.com/v1/oauth2/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
              Authorization: `Basic ${auth}`,
            },
          },
        );
        console.log('tokenResponse.data', tokenResponse.data);
        setAccessToken(tokenResponse.data.access_token);
      } catch (err) {
        console.log('Error fetching PayPal token:', err);
      }
    };

    if (!approvalUrl) {
      fetchPaypalToken();
    }
  }, [approvalUrl, token]);

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

  const _onNavigationStateChange = webViewState => {
    console.log('webViewState', webViewState);
    if (webViewState.url.includes('https://shopeasey.com/complete-order')) {
      setApprovalUrl(null);

      const urlParams = parseUrlParams(webViewState.url);
      console.log('urlParams', urlParams);
      const payerId = urlParams.PayerID;
      const paymentId = urlParams.paymentId;
      console.log(`Parsed PayerID: ${payerId}, paymentId: ${paymentId}`);

      if (payerId && paymentId) {
        axios
          .post(
            `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
            {payer_id: payerId},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          .then(response => {
            console.log('Payment execution response:', response.data);
            dispatch(setOrderSuccessVisible(true));
            navigation.navigate('TabNavigator');
          })
          .catch(err => {
            console.log('Error executing payment:', err);
            dispatch(setOrderCancelVisible(true));
            navigation.navigate('TabNavigator');
          });
      } else {
        console.log('PayerID or PaymentID is missing');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
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
