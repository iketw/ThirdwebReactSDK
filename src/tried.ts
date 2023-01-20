    // Linking.openURL(
    //   'https://link.trustwallet.com/wc?uri=wc%3A69b1612cf8c2747e12d4a9c5003f4dc47128248e48bab503263d784944c0f5c1%402%3Frelay-protocol%3Dirn%26symKey%3D2e649ad0ca823d9620fc7cd1edf8d79f800b03ff526d6546bebd6d742cecd7ee',
    // );
    // connectWithCoinbaseWallet();
    // Linking.openURL(
    //   'wc://02a39826e5ce6786a76fb864880557d77536156c9dbb1455dddd0e7d58ce1a4c@2?relay-protocol=irn&symKey=597d29663e51439c7e1f741541305860d92ea9fba97c7f93a4eefdbad0273805',
    // );
    // Linking.openURL('market://search?q=pname:" + "com.thirdparty.package"');
    // sdk?.updateSignerOrProvider();
    // const proposalNamespace = {
    //   eip155: {
    //     chains: ['eip155:5'],
    //     methods: ['eth_signTransaction', 'eth_sendTransaction'],
    //     events: ['connect', 'disconnect'],
    //   },
    // };
    // const {uri, approval} = await signClient.connect({
    //   requiredNamespaces: proposalNamespace,
    // });
    // console.log('uri', uri);
    // const session = await approval();
    // console.log('session', session);


    // Linking.openURL(
    //     `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`,
    //   );
    //   const urie = encodeURIComponent(uri.replace('wc:', 'wc://'));
    //   console.log('enconded uri', urie);
    //   Linking.openURL(urie);
      //
      // Linking.openURL(
      //   'uri=wc%3A0a88ae0c3d4b7c5fbc04f36bc4cfcc131c18818fddff2bbbadbe7b7cd557aeb1%402%3Frelay-protocol%3Dirn%26symKey%3Dc0f0a01c180499349c731e2b82a1f31f3f701983cb62c119328f920763abffb7)',
      // );


    // useEffect(() => {
    //     async function init() {
    //       //  Initialize the provider
    //       provider = await UniversalProvider.init({
    //         logger: 'info',
    //         relayUrl: 'wss://relay.walletconnect.com',
    //         projectId: '145769e410f16970a79ff77b2d89a1e0',
    //         metadata: {
    //           name: 'React Native DApp',
    //           description: 'React Native DApp for WalletConnect',
    //           url: 'https://walletconnect.com/',
    //           icons: ['https://avatars.githubusercontent.com/u/37784886'],
    //         },
    //         client: undefined,
    //       });
    
    //       // Subscribe for pairing URI
    //       provider.on('display_uri', uri => {
    //         console.log('uri', uri);
    //         Linking.openURL(
    //           `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`,
    //         );
    //         const urie = encodeURIComponent(uri.replace('wc:', 'wc://'));
    //         console.log('enconded uri', urie);
    //         Linking.openURL(urie);
    //         //
    //         // Linking.openURL(
    //         //   'uri=wc%3A0a88ae0c3d4b7c5fbc04f36bc4cfcc131c18818fddff2bbbadbe7b7cd557aeb1%402%3Frelay-protocol%3Dirn%26symKey%3Dc0f0a01c180499349c731e2b82a1f31f3f701983cb62c119328f920763abffb7)',
    //         // );
    //       });
    
    //       // Subscribe to session ping
    //       provider.on('session_ping', ({id, topic}) => {
    //         console.log('id,topic: ', id, topic);
    //       });
    
    //       // Subscribe to session event
    //       provider.on('session_event', ({event, chainId}) => {
    //         console.log('event, chainId', event, chainId);
    //       });
    
    //       // Subscribe to session update
    //       provider.on('session_update', ({topic, params}) => {
    //         console.log('topic,params: ', topic, params);
    //       });
    
    //       // Subscribe to session delete
    //       provider.on('session_delete', ({id, topic}) => {
    //         console.log('id,topic', id, topic);
    //       });
    
    //       // const web3Provider = new providers.Web3Provider(provider);
    
    //       // sdk?.updateSignerOrProvider(web3Provider);
    //     }
    
    //     if (initialized) {
    //       init();
    //     }
    //   }, [initialized, sdk]);