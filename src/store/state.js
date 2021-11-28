export default {
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
      arrRule: []
    },
    language: 'zh', // 语言
    highScore: 35, // 高分圣遗物标准
    sortRule: 'lvdesc', // 排序规则
    filterMain: 'default', // 主词条筛选
    filterPart: 'default', // 位置筛选
    filterSet: 'default' // 套装筛选
  },
  // 需要改小字体的属性(英语环境下)
  attr_sm_en: ['energyRecharge', 'Healing', 'elementMastery', 'Hydro', 'Pyro', 'Electro', 'Geo', 'Anemo', 'Cryo', 'Physical']
};
