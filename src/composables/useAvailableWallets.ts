import type { IWallet } from '../types'
import { computed } from 'vue'
import { useWalletAdaptersDetection } from './useWalletAdaptersDetection'

export const useAvailableWallets = (def: IWallet[]) => {
  const { availableAdapters } = useWalletAdaptersDetection()

  const configured = computed<IWallet[]>(() => {
    if (def.length < 1) return []

    if (availableAdapters.value.length == 0) {
      return def.map((defaultWallet) => ({
        ...defaultWallet,
        installed: false,
        adapter: null
      }))
    }

    return def.map((defaultWallet) => {
      const adapter = availableAdapters.value.find((x) => x.name == defaultWallet.displayName)

      return adapter
        ? {
            ...defaultWallet,
            installed: true,
            adapter
          }
        : {
            ...defaultWallet,
            installed: false,
            adapter: null
          }
    })
  })

  const detected = computed<IWallet[]>(() => {
    if (availableAdapters.value.length == 0) return []

    return availableAdapters.value
      .filter((x) => def.find((w) => w.displayName === x.name))
      .map((adapter) => ({
        displayName: adapter.name,
        installed: true,
        icon: adapter.icon,
        downloadUrls: def.find((w) => w.displayName === adapter.name)!.downloadUrls,
        adapter
      }))
  })

  const configuredNonDetected = computed<IWallet[]>(() => {
    if (availableAdapters.value.length == 0) return configured.value

    return configured.value.filter(
      (w) => !detected.value.find((x) => x.displayName == w.displayName)
    )
  })

  const installed = computed<IWallet[]>(() => {
    const withDuplicated = [...detected.value, ...configured.value].filter((x) => x.installed)
    const map = new Map<string, IWallet>()
    for (const item of withDuplicated) {
      map.set(item.displayName, item)
    }

    return Array.from(map.values())
  })

  return {
    configured,
    installed,
    detected,
    configuredNonDetected
  }
}
