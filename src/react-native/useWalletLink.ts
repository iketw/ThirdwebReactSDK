import { Buffer } from "buffer";
import { useCallback, useEffect } from "react";
import invariant from "tiny-invariant";
import { useClient, useConnect } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/dist/connectors/coinbaseWallet";
import { log } from "../utils";
import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';

globalThis.Buffer = Buffer;

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
export function useCoinbaseWallet() {
  const wagmiContext = useClient();
  invariant(
    wagmiContext,
    `useCoinbaseWallet() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`,
  );
  const { connect, connectors, error, isLoading, isSuccess } =
    useConnect();

  log("useCoinbaseWallet", connectors.length)

  const connector = connectors.find(
    (c) => c.id === "coinbaseWallet"
  );

  useEffect(() => {
    _subscribeConnector(connector as CoinbaseWalletConnector)
  }, [connector]);

  const _subscribeConnector = useCallback((walletConnector: CoinbaseWalletConnector) => {
    walletConnector.addListener('connect', messate => {
      log('connect', messate);

    });
    walletConnector.addListener('message', async ({ type, data }) => {
      console.log("addListener.message", type);
      switch (type) {
        case 'display_uri':
          invariant(typeof data === 'string', 'display_uri message data must be a string')
          //setDisplayUri(data);
          break;
        case 'connecting':
          // Wallet Connect V1
          const provider_ = await walletConnector.getProvider();
          const providerConnector = (provider_ as CoinbaseWalletProvider)
          // setDisplayUri();
          console.log('connecting.url', providerConnector.qrUrl)

          providerConnector.on('disconnect', () => {
            console.log('connector.disconnect')
            // setConnectorError(new Error('Disconnected from WalletConnect'))
          })
          providerConnector.on('connect', () => {
            console.log('connector.connect')
            // const signer = (new providers.Web3Provider(provider_)).getSigner();
            // console.log('signer', signer)
            // sdk?.updateSignerOrProvider(signer);
            // sdk?.wallet.getAddress().then(address => {
            //   console.log('wallet.address', address)
            // }).catch(error => { console.log('error', error) })
          })
          break;
      }
    })
    walletConnector.addListener('error', (error) => {
      console.log('error', error)
      // setConnectorError(error)
    })

    walletConnector.on("connect", (info) => {
      console.log("connect", info);
    });
    walletConnector.on("disconnect", () => {
      console.log("disconnect");
    });
  }, [])

  invariant(
    connector,
    "Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return { connect: () => connect({ connector: connector }), connector }
}

/**
 * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
 * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
 * @internal
 */
export function useWalletLink() {
  return useCoinbaseWallet();
}
