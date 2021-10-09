import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";

export default createStore({
  state,
  mutations,
});
