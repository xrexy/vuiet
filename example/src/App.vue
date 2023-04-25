<template>
  <h1>Vuiet Example</h1>
  <p>{{ wip }}</p>
</template>
<script lang="ts" setup>
import { Test } from "../../src";

const { a: wip }: Test = { a: "wip" };
</script>
