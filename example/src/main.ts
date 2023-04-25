import { createApp } from "vue";
import SuiWallet from "../../src/index";
import App from "./App.vue";
import "./style.css";

createApp(App).use(SuiWallet, {}).mount("#app");
