import type { JsonRpcProvider } from '@mysten/sui.js'
import type {
  StandardConnectOutput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  WalletAccount
} from '@mysten/wallet-standard'
import type { IWalletAdapter } from '../wallet'
import type { ComputedRef, Ref, ToRefs } from 'vue'
import type { Chain, Nullable, ValidChain } from '.'

export enum IWalletStoreStatus {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  DISCONNECTED = 'disconnected',
  DISCONNECTING = 'disconnecting'
}

export interface SuiProvider extends JsonRpcProvider {}

export type IWallet = {
  displayName: string
  icon: string
  adapter: Nullable<IWalletAdapter>
  installed: boolean

  // All of the current supported sui wallets are only for chrome. 
  // In the future will be added here and detected using the user agent
  downloadUrls: {
    chrome: string
  }
}

export type IWalletStore = {
  provider: SuiProvider
  adapter: Ref<Nullable<IWalletAdapter>>

  // Connectivity
  connecting: Ref<boolean>
  connected: Ref<boolean>
  disconnecting: Ref<boolean>
  status: Ref<IWalletStoreStatus>

  // Chain
  chain: Chain
  chains: Chain[]

  // Available wallets
  wallets: ToRefs<{
    configured: IWallet[]
    detected: IWallet[]
    installed: IWallet[]
    configuredNonDetected: IWallet[]
  }>

  // Computed
  accounts: ComputedRef<readonly WalletAccount[]>
  account: ComputedRef<Nullable<WalletAccount>>
  address: ComputedRef<Nullable<string>>

  // Functions
  select: (walletName: string) => Promise<Nullable<StandardConnectOutput>>
  connect: (adapter: IWalletAdapter) => Promise<StandardConnectOutput>
  disconnect: () => Promise<void>

  signMessage(input: Omit<SuiSignMessageInput, 'account'>): Promise<SuiSignMessageOutput>
  signTransactionBlock(
    input: Omit<SuiSignTransactionBlockInput, 'account' | 'chain'>
  ): Promise<SuiSignTransactionBlockOutput>
  signAndExecuteTransactionBlock(
    input: Omit<SuiSignAndExecuteTransactionBlockInput, 'account' | 'chain'>
  ): Promise<SuiSignAndExecuteTransactionBlockOutput>
}

export type IWalletStoreChainOverwrite = Partial<Record<ValidChain, Partial<Chain>>>

export type IWalletStoreProps = Partial<{
  chainOverwrite: IWalletStoreChainOverwrite
  chain: ValidChain
  autoConnect: boolean
  shouldGlobal: boolean
}>
