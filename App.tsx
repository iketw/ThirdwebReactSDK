/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useNFTs} from '@thirdweb-dev/react';
import {useContract, useNFT, useNFTBalance} from '@thirdweb-dev/react';
import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId, SmartContract, ThirdwebSDK} from '@thirdweb-dev/sdk';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const sdk = new ThirdwebSDK('mumbai');

function parseIpfsUri(uri?: string) {
  if (!uri) {
    return '';
  }

  let hash = uri.match(/^ipfs:(\/\/)?(ipfs\/)?(.*)$/i)?.[3];
  return `https://ipfs.io/ipfs/${hash}`;
}

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);

  const [contractAddress, setContractAddress] = useState<string>();
  const [contractType, setContractType] = useState<string>();

  const [contract, setContract] = useState<SmartContract>();

  const onButtonPress = async () => {
    if (isLoadingContract) {
      return;
    }

    if (!contractAddress) {
      Alert.alert('Bad Input', 'Please, specify a correct contract address');
      return;
    }

    setIsLoadingContract(true);
    // '0xd5a21f02E2bd04e1052FA7bccE229a391C05b404',
    //   'nft-drop',
    let newContract;
    try {
      if (contractType) {
        newContract = await sdk.getContract(contractAddress, contractType);
      } else {
        newContract = await sdk.getContract(contractAddress);
      }
    } catch (error) {
      Alert.alert('Error', `Error getting the contract: ${error}`);
    }

    setContract(newContract);
    setIsLoadingContract(false);
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <TextInput
        style={styles.textInput}
        placeholder="Contract Address"
        onChangeText={setContractAddress}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Contract Type (optional)"
        onChangeText={setContractType}
      />
      <Button title={'Get Contract Info'} onPress={onButtonPress} />
      {isLoadingContract ? <ActivityIndicator /> : null}
      <NftBalance contract={contract} />
    </SafeAreaView>
  );
};

const NftBalance = ({contract}: {contract?: SmartContract}) => {
  const {
    data: nfts,
    status: nftStatus,
    isLoading: isNftLoading,
    error: nftError,
  } = useNFTs(contract, {start: 0, count: 2});
  const {
    data: ownerBalance,
    status: balanceStatus,
    isLoading: isLoadingBalance,
    error: balanceError,
  } = useNFTBalance(contract, '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240', 0);

  console.log(`balanceError: ${balanceError}`);
  console.log(`isLoadingBalance: ${isLoadingBalance}`);
  console.log(`balanceData: ${ownerBalance}`);
  console.log(`balanceStatus: ${balanceStatus}`);

  console.log(`nftError: ${nftError}`);
  console.log(`isLoadingNft: ${isNftLoading}`);
  console.log(`nftStatus: ${nftStatus}`);

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.nftBalance}>
      {ownerBalance !== undefined ? (
        <Text>Owner balance: {ownerBalance.toNumber()}</Text>
      ) : null}
      {nfts && nfts.length > 0
        ? nfts.map(nft => {
            console.log(nft.metadata.name);
            return (
              <View key={nft.metadata.name} style={styles.nftView}>
                <Text>Name: {nft.metadata.name}</Text>
                {nft?.metadata.image ? (
                  <Image
                    style={styles.image}
                    source={{uri: nft?.metadata.image}}
                  />
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  nftBalance: {
    marginTop: 20,
  },
  nftView: {
    marginTop: 20,
  },
  image: {
    height: 150,
  },
  textInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    marginBottom: 10,
  },
  backgroundStyle: {
    flex: 1,
    margin: 50,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});

export default App;
