<template>
  <div class="text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center">
    <!-- Wallets -->
    <div class="flex items-center flex-col">
      <p class="font-bold text-xl text-v-blue-400 pb-4">Supported Wallets</p>
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
          <div class="w-10 h-10 bg-v-blue-800/75 rounded-full flex items-center justify-center">
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
        <h1 class="title-gradient font-black text-6xl tracking-wider">Vuiet</h1>
        <p class="text-lg px-4 sm:p-0 text-center">
          A minimal wallet manager for the Sui blockchain.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-y-4 justify-evenly w-full pb-16 sm:pb-0">
        <a href="https://bundlephobia.com/package/vuiet@1.1.0" target="_blank">
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
