<template>
  <h1>Vuiet Example</h1>
</template>
<script lang="ts" setup>
import { useWallet } from "../../src/composables/useWallet";

const $wallet = useWallet();

$wallet;
</script>
