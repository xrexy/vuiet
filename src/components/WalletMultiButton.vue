<template>
  <slot name="main">
    <WalletConnectButton @connect="handleOnConnect" @disconnect="handleOnDisconnect" />

    <SelectWalletModal
      v-if="modalType == WalletModalType.SELECT"
      @w-click="handleWalletClick"
      @close="closeModal"
    />

    <ConnectingWalletModal
      v-if="targetWallet && modalType == WalletModalType.CONNECTING"
      :wallet="targetWallet"
      @close="closeModal"
    />
  </slot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ConnectingWalletModal, SelectWalletModal, WalletConnectButton } from '.'
import { useWallet } from '..'
import type { IWallet, Nullable } from '../types'

enum WalletModalType {
  SELECT = 'select_modal',
  CONNECTING = 'connecting_modal'
}

const modalType = ref<Nullable<WalletModalType>>(null)
const targetWallet = ref<Nullable<IWallet>>(null)

watch(modalType, console.log)
watch(targetWallet, console.log)

const $wallet = useWallet()

function handleWalletClick(wallet: IWallet) {
  console.log('wallet handleWalletClick', wallet)
  targetWallet.value = wallet

  if (!wallet.installed) {
    console.log('wallet not installed')
    window.open(wallet.downloadUrls.chrome, '_blank')
    closeModal()
    return
  }
  console.log('wallet installed', wallet.displayName)

  modalType.value = WalletModalType.CONNECTING
  $wallet.select(wallet.displayName).finally(() => {
    console.log('wallet select finally')
    targetWallet.value = null
    closeModal()
  })
}

const closeModal = () => {
  console.log('closeModal')
  modalType.value = null
}

function handleOnConnect() {
  console.log('handleOnConnect', modalType.value)
  modalType.value = WalletModalType.SELECT
  console.log('handleOnConnect end', modalType.value)
}
function handleOnDisconnect() {
  console.log('handleOnDisconnect', modalType.value)
  modalType.value = null
  $wallet.disconnect()
  console.log('handleOnDisconnect end', modalType.value)
}
</script>
