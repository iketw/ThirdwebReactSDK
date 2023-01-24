import SignClient from '@walletconnect/sign-client';
// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ENV_PROJECT_ID, ENV_RELAY_URL } from '@env';

export let signClient: SignClient;

export async function createSignClient() {
  console.log('[CONFIG] ENV_PROJECT_ID:', ENV_PROJECT_ID);
  console.log('[CONFIG] ENV_RELAY_URL:', ENV_RELAY_URL);

  signClient = await SignClient.init({
    logger: 'debug',
    projectId: ENV_PROJECT_ID,
    relayUrl: ENV_RELAY_URL,
    metadata: {
      name: 'React Native Wallet',
      description: 'React Native Wallet for WalletConnect',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
  });
}

const subscribeClientToEvents = () => {
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

const connectWithSignClient = async () => {
  const { uri, approval } = await signClient.connect({
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
