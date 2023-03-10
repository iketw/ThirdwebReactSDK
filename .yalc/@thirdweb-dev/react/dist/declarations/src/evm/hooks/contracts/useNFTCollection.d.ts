import { RequiredParam } from "../../../core/query-utils/required-param";
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
export declare function useNFTCollection(contractAddress: RequiredParam<string>): import("@thirdweb-dev/sdk").NFTCollection | undefined;
//# sourceMappingURL=useNFTCollection.d.ts.map