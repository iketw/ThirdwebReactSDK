// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ENV_PROJECT_ID, ENV_RELAY_URL } from '@env';
import UniversalProvider from '@walletconnect/universal-provider';

export let provider: UniversalProvider;

export async function createUniversalProvider() {
    provider = await UniversalProvider.init({
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