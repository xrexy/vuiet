<template>
  <ModalWrapper :on-close="onClose" :is-open="isOpen">
    <div class="flex justify-between w-full">
      <p class="font-bold text-lg">Connecting...</p>
      <button id="wallet-close-btn" class="" @click="onClose()">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
          />
        </svg>
      </button>
    </div>

    <div>
      <!-- Detected -->
      {{ wallet.displayName }}
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import type { IWallet } from '@/types'
import type { PropType } from 'vue'
import { ModalWrapper } from '..'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  },
  wallet: {
    type: Object as PropType<IWallet>,
    required: true
  }
})
</script>

<style scoped>
/* For some reason tailwind doesn't want to compute the styles if they are in the classes. (BUT SOME ELEMENTS WORK AM I MISSING SOMETHING???) */
/* Sometimes I just wanna go to sleep and never wake up. */
#wallet-close-btn {
  @apply rounded-full w-8 h-8 bg-v-gray-400/25 flex justify-center items-center hover:bg-v-gray-500/25;
}

#wallet-close-btn svg {
  @apply w-5 h-5 fill-v-gray-400;
}
</style>
