<template>
  <Teleport to="body">
    <div
      class="bg-black/25 backdrop-blur-sm w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-[100]"
    >
      <div
        class="w-[95vw] sm:w-[25rem] bg-gradient-to-b to-v-blue-400 from-v-blue-600 p-[4px] rounded-lg shadow-md shadow-v-gray-70"
      >
        <div
          ref="modalRef"
          class="bg-white rounded-lg w-full h-full 0 text-v-blue-800 relative"
          id="modalRef"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const $emit = defineEmits(['close'])

const modalRef = ref(null)
onClickOutside(modalRef, () => {
  $emit('close')
})
</script>
