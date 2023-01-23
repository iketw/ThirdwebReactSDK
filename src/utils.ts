// export function formatNativeUrl(appUrl: string, wcUri: string): string {
//     if (CoreUtil.isHttpUrl(appUrl)) {
//         return this.formatUniversalUrl(appUrl, wcUri, name)
//     }
//     let safeAppUrl = appUrl
//     if (!safeAppUrl.includes('://')) {
//         safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '')
//         safeAppUrl = `${safeAppUrl}://`
//     }
//     const encodedWcUrl = encodeURIComponent(wcUri)

import { ChainId } from '@thirdweb-dev/sdk';
import { providers } from 'ethers';
import { Linking } from 'react-native';
import { provider } from './UniversalProvider';

//     return `${safeAppUrl}wc?uri=${encodedWcUrl}`
// };

export function formatUniversalUrl(appUrl: string, wcUri: string): string {
    if (appUrl.length === 0) {
        return wcUri;
    }

    let plainAppUrl = appUrl;
    if (appUrl.endsWith('/')) {
        plainAppUrl = appUrl.slice(0, -1);
    }
    const encodedWcUrl = encodeURIComponent(wcUri);

    return `${plainAppUrl}/wc?uri=${encodedWcUrl}`;
}

export function deepLink(appUrl: string, uri?: string) {
    if (!uri) {
        throw Error('No URI to deep link to');
    }

    console.log('uri', uri);

    const formattedUri = formatUniversalUrl(appUrl, uri);

    console.log('formattedUri', formattedUri);
    Linking.openURL(formattedUri);

    // Linking.openURL(uri.replace('wc:', 'wc://'));
}

export function getSigner({ chainId }: { chainId?: number } = {}) {
    const chainId_ = ChainId.Mainnet;

    const provider_ = {
        ...provider,
        async request(args) {
            console.log('Custom request', args);
            return await provider.request(
                args,
                `${'eip155'}:${chainId ?? chainId_}`,
            );
        },
    } as providers.ExternalProvider;

    const web3Provider = new providers.Web3Provider(provider_, chainId);
    web3Provider.on('debug', (info, payload) => {
        console.log('info', info);
        console.log('payload', JSON.stringify(payload, null, 2));
    });

    return web3Provider.getSigner();
};
