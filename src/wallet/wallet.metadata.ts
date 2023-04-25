import { IWalletMetadata } from "@/types";

const createWalletMetadata = (walletPreset: IWalletMetadata) =>
  Object.freeze(walletPreset);

// ----

export const CompatibleWallets = ["SUI", "SUIET"] as const;

export const WalletMetadata: Readonly<
  Record<(typeof CompatibleWallets)[number], IWalletMetadata>
> = {
  SUI: createWalletMetadata({
    displayName: "Sui Wallet",
  }),
  SUIET: createWalletMetadata({
    displayName: "Suiet Wallet",
  }),
};
