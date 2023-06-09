import type { IdentifierString } from "@wallet-standard/core";

export type Chain = {
  nodeUrl: string;
  displayName: string;
  key: IdentifierString;
  faucetUrl?: string;
};

export const ValidChainsArr = ["SUI_DEVNET", "SUI_TESTNET", "SUI_MAINNET"] as const;

export type ValidChain = (typeof ValidChainsArr)[number];
