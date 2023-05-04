<template>
  <div class="flex flex-col items-center gap-y-4">
    <p class="font-bold text-xl text-v-blue-400">{{ heading }}</p>
    <div class="flex flex-row items-center gap-x-4 gap-y-2">
      <RouterLink class="example-btn" :to="items[0].redirect">{{ items[0].title }}</RouterLink>
      <p>...or</p>
      <RouterLink class="example-btn" :to="items[1].redirect">{{ items[1].title }}</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
type FlavorItem = {
  redirect: string
  title: string
}

defineProps({
  items: {
    type: Object as PropType<[FlavorItem, FlavorItem]>,
    required: true
  },
  heading: {
    type: String,
    default: 'Choose your flavor'
  }
})
</script>

<style scoped>
.example-btn {
  @apply font-bold border-2 border-v-blue-600 px-6 py-2 rounded-lg hover:bg-v-blue-300/10;
}
</style>
