import { CoinBalance } from "@mysten/sui.js";
import { Nullable } from "src/types";
import { ComputedRef, Ref, computed, ref, watch, watchEffect } from "vue";
import { useWallet } from "./useWallet";

export type UseCoinBalanceOptions = Partial<{
  coinType: Nullable<string>;
}>;

export type UseCoinBalanceOutput = {
  coinBalance: Ref<Nullable<CoinBalance>>;
  balance: ComputedRef<string>;
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

  watchEffect(() => { 
    const address = $wallet.address.value;
    if (address && address.length > 1) {
      fetching.value = true;
      fetchBalance(address)
        .then((x) => (coinBalance.value = x))
        .finally(() => (fetching.value = false));
    } else {
      coinBalance.value = null;
    }
  });

  const balance = computed<string>(
    () => coinBalance?.value?.totalBalance || "0"
  );

  return { coinBalance, fetching, balance };
}
