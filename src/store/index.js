import { createStore } from "vuex";
import { auth } from "./auth.module";
import { message } from "./message.module";
import { user } from "./user.module";


const store = createStore({
  modules: {
    auth,
    message,
    user
  },
});

export default store;