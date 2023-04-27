import { StandardConnectInput, WalletAccount } from "@mysten/wallet-standard";
import { Ref, computed, ref } from "vue";
import { Chains, isValidChainKey } from "../constants";
import {
  IWalletStore,
  IWalletStoreProps,
  IWalletStoreStatus,
  Nullable,
  ValidChainsArr,
} from "../types";
import { LocalStorageKey } from "../types/localStorage";
import { Feature, IWalletAdapter } from "../wallet/wallet.adapter";
import { DefaultWallets } from "../wallet/wallet.metadata";
import { useAvailableWallets } from "./useAvailableWallets";
import { Connection, JsonRpcClient, JsonRpcProvider } from "@mysten/sui.js";

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
}: IWalletStoreProps): IWalletStore => {
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

        // console.log(`Overwrote chain ${key}, new value is:`, chain);
      }
    }

    Object.freeze(Chains);
  }

  const connecting = ref(false);
  const connected = ref(false);
  const disconnecting = ref(false);

  const status = ref<IWalletStoreStatus>(IWalletStoreStatus.DISCONNECTED);
  const adapter = ref<Nullable<IWalletAdapter>>(null);

  const {
    configured: configuredWallets,
    detected: detectedWallets,
    installed: installedWallets,
    configuredNonDetected: configuredNonDetectedWallets,
  } = useAvailableWallets(DefaultWallets);

  // Helper Functions
  async function setStatus(newStatus: IWalletStoreStatus) {
    switch (newStatus) {
      case IWalletStoreStatus.CONNECTING:
        connecting.value = true;
        connected.value = false;
        disconnecting.value = false;
        break;
      case IWalletStoreStatus.CONNECTED:
        connecting.value = false;
        connected.value = true;
        disconnecting.value = false;
        break;
      case IWalletStoreStatus.DISCONNECTED:
        connecting.value = false;
        connected.value = false;
        disconnecting.value = false;
        break;
      case IWalletStoreStatus.DISCONNECTING:
        connecting.value = false;
        connected.value = false;
        disconnecting.value = true;
        break;
    }
  }

  async function select(walletName: string) {
    if (adapter.value) {
      if (adapter.value.name == walletName) return; // Already connected to this wallet

      await adapter.value.disconnect(); // Disconnect from current wallet
    }

    const target = installedWallets.value.find(
      (w) => w.displayName == walletName
    );

    if (!target) {
      const installedWalletsNames = installedWallets.value
        .map((w) => w.displayName)
        .join(", ");

      throw new Error(
        `Wallet ${walletName} not found. (Valid wallets are: ${installedWalletsNames})`
      );
    }

    console.log(target, "target");

    await connect(target.adapter!);
  }

  async function connect(
    connectionAdapter: IWalletAdapter,
    connectionOptions?: StandardConnectInput
  ) {
    if (!connectionAdapter) throw new Error("No adapter provided.");

    setStatus(IWalletStoreStatus.CONNECTING);
    try {
      console.log(connectionAdapter, "connectionAdapter");
      const connectionRes = await connectionAdapter.connect(connectionOptions);

      adapter.value = connectionAdapter;

      setStatus(IWalletStoreStatus.CONNECTED);
      localStorage.setItem(
        LocalStorageKey.PREV_WALLET_NAME,
        connectionAdapter.name
      ); // store in local storage, so we can implement auto-connect in the future
      return connectionRes;
    } catch (error) {
      setStatus(IWalletStoreStatus.DISCONNECTED);
      throw error;
    }
  }

  async function disconnect() {
    console.log(adapter.value, adapter.value?.features);
    if (!adapter.value) return; // Nothing to disconnect from
    if (!adapter.value.hasFeature(Feature.DISCONNECT)) return; // Adapter does not support disconnecting

    try {
      setStatus(IWalletStoreStatus.DISCONNECTING);
      await adapter.value.disconnect();
    } catch (e) {
      console.error(e, "while disconnecting wallet"); // TODO better error handling
    } finally {
      setStatus(IWalletStoreStatus.DISCONNECTED);
      adapter.value = null;
    }
  }

  const accounts = computed<readonly WalletAccount[]>(() => {
    if (!adapter.value) return [];
    return adapter.value.accounts;
  });

  const account = computed(() => {
    if (accounts.value.length == 0) return null;
    return accounts.value[0];
  });

  const address = computed(() => account.value?.address);

  const selectedChain = Chains[chain];
  return {
    provider: new JsonRpcProvider(
      new Connection({
        fullnode: selectedChain.nodeUrl,
        faucet: selectedChain.faucetUrl,
      })
    ),
    adapter,

    connecting,
    connected,
    status,
    disconnecting,

    chain: selectedChain,
    chains: ValidChainsArr.map((key) => Chains[key]),

    wallets: {
      configured: configuredWallets,
      detected: detectedWallets,
      installed: installedWallets,
      configuredNonDetected: configuredNonDetectedWallets,
    },

    accounts,
    account,
    address,

    select,
    connect,
    disconnect,
  };
};
