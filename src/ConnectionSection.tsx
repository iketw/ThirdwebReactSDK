/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useContract, useSDK, useUnclaimedNFTs} from '@thirdweb-dev/react';
import {useNFTs, useNFTBalance} from '@thirdweb-dev/react';
import {ThirdwebProvider} from '@thirdweb-dev/react';
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

export const ConnectionSection = ({
  session,
  connect,
}: {
  session: any;
  connect: (chainId: string) => void;
}) => {
  const onConnectPress = async () => {
    connect(`eip155:${ChainId.Mainnet}`);
  };

  return (
    <View>
      {session ? (
        <Text>Connected to: {session.peer.metadata.name}</Text>
      ) : (
        <TouchableOpacity style={styles.touchable} onPress={onConnectPress}>
          <Text style={styles.connectText}>Connect Wallet</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginTop: 10,
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
    marginBottom: 10,
  },
  backgroundStyle: {
    flex: 1,
    margin: 50,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});
