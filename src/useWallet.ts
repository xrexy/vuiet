import { Chains } from "./constants";
import {
  Nullable,
  IWalletStore,
  IWalletStoreProps,
  ValidChainsArr,
  ValidChains,
} from "./types";

let store: Nullable<IWalletStore> = null;

export const useWallet = (): IWalletStore => {
  if (store) return store;

  throw new Error(
    "Wallet not initialized. Please use the `initWallet` method to initialize the wallet."
  );
};

export const initWallet = (walletStoreProps: IWalletStoreProps): void => {
  store = createWalletStore(walletStoreProps);
};

const createWalletStore = ({
  chain,
  debug = true,
}: IWalletStoreProps): IWalletStore => {
  // Overwrite default chain values with user provided values, then freeze the object to prevent further changes.
  {
    if (chain) {
      for (const [key, newValue] of Object.entries(chain)) {
        if (!isValidChainKey(key)) continue;

        const chain = Chains[key];
        chain.nodeUrl = newValue.nodeUrl || chain.nodeUrl;
        chain.displayName = newValue.displayName || chain.displayName;
        chain.key = newValue.key || chain.key;

        if (debug)
          console.debug(`Overwrote chain ${key}, new value is:`, chain);
      }
    }

    Object.freeze(Chains);
  }

  return {};
};

const isValidChainKey = (key: string): key is ValidChains => {
  return ValidChainsArr.includes(key as any);
};
