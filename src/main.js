import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/style.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/plugins/icons";
import store from './store'


createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");