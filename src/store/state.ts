export default <VuexStateType>{
  scrollTop: 0,
  selectHistory: '',
  language: 'zh',
  // 图片位置
  symbolSrc: require('../assets/images/genshin-symbol.png'),
  // 用户设置
  userSetting: {
    // 圣遗物得分设置
    scoreConfig: {
      mode: 'string',
      strRule: 'default',
      arrRule: [],
    },
    language: 'zh', // 语言
    highScore: 35, // 高分圣遗物标准
    sortRule: 'lvdesc', // 排序规则
    filterMain: 'default', // 主词条筛选
    filterPart: 'default', // 位置筛选
    filterSet: 'default', // 套装筛选
  },
  // 需要改小字体的属性(英语环境下)
  attr_sm_en: ['energyRecharge', 'Healing', 'elementMastery', 'Hydro', 'Pyro', 'Electro', 'Geo', 'Anemo', 'Cryo', 'Physical'],
};

export type VuexStateType = {
  [key: string]: any;
  language: string;
  selectHistory: string;
  userSetting: UserSettingType;
};

export type UserSettingType = {
  scoreConfig: ScoreConfigType;
  language: string;
  highScore: number;
  sortRule: string;
  filterMain: string | string[];
  filterPart: string | string[];
  filterSet: string | string[];
};

export type ScoreConfigType = {
  mode: string;
  strRule: string;
  arrRule: string[];
};
