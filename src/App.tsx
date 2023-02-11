/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {deepLink, log}   from './utils';

import { Chain, useAccount } from 'wagmi';
import { ThirdwebProvider, useThirdwebProvider } from './react-native/full';
import { useWalletConnectClient } from './ClientContext';
import {initAsyncStorageInspector} from 'asyncstorage-inspector-flipper';
import { WalletConnectConnector } from 'wagmi/dist/connectors/walletConnect';
import { useAddress, useContract, useSDK } from '@thirdweb-dev/react-core';
import { useWalletConnect } from './react-native/useWalletConnect';
import { useDisconnect } from './react-native/useWalletDisconnect';

const TRUST_APP_URL = 'https://link.trustwallet.com';

initAsyncStorageInspector();

const App = () => {
  return (
      <ThirdwebProvider>
        <AppInner />
      </ThirdwebProvider>
      // <ClientContextProvider>
      //   <AppInnerCtx />
      // </ClientContextProvider>
  );
};

const AppInnerCtx = () => {
  const {client,
    session,
    disconnect,
    chain,
    accounts,
    balances,
    chainData,
    isFetchingBalances,
    isInitializing,
    connect,
    web3Provider,
  } = useWalletConnectClient();

  const onPress = () => {
    connect('eip155:1');
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Button title={"Connect"} onPress={onPress} />
      {/* {isInitializing ? (
        <ActivityIndicator />
      ) : (
        <ConnectionSection session={session} connect={connect} />
      )}
      <ContractLoader onContractLoaded={setContract} />
      {contract ? <ContractActions contract={contract} /> : null} */}
    </SafeAreaView>
  );
}

const AppInner = () => {

  const disconnect = useDisconnect()

  const address = useAddress();
  console.log('useAddress', address);

  const sdk = useSDK();
  console.log('sdk.Signer', sdk?.getSigner())

  const {contract} = useContract('0xb8A3454db7042Ee72C93b42565357A2e13967FD4')

  const {connector, connect, isLoading, isSuccess, connectError} = useWalletConnect()
  console.log('connector', isLoading, isSuccess, connectError)

  const { address: account } = useAccount()
  console.log('account', account)

  const onPress = () => {
    if (account) {
      disconnect();
    } else {
      connect();
    }
     

    // if (connector.connected) {
    //   disconnect()
    // } else {
    //   log('connect.onPress')
    //   const con = connector.connect()
    //   log('connect.onPress', con)
    // }

    // connector?.connect()
  };

  const signMessage = () => {
    console.log('sign.Message');

    sdk?.wallet
      .sign("Test Message")
      .then(tx => {
        log('response', tx);
      })
      .catch(error => log('sign.error', error));

      deepLink('', 'wc://');
  };

  const claim = async () => {
    if (!contract) {
      return;
    }

    console.log('claim')
    contract.erc721
      .claimTo('0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240', 1).then(tx => {
        console.log('tx', tx);
      })
      .catch(error => {
        console.log('sendTransaction.error', error);
      });

      deepLink('', 'wc://');
  }

  // if (isInitializing) {
  //   return <ActivityIndicator />
  // }

  return (
    <SafeAreaView style={styles.backgroundStyle}>

      <Text>{`Account: ${account}`}</Text>
      
      <Button title={account ? "Disconnect" : "Connect"} onPress={onPress} />

      <Button title={"Claim"} onPress={claim} />

      <Button title={"Sign Message"} onPress={signMessage} />
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
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
});


export default App;
