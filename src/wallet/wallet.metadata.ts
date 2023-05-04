import type { IWallet } from '../types'
import * as icons from './icons.json'

const createWalletMetadata = (walletPreset: Omit<IWallet, 'installed' | 'adapter'>): IWallet =>
  Object.freeze({
    ...walletPreset,
    installed: false,
    adapter: null
  })

export const CompatibleWallets = ['SUI', 'SUIET', 'GLASS', 'ETHOS', 'SURF', 'NIGHTLY'] as const

export const WalletMetadata: Readonly<Record<(typeof CompatibleWallets)[number], IWallet>> = {
  SUI: createWalletMetadata({
    displayName: 'Sui Wallet',
    icon: icons['SUI'],
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil'
    }
  }),
  SUIET: createWalletMetadata({
    displayName: 'Suiet',
    icon: icons['SUIET'],
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd'
    }
  }),
  GLASS: createWalletMetadata({
    displayName: 'GlassWallet',
    icon: icons['GLASS'],
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/glass-wallet-sui-wallet/loinekcabhlmhjjbocijdoimmejangoa'
    }
  }),
  ETHOS: createWalletMetadata({
    displayName: 'Ethos Wallet',
    icon: icons['ETHOS'],
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli'
    }
  }),
  SURF: createWalletMetadata({
    displayName: 'Surf Wallet',
    icon: icons['SURF'],
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/surf-wallet/emeeapjkbcbpbpgaagfchmcgglmebnen'
    }
  }),
  NIGHTLY: createWalletMetadata({
    displayName: 'Nightly Wallet',
    icon: icons['NIGHTLY'], 
    downloadUrls: {
      chrome: 'https://chrome.google.com/webstore/detail/nightly/fiikommddbeccaoicoejoniammnalkfa'
    }
  })
}

export const DefaultWallets = [
  WalletMetadata.SUI,
  WalletMetadata.SUIET,
  WalletMetadata.NIGHTLY,
  WalletMetadata.GLASS,
  WalletMetadata.ETHOS,
  WalletMetadata.SURF
]
