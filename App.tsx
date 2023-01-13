/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId, ThirdwebSDK} from '@thirdweb-dev/sdk';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const sdk = new ThirdwebSDK('mumbai');

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = await sdk.getContract(
        '0xd5a21f02E2bd04e1052FA7bccE229a391C05b404',
        'nft-drop',
      );
      // Alert.alert('Contract', 'contract');
      const walletAddress = '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240';
      const balance = await contract.balanceOf(walletAddress);

      const tokenId = 0;
      const nft = await contract.get(tokenId);

      Alert.alert(
        'Balance',
        `The balance is ${balance}. The name is "${nft.metadata.name}"`,
      );
      setIsLoadingBalance(false);
    };

    if (isLoadingBalance) {
      fetchBalance();
    }
  }, [isLoadingBalance, setIsLoadingBalance]);

  const onButtonPress = () => {
    if (!isLoadingBalance) {
      setIsLoadingBalance(true);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Button title={'Get NFT Info'} onPress={onButtonPress} />
      {isLoadingBalance ? <ActivityIndicator /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    margin: 50,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
