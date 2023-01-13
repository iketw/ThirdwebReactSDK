'use strict';

var sdk = require('@thirdweb-dev/sdk');
var React = require('react');
var wagmi = require('wagmi');
var coinbaseWallet = require('wagmi/connectors/coinbaseWallet');
var injected = require('wagmi/connectors/injected');
var walletConnect = require('wagmi/connectors/walletConnect');
var jsxRuntime = require('react/jsx-runtime');
var requiredParam = require('./required-param-6137b9c0.cjs.prod.js');
var reactQuery = require('@tanstack/react-query');
var ethers = require('ethers');
var invariant = require('tiny-invariant');
var useConnect = require('./useConnect-9749ad27.cjs.prod.js');
var detectBrowser = require('detect-browser');
var buffer = require('buffer');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var invariant__default = /*#__PURE__*/_interopDefault(invariant);

const ThirdwebAuthConfigContext = /*#__PURE__*/React.createContext(undefined);
const ThirdwebAuthConfigProvider = _ref => {
  let {
    value,
    children
  } = _ref;
  // Remove trailing slash from URL if present
  const authConfig = React.useMemo(() => value ? {
    ...value,
    authUrl: value.authUrl.replace(/\/$/, "")
  } : undefined, [value]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebAuthConfigContext.Provider, {
    value: authConfig,
    children: children
  });
};
function useThirdwebAuthConfig() {
  return React.useContext(ThirdwebAuthConfigContext);
}

const chain = {
  mainnet: {
    id: sdk.ChainId.Mainnet,
    name: "Ethereum Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Mainnet],
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://etherscan.io"
    }]
  },
  goerli: {
    id: sdk.ChainId.Goerli,
    name: "Goerli",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Goerli],
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://goerli.etherscan.io"
    }],
    testnet: true
  },
  polygonMainnet: {
    id: sdk.ChainId.Polygon,
    name: "Polygon Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Polygon],
    rpcUrls: ["https://polygon-rpc.com", "https://rpc-mainnet.matic.network", "https://matic-mainnet.chainstacklabs.com", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet-full-rpc.bwarelabs.com"],
    blockExplorers: [{
      name: "Polygonscan",
      url: "https://polygonscan.com"
    }]
  },
  polygonTestnetMumbai: {
    id: sdk.ChainId.Mumbai,
    name: "Mumbai",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Mumbai],
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com", "https://rpc-mumbai.maticvigil.com", "https://matic-testnet-archive-rpc.bwarelabs.com"],
    blockExplorers: [{
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com"
    }],
    testnet: true
  },
  avalanche: {
    id: sdk.ChainId.Avalanche,
    name: "Avalanche",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Avalanche],
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc", "https://rpc.ankr.com/avalanche"],
    blockExplorers: [{
      name: "SnowTrace",
      url: "https://snowtrace.io/"
    }],
    testnet: false
  },
  avalancheFujiTestnet: {
    id: sdk.ChainId.AvalancheFujiTestnet,
    name: "Avalanche Fuji Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.AvalancheFujiTestnet],
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorers: [{
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io/"
    }],
    testnet: true
  },
  fantom: {
    id: sdk.ChainId.Fantom,
    name: "Fantom Opera",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Fantom],
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorers: [{
      name: "FTMscan",
      url: "https://ftmscan.com/"
    }],
    testnet: false
  },
  fantomTestnet: {
    id: sdk.ChainId.FantomTestnet,
    name: "Fantom Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.FantomTestnet],
    rpcUrls: ["https://rpc.testnet.fantom.network"],
    blockExplorers: [{
      name: "FTMscan",
      url: "https://testnet.ftmscan.com/"
    }],
    testnet: true
  },
  optimism: {
    id: sdk.ChainId.Optimism,
    name: "Optimism",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Optimism],
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://optimistic.etherscan.io/"
    }],
    testnet: false
  },
  optimismGoerli: {
    id: sdk.ChainId.OptimismGoerli,
    name: "Optimism Goerli Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.OptimismGoerli],
    rpcUrls: ["https://goerli.optimism.io/"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io/"
    }],
    testnet: true
  },
  arbitrum: {
    id: sdk.ChainId.Arbitrum,
    name: "Arbitrum One",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Arbitrum],
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorers: [{
      name: "Arbiscan",
      url: "https://arbiscan.io/"
    }],
    testnet: false
  },
  arbitrumGoerli: {
    id: sdk.ChainId.ArbitrumGoerli,
    name: "Arbitrum Goerli",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.ArbitrumGoerli],
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc/"],
    blockExplorers: [{
      name: "Arbitrum Goerli Rollup Explorer",
      url: "https://goerli-rollup-explorer.arbitrum.io"
    }],
    testnet: true
  },
  binanceSmartChainMainnet: {
    id: sdk.ChainId.BinanceSmartChainMainnet,
    name: "Binance Smart Chain Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.BinanceSmartChainMainnet],
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    blockExplorers: [{
      name: "BscScan",
      url: "https://bscscan.com/"
    }],
    testnet: false
  },
  binanceSmartChainTestnet: {
    id: sdk.ChainId.BinanceSmartChainTestnet,
    name: "Binance Smart Chain Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.BinanceSmartChainTestnet],
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorers: [{
      name: "BscScan",
      url: "https://testnet.bscscan.com/"
    }],
    testnet: true
  }
};
const defaultSupportedChains = Object.values(chain);

const ThirdwebConfigContext = /*#__PURE__*/React.createContext({
  rpcUrlMap: sdk.DEFAULT_RPC_URLS,
  supportedChains: defaultSupportedChains
});
const ThirdwebConfigProvider = _ref => {
  let {
    value,
    children
  } = _ref;
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConfigContext.Provider, {
    value: value,
    children: children
  });
};
function useThirdwebConfigContext() {
  return React.useContext(ThirdwebConfigContext);
}

const INITIAL_CONTEXT_VALUE = {
  wallet: undefined,
  address: undefined,
  chainId: undefined,
  signer: undefined
};
const ThirdwebConnectedWalletContext = /*#__PURE__*/React.createContext(INITIAL_CONTEXT_VALUE);
const ThirdwebConnectedWalletProvider = _ref => {
  let {
    signer,
    children
  } = _ref;
  const {
    rpcUrlMap
  } = useThirdwebConfigContext();
  const [contextValue, setContextValue] = React.useState({
    ...INITIAL_CONTEXT_VALUE,
    signer: signer ? signer : undefined
  });
  React.useEffect(() => {
    setContextValue(val => ({
      ...val,
      signer: signer ? signer : undefined
    }));
  }, [signer]);
  React.useEffect(() => {
    let s = signer;
    if (signer) {
      // just get both of these up front and keep them around with the context
      Promise.all([signer.getAddress(), signer.getChainId()]).then(_ref2 => {
        let [address, chainId] = _ref2;
        const rpcUrl = rpcUrlMap[chainId];
        // only if the signer is still the same!
        if (signer === s) {
          const wallet = new sdk.UserWallet(signer, {
            readonlySettings: rpcUrl ? {
              rpcUrl,
              chainId
            } : undefined
          });
          setContextValue({
            wallet,
            address,
            chainId,
            signer
          });
        }
      }).catch(err => {
      });
    } else {
      // if signer is not provided, re-set the context value to initial values
      setContextValue(INITIAL_CONTEXT_VALUE);
    }
    return () => {
      // set the previous signer to undefined because it is invalid now
      s = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConnectedWalletContext.Provider, {
    value: contextValue,
    children: children
  });
};
function useThirdwebConnectedWalletContext() {
  return React.useContext(ThirdwebConnectedWalletContext);
}

const ThirdwebSDKContext = /*#__PURE__*/React.createContext({
  desiredChainId: -1
});
/**
 *
 * @internal
 */
const WrappedThirdwebSDKProvider = _ref => {
  let {
    sdkOptions,
    desiredChainId,
    storageInterface,
    provider,
    queryClient,
    authConfig,
    children
  } = _ref;
  const {
    signer
  } = useThirdwebConnectedWalletContext();
  const [sdk$1, setSDK] = React.useState();
  React.useEffect(() => {
    if (!desiredChainId || typeof window === "undefined") {
      return undefined;
    }
    const _sdk = new sdk.ThirdwebSDK(provider, sdkOptions, storageInterface);
    // if we already have a signer from the wallet context, use it immediately
    if (signer) {
      _sdk.updateSignerOrProvider(signer);
    }
    _sdk._constructedAt = Date.now();
    _sdk._chainId = desiredChainId;
    setSDK(_sdk);

    // explicitly *not* passing the signer, if we have it we use it if we don't we don't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, sdkOptions, storageInterface, desiredChainId]);
  React.useEffect(() => {
    if (sdk$1 && sdk$1._chainId === desiredChainId) {
      if (signer) {
        sdk$1.updateSignerOrProvider(signer);
      } else {
        sdk$1.updateSignerOrProvider(provider);
      }
    }
  }, [signer, sdk$1, desiredChainId, provider]);
  const ctxValue = React.useMemo(() => ({
    sdk: sdk$1,
    desiredChainId: desiredChainId || -1,
    _inProvider: true
  }), [desiredChainId, sdk$1]);
  return /*#__PURE__*/jsxRuntime.jsx(requiredParam.QueryClientProviderWithDefault, {
    queryClient: queryClient,
    children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebAuthConfigProvider, {
      value: authConfig,
      children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKContext.Provider, {
        value: ctxValue,
        children: children
      })
    })
  });
};

/**
 * A basic wrapper around the Thirdweb SDK.
 *
 * You can use this in order to be able to pass a provider & signer directly to the SDK.
 *
 * @remarks Utilizing this provider will mean hooks for wallet management are not available, if you need those please use the {@link ThirdwebProvider} instead.
 *
 * @public
 */
const ThirdwebSDKProvider = _ref2 => {
  let {
    signer,
    children,
    ...restProps
  } = _ref2;
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConnectedWalletProvider, {
    signer: signer,
    children: /*#__PURE__*/jsxRuntime.jsx(WrappedThirdwebSDKProvider, {
      ...restProps,
      children: children
    })
  });
};

/**
 * @internal
 */
function useSDKContext() {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant__default["default"](ctx._inProvider, "useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?");
  return ctx;
}

/**
 *
 * @returns {@link ThirdwebSDK}
 * Access the instance of the thirdweb SDK created by the ThirdwebProvider
 * to call methods using the connected wallet on the desiredChainId.
 * @example
 * ```javascript
 * const sdk = useSDK();
 * ```
 */
function useSDK() {
  const {
    sdk
  } = useSDKContext();
  return sdk;
}

/**
 * @internal
 */
function useDesiredChainId() {
  const {
    desiredChainId
  } = useSDKContext();
  return desiredChainId;
}

/**
 * @internal
 */
function useSDKChainId() {
  const sdk = useSDK();
  return sdk?._chainId;
}

// SDK handles this under the hood for us

const defaultdAppMeta = {
  name: "thirdweb powered dApp"
};
const defaultWalletConnectors = ["metamask", "walletConnect", "walletLink"];

/**
 *
 * The `<ThirdwebProvider />` component lets you control what networks you want users to connect to, what types of wallets can connect to your app, and the settings for the [Typescript SDK](https://docs.thirdweb.com/typescript).
 *
 * @example
 * You can wrap your application with the provider as follows:
 *
 * ```jsx title="App.jsx"
 * import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   return (
 *     <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
 *       <YourApp />
 *     </ThirdwebProvider>
 *   );
 * };
 * ```
 *
 * @public
 *
 */
const ThirdwebProvider = _ref => {
  let {
    sdkOptions,
    chainRpc = sdk.DEFAULT_RPC_URLS,
    supportedChains = defaultSupportedChains.map(c => c.id),
    walletConnectors = defaultWalletConnectors,
    dAppMeta = defaultdAppMeta,
    desiredChainId,
    authConfig,
    storageInterface,
    queryClient,
    autoConnect = true,
    children
  } = _ref;
  // construct the wagmi options

  const _supporrtedChains = React.useMemo(() => {
    return supportedChains.map(c => {
      if (typeof c === "number") {
        return defaultSupportedChains.find(sc => sc.id === c);
      }
      return c;
    }).filter(c => c !== undefined);
  }, [supportedChains]);
  const _rpcUrlMap = React.useMemo(() => {
    return _supporrtedChains.reduce((prev, curr) => {
      prev[curr.id] = curr.id in chainRpc ? sdk.getProviderForNetwork(chainRpc[curr.id] || curr.rpcUrls[0]) : curr.rpcUrls[0];
      return prev;
    }, {});
  }, [chainRpc, _supporrtedChains]);
  const wagmiProps = React.useMemo(() => {
    const walletConnectClientMeta = {
      name: dAppMeta.name,
      url: dAppMeta.url || "",
      icons: [dAppMeta.logoUrl || ""],
      description: dAppMeta.description || ""
    };
    const walletLinkClientMeta = {
      appName: dAppMeta.name,
      appLogoUrl: dAppMeta.logoUrl,
      darkMode: dAppMeta.isDarkMode
    };
    return {
      autoConnect,
      connectorStorageKey: "tw:provider:connectors",
      connectors: _ref2 => {
        let {
          chainId
        } = _ref2;
        return walletConnectors.map(connector => {
          if (connector instanceof wagmi.Connector) {
            return connector;
          }
          // injected connector
          if (typeof connector === "string" && (connector === "injected" || connector === "metamask") || typeof connector === "object" && (connector.name === "injected" || connector.name === "metamask")) {
            return new injected.InjectedConnector({
              options: typeof connector === "string" ? {
                shimDisconnect: true,
                shimChainChangedDisconnect: true
              } : connector.options,
              chains: _supporrtedChains
            });
          }
          if (typeof connector === "string" && connector === "walletConnect" || typeof connector === "object" && connector.name === "walletConnect") {
            return new walletConnect.WalletConnectConnector({
              options: typeof connector === "string" ? {
                chainId,
                rpc: _rpcUrlMap,
                clientMeta: walletConnectClientMeta,
                qrcode: true
              } : {
                chainId,
                rpc: _rpcUrlMap,
                clientMeta: walletConnectClientMeta,
                qrcode: true,
                ...connector.options
              },
              chains: _supporrtedChains
            });
          }
          if (typeof connector === "string" && (connector === "coinbase" || connector === "walletLink") || typeof connector === "object" && (connector.name === "coinbase" || connector.name === "walletLink")) {
            const jsonRpcUrl = _rpcUrlMap[chainId || desiredChainId || 1];
            return new coinbaseWallet.CoinbaseWalletConnector({
              chains: _supporrtedChains,
              options: typeof connector === "string" ? {
                ...walletLinkClientMeta,
                jsonRpcUrl
              } : {
                ...walletLinkClientMeta,
                jsonRpcUrl,
                ...connector.options
              }
            });
          }
          return null;
        }).filter(c => c !== null);
      }
    };
  }, [dAppMeta.name, dAppMeta.url, dAppMeta.logoUrl, dAppMeta.description, dAppMeta.isDarkMode, autoConnect, walletConnectors, _supporrtedChains, _rpcUrlMap, desiredChainId]);
  const readonlySettings = React.useMemo(() => {
    if (sdkOptions?.readonlySettings?.rpcUrl && sdkOptions?.readonlySettings?.chainId) {
      return sdkOptions.readonlySettings;
    }
    if (!desiredChainId) {
      return undefined;
    }
    let rpcUrl = _rpcUrlMap[desiredChainId];
    try {
      rpcUrl = sdk.getProviderForNetwork(rpcUrl);
    } catch (e) {
      console.error(`failed to configure rpc url for chain: "${desiredChainId}". Did you forget to pass "desiredChainId" to the <ThirdwebProvider /> component?`);
      // cannot set readonly without a valid rpc url
      return undefined;
    }
    return {
      chainId: desiredChainId,
      rpcUrl
    };
  }, [_rpcUrlMap, desiredChainId, sdkOptions?.readonlySettings]);
  const sdkOptionsWithDefaults = React.useMemo(() => {
    const opts = sdkOptions;
    return {
      ...opts,
      readonlySettings
    };
  }, [sdkOptions, readonlySettings]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConfigProvider, {
    value: {
      rpcUrlMap: _rpcUrlMap,
      supportedChains: _supporrtedChains
    },
    children: /*#__PURE__*/jsxRuntime.jsx(wagmi.WagmiProvider, {
      ...wagmiProps,
      children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKProviderWagmiWrapper, {
        queryClient: queryClient,
        desiredChainId: desiredChainId,
        sdkOptions: sdkOptionsWithDefaults,
        storageInterface: storageInterface,
        authConfig: authConfig,
        children: children
      })
    })
  });
};
const ThirdwebSDKProviderWagmiWrapper = _ref3 => {
  let {
    children,
    ...props
  } = _ref3;
  const provider = wagmi.useProvider();
  const [signer] = wagmi.useSigner();
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKProvider, {
    signer: signer.data,
    provider: provider,
    ...props,
    children: children
  });
};

const TW_CACHE_KEY_PREFIX = "tw-cache";

/**
 * @internal
 */
function enforceCachePrefix(input) {
  return [TW_CACHE_KEY_PREFIX, ...input.filter(i => typeof i !== "string" || i !== TW_CACHE_KEY_PREFIX)];
}

/**
 * @internal
 */
function createContractCacheKey() {
  let contractAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ethers.constants.AddressZero;
  let input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return enforceCachePrefix(["contract", contractAddress, ...input]);
}

/**
 @internal
 */
function createCacheKeyWithNetwork(input, chainId) {
  return enforceCachePrefix(cacheKeys.network.active(chainId).concat(input));
}

/**
 * @internal
 */
function invalidateContractAndBalances(queryClient, contractAddress, chainId) {
  return Promise.all([queryClient.invalidateQueries(enforceCachePrefix(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), chainId))), queryClient.invalidateQueries(enforceCachePrefix(createCacheKeyWithNetwork(["balance"], chainId)))]);
}

/**
 @internal
 */
const cacheKeys = {
  auth: {
    user: () => enforceCachePrefix(["user"])
  },
  network: {
    active: chainId => enforceCachePrefix(["chainId", chainId])
  },
  wallet: {
    balance: (chainId, walletAddress, tokenAddress) => enforceCachePrefix(createCacheKeyWithNetwork(enforceCachePrefix(["balance", {
      walletAddress,
      tokenAddress
    }]), chainId))
  },
  contract: {
    read: (contractAddress, fnIdentity) => createContractCacheKey(contractAddress, ["read", fnIdentity]),
    type: contractAddress => createContractCacheKey(contractAddress, ["contract-type"]),
    compilerMetadata: contractAddress => createContractCacheKey(contractAddress, ["publish-metadata"]),
    typeAndCompilerMetadata: contractAddress => createContractCacheKey(contractAddress, ["contract-type-and-metadata"]),
    metadata: contractAddress => createContractCacheKey(contractAddress, ["metadata"]),
    extractFunctions: contractAddress => createContractCacheKey(contractAddress, ["extractFunctions"]),
    call: (contractAddress, functionName, args) => createContractCacheKey(contractAddress, ["call", functionName, args]),
    events: {
      getEvents: (contractAddress, eventName) => createContractCacheKey(contractAddress, ["events", "getEvents", {
        eventName
      }]),
      getAllEvents: contractAddress => createContractCacheKey(contractAddress, ["events", "getAllEvents"])
    },
    // specific contract types
    nft: {
      get: (contractAddress, tokenId) => createContractCacheKey(contractAddress, ["get", {
        tokenId
      }]),
      balanceOf: (contractAddress, owner, tokenId) => createContractCacheKey(contractAddress, ["balanceOf", {
        owner,
        tokenId
      }]),
      query: {
        all: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["query", "all", params] : ["query", "all"]),
        totalCirculatingSupply: contractAddress => createContractCacheKey(contractAddress, ["query", "totalCirculatingSupply"]),
        totalCount: contractAddress => createContractCacheKey(contractAddress, ["query", "totalCount"]),
        owned: {
          all: (contractAddress, owner) => createContractCacheKey(contractAddress, ["query", "owned", "all", owner])
        }
      },
      drop: {
        getAllUnclaimed: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getAllUnclaimed", params] : ["getAllUnclaimed"]),
        totalUnclaimedSupply: contractAddress => createContractCacheKey(contractAddress, ["totalUnclaimedSupply"]),
        totalClaimedSupply: contractAddress => createContractCacheKey(contractAddress, ["totalClaimedSupply"]),
        revealer: {
          getBatchesToReveal: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getBatchesToReveal", params] : ["getBatchesToReveal"])
        }
      }
    },
    token: {
      totalSupply: contractAddress => createContractCacheKey(contractAddress, ["totalSupply"]),
      decimals: contractAddress => createContractCacheKey(contractAddress, ["decimals"]),
      balanceOf: (contractAddress, walletAddress) => createContractCacheKey(contractAddress, ["balanceOf", {
        walletAddress
      }])
    },
    marketplace: {
      getListing: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["getListing", {
        listingId
      }]),
      getAllListings: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getAllListings", params] : ["getAllListings"]),
      getTotalCount: contractAddress => createContractCacheKey(contractAddress, ["getTotalCount"]),
      getActiveListings: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getActiveListings", params] : ["getActiveListings"]),
      getBidBufferBps: contractAddress => createContractCacheKey(contractAddress, ["getBidBufferBps"]),
      auction: {
        getWinningBid: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["auction", "getWinningBid", {
          listingId
        }]),
        getWinner: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["auction", "getWinner", {
          listingId
        }])
      }
    }
  },
  // extensions
  extensions: {
    claimConditions: {
      getActive: (contractAddress, tokenId, options) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getActive", {
        tokenId
      }, options] : ["claimConditions", "getActive", options]),
      getAll: (contractAddress, tokenId, options) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getAll", {
        tokenId
      }, options] : ["claimConditions", "getAll", options]),
      getClaimerProofs: (contractAddress, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getClaimerProofs", {
        tokenId
      }] : ["claimConditions", "getClaimerProofs"]),
      getClaimIneligibilityReasons: (contractAddress, params, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getIneligibilityReasons", {
        tokenId
      }, params] : ["claimConditions", "getIneligibilityReasons", params]),
      // combinations of queries cache keys
      useActiveClaimConditionForWallet: (contractAddress, walletAddress, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "useActiveClaimConditionForWallet", {
        tokenId,
        walletAddress
      },,] : ["claimConditions", "getIneligibilityReasons", {
        walletAddress
      }])
    },
    // primary sale contracts
    sales: {
      getRecipient: contractAddress => createContractCacheKey(contractAddress, ["sales"])
    },
    // royalties
    royalties: {
      getDefaultRoyaltyInfo: contractAddress => createContractCacheKey(contractAddress, ["royalties"])
    },
    // platform fees
    platformFees: {
      get: contractAddress => createContractCacheKey(contractAddress, ["platformFees"])
    },
    // contract metadata
    metadata: {
      get: contractAddress => createContractCacheKey(contractAddress, ["metadata"])
    },
    roles: {
      getAll: contractAddress => createContractCacheKey(contractAddress, ["roles"]),
      get: (contractAddress, role) => createContractCacheKey(contractAddress, ["roles", {
        role
      }])
    }
  }
};

/** @internal */
function useQueryWithNetwork(queryKey, queryFn, options) {
  const activeChainId = useSDKChainId();
  const mergedOptions = {
    ...options,
    enabled: !!(activeChainId && options?.enabled)
  };
  return reactQuery.useQuery(createCacheKeyWithNetwork(queryKey, activeChainId), queryFn, mergedOptions);
}

/**
 * A hook to get the native or (optional) ERC20 token balance of the connected wallet.
 *
 * @param tokenAddress - the address of the token contract, if empty will use the chain's native token
 * @returns the balance of the connected wallet (native or ERC20)
 * @beta
 */
function useBalance(tokenAddress) {
  const walletAddress = useAddress();
  const {
    wallet,
    address,
    chainId
  } = useThirdwebConnectedWalletContext();
  const cacheKey = React.useMemo(() => {
    return cacheKeys.wallet.balance(chainId || -1, address, tokenAddress);
  }, [chainId, tokenAddress, address]);
  return reactQuery.useQuery(cacheKey, () => {
    return wallet?.balance(tokenAddress);
  }, {
    // if user is not logged in no reason to try to fetch
    enabled: !!wallet && !!walletAddress && !!chainId,
    retry: true,
    keepPreviousData: false
  });
}

/**
 * @internal
 */
function useConnectedWallet() {
  return useThirdwebConnectedWalletContext().wallet;
}

/**
 * Hook for accessing the address of the connected wallet
 *
 * ```javascript
 * import { useAddress } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * To get the address of the connected wallet, you can use the hook as follows:
 *
 * ```javascript
 * import { useAddress } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const address = useAddress()
 *
 *   return <div>{address}</div>
 * }
 * ```
 *
 * The `address` variable will hold the address of the connected wallet if a user has connected using one of the supported wallet connection hooks.
 *
 * @public
 */
function useAddress() {
  return useThirdwebConnectedWalletContext().address;
}

/**
 * Hook for accessing the chain ID of the network the current wallet is connected to
 *
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 * ```
 *
 * @example
 * You can get the chain ID of the connected wallet by using the hook as follows:
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const chainId = useChainId()
 *
 *   return <div>{chainId}</div>
 * }
 * ```
 * @public
 */
function useChainId() {
  return useThirdwebConnectedWalletContext().chainId;
}

// contract type

async function fetchContractType(contractAddress, sdk) {
  if (!contractAddress || !sdk) {
    return null;
  }
  try {
    return await sdk.resolveContractType(contractAddress);
  } catch (err) {
    console.error("failed to resolve contract type", err);
    // this error can happen if the contract is a custom contract -> assume "custom"
    return "custom";
  }
}
function useContractType(contractAddress) {
  const sdk = useSDK();
  return useQueryWithNetwork(cacheKeys.contract.type(contractAddress), () => fetchContractType(contractAddress, sdk),
  // is immutable, so infinite stale time
  {
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk
  });
}
const contractType = {
  cacheKey: (contractAddress, chainId) => createCacheKeyWithNetwork(cacheKeys.contract.type(contractAddress), chainId),
  useQuery: useContractType,
  fetchQuery: fetchContractType
};

// end contract type

// contract compiler metadata

function fetchCompilerMetadata(contractAddress, sdk) {
  if (!contractAddress || !sdk) {
    return null;
  }
  try {
    return sdk.getPublisher().fetchCompilerMetadataFromAddress(contractAddress);
  } catch (err) {
    // if we fail to get contract metadata just return null;
    return null;
  }
}
function useCompilerMetadata(contractAddress) {
  const sdk = useSDK();
  return useQueryWithNetwork(cacheKeys.contract.compilerMetadata(contractAddress), () => fetchCompilerMetadata(contractAddress, sdk),
  // is immutable, so infinite stale time
  {
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk
  });
}
const compilerMetadata = {
  cacheKey: (contractAddress, chainId) => createCacheKeyWithNetwork(cacheKeys.contract.compilerMetadata(contractAddress), chainId),
  useQuery: useCompilerMetadata,
  fetchQuery: fetchCompilerMetadata
};

// end compiler metadata

// useContract

function useContract(contractAddress, contractTypeOrABI) {
  const sdk = useSDK();
  const queryClient = reactQuery.useQueryClient();
  const activeChainId = useSDKChainId();
  const wallet = useAddress();
  const walletChainId = useChainId();

  // it's there because we put it there.
  const sdkTimestamp = sdk?._constructedAt;
  const contractQuery = useQueryWithNetwork(
  // need to add the wallet and walletChainId into the query key so this gets refreshed when the wallet / chain changes!
  requiredParam.neverPersist(["contract-instance", contractAddress, {
    wallet,
    walletChainId,
    sdkTimestamp
  }]), async () => {
    requiredParam.requiredParamInvariant(contractAddress, "contract address is required");
    invariant__default["default"](sdk, "SDK not initialized");
    invariant__default["default"](activeChainId, "active chain id is required");

    // if we don't have a contractType or ABI then we will have to resolve it regardless
    // we also handle it being "custom" just in case...
    if (!contractTypeOrABI || contractTypeOrABI === "custom") {
      // we just resolve here (sdk does this internally anyway)
      const resolvedContractType = await queryClient.fetchQuery(contractType.cacheKey(contractAddress, activeChainId), () => contractType.fetchQuery(contractAddress, sdk), {
        cacheTime: Infinity,
        staleTime: Infinity
      });
      let abi;
      if (resolvedContractType === "custom") {
        abi = (await queryClient.fetchQuery(compilerMetadata.cacheKey(contractAddress, activeChainId), () => compilerMetadata.fetchQuery(contractAddress, sdk), {
          cacheTime: Infinity,
          staleTime: Infinity,
          retry: 0
        }))?.abi;
      }
      invariant__default["default"](resolvedContractType, "failed to resolve contract type");
      // just let the sdk handle the rest
      // if we have resolved an ABI for a custom contract, use that otherwise use contract type
      return sdk.getContract(contractAddress, abi || resolvedContractType);
    }
    // every other case can just be handled by the sdk directly
    return sdk.getContract(contractAddress, contractTypeOrABI);
  }, {
    // keep the previous value around while we fetch the new one
    // this is important because otherwise it can lead to flickering (because we need to re-fetch the contract when sdk things change)
    keepPreviousData: true,
    // is immutable, so infinite cache & stale time (for a given key)
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk && !!activeChainId,
    // never retry
    retry: 0
  });

  // const previousCountract = usePrevious(contractQuery.data);

  return {
    ...contractQuery,
    data: contractQuery.data,
    contract: contractQuery.data
  };
}

/**
 * Use this to get the contract metadata for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractMetadata, isLoading, error } = useContractMetadata(>);
 * ```
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to get the metadata for
 * @returns a response object that includes the contract metadata of the deployed contract
 * @twfeature ContractMetadata
 * @beta
 */
function useContractMetadata(contract) {
  return useQueryWithNetwork(cacheKeys.contract.metadata(contract?.getAddress()), async () => {
    requiredParam.requiredParamInvariant(contract, "contract is required");
    return await contract.metadata.get();
  }, {
    enabled: !!contract
  });
}

/**
 * @internal
 */
function useContractMetadataUpdate(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async metadata => {
    requiredParam.requiredParamInvariant(contract, "contract must be defined");
    return contract.metadata.update(metadata);
  }, {
    onSettled: () => queryClient.invalidateQueries(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), activeChainId))
  });
}

/**
 * CONTRACT EVENTS
 */

/**
 * Use this to query (and subscribe) to events or a specific event on a contract.
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to listen to events for
 * @param eventName - the name of the event to query for (omit this or pass `undefined` to query for all events)
 * @param options - options incldues the filters ({@link QueryAllEvents}) for the query as well as if you want to subscribe to real-time updates (default: true)
 * @returns a response object that includes the contract events
 * @beta
 */
function useContractEvents(contract, eventName) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    subscribe: true
  };
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const activeChainId = useSDKChainId();
  const cacheKey = React.useMemo(() => createCacheKeyWithNetwork(eventName ? cacheKeys.contract.events.getAllEvents(contractAddress) : cacheKeys.contract.events.getEvents(contractAddress, eventName), activeChainId), [activeChainId, contractAddress, eventName]);
  React.useEffect(() => {
    // if we're not subscribing or query is not enabled yet we can early exit
    if (!options.subscribe || !contract || !contract) {
      return;
    }
    const cleanupListener = contract.events.listenToAllEvents(contractEvent => {
      // if we have a specific event name we are looking for we can early exist if it doesn't match
      if (eventName && eventName !== contractEvent.eventName) {
        return;
      }
      // insert new event to the front of the array (no duplicates, though)
      queryClient.setQueryData(cacheKey, oldData => {
        if (!oldData) {
          return [contractEvent];
        }
        const eventIsNotAlreadyInEventsList = oldData.findIndex(e => e.transaction.transactionHash === contractEvent.transaction.transactionHash && e.transaction.logIndex === contractEvent.transaction.logIndex) === -1;
        if (eventIsNotAlreadyInEventsList) {
          return [contractEvent, ...oldData];
        }
        return oldData;
      });
    });
    // cleanup listener on unmount
    return cleanupListener;
  }, [options.subscribe, cacheKey, contract, queryClient, eventName]);
  return reactQuery.useQuery(cacheKey, () => {
    requiredParam.requiredParamInvariant(contract, "contract must be defined");
    if (eventName) {
      return contract.events.getEvents(eventName, options.queryFilter);
    }
    return contract.events.getAllEvents(options.queryFilter);
  }, {
    enabled: !!contract,
    // we do not need to re-fetch if we're subscribing
    refetchOnWindowFocus: !options.subscribe,
    refetchOnMount: true,
    refetchOnReconnect: true
  });
}

/**
 * Use this to get data from a contract read-function call.
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { data, isLoading, error } = useContractRead(contract, "functionName", ...args);
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @param args - The arguments to pass to the function (if any), with optional call arguments as the last parameter
 * @returns a response object that includes the data returned by the function call
 *
 * @beta
 */
function useContractRead(contract, functionName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.call(contractAddress, functionName, args), () => {
    requiredParam.requiredParamInvariant(contract, "contract must be defined");
    requiredParam.requiredParamInvariant(functionName, "function name must be provided");
    return contract.call(functionName, ...args);
  }, {
    enabled: !!contract && !!functionName
  });
}

/**
 * Use this to get a function to make a write call to your contract
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { mutate: myFunction, isLoading, error } = useContractWrite(contract, "myFunction");
 *
 * // the function can be called as follows:
 * // myFunction(["param 1", "param 2", ...])
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @returns a response object that includes the write function to call
 *
 * @beta
 */
function useContractWrite(contract, functionName) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async callParams => {
    requiredParam.requiredParamInvariant(contract, "contract must be defined");
    requiredParam.requiredParamInvariant(functionName, "function name must be provided");
    if (!callParams?.length) {
      return contract.call(functionName);
    }
    return contract.call(functionName, ...callParams);
  }, {
    onSettled: () => queryClient.invalidateQueries(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), activeChainId))
  });
}

/**
 * Hook for getting an instance of an `EditionDrop` contract. This conract is used to interface with ERC1155 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the Edition Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "edition-drop")
 *
 *   // Now you can use the edition drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(tokenId, quantity) {
 *     await contract.claim(tokenId, quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const editionDrop = useEditionDrop("0x1234...");
 * + const editionDrop = useContract("0x1234...", "edition-drop").contract;
 * ```
 */
function useEditionDrop(contractAddress) {
  return useContract(contractAddress, "edition-drop").contract;
}

/**
 * Hook for getting an instance of an `Edition` contract. This contract is used to interface with ERC1155 compliant NFTs.
 * @param contractAddress - the address of the Edition contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "edition")
 *
 *   // Now you can use the edition contract in the rest of the component
 *
 *   // For example, this function will return all the NFTs on this contract
 *   async function getNFTs() {
 *     const nfts = await contract.getAll()
 *     return nfts
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const edition = useEdition("0x1234...");
 * + const edition = useContract("0x1234...", "edition").contract;
 * ```
 */
function useEdition(contractAddress) {
  return useContract(contractAddress, "edition").contract;
}

/**
 * Hook for getting an instance of an `NFTDrop` contract. This contract is meant to interface with ERC721 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "nft-drop")
 *
 *   // Now you can use the nft drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(quantity) {
 *     await contract.claim(quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const nftDrop = useNFTDrop("0x1234...");
 * + const nftDrop = useContract("0x1234...", "nft-drop").contract;
 * ```
 */
function useNFTDrop(contractAddress) {
  return useContract(contractAddress, "nft-drop").contract;
}

/**
 * Hook for getting an instance of a `Marketplace` contract. This contract is used to support marketplace for purchase and sale of on-chain assets.
 * @param contractAddress - the address of the Marketplace contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "marketplace")
 *
 *   // Now you can use the marketplace contract in the rest of the component
 *
 *   // For example, this function will return all the listings on the marketplace
 *   async function getListings() {
 *     const listings = await contract.getAll()
 *     return listings
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const marketplace = useMarketplace("0x1234...");
 * + const marketplace = useContract("0x1234...", "marketplace").contract;
 * ```
 */
function useMarketplace(contractAddress) {
  return useContract(contractAddress, "marketplace").contract;
}

/**
 * Hook for getting an instance of an `NFTCollection` contract. This contract is meant to interface with ERC721 compliant NFTs.
 * @param contractAddress - the address of the NFT Collection contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract, isLoading, error } = useContract("<YOUR-CONTRACT-ADDRESS>", "nft-collection")
 *
 *   // Now you can use the nftCollection contract in the rest of the component
 *
 *   // For example, this function will return all the NFTs on this contract
 *   async function getNFTs() {
 *     const nfts = await contract.getAll()
 *     return nfts
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const nftCollection = useNFTCollection("0x1234...");
 * + const nftCollection = useContract("0x1234...", "nft-collection").contract;
 * ```
 */
function useNFTCollection(contractAddress) {
  return useContract(contractAddress, "nft-collection").contract;
}

/**
 * Hook for getting an instance of a `Pack` contract. This contract supports the creation of on-chain luck-based lootboxes.
 * @param contractAddress - the address of the Pack contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = usePack("<YOUR-CONTRACT-ADDRESS>", "pack")
 *
 *   // Now you can use the pack contract in the rest of the component
 *
 *   // For example, this function will get all the packs on this contract
 *   async function getPacks() {
 *     const packs = await contract.getAll()
 *     return packs
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const pack = usePack("0x1234...");
 * + const pack = useContract("0x1234...", "pack").contract;
 * ```
 */
function usePack(contractAddress) {
  return useContract(contractAddress, "pack").contract;
}

/**
 * Hook for getting an instance of a `Token` contract. This contract supports ERC20 compliant tokens.
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "token")
 *
 *   // Now you can use the token contract in the rest of the component
 *
 *   // For example, this function will get the connected wallets token balance
 *   async function balance() {
 *     const balance = await contract.balance()
 *     return balance
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const token = useToken("0x1234...");
 * + const token = useContract("0x1234...", "token").contract;
 * ```
 */
function useToken(contractAddress) {
  return useContract(contractAddress, "token").contract;
}

/**
 * Hook for getting an instance of a `Token Drop` contract.
 * @param contractAddress - the address of the Token Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "token-drop")
 *
 *   // Now you can use the token drop contract in the rest of the component
 *
 *   // For example, this function will get the connected wallets token balance
 *   async function balance() {
 *     const balance = await contract.balance()
 *     return balance
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const token = useTokenDrop("0x1234...");
 * + const token = useContract("0x1234...", "token-drop").contract;
 * ```
 */
function useTokenDrop(contractAddress) {
  return useContract(contractAddress, "token-drop").contract;
}

/**
 * Hook for getting an instance of an `Vote` contract. This contract enables fully featured voting-based decentralized governance systems.
 * @param contractAddress - the address of the Vote contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "vote")
 *
 *   // Now you can use the vote contract in the rest of the component
 *
 *   // For example, this function will get all the proposals on this contract
 *   async function getProposals() {
 *     const proposals = await contract.getAll()
 *     return proposals
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const vote = useVote("0x1234...");
 * + const vote = useContract("0x1234...", "vote").contract;
 * ```
 */
function useVote(contractAddress) {
  return useContract(contractAddress, "vote").contract;
}

/**
 * Hook for getting an instance of a `Split` contract. This contract supports fund distribution to multiple parties.
 * @param contractAddress - the address of the Split contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "split")
 *
 *   // Now you can use the split contract in the rest of the component
 *
 *   // For example, this function will retrun all the receipients of the split
 *   async function getRecipients() {
 *     const recipients = await contract.getAllRecipients()
 *     return recipients
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const split = useSplit("0x1234...");
 * + const split = useContract("0x1234...", "split").contract;
 * ```
 */
function useSplit(contractAddress) {
  return useContract(contractAddress, "split").contract;
}

/**
 * Hook for getting an instance of an `Multiwrap` contract. This contract is an ERC721 in which you can wrap ERC721, ERC1155 and ERC20 tokens.
 * @param contractAddress - the address of the Multiwrap contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "multiwrap")
 *
 *   // Now you can use the multiwrap contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet wrap tokens
 *   async function wrap(tokensToWrap, wrappedNFTMetadata) {
 *     await contract.wrap(tokensToWrap, wrappedNFTMetadata)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const multiwrap = useMultiwrap("0x1234...");
 * + const multiwrap = useContract("0x1234...", "multiwrap").contract;
 * ```
 */
function useMultiwrap(contractAddress) {
  return useContract(contractAddress, "multiwrap").contract;
}

/**
 * Hook for getting an instance of an `SignatureDrop` contract. This contract is meant to interface with ERC721 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useContract } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const { contract } = useContract("<YOUR-CONTRACT-ADDRESS>", "signature-drop")
 *
 *   // Now you can use the Signature drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(quantity) {
 *     await contract.claim(quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const signatureDrop = useSignatureDrop("0x1234...");
 * + const signatureDrop = useContract("0x1234...", "signature-drop").contract;
 * ```
 */
function useSignatureDrop(contractAddress) {
  return useContract(contractAddress, "signature-drop").contract;
}

/**
 * A wallet address.
 * @beta
 */

/**
 * A contract address.
 * @beta
 */

/**
 * The parameters to pass to the mint and transfer functions.
 *
 * @beta
 */

/**
 * The parameters to pass to the burn function.
 *
 * @beta
 */

// NFTS //

/**
 * The possible NFT contract types.
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * ```
 * @beta
 */

/**
 * The possible Token contract types.
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * ```
 * @beta
 */

/**
 * Possible NFT contract types.
 * @beta
 */

/**
 * The params to pass to `useTransferNFT`.
 * @beta
 */

/**
 * The params to pass to `useTransferBatchNFT`.
 * @beta
 */

/**
 * The params to pass to `useMintNFTSupply`.
 * @beta
 */

/**
 * The params for the {@link useMintNFT} hook mutation.
 *
 * @beta
 */

/**
 * The return type of the {@link useMintNFT} hook.
 *
 * @beta
 */

/**
 * The params for the {@link useBurnNFT} hook mutation.
 *
 * @beta
 */

// DROPS //

/**
 * The possible DROP contract types.
 * @beta
 */

/**
 * The possible revealable contract types.
 * @beta
 */

/**
 * The params for the {@link useDelayedRevealLazyMint} hook mutation.
 *
 * @beta
 */

/**
 * The params for the {@link useRevealLazyMint} hook mutation.
 *
 * @beta
 */

/**
 * The params for the {@link useClaimNFT} hook mutation.
 *
 * @beta
 */

/**
 * The return type of the {@link useClaimNFT} hook.
 *
 * @beta
 */

// MARKETPLACE //

// TOKEN DROP //

// Helpers

function getErcs(contract) {
  return {
    erc1155: getErc1155(contract),
    erc721: getErc721(contract),
    erc20: getErc20(contract)
  };
}
function getErc1155(contract) {
  if (!contract) {
    return undefined;
  }
  try {
    if ("erc1155" in contract) {
      return contract.erc1155;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}
function getErc721(contract) {
  if (!contract) {
    return undefined;
  }
  try {
    if ("erc721" in contract) {
      return contract.erc721;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}
function getErc20(contract) {
  if (!contract) {
    return undefined;
  }
  try {
    if ("erc20" in contract) {
      return contract.erc20;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
}

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(contract, <tokenId>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 * @twfeature ERC721 | ERC1155
 */
function useNFT(contract, tokenId) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.get(contractAddress, tokenId), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc1155) {
      invariant__default["default"](erc1155.get, "Contract instance does not support get");
      return await erc1155.get(ethers.BigNumber.from(tokenId || 0));
    }
    if (erc721) {
      invariant__default["default"](erc721.get, "Contract instance does not support get");
      return await erc721.get(ethers.BigNumber.from(tokenId || 0));
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && tokenId !== undefined
  });
}

/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @twfeature ERC721Supply | ERC1155Enumerable
 * @beta
 */
function useNFTs(contract, queryParams) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.all(contractAddress, queryParams), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc721) {
      invariant__default["default"](erc721.getAll, "Contract instance does not support getAll");
      return await erc721.getAll(queryParams);
    }
    if (erc1155) {
      invariant__default["default"](erc1155.getAll, "Contract instance does not support getAll");
      return await erc1155.getAll(queryParams);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}

/**
 * Use this to get the total count of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: count, isLoading, error } = useTotalCount(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that includes the total count of NFTs
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
function useTotalCount(contract) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.totalCount(contractAddress), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc1155) {
      invariant__default["default"](erc1155.totalCount, "Contract instance does not support totalCount");
      return await erc1155.totalCount();
    }
    if (erc721) {
      invariant__default["default"](erc721.totalCount, "Contract instance does not support totalCount");
      return await erc721.totalCount();
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}

/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalCirculatingSupply, isLoading, error } = useTotalCirculatingSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
function useTotalCirculatingSupply(contract, tokenId) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc1155) {
      invariant__default["default"](erc1155.totalCirculatingSupply, "Contract instance does not support totalCirculatingSupply");
      requiredParam.requiredParamInvariant(tokenId, "No tokenId provided");
      return await erc1155.totalCirculatingSupply(tokenId);
    }
    if (erc721) {
      invariant__default["default"](erc721.totalCirculatingSupply, "Contract instance does not support totalCirculatingSupply");
      return await erc721.totalCirculatingSupply();
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && tokenId !== undefined
  });
}

/**
 * Use this to get a the owned NFTs for a specific {@link Erc721OrErc1155} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 * @twfeature ERC721Enumerable | ERC1155Enumerable
 */
function useOwnedNFTs(contract, ownerWalletAddress) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](ownerWalletAddress, "No wallet address provided");
    if (erc721) {
      return await erc721.getOwned(ownerWalletAddress);
    }
    if (erc1155) {
      return await erc1155.getOwned(ownerWalletAddress);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && !!ownerWalletAddress
  });
}

/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @twfeature ERC721 | ERC1155
 * @beta
 */
function useNFTBalance(contract, ownerWalletAddress, tokenId) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.balanceOf(contractAddress, ownerWalletAddress, tokenId), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](ownerWalletAddress, "No owner wallet address provided");
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "No tokenId provided");
      invariant__default["default"](erc1155.balanceOf, "Contract instance does not support balanceOf");
      return erc1155.balanceOf(ownerWalletAddress, tokenId);
    }
    if (erc721) {
      invariant__default["default"](erc721.balanceOf, "Contract instance does not support balanceOf");
      return erc721.balanceOf(ownerWalletAddress);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && !!ownerWalletAddress
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 * @twfeature ERC721Mintable | ERC1155Mintable
 */
function useMintNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    if (erc1155) {
      invariant__default["default"]("supply" in data, "supply not provided");
      const {
        to,
        metadata,
        supply
      } = data;
      return await erc1155.mintTo(to, {
        metadata,
        supply: ethers.BigNumber.from(supply || 1)
      });
    }
    if (erc721) {
      return await erc721.mintTo(data.to, data.metadata);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to mint a new NFT on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(contract);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to mint a more supply of a token id to the provided wallet
 * @beta
 * @twfeature ERC1155Mintable
 */
function useMintNFTSupply(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    requiredParam.requiredParamInvariant(data.tokenId, "tokenId not provided");
    invariant__default["default"]("additionalSupply" in data, "additionalSupply not provided");
    const {
      to,
      tokenId,
      additionalSupply
    } = data;
    return await contract.mintAdditionalSupplyTo(to, tokenId, additionalSupply);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to transfer tokens on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to transfer NFTs
 * @beta
 * @twfeature ERC721 | ERC1155
 */
function useTransferNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(data => {
    invariant__default["default"]("to" in data, "to not provided");
    if (erc1155) {
      invariant__default["default"](erc1155.transfer, "contract does not support transfer");
      requiredParam.requiredParamInvariant(data.tokenId, "tokenId not provided");
      invariant__default["default"]("amount" in data, "amount not provided");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return erc1155.transfer(data.to, data.tokenId, data.amount);
    }
    if (erc721) {
      return erc721.transfer(data.to, data.tokenId);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to transfer tokens on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const editionDrop = useContract(<ContractAddress>, "edition-drop");
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(editionDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to transfer batch NFTs
 * @twfeature ERC1155
 * @beta
 */
function useAirdropNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(_ref => {
    let {
      tokenId,
      addresses
    } = _ref;
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    invariant__default["default"](contract.airdrop, "contract does not support airdrop");
    return contract.airdrop(tokenId, addresses);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to burn an NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to burn an NFT token from the connected wallet
 * @twfeature ERC721Burnable | ERC1155Burnable
 * @beta
 */
function useBurnNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(data.tokenId, "No tokenId provided");
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    if (erc1155) {
      invariant__default["default"]("amount" in data, "amount not provided");
      const {
        tokenId,
        amount
      } = data;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await erc1155.burn(tokenId, amount);
    }
    if (erc721) {
      const {
        tokenId
      } = data;
      return await erc721.burn(tokenId);
    }
    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/
/**       READ HOOKS    **/
/** **********************/

/**
 * Use this to get a list of *unclaimed* NFT tokens of your ERC721 Drop contract.
 *
 * @example
 * ```javascript
 * const { data: unclaimedNfts, isLoading, error } = useUnclaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a contract that extends the Erc721 spec (nft drop, custom contract that follows the Erc721 & drop spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
function useUnclaimedNFTs(contract, queryParams) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.getAllUnclaimed(contractAddress, queryParams), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    // TODO make this work for custom contracts (needs ABI change)
    invariant__default["default"](contract.getAllUnclaimed, "Contract instance does not support getAllUnclaimed");
    return contract.getAllUnclaimed(queryParams);
  }, {
    enabled: !!contract
  });
}

/**
 * Use this to get a list of *claimed* (minted) NFT tokens of your ERC721 Drop contract.
 *
 * @remarks Equivalent to using {@link useNFTs}.
 *
 * @example
 * ```javascript
 * const { data: claimedNFTs, isLoading, error } = useClaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
function useClaimedNFTs(contract, queryParams) {
  return useNFTs(contract, queryParams);
}

/**
 *
 * @param contract - an instance of a {@link NFTDrop}
 * @returns a response object that includes the number of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */
function useUnclaimedNFTSupply(contract) {
  const contractAddress = contract?.getAddress();
  const {
    erc721
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.totalUnclaimedSupply(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc721) {
      invariant__default["default"](erc721, "No ERC721 Contract instance provided");
      return erc721.totalUnclaimedSupply();
    }
    invariant__default["default"](false, "Contract is not an instance of ERC721");
  }, {
    enabled: !!erc721
  });
}

/**

 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a response object that includes the number of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */
function useClaimedNFTSupply(contract) {
  const contractAddress = contract?.getAddress();
  const {
    erc721
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.totalClaimedSupply(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc721) {
      return erc721.totalClaimedSupply();
    }
    invariant__default["default"](false, "Contract is not an instance of ERC721");
  }, {
    enabled: !!erc721
  });
}

/**
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a response object that gets the batches to still be revealed
 * @twfeature ERC721Revealable | ERC1155Revealable
 */
function useBatchesToReveal(contract) {
  const contractAddress = contract?.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.revealer.getBatchesToReveal(contractAddress), () => {
    if (erc721) {
      return erc721.revealer.getBatchesToReveal();
    }
    if (erc1155) {
      return erc1155.revealer.getBatchesToReveal();
    }
    invariant__default["default"](false, "Contract instance does not support getBatchesToReveal");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to claim a NFT on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimNft,
 *     isLoading,
 *     error,
 *   } = useClaimNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to claim nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimNft({ to: "0x...", quantity: 1 })}
 *     >
 *       Claim NFT!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to claim a NFT to the wallet specificed in the params
 * @twfeature ERC721Claimable | ERC1155Claimable
 * @beta
 */
function useClaimNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    if (erc1155) {
      requiredParam.requiredParamInvariant(data.tokenId, "tokenId not provided");
      if (!data.to) {
        return await erc1155.claim(data.tokenId, data.quantity, data.options);
      }
      return await erc1155.claimTo(data.to, data.tokenId, data.quantity, data.options);
    }
    if (erc721) {
      if (!data.to) {
        return await erc721.claim(data.quantity, data.options);
      }
      return await erc721.claimTo(data.to, data.quantity, data.options);
    }
    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to lazy mint a batch of NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link NFTContract} with the drop extension
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
function useLazyMint(contract, onProgress) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    let options;
    if (onProgress) {
      options = {
        onProgress
      };
    }
    if (erc721) {
      return erc721.lazyMint(data.metadatas, options);
    }
    if (erc1155) {
      return erc1155.lazyMint(data.metadatas, options);
    }
    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to lazy mint a batch of delayed reveal NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link DropContract}
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */
function useDelayedRevealLazyMint(contract, onProgress) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    let options;
    if (onProgress) {
      options = {
        onProgress
      };
    }
    const {
      erc721,
      erc1155
    } = getErcs(contract);
    if (erc721) {
      return await erc721.revealer.createDelayedRevealBatch(data.placeholder, data.metadatas, data.password, options);
    }
    if (erc1155) {
      return await erc1155.revealer.createDelayedRevealBatch(data.placeholder, data.metadatas, data.password, options);
    }
    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to reveal a batch of delayed reveal NFTs on your {@link RevealableContract}
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a mutation object that can be used to reveal a batch of delayed reveal NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */
function useRevealLazyMint(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    const {
      erc721,
      erc1155
    } = getErcs(contract);
    if (erc721) {
      return await erc721.revealer.reveal(data.batchId, data.password);
    }
    if (erc1155) {
      return await erc1155.revealer.reveal(data.batchId, data.password);
    }
    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a specific listing from the marketplace.
 *
 * @example
 * ```javascript
 * const { data: listing, isLoading, error } = useListing(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes an array of listings
 * @beta
 */
function useListing(contract, listingId) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getListing(contractAddress, listingId), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    requiredParam.requiredParamInvariant(listingId, "No listing id provided");
    return contract.getListing(listingId);
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}

/**
 * Use this to get a list all listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
function useListings(contract, filter) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getAllListings(contractAddress, filter), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    return contract.getAllListings(filter);
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}

/**
 * Use this to get a count of all listings on your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @returns a response object that includes an array of listings
 * @beta
 */
function useListingsCount(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getTotalCount(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    return contract.getTotalCount();
  }, {
    enabled: !!contract
  });
}

/**
 * Use this to get a list active listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useActiveListings(<YourMarketplaceContractInstance>, { seller: "0x...", tokenContract: "0x...", tokenId: 1, start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
function useActiveListings(contract, filter) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getActiveListings(contractAddress, filter), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    return contract.getActiveListings(filter);
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}

/**
 * Use this to get a the winning bid for an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: winningBid, isLoading, error } = useWinningBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the {@link Offer} that is winning the auction
 * @beta
 */
function useWinningBid(contract, listingId) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.auction.getWinningBid(contractAddress, listingId), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    requiredParam.requiredParamInvariant(listingId, "No listing id provided");
    return contract.auction.getWinningBid(listingId);
  }, {
    enabled: !!contract && listingId !== undefined
  });
}

/**
 * Use this to get the winner of an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useAuctionWinner(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the address of the winner of the auction or undefined if there is no winner yet
 * @beta
 */
function useAuctionWinner(contract, listingId) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.auction.getWinner(contractAddress, listingId), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    requiredParam.requiredParamInvariant(listingId, "No listing id provided");
    let winner;
    try {
      winner = await contract.auction.getWinner(listingId);
    } catch (err) {
      if (!err?.message?.includes("Could not find auction")) {
        throw err;
      }
    }
    return winner;
  }, {
    enabled: !!contract && listingId !== undefined
  });
}

/**
 * Use this to get the buffer in basis points between offers from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useBidBuffer(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract

 * @returns a response object that includes an array of listings
 * @beta
 */
function useBidBuffer(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getBidBufferBps(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    return contract.getBidBufferBps();
  }, {
    enabled: !!contract
  });
}

/**
 * Use this to get the minimum next bid for the auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: minimumNextBid, isLoading, error } = useMinimumNextBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the minimum next bid for the auction listing
 * @beta
 */
function useMinimumNextBid(contract, listingId) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.auction.getWinner(contractAddress, listingId), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    requiredParam.requiredParamInvariant(listingId, "No listing id provided");
    return await contract.auction.getMinimumNextBid(listingId);
  }, {
    enabled: !!contract && listingId !== undefined
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to create a new Direct Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createDirectListing,
 *     isLoading,
 *     error,
 *   } = useCreateDirectListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create direct listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createDirectListing(directListingData)}
 *     >
 *       Create Direct Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new direct listing
 * @beta
 */
function useCreateDirectListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot create listing");
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](contract.direct.createListing, "contract does not support direct.createListing");
    return await contract.direct.createListing(data);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to create a new Auction Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createAuctionListing,
 *     isLoading,
 *     error,
 *   } = useCreateAuctionListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createAuctionListing(auctionListingData)}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */
function useCreateAuctionListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot create listing");
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](contract.direct.createListing, "contract does not support auction.createListing");
    return await contract.auction.createListing(data);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to cancel a listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: cancelListing,
 *     isLoading,
 *     error,
 *   } = useCancelListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to cancel auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => cancelListing()}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */
function useCancelListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    if (data.type === sdk.ListingType.Auction) {
      return await contract?.auction.cancelListing(data.id);
    } else {
      return await contract?.direct.cancelListing(data.id);
    }
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to place a bid on an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeBid,
 *     isLoading,
 *     error,
 *   } = useMakeBid(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to make a bid", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeBid({ listingId: 1, bid: 2 })}
 *     >
 *       Bid!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */
function useMakeBid(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](contract.auction.makeBid, "contract does not support auction.makeBid");
    return await contract.auction.makeBid(data.listingId, data.bid);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to make an offer on direct or auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeOffer,
 *     isLoading,
 *     error,
 *   } = useMakeOffer(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to make a bid", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeOffer({ listingId: 1, pricePerToken: 0.5, quantity: 1 })}
 *     >
 *       Bid!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */
function useMakeOffer(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    return await contract.makeOffer(data.listingId, data.pricePerToken, data.quantity);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Accept an offer on a direct listing from an offeror, will accept the latest offer by the given offeror.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: acceptOffer,
 *     isLoading,
 *     error,
 *   } = useAcceptDirectListingOffer(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to accept offer", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => acceptOffer({ listingId: 1, addressOfOfferor: "0x..." })}
 *     >
 *       Accept offer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to accept an offer on a direct listing
 * @beta
 */
function useAcceptDirectListingOffer(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    requiredParam.requiredParamInvariant(contract?.direct, "No Direct instance provided");
    return await contract.direct.acceptOffer(data.listingId, data.addressOfOfferor);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Execute an auction sale. Can only be executed once the auction has ended and the auction has a winning bid.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: executeAuctionSale,
 *     isLoading,
 *     error,
 *   } = useExecuteAuctionSale(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to execute sale", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => executeAuctionSale({ listingId: 1 })}
 *     >
 *       Execute sale
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to accept an offer on a direct listing
 * @beta
 */
function useExecuteAuctionSale(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    requiredParam.requiredParamInvariant(contract?.auction, "No Auction marketplace instance provided");
    return await contract.auction.executeSale(data.listingId);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Get all the offers for a listing
 *
 * @remarks Fetch all the offers for a specified direct or auction listing.
 * @example
 * ```javascript
 * const { data: offers, isLoading, error } = useOffers(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @param listingId - the id of the listing to fetch offers for
 * @beta
 */
function useOffers(contract, listingId) {
  const result = useContractEvents(contract, "NewOffer");
  return {
    ...result,
    data: result.data?.filter(ev => ev.data.listingId.eq(listingId))?.map(ev => ev.data)
  };
}

/**
 * Use this to buy out an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: buyNow,
 *     isLoading,
 *     error,
 *   } = useBuyNow(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to buyout listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => buyNow({listingId: 1, type: ListingType.Auction})}
 *     >
 *       Buy listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to buy out an auction listing
 * @beta
 */
function useBuyNow(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (data.type === sdk.ListingType.Direct) {
      invariant__default["default"](contract.direct.buyoutListing, "contract does not support direct.buyoutListing");
      return await contract.direct.buyoutListing(data.id, data.buyAmount, data.buyForWallet);
    }
    invariant__default["default"](contract.auction.buyoutListing, "contract does not support auction.buyoutListing");
    return await contract.auction.buyoutListing(data.id);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a the total supply of your {@link Erc20} contract.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalSupply, isLoading, error } = useTokenSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that incudes the total minted supply
 * @twfeature ERC20
 * @beta
 */
function useTokenSupply(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.token.totalSupply(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    const erc20 = getErc20(contract);
    if (erc20) {
      return erc20.totalSupply();
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!contract || !!contractAddress
  });
}

/**
 * Use this to get the balance of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: balance, isLoading, error } = useTokenBalance(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the balance of the address
 * @twfeature ERC20
 * @beta
 */
function useTokenBalance(contract, walletAddress) {
  const contractAddress = contract?.getAddress();
  const erc20 = getErc20(contract);
  return useQueryWithNetwork(cacheKeys.contract.token.balanceOf(contractAddress, walletAddress), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    invariant__default["default"](walletAddress, "No address provided");
    if (erc20) {
      return await erc20.balanceOf(walletAddress);
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!walletAddress && !!contract
  });
}

/**
 * Use this to get the decimals of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: decimals, isLoading, error } = useTokenDecimals(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the decimals of the ERC20 token
 * @twfeature ERC20
 * @beta
 */
function useTokenDecimals(contract) {
  const contractAddress = contract?.getAddress();
  const erc20 = getErc20(contract);
  return useQueryWithNetwork(cacheKeys.contract.token.decimals(contractAddress), async () => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    if (erc20) {
      return (await erc20.get()).decimals;
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!contract
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint new tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintTokens,
 *     isLoading,
 *     error,
 *   } = useMintToken(contract);
 *
 *   if (error) {
 *     console.error("failed to mint tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to mint new tokens to the connected wallet
 * @twfeature ERC20Mintable
 * @beta
 */
function useMintToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      to,
      amount
    } = data;
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    if (erc20) {
      return erc20.mintTo(to, amount);
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to claim tokens on your {@link Erc20}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimTokens,
 *     isLoading,
 *     error,
 *   } = useClaimToken(contract);
 *
 *   if (error) {
 *     console.error("failed to claim tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimTokens({ to: "0x...", amount: 100 })}
 *     >
 *       Claim Tokens!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to tokens to the wallet specificed in the params
 * @twfeature ERC20ClaimableWithConditions
 * @beta
 */
function useClaimToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    if (erc20) {
      invariant__default["default"](erc20?.claimTo, "contract does not support claimTo");
      return await erc20.claimTo(data.to, data.amount, {
        checkERC20Allowance: data.checkERC20Allowance
      });
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to transfer tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer tokens
 * @twfeature ERC20
 * @beta
 */
function useTransferToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      to,
      amount
    } = data;
    if (erc20) {
      invariant__default["default"](erc20?.transfer, "contract does not support transfer");
      return erc20.transfer(to, amount);
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to transfer batch tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferBatchTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferBatchTokens([{ to: "0x...", amount: 1000 }, { to: "0x...", amount: 2000 }])}
 *     >
 *       Transfer Batch
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer batch tokens
 * @twfeature ERC20
 * @beta
 */
function useTransferBatchToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    if (erc20) {
      invariant__default["default"](erc20.transferBatch, "contract does not support transferBatch");
      const convertedData = data.map(token => ({
        toAddress: token.to,
        amount: token.amount
      }));
      return erc20.transferBatch(convertedData);
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to burn tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnTokens,
 *     isLoading,
 *     error,
 *   } = useBurnToken(contract);
 *
 *   if (error) {
 *     console.error("failed to burn tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnTokens({ amount: 1000 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to burn tokens from the connected wallet
 * @twfeature ERC20Burnable
 * @beta
 */
function useBurnToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      amount
    } = data;
    requiredParam.requiredParamInvariant(contract, "contract is undefined");
    if (erc20) {
      invariant__default["default"](erc20.burn, "contract does not support burn");
      return erc20.burn(amount);
    }
    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * The options to be passed as the second parameter to the {@link useClaimIneligibilityReasons}` hook.
 *
 * @beta
 */

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get the active claim condition for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721, ERC1155 or ERC20 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the currently active claim condition
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useActiveClaimCondition(contract, tokenId, options) {
  const contractAddress = contract?.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getActive(contractAddress, tokenId, options), () => {
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.getActive(tokenId, options);
    }
    if (erc721) {
      return erc721.claimConditions.getActive(options);
    }
    if (erc20) {
      return erc20.claimConditions.getActive(options);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}

/**
 * Use this to get the claimer proofs for an adddress for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: claimerProofs, isLoading, error } = useClaimerProofs(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimerProofs, isLoading, error } = useClaimerProofs(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimerProofs, isLoading, error } = useClaimerProofs(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721, ERC1155 or ERC20 spec and implements the `claimConditions` extension.
 * @param claimerAddress - the address of the claimer to fetch the claimer proofs for
 * @param tokenId - the id of the token to fetch the claimer proofs for (if the contract is an ERC1155 contract)
 * @param claimConditionId - optional the claim condition id to get the proofs for
 * @returns a response object with the snapshot for the provided address
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useClaimerProofs(contract, claimerAddress, tokenId, claimConditionId) {
  const contractAddress = contract?.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getClaimerProofs(contractAddress, tokenId), () => {
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.getClaimerProofs(tokenId, claimerAddress, claimConditionId);
    }
    if (erc721) {
      return erc721.claimConditions.getClaimerProofs(claimerAddress, claimConditionId);
    }
    if (erc20) {
      return erc20.claimConditions.getClaimerProofs(claimerAddress, claimConditionId);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}

/**
 * Use this to get all claim conditions for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721, ERC1155 or ERC20 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the list of claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useClaimConditions(contract, tokenId, options) {
  const contractAddress = contract?.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getAll(contractAddress, tokenId, options), () => {
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.getAll(tokenId, options);
    }
    if (erc721) {
      return erc721.claimConditions.getAll(options);
    }
    if (erc20) {
      return erc20.claimConditions.getAll(options);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}

/**
 * Use this to check for reasons that prevent claiming for either  ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useClaimIneligibilityReasons(<YourERC20ContractInstance>, { walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC721ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC1155ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> }, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the  ERC20, ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param eligibilityParams - the parameters for the eligibility check, see: {@link ClaimIneligibilityParams}
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the resons for the claim ineligibility
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useClaimIneligibilityReasons(contract, params, tokenId) {
  const contractAddress = contract?.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getClaimIneligibilityReasons(contractAddress, params, tokenId), () => {
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim ineligibility reasons");
      return erc1155.claimConditions.getClaimIneligibilityReasons(tokenId, params.quantity, params.walletAddress);
    }
    if (erc721) {
      return erc721.claimConditions.getClaimIneligibilityReasons(params.quantity, params.walletAddress);
    }
    if (erc20) {
      return erc20.claimConditions.getClaimIneligibilityReasons(params.quantity, params.walletAddress);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    // 3. has a params object been passed?
    // 4. does params have an address in it?
    enabled: (erc1155 ? tokenId !== undefined : !!erc721 || !!erc20) && !!params && !!params.walletAddress
  });
}

/**
 * Use this to check the claim condition for a given wallet address (including checking for overrides that may exist for that given wallet address).
 *
 * @param contract - an instance of a contract that extends the  ERC20, ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param walletAddress - the wallet address to check the active claim condition for
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns the active claim conditon for the wallet address or null if there is no active claim condition
 *
 * @beta
 */
function useActiveClaimConditionForWallet(contract, walletAddress, tokenId) {
  const sdk$1 = useSDK();
  const contractAddress = contract?.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.useActiveClaimConditionForWallet(contractAddress, walletAddress || "_NO_WALLET_", tokenId), async () => {
    // if we do not have a walletAddress just do the same logic as basic useClaimCondition
    if (!walletAddress) {
      if (erc1155) {
        requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return erc1155.claimConditions.getActive(tokenId);
      }
      if (erc721) {
        return erc721.claimConditions.getActive();
      }
      if (erc20) {
        return erc20.claimConditions.getActive();
      }
      throw new Error("Contract must be ERC721, ERC1155 or ERC20");
    }
    invariant__default["default"](sdk$1, "sdk is required");
    let activeGeneralClaimCondition = null;
    let claimerProofForWallet = null;
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155");
      const [cc, cp] = await Promise.all([erc1155.claimConditions.getActive(tokenId), erc1155.claimConditions.getClaimerProofs(tokenId, walletAddress)]);
      activeGeneralClaimCondition = cc;
      claimerProofForWallet = cp;
    }
    if (erc721) {
      const [cc, cp] = await Promise.all([erc721.claimConditions.getActive(), erc721.claimConditions.getClaimerProofs(walletAddress)]);
      activeGeneralClaimCondition = cc;
      claimerProofForWallet = cp;
    }
    if (erc20) {
      const [cc, cp] = await Promise.all([erc20.claimConditions.getActive(), erc20.claimConditions.getClaimerProofs(walletAddress)]);
      activeGeneralClaimCondition = cc;
      claimerProofForWallet = cp;
    }
    // if there is no active claim condition nothing matters, return null
    if (!activeGeneralClaimCondition) {
      return null;
    }

    // if there is no claimer proof then just fall back to the active general claim condition
    if (!claimerProofForWallet) {
      return activeGeneralClaimCondition;
    }
    const {
      maxClaimable,
      currencyAddress,
      price
    } = claimerProofForWallet;
    const currencyWithOverride = currencyAddress || activeGeneralClaimCondition.currencyAddress;
    const currencyMetadata = await sdk.fetchCurrencyMetadata(sdk$1.getProvider(), currencyWithOverride);
    const normalizedPrize = price ? price === "unlimited" ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(price, currencyMetadata.decimals) : null;
    const priceWithOverride = normalizedPrize || activeGeneralClaimCondition.price;
    const maxClaimableWithOverride =
    // have to transform this the same way that claim conditions do it in SDK
    sdk.convertToReadableQuantity(maxClaimable, currencyMetadata.decimals) || activeGeneralClaimCondition.maxClaimablePerWallet;
    const currencyValueWithOverride = await sdk.fetchCurrencyValue(sdk$1.getProvider(), currencyWithOverride, priceWithOverride);
    return {
      // inherit the entire claim condition
      ...activeGeneralClaimCondition,
      // overwrite all keys that could be changed based on overwrites
      maxClaimablePerWallet: maxClaimableWithOverride,
      price: priceWithOverride,
      currency: currencyWithOverride,
      currencyAddress: currencyWithOverride,
      currencyMetadata: currencyValueWithOverride
    };
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to set claim conditions on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: setClaimConditions,
 *     isLoading,
 *     error,
 *   } = useSetClaimConditions(contract);
 *
 *   if (error) {
 *     console.error("failed to set claim conditions", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => setClaimConditions({ phases: [{ price: 2, maxQuantity: 100 }] })}
 *     >
 *       Set Claim Conditions!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to set claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useSetClaimConditions(contract, tokenId) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    requiredParam.requiredParamInvariant(contract, "No Contract instance provided");
    const {
      phases,
      reset = false
    } = data;
    invariant__default["default"](phases, 'No "phases" provided');
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.set(tokenId, phases, reset);
    }
    if (erc721) {
      return erc721.claimConditions.set(phases, reset);
    }
    if (erc20) {
      return erc20.claimConditions.set(phases, reset);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    onSettled: () => {
      invalidateContractAndBalances(queryClient, contractAddress, activeChainId);
    }
  });
}

/**
 * Use this to reset claim conditions on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: resetClaimConditions,
 *     isLoading,
 *     error,
 *   } = useResetClaimConditions(contract);
 *
 *   if (error) {
 *     console.error("failed to reset claim conditions", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={resetClaimConditions}
 *     >
 *       Reset Claim Conditions
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to reset claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useResetClaimConditions(contract, tokenId) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return reactQuery.useMutation(async () => {
    const cleanConditions = async conditions => {
      return conditions.map(c => ({
        ...c,
        price: c.currencyMetadata.displayValue
      }));
    };
    if (erc1155) {
      requiredParam.requiredParamInvariant(tokenId, "tokenId is required for ERC1155 claim conditions");
      const claimConditions = await erc1155.claimConditions.getAll(tokenId, {
        withAllowList: true
      });
      return erc1155.claimConditions.set(tokenId, await cleanConditions(claimConditions || []), true);
    }
    if (erc721) {
      const claimConditions = await erc721.claimConditions.getAll({
        withAllowList: true
      });
      return await erc721.claimConditions.set(await cleanConditions(claimConditions || []), true);
    }
    if (erc20) {
      const claimConditions = await erc20.claimConditions.getAll({
        withAllowList: true
      });
      return await erc20.claimConditions.set(await cleanConditions(claimConditions || []), true);
    }
    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    onSettled: () => {
      invalidateContractAndBalances(queryClient, contractAddress, activeChainId);
    }
  });
}

// primary sales

/**
 *
 * @example
 * ```jsx
 * const { data: recipient, isLoading, error } = usePrimarySalesRecipient(SmartContract);
 * ```
 *
 * Use this to get the primary sales recipient of your {@link SmartContract}
 * @param contract - an instance of a {@link SmartContract}
 * @returns the wallet address of the primary sales recipient
 * @twfeature PrimarySale
 * @beta
 */
function usePrimarySaleRecipient(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.sales.getRecipient(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("sales" in contract && contract.sales, "Contract does not support primarySale");
    return contract.sales.getRecipient();
  }, {
    enabled: !!contract || !!contractAddress
  });
}

/**
 * Use this to update the primary sales recipient of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updatePrimarySalesRecipient,
 *     isLoading,
 *     error,
 *   } = useUpdatePrimarySaleRecipient(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update recipient", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updatePrimarySalesRecipient({ newRecipient: "0x123" })}
 *     >
 *       Update Recipient
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the primary sales recipient
 * @twfeature PrimarySale
 * @beta
 */
function useUpdatePrimarySaleRecipient(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(newRecipient => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("sales" in contract && contract.sales, "Contract does not support primarySale");
    return contract.sales.setRecipient(newRecipient);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

// end prinary sales

// royalties

/**
 * Use this to get the royalty settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: settings, isLoading, error } = useRoyaltySettings(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns an object containing recipient address and the royalty basis points
 * @twfeature Royalty
 * @beta
 */
function useRoyaltySettings(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.royalties.getDefaultRoyaltyInfo(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("royalties" in contract && contract.royalties, "Contract does not support royalties");
    return contract.royalties.getDefaultRoyaltyInfo();
  }, {
    enabled: !!contract || !!contractAddress
  });
}

/**
 * Use this to update the royalty settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updateRoyaltySettings,
 *     isLoading,
 *     error,
 *   } = useUpdateRoyaltySettings(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update royalty settings", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updateRoyaltySettings({ updatePayload: { fee_recipient: "0x123", seller_fee_basis_points: 5_00 } })}
 *     >
 *       Update Royalty Settings
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the royalty settings
 * @twfeature Royalty
 * @beta
 */
function useUpdateRoyaltySettings(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("royalties" in contract && contract.royalties, "Contract does not support royalties");
    return contract.royalties.setDefaultRoyaltyInfo(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

// end royalties

// platformFees

/**
 * Use this to get the platform fees settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: platformFees, isLoading, error } = usePlatformFees(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns an object containing the platform fee basis points and the fee recipient address
 * @twfeature PlatformFee
 * @beta
 */
function usePlatformFees(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.platformFees.get(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("platformFees" in contract && contract.platformFees, "Contract does not support platformFees");
    return contract.platformFees.get();
  }, {
    enabled: !!contract || !!contractAddress
  });
}

/**
 * Use this to update the platform fees settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updatePlatformFees,
 *     isLoading,
 *     error,
 *   } = useUpdatePlatformFees(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update platform fees", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updatePlatformFees({ updatePayload: { fee_recipient: "0x123", platform_fee_basis_points: 5_00 } })}
 *     >
 *       Update Platform fees
 *     </button>
 *   );
 * };
 * ```
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the platform fees settings
 * @twfeature PlatformFee
 * @beta
 */
function useUpdatePlatformFees(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("platformFees" in contract && contract.platformFees, "Contract does not support platformFees");
    return contract.platformFees.set(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

// end platformFees

// metadata

/**
 * Use this to get the metadata of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: metadata, isLoading, error } = useMetadata(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a {@link CustomContractMetadata} object containing the metadata
 * @twfeature ContractMetadata
 * @beta
 */
function useMetadata(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.metadata.get(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("metadata" in contract && contract.metadata, "Contract does not support metadata");
    return contract.metadata.get();
  }, {
    enabled: !!contract || !!contractAddress
  });
}

/**
 * Use this to update the metadata of your {@link SmartContract}
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updateMetadata,
 *     isLoading,
 *     error,
 *   } = useUpdateMetadata(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update metadata", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updateMetadata({ updatePayload: { name: "My Contract", description: "This is my contract" } })}
 *     >
 *       Update Metadata
 *     </button>
 *   );
 * };
 * ```
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the metadata
 * @twfeature ContractMetadata
 * @beta
 */
function useUpdateMetadata(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"]("metadata" in contract && contract.metadata, "Contract does not support metadata");
    return contract.metadata.update(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

// end metadata

/** **********************/
/**         UTILS       **/
/** **********************/

/**
 * @internal
 */

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get the roles of a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: roles, isLoading, error } = useAllRoleMembers(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a list of addresses for all supported roles on the contract.
 * @twfeature PermissionsEnumerable
 * @beta
 */
function useAllRoleMembers(contract) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.roles.getAll(contractAddress), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    // have to cast to any because of role bs, type is defined in the useQueryWithNetwork definition above
    return contract.roles.getAll();
  }, {
    enabled: !!contract && !!contractAddress
  });
}

/**
 * Use this to get the members of a role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: members, isLoading, error } = useRoleMembers(SmartContract, "admin");
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @param role - the role to get the members of, see {@link Role}
 * @returns a list of addresses that are members of the role
 * @twfeature PermissionsEnumerable
 * @beta
 */
function useRoleMembers(contract, role) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.roles.get(contractAddress, role), () => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    return contract.roles.get(role);
  }, {
    enabled: !!contract && !!contractAddress && !!role
  });
}

/**
 * Use this to check if a {@link WalletAddress} is a member of a role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: isMember, isLoading, error } = useIsAddressRole(SmartContract, "admin", "0x123");
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @param role - the role to check the member against, see {@link Role}
 * @param walletAddress - the address to check
 * @returns true if the address is a member of the role, or false if not
 * @twfeature Permissions
 * @beta
 */
function useIsAddressRole(contract, role, walletAddress) {
  // TODO this might be possible to do with `verify` fn instead?
  const contractHasRoles = !!(contract && contract.roles);
  const {
    data
  } = useRoleMembers(contractHasRoles ? contract : undefined, role);

  // if the contract does not have roles then everything is allowed === true
  if (contractHasRoles === false) {
    return true;
  }

  // switch logic (if address 0 is in the role list then anyone has permissions to it)
  if (data?.includes(ethers.constants.AddressZero)) {
    return true;
  }

  // actual role check logic
  return !!(walletAddress && data?.includes(walletAddress));
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to OVERWRITE the list of addresses that are members of specific roles
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: overwriteRoles,
 *     isLoading,
 *     error,
 *   } = useSetAllRoleMembers(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to overwrite roles", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => overwriteRoles({  rolesWithAddresses: { minter: [] } })}
 *     >
 *       Overwrite Roles
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to overwrite all roles on the contract
 * @twfeature PermissionsEnumerable
 * @beta
 */
function useSetAllRoleMembers(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async rolesWithAddresses => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.setAll(rolesWithAddresses);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

// const { mutate } = useSetAllRoleMembers(undefined as unknown as NFTCollection);

/**
 * Use this to grant a {@link WalletAddress} a specific role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: grantRole,
 *     isLoading,
 *     error,
 *   } = useGrantRole(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to grant role", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => grantRole({  role: "admin", address: "0x123" })}
 *     >
 *       Grant Role
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to grant a member of a role on the contract
 * @twfeature Permissions
 * @beta
 */
function useGrantRole(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async params => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.grant(params.role, params.address);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Use this to revoke a {@link WalletAddress} a specific role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: revokeRole,
 *     isLoading,
 *     error,
 *   } = useRevokeRole(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to revoke role", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => revokeRole({  role: "admin", address: "0x123" })}
 *     >
 *       Revoke Role
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to revoke a role from a member on the contract
 * @twfeature Permissions
 * @beta
 */
function useRevokeRole(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async params => {
    requiredParam.requiredParamInvariant(contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.revoke(params.role, params.address);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Hook to securely login to a backend with the connected wallet. The backend
 * authentication URL must be configured on the ThirdwebProvider.
 *
 * @param config - Configuration for the login.
 * @returns - A function to invoke to login with the connected wallet.
 *
 * @beta
 */
function useLogin(config) {
  const sdk = useSDK();
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useThirdwebAuthConfig();
  React__default["default"].useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");
    if (error && config?.onError) {
      // If there is an error, parse it and trigger the onError callback
      config.onError(decodeURI(error));
    }
  }, [config]);
  async function login(cfg) {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    const payload = await sdk?.auth.login(authConfig.domain, cfg);
    const encodedPayload = encodeURIComponent(btoa(JSON.stringify(payload)));
    const encodedRedirectTo = encodeURIComponent(config?.redirectTo || authConfig.loginRedirect || window.location.toString());
    queryClient.invalidateQueries(cacheKeys.auth.user());

    // Redirect to the login URL with the encoded payload
    window.location.href = `${authConfig.authUrl}/login?payload=${encodedPayload}&redirect=${encodedRedirectTo}`;
  }
  return login;
}

/**
 * Hook to logout the connected wallet from the backend.
 * The backend logout URL must be configured on the ThirdwebProvider.
 *
 * @returns - A function to invoke to logout.
 *
 * @beta
 */
function useLogout() {
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useThirdwebAuthConfig();
  function logout() {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    queryClient.invalidateQueries(cacheKeys.auth.user());
    window.location.href = `${authConfig.authUrl}/logout`;
  }
  return logout;
}

/**
 * Hook to get the currently logged in user.
 *
 * @returns - The currently logged in user or null if not logged in, as well as a loading state.
 *
 * @beta
 */
function useUser() {
  const authConfig = useThirdwebAuthConfig();
  const {
    data: user,
    isLoading
  } = reactQuery.useQuery(cacheKeys.auth.user(), async () => {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    const res = await fetch(`${authConfig.authUrl}/user`, {
      credentials: "include"
    });
    return await res.json();
  }, {
    enabled: !!authConfig
  });
  return {
    user,
    isLoading
  };
}

/**
 *
 * @returns
 * @internal
 */
function useAuth(loginConfig) {
  const user = useUser();
  const login = useLogin(loginConfig);
  const logout = useLogout();
  return {
    ...user,
    login,
    logout
  };
}

/**
 * Hook used to upload any files or JSON data to decentralized storage systems like IPFS,
 * using the `storageInterface` configured on the `ThirdwebProvider`
 *
 * @param options - Configure the options for your upload
 * @returns Function used to upload files or JSON to decentralized storage systems
 *
 * @example
 * ```jsx
 * import { useStorageUpload } from "@thirdweb-dev/react";
 *
 * export default function Component() {
 *   const { mutateAsync: upload, isLoading } = useStorageUpload();
 *
 *   async function uploadData() {
 *     const filesToUpload = [...];
 *     const uris = await upload({ data: files });
 *     console.log(uris);
 *   }
 *
 *   return (
 *     <button onClick={uploadData}>
 *       Upload
 *     </button>
 *   )
 * }
 * ```
 */
function useStorageUpload(uploadOptions) {
  const sdk = useSDK();
  return reactQuery.useMutation(async _ref => {
    let {
      data,
      options
    } = _ref;
    invariant__default["default"](sdk, "sdk must be defined");
    return await sdk.storage.uploadBatch(data, options || uploadOptions);
  });
}

/**
 * Get the configured `ThirdwebStorage` instance
 * @returns The `storageInterface` configured on the `ThirdwebProvider`
 */
function useStorage() {
  const sdk = useSDK();
  return sdk?.storage;
}

/**
 *
 * @internal
 */
function useSigner() {
  return useThirdwebConnectedWalletContext().signer;
}

/**
 * @internal
 */
function useReadonlySDK(readonlyRpcUrl, sdkOptions, storageInterface) {
  return React.useMemo(() => {
    return new sdk.ThirdwebSDK(readonlyRpcUrl, {
      ...sdkOptions,
      readonlySettings: {
        ...sdkOptions?.readonlySettings,
        rpcUrl: readonlyRpcUrl
      }
    }, storageInterface);
    // storageInterface should be constant!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readonlyRpcUrl, sdkOptions]);
}

/**
 * Hook for checking whether the connected wallet is on the correct network specified by the `desiredChainId` passed to the `<ThirdwebProvider />`.
 *
 * ```javascript
 * import { useNetworkMistmatch } from "@thirdweb-dev/react"
 * ```
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 *
 * @example
 * You can check if a users wallet is connected to the correct chain ID as follows:
 * ```javascript
 * import { useNetworkMismatch } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const isMismatched = useNetworkMismatch()
 *
 *   return <div>{isMismatched}</div>
 * }
 * ```
 *
 * From here, you can prompt users to switch their network using the `useNetwork` hook.
 *
 * @public
 */
function useNetworkMismatch() {
  const desiredChainId = useDesiredChainId();
  const walletChainId = useChainId();
  if (desiredChainId === -1) {
    // means no desiredChainId is set in the <ThirdwebProvider />, so we don't care about the network mismatch
    return false;
  }
  if (!walletChainId) {
    // means no wallet is connected yet, so we don't care about the network mismatch
    return false;
  }
  // check if the chainIds are different
  return desiredChainId !== walletChainId;
}

/**
 * @internal
 */
function useAccount() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useNetwork() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own network logic.`);
  return wagmi.useAccount();
}

/**
 * Hook for getting metadata about the network the current wallet is connected to and switching networks
 *
 * @example
 * ```javascript
 * import { useNetwork, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   const [, switchNetwork] = useNetwork();
 *
 *   return (
 *     <button onClick={() => switchNetwork(ChainId.Polygon)}>
 *        Switch Network
 *     </button>
 *   );
 * };
```
 *
 * It's important to note that some wallet apps do not support programmatic network switching and switchNetwork will be undefined.
 * For those situations, you can typically switch networks in the wallet app this hook will still work.
 *
 * @public
 */

function useNetwork() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useNetwork() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own network logic.`);
  return wagmi.useNetwork();
}

/**
 * Hook for disconnecting the currently connected wallet
 *
 * ```javascript
 * import { useDisconnect } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * The following will enable users to disconnect their wallet from the page.
 * ```javascript
 * import { useDisconnect } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const disconnect = useDisconnect()
 *
 *   return (
 *     <button onClick={disconnect}>
 *       Disconnect
 *     </button>
 *   )
 * }
 * ```
 *
 * Once users disconnect their wallet, the `useAddress`, `useChainId`, `useAccount`, and `useNetwork` hooks will no longer return values until a user connects their wallet again.
 *
 * @public
 */
function useDisconnect(options) {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useDisconnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own connection logic.`);
  const optsWithDefaults = {
    ...{
      reconnectPrevious: true
    },
    ...options
  };
  const [, connect] = useConnect.useConnect();
  const [data, disconnect] = wagmi.useAccount();
  return async () => {
    // if there is a previous connector get it
    const previousConnector = data?.data?.connector?.previousConnector || undefined;
    // if it's gnosis, just connect the previous connector
    if (optsWithDefaults.reconnectPrevious && previousConnector) {
      try {
        return await connect(previousConnector);
      } catch (err) {
        console.error("failed to re-connect to previous connector", err);
        // if it fails for whatever reason just disconnect
        return disconnect();
      }
    }
    return disconnect();
  };
}

function detectEnv(userAgent) {
  return detectBrowser.detect(userAgent);
}

/**
 * @internal
 */
function isAndroid() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("android") : false;
}

/**
 * @internal
 */
function isIOS() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("ios") || os.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 : false;
}

/**
 * @internal
 */
function detectOS() {
  const env = detectEnv();
  return env?.os ? env.os : undefined;
}

/**
 * @internal
 */
function isMobile() {
  const os = detectOS();
  return os ? isAndroid() || isIOS() : false;
}

/**
 * Hook for connecting to a Metamask wallet.
 *
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allow users to connect their metamask wallets as follows:
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithMetamask = useMetamask()
 *
 *   return (
 *     <button onClick={connectWithMetamask}>
 *       Connect Metamask
 *     </button>
 *   )
 * }
 * ```
 * Here, we use the `useMetamask` hook to handle metamask connection.
 * When a user clicks the button, we'll call the `connectWithMetamask` function, which will prompt users to connect their metamask wallet.
 *
 * @public
 */
function useMetamask() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useMetamask() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect.useConnect();
  const isMetaMaskInjected = typeof window !== "undefined" && window.ethereum?.isMetaMask;
  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;

  // injected connector
  const injectedConnector = connectors.data.connectors.find(c => c.id === "injected");
  // walletConnect connector
  const walletConnectConnector = connectors.data.connectors.find(c => c.id === "walletConnect");
  const connector = (shouldUseWalletConnect ? walletConnectConnector : injectedConnector) || injectedConnector;
  invariant__default["default"](connector, "No connector found, please make sure you provide the InjectedConnector to your <ThirdwebProvider />");
  return async () => {
    // if we don't have an injected provider
    if (!isMetaMaskInjected) {
      // this is the fallback uri that should work no matter what
      const uri = `https://metamask.app.link/dapp/${window.location.toString()}`;

      // open whatever uri we end up with in a new tab
      window.open(uri, "_blank");
      return Promise.resolve({
        error: new Error("metamask not injected")
      });
    }

    // otherwise we have MM avaiable, so we can just use it
    return await connect(connector);
  };
}

globalThis.Buffer = buffer.Buffer;

/**
 * Hook for connecting to a mobile wallet with Wallet Connect
 *
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allows user to connect their mobile wallets as follows:
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithWalletConnect = useWalletConnect()
 *
 *   return (
 *     <button onClick={connectWithWalletConnect}>
 *       Connect WalletConnect
 *     </button>
 *   )
 * }
 * ```
 *
 * When users click this button, a popup will appear on the screen prompting them to scan a QR code from their phone to connect their mobile wallets.
 * Once they scan the QR code from a wallet connect supported mobile wallet, their wallet will then be connected to the page as expected.
 *
 * @public
 */
function useWalletConnect() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useWalletConnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect.useConnect();
  if (connectors.loading) {
    return () => Promise.reject("WalletConnect connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find(c => c.id === "walletConnect");
  invariant__default["default"](connector, "WalletConnect connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return () => connect(connector);
}

globalThis.Buffer = buffer.Buffer;

/**
 * Hook for connecting to a Coinbase wallet.
 *
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allow users to connect with Coinbase Wallet as follows:
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithCoinbaseWallet = useCoinbaseWallet()
 *
 *   return (
 *     <button onClick={connectWithCoinbaseWallet}>
 *       Connect Coinbase Wallet
 *     </button>
 *   )
 * }
 * ```
 *
 * Upon clicking this button, users will be prompted with a popup asking them scan a QR code with their Coinbase Wallet.
 * Once they scan the QR code, their wallet will then be connected to the page as expected.
 *
 * @public
 */
function useCoinbaseWallet() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useCoinbaseWallet() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect.useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Coinbase connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find(c => c.id === "coinbasewallet");
  invariant__default["default"](connector, "Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return () => connect(connector);
}

/**
 * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
 * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
 * @internal
 */
function useWalletLink() {
  return useCoinbaseWallet();
}

exports.ThirdwebProvider = ThirdwebProvider;
exports.ThirdwebSDKProvider = ThirdwebSDKProvider;
exports.WrappedThirdwebSDKProvider = WrappedThirdwebSDKProvider;
exports.compilerMetadata = compilerMetadata;
exports.contractType = contractType;
exports.getErc1155 = getErc1155;
exports.getErc20 = getErc20;
exports.getErc721 = getErc721;
exports.getErcs = getErcs;
exports.useAcceptDirectListingOffer = useAcceptDirectListingOffer;
exports.useAccount = useAccount;
exports.useActiveClaimCondition = useActiveClaimCondition;
exports.useActiveClaimConditionForWallet = useActiveClaimConditionForWallet;
exports.useActiveListings = useActiveListings;
exports.useAddress = useAddress;
exports.useAirdropNFT = useAirdropNFT;
exports.useAllRoleMembers = useAllRoleMembers;
exports.useAuctionWinner = useAuctionWinner;
exports.useAuth = useAuth;
exports.useBalance = useBalance;
exports.useBatchesToReveal = useBatchesToReveal;
exports.useBidBuffer = useBidBuffer;
exports.useBurnNFT = useBurnNFT;
exports.useBurnToken = useBurnToken;
exports.useBuyNow = useBuyNow;
exports.useCancelListing = useCancelListing;
exports.useChainId = useChainId;
exports.useClaimConditions = useClaimConditions;
exports.useClaimIneligibilityReasons = useClaimIneligibilityReasons;
exports.useClaimNFT = useClaimNFT;
exports.useClaimToken = useClaimToken;
exports.useClaimedNFTSupply = useClaimedNFTSupply;
exports.useClaimedNFTs = useClaimedNFTs;
exports.useClaimerProofs = useClaimerProofs;
exports.useCoinbaseWallet = useCoinbaseWallet;
exports.useCompilerMetadata = useCompilerMetadata;
exports.useConnectedWallet = useConnectedWallet;
exports.useContract = useContract;
exports.useContractEvents = useContractEvents;
exports.useContractMetadata = useContractMetadata;
exports.useContractMetadataUpdate = useContractMetadataUpdate;
exports.useContractRead = useContractRead;
exports.useContractType = useContractType;
exports.useContractWrite = useContractWrite;
exports.useCreateAuctionListing = useCreateAuctionListing;
exports.useCreateDirectListing = useCreateDirectListing;
exports.useDelayedRevealLazyMint = useDelayedRevealLazyMint;
exports.useDesiredChainId = useDesiredChainId;
exports.useDisconnect = useDisconnect;
exports.useEdition = useEdition;
exports.useEditionDrop = useEditionDrop;
exports.useExecuteAuctionSale = useExecuteAuctionSale;
exports.useGrantRole = useGrantRole;
exports.useIsAddressRole = useIsAddressRole;
exports.useLazyMint = useLazyMint;
exports.useListing = useListing;
exports.useListings = useListings;
exports.useListingsCount = useListingsCount;
exports.useLogin = useLogin;
exports.useLogout = useLogout;
exports.useMakeBid = useMakeBid;
exports.useMakeOffer = useMakeOffer;
exports.useMarketplace = useMarketplace;
exports.useMetadata = useMetadata;
exports.useMetamask = useMetamask;
exports.useMinimumNextBid = useMinimumNextBid;
exports.useMintNFT = useMintNFT;
exports.useMintNFTSupply = useMintNFTSupply;
exports.useMintToken = useMintToken;
exports.useMultiwrap = useMultiwrap;
exports.useNFT = useNFT;
exports.useNFTBalance = useNFTBalance;
exports.useNFTCollection = useNFTCollection;
exports.useNFTDrop = useNFTDrop;
exports.useNFTs = useNFTs;
exports.useNetwork = useNetwork;
exports.useNetworkMismatch = useNetworkMismatch;
exports.useOffers = useOffers;
exports.useOwnedNFTs = useOwnedNFTs;
exports.usePack = usePack;
exports.usePlatformFees = usePlatformFees;
exports.usePrimarySaleRecipient = usePrimarySaleRecipient;
exports.useReadonlySDK = useReadonlySDK;
exports.useResetClaimConditions = useResetClaimConditions;
exports.useRevealLazyMint = useRevealLazyMint;
exports.useRevokeRole = useRevokeRole;
exports.useRoleMembers = useRoleMembers;
exports.useRoyaltySettings = useRoyaltySettings;
exports.useSDK = useSDK;
exports.useSDKChainId = useSDKChainId;
exports.useSetAllRoleMembers = useSetAllRoleMembers;
exports.useSetClaimConditions = useSetClaimConditions;
exports.useSignatureDrop = useSignatureDrop;
exports.useSigner = useSigner;
exports.useSplit = useSplit;
exports.useStorage = useStorage;
exports.useStorageUpload = useStorageUpload;
exports.useToken = useToken;
exports.useTokenBalance = useTokenBalance;
exports.useTokenDecimals = useTokenDecimals;
exports.useTokenDrop = useTokenDrop;
exports.useTokenSupply = useTokenSupply;
exports.useTotalCirculatingSupply = useTotalCirculatingSupply;
exports.useTotalCount = useTotalCount;
exports.useTransferBatchToken = useTransferBatchToken;
exports.useTransferNFT = useTransferNFT;
exports.useTransferToken = useTransferToken;
exports.useUnclaimedNFTSupply = useUnclaimedNFTSupply;
exports.useUnclaimedNFTs = useUnclaimedNFTs;
exports.useUpdateMetadata = useUpdateMetadata;
exports.useUpdatePlatformFees = useUpdatePlatformFees;
exports.useUpdatePrimarySaleRecipient = useUpdatePrimarySaleRecipient;
exports.useUpdateRoyaltySettings = useUpdateRoyaltySettings;
exports.useUser = useUser;
exports.useVote = useVote;
exports.useWalletConnect = useWalletConnect;
exports.useWalletLink = useWalletLink;
exports.useWinningBid = useWinningBid;
