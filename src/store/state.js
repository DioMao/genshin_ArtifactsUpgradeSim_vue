export default {
    boxScroll: 0,
    selectHistory: "",
    // 图片位置
    elementSrc: require("../static/images/elements_logo.png"),
    symbolSrc: require("../static/images/genshin-symbol.png"),
    partSrc: {
        Plume: require("../static/images/A-Plume.png"),
        '死之羽': require("../static/images/A-Plume.png"),
        Flower: require("../static/images/A-Flower.png"),
        '生之花': require("../static/images/A-Flower.png"),
        Goblet: require("../static/images/A-Goblet.png"),
        '空之杯': require("../static/images/A-Goblet.png"),
        Sands: require("../static/images/A-Sands.png"),
        '时之沙': require("../static/images/A-Sands.png"),
        Circlet: require("../static/images/A-Circlet.png"),
        '理之冠': require("../static/images/A-Circlet.png")
    },
    userSetting: { // 用户设置
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
    }
}