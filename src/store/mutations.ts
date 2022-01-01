import {VuexStateType} from './state';

export default {
  language(state: VuexStateType, val: string) {
    state.language = val;
  },
  saveScroll(state: VuexStateType, val: number) {
    state.scrollTop = val;
  },
  changeSetting(state: VuexStateType, val: any) {
    state.userSetting = val;
  },
};
