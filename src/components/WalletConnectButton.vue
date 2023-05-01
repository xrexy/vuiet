<template>
  <slot name="main">
    <slot name="connected" v-if="address">
      <div class="bg-gradient-to-b to-v-blue-400 from-v-blue-700 p-1 rounded-lg w-fit">
        <div
          class="text-white flex justify-between items-center bg-black/50 px-4 py-2 gap-20 rounded-lg"
        >
          <div class="flex flex-col">
            <button
              ref="addressRef"
              @click="copy(address)"
              :title="address"
              class="text-lg font-semibold hover:text-v-blue-200"
            >
              {{ `${address.substring(0, 5)}...${address.slice(-4)}` }}
            </button>
            <p class="text-v-blue-200">
              {{ fetchingBalance ? '...' : (Number(balance) / 1e9).toLocaleString() }} SUI
            </p>
          </div>
          <button
            class="w-fit h-fit bg-black/20 p-2 rounded-full"
            title="Disconnect"
            @click="$emit('disconnect')"
          >
            <svg
              class="w-6 h-6 fill-white"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1zM446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51-96.8 97zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3L260.3 209.4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </slot>
    <slot name="disconnected" v-else>
      <button
        class="font-bold border-2 text-v-blue-600 border-v-blue-600 px-6 py-2 rounded-lg hover:bg-v-blue-300/5"
        @click="$emit('connect')"
      >
        Connect
      </button>
    </slot>
  </slot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCoinBalance, useWallet } from '..'

const $wallet = useWallet()
const { balance, fetching: fetchingBalance } = useCoinBalance()
const address = computed(() => $wallet.address.value)

defineEmits(['connect', 'disconnect'])

const addressRef = ref<HTMLButtonElement>()
function copy(address: string, text = 'Copied!', timeout = 1000) {
  const before = addressRef.value!.innerText
  if (address == '' || before == text) return

  navigator.clipboard.writeText(address)
  console.log('copied')

  addressRef.value!.innerText = text
  setTimeout(() => {
    addressRef.value!.innerText = before
  }, timeout)
}
</script>
