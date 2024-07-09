/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

analytics().setAnalyticsCollectionEnabled(true);

AppRegistry.registerComponent(appName, () => App);
