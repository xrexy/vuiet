import { IWallet } from "../types";

const createWalletMetadata = (walletPreset: IWallet) =>
  Object.freeze(walletPreset);

// ----

export const CompatibleWallets = ["SUI", "SUIET"] as const;

export const WalletMetadata: Readonly<
  Record<(typeof CompatibleWallets)[number], IWallet>
> = {
  SUI: createWalletMetadata({
    displayName: "Sui Wallet",
    icon: "",
    adapter: null,
    installed: false,
  }),
  SUIET: createWalletMetadata({
    displayName: "Suiet",
    icon: "",
    adapter: null,
    installed: false,
  }),
};

export const DefaultWallets = [WalletMetadata.SUI, WalletMetadata.SUIET];
