import { RequiredParam } from "../../../core/query-utils/required-param";
import { ClaimTokenParams, TokenBurnParams, TokenContract, TokenParams, WalletAddress } from "../../types";
/** **********************/
/**     READ  HOOKS     **/
/** **********************/
/**
 * Use this to get a the total supply of your {@link Erc20} contract.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalSupply, isLoading, error } = useTokenSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that incudes the total minted supply
 * @twfeature ERC20
 * @beta
 */
export declare function useTokenSupply(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseQueryResult<{
    symbol: string;
    value: import("ethers").BigNumber;
    name: string;
    decimals: number;
    displayValue: string;
}, unknown>;
/**
 * Use this to get the balance of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: balance, isLoading, error } = useTokenBalance(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the balance of the address
 * @twfeature ERC20
 * @beta
 */
export declare function useTokenBalance(contract: RequiredParam<TokenContract>, walletAddress: RequiredParam<WalletAddress>): import("@tanstack/react-query").UseQueryResult<{
    symbol: string;
    value: import("ethers").BigNumber;
    name: string;
    decimals: number;
    displayValue: string;
}, unknown>;
/**
 * Use this to get the decimals of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: decimals, isLoading, error } = useTokenDecimals(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the decimals of the ERC20 token
 * @twfeature ERC20
 * @beta
 */
export declare function useTokenDecimals(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseQueryResult<number, unknown>;
/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to mint new tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintTokens,
 *     isLoading,
 *     error,
 *   } = useMintToken(contract);
 *
 *   if (error) {
 *     console.error("failed to mint tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to mint new tokens to the connected wallet
 * @twfeature ERC20Mintable
 * @beta
 */
export declare function useMintToken(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, TokenParams, unknown>;
/**
 * Use this to claim tokens on your {@link Erc20}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimTokens,
 *     isLoading,
 *     error,
 *   } = useClaimToken(contract);
 *
 *   if (error) {
 *     console.error("failed to claim tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimTokens({ to: "0x...", amount: 100 })}
 *     >
 *       Claim Tokens!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to tokens to the wallet specificed in the params
 * @twfeature ERC20ClaimableWithConditions
 * @beta
 */
export declare function useClaimToken(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, ClaimTokenParams, unknown>;
/**
 * Use this to transfer tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer tokens
 * @twfeature ERC20
 * @beta
 */
export declare function useTransferToken(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, TokenParams, unknown>;
/**
 * Use this to transfer batch tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferBatchTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferBatchTokens([{ to: "0x...", amount: 1000 }, { to: "0x...", amount: 2000 }])}
 *     >
 *       Transfer Batch
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer batch tokens
 * @twfeature ERC20
 * @beta
 */
export declare function useTransferBatchToken(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseMutationResult<void, unknown, TokenParams[], unknown>;
/**
 * Use this to burn tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnTokens,
 *     isLoading,
 *     error,
 *   } = useBurnToken(contract);
 *
 *   if (error) {
 *     console.error("failed to burn tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnTokens({ amount: 1000 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to burn tokens from the connected wallet
 * @twfeature ERC20Burnable
 * @beta
 */
export declare function useBurnToken(contract: RequiredParam<TokenContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, TokenBurnParams, unknown>;
//# sourceMappingURL=token.d.ts.map