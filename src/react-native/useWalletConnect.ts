import { useCallback, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { useAccount, useClient, useConnect, useProvider, useSigner } from "wagmi";
import { WalletConnectConnector } from "wagmi/dist/connectors/walletConnect";
import { log } from "../utils";
import { ExternalProvider } from "@ethersproject/providers";
import { Linking } from "react-native";
import UniversalProvider from "@walletconnect/universal-provider/dist/types/UniversalProvider";

globalThis.Buffer = Buffer;

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
 * import { useWalletConnect } from "@thirdweb-dev/react-native"
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
export function useWalletConnect() {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<UniversalProvider | undefined>(undefined);
  const client = useClient();
  invariant(
    client,
    `useWalletConnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`,
  );
  const { connect, connectors, error: connectError, isLoading, isSuccess } =
    useConnect();

  const { address: account } = useAccount()

  const walletConnector = connectors.find(
    (c) => c.id === "walletConnect",
  ) as WalletConnectConnector;
  invariant(
    walletConnector,
    "WalletConnectConnector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  useEffect(() => {
    // wagmi storage doesn't support async storage so we need to let it know that we are connected
    const getProvider = async () => {
      const provider = await walletConnector.getProvider();
      const univProvider = provider as unknown as UniversalProvider;

      if (univProvider.client.session.length > 0) {
        setUri(`wc:${univProvider.client.session.values[0].topic}@2`);
        setTimeout(() => {
          connect({ connector: walletConnector });
        }, 100);
      }

      console.log('on_request before');
      univProvider.client.on("on_request", () => {
        console.log('on_request');
      });

      setProvider(univProvider);
    }

    getProvider();
  }, [])

  // const listener = useCallback((errorRP, payload) => {
  //   if (account && uri) {
  //     //Linking.openURL(uri)
  //   }
  // }, [account, uri])

  // useEffect(() => {
  //   if (!provider) {
  //     return;
  //   }
  //   provider.client.core.relayer.on("relayer_publish", listener);
  //   return () => {
  //     provider.client.core.relayer.removeListener("relayer_publish", listener);
  //   };
  // }, [provider, listener]);

  useEffect(() => {
    walletConnector.addListener('message', async ({ type, data }) => {
      switch (type) {
        case 'display_uri':
          invariant(typeof data === 'string', 'display_uri message data must be a string')
          setUri(data.split('?')[0]);
          console.log('display_uri', data);
          Linking.openURL(data);
          break;
      }
    })
    return () => {
      walletConnector.removeAllListeners();
    }
  }, [walletConnector]);

  return { connector: walletConnector, connect: () => { connect({ connector: walletConnector }) }, isLoading: isLoading, isSuccess: isSuccess, connectError }
}
