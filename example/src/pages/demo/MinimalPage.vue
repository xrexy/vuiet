<template>
  <div class="text-v-gray-100 h-full w-full flex flex-col justify-between py-16 items-center">
    <h1 class="title-gradient font-black text-4xl tracking-wider">Minimal Example</h1>

    <div>
      <div>
        <div class="font-semibold flex justify-between px-4 pb-2">
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
        <CodeBlock :highlightjs="true" :code="codeblock" theme="tokyo-night-dark" lang="html" />
      </div>
      <div class="w-full h-fit flex justify-center">
        <button
          v-if="$wallet.connected.value"
          :disabled="$wallet.connecting.value || $wallet.disconnecting.value"
          class="border-2 border-v-blue-600 px-4 py-2 rounded-lg hover:bg-v-blue-200/10"
          @click="$wallet.disconnect()"
        >
          Disconnect
        </button>
        <button
          v-else
          :disabled="$wallet.connecting.value || $wallet.disconnecting.value"
          class="border-2 border-v-blue-600 px-6 py-2 rounded-lg hover:bg-v-blue-200/10"
          @click="handleConnect()"
        >
          Connect (Suiet)
        </button>
      </div>
    </div>

    <FlavorsComponent
      :items="[
        { title: 'Home', redirect: '/' },
        { title: 'Plug & Play', redirect: '/demo/plug_and_play' }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useCoinBalance, useWallet } from 'vuiet'
import {FlavorsComponent} from '../../components'

const $wallet = useWallet()
const { balance, fetching: fetchingBalance } = useCoinBalance()

// This is one of the hackiest things I've ever done. If you know a better way, PLEASE open a PR.
const lt = '<'

const codeblock = `${lt}template>
  <p @click="$wallet.disconnect()">Address: {{ $wallet.address }}</p>
  <p>Balance: {{ balance }}b</p>

  <button @click="$wallet.select('Suiet')">Connect (Suiet)</button>
${lt}/template>

${lt}script setup>
  import { useWallet, useCoinBalance } from 'vuiet';
  const $wallet = useWallet();
  const { balance } = useCoinBalance();
${lt}/script>
`

function handleConnect(walletName = 'Suiet') {
  if (!$wallet.wallets.installed.value.find((x) => x.displayName == walletName)) {
    alert('Suiet not installed')
    return
  }

  $wallet.select(walletName)
}
</script>
