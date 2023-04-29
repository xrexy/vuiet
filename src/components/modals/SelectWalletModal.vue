<template>
  <ModalWrapper :on-close="onClose" :is-open="isOpen">
    <div
      class="flex justify-between w-full"
      id="header_select"
    >
      <p class="font-bold text-lg z-10">Connect Wallet</p>
      <button id="wallet-close-btn" class="" @click="onClose()">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
          />
        </svg>
      </button>
    </div>

    <div>
      <!-- Detected -->
      <div v-if="detectedWallets.length > 0">
        <p>Detected ({{ detectedWallets.length }})</p>
        <ul class="">
          <WalletListItem
            @w-click="$emit('w-click', wallet)"
            :wallet="wallet"
            :detected="true"
            v-for="wallet in detectedWallets"
          />
        </ul>
      </div>

      <!-- Others -->
      <div v-if="otherWallets.length > 0">
        <p>Available ({{ otherWallets.length }})</p>
        <ul class="">
          <WalletListItem
            @w-click="$emit('w-click', wallet)"
            :wallet="wallet"
            :detected="false"
            v-for="wallet in otherWallets"
          />
        </ul>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useWallet } from "../../composables";
import ModalWrapper from "../ModalWrapper.vue";
import WalletListItem from "../WalletListItem.vue";

const modalRef = ref(null);

const $wallet = useWallet();
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

defineEmits(["w-click"]);

const detectedWallets = computed(() => $wallet.wallets.detected.value);
const otherWallets = computed(
  () => $wallet.wallets.configuredNonDetected.value
);
</script>

<style scoped>
/* For some reason tailwind doesn't want to compute the styles if they are in the classes. (BUT SOME ELEMENTS WORK AM I MISSING SOMETHING???) */
/* Sometimes I just wanna go to sleep and never wake up. */
#wallet-close-btn {
  @apply rounded-full w-8 h-8 bg-v-gray-400/25 flex justify-center items-center hover:bg-v-gray-500/25;
}

#wallet-close-btn svg {
  @apply w-5 h-5 fill-v-gray-400;
}

#header_select {
  background-image: url('../../assets/header_bg.svg');
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: -1px;

  height: 16rem;
  font-family: 'Poppins';

  @apply rounded-lg px-4 py-2 text-white;
}
</style>
