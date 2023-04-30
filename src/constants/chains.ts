import { ValidChainsArr, type Chain, type ValidChain } from "@/types";

export const Chains: Record<ValidChain | "UNKNOWN", Chain> = {
  SUI_DEVNET: {
    key: "sui:devnet",
    nodeUrl: "https://fullnode.devnet.sui.io/",
    displayName: "SUI Devnet",
  },

  SUI_TESTNET: {
    key: "sui:testnet",
    nodeUrl: "https://fullnode.testnet.sui.io/",
    displayName: "SUI Testnet",
  },

  /**
   * Note: As of writting this mainnet has not launched - nodeUrl and key are placeholders and are likely to change.
   */
  SUI_MAINNET: {
    key: "sui:mainnet",
    nodeUrl: "https://fullnode.mainnet.sui.io/",
    displayName: "SUI Mainnet",
  },

  UNKNOWN: {
    key: "unknown:unknown",
    displayName: "Unknown",
    nodeUrl: "",
  },
};

export const isValidChainKey = (key: string): key is ValidChain => {
  return ValidChainsArr.includes(key as any);
};
