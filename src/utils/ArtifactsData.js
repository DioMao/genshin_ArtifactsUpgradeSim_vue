/**
 * ArtifactsUpgradeSim v0.2.1 module_data
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/main/LICENSE)
 */
 "use strict"; 

// 常量数据
export class ArtifactData {
    #AUTHOR = "DioMao"
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

    get author() {
        return this.#AUTHOR;
    }
}