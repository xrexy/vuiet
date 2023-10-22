<template>
  <div class="flex flex-col items-center justify-between w-full h-full py-16 text-v-gray-100">
    <!-- Wallets -->
    <div class="flex flex-col items-center">
      <p class="pb-4 text-xl font-bold text-v-blue-400">Supported Wallets</p>
      <ul
        class="flex w-[95%] sm:w-[65%] flex-wrap gap-8 justify-center sm:justify-evenly pb-16 sm:pb-0"
      >
        <li
          class="flex items-center gap-2"
          v-for="wallet in $wallet.wallets.configured.value"
          :key="wallet.displayName"
        >
          <img class="w-10 h-10 rounded-full" :src="wallet.icon" />
          <p class="font-bold">{{ wallet.displayName }}</p>
        </li>
        <li class="flex items-center gap-2">
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-v-blue-800/75">
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
    <div class="flex flex-col items-center justify-center gap-8">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-6xl font-black tracking-wider title-gradient">Vuiet</h1>
        <p class="px-4 text-lg text-center sm:p-0">
          A minimal wallet manager for the Sui blockchain.
        </p>
      </div>

      <div class="flex flex-col items-center w-full pb-16 sm:flex-row gap-y-4 justify-evenly sm:pb-0">
        <a href="https://bundlephobia.com/package/vuiet@1.2.1" target="_blank">
          📦 <b>10.4</b>kB gzipped
        </a>
        <a class="flex gap-2" href="https://www.npmjs.com/package/vuiet" target="_blank">
          <img src="https://img.shields.io/npm/dm/vuiet?color=blue&label=" /> downloads
        </a>
      </div>
    </div>

    <Flavors
      :items="[
        { title: 'Minimal', redirect: '/demo/minimal' },
        { title: 'Plug & Play', redirect: '/demo/plug_and_play' }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useWallet } from 'vuiet'
import Flavors from '../components/FlavorsComponent.vue'

const $wallet = useWallet()
</script>
