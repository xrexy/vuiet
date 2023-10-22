# Vuiet <a href="https://www.npmjs.com/package/vuiet" target="_blank">![](https://img.shields.io/npm/v/vuiet?color=blue)</a> <a href="https://www.npmjs.com/package/vuiet" target="_blank">![](https://img.shields.io/npm/dm/vuiet?color=blue)</a>

Vuiet is a minimal wallet manager built on the Sui blockchain for Vue 3.

## Demo

Basic code examples can be found on our demo page - [vuiet.dev](https://vuiet.dev)

## Getting Started

### Installation:

```
npm install -S vuiet
```

### Setup
```ts
// main.ts (App entry point)
import { createApp } from 'vue'
import Vuiet from 'vuiet'

// Needed to load tailwind classes for the components.
// If you're not planning on using the built-in components there's no need to import it.
import 'vuiet/dist/style.css'

const app = createApp(App)

app.use(SuiWallet, {
  autoConnect: true,
  chainOverwrite: {
    SUI_DEVNET: {
      faucetUrl: 'https://faucet.devnet.sui.io/gas'
    }
  }
})

app.mount('#app')
```

### Options
<b>autoConnect</b> (default true, optional)
> Whenever to connect to the previous wallet on page reload.

> When enabled the wallet name is store in local storage with key <b>VUIET__PREV_WALLET_NAME</b>. 
Deleting the entry will make the lib "forget" it, but will not auto-disconnect the user.

<br />

<b>chain</b> (default SUI_DEVNET)
> What chain to use - this option is subject to change.

<br />

<b>chainOverwrite</b> (optional)
> Overwrites the chain defaults. Can be useful to specify faucet urls since by default they're not specified.

> Values that can be overwritten: nodeUrl, displayName, key and faucetUrl

* Valid chains are SUI_DEVNET, SUI_TESTNET and SUI_MAINNET

<br />

<b>shouldGlobal</b> (optional)
> Whenever to add the wallet to the global vue instance. If enabled wallet will be added to vue's globalProperties as `$wallet`.
## Basic Usage

```html
<template>
  <p @click="$wallet.disconnect()">Address: {{ $wallet.address }}</p>
  <p>Balance: {{ balance }}</p>
  <!-- Balance is by default SUI -->
  <!-- If you want to normalize it divide by 1e9 -->

  <button @click="$wallet.select('Suiet')">Connect (Suiet)</button>
</template>

<script setup>
  import { useWallet, useCoinBalance } from 'vuiet'
  const $wallet = useWallet()
  const { balance } = useCoinBalance()
</script>
```

## Component Usage

<sub>⚠️ Components aren't as tested and modular as I wanted them to be at the moment. If you have any suggestions or found a bug feel free to open an issue.</sub>

```html
<template>
  <p @click="$wallet.disconnect()">Address: {{ $wallet.address }}</p>

  <WalletMultiButton />
</template>

<script setup>
  import { useWallet, WalletMultiButton } from 'vuiet'
  const $wallet = useWallet()
</script>
```
