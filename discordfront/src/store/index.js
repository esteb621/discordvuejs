import { createStore } from "vuex";
import { auth } from "./auth.module";
import { message } from "./message.module";
import { user } from "./user.module";
import { channel } from "./channel.module";

const store = createStore({
  modules: {
    auth,
    message,
    channel,
    user
  },
});

export default store;