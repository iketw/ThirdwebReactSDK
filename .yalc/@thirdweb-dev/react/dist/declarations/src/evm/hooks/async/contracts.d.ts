import { RequiredParam } from "../../../core/query-utils/required-param";
import { ContractAddress } from "../../types";
import { UseQueryResult } from "@tanstack/react-query";
import { ContractEvent, ContractForPrebuiltContractType, ContractType, EventQueryOptions, PrebuiltContractType, SUPPORTED_CHAIN_ID, ThirdwebSDK, ValidContractInstance } from "@thirdweb-dev/sdk";
import type { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { CallOverrides, ContractInterface } from "ethers";
declare function fetchContractType(contractAddress: RequiredParam<ContractAddress>, sdk: RequiredParam<ThirdwebSDK>): Promise<"split" | "edition-drop" | "edition" | "marketplace" | "multiwrap" | "nft-collection" | "nft-drop" | "pack" | "signature-drop" | "token-drop" | "token" | "vote" | "custom" | null>;
export declare function useContractType(contractAddress: RequiredParam<ContractAddress>): UseQueryResult<"split" | "edition-drop" | "edition" | "marketplace" | "multiwrap" | "nft-collection" | "nft-drop" | "pack" | "signature-drop" | "token-drop" | "token" | "vote" | "custom" | null, unknown>;
export declare const contractType: {
    cacheKey: (contractAddress: RequiredParam<ContractAddress>, chainId: RequiredParam<SUPPORTED_CHAIN_ID>) => import("@tanstack/react-query").QueryKey;
    useQuery: typeof useContractType;
    fetchQuery: typeof fetchContractType;
};
declare function fetchCompilerMetadata(contractAddress: RequiredParam<ContractAddress>, sdk: RequiredParam<ThirdwebSDK>): Promise<{
    name: string;
    metadata: Record<string, any>;
    abi: {
        [x: string]: any;
        type: string;
        name: string;
        inputs: {
            [x: string]: any;
            stateMutability?: string | undefined;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            type: string;
            name: string;
        }[];
        outputs: {
            [x: string]: any;
            stateMutability?: string | undefined;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            type: string;
            name: string;
        }[];
    }[];
    info: {
        title?: string | undefined;
        author?: string | undefined;
        details?: string | undefined;
        notice?: string | undefined;
    };
    licenses: string[];
}> | null;
export declare function useCompilerMetadata(contractAddress: RequiredParam<ContractAddress>): UseQueryResult<{
    name: string;
    metadata: Record<string, any>;
    abi: {
        [x: string]: any;
        type: string;
        name: string;
        inputs: {
            [x: string]: any;
            stateMutability?: string | undefined;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            type: string;
            name: string;
        }[];
        outputs: {
            [x: string]: any;
            stateMutability?: string | undefined;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            type: string;
            name: string;
        }[];
    }[];
    info: {
        title?: string | undefined;
        author?: string | undefined;
        details?: string | undefined;
        notice?: string | undefined;
    };
    licenses: string[];
} | null, unknown>;
export declare const compilerMetadata: {
    cacheKey: (contractAddress: RequiredParam<ContractAddress>, chainId: RequiredParam<SUPPORTED_CHAIN_ID>) => import("@tanstack/react-query").QueryKey;
    useQuery: typeof useCompilerMetadata;
    fetchQuery: typeof fetchCompilerMetadata;
};
export type UseContractResult<TContract extends ValidContractInstance = SmartContract> = UseQueryResult<TContract | undefined> & {
    contract: TContract | undefined;
};
/**
 * Use this resolve a contract address to a smart contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useContract("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract once it is resolved
 * @public
 */
export declare function useContract(contractAddress: RequiredParam<ContractAddress>): UseContractResult<SmartContract>;
/**
 * Use this resolve a contract address to a smart contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useContract("{{contract_address}}", "nft-drop");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @param _contractType - the type of the contract
 * @returns a response object that includes the contract once it is resolved
 * @public
 */
export declare function useContract<TContractType extends ContractType>(contractAddress: RequiredParam<ContractAddress>, _contractType: TContractType): UseContractResult<TContractType extends PrebuiltContractType ? ContractForPrebuiltContractType<TContractType> : SmartContract>;
/**
 * Use this resolve a contract address to a smart contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useContract("{{contract_address}}", ABI);
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @param _abi - the ABI of the contract to use
 * @returns a response object that includes the contract once it is resolved
 * @public
 */
export declare function useContract(contractAddress: RequiredParam<ContractAddress>, _abi: ContractInterface): UseContractResult<SmartContract>;
/**
 * Use this to get the contract metadata for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractMetadata, isLoading, error } = useContractMetadata(>);
 * ```
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to get the metadata for
 * @returns a response object that includes the contract metadata of the deployed contract
 * @twfeature ContractMetadata
 * @beta
 */
export declare function useContractMetadata<TContract extends ValidContractInstance>(contract: RequiredParam<TContract>): UseQueryResult<RequiredParam<TContract> extends undefined ? undefined : Awaited<ReturnType<TContract["metadata"]["get"]>>, unknown>;
/**
 * @internal
 */
export declare function useContractMetadataUpdate(contract: RequiredParam<ValidContractInstance>): import("@tanstack/react-query").UseMutationResult<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<any>;
}, unknown, {
    description?: string | undefined;
    image?: any;
    external_link?: string | undefined;
    name: string;
}, unknown>;
/**
 * CONTRACT EVENTS
 */
/**
 * Use this to query (and subscribe) to events or a specific event on a contract.
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to listen to events for
 * @param eventName - the name of the event to query for (omit this or pass `undefined` to query for all events)
 * @param options - options incldues the filters ({@link QueryAllEvents}) for the query as well as if you want to subscribe to real-time updates (default: true)
 * @returns a response object that includes the contract events
 * @beta
 */
export declare function useContractEvents(contract: RequiredParam<ValidContractInstance>, eventName?: string, options?: {
    queryFilter?: EventQueryOptions;
    subscribe?: boolean;
}): UseQueryResult<ContractEvent<Record<string, any>>[], unknown>;
/**
 * Use this to get data from a contract read-function call.
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { data, isLoading, error } = useContractRead(contract, "functionName", ...args);
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @param args - The arguments to pass to the function (if any), with optional call arguments as the last parameter
 * @returns a response object that includes the data returned by the function call
 *
 * @beta
 */
export declare function useContractRead(contract: RequiredParam<ValidContractInstance>, functionName: RequiredParam<string>, ...args: unknown[] | [...unknown[], CallOverrides]): UseQueryResult<any, unknown>;
/**
 * Use this to get a function to make a write call to your contract
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { mutate: myFunction, isLoading, error } = useContractWrite(contract, "myFunction");
 *
 * // the function can be called as follows:
 * // myFunction(["param 1", "param 2", ...])
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @returns a response object that includes the write function to call
 *
 * @beta
 */
export declare function useContractWrite(contract: RequiredParam<ValidContractInstance>, functionName: RequiredParam<string>): import("@tanstack/react-query").UseMutationResult<any, unknown, unknown[] | [...unknown[], CallOverrides] | undefined, unknown>;
export {};
//# sourceMappingURL=contracts.d.ts.map