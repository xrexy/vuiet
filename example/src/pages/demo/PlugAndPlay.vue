<template>
    <h1>Vuiet Example</h1>
  
    <div>
      <h2>Accounts</h2>
      <div v-if="$wallet.address.value">
        <p @click="$wallet.disconnect()">
          Address: <b>{{ $wallet.address.value }}</b>
        </p>
        <p>
          SUI Balance: <b>{{ balance || 0 }}</b>
        </p>
      </div>
      <p v-else>Not connected</p>
    </div>
  
    <div>
      <h2>Wallets</h2>
      <p v-if="$wallet.connected.value">
        Connected with: <b>{{ $wallet.adapter.value.name }}</b>
      </p>
      <ul v-else>
        <li
          v-for="wallet of $wallet.wallets.detected.value"
          @click="connectToWallet(wallet.displayName)"
        >
          {{ wallet.displayName }} <b>(Detected)</b>
        </li>
        <li v-for="wallet of $wallet.wallets.configuredNonDetected.value">
          {{ wallet.displayName }}
        </li>
      </ul>
    </div>
  </template>
  <script lang="ts" setup>
  import { useWallet, useCoinBalance } from "../../../../src/composables";
  
  const $wallet = useWallet();
  const { balance } = useCoinBalance();
  
  const connectToWallet = async (walletName: string) => {
    await $wallet.select(walletName);
  };
  </script>
  