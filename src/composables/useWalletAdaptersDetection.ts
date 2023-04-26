import { getWallets, Wallet, Wallets } from "@wallet-standard/core";
import { IWalletAdapter, WalletAdapter } from "../wallet/wallet.adapter";
import { onMounted, ref, watch, watchEffect } from "vue";

const isWalletCompatible = (w: Wallet) =>
  ["standard:connect", "standard:events", "sui:signMessage"].every(
    (x) => x in w.features
  );

export function useWalletAdaptersDetection() {
  const standardManager = ref<Wallets>();
  const availableAdapters = ref<IWalletAdapter[]>([]);

  function initialStandardAdapters(): Wallet[] {
    if (!standardManager.value) return [];
    const initial = standardManager.value.get();
    return initial.filter(isWalletCompatible);
  }

  watchEffect((onCleanup) => {
    standardManager.value = getWallets();
    const initialAdapters = initialStandardAdapters();

    if (initialAdapters.length > 0) {
      availableAdapters.value = initialAdapters.map(
        (x) => new WalletAdapter(x)
      );
    }

    const cleanup = standardManager.value.on(
      "register",
      (...additionalAdapters: Wallet[]) => {
        if (!standardManager) return;

        const all = [...initialStandardAdapters()];
        additionalAdapters.filter(isWalletCompatible).forEach((x) => {
          if (all.find((exist) => exist.name == x.name)) return;
          all.push(x);
        });

        availableAdapters.value = all.map((x) => new WalletAdapter(x));
      }
    );

    onCleanup(() => cleanup());
  });

  return {
    availableAdapters,
    standardManager,
  };
}
