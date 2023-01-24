// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ENV_PROJECT_ID, ENV_RELAY_URL } from '@env';
import UniversalProvider from '@walletconnect/universal-provider';

export let providerGlobal: UniversalProvider;

export async function createUniversalProvider() {
    providerGlobal = await UniversalProvider.init({
        logger: 'info',
        relayUrl: ENV_RELAY_URL,
        projectId: ENV_PROJECT_ID,
        metadata: {
            name: 'React Native DApp',
            description: 'React Native DApp for WalletConnect',
            url: 'https://walletconnect.com/',
            icons: ['https://avatars.githubusercontent.com/u/37784886'],
        },
        client: undefined,
    });
}

const subscribeProviderToEvents = () => {
    // Subscribe for pairing URI
    providerGlobal.on('display_uri', uri => {
        deepLink('', uri);
    });

    // Subscribe to session ping
    providerGlobal.on('session_ping', ({ id, topic }) => {
        log('id,topic: ', id, topic);
    });

    // Subscribe to session event
    providerGlobal.on('session_event', ({ event, chainId }) => {
        log('event, chainId', event, chainId);
    });

    // Subscribe to session update
    providerGlobal.on('session_update', ({ topic, params }) => {
        log('topic,params: ', topic, params);
    });

    // Subscribe to session delete
    providerGlobal.on('session_delete', ({ id, topic }) => {
        log('id,topic', id, topic);
    });

    providerGlobal.on('session_proposal', event => { });
};

const connectWithProvider = async () => {
    try {
        const what = await providerGlobal.connect({
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