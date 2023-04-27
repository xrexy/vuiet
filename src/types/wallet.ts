import { JsonRpcProvider } from "@mysten/sui.js";
import {
  StandardConnectOutput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  WalletAccount,
} from "@mysten/wallet-standard";
import { IWalletAdapter } from "src/wallet/wallet.adapter";
import { ComputedRef, Ref, ToRefs } from "vue";
import { Chain, Nullable, ValidChain } from ".";

export enum IWalletStoreStatus {
  CONNECTED = "connected",
  CONNECTING = "connecting",
  DISCONNECTED = "disconnected",
  DISCONNECTING = "disconnecting",
}

export interface SuiProvider extends JsonRpcProvider {}

export type IWallet = {
  displayName: string;
  icon: string;
  adapter: Nullable<IWalletAdapter>;
  installed: boolean;
};

export type IWalletStore = {
  provider: SuiProvider;
  adapter: Ref<Nullable<IWalletAdapter>>;

  // Connectivity
  connecting: Ref<boolean>;
  connected: Ref<boolean>;
  disconnecting: Ref<boolean>;
  status: Ref<IWalletStoreStatus>;

  // Chain
  chain: Chain;
  chains: Chain[];

  // Available wallets
  wallets: ToRefs<{
    configured: IWallet[];
    detected: IWallet[];
    installed: IWallet[];
    configuredNonDetected: IWallet[];
  }>;

  // Computed
  accounts: ComputedRef<readonly WalletAccount[]>;
  account: ComputedRef<Nullable<WalletAccount>>;
  address: ComputedRef<Nullable<string>>;

  // Functions
  select: (walletName: string) => Promise<void>;
  connect: (adapter: IWalletAdapter) => Promise<StandardConnectOutput>;
  disconnect: () => Promise<void>;

  signMessage(
    input: Omit<SuiSignMessageInput, "account">
  ): Promise<SuiSignMessageOutput>;
  signTransactionBlock(
    input: Omit<SuiSignTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignTransactionBlockOutput>;
  signAndExecuteTransactionBlock(
    input: Omit<SuiSignAndExecuteTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignAndExecuteTransactionBlockOutput>;
};

export type IWalletStoreChainOverwrite = Partial<
  Record<ValidChain, Partial<Chain>>
>;

export type IWalletStoreProps = Partial<{
  chainOverwrite: IWalletStoreChainOverwrite;
  chain: ValidChain;
  autoConnect: boolean;
}>;
