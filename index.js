/**
 * @format
 */

import '@thirdweb-dev/react-native-compat';

if (__DEV__) {
  require('basil-ws-flipper').wsDebugPlugin;
}

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
