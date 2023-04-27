import { IWallet } from "src/types";
import { computed } from "vue";
import { useWalletAdaptersDetection } from "./useWalletAdaptersDetection";

export const useAvailableWallets = (def: IWallet[]) => {
  const { availableAdapters } = useWalletAdaptersDetection();

  const configured = computed<IWallet[]>(() => {
    if (def.length < 1) return [];

    if (availableAdapters.value.length == 0) {
      return def.map((defaultWallet) => ({
        ...defaultWallet,
        installed: false,
        adapter: null,
      }));
    }

    return def.map((defaultWallet) => {
      const adapter = availableAdapters.value.find(
        (x) => x.name == defaultWallet.displayName
      );

      return adapter
        ? {
            ...defaultWallet,
            installed: true,
            adapter,
          }
        : {
            ...defaultWallet,
            installed: false,
            adapter: null,
          };
    });
  });

  const detected = computed<IWallet[]>(() => {
    if (availableAdapters.value.length == 0) return [];

    return availableAdapters.value
      .filter((x) => def.find((w) => w.displayName === x.name))
      .map((adapter) => ({
        displayName: adapter.name,
        installed: true,
        icon: adapter.icon,
        adapter,
      }));
  });

  const configuredNonDetected = computed<IWallet[]>(() => {
    if (availableAdapters.value.length == 0) return configured.value;

    return configured.value.filter(
      (w) => !detected.value.find((x) => x.displayName == w.displayName)
    );
  });

  const installed = computed<IWallet[]>(() =>
    [...configured.value, ...detected.value].filter((w) => w.installed)
  );

  return {
    configured,
    installed,
    detected,
    configuredNonDetected,
  };
};
