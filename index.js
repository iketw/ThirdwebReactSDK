/**
 * @format
 */

// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import 'react-native-get-random-values';

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import '@ethersproject/shims';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
