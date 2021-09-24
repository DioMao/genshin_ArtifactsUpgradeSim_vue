export default {
    boxScroll: 0,
    selectHistory: "",
    language: "zh",
    // 图片位置
    elementSrc: require("../assets/images/elements_logo.png"),
    symbolSrc: require("../assets/images/genshin-symbol.png"),
    // 用户设置
    userSetting: {
        scoreConfig: { // 圣遗物得分设置
            mode: "string",
            strRule: "default",
            arrRule: [],
        },
        entryQuality: -1, // 副词条升级品质
        highScore: 35, // 高分圣遗物标准
        listBriefMode: true, // 圣遗物列表模式（details/brief）
        filterMain: "default", // 主词条筛选
        filterPart: "default" // 位置筛选
    },
    // 需要改小字体的属性(英语环境下)
    attr_sm_en: ["energyRecharge", "Healing", "elementMastery", "Hydro", "Pyro", "Electro", "Geo", "Anemo", "Cryo", "Physical"]
}