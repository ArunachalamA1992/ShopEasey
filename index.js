/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import analytics from '@react-native-firebase/analytics';

import App from './src/App';

analytics().setAnalyticsCollectionEnabled(true);


AppRegistry.registerComponent(appName, () => App);
