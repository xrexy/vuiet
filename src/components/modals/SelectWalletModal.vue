<template>
  <ModalWrapper :on-close="onClose" :is-open="isOpen">
    <div class="flex justify-between w-full" id="header_select">
      <p class="font-bold text-lg z-10">Connect Wallet</p>
      <button
        class="rounded-full w-8 h-8 bg-v-gray-400/25 flex justify-center items-center hover:bg-v-gray-500/25"
        @click="onClose()"
      >
        <svg class="w-5 h-5 fill-v-gray-400" viewBox="0 0 24 24">
          <path
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
          />
        </svg>
      </button>
    </div>

    <div>
      <!-- Detected -->
      <div v-if="detectedWallets.length > 0">
        <p>Detected ({{ detectedWallets.length }})</p>
        <ul class="">
          <WalletListItem
            @w-click="$emit('w-click', wallet)"
            :wallet="wallet"
            :detected="true"
            v-for="wallet in detectedWallets"
            :key="wallet.displayName"
          />
        </ul>
      </div>

      <!-- Others -->
      <div v-if="otherWallets.length > 0">
        <p>Available ({{ otherWallets.length }})</p>
        <ul class="">
          <WalletListItem
            @w-click="$emit('w-click', wallet)"
            :wallet="wallet"
            :detected="false"
            v-for="wallet in otherWallets"
            :key="wallet.displayName"
          />
        </ul>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { ModalWrapper, WalletListItem } from '@/components'
import { useWallet } from '@/composables'
import { computed } from 'vue'

const $wallet = useWallet()
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  }
})

defineEmits(['w-click'])

const detectedWallets = computed(() => $wallet.wallets.detected.value)
const otherWallets = computed(() => $wallet.wallets.configuredNonDetected.value)
</script>

<style scoped>
#header_select {
  background-image: url('/header_bg.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: -1px;

  height: 16rem;
  font-family: 'Poppins';

  @apply rounded-lg px-4 py-2 text-white;
}
</style>
