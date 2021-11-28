export default {
  language(state, val) {
    state.language = val;
  },
  saveScroll(state, val) {
    state.scrollTop = val;
  },
  changeSetting(state, val) {
    state.userSetting = val;
  }
};
