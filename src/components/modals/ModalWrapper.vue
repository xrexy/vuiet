<template>
  <Teleport to="body" v-if="isOpen">
    <div
      class="bg-black/25 backdrop-blur-sm w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-[100]"
    >
      <div
        class="w-[95vw] sm:w-[25rem] bg-gradient-to-b to-v-blue-400 from-v-blue-600 p-[4px] rounded-lg shadow-md shadow-v-gray-70"
      >
        <div ref="modalRef" class="bg-white rounded-lg w-full h-full 0 text-v-blue-800 relative">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '../..'

const $emit = defineEmits(['close'])

// this is what despair looks like
const mountMs = ref(0)
const MOUNT_CLICK_OUTSIDE_DELAY = 250

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const modalRef = ref<HTMLDivElement>()
useClickOutside(modalRef, () => {
  if (mountMs.value == 0) mountMs.value = Date.now() + MOUNT_CLICK_OUTSIDE_DELAY
  if (Date.now() - mountMs.value > MOUNT_CLICK_OUTSIDE_DELAY) {
    mountMs.value = 0;
    $emit('close')
  }
})
</script>
