import { createApp } from "vue";
import SuiWallet from "../../src/index";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import { VueRoute } from "./types";

const demoRoutes: VueRoute[] = [
  { path: "/minimal", component: () => import("./pages/demo/Minimal.vue") },
  { path: "/plug_and_play", component: () => import("./pages/demo/PlugAndPlay.vue") },
].map((x) => ({ ...x, path: `/demo${x.path}` }));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...demoRoutes,
    { path: "/", component: () => import("./pages/Home.vue") },
  ],
});

createApp(App)
  .use(router)
  .use(SuiWallet, {
    chainOverwrite: {
      SUI_DEVNET: {
        faucetUrl: "https://faucet.devnet.sui.io/gas",
      },
    },
  })
  .mount("#app");
