import { Chain } from "@thirdweb-dev/react-core";
import { Chain as WagmiChain } from "wagmi";

export function getWagmiChain(chain: Chain): WagmiChain {
    return {
        ...chain,
        network: chain.name,
        rpcUrls: {
            default: {
                http: chain.rpcUrls
            },
            public: {
                http: chain.rpcUrls
            }
        }
    } as WagmiChain;
}