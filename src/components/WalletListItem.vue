<template>
  <li @click="$emit('w-click')" class="flex gap-2 items-center">
    <img class="w-8 h-8 rounded-full" :src="wallet.icon" :alt="wallet.displayName" />
    <p class="font-bold text-lg">{{ wallet.displayName }}</p>
  </li>
</template>

<script setup lang="ts">
import { IWallet } from "src/types";
import { PropType } from "vue";

defineProps({
  wallet: {
    type: Object as PropType<IWallet>,
    required: true,
  },
  detected: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["w-click"]);
</script>
