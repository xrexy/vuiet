import { Ref, ref, watchEffect } from "vue";
import { LocalStorageKey } from "../types/localStorage";
import { useWallet } from "./useWallet";

export type UseAutoConnectOptions = Partial<{
  autoConnect: boolean;
  onAutoConnectError?: (error: any) => void;
}>;
export type UseAutoConnectOutput = {
  autoConnect: Ref<boolean>;
};

export function useAutoConnect(
  opts?: UseAutoConnectOptions
): UseAutoConnectOutput {
  const { autoConnect: initialAutoConnect = true } = opts || {};
  const autoConnect = ref(initialAutoConnect);
  const hasAttemptedAutoConnect = ref(false);

  const $wallet = useWallet();

  watchEffect(() => {
    if (hasAttemptedAutoConnect.value || !autoConnect.value) return;
    if ($wallet.connected.value || $wallet.connecting.value) return;

    const lastWallet = localStorage.getItem(LocalStorageKey.PREV_WALLET_NAME);
    if (!lastWallet) return;

    hasAttemptedAutoConnect.value = true;

    (async () => {
      try {
        await $wallet.select(lastWallet);
      } catch (err) {
        if (opts?.onAutoConnectError) opts.onAutoConnectError(err);
      }
    })();
  });

  return { autoConnect };
}
