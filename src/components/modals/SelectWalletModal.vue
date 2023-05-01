<template>
  <ModalWrapper @close="$emit('close')" :isOpen="isOpen">
    <div class="flex text-v-blue-800 flex-col justify-between w-full py-4 z-[100] rounded-t-md">
      <div class="flex justify-between items-center w-full px-4">
        <p class="text-md font-bold">Select Wallet</p>
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

    <div class="p-4 flex flex-col gap-4">
      <div v-if="detectedWallets.length > 0">
        <h3>Installed</h3>
        <div class="flex flex-col gap-2">
          <button
            @click=" $emit('w-click', wallet)"
            class="bg-black/5 rounded-lg flex justify-between items-center py-2 px-2 border-2 border-transparent hover:border-v-blue-300 hover:bg-v-blue-400/25"
            v-for="wallet in detectedWallets"
            :key="wallet.displayName"
          >
            <span class="font-semibold">{{ wallet.displayName }}</span>
            <img class="rounded-full w-10 h-10" :src="wallet.icon" :alt="wallet.displayName" />
          </button>
        </div>
      </div>

      <div>
        <h3>Available</h3>
        <div class="flex flex-col gap-2">
          <a
            @click="$emit('w-click', wallet)"
            :href="wallet.downloadUrls.chrome"
            target="_blank"
            class="bg-black/5 rounded-lg flex justify-between items-center py-2 px-4 border-2 border-transparent hover:border-v-blue-300 hover:bg-v-blue-400/25"
            v-for="wallet in availableWallets"
            :key="wallet.displayName"
          >
            <span class="font-semibold">{{ wallet.displayName }}</span>
            <img class="rounded-full w-10 h-10" :src="wallet.icon" :alt="wallet.displayName" />
          </a>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ModalWrapper } from '..'
import { useWallet } from '../../composables'

const $wallet = useWallet()
defineEmits(['w-click', 'close'])

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const detectedWallets = computed(() => $wallet.wallets.detected.value)
const availableWallets = computed(() => $wallet.wallets.configuredNonDetected.value)
</script>
