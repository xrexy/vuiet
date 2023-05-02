import { Connection, JsonRpcProvider } from '@mysten/sui.js'
import type {
  StandardConnectInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  WalletAccount
} from '@mysten/wallet-standard'
import { computed, ref } from 'vue'
import { useAutoConnect, useAvailableWallets } from '.'
import { Chains, isValidChainKey } from '../constants'
import type {
  IWalletStore,
  IWalletStoreChainOverwrite,
  IWalletStoreProps,
  Nullable
} from '../types'
import { IWalletStoreStatus, LocalStorageKey, ValidChainsArr } from '../types'
import { DefaultWallets, Feature, type IWalletAdapter } from '../wallet'
import {} from './useAutoConnect'

let store: Nullable<IWalletStore> = null

export const useWallet = (): IWalletStore => {
  if (store) return store

  throw new Error(
    'Wallet not initialized. Please use the `initWallet` method to initialize the wallet.'
  )
}

export const initWallet = (walletStoreProps: IWalletStoreProps): void => {
  store = createWalletStore(walletStoreProps)
  useAutoConnect({ autoConnect: walletStoreProps.autoConnect })
}

/**
 * Overwrite default chain values with user provided values, then freeze the object to prevent further changes.
 */
function handleChainOverwrites(input: Nullable<IWalletStoreChainOverwrite>) {
  if (input) {
    for (const [key, newValue] of Object.entries(input)) {
      if (!isValidChainKey(key)) continue

      const chain = Chains[key]
      chain.nodeUrl = newValue.nodeUrl || chain.nodeUrl
      chain.displayName = newValue.displayName || chain.displayName
      chain.key = newValue.key || chain.key
      chain.faucetUrl = newValue.faucetUrl || chain.faucetUrl

      // console.log(`Overwrote chain ${key}, new value is:`, chain);
    }
  }

  Object.freeze(Chains)
}

const createWalletStore = ({
  chainOverwrite,
  chain = 'SUI_DEVNET',
  autoConnect = true
}: IWalletStoreProps): IWalletStore => {
  handleChainOverwrites(chainOverwrite)

  const selectedChain = Chains[chain]

  const connecting = ref(false)
  const connected = ref(false)
  const disconnecting = ref(false)

  const status = ref<IWalletStoreStatus>(IWalletStoreStatus.DISCONNECTED)
  const adapter = ref<Nullable<IWalletAdapter>>(null)

  const {
    configured: configuredWallets,
    detected: detectedWallets,
    installed: installedWallets,
    configuredNonDetected: configuredNonDetectedWallets
  } = useAvailableWallets(DefaultWallets)
  // Helper Functions
  async function setStatus(newStatus: IWalletStoreStatus) {
    switch (newStatus) {
      case IWalletStoreStatus.CONNECTING:
        connecting.value = true
        connected.value = false
        disconnecting.value = false
        break
      case IWalletStoreStatus.CONNECTED:
        connecting.value = false
        connected.value = true
        disconnecting.value = false
        break
      case IWalletStoreStatus.DISCONNECTED:
        connecting.value = false
        connected.value = false
        disconnecting.value = false
        break
      case IWalletStoreStatus.DISCONNECTING:
        connecting.value = false
        connected.value = false
        disconnecting.value = true
        break
    }
  }

  async function select(walletName: string) {
    if (adapter.value) {
      if (adapter.value.name == walletName) return // Already connected to this wallet

      await adapter.value.disconnect() // Disconnect from current wallet
    }

    const target = installedWallets.value.find((w) => w.displayName == walletName)
    if (!target) {
      const installedWalletsNames = installedWallets.value.map((w) => w.displayName)

      if (installedWalletsNames.length == 0)
        throw new Error(
          `No wallets installed. Please install a wallet first. Valid wallets are: ${configuredWallets.value
            .map((w) => w.displayName)
            .join(', ')}`
        )

      throw new Error(
        `Wallet ${walletName} not found. (Valid wallets are: ${installedWalletsNames.join(', ')})`
      )
    }

    return await connect(target.adapter!)
  }

  async function connect(
    connectionAdapter: IWalletAdapter,
    connectionOptions?: StandardConnectInput
  ) {
    if (!connectionAdapter) throw new Error('No adapter provided.')

    setStatus(IWalletStoreStatus.CONNECTING)
    try {
      const connectionRes = await connectionAdapter.connect(connectionOptions)

      adapter.value = connectionAdapter

      setStatus(IWalletStoreStatus.CONNECTED)
      if (autoConnect) {
        localStorage.setItem(LocalStorageKey.PREV_WALLET_NAME, connectionAdapter.name)
      }

      return connectionRes
    } catch (error) {
      setStatus(IWalletStoreStatus.DISCONNECTED)
      throw error
    }
  }

  async function disconnect() {
    try {
      setStatus(IWalletStoreStatus.DISCONNECTING)

      if (adapter.value && adapter.value.hasFeature(Feature.DISCONNECT)) {
        await adapter.value.disconnect()
      }

      localStorage.removeItem(LocalStorageKey.PREV_WALLET_NAME)
      setStatus(IWalletStoreStatus.DISCONNECTED)
      adapter.value = null
    } catch (e) {
      console.error(e, 'while disconnecting wallet') // TODO better error handling
    }
  }

  async function signMessage(
    input: Omit<SuiSignMessageInput, 'account'>
  ): Promise<SuiSignMessageOutput> {
    if (!adapter.value || !account.value) {
      throw new Error('No wallet connected')
    }

    return adapter.value.signMessage({
      message: input.message,
      account: account.value
    })
  }

  async function signTransactionBlock(
    input: Omit<SuiSignTransactionBlockInput, 'account' | 'chain'>
  ): Promise<SuiSignTransactionBlockOutput> {
    if (!adapter.value || !account.value) {
      throw new Error('No wallet connected')
    }

    return adapter.value.signTransactionBlock({
      account: account.value,
      chain: selectedChain.key,
      transactionBlock: input.transactionBlock
    })
  }

  async function signAndExecuteTransactionBlock(
    input: SuiSignAndExecuteTransactionBlockInput
  ): Promise<SuiSignAndExecuteTransactionBlockOutput> {
    if (!adapter.value || !account.value) {
      throw new Error('No wallet connected')
    }

    return adapter.value.signAndExecuteTransactionBlock({
      account: account.value,
      chain: selectedChain.key,
      transactionBlock: input.transactionBlock,
      options: input.options,
      requestType: input.requestType
    })
  }

  const accounts = computed<readonly WalletAccount[]>(() => {
    if (!adapter.value) return []
    return adapter.value.accounts
  })

  const account = computed(() => {
    if (accounts.value.length == 0) return null
    return accounts.value[0]
  })

  const address = computed(() => account.value?.address)

  return {
    provider: new JsonRpcProvider(
      new Connection({
        fullnode: selectedChain.nodeUrl,
        faucet: selectedChain.faucetUrl
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
      configuredNonDetected: configuredNonDetectedWallets
    },

    accounts,
    account,
    address,

    select,
    connect,
    disconnect,

    signMessage,
    signTransactionBlock,
    signAndExecuteTransactionBlock
  }
}
