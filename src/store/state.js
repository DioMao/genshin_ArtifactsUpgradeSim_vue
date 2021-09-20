export default {
    boxScroll: 0,
    selectHistory: "",
    // 图片位置
    elementSrc: require("../static/images/elements_logo.png"),
    symbolSrc: require("../static/images/genshin-symbol.png"),
    partSrc: {
        feather: require("../static/images/A-feather.png"),
        flower: require("../static/images/A-flower.png"),
        cup: require("../static/images/A-cup.png"),
        hourglass: require("../static/images/A-hourglass.png"),
        hat: require("../static/images/A-hat.png")
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