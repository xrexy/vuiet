import { createApp } from "vue";
import SuiWallet from "vuiet";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import { VueRoute } from "./types";
import CodeBlock from "vue3-code-block";

const demoRoutes: VueRoute[] = [
  { path: "/minimal", component: () => import("./pages/demo/MinimalPage.vue") },
  {
    path: "/plug_and_play",
    component: () => import("./pages/demo/PlugAndPlayPage.vue"),
  },
].map((x) => ({ ...x, path: `/demo${x.path}` }));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...demoRoutes,
    { path: "/", component: () => import("./pages/HomePage.vue") },
  ],
});

createApp(App)
  .use(router)
  .use(CodeBlock, )
  .use(SuiWallet, {
    autoConnect: true,
    chainOverwrite: {
      SUI_DEVNET: {
        faucetUrl: "https://faucet.devnet.sui.io/gas",
      },
    },
  })
  .mount("#app");
