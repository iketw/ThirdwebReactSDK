/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useContract, useSDK, useUnclaimedNFTs} from '@thirdweb-dev/react-core';
import {useNFTs, useNFTBalance} from '@thirdweb-dev/react-core';
import {ChainId, SmartContract} from '@thirdweb-dev/sdk';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const ContractLoader = ({
  onContractLoaded,
}: {
  onContractLoaded: (contract: SmartContract) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState<string>(
    '0xb8A3454db7042Ee72C93b42565357A2e13967FD4',
  );
  const [contractType, setContractType] = useState<string>('nft-drop');

  const sdk = useSDK();

  const onLoadContract = async () => {
    if (!sdk) {
      throw Error("SDK isn't initialized");
    }

    setIsLoading(true);

    const contract = await sdk.getContract(contractAddress, contractType);
    onContractLoaded(contract);

    setIsLoading(false);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Contract Address"
        value={contractAddress}
        onChangeText={setContractAddress}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Contract Type (optional)"
        value={contractType}
        onChangeText={setContractType}
      />
      <TouchableOpacity style={styles.touchable} onPress={onLoadContract}>
        <Text style={styles.connectText}>Load contract</Text>
      </TouchableOpacity>
      {isLoading ? <ActivityIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
  },
  connectText: {
    color: 'white',
    textAlign: 'center',
  },
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
    borderColor: 'white',
    marginBottom: 10,
  },
  backgroundStyle: {
    flex: 1,
    margin: 50,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});
