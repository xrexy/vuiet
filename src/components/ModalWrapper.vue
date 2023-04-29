<template>
  <Teleport to="body">
    <div class="bg-black/25 backdrop-blur-sm w-screen h-screen absolute top-0 left-0 flex items-center justify-center" v-if="isOpen">
      <div ref="modalRef" class="bg-white w-[25vw] rounded-lg shadow-md shadow-v-gray-700 text-v-gray-700 relative">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const $props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const modalRef = ref(null);
onClickOutside(modalRef, () => {
  $props.onClose();
});
</script>

