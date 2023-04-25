import { Nullable } from "@/types";
import {
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignTransactionBlockFeature,
  SuiSignMessageFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockMethod,
  SuiSignMessageMethod,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
} from "@mysten/wallet-standard";
import {
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
  Wallet,
  WalletWithFeatures,
} from "@wallet-standard/core";
import { has } from "lodash-es";

export enum Feature {
  DISCONNECT = "standard:disconnect",
  CONNECT = "standard:connect",
  EVENTS = "standard:events",
  SUI_SIGN_AND_EXECUTE_TX_BLOCK = "sui:signAndExecuteTransactionBlock",
  SUI_SIGN_TX_BLOCK = "sui:signTransactionBlock",
  SUI_SIGN_MESSAGE = "sui:signMessage",
}

export type IWalletAdapter = WalletWithFeatures<
  Partial<StandardDisconnectFeature> &
    StandardConnectFeature &
    StandardEventsFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    SuiSignTransactionBlockFeature &
    SuiSignMessageFeature
> & {
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  signTransactionBlock: SuiSignTransactionBlockMethod;
  signMessage: SuiSignMessageMethod;
};

export class WalletAdapter implements IWalletAdapter {
  #standardAdapter: Wallet;

  constructor(standardAdapter: Wallet) {
    this.#standardAdapter = standardAdapter;
  }

  get name() {
    return this.#standardAdapter.name;
  }

  get version() {
    return this.#standardAdapter.version;
  }

  get icon() {
    return this.#standardAdapter.icon;
  }

  get chains() {
    return this.#standardAdapter.chains;
  }

  get accounts() {
    return this.#standardAdapter.accounts;
  }

  get features() {
    return this.#standardAdapter.features as any;
  }

  #getFeature = <T>(name: string): T => {
    const { features } = this.#standardAdapter;
    if (!has(features, name)) throw new Error(`Feature ${name} not found`);
    return (features as any)[name] as T;
  };

  async disconnect() {
    const feat = this.#getFeature<{ disconnect: StandardDisconnectMethod }>(
      Feature.DISCONNECT
    );

    try {
      return await feat.disconnect();
    } catch (err: any) {
      throw new Error(err.message); // TODO better errors
    }
  }

  async connect(
    input: StandardConnectInput | undefined
  ): Promise<StandardConnectOutput> {
    const feat = this.#getFeature<{ connect: StandardConnectMethod }>(
      Feature.CONNECT
    );

    try {
      return await feat.connect(input);
    } catch (err: any) {
      // TODO try to handle error, also better erros
      throw new Error(err.message);
    }
  }

  on(
    e: StandardEventsNames,
    listener: StandardEventsListeners[StandardEventsNames]
  ) {
    const feat = this.#getFeature<{ on: StandardEventsOnMethod }>(
      Feature.EVENTS
    );
    try {
      return feat.on<StandardEventsNames>(e, listener);
    } catch (err: any) {
      throw new Error(err.message); // TODO better errors
    }
  }

  async signAndExecuteTransactionBlock(
    input: SuiSignAndExecuteTransactionBlockInput
  ): Promise<SuiSignAndExecuteTransactionBlockOutput> {
    const feat = this.#getFeature<{
      signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
    }>(Feature.SUI_SIGN_AND_EXECUTE_TX_BLOCK);

    try {
      return await feat.signAndExecuteTransactionBlock(input);
    } catch (err: any) {
      throw new Error(err.message); // TODO better errors
    }
  }

  async signTransactionBlock(
    input: SuiSignTransactionBlockInput
  ): Promise<SuiSignTransactionBlockOutput> {
    const feat = this.#getFeature<{
      signTransactionBlock: SuiSignTransactionBlockMethod;
    }>(Feature.SUI_SIGN_TX_BLOCK);

    try {
      return await feat.signTransactionBlock(input);
    } catch (err: any) {
      throw new Error(err.message); // TODO better errors
    }
  }

  async signMessage(input: SuiSignMessageInput): Promise<SuiSignMessageOutput> {
    const feat = this.#getFeature<{ signMessage: SuiSignMessageMethod }>(
      Feature.SUI_SIGN_MESSAGE
    );

    try {
      return await feat.signMessage(input);
    } catch (err: any) {
      throw new Error(err.message); // TODO better errors
    }
  }
}
