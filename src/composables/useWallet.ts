import { ref } from "vue";
import { Chains } from "../constants";
import {
  IWalletStore,
  IWalletStoreProps,
  Nullable,
  ValidChain,
  ValidChainsArr,
} from "../types";
import { WalletAdapter } from "../wallet/wallet.adapter";
import { useAvailableWallets } from "./useAvailableWallets";
import { DefaultWallets } from "../wallet/wallet.metadata";

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
  chainOverwrite,
  chain = "SUI_DEVNET",
  debug = true,
}: IWalletStoreProps): IWalletStore => {
  const connecting = ref(false);
  const disconnecting = ref(false);
  const adapter = ref<Nullable<WalletAdapter>>(null);

  // Overwrite default chain values with user provided values, then freeze the object to prevent further changes.
  {
    if (chainOverwrite) {
      for (const [key, newValue] of Object.entries(chainOverwrite)) {
        if (!isValidChainKey(key)) continue;

        const chain = Chains[key];
        chain.nodeUrl = newValue.nodeUrl || chain.nodeUrl;
        chain.displayName = newValue.displayName || chain.displayName;
        chain.key = newValue.key || chain.key;
        chain.faucetUrl = newValue.faucetUrl || chain.faucetUrl;

        if (debug)
          console.debug(`Overwrote chain ${key}, new value is:`, chain);
      }
    }

    Object.freeze(Chains);
  }

  const {configured, detected, installed} = useAvailableWallets(DefaultWallets);
  console.log(configured.value, 'configured');
  console.log(detected.value, 'detected');
  console.log(installed.value, 'installed');
  const { nodeUrl, faucetUrl } = Chains[chain];

  return {};
};

const isValidChainKey = (key: string): key is ValidChain => {
  return ValidChainsArr.includes(key as any);
};
