import { Chain, ValidChains } from ".";
import { Nullable } from "./generic";

export type IWalletMetadata = {
  displayName: string;
};

export type IWalletStore = {
  // TODO Implement
};

export type IWalletStoreProps = {
  debug?: boolean;
  chain?: Partial<Record<ValidChains, Partial<Chain>>>;
};
