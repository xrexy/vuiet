import { App } from "vue";
import { initWallet, useWallet } from "./composables/useWallet.js";
import { IWalletStoreProps } from "./types";

export * from "./composables/";
export * from "./constants/";
export * from "./types/";
export * from "./wallet/";

/**
 * Vue plugin for the Sui Wallet
 * @param app Vue app
 * @param options Wallet store options
 */
export default {
  install: (app: App, options: IWalletStoreProps = {}) => {
    initWallet(options);
    app.config.globalProperties.$wallet = useWallet();
  },
};
