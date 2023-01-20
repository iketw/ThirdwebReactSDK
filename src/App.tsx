/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useSDK} from '@thirdweb-dev/react';
import {useNFTs, useNFTBalance} from '@thirdweb-dev/react';
import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId, SmartContract} from '@thirdweb-dev/sdk';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-expect-error - `@env` is a virtualised module via Babel config.
import {ENV_PROJECT_ID} from '@env';
import useInit from './useInit';
import {provider} from './UniversalProvider';
import {providers} from 'ethers';

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);

  const [contractAddress, setContractAddress] = useState<string>(
    '0x4Cf6a1107cb5559F1e389b025e47aB56d9C79663',
  );
  const [contractType, setContractType] = useState<string>('nft-drop');

  const [contract, setContract] = useState<SmartContract>();

  const initialized = useInit();

  const sdk = useSDK();

  useEffect(() => {
    if (initialized) {
      console.log('initialized');
      // Subscribe for pairing URI
      provider.on('display_uri', uri => {
        console.log('uri', uri);
        Linking.openURL(uri.replace('wc:', 'wc://'));
      });

      // Subscribe to session ping
      provider.on('session_ping', ({id, topic}) => {
        console.log('id,topic: ', id, topic);
      });

      // Subscribe to session event
      provider.on('session_event', ({event, chainId}) => {
        console.log('event, chainId', event, chainId);
      });

      // Subscribe to session update
      provider.on('session_update', ({topic, params}) => {
        console.log('topic,params: ', topic, params);
      });

      // Subscribe to session delete
      provider.on('session_delete', ({id, topic}) => {
        console.log('id,topic', id, topic);
      });

      const web3Provider = new providers.Web3Provider(provider);
      sdk?.updateSignerOrProvider(web3Provider.getSigner());
    }
  }, [initialized, sdk]);

  const onConnectWalletPress = async () => {
    const what = await provider.connect({
      namespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
          ],
          chains: ['eip155:137'],
          events: ['chainChanged', 'accountsChanged'],
          rpcMap: {
            //137: `https://rpc.walletconnect.com?chainId=eip155:137&projectId=${ENV_PROJECT_ID}`,
            137: 'https://polygon.rpc.thirdweb.com',
          },
        },
      },
      skipPairing: false, // optional to skip pairing ( later it can be resumed by invoking .pair())
    });
    console.log('what', what);
    // console.log('session', JSON.stringify(provider.session, null, 2));
    // const params =
    //   '[{"from":"0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240","to":"0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240","data":"0x","gasLimit":"0x5208","gasPrice":"0x0649534e00","value":"0x01","nonce":"0x07"}]';
    // const requestParams = {
    //   sessionTopic: requireNotNull(DappDelegate.selectedSessionTopic),
    //   method: 'eth_sendTransaction',
    //   params: params, // stringified JSON
    //   chainId: '137',
    // };
    // provider.request();

    // const web3Provider = new providers.Web3Provider(provider);
    // sdk?.updateSignerOrProvider(web3Provider.getSigner());
  };

  const onGetContractInfoPress = async () => {
    if (isLoadingContract) {
      return;
    }

    if (!contractAddress) {
      Alert.alert('Bad Input', 'Please, specify a correct contract address');
      return;
    }

    if (!sdk) {
      Alert.alert('SDK not available');
      return;
    }

    setIsLoadingContract(true);
    // '0x4Cf6a1107cb5559F1e389b025e47aB56d9C79663',
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

  console.log('render');

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <TextInput
        style={styles.textInput}
        placeholder="Contract Address"
        value={contractAddress}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Contract Type (optional)"
        value={contractType}
      />
      <Button title={'Load Contract'} onPress={onGetContractInfoPress} />
      <TouchableOpacity style={styles.touchable} onPress={onConnectWalletPress}>
        <Text style={styles.connectText}>Connect wallet</Text>
      </TouchableOpacity>
      {isLoadingContract ? <ActivityIndicator /> : null}
      <NftBalance contract={contract} />
    </SafeAreaView>
  );
};

const NftBalance = ({contract}: {contract?: SmartContract}) => {
  const sdk = useSDK();

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

  const onButtonPress = async () => {
    if (!contract) {
      return;
    }

    const addressA = await sdk?.wallet.getAddress();
    console.log('Address: ', addressA);
    console.log('signer: ', sdk?.getSigner());

    const address = '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240'; // address of the wallet you want to claim the NFTs
    const quantity = 1; // how many unique NFTs you want to claim

    // sdk?.wallet.sign('hello world').then(tx => {
    //   console.log('response', tx);
    // });

    const task = await contract.erc721.getClaimTransaction(address, 1);
    const hex = await task.encodeFunctionData();

    const params = [
      {
        from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
        to: contract.getAddress(),
        data: hex, //'0x',
        value: '0x0',
      },
    ];

    const requestParams = {
      // sessionTopic: provider.session.topic,
      method: 'eth_sendTransaction',
      params: params, // stringified JSON
      // chainId: '137',
    };

    // sdk?.wallet
    //   .sendRawTransaction({
    //     from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
    //     to: '0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803',
    //     value: '1000',
    //   })
    //   .then(result => {
    //     console.log('result', result.receipt);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    provider.request(requestParams, 'eip155:137').then(result => {
      // seems to be a signed transaction, need to execute it.
      console.log('Result: ', result);
      provider.client
        .respond({
          topic: provider.session.topic,
          response: {
            id: 1,
            jsonrpc: '2.0',
            result: result,
          },
        })
        .then(result => {
          console.log('responded');
        })
        .catch(error => {
          console.log('error', error);
        });
    });

    Linking.openURL(provider.session.peer.metadata.redirect.native); // const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata // const claimedTokenId = tx[0].id; // the id of the NFT claimed // const receipt = tx[0].receipt; // the transaction receipt // const tx = await contract?.erc721.claim(quantity); // claims sequential NFTs

    // console.log('RECEIPT: ', receipt);
  };

  return (
    <View style={styles.nftBalance}>
      <Button title={'Mint NFT'} onPress={onButtonPress} />
      {!contract ? null : (
        <>
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginTop: 20,
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

export default App;
