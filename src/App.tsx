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
import {deepLink, formatUniversalUrl, getSigner} from './utils';
import useInitSignClient from './useInitSignClient';
import {signClient} from './SignClient';

const TRUST_APP_URL = 'https://link.trustwallet.com';

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  console.log('AppInner');
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);

  const [contractAddress, setContractAddress] = useState<string>(
    // '0x4Cf6a1107cb5559F1e389b025e47aB56d9C79663',
    '0xb8A3454db7042Ee72C93b42565357A2e13967FD4',
  );
  const [contractType, setContractType] = useState<string>('nft-drop');

  const sdk = useSDK();

  // const [contract, setContract] = useState<SmartContract>();
  const {
    contract,
    isLoading,
    error: useContractError,
  } = useContract(contractAddress, contractType);

  const initialized = useInit();

  useEffect(() => {
    if (initialized) {
      if (provider) {
        console.log('initialized');
        // Subscribe for pairing URI
        provider.on('display_uri', uri => {
          deepLink('', uri);
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
        web3Provider.on('debug', (a, b) => {
          console.log('onDebug', a, b);
        });
        sdk?.updateSignerOrProvider(web3Provider.getSigner());
      } else if (signClient) {
        subscribeToEvents();
      }
    }
  }, [initialized]);

  const subscribeToEvents = () => {
    if (!signClient) {
      throw Error('No events to subscribe to b/c the client does not exist');
    }

    try {
      signClient.on('session_delete', () => {
        console.log('user disconnected the session from their wallet');
      });

      signClient.on('session_update', () => {
        console.log('session update');
      });
    } catch (e) {
      console.log(e);
    }
  };

  const connectWithProvider = async () => {
    try {
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
            chains: ['eip155:1'],
            events: ['chainChanged', 'accountsChanged'],
            rpcMap: {
              // 1: `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${ENV_PROJECT_ID}`,
              1: 'https://ethereum.rpc.thirdweb.com',
            },
          },
        },
        skipPairing: false, // optional to skip pairing ( later it can be resumed by invoking .pair())
      });
      console.log('what', what);
    } catch (error) {
      console.log('Connect with provider.error', error);
    }
  };

  const connectWithSignClient = async () => {
    const {uri, approval} = await signClient.connect({
      requiredNamespaces: {
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
        },
      },
    });

    deepLink(TRUST_APP_URL, uri);

    approval().then(wat => {
      console.log('wat', wat);
    });
  };

  const onConnectWalletPress = async () => {
    // connectWithSignClient();
    connectWithProvider();
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
    // if (isLoadingContract) {
    //   return;
    // }
    // if (!contractAddress) {
    //   Alert.alert('Bad Input', 'Please, specify a correct contract address');
    //   return;
    // }
    // if (!sdk) {
    //   Alert.alert('SDK not available');
    //   return;
    // }
    // setIsLoadingContract(true);
    // let newContract;
    // try {
    //   if (contractType) {
    //     newContract = await sdk.getContract(contractAddress, contractType);
    //   } else {
    //     newContract = await sdk.getContract(contractAddress);
    //   }
    // } catch (error) {
    //   Alert.alert('Error', `Error getting the contract: ${error}`);
    // }
    // setContract(newContract);
    // setIsLoadingContract(false);
  };

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
      {isLoadingContract || !initialized ? <ActivityIndicator /> : null}
      {contract ? <NftBalance contract={contract} /> : null}
    </SafeAreaView>
  );
};

const NftBalance = ({contract}: {contract?: SmartContract}) => {
  console.log('NftBalance');
  const sdk = useSDK();

  const {
    data: unclaimedNfts,
    isLoading: isUclaimedNftLoading,
    error: unclaimedNftError,
  } = useUnclaimedNFTs(contract, {start: 0, count: 5});

  const {
    data: nfts,
    isLoading: isNftLoading,
    error: nftError,
  } = useNFTs(contract, {start: 0, count: 2});

  // const {
  //   data: ownerBalance,
  //   status: balanceStatus,
  //   isLoading: isLoadingBalance,
  //   error: balanceError,
  // } = useNFTBalance(contract, '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240', 0);

  const sendTransaction = async () => {
    if (!contract) {
      return;
    }

    const addressA = await sdk?.wallet.getAddress();
    console.log('Address: ', addressA);
    console.log('signer: ', sdk?.getSigner());

    // ------------ Sending encoded data ------------
    const encodedData = contract.encoder.encode(
      'safeTransferFrom(address,address,uint256)',
      [
        '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
        '0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803',
        1,
      ],
    );

    sdk
      ?.getSigner()
      ?.sendTransaction({
        from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
        to: contract.getAddress(),
        data: encodedData,
      })
      .then(tx => {
        console.log('tx', tx);
      })
      .catch(error => {
        console.log('sendTransaction.error', error);
      });
    // END------------ Sending encoded data ------------

    // const address = '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240'; // address of the wallet you want to claim the NFTs
    // const quantity = 1; // how many unique NFTs you want to claim

    // sdk?.wallet.sign('hello world').then(tx => {
    //   console.log('response', tx);
    // });

    // const task = await contract.erc721.getClaimTransaction(address, quantity);
    // const hex = await task.encodeFunctionData();

    // const params = [
    //   {
    //     from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
    //     to: contract.getAddress(),
    //     data: hex, //'0x',
    //     value: '0x0',
    //   },
    // ];

    // const requestParams = {
    //   method: 'eth_sendTransaction',
    //   params: params, // stringified JSON
    // };

    // // console.log('requestParams', requestParams);
    // provider.request(requestParams).then(result => {
    //   // seems to be a signed transaction, need to execute it.
    //   console.log('Result: ', result);
    //   // provider.client
    //   //   .respond({
    //   //     topic: provider.session.topic,
    //   //     response: {
    //   //       id: 1,
    //   //       jsonrpc: '2.0',
    //   //       result: result,
    //   //     },
    //   //   })
    //   //   .then(result => {
    //   //     console.log('responded');
    //   //   })
    //   //   .catch(error => {
    //   //     console.log('error', error);
    //   //   });
    // });

    // contract.erc721
    //   .transfer('0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803', 1)
    //   .then(tx => {
    //     console.log('tx', tx);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    // web3Provider
    //   .getSigner()
    //   .sendTransaction(params[0])
    //   .then(tx => {
    //     console.log('tx', tx);
    //   });

    // console.log('Session: ' + JSON.stringify(provider.session, null, 2));

    // metadata.redirect.native is undefined for trust wallet
    // Linking.openURL(provider.session.peer.metadata.redirect.native); // const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata // const claimedTokenId = tx[0].id; // the id of the NFT claimed // const receipt = tx[0].receipt; // the transaction receipt // const tx = await contract?.erc721.claim(quantity); // claims sequential NFTs
    deepLink('', 'wc://');
  };

  const fetchWallets = async () => {
    fetch(
      `https://explorer-api.walletconnect.com/v3/wallets?projectId=${ENV_PROJECT_ID}&version=2&entries=50&page=1`,
    ).then(async response => {
      const json = await response.json();
      console.log('response', JSON.stringify(json));
    });
  };

  const onButtonPress = async () => {
    sendTransaction();
    // Linking.openURL('wc://');
    // deepLink(TRUST_APP_URL, 'wc:');
    // fetchWallets();
  };

  return (
    <View style={styles.nftBalance}>
      <Button title={'Mint NFT'} onPress={onButtonPress} />
      {!contract ? null : (
        <>
          {/* {ownerBalance !== undefined ? (
            <Text>Owner balance: {ownerBalance.toNumber()}</Text>
          ) : null} */}
          <Text>Unclaimed NFTs</Text>
          {unclaimedNfts && unclaimedNfts.length > 0
            ? unclaimedNfts.map(nft => {
                return (
                  <View key={nft.name} style={styles.nftView}>
                    <Text>Name: {nft.name}</Text>
                    {nft?.image ? (
                      <Image style={styles.image} source={{uri: nft?.image}} />
                    ) : null}
                  </View>
                );
              })
            : null}
          <Text>Claimed NFTs</Text>
          {nfts && nfts.length > 0
            ? nfts.map(nft => {
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
