<template>
  <slot name="main">
    <slot name="connected" v-if="address">
      <div class="flex justify-between border-2 border-v-blue-400 w-16">
        <div>
          <p class="text-lg font-bold">
            {{ `${address.substring(0, 5)}...${address.slice(-4)}` }}
          </p>

          <p v-if="fetchingBalance">... SUI</p>
          <p v-else class="">
            {{ (Number(balance) / 1e9).toLocaleString() }} SUI
          </p>
        </div>
        <button class="" @click="onDisconnect()">Disconnect</button>
      </div>
    </slot>
    <slot name="disconnected" v-else="address">
      <button @click="onConnect()">Connect</button>
    </slot> 
  </slot>
</template>

<script setup lang="ts">
import { useCoinBalance, useWallet } from "../composables";
import { PropType, computed } from "vue";
 
const $wallet = useWallet();
const { balance, fetching: fetchingBalance } = useCoinBalance();
const address = computed(() => $wallet.address.value);
defineProps({
  onConnect: {
    type: Function as PropType<() => void>,
    required: true,
  },
  onDisconnect: {
    type: Function as PropType<() => void>,
    required: true,
  },
});
</script>
