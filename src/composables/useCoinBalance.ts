import { CoinBalance, SUI_TYPE_ARG } from "@mysten/sui.js";
import { Chains, isValidChainKey } from "../constants";
import { ComputedRef, Ref, computed, ref, watch } from "vue";
import { useWallet } from "./useWallet";
import { Nullable } from "src/types";

export type UseCoinBalanceOptions = Partial<{
  coinType: Nullable<string>;
}>;

export type UseCoinBalanceOutput = {
  coinBalance: Ref<Nullable<CoinBalance>>;
  balance: ComputedRef<Nullable<string>>;
  fetching: Ref<boolean>;
};

export function useCoinBalance(
  opts?: UseCoinBalanceOptions
): UseCoinBalanceOutput {
  const $wallet = useWallet();

  const { coinType } = opts || {};

  const coinBalance = ref<Nullable<CoinBalance>>(null);
  const fetching = ref(false);

  async function fetchBalance(address: string) {
    if (!$wallet.address.value) return;

    return $wallet.provider.getBalance({
      owner: $wallet.address.value,
      coinType,
    });
  }

  watch($wallet.address, (address) => {
    if (address && address.length > 1) {
      fetching.value = true;
      fetchBalance(address)
        .then((x) => (coinBalance.value = x))
        .finally(() => (fetching.value = false));
    } else {
      coinBalance.value = null;
    }
  });

  const balance = computed<Nullable<string>>(
    () => coinBalance?.value?.totalBalance
  );

  return { coinBalance, fetching, balance };
}
