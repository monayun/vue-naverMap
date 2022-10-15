import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { mapMethods } from "./assets/js/mapMethods.js";


import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.provide("te", mapMethods);
app.provide("$axios", axios);

app.mount("#app");