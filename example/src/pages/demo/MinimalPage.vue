<template>
  <div
    class="text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center"
  >
    <!-- Title -->
    <h1 class="title-gradient font-black text-6xl tracking-wider">
      Minimal Example
    </h1>

    <div>
      <div>
        <div class="font-semibold flex justify-between px-4 pb-2">
          <div>
            <p class="underline cursor-help" v-if="$wallet.address.value" :title="$wallet.address.value" >
              Logged In
            </p>
            <p v-else> Not Logged In </p>
          </div>
          <p>Balance: {{ fetchingBalance ? '...' : balance }} SUI</p>
        </div>
        <CodeBlock
          :highlightjs="true"
          :code="codeblocks.minimal"
          theme="tokyo-night-dark"
          lang="html"
        />
      </div>
      <div class="w-full h-fit flex justify-center">
        <button
          v-if="$wallet.connected.value"
          :disabled="$wallet.connecting.value || $wallet.disconnecting.value"
          class="border-2 border-v-blue-600 px-4 py-2 rounded-lg hover:bg-v-blue-200/10"
          @click="$wallet.disconnect()"
        >
          Disconnect
        </button>
        <button
          v-else
          :disabled="$wallet.connecting.value || $wallet.disconnecting.value"
          class="border-2 border-v-blue-600 px-4 py-2 rounded-lg hover:bg-v-blue-200/10"
          @click="handleConnect()"
        >
          Connect (Suiet)
        </button>
      </div>
    </div>

    <!-- "Flavors" -->
    <div class="flex flex-col items-center gap-y-4">
      <p class="font-bold text-xl text-v-blue-400">Where to?</p>
      <div class="flex items-center gap-x-4">
        <RouterLink class="example-btn" to="/">Home</RouterLink>
        <p>...or</p>
        <RouterLink class="example-btn" to="/demo/plug_and_play">
          Plug & Play
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoinBalance, useWallet } from "vuiet";

const $wallet = useWallet();
const { balance, fetching: fetchingBalance } = useCoinBalance();

// This is one of the hackiest things I've ever done. If you know a better way, PLEASE open a PR.
const lt = "<";

const codeblocks = {
  minimal: `${lt}template>
  ${lt}p @click="$wallet.disconnect()">Address: {{ $wallet.address }}${lt}/p>
  ${lt}p>Balance: {{ balance }}b${lt}/p>

  ${lt}button @click="$wallet.select('Suiet')">Connect (Suiet)${lt}/button>
${lt}/template>

${lt}script setup>
  const $wallet = useWallet()
  const { balance } = useCoinBalance();
${lt}/script>`,
};

function handleConnect(walletName = 'Suiet') {
  if(!$wallet.wallets.installed.value.find(x => x.displayName == walletName)) {
    alert('Wallet not installed');
    return;
  }

  $wallet.select(walletName);
}
</script>
