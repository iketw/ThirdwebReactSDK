import { DAppMetaData, WalletConnector } from "@thirdweb-dev/react-native";
import { TW_WC_V2_PROJECT_ID, WC_RELAY_URL } from "../constants/walletConnect";

export const getWalletConnectOptions = (options: WalletConnector, dAppMeta: DAppMetaData) => {
    const walletConnectClientMeta = {
        name: dAppMeta.name,
        url: dAppMeta.url,
        icons: [dAppMeta.logoUrl || ''],
        description: dAppMeta.description || '',
    };

    if (typeof options === 'string') {
        // default to walletconnect v2
        return {
            qrcode: false,
            version: "2",
            projectId: TW_WC_V2_PROJECT_ID,
            relayUrl: WC_RELAY_URL,
            logger: 'info',
            metadata: walletConnectClientMeta,
        };
    }

    const version = options.options.version
    if (version === '2') {
        return {
            ...options.options,
            metadata: walletConnectClientMeta,
        };
    } else {
        return {
            ...options.options,
            clientMeta: walletConnectClientMeta,
        };
    }
}