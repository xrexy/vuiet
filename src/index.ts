import './assets/styles.css'

import { App } from "vue";
import { initWallet, useWallet } from "./composables/useWallet.js";
import { IWalletStoreProps } from "./types";

export * from "./composables/index.js";
export * from "./constants/index.js";
export * from "./types/index.js";
export * from "./wallet/index.js";
export * from './components/index.js'

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
