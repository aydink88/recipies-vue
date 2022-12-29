import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from './router';
import { createPinia } from "pinia";
import WithErrorHandler from './hoc/WithErrorHandler.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router)
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.component('WithErrorHandler', WithErrorHandler);

app.mount("#app");
