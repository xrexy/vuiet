import { createApp } from "vue";
import SuiWallet from "../../src/index";
import App from "./App.vue";
import "./style.css";

createApp(App)
  .use(SuiWallet, {
    chainOverwrite: {
      SUI_DEVNET: {
        faucetUrl: "https://faucet.devnet.sui.io/gas",
      },
    },
  })
  .mount("#app");
