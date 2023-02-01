import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {apiGetChainNamespace, ChainsMap} from 'caip-api';
import UniversalProvider from '@walletconnect/universal-provider';
import {PairingTypes, SessionTypes} from '@walletconnect/types';
import Client from '@walletconnect/sign-client';

import {
  DEFAULT_LOGGER,
  DEFAULT_PROJECT_ID,
  DEFAULT_RELAY_URL,
} from './constants';
import {providers, utils} from 'ethers';
import {AccountBalances, ChainNamespaces} from './helpers';
import {Linking} from 'react-native';
import {deepLink, getAllChainNamespaces, log} from './utils';
/**
 * Types
 */
interface IContext {
  client: Client | undefined;
  session: SessionTypes.Struct | undefined;
  connect: (caipChainId: string, pairing?: {topic: string}) => Promise<void>;
  disconnect: () => Promise<void>;
  isInitializing: boolean;
  chain: string;
  pairings: PairingTypes.Struct[];
  accounts: string[];
  balances: AccountBalances;
  isFetchingBalances: boolean;
  chainData: ChainNamespaces;
  web3Provider?: providers.Web3Provider;
}

/**
 * Context
 */
export const ClientContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
/**
 * Provider
 */
export function ClientContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [client, setClient] = useState<Client>();
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
  const [session, setSession] = useState<SessionTypes.Struct>();

  const [displayUri, setDisplayUri] = useState<string | undefined>();

  const [ethereumProvider, setEthereumProvider] = useState<UniversalProvider>();
  const [web3Provider, setWeb3Provider] = useState<providers.Web3Provider>();

  const [isFetchingBalances, setIsFetchingBalances] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasCheckedPersistedSession, setHasCheckedPersistedSession] =
    useState(false);

  const [balances, setBalances] = useState<AccountBalances>({});
  const [accounts, setAccounts] = useState<string[]>([]);
  const [chainData, setChainData] = useState<ChainNamespaces>({});
  const [chain, setChain] = useState<string>('');

  const resetApp = () => {
    setPairings([]);
    setSession(undefined);
    setBalances({});
    setAccounts([]);
    setChain('');
  };

  const loadChainData = async () => {
    const namespaces = getAllChainNamespaces();
    const localChainData: ChainNamespaces = {};
    await Promise.all(
      namespaces.map(async namespace => {
        let chains: ChainsMap | undefined;
        try {
          chains = await apiGetChainNamespace(namespace);
        } catch (e) {
          // ignore error
        }
        if (typeof chains !== 'undefined') {
          localChainData[namespace] = chains;
        }
      }),
    );
    setChainData(localChainData);
  };

  const disconnect = useCallback(async () => {
    if (typeof ethereumProvider === 'undefined') {
      throw new Error('ethereumProvider is not initialized');
    }
    await ethereumProvider.disconnect();
    resetApp();
  }, [ethereumProvider]);

  const _subscribeToProviderEvents = useCallback(
    async (_client: UniversalProvider) => {
      if (typeof _client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }

      _client.on('display_uri', async (uri: string) => {
        log('EVENT', 'QR Code Modal open');
        setDisplayUri(uri);
        deepLink('', uri);
      });

      // Subscribe to session ping
      _client.on('session_ping', ({id, topic}: {id: number; topic: string}) => {
        log('EVENT', 'session_ping');
        log(id, topic);
      });

      // Subscribe to session event
      _client.on(
        'session_event',
        ({event, chainId}: {event: any; chainId: string}) => {
          log('EVENT', 'session_event');
          log(event, chainId);
        },
      );

      // Subscribe to session update
      _client.on(
        'session_update',
        ({
          topic,
          session: sessionP,
        }: {
          topic: string;
          session: SessionTypes.Struct;
        }) => {
          log('EVENT', 'session_updated');
          setSession(sessionP);
        },
      );

      // Subscribe to session delete
      _client.on(
        'session_delete',
        ({id, topic}: {id: number; topic: string}) => {
          log('EVENT', 'session_deleted');
          log(id, topic);
          resetApp();
        },
      );

      _client.on(
        'subscription_deleted',
        ({id, topic}: {id: number; topic: string}) => {
          log('EVENT', 'subscription_deleted');
          log(id, topic);
          resetApp();
        },
      );

      _client.client.on(
        'session_update',
        (namespaces) => {
          log('EVENT', 'session_updated_client', namespaces);
        },
      );

      _client.client.on('session_delete', (id, topic) => {
        log('EVENT', 'session_delete_client', id, topic);
      });
    },
    [],
  );

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);

      const provider = await UniversalProvider.init({
        projectId: DEFAULT_PROJECT_ID,
        logger: DEFAULT_LOGGER,
        relayUrl: DEFAULT_RELAY_URL,
        metadata: {
          name: 'React Native DApp',
          description: 'React Native DApp for WalletConnect',
          url: 'https://walletconnect.com/',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
        },
      });

      setEthereumProvider(provider);
      setClient(provider.client);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const createWeb3Provider = useCallback(
    (ethereumProviderP: UniversalProvider) => {
      const localWeb3Provider = new providers.Web3Provider(ethereumProviderP);
      setWeb3Provider(localWeb3Provider);
    },
    [],
  );

  const connect = useCallback(
    async (caipChainId: string, pairing?: {topic: string}) => {
      if (!ethereumProvider) {
        throw new ReferenceError('WalletConnect Client is not initialized.');
      }

      const chainId = caipChainId.split(':').pop();

      log('Enabling EthereumProvider for chainId: ', chainId);

      // const customRpcs = Object.keys(chainData.eip155).reduce(
      //   (rpcs: Record<string, string>, chainIdP) => {
      //     rpcs[chainIdP] = chainData.eip155[chainId].rpc[0];
      //     return rpcs;
      //   },
      //   {},
      // );

      const sessionC = await ethereumProvider.connect({
        namespaces: {
          eip155: {
            methods: [
              'eth_sendTransaction',
              'eth_signTransaction',
              'eth_sign',
              'personal_sign',
              'eth_signTypedData',
            ],
            chains: [`eip155:${chainId}`],
            events: ['chainChanged', 'accountsChanged'],
            rpcMap: {
              1: 'https://ethereum.rpc.thirdweb.com',
            },
          },
        },
        pairingTopic: pairing?.topic,
      });

      createWeb3Provider(ethereumProvider);
      const _accounts = await ethereumProvider.enable();
      log('_accounts', _accounts);
      setAccounts(_accounts);
      setSession(sessionC);
      setChain(caipChainId);
    },
    [ethereumProvider, createWeb3Provider],
  );

  const onSessionConnected = useCallback(
    async (_session: SessionTypes.Struct) => {
      if (!ethereumProvider) {
        throw new ReferenceError('EthereumProvider is not initialized.');
      }
      const allNamespaceAccounts = Object.values(_session.namespaces)
        .map(namespaceP => namespaceP.accounts)
        .flat();
      const allNamespaceChains = Object.keys(_session.namespaces);

      const chainDataC = allNamespaceAccounts[0].split(':');
      const caipChainId = `${chainDataC[0]}:${chainDataC[1]}`;
      log('restored caipChainId', caipChainId);
      setChain(caipChainId);
      setSession(_session);
      setAccounts(allNamespaceAccounts.map(account => account.split(':')[2]));
      log('RESTORED', allNamespaceChains, allNamespaceAccounts);
      createWeb3Provider(ethereumProvider);
    },
    [ethereumProvider, createWeb3Provider],
  );

  const _checkForPersistedSession = useCallback(
    async (provider: UniversalProvider) => {
      if (typeof provider === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      const pairingsC = provider.client.pairing.getAll({active: true});
      log("pairingsC", pairingsC);
      // populates existing pairings to state
      setPairings(pairingsC);
      if (typeof session !== 'undefined') {
        return;
      }
      // populates (the last) existing session to state
      if (provider.client.session.length > 0) {
        const _session = provider.client.session.getAll()[0];
        log('RESTORED SESSION:', _session);
        await onSessionConnected(_session);
        return _session;
      }
    },
    [session, onSessionConnected],
  );

  useEffect(() => {
    loadChainData();
  }, []);

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  useEffect(() => {
    if (ethereumProvider) {
      log('subscribing to provider events');
      _subscribeToProviderEvents(ethereumProvider);
    }
  }, [_subscribeToProviderEvents, ethereumProvider]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!web3Provider || !accounts) {
        return;
      }

      try {
        setIsFetchingBalances(true);
        const _balances = await Promise.all(
          accounts.map(async account => {
            const balance = await web3Provider.getBalance(account);
            return {
              account,
              symbol: 'ETH',
              balance: utils.formatEther(balance),
              contractAddress: '',
            };
          }),
        );

        const balancesByAccount = _balances.reduce((obj, balance) => {
          obj[balance.account] = balance;
          return obj;
        }, {} as AccountBalances);

        setBalances(balancesByAccount);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setIsFetchingBalances(false);
      }
    };

    fetchBalances();
  }, [web3Provider, accounts]);

  useEffect(() => {
    const getPersistedSession = async () => {
      if (!ethereumProvider) {
        return;
      }
      log('check session');
      await _checkForPersistedSession(ethereumProvider);
      setHasCheckedPersistedSession(true);
    };

    if (ethereumProvider && !hasCheckedPersistedSession) {
      getPersistedSession();
    }
  }, [
    ethereumProvider,
    chainData,
    _checkForPersistedSession,
    hasCheckedPersistedSession,
  ]);

  const value = useMemo(
    () => ({
      pairings,
      isInitializing,
      balances,
      isFetchingBalances,
      accounts,
      chain,
      client,
      session,
      disconnect,
      connect,
      chainData,
      web3Provider,
      displayUri,
    }),
    [
      pairings,
      isInitializing,
      balances,
      isFetchingBalances,
      accounts,
      chain,
      client,
      session,
      disconnect,
      connect,
      chainData,
      web3Provider,
      displayUri,
    ],
  );

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      'useWalletConnectClient must be used within a ClientContextProvider',
    );
  }
  return context;
}
