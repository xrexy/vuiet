<template>
  <div class="text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center">
    <!-- Title -->
    <h1 class="title-gradient font-black text-4xl tracking-wider pb-4">Plug & Play Example</h1>

    <div>
      <div>
        <div class="font-semibold flex justify-between px-4 pb-2">
          <div>
            <p
              class="underline cursor-help"
              v-if="$wallet.address.value"
              :title="$wallet.address.value"
            >
              Logged In
            </p>
            <p v-else>Not Logged In</p>
          </div>
          <p>
            Balance: {{ fetchingBalance ? '...' : (Number(balance) / 1e9).toLocaleString() }} SUI
          </p>
        </div>
        <CodeBlock :highlightjs="true" :code="codeblock" theme="tokyo-night-dark" lang="html" />
      </div>
      <div class="w-full flex justify-center">
        <WalletMultiButton />a
      </div>
    </div>

    <!-- "Flavors" -->
    <Flavors
      :items="[
        { title: 'Home', redirect: '/' },
        { title: 'Minimal', redirect: '/demo/minimal' }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useCoinBalance, useWallet, WalletMultiButton } from 'vuiet'
import Flavors from '../../components/FlavorsComponent.vue'
const $wallet = useWallet()
const { balance, fetching: fetchingBalance } = useCoinBalance()

// This is one of the hackiest things I've ever done. If you know a better way, PLEASE open a PR.
const lt = '<'

const codeblock = `${lt}template>
  <p @click="$wallet.disconnect()">Address: {{ $wallet.address }}</p>
  <WalletMultiButton />
${lt}/template>

${lt}script setup>
  import { useWallet, WalletMultiButton } from 'vuiet';
  const $wallet = useWallet();
${lt}/script>
`
</script>
