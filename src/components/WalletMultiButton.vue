<template>
  <slot name="main">
    <WalletConnectButton
      :on-connect="() => (modalType = WalletModalType.SELECT)"
      :on-disconnect="() => ((modalType = null), $wallet.disconnect())"
    />

    <SelectWalletModal
      @w-click="handleWalletClick"
      :on-close="closeModal"
      :is-open="modalType === WalletModalType.SELECT"
    />

    <ConnectingWalletModal
      v-if="targetWallet"
      :wallet="targetWallet"
      :is-open="modalType === WalletModalType.CONNECTING"
      :on-close="closeModal"
    />

    <InstallWalletModal
      v-if="targetWallet"
      :wallet="targetWallet"
      :is-open="modalType === WalletModalType.INSTALL"
      :on-close="
        () => {
          closeModal()
          targetWallet = null
        }
      "
    />
  </slot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ConnectingWalletModal,
  InstallWalletModal,
  SelectWalletModal,
  WalletConnectButton
} from '.'
import { useWallet } from '../composables'
import type { IWallet, Nullable } from '../types'

enum WalletModalType {
  SELECT = 'select_modal',
  CONNECTING = 'connecting_modal',
  INSTALL = 'install_modal'
}

const modalType = ref<Nullable<WalletModalType>>(null)
const targetWallet = ref<Nullable<IWallet>>(null)

const $wallet = useWallet()

/**
 * @param wallet If wallet is null, it means it was clicked on the "Available" section
 */
function handleWalletClick(wallet: IWallet) {
  targetWallet.value = wallet

  if (!wallet.installed) {
    modalType.value = WalletModalType.INSTALL
    return
  }

  modalType.value = WalletModalType.CONNECTING
  $wallet.select(wallet.displayName).finally(() => {
    targetWallet.value = null
    closeModal()
  })
}

const closeModal = () => (modalType.value = null)
</script>
