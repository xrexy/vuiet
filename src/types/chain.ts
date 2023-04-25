export type Chain = {
  nodeUrl: string;
  displayName: string;
  key: string;
};

export const ValidChainsArr = ["SUI_DEVNET", "SUI_TESTNET", "SUI_MAINNET"] as const;

export type ValidChains = (typeof ValidChainsArr)[number];
