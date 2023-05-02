<template>
  <slot name="main">
    <WalletConnectButton @connect="handleOnConnect" @disconnect="handleOnDisconnect" />

    <SelectWalletModal
      :is-open="modalType == WalletModalType.SELECT"
      @w-click="handleWalletClick"
      @close="closeModal"
    />

    <ConnectingWalletModal
      v-if="targetWallet"
      :is-open="modalType == WalletModalType.CONNECTING"
      :wallet="targetWallet"
      @close="closeModal"
    />
  </slot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConnectingWalletModal, SelectWalletModal, WalletConnectButton } from '.'
import { useWallet } from '..'
import type { IWallet, Nullable } from '../types'

enum WalletModalType {
  SELECT = 'select_modal',
  CONNECTING = 'connecting_modal'
}

const modalType = ref<Nullable<WalletModalType>>(null)
const targetWallet = ref<Nullable<IWallet>>(null)

const $wallet = useWallet()

function handleWalletClick(wallet: IWallet) {
  if (!wallet.installed) {
    window.open(wallet.downloadUrls.chrome, '_blank')
    closeModal()
    return
  }

  targetWallet.value = wallet
  modalType.value = WalletModalType.CONNECTING
  $wallet.select(wallet.displayName).finally(() => {
    targetWallet.value = null
    closeModal()
  })
}

const closeModal = () => {
  modalType.value = null
}

function handleOnConnect() {
  modalType.value = WalletModalType.SELECT
}

function handleOnDisconnect() {
  $wallet.disconnect()
  modalType.value = null
}
</script>
