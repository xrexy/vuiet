import { JsonRpcProvider } from "@mysten/sui.js";
import { Chain, Nullable, ValidChain } from ".";
import { IWalletAdapter } from "src/wallet/wallet.adapter";

export interface SuiProvider extends JsonRpcProvider {}

export type IWallet = {
  displayName: string;
  icon: string;
  adapter: Nullable<IWalletAdapter>;
  installed: boolean;
};

export type IWalletStore = {};

export type IWalletStoreProps = Partial<{
  debug: boolean;
  chainOverwrite: Partial<Record<ValidChain, Partial<Chain>>>;
  chain: ValidChain;
}>;
