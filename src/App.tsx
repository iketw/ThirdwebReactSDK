/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useClaimedNFTs, useSDK, useUnclaimedNFTs} from '@thirdweb-dev/react-core';
import {ChainId, SmartContract} from '@thirdweb-dev/sdk';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {deepLink, log}   from './utils';

import { Chain, Connector, mainnet, useAccount, useConnect, useDisconnect } from 'wagmi';
// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ENV_PROJECT_ID, ENV_RELAY_URL } from '@env';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ThirdwebProvider } from '@thirdweb-dev/react-native';

const TRUST_APP_URL = 'https://link.trustwallet.com';

const App = () => {
  return (
      <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
        <AppInner />
      </ThirdwebProvider>
  );
};

const chains_: Chain[] = [{
      id: 1,
      name: 'Ethereum',
      network: "homestead",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      rpcUrls: {
        default: {
         http: ['https://ethereum.rpc.thirdweb.com']
        },
        public: {
          http: ['https://ethereum.rpc.thirdweb.com']
         }
      }
    }];

const AppInner = () => {
  const [contract, setContract] = useState<SmartContract>();

  const { disconnect } = useDisconnect()

  const { connector, isConnected } = useAccount()

  const sdk = useSDK();

  const { connect, connectors, error, isLoading, isSuccess, pendingConnector } = useConnect();

  useEffect(() => {
    if (connectors[0]) {
      log('connector', 'setListeners', connectors[0])
      const connector_ = connectors[0]
      connector_.addListener('connect', (data) => {log('connect', data)})
      connector_.addListener('message', ({type, data}) => {log('message', type, data)})
      connector_.addListener('error', (error) => {log('error', error)})
      connector_.addListener('disconnect', () => {log('disconnect')})
    }
  }, []);

  log('isLoading', isLoading)
  log('isSuccess', isSuccess)
  log('pendingConnector', pendingConnector)
  log('error', error)

  // const disconnect = useDisconnect({ reconnectPrevious: false });

  // useEffect(() => {
  //   if (web3Provider) {
  //     log('updateSignerOrProvider');
  //     sdk?.updateSignerOrProvider(web3Provider.getSigner());

  //     web3Provider.on('debug', (a, b) => {
  //       log('onDebug', a.action);
  //     });
  //   }
  // }, [sdk, web3Provider]);

  // useEffect(() => {
  //   if (connectors && !provider) {
  //     console.log('connectors.len', connectors.length)
  //     console.log('connectors', connectors[0])
  //     // connectors[0].getProvider().then((provider: any) => {
  //     //   log('provider', provider);
  //     //   setProvider(provider);
  //     // });
  //     connectors[0].onDisplayUri((uri: string) => {
  //       log('onDisplayUri', uri);
  //       // deepLink(TRUST_APP_URL, uri);
  //     });
  //   }
  // }, [connectors]);

  const onPress = () => {
    if (isConnected) {
      disconnect()
    } else {
      connect({connector: connectors[0]})
    }
    // Linking.openURL('https://google.com')
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Button title={isConnected ? "Disconnect" : "Connect"} onPress={onPress} />
      {/* {isInitializing ? (
        <ActivityIndicator />
      ) : (
        <ConnectionSection session={session} connect={connect} />
      )}
      <ContractLoader onContractLoaded={setContract} />
      {contract ? <ContractActions contract={contract} /> : null} */}
    </SafeAreaView>
  );
};

// const ContractActions = ({contract}: {contract: SmartContract}) => {
//   const sdk = useSDK();

//   const {web3Provider} = useWalletConnectClient();

//   const [action, setAction] = useState('');
//   const [claimAddress, setClaimAddress] = useState('');
//   const [message, setMessage] = useState('');

//   const {
//     data: unclaimedNfts,
//     isLoading: isUclaimedNftLoading,
//     error: unclaimedNftError,
//   } = useUnclaimedNFTs(contract, {start: 0, count: 10});

//   const {
//     data: nfts,
//     isLoading: isNftLoading,
//     error: nftError,
//   } = useClaimedNFTs(contract, {start: 0, count: 10});

//   if (nfts && nfts.length > 0) {
//     log(nfts.length)
//   }

//   const sendTransaction = async () => {
//     setAction('sendTransaction');

//     const addressA = await sdk?.wallet.getAddress();
//     console.log('Address: ', addressA);
//     console.log('signer: ', sdk?.getSigner());

//     const encodedData = contract.encoder.encode(
//       'safeTransferFrom(address,address,uint256)',
//       [
//         '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
//         '0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803',
//         1,
//       ],
//     );

//     sdk
//       ?.getSigner()
//       ?.sendTransaction({
//         from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
//         to: contract.getAddress(),
//         data: encodedData,
//       })
//       .then(tx => {
//         console.log('tx', tx);
//       })
//       .catch(error => {
//         console.log('sendTransaction.error', error);
//       });
//   };

//   const mint = async () => {
//     setAction('mint');
//     console.log('mint');
//     const metadatas = [
//       {
//         name: 'Minted from app',
//         description: 'Testing contract.mint',
//         external_url:
//           'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg',
//       },
//     ];

//     // contract.erc721
//     //   .mint()
//     // contract.erc721
//     //   .lazyMint(metadatas)
//     //   .then(tx => {
//     //     console.log('tx', tx);
//     //   })
//     //   .catch(error => {
//     //     console.log('sendTransaction.error', error);
//     //   });

//     contract.erc721
//       .lazyMint([{name: 'test NFT'}])
//       .then(tx => {
//         console.log('tx', tx);
//       })
//       .catch(error => {
//         console.log('sendTransaction.error', error);
//       });

//     // contract.erc721
//     //   .claim(1)
//     //   .then(tx => {
//     //     console.log('tx', tx);
//     //   })
//     //   .catch(error => {
//     //     console.log('sendTransaction.error', error);
//     //   });

//     // const addressA = await sdk?.wallet.getAddress();
//     // console.log('Address: ', addressA);
//     // console.log('signer: ', sdk?.getSigner());

//     // const encodedData = contract.encoder.encode(
//     //   'safeTransferFrom(address,address,uint256)',
//     //   [
//     //     '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
//     //     '0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803',
//     //     1,
//     //   ],
//     // );

//     // sdk
//     //   ?.getSigner()
//     //   ?.sendTransaction({
//     //     from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
//     //     to: contract.getAddress(),
//     //     data: encodedData,
//     //   })
//   };

//   const onMintNftPress = async () => {
//     mint();

//     deepLink('', 'wc://');
//   };

//   const onClaimPress = async () => {
//     contract.erc721.claimTo(claimAddress, 1)
//       .then(tx => {
//         log('claim', tx);
//       })
//       .catch(error => {
//         log('claim.error', error);
//       });
//     deepLink('', 'wc://');
//   };

//   const onSendTransactionPress = async () => {
//     sendTransaction();

//     deepLink('', 'wc://');
//   };

//   const signMessage = () => {
//     sdk?.wallet
//       .sign(message)
//       .then(tx => {
//         console.log('response', tx);
//       })
//       .catch(error => log('sign.error', error));

//     deepLink('', 'wc://');
//   };
  
//   const onSignPress = () => {
//     sdk?.updateSignerOrProvider(web3Provider.getSigner());

//     signMessage();
//   }

//   return (
//     <View style={styles.nftBalance}>
//       <TouchableOpacity
//         style={styles.touchable}
//         onPress={onSendTransactionPress}>
//         <Text style={styles.connectText}>Send Transaction</Text>
//       </TouchableOpacity>

//       <TextInput style={styles.textInput} placeholder='Claim Address' onChangeText={setClaimAddress} />
//       <TouchableOpacity style={styles.touchable} onPress={onClaimPress}>
//         <Text style={styles.connectText}>Claim NFT</Text>
//       </TouchableOpacity>
//       <TextInput style={styles.textInput} placeholder='Message to Sign' onChangeText={setMessage} />
//       <TouchableOpacity style={styles.touchable} onPress={onSignPress}>
//         <Text style={styles.connectText}>Sign Message</Text>
//       </TouchableOpacity>
//       <View
//         style={styles.scrollViewContainer}>
//         <ScrollView>
//           {/* {ownerBalance !== undefined ? (
//             <Text>Owner balance: {ownerBalance.toNumber()}</Text>
//           ) : null} */}
//           <Text style={styles.header}>Unclaimed NFTs</Text>
//           {unclaimedNfts && unclaimedNfts.length > 0
//             ? unclaimedNfts.map(nft => {
//                 return (
//                   <View key={nft.name} style={styles.nftView}>
//                     <Text>Name: {nft.name}</Text>
//                     {nft?.image ? (
//                       <Image style={styles.image} source={{uri: nft?.image}} />
//                     ) : null}
//                   </View>
//                 );
//               })
//             : null}
//           <Text style={styles.header}>Claimed NFTs</Text>
//           {nfts && nfts.length > 0
//             ? nfts.map(nft => {
//                 return (
//                   <View key={nft.metadata.name} style={styles.nftView}>
//                     <Text>Name: {nft.metadata.name}</Text>
//                     {nft?.metadata.image ? (
//                       <Image
//                         style={styles.image}
//                         source={{uri: nft?.metadata.image}}
//                       />
//                     ) : null}
//                   </View>
//                 );
//               })
//             : null}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  scrollViewContainer: {
    flex: 1,
  },
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
    marginTop: 10,
    flex: 1,
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
    marginTop: 5,
    marginBottom: 5,
  },
  backgroundStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});


export default App;
