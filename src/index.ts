import './vuiet.css'

import type { App } from 'vue'
import { initWallet, useWallet } from './composables/useWallet.js'
import type { IWalletStoreProps } from './types'

export * from './components/'
export * from './composables/'
export * from './constants/'
export * from './types/'
export * from './wallet/'

/**
 * Vue plugin for the Sui Wallet
 * @param app Vue app
 * @param options Wallet store options
 */
export default {
  install: (app: App, options: IWalletStoreProps = {}) => {
    initWallet(options)
    if(options?.shouldGlobal) app.config.globalProperties.$wallet = useWallet()
  }
}
