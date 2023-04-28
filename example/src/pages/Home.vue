<template>
  <div
    class="gap-y-20 text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center"
  >
    <!-- Wallets -->
    <div class="text-center">
      <p class="font-bold text-xl text-v-blue-400 pb-4">Supported Wallets</p>
      <ul class="flex gap-8 justify-around">
        <li
          class="flex items-center gap-2"
          v-for="wallet in $wallet.wallets.configured.value"
        >
          <img class="w-12 h-12 rounded-full" :src="wallet.icon" />
          <p class="font-bold">{{ wallet.displayName }}</p>
        </li>
        <li class="flex items-center gap-2">
          <div
            class="w-12 h-12 bg-v-blue-800/75 rounded-full flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-v-blue-400/50" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 19q-.425 0-.713-.288T11 18v-5H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19Z"
              />
            </svg>
          </div>
          <p class="font-bold">More to come...</p>
        </li>
      </ul>
    </div>

    <!-- Title -->
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-v-blue-500 font-black text-6xl tracking-wider">Vuiet</h1>
      <p class="text-lg px-4 sm:p-0 text-center">
        A minimal wallet manager for the Sui blockchain.
      </p>
    </div>

    <!-- "Flavors" -->
    <div class="flex flex-col items-center gap-y-4">
      <p class="font-bold text-xl text-v-blue-400">Choose your flavor</p>
      <div class="flex items-center gap-x-4">
        <RouterLink class="example-btn" to="/demo/minimal">Minimal</RouterLink>
        <p>...or</p>
        <RouterLink class="example-btn" to="/demo/plug_and_play">
          Plug & Play
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWallet } from "../../../src";

const $wallet = useWallet();
</script>
<style scoped>
h1 {
  background: rgb(0, 180, 216);
  background: linear-gradient(
    140deg,
    rgba(0, 180, 216, 1) 0%,
    rgba(102, 210, 232, 1) 100%
  );

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.example-btn {
  @apply font-bold border-2 border-v-blue-600 px-6 py-2 rounded-lg hover:bg-v-blue-300/10;
}
</style>
