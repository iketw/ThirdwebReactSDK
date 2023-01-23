/**
 * @format
 */

// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import 'crypto';

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import '@ethersproject/shims';

// Step 3: Wallet Connect React Native Compat
import '@walletconnect/react-native-compat';

if (__DEV__) {
  require('basil-ws-flipper').wsDebugPlugin;
}

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
