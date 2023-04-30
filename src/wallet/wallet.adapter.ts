import type {
  StandardConnectFeature,
  StandardConnectInput,
  StandardConnectMethod,
  StandardConnectOutput,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsListeners,
  StandardEventsNames,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignMessageFeature,
  SuiSignMessageInput,
  SuiSignMessageMethod,
  SuiSignMessageOutput,
  SuiSignTransactionBlockFeature,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockMethod,
  SuiSignTransactionBlockOutput,
  Wallet,
  WalletWithFeatures
} from '@mysten/wallet-standard'
import { has } from 'lodash-es'

export enum Feature {
  DISCONNECT = 'standard:disconnect',
  CONNECT = 'standard:connect',
  EVENTS = 'standard:events',
  SUI_SIGN_AND_EXECUTE_TX_BLOCK = 'sui:signAndExecuteTransactionBlock',
  SUI_SIGN_TX_BLOCK = 'sui:signTransactionBlock',
  SUI_SIGN_MESSAGE = 'sui:signMessage'
}

export type IWalletAdapter = WalletWithFeatures<
  Partial<StandardDisconnectFeature> &
    StandardConnectFeature &
    StandardEventsFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    SuiSignTransactionBlockFeature &
    SuiSignMessageFeature
> & {
  connect: StandardConnectMethod
  disconnect: StandardDisconnectMethod
  on: StandardEventsOnMethod
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod
  signTransactionBlock: SuiSignTransactionBlockMethod
  signMessage: SuiSignMessageMethod
  hasFeature: (feature: string) => boolean
}

export class WalletAdapter implements IWalletAdapter {
  #standardAdapter: Wallet

  constructor(standardAdapter: Wallet) {
    this.#standardAdapter = standardAdapter
  }

  getName = () => this.#standardAdapter.name
  get name() {
    return this.getName()
  }

  getVersion = () => this.#standardAdapter.version
  get version() {
    return this.getVersion()
  }

  getIcon = () => this.#standardAdapter.icon
  get icon() {
    return this.getIcon()
  }

  getChains = () => this.#standardAdapter.chains
  get chains() {
    return this.getChains()
  }

  getAccounts = () => this.#standardAdapter.accounts
  get accounts() {
    return this.getAccounts()
  }

  getFeatures = () => this.#standardAdapter.features as any
  get features() {
    return this.getFeatures()
  }

  getFeature = <T>(name: string): T => {
    const { features } = this.#standardAdapter
    if (!has(features, name)) throw new Error(`Feature ${name} not found`)
    return (features as any)[name] as T
  }

  async disconnect() {
    const feat = this.getFeature<{ disconnect: StandardDisconnectMethod }>(Feature.DISCONNECT)

    try {
      return await feat.disconnect()
    } catch (err: any) {
      throw new Error(err.message) // TODO better errors
    }
  }

  async connect(input: StandardConnectInput | undefined): Promise<StandardConnectOutput> {
    const feat = this.getFeature<{ connect: StandardConnectMethod }>(Feature.CONNECT)

    try {
      return await feat.connect(input)
    } catch (err: any) {
      // TODO try to handle error, also better erros
      throw new Error(err.message)
    }
  }

  on(e: StandardEventsNames, listener: StandardEventsListeners[StandardEventsNames]) {
    const feat = this.getFeature<{ on: StandardEventsOnMethod }>(Feature.EVENTS)
    try {
      return feat.on<StandardEventsNames>(e, listener)
    } catch (err: any) {
      throw new Error(err.message) // TODO better errors
    }
  }

  async signAndExecuteTransactionBlock(
    input: SuiSignAndExecuteTransactionBlockInput
  ): Promise<SuiSignAndExecuteTransactionBlockOutput> {
    const feat = this.getFeature<{
      signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod
    }>(Feature.SUI_SIGN_AND_EXECUTE_TX_BLOCK)

    try {
      return await feat.signAndExecuteTransactionBlock(input)
    } catch (err: any) {
      throw new Error(err.message) // TODO better errors
    }
  }

  async signTransactionBlock(
    input: SuiSignTransactionBlockInput
  ): Promise<SuiSignTransactionBlockOutput> {
    const feat = this.getFeature<{
      signTransactionBlock: SuiSignTransactionBlockMethod
    }>(Feature.SUI_SIGN_TX_BLOCK)

    try {
      return await feat.signTransactionBlock(input)
    } catch (err: any) {
      throw new Error(err.message) // TODO better errors
    }
  }

  async signMessage(input: SuiSignMessageInput): Promise<SuiSignMessageOutput> {
    const feat = this.getFeature<{ signMessage: SuiSignMessageMethod }>(Feature.SUI_SIGN_MESSAGE)

    try {
      return await feat.signMessage(input)
    } catch (err: any) {
      throw new Error(err.message) // TODO better errors
    }
  }

  hasFeature = (feature: string) => has(this.#standardAdapter.features, feature)
}
