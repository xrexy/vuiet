<template>
  <div class="text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center">
    <h1 class="title-gradient font-black text-4xl tracking-wider pb-4">Plug & Play Example</h1>

    <div>
      <div class="flex flex-col items-center">
        <div class="font-semibold gap-4 flex justify-between px-4 pb-2">
          <div>
            <p
              class="underline cursor-help"
              v-if="$wallet.address.value"
              :title="$wallet.address.value"
            >
              Logged In
            </p>
            <p v-else>Not Logged In</p>
          </div>
          <p>
            Balance: {{ fetchingBalance ? '...' : (Number(balance) / 1e9).toLocaleString() }} SUI
          </p>
        </div>

        <WalletMultiButton />
      </div>
      <div class="w-full flex justify-center"></div>
    </div>

    <FlavorsComponent
      :items="[
        { title: 'Home', redirect: '/' },
        { title: 'Minimal', redirect: '/demo/minimal' }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useCoinBalance, useWallet, WalletMultiButton } from 'vuiet'
import { FlavorsComponent } from '../../components'
const $wallet = useWallet()
const { balance, fetching: fetchingBalance } = useCoinBalance()
</script>
