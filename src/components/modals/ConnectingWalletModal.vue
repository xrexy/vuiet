<template>
  <ModalWrapper @close="$emit('close')">
    <div class="flex text-v-blue-800 flex-col justify-between w-full py-4 z-[100] rounded-t-md">
      <div class="flex justify-between items-center w-full px-4">
        <p class="text-md font-bold">
          Connecting with <span class="text-v-blue-400">{{ wallet.displayName }}</span>
        </p>
        <button
          class="rounded-full w-8 h-8 bg-v-gray-400/20 flex justify-center items-center hover:bg-v-blue-400/40 group"
          @click="$emit('close')"
        >
          <svg class="w-5 h-5 fill-v-blue-900/30 group-hover:fill-white" viewBox="0 0 24 24">
            <path
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="text-center py-12 flex flex-col items-center gap-12">
      <p>{{ message }}</p>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ModalWrapper } from '..'
import type { IWallet } from '../../types'

defineProps({
  wallet: {
    type: Object as PropType<IWallet>,
    required: true
  },
  message: {
    type: String,
    default: 'Please approve the transaction on your screen.'
  }
})

defineEmits(['close'])
</script>
