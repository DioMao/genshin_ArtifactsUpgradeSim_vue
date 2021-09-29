/**
 * ArtifactsUpgradeSim v0.2.1 module
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/blob/main/LICENSE)
 */
"use strict";

// 常量数据
class ArtifactConst {
    constructor() {
        const mainVal_1 = [7, 14.9, 22.8, 30.8, 38.7, 46.6],
            mainVal_2 = [8.7, 18.6, 28.6, 38.5, 48.4, 58.3];
        this.__ArtifactConstList__ = {
            /**
             * 英语翻译参考：
             * 圣遗物属性：Artifact Details
             * 冷却缩减：CD Reduction
             * 护盾强效：Shield Strength
             */
            // 词缀条目
            entryList: ["CRITRate", "CRITDMG", "ATK", "ATKPer", "DEF", "DEFPer", "HP", "HPPer", "energyRecharge", "elementMastery"],
            entryList_en: ["CRIT Rate", "CRIT DMG", "ATK", "ATK", "DEF", "DEF", "HP", "HP", "Energy Recharge", "Element Mastery"],
            entryList_zh: ["暴击率", "暴击伤害", "攻击力", "攻击力", "防御力", "防御力", "生命值", "生命值", "元素充能效率", "元素精通"],
            entryProbability: [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
            entryValue: {
                CRITRate: [2.7222, 3.1111, 3.5, 3.8889],
                CRITDMG: [5.4402, 6.2174, 7, 7.7718],
                ATK: [13.6111, 15.5556, 17.5, 19.4444],
                ATKPer: [4.0833, 4.6667, 5.25, 5.8333],
                DEF: [16.3333, 18.5, 21, 23.3333],
                DEFPer: [5.1031, 5.8321, 6.5611, 7.2901],
                HP: [209.125, 239, 268.875, 298.75],
                HPPer: [4.0833, 4.6667, 5.25, 5.8333],
                energyRecharge: [4.5325, 5.18, 5.8275, 6.475],
                elementMastery: [16.3333, 18.5, 21, 23.3333]
            },
            extraEnrtyRate: 0.3,
            // 部件列表
            parts: ["Plume", "Flower", "Sands", "Circlet", "Goblet"],
            parts_en: ["Plume of Death", "Flower of Life", "Sands of Eon", "Circlet of Logos", "Goblet of Eonothem"],
            parts_zh: ["死之羽", "生之花", "时之沙", "理之冠", "空之杯"],
            // 部件主词条列表
            Plume: ["ATK"],
            Flower: ["HP"],
            Sands: ["ATKPer", "DEFPer", "HPPer", "elementMastery", "energyRecharge"],
            Circlet: ["CRITRate", "CRITDMG", "ATKPer", "DEFPer", "HPPer", "elementMastery", "Healing"],
            Goblet: ["ATKPer", "DEFPer", "HPPer", "elementMastery", "Hydro", "Pyro", "Electro", "Geo", "Anemo", "Cryo", "Physical"],
            mainEntryList: ["ATK", "HP", "CRITRate", "energyRecharge", "Healing", "CRITDMG", "ATKPer", "DEFPer", "HPPer", "elementMastery", "Hydro", "Pyro", "Electro", "Geo", "Anemo", "Cryo", "Physical"],
            mainEntryList_en: ["ATK", "HP", "CRIT Rate", "Energy Recharge", "Healing Bonus", "CRIT DMG", "ATK", "DEF", "HP", "Element Mastery", "Hydro DMG Bonus", "Pyro DMG Bonus", "Electro DMG Bonus", "Geo DMG Bonus", "Anemo DMG Bonus", "Cryo DMG Bonus", "Physical DMG Bonus"],
            mainEntryList_zh: ["攻击力", "生命值", "暴击率", "元素充能效率", "治疗加成", "暴击伤害", "攻击力", "防御力", "生命值", "元素精通", "水元素伤害加成", "火元素伤害加成", "雷元素伤害加成", "岩元素伤害加成", "风元素伤害加成", "冰元素伤害加成", "物理伤害加成"],
            // 部件主词条概率
            hourglassRate: [0.26, 0.26, 0.26, 0.1, 0.1],
            hatRate: [0.1, 0.1, 0.22, 0.22, 0.22, 0.04, 0.1],
            cupRate: [0.21, 0.21, 0.21, 0.025, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
            // 圣遗物主词条属性
            mainEntryValueList: {
                ATK: [47, 100, 152, 205, 258, 311],
                HP: [717, 1530, 2342, 3156, 3967, 4780],
                CRITRate: [4.7, 9.9, 15.2, 20.5, 25.8, 31.1],
                energyRecharge: [7.8, 16.5, 25.4, 34.2, 43, 51.8],
                Healing: [5.4, 11.5, 17.6, 23.7, 29.8, 35.9],
                CRITDMG: [9.3, 19.9, 30.5, 41, 51.6, 62.2],
                ATKPer: mainVal_1,
                DEFPer: mainVal_2,
                HPPer: mainVal_1,
                elementMastery: [28, 60, 91, 123, 155, 187],
                Hydro: mainVal_1,
                Pyro: mainVal_1,
                Electro: mainVal_1,
                Geo: mainVal_1,
                Anemo: mainVal_1,
                Cryo: mainVal_1,
                Physical: mainVal_2
            },
            // 圣遗物评分选项
            scoreList: ["atk", "crit", "def", "hp", "er", "em"],
            scoreList_zh: ["攻击得分", "双暴得分", "防御得分", "生命得分", "充能得分", "精通得分"],
            scoreStandar: {
                CRITRate: 2,
                CRITDMG: 1,
                ATK: 0.13,
                ATKPer: 1.345,
                DEF: 0.11,
                DEFPer: 1.07,
                HP: 0.0087,
                HPPer: 1.345,
                energyRecharge: 1.2,
                elementMastery: 0.339
            },
            // 圣遗物套装：
            suitList: ['Bizzard Strayer', 'Thundersoother', 'Lavawalker', 'Maiden Beloved', "Gladiator's Finale", 'Viridescent Venerer', "Wanderer's Troupe", 'Thundering Fury', 'Crimson Witch of Flames', 'Noblesse Oblige', 'Bloodstained Chivalry', 'Archaic Petra', 'Retracing Bolide', 'Heart of Depth', 'Tenacity of the Millelith', 'Pale Flame', "Shimenawa's Reminiscence", 'Emblem of Severed Fate'],
            suitList_zh: ['冰风迷途的勇士', '平息雷鸣的尊者', '渡过烈火的贤人', '被怜爱的少女', '角斗士的终幕礼', '翠绿之影', '流浪大地的乐团', '如雷的盛怒', '炽烈的炎之魔女', '昔日宗室之仪', '染血的骑士道', '悠古的磐岩', '逆飞的流星', '沉沦之心', '千岩牢固', '苍白之火', '追忆之注连', '绝缘之旗印'],
            artifactSuit: {
                "Bizzard Strayer": {
                    "Plume": "Icebreaker's Resolve",
                    "Flower": "Snowswept Memory",
                    "Sands": "Frozen Homeland's Demise",
                    "Circlet": "Broken Rime's Echo",
                    "Goblet": "Frost-Weaved Dignity"
                },
                "Thundersoother": {
                    "Plume": "Thundersoother's Plume",
                    "Flower": "Thundersoother's Heart",
                    "Sands": "Thundersoother's Thunder",
                    "Circlet": "Thundersoother's Diadem",
                    "Goblet": "Thundersoother's Goblet"
                },
                "Lavawalker": {
                    "Plume": "Lavawalker's Salvation",
                    "Flower": "Lavawalker's Resolution",
                    "Sands": "Lavawalker's Torment",
                    "Circlet": "Lavawalker's Wisdom",
                    "Goblet": "Lavawalker's Epiphany"
                },
                "Maiden Beloved": {
                    "Plume": "Maiden's Heart-stricken Infatuation",
                    "Flower": "Maiden's Distant Love",
                    "Sands": "Maiden's Passing Youth",
                    "Circlet": "Maiden's Fading Beauty",
                    "Goblet": "Maiden's Fleeting Leisure"
                },
                "Gladiator's Finale": {
                    "Plume": "Gladiator's Destiny",
                    "Flower": "Gladiator's Nostalgia",
                    "Sands": "Gladiator's Longing",
                    "Circlet": "Gladiator's Intoxication",
                    "Goblet": "Gladiator's Triumphus"
                },
                "Viridescent Venerer": {
                    "Plume": "Viridescent Arrow Feather",
                    "Flower": "In Remembrance of Viridescent Fields",
                    "Sands": "Viridescent Venerer's Determination",
                    "Circlet": "Viridescent Venerer's Diadem",
                    "Goblet": "Viridescent Venerer's Vessel"
                },
                "Wanderer's Troupe": {
                    "Plume": "Bard's Arrow Feather",
                    "Flower": "Troupe's Dawnlight",
                    "Sands": "Concert's Final Hour",
                    "Circlet": "Conductor's Top Hat",
                    "Goblet": "Wanderer's String-Kettle"
                },
                "Thundering Fury": {
                    "Plume": "Survivor of Catastrophe",
                    "Flower": "Thunderbird's Mercy",
                    "Sands": "Hourglass of Thunder",
                    "Circlet": "Thunder Summoner's Crown",
                    "Goblet": "Omen of Thunderstorm"
                },
                "Crimson Witch of Flames": {
                    "Plume": "Witch's Ever-Burning Plume",
                    "Flower": "Witch's Flower of Blaze",
                    "Sands": "Witch's End Time",
                    "Circlet": "Witch's Scorching Hat",
                    "Goblet": "Witch's Heart Flames"
                },
                "Noblesse Oblige": {
                    "Plume": "Royal Plume",
                    "Flower": "Royal Flora",
                    "Sands": "Royal Pocket Watch",
                    "Circlet": "Royal Masque",
                    "Goblet": "Royal Silver Urn"
                },
                "Bloodstained Chivalry": {
                    "Plume": "Bloodstained Black Plume",
                    "Flower": "Bloodstained Flower of Iron",
                    "Sands": "Bloodstained Final Hour",
                    "Circlet": "Bloodstained Iron Mask",
                    "Goblet": "Bloodstained Chevalier's Goblet"
                },
                "Archaic Petra": {
                    "Plume": "Feather of Jagged Peaks",
                    "Flower": "Flower of Creviced Cliff",
                    "Sands": "Sundial of Enduring Jade",
                    "Circlet": "Mask of Solitude Basalt",
                    "Goblet": "Goblet of Chiseled Crag"
                },
                "Retracing Bolide": {
                    "Plume": "Summer Night's Finale",
                    "Flower": "Summer Night's Bloom",
                    "Sands": "Summer Night's Moment",
                    "Circlet": "Summer Night's Mask",
                    "Goblet": "Summer Night's Waterballoon"
                },
                "Heart of Depth": {
                    "Plume": "Gust of Nostalgia",
                    "Flower": "Gilded Corsage",
                    "Sands": "Copper Compass",
                    "Circlet": "Wine-Stained Tricorne",
                    "Goblet": "Goblet of Thundering Deep"
                },
                "Tenacity of the Millelith": {
                    "Plume": "Ceremonial War-Plume",
                    "Flower": "Flower of Accolades",
                    "Sands": "Orichalceous Time-Dial",
                    "Circlet": "General's Ancient Helm",
                    "Goblet": "Noble's Pledging Vessel"
                },
                "Pale Flame": {
                    "Plume": "Wise Doctor's Pinion",
                    "Flower": "Stainless Bloom",
                    "Sands": "Moment of Cessation",
                    "Circlet": "Mocking Mask",
                    "Goblet": "Surpassing Cup"
                },
                "Shimenawa's Reminiscence": {
                    "Plume": "Shaft of Remembrance",
                    "Flower": "Entangling Bloom",
                    "Sands": "Morning Dew's Moment",
                    "Circlet": "Capricious Visage",
                    "Goblet": "Hopeful Heart"
                },
                "Emblem of Severed Fate": {
                    "Plume": "Sundered Feather",
                    "Flower": "Magnificent Tsuba",
                    "Sands": "Storm Cage",
                    "Circlet": "Ornate Kabuto",
                    "Goblet": "Scarlet Vessel"
                }
            },
            artifactSuit_zh: {
                "冰风迷途的勇士": {
                    "死之羽": "摧冰而行的执望",
                    "生之花": "历经风雪的思念",
                    "时之沙": "冰雪故园的终期",
                    "理之冠": "破冰踏雪的回音",
                    "空之杯": "遍结寒霜的傲骨"
                },
                "平息雷鸣的尊者": {
                    "死之羽": "平雷之羽",
                    "生之花": "平雷之心",
                    "时之沙": "平雷之刻",
                    "理之冠": "平雷之冠",
                    "空之杯": "平雷之器"
                },
                "渡过烈火的贤人": {
                    "死之羽": "渡火者的解脱",
                    "生之花": "渡火者的决绝",
                    "时之沙": "渡火者的煎熬",
                    "理之冠": "渡火者的智慧",
                    "空之杯": "渡火者的醒悟"
                },
                "被怜爱的少女": {
                    "死之羽": "少女飘摇的思念",
                    "生之花": "远方的少女之心",
                    "时之沙": "少女苦短的良辰",
                    "理之冠": "少女易逝的芳颜",
                    "空之杯": "少女片刻的闲暇"
                },
                "角斗士的终幕礼": {
                    "死之羽": "角斗士的归宿",
                    "生之花": "角斗士的留恋",
                    "时之沙": "角斗士的希冀",
                    "理之冠": "角斗士的凯旋",
                    "空之杯": "角斗士的酣醉"
                },
                "翠绿之影": {
                    "死之羽": "猎人青翠的箭羽",
                    "生之花": "野花记忆的绿野",
                    "时之沙": "翠绿猎人的笃定",
                    "理之冠": "翠绿猎人之冠",
                    "空之杯": "翠绿猎人的容器"
                },
                "流浪大地的乐团": {
                    "死之羽": "琴师的箭羽",
                    "生之花": "乐团的晨光",
                    "时之沙": "终幕的时计",
                    "理之冠": "指挥的礼帽",
                    "空之杯": "吟游者之壶"
                },
                "如雷的盛怒": {
                    "死之羽": "雷灾的孑遗",
                    "生之花": "雷鸟的怜悯",
                    "时之沙": "雷霆的时计",
                    "理之冠": "唤雷的头冠",
                    "空之杯": "降雷的凶兆"
                },
                "炽烈的炎之魔女": {
                    "死之羽": "魔女常燃之羽",
                    "生之花": "魔女的炎之花",
                    "时之沙": "魔女破灭之时",
                    "理之冠": "焦灼的魔女帽",
                    "空之杯": "魔女的心之火"
                },
                "昔日宗室之仪": {
                    "死之羽": "宗室之翎",
                    "生之花": "宗室之花",
                    "时之沙": "宗室时计",
                    "理之冠": "宗室面具",
                    "空之杯": "宗室银瓮"
                },
                "染血的骑士道": {
                    "死之羽": "染血的黑之羽",
                    "生之花": "染血的铁之心",
                    "时之沙": "骑士染血之时",
                    "理之冠": "染血的铁假面",
                    "空之杯": "骑士染血之杯"
                },
                "悠古的磐岩": {
                    "死之羽": "嵯峨群峰之翼",
                    "生之花": "磐陀裂生之花",
                    "时之沙": "星罗圭璧之晷",
                    "理之冠": "不动玄石之相",
                    "空之杯": "巉岩琢塑之樽"
                },
                "逆飞的流星": {
                    "死之羽": "夏祭终末",
                    "生之花": "夏祭之花",
                    "时之沙": "夏祭之刻",
                    "理之冠": "夏祭之面",
                    "空之杯": "夏祭水玉"
                },
                "沉沦之心": {
                    "死之羽": "饰金胸花",
                    "生之花": "追忆之风",
                    "时之沙": "坚铜罗盘",
                    "理之冠": "酒渍船帽",
                    "空之杯": "沉波之盏"
                },
                "千岩牢固": {
                    "死之羽": "昭武翎羽",
                    "生之花": "勋绩之花",
                    "时之沙": "金铜时晷",
                    "理之冠": "将帅兜鍪",
                    "空之杯": "盟誓金爵"
                },
                "苍白之火": {
                    "死之羽": "贤医之羽",
                    "生之花": "无垢之花",
                    "时之沙": "停摆之刻",
                    "理之冠": "嗤笑之面",
                    "空之杯": "超越之盏"
                },
                "追忆之注连": {
                    "死之羽": "思忆之矢",
                    "生之花": "羁缠之花",
                    "时之沙": "朝露之时",
                    "理之冠": "无常之面",
                    "空之杯": "祈望之心"
                },
                "绝缘之旗印": {
                    "死之羽": "切落之羽",
                    "生之花": "明威之镡",
                    "时之沙": "雷云之笼",
                    "理之冠": "华饰之兜",
                    "空之杯": "绯花之壶"
                }
            },
            // 每级升级经验
            exp: [3000, 3725, 4425, 5150, 5900, 6675, 7500, 8350, 9225, 10125, 11050, 12025, 13025, 15150, 17600, 20375, 23500, 27050, 31050, 35575]
        }
        // 设置只读
        const nope = () => {
                throw new Error("Error!This data is read only!");
            },
            read_only = (obj) => new Proxy(obj, {
                set: nope,
                defineProperty: nope,
                deleteProperty: nope,
                preventExtensions: nope,
                setPrototypeOf: nope
            });
        this.__ArtifactConstList__ = read_only(this.__ArtifactConstList__);
    }

    get val() {
        return this.__ArtifactConstList__;
    }
}

/**
 * ES6 version
 */
// 定义私有属性
const VERSION = Symbol("VERSION"),
    AUS_LIST = Symbol("AUS_LIST"),
    DELETE_HISTORY = Symbol("DELETE_HISTORY"),
    SUIT_LIST = Symbol("SUIT_LIST"),
    LIST_LIMIT = Symbol("LIST_LIMIT"),
    LOCAL_STORAGE_KEY = Symbol("LOCAL_STORAGE_KEY"),
    COUNT_LIST = Symbol("COUNT_LIST"),
    LANGUAGE = Symbol("LANGUAGE");

class ArtifactsFunction_class {
    constructor() {
        this[VERSION] = "0.2.1";
        this[AUS_LIST] = [];
        this[DELETE_HISTORY] = [];
        this[SUIT_LIST] = [];
        this[LIST_LIMIT] = 2000;
        this[LOCAL_STORAGE_KEY] = "AUSLocalList";
        this[COUNT_LIST] = {};
        this[LANGUAGE] = "origin";
    }

    /**
     * 生成初始数据
     * @param {string} __part 指定位置，可为空
     * @param {string} __main 指定主词条，可为空
     * @param {array} __entryArr 指定词条（至多四条），可为空
     * @param {array} __entryRate 副词条数值（对应自选副词条），可为空
     * @param {string} __suit 指定圣遗物套装，可为空
     * @returns {Object} 对象newArtifacts
     */
    createArtifact(__part = "", __main = "", __entry = [], __entryRate = [], __suit = "") {
        if (this[AUS_LIST].length >= this[LIST_LIMIT]) {
            console.log(`Warning - The maximum length of the artifacts list is ${this[LIST_LIMIT]}.`);
            return false;
        }
        let newArtifacts = {
                symbol: "",
                level: 0,
                suit: "none",
                part: "none",
                mainEntry: "none",
                mainEntryValue: 0,
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now(),
                lock: false,
                isNew: true
            },
            ArtifactEntry = [],
            ArtifactEntryRate = [];
        // 自选或随机位置
        if (typeof (__part) === "string" && artiConst.val.parts.indexOf(__part) !== -1) {
            newArtifacts.part = __part;
        } else {
            newArtifacts.part = artiConst.val.parts[Math.floor((Math.random() * artiConst.val.parts.length))];
        }
        // 自选或随机套装
        if (typeof (__suit) === "string" && Object.prototype.hasOwnProperty.call(artiConst.val.artifactSuit, __suit)) {
            newArtifacts.suit = __suit;
        } else {
            newArtifacts.suit = this.randomSuit();
        }
        // 自选或随机主属性
        if (typeof (__main) === "string" && artiConst.val.mainEntryList.indexOf(__main) !== -1 && this.mainEntryVerify(newArtifacts.part, __main)) {
            newArtifacts.mainEntry = __main;
        } else {
            newArtifacts.mainEntry = this.randomMainEntry(newArtifacts.part);
        }
        // 主属性数值
        newArtifacts.mainEntryValue = artiConst.val.mainEntryValueList[newArtifacts.mainEntry][0];
        // 临时词条库（排除已有词条）
        for (let i = 0; i < artiConst.val.entryList.length; i++) {
            artiConst.val.entryList[i] === newArtifacts.mainEntry ? null : (ArtifactEntry.push(artiConst.val.entryList[i]), ArtifactEntryRate.push(artiConst.val.entryProbability[i]));
        }
        // 自选副词条
        if (__entry.length <= 4 && this.entryVerify(newArtifacts.mainEntry, __entry)) {
            for (let i = 0; i < __entry.length; i++) {
                let cusEntry = __entry[i],
                    cusEntryRate = __entryRate[i],
                    index = ArtifactEntry.indexOf(cusEntry);
                // 从临时词条库中移除已有词条，避免重复
                ArtifactEntry.splice(index, 1);
                ArtifactEntryRate.splice(index, 1);
                // 判断自选副词条数值是否合规
                if (__entryRate.length === 0 || typeof (cusEntryRate) !== "number" || artiConst.val.entryValue[cusEntry].indexOf(cusEntryRate) === -1) {
                    cusEntryRate = this.randomEntryValue(__entry);
                }
                newArtifacts.entry.push([cusEntry, cusEntryRate]);
            }
        }
        // 随机词条/+若自选词条数量不到3条则补至3条
        while (newArtifacts.entry.length < 3) {
            //临时词条库
            let newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate),
                newEntryRate = this.randomEntryValue(newEntry),
                index = ArtifactEntry.indexOf(newEntry);
            // 从临时词条库中移除已有词条，避免重复
            ArtifactEntry.splice(index, 1);
            ArtifactEntryRate.splice(index, 1);
            newArtifacts.entry.push([newEntry, newEntryRate]);
        }
        // 是否拥有初始四词条
        if (__entry.length === 0 && Math.random() < artiConst.val.extraEnrtyRate) {
            let newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate);
            newArtifacts.entry[3] = [newEntry, this.randomEntryValue(newEntry)];
        }
        newArtifacts.symbol = Date.now().toString(36) + "-" + Math.random().toString(36).substring(2);
        // 保存初始状态
        newArtifacts.initEntry = JSON.stringify(newArtifacts.entry);
        // 保存结果
        this[AUS_LIST].push(newArtifacts);
        // console.log(newArtifacts);
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
        this.changeCount([newArtifacts.part, newArtifacts.mainEntry]);
        return newArtifacts;
    }

    /**
     * 批量生成（随机）
     * @param {number} count 生成数量
     * @param {string} __part 指定位置，可为空
     * @param {string} __main 指定主词条，可为空
     * @param {array} __entryArr 指定词条（至多四条），可为空
     * @param {array} __entryRate 副词条数值（对应自选副词条），可为空
     * @param {string} __suit 指定圣遗物套装，可为空
     * @returns 操作结果
     */
    batchCreate(count, __part = "", __main = "", __entry = [], __entryRate = [], __suit = "") {
        if (typeof (count) !== "number") return false;
        count = Math.floor(count);
        while (count > 0 && this[AUS_LIST].length < this[LIST_LIMIT]) {
            this.createArtifact(__part, __main, __entry, __entryRate, __suit);
            count--;
        }
        if (count > 0) {
            console.log("List limit reached!");
        }
        if (count === 0) return true;
    }

    /**
     * 升级强化
     * @param {number} __index 序号
     * @param {string} __entry 指定强化的词条序号
     * @param {number} __upLevel 强化数值的级别(0-3，3最高)
     * @returns 升级结果
     */
    upgrade(__index, __entry = -1, __upLevel = -1) {
        if (__index >= this[AUS_LIST].length || __index < 0) return false;
        let currentArtifact = this[AUS_LIST][__index],
            currentEntry = [],
            currentEntryList = [],
            currentEntryRate = [];
        // 判断圣遗物是否满级
        if (currentArtifact.level >= 20) {
            // console.log("Upgrade failed,this Artifact is fully rated.");
            return false;
        }
        // 是否需要补充词条
        if (currentArtifact.entry.length < 4) {
            for (let i = 0; i < currentArtifact.entry.length; i++) {
                currentEntry.push(currentArtifact.entry[i][0]);
            }
            // 挑选可用词条（避免与其余词条重复）
            for (let i = 0; i < artiConst.val.entryList.length; i++) {
                if (currentEntry.indexOf(artiConst.val.entryList[i]) < 0) {
                    currentEntryList.push(artiConst.val.entryList[i]);
                    currentEntryRate.push(artiConst.val.entryProbability[i]);
                }
            }
            let addEntry = this.randomRate(currentEntryList, currentEntryRate),
                addRate = this.randomEntryValue(addEntry);
            currentArtifact.entry.push([addEntry, addRate]);
            currentArtifact.upgradeHistory.push([addEntry, addRate]);
        } else {
            let upIndex = 0,
                upEntry = "",
                upRate = 0;
            // 优先升级自选词条
            if ((typeof (__entry) === "string" || typeof (__entry) === "number") && Number.parseInt(__entry) > -1 && Number.parseInt(__entry) < currentArtifact.entry.length) {
                upIndex = __entry;
                upEntry = currentArtifact.entry[__entry][0];
            } else {
                // 升级随机词条
                upIndex = Math.floor(Math.random() * currentArtifact.entry.length);
                upEntry = currentArtifact.entry[upIndex][0];
            }
            if (__upLevel !== -1 && typeof (__upLevel) === "number" && Math.floor(__upLevel) < artiConst.val.entryValue[upEntry].length) {
                upRate = artiConst.val.entryValue[upEntry][Math.floor(__upLevel)];
            } else {
                upRate = this.randomEntryValue(upEntry);
            }
            // console.log("Upgrade success," + upEntry + " + " + upRate);
            currentArtifact.entry[upIndex][1] += upRate;
            currentArtifact.upgradeHistory.push([upEntry, upRate]);
        }
        // 增加等级
        currentArtifact.level += 4;
        // 移除新遗物状态
        currentArtifact.isNew = false;
        // 增加主属性
        currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][currentArtifact.level / 4];
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
        return true;
    }

    /**
     * 圣遗物得分计算
     * @param {number} __index 需要计算的圣遗物序号 
     * @param {string | array} __rule 计算规则，可以为字符串和数组
     * @returns 得分
     */
    ArtifactScore(__index, __rule = "default") {
        if (typeof (__index) !== "number" || (typeof (__rule) !== "string" && !Array.isArray(__rule))) return 0;
        if (__index >= this[AUS_LIST].length || __index < 0) {
            return 0;
        }
        let atkScore = 0,
            critScore = 0,
            defScore = 0,
            HPScore = 0,
            rechargeScore = 0,
            EMScore = 0,
            totalScore = 0,
            entryArr = this[AUS_LIST][__index].entry;
        for (let i = 0; i < entryArr.length; i++) {
            let entryNow = entryArr[i][0],
                addScore = entryArr[i][1] * artiConst.val.scoreStandar[entryNow];
            if (entryNow === "ATK" || entryNow === "ATKPer") {
                atkScore += addScore;
            } else if (entryNow === "CRITRate" || entryNow === "CRITDMG") {
                critScore += addScore;
            } else if (entryNow === "DEF" || entryNow === "DEFPer") {
                defScore += addScore;
            } else if (entryNow === "HP" || entryNow === "HPPer") {
                HPScore += addScore;
            } else if (entryNow === "energyRecharge") {
                rechargeScore += addScore;
            } else if (entryNow === "elementMastery") {
                EMScore += addScore;
            }
        }
        if (Array.isArray(__rule)) {
            for (let i = 0; i < __rule.length; i++) {
                switch (__rule[i].toLowerCase()) {
                    case "atk":
                        totalScore += atkScore;
                        break;
                    case "crit":
                        totalScore += critScore;
                        break;
                    case "def":
                        totalScore += defScore;
                        break;
                    case "hp":
                        totalScore += HPScore;
                        break;
                    case "er":
                        totalScore += rechargeScore;
                        break;
                    case "em":
                        totalScore += EMScore;
                        break;
                    default:
                        totalScore += 0;
                        break;
                }
            }
        } else {
            __rule = __rule.toLowerCase();
            switch (__rule) {
                case "default":
                    return atkScore + critScore;
                case "atk":
                    return atkScore;
                case "crit":
                    return critScore;
                case "def":
                    return defScore;
                case "hp":
                    return HPScore;
                case "er":
                    return rechargeScore;
                case "em":
                    return EMScore;
            }
        }
        return totalScore;
    }

    /**
     * 圣遗物重置初始状态
     * @param {number} __index 序号
     * @returns 返回操作结果
     */
    reset(__index) {
        let currentArtifact = this[AUS_LIST][__index];
        if (currentArtifact.lock) {
            return false;
        } else {
            currentArtifact.entry.length = 0;
            currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
            currentArtifact.upgradeHistory.length = 0;
            currentArtifact.level = 0;
            currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][0];
            this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
            return true;
        }
    }

    /**
     * 重置全部圣遗物状态
     */
    resetAll() {
        for (let i = 0; i < this[AUS_LIST].length; i++) {
            this.reset(i);
        }
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
    }

    /**
     * 删除指定数据
     * @param {number} index 要删除的遗物序号
     * @returns 操作结果
     */
    deleteOne(index) {
        let artifact = this[AUS_LIST][index];
        if (artifact.lock === true) {
            // console.log("%cDelete fail.This Artifact is locked.", "color:rgb(144,82,41)");
            return false;
        } else {
            this.changeCount([artifact.part, artifact.mainEntry], -1);
            this[DELETE_HISTORY].push(this[AUS_LIST].splice(index, 1)[0]);
            this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
            return true;
        }
    }

    /**
     * 清空数据
     */
    clearAll() {
        let index = 0;
        while (index !== this[AUS_LIST].length) {
            let artifact = this[AUS_LIST][index];
            if (artifact.lock === false) {
                this[AUS_LIST].splice(index, 1);
            } else {
                index++;
            }
        }
        this.enforceUpdateCount();
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
    }

    /**
     * 撤销删除（对deleteOne删除的数据生效）
     * @returns 结果
     */
    undoDel() {
        if (this[DELETE_HISTORY].length === 0) {
            console.log("Undo false, history not found.");
            return false;
        }
        let artifact = this[DELETE_HISTORY].pop();
        this[AUS_LIST].push(artifact);
        this.changeCount([artifact.part, artifact.mainEntry]);
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
        return true;
    }

    /**
     * 更改countList
     * @param {string | array} key 键
     * @param {number} range 增加的值（为负数时则减少）
     * @returns 操作结果 true/false
     */
    changeCount(key, range = 1) {
        if (typeof (key) !== "string" && !Array.isArray(key)) return false;
        let countList = this[COUNT_LIST];
        if (typeof (key) === "string") {
            key = [key];
        }
        key.forEach(val => {
            if (Object.prototype.hasOwnProperty.call(countList, val)) {
                countList[val] = countList[val] + range;
            } else {
                countList[val] = range;
            }
            if (countList[val] < 0) countList[val] = 0;
        })
        return true;
    }

    /**
     * 强制刷新countList
     */
    enforceUpdateCount() {
        this[COUNT_LIST] = {}
        this[AUS_LIST].forEach(val => {
            this.changeCount([val.part, val.mainEntry]);
        })
    }

    /**
     * 圣遗物上锁/解锁
     * @param {number} index 圣遗物下标
     * @returns 操作结果
     */
    lock(index) {
        if (typeof (index) !== 'number') return false;
        this[AUS_LIST][index].lock = !this[AUS_LIST][index].lock;
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
        return true;
    }

    /**
     * 查找countList
     * @param {string} key 键
     * @returns 键值
     */
    getCount(key) {
        if (typeof (key) !== "string") return false;
        let countList = this[COUNT_LIST];
        if (Object.prototype.hasOwnProperty.call(countList, key)) {
            return countList[key];
        } else {
            return 0;
        }
    }

    /**
     * 对圣遗物列表排序
     * @param {string} rule 排序规则
     * @returns 排序结果（失败才有返回值）
     */
    sortList(rule = "lvasc") {
        if (typeof (rule) !== "string") return false;
        if (rule === "main") rule = "mainEntry";
        let list = this[AUS_LIST];
        try {
            list.sort((val_a, val_b) => {
                let suit_a = artiConst.val.suitList.indexOf(val_a.suit),
                    suit_b = artiConst.val.suitList.indexOf(val_b.suit),
                    part_a = artiConst.val.parts.indexOf(val_a.part),
                    part_b = artiConst.val.parts.indexOf(val_b.part),
                    main_a = artiConst.val.mainEntryList.indexOf(val_a.mainEntry),
                    main_b = artiConst.val.mainEntryList.indexOf(val_b.mainEntry);
                if (rule === "lvasc" || rule === "lvdesc") {
                    // 排序优先级：先按照等级升/降序，再按照套装降序，再按照位置升序，最后按主属性升序
                    if ((val_a.level > val_b.level && rule === "lvasc") || (val_a.level < val_b.level && rule === "lvdesc")) {
                        return 1;
                    } else if ((val_a.level < val_b.level && rule === "lvasc") || (val_a.level > val_b.level && rule === "lvdesc")) {
                        return -1
                    } else if (val_a.level === val_b.level) {
                        let suit_a = artiConst.val.suitList.indexOf(val_a.suit),
                            suit_b = artiConst.val.suitList.indexOf(val_b.suit);
                        if (suit_a > suit_b) {
                            return -1;
                        } else if (suit_a < suit_b) {
                            return 1;
                        } else if (suit_a === suit_b) {
                            if (part_a > part_b) {
                                return 1;
                            } else if (part_a < part_b) {
                                return -1;
                            } else if (part_a === part_b) {
                                if (main_a > main_b) {
                                    return 1;
                                } else if (main_a < main_b) {
                                    return -1
                                } else {
                                    return 0;
                                }
                            }
                        }
                    }
                }
                if (rule === "part" || rule === "mainEntry") {
                    // 排序优先级：先按照part/mainEntry升序，再按照等级降序排列，再按照套装降序
                    let name_a, name_b, name_a2, name_b2;
                    if (rule === "part") {
                        name_a = artiConst.val.parts.indexOf(val_a[rule]);
                        name_b = artiConst.val.parts.indexOf(val_b[rule]);
                        rule = "mainEntry";
                        name_a2 = artiConst.val.mainEntryList.indexOf(val_a[rule]);
                        name_b2 = artiConst.val.mainEntryList.indexOf(val_a[rule]);
                    } else {
                        name_a = artiConst.val.mainEntryList.indexOf(val_a[rule]);
                        name_b = artiConst.val.mainEntryList.indexOf(val_b[rule]);
                        rule = "part";
                        name_a2 = artiConst.val.parts.indexOf(val_a[rule]),
                            name_b2 = artiConst.val.parts.indexOf(val_a[rule]);
                    }
                    if (name_a > name_b) {
                        return 1;
                    }
                    if (name_a < name_b) {
                        return -1;
                    }
                    if (name_a === name_b) {
                        if (name_a2 > name_b2) {
                            return 1;
                        } else if (name_a2 < name_b2) {
                            return -1;
                        } else if (name_a2 === name_b2) {
                            if (val_a.level > val_b.level) {
                                return -1
                            } else if (val_a.level < val_b.level) {
                                return 1
                            } else if (val_a.level === val_b.level) {
                                if (suit_a > suit_b) {
                                    return -1;
                                } else if (suit_a < suit_b) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                    }
                    return 0;
                }
            })
            this.setLocalStorage(this[LOCAL_STORAGE_KEY], list);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * 根据symbol查询圣遗物所在位置（下标）
     * @param {string} symbol 圣遗物标识
     * @returns 圣遗物在表中的位置(index)
     */
    getIndex(symbol) {
        for (let i = 0; i < this[AUS_LIST].length; i++) {
            const item = this[AUS_LIST][i];
            if (item.symbol === symbol) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 处理并返回指定symbol的圣遗物数据
     * @param {string} symbol 圣遗物symbol
     * @param {string} language 目标语言（默认中文）
     * @returns 查询结果
     */
    getArtifact(symbol, language = "origin") {
        let index = this.getIndex(symbol);
        if (index === -1) {
            return false;
        } else if (language === "origin") {
            return this[AUS_LIST][index];
        } else {
            return this.translate(this[AUS_LIST][index], language);
        }
    }

    /**
     * 移除isNew状态
     * @param {number} index 圣遗物下标
     * @returns 操作结果
     */
    notNew(index) {
        try {
            this[AUS_LIST][index].isNew = false;
            this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
            return true;
        } catch (error) {
            return false;
        }
    }

    /** 其他函数 **/

    /**
     * 词条汉化-可调用
     * @param {string} word 需要翻译成中文的词条
     * @param {string} type 词条的类型
     * @returns 翻译结果
     */
    toChinese(word, type) {
        if (typeof (word) !== "string" || typeof (type) !== "string") return false;
        if (type == "entry") {
            if (artiConst.val.entryList.indexOf(word) !== -1) {
                return artiConst.val.entryList_zh[artiConst.val.entryList.indexOf(word)];
            }
            return false;
        } else if (type === "parts") {
            if (artiConst.val.parts.indexOf(word) !== -1) {
                return artiConst.val.parts_zh[artiConst.val.parts.indexOf(word)];
            }
            return false;
        } else if (type === "mainEntry") {
            if (artiConst.val.mainEntryList.indexOf(word) !== -1) {
                return artiConst.val.mainEntryList_zh[artiConst.val.mainEntryList.indexOf(word)];
            }
            return false;
        } else if (type === "score") {
            if (artiConst.val.scoreList.indexOf(word) !== -1) {
                return artiConst.val.scoreList_zh[artiConst.val.scoreList.indexOf(word)];
            }
            return false;
        } else if (type === "suit") {
            if (artiConst.val.suitList.indexOf(word) !== -1) {
                return artiConst.val.suitList_zh[artiConst.val.suitList.indexOf(word)];
            }
            return false;
        }
        return false;
    }

    /**
     * 圣遗物翻译&词条处理
     * @param {object} artifact 待处理的圣遗物数据
     * @param {string} language 目标语言
     * @returns 处理后的圣遗物数据
     */
    translate(item, language = "zh") {
        const lan = ["zh", "en"];
        let artifact = JSON.parse(JSON.stringify(item));
        if (typeof (language) !== "string" || lan.indexOf(language) === -1) return artifact;
        try {
            if (lan.indexOf(language) !== -1 && language !== "origin") {
                // 主词条数值处理
                artifact.mainEntryValue = this.entryValFormat(artifact.mainEntry, artifact.mainEntryValue, "main");
                if (language === "zh") {
                    artifact.mainEntry = this.toChinese(artifact.mainEntry, "mainEntry");
                    artifact.part = this.toChinese(artifact.part, "parts");
                    artifact.suit = this.toChinese(artifact.suit, "suit");
                } else if (language === "en") {
                    artifact.mainEntry = artiConst.val.mainEntryList_en[artiConst.val.mainEntryList.indexOf(artifact.mainEntry)];
                    artifact.part = artiConst.val.parts_en[artiConst.val.parts.indexOf(artifact.part)];
                }
                // 副词条数值处理
                artifact.entry.forEach(e => {
                    e[1] = this.entryValFormat(e[0], e[1]);
                    if (language === "zh") e[0] = this.toChinese(e[0], "entry");
                    if (language === "en") e[0] = artiConst.val.entryList_en[artiConst.val.entryList.indexOf(e[0])];
                })
            }
        } catch (error) {
            return artifact;
        }
        return artifact;
    }

    /**
     * 词条数值处理（展示用）
     * @param {string} entry 词条名称
     * @param {string | number} entryValue 词条数值
     * @param {string} type 词条类型
     * @returns 处理后的词条数值
     */
    entryValFormat(entry, entryValue, type = "default") {
        const percentEntry = ["CRITRate", "CRITDMG", "ATKPer", "DEFPer", "HPPer", "energyRecharge"],
            nonPercentMain = ["ATK", "HP", "elementMastery"];
        if (typeof (entry) !== "string" || typeof (type) !== "string" || (typeof (entryValue) !== "string" && typeof (entryValue) !== "number")) {
            return false;
        }
        if (type.toLowerCase() === "main") {
            if (artiConst.val.mainEntryList.indexOf(entry) === -1) return false;
            if (nonPercentMain.indexOf(entry) !== -1) {
                entryValue = this.toThousands(entryValue);
            } else {
                entryValue = Number.parseFloat(entryValue).toFixed(1) + "%";
            }
            return entryValue;
        } else {
            if (artiConst.val.entryList.indexOf(entry) === -1) return false;
            if (percentEntry.indexOf(entry) !== -1) {
                entryValue = Number.parseFloat(entryValue).toFixed(1) + "%";
            } else {
                entryValue = this.toThousands(Number.parseFloat(entryValue).toFixed(0));
            }
            return entryValue;
        }
    }

    /**
     * 根据数组随机概率
     * @param {array} __arr1  随机列表
     * @param {array} __arr2  随机概率（对应arr1）
     */
    randomRate(__arr1, __arr2) {
        if (!Array.isArray(__arr1) || !Array.isArray(__arr2)) throw new Error("Function RandomRate Warning!Wrong parameter.");
        if (__arr1.length !== __arr2.length) throw new Error("Function RandomRate Warning!Array length different!");
        let __rand = Math.random(),
            __rate = 0,
            __totalRate = 0;
        for (let __i = 0; __i < __arr2.length; __i++) {
            __totalRate += __arr2[__i];
        }
        __rand *= __totalRate;
        for (let __i = 0; __i < __arr2.length; __i++) {
            __rate += __arr2[__i];
            if (__rand <= __rate) {
                return __arr1[__i];
            }
        }
        return __arr1[__arr1.length - 1];
    }

    /**
     * 随机圣遗物套装
     * @returns 随机的圣遗物套装
     */
    randomSuit() {
        return artiConst.val.suitList[Math.floor(Math.random() * artiConst.val.suitList.length)];
    }

    /**
     * 随机主词条
     * @param {string} __part 位置
     */
    randomMainEntry(__part) {
        if (typeof (__part) !== "string") throw new Error("Function randomMainEntry Error!Wrong parameter(Not string).");
        switch (__part) {
            case "Plume":
                return "ATK";
            case "Flower":
                return "HP";
            case "Sands":
                return this.randomRate(artiConst.val.Sands, artiConst.val.hourglassRate);
            case "Circlet":
                return this.randomRate(artiConst.val.Circlet, artiConst.val.hatRate);
            case "Goblet":
                return this.randomRate(artiConst.val.Goblet, artiConst.val.cupRate);
            default:
                console.log("Error! -randomMainEntry-");
                return false;
        }
    }

    /** 
     * 随机副词条数值
     * @param {string} __entry 词条名称
     */
    randomEntryValue(__entry) {
        if (typeof (__entry) !== "string") throw new Error("Function randomEntryValue Error!Wrong parameter(Not string).");
        return artiConst.val.entryValue[__entry][Math.floor(Math.random() * artiConst.val.entryValue[__entry].length)];
    }

    /**
     * 主词条合规验证
     * @param {string} __part 位置
     * @param {string} __main 主词条
     * @returns {boolean} true/false
     */
    mainEntryVerify(__part, __main) {
        if (typeof (__part) !== "string" || typeof (__main) !== "string") throw new Error("Function mainEntryVerify Error!Wrong parameter(Not string).");
        if (artiConst.val.parts.indexOf(__part) !== -1 && artiConst.val.mainEntryList.indexOf(__main) !== -1) {
            if (artiConst.val[__part].indexOf(__main) !== -1) {
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * 自选副词条合规验证
     * @param {string} __mainEntry 主词条
     * @param {array} __entryArr 副词条数组
     * @returns 
     */
    entryVerify(__mainEntry, __entryArr) {
        if (typeof (__mainEntry) !== "string" || !Array.isArray(__entryArr)) throw new Error("Function entryVerify Error!Wrong parameter.");
        for (let i = 0; i < __entryArr.length; i++) {
            if (__mainEntry === __entryArr[i] || artiConst.val.entryList.indexOf(__entryArr[i]) === -1) {
                return false;
            }
        }
        return true;
    }

    /**
     * 数字千位分割（加逗号）
     * @param {number | string} val 待转化的数字
     * @returns 转换结果（字符串）
     */
    toThousands(val) {
        return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }

    get MihoyoImYourDaddy() {
        for (let i = 0; i < this.AUSList.length; i++) {
            const artifact = this.AUSList[i];
            for (let j = 0; j < artifact.entry.length; j++) {
                const entry = artifact.entry[j];
                if (entry[0] === "CRITRate" || entry[0] === "CRITDMG") {
                    while (artifact.level < 20) {
                        this.upgrade(i, entry[0], 3);
                    }
                }
            }
        }
        return "Yes,you are!";
    }

    /**
     * localStorage存储
     * @param {string} key 键
     * @param {array | srting | object} val 值
     */
    setLocalStorage(key, val) {
        if (typeof (val) === "object") val = JSON.stringify(val);
        if (typeof (val) === "number") val = val.toString();
        let storage = window.localStorage;
        if (!storage) {
            throw new Error("The browser does not support LocalStorage.");
        } else {
            storage.setItem(key, val);
        }
    }

    /**
     * get扩展（带参获取列表）
     * @param {string} language 语言
     * @param {string | array} filterPart 位置筛选
     * @param {string | array} filterMain 主属性筛选
     * @returns 处理后的结果
     */
    getList(language = "origin", filterPart = "default", filterMain = "default", filterSuit = "default") {
        const lan = ["zh", "en", "origin"];
        // 筛选符合条件的过滤属性
        let arrFilter = function (arr, type) {
            let res = [];
            for (let el of arr) {
                if (type === "main") {
                    artiConst.val.mainEntryList.indexOf(el) >= 0 ? res.push(el) : null;
                } else if (type === "part") {
                    artiConst.val.parts.indexOf(el) >= 0 ? res.push(el) : null;
                } else if (type === "suit") {
                    artiConst.val.suitList.indexOf(el) >= 0 ? res.push(el) : null;
                }
            }
            if (res.length === 0) return ["default"];
            return res;
        }
        // 参数验证
        if (typeof (language) !== "string" || lan.indexOf(language.toLowerCase()) === -1) language = "origin";
        // 字符串转数组
        if (typeof (filterPart) === "string") filterPart = [filterPart];
        if (typeof (filterMain) === "string") filterMain = [filterMain];
        if (typeof (filterSuit) === "string") filterSuit = [filterSuit];
        if (Array.isArray(filterPart)) {
            filterPart = arrFilter(filterPart, "part");
        } else {
            filterPart = ["default"];
        }
        if (Array.isArray(filterMain)) {
            filterMain = arrFilter(filterMain, "main");
        } else {
            filterMain = ["default"];
        }
        if (Array.isArray(filterSuit)) {
            filterSuit = arrFilter(filterSuit, "suit");
        } else {
            filterSuit = ["default"];
        }

        language = language.toLowerCase();
        let AUSList = [];
        for (let item of this[AUS_LIST]) {
            // 筛选符合条件的圣遗物
            if ((filterPart.indexOf("default") !== -1 || filterPart.indexOf(item.part) !== -1) &&
                (filterMain.indexOf("default") !== -1 || filterMain.indexOf(item.mainEntry) !== -1) &&
                (filterSuit.indexOf("default") !== -1 || filterSuit.indexOf(item.suit) !== -1)) {
                // 深拷贝单个数据，处理后加入新数组
                let artifact = JSON.parse(JSON.stringify(item));
                artifact = this.translate(artifact, language);
                AUSList.push(artifact);
            }
        }
        return AUSList;
    }

    // 获取版本号
    get version() {
        return this[VERSION];
    }

    get language() {
        return this[LANGUAGE];
    }

    get LSkey() {
        return this[LOCAL_STORAGE_KEY];
    }

    get maxCount() {
        return this[LIST_LIMIT];
    }

    get AUSList() {
        return this[AUS_LIST];
    }

    set language(val) {
        const lan = ["zh", "en", "origin"];
        if (typeof (val) === "string") {
            lan.indexOf(val.toLowerCase()) !== -1 ? this[LANGUAGE] = val : this[LANGUAGE] = "origin";
        }
    }

    set AUSList(val) {
        if (Array.isArray(val)) {
            if (val.length > this[LIST_LIMIT]) {
                val.length = this[LIST_LIMIT];
                console.log(`Warning - The maximum length of the artifacts list is ${this[LIST_LIMIT]}.`);
            }
            this[AUS_LIST].length = 0;
            this[AUS_LIST] = val;
            this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
            console.log("%cSet new Artifacts list success.", "color:rgb(144,82,41)");
        }
    }
}

const artiConst = new ArtifactConst();
const ArtifactsSim = new ArtifactsFunction_class();
console.log("%cArtifactsUpgradeSim is running.Learn more: https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js", "color:rgb(144,82,41)");

/** --------------------------------辅助函数-------------------------------- **/

/**
 * 模拟器初始化
 */
(function () {
    // 加载本地数据
    let storage = window.localStorage;
    let localList = storage[ArtifactsSim.LSkey];
    if (!storage) {
        throw new Error("The browser does not support LocalStorage.");
    } else {
        if (storage.ArtifactsSimVersion === undefined) {
            storage.ArtifactsSimVersion = ArtifactsSim.version;
        } else if (storage.ArtifactsSimVersion !== ArtifactsSim.version) {
            // 清理0.2.0以前的数据
            if ('0.2.0' > storage.ArtifactsSimVersion) {
                localList = "";
            }
            alert("模拟器版本更新，如果遇到错误，请尝试清除浏览器缓存!");
            storage.ArtifactsSimVersion = ArtifactsSim.version;
        }
    }
    if (localList !== undefined && localList !== "[]" && localList !== "") {
        try {
            ArtifactsSim.AUSList = JSON.parse(localList);
        } catch (error) {
            console.log("%cSet new Artifacts list fail.", "color:rgb(144,82,41)");
        }
        // 解析数量+兼容旧版
        try {
            ArtifactsSim.AUSList.forEach(val => {
                ArtifactsSim.changeCount([val.part, val.mainEntry]);
                // 兼容旧版数据
                if (!Object.prototype.hasOwnProperty.call(val, "symbol")) {
                    val.symbol = Date.now().toString(36) + "-" + Math.random().toString(36).substring(2);
                }
                if (!Object.prototype.hasOwnProperty.call(val, "suit")) {
                    val.suit = "Gladiator's Finale";
                }
                if (!Object.prototype.hasOwnProperty.call(val, "lock")) {
                    val.lock = false;
                }
                if (!Object.prototype.hasOwnProperty.call(val, "isNew")) {
                    val.isNew = false;
                }
            })
        } catch (error) {
            console.log("%cCannot set count.", "color:rgb(144,82,41)");
        }
    }
})()

export {
    ArtifactsSim,
    artiConst
}