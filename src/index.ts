import { App } from "vue";
import { initWallet, useWallet } from "./useWallet.js";
import { IWalletStoreProps } from "./types";

export * from "./useWallet.js";

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
