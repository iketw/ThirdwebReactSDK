/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useSDK, useUnclaimedNFTs} from '@thirdweb-dev/react';
import {useNFTs} from '@thirdweb-dev/react';
import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId, SmartContract} from '@thirdweb-dev/sdk';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {deepLink, log} from './utils';
import {ClientContextProvider, useWalletConnectClient} from './ClientContext';
import {ContractLoader} from './ContractLoader';
import {ConnectionSection} from './ConnectionSection';

const TRUST_APP_URL = 'https://link.trustwallet.com';

const App = () => {
  return (
    <ClientContextProvider>
      <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
        <AppInner />
      </ThirdwebProvider>
    </ClientContextProvider>
  );
};

const AppInner = () => {
  const [contract, setContract] = useState<SmartContract>();

  const sdk = useSDK();

  // Initialize the WalletConnect client.
  const {
    client,
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

  useEffect(() => {
    if (web3Provider) {
      log('updateSignerOrProvider');
      sdk?.updateSignerOrProvider(web3Provider.getSigner());

      web3Provider.on('debug', (a, b) => {
        console.log('onDebug', a.action);
      });
    }
  }, [sdk, web3Provider]);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      {isInitializing ? (
        <ActivityIndicator />
      ) : (
        <ConnectionSection session={session} connect={connect} />
      )}
      <ContractLoader onContractLoaded={setContract} />
      {contract ? <ContractActions contract={contract} /> : null}
    </SafeAreaView>
  );
};

const ContractActions = ({contract}: {contract: SmartContract}) => {
  const sdk = useSDK();

  const {web3Provider} = useWalletConnectClient();

  const [action, setAction] = useState('');

  const {
    data: unclaimedNfts,
    isLoading: isUclaimedNftLoading,
    error: unclaimedNftError,
  } = useUnclaimedNFTs(contract, {start: 0, count: 5});

  const {
    data: nfts,
    isLoading: isNftLoading,
    error: nftError,
  } = useNFTs(contract, {start: 0, count: 5});

  const sendTransaction = async () => {
    setAction('sendTransaction');

    const addressA = await sdk?.wallet.getAddress();
    console.log('Address: ', addressA);
    console.log('signer: ', sdk?.getSigner());

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
  };

  const mint = async () => {
    setAction('mint');
    console.log('mint');
    const metadatas = [
      {
        name: 'Minted from app',
        description: 'Testing contract.mint',
        external_url:
          'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg',
      },
    ];

    // contract.erc721
    //   .mint()
    // contract.erc721
    //   .lazyMint(metadatas)
    //   .then(tx => {
    //     console.log('tx', tx);
    //   })
    //   .catch(error => {
    //     console.log('sendTransaction.error', error);
    //   });

    contract.erc721
      .lazyMint([{name: 'test NFT'}])
      .then(tx => {
        console.log('tx', tx);
      })
      .catch(error => {
        console.log('sendTransaction.error', error);
      });

    // contract.erc721
    //   .claim(1)
    //   .then(tx => {
    //     console.log('tx', tx);
    //   })
    //   .catch(error => {
    //     console.log('sendTransaction.error', error);
    //   });

    // const addressA = await sdk?.wallet.getAddress();
    // console.log('Address: ', addressA);
    // console.log('signer: ', sdk?.getSigner());

    // const encodedData = contract.encoder.encode(
    //   'safeTransferFrom(address,address,uint256)',
    //   [
    //     '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
    //     '0xE79ee09bD47F4F5381dbbACaCff2040f2FbC5803',
    //     1,
    //   ],
    // );

    // sdk
    //   ?.getSigner()
    //   ?.sendTransaction({
    //     from: '0x0beECa30ea02FB3B6258e056d8d6Cff6fB7d7240',
    //     to: contract.getAddress(),
    //     data: encodedData,
    //   })
  };

  const onMintNftPress = async () => {
    mint();

    deepLink('', 'wc://');
  };

  const onClaim = async () => {
    // contract.erc721
    //   .claim(1)
    //   .then(tx => {
    //     log('claim', tx);
    //   })
    //   .catch(error => {
    //     log('claim.error', error);
    //   });
    // deepLink('', 'wc://');
  };

  const onSendTransactionPress = async () => {
    sendTransaction();

    deepLink('', 'wc://');
  };

  const onSignMessage = async () => {
    sdk?.updateSignerOrProvider(web3Provider.getSigner());

    sdk?.wallet
      .sign('Testing Thirdweb signing with WC UniversalProvider')
      .then(tx => {
        console.log('response', tx);
      })
      .catch(error => log('sign.error', error));

    deepLink('', 'wc://');
  };

  return (
    <View style={styles.nftBalance}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onSendTransactionPress}>
        <Text style={styles.connectText}>Send Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={onClaim}>
        <Text style={styles.connectText}>Claim NFT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={onSignMessage}>
        <Text style={styles.connectText}>Sign Message</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
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
        </ScrollView>
      </View>
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
    marginBottom: 10,
  },
  backgroundStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});

export default App;
