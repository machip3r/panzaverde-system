import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:3003/";
// axios.defaults.baseURL = process.env.API_URL || "https://panzaverde-backend.onrender.com/";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router).use(VueAxios, axios);
}
