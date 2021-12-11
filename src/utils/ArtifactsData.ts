/**
 * ArtifactsUpgradeSim v0.2.3 module_data
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/graphs/contributors)
 * Licensed under GPL3.0 (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/LICENSE)
 */
import { ArtifactNameSpace } from './ArtifactsUpgradeSimTypes';

// 常量数据
export class ArtifactData {
  readonly __ArtifactConstList__: ArtifactNameSpace.ArtifactsDataType;
  private AUTHOR: string;

  constructor() {
    const mainVal_1 = [7, 14.9, 22.8, 30.8, 38.7, 46.6];
    const mainVal_2 = [8.7, 18.6, 28.6, 38.5, 48.4, 58.3];
    //ATK = [47,60,73,86,100,,,139,152,166];
    //ATKPer = [7,9,11,12.9,14.9,16.9,18.9,20.9,22.8,24.8,26.8,28.8,30.8]
    this.AUTHOR = 'DioMao';
    this.__ArtifactConstList__ = {
      // 词缀条目
      entryList: ['CRITRate', 'CRITDMG', 'ATK', 'ATKPer', 'DEF', 'DEFPer', 'HP', 'HPPer', 'energyRecharge', 'elementMastery'],
      entryList_en: ['CRIT Rate', 'CRIT DMG', 'ATK', 'ATK', 'DEF', 'DEF', 'HP', 'HP', 'Energy Recharge', 'Element Mastery'],
      entryList_zh: ['暴击率', '暴击伤害', '攻击力', '攻击力', '防御力', '防御力', '生命值', '生命值', '元素充能效率', '元素精通'],
      entryProbability: [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
      entryValue: {
        CRITRate: [2.7222, 3.1111, 3.5, 3.8889],
        CRITDMG: [5.4402, 6.2174, 6.99, 7.7718],
        ATK: [13.6111, 15.5556, 17.5, 19.4444],
        ATKPer: [4.0833, 4.6667, 5.25, 5.8333],
        DEF: [16.3333, 18.5, 21, 23.3333],
        DEFPer: [5.1031, 5.8321, 6.5611, 7.2901],
        HP: [209.125, 239, 268.875, 298.75],
        HPPer: [4.0833, 4.6667, 5.25, 5.8333],
        energyRecharge: [4.5325, 5.18, 5.8275, 6.475],
        elementMastery: [16.3333, 18.5, 21, 23.3333]
      },
      // 初始4词条概率
      extraEnrtyRate: 0.25,
      // 部件列表
      parts: ['Plume', 'Flower', 'Sands', 'Circlet', 'Goblet'],
      parts_en: ['Plume of Death', 'Flower of Life', 'Sands of Eon', 'Circlet of Logos', 'Goblet of Eonothem'],
      parts_zh: ['死之羽', '生之花', '时之沙', '理之冠', '空之杯'],
      // 部件主词条列表
      Plume: ['ATK'],
      Flower: ['HP'],
      Sands: ['ATKPer', 'DEFPer', 'HPPer', 'elementMastery', 'energyRecharge'],
      Circlet: ['CRITRate', 'CRITDMG', 'ATKPer', 'DEFPer', 'HPPer', 'elementMastery', 'Healing'],
      Goblet: ['ATKPer', 'DEFPer', 'HPPer', 'elementMastery', 'Hydro', 'Pyro', 'Electro', 'Geo', 'Anemo', 'Cryo', 'Physical'],
      mainEntryList: [
        'ATK',
        'HP',
        'CRITRate',
        'energyRecharge',
        'Healing',
        'CRITDMG',
        'ATKPer',
        'DEFPer',
        'HPPer',
        'elementMastery',
        'Hydro',
        'Pyro',
        'Electro',
        'Geo',
        'Anemo',
        'Cryo',
        'Physical'
      ],
      mainEntryList_en: [
        'ATK',
        'HP',
        'CRIT Rate',
        'Energy Recharge',
        'Healing Bonus',
        'CRIT DMG',
        'ATK',
        'DEF',
        'HP',
        'Element Mastery',
        'Hydro DMG Bonus',
        'Pyro DMG Bonus',
        'Electro DMG Bonus',
        'Geo DMG Bonus',
        'Anemo DMG Bonus',
        'Cryo DMG Bonus',
        'Physical DMG Bonus'
      ],
      mainEntryList_zh: [
        '攻击力',
        '生命值',
        '暴击率',
        '元素充能效率',
        '治疗加成',
        '暴击伤害',
        '攻击力',
        '防御力',
        '生命值',
        '元素精通',
        '水元素伤害加成',
        '火元素伤害加成',
        '雷元素伤害加成',
        '岩元素伤害加成',
        '风元素伤害加成',
        '冰元素伤害加成',
        '物理伤害加成'
      ],
      // 部件主词条概率
      hourglassRate: [0.25, 0.25, 0.25, 0.1, 0.1],
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
      scoreList: ['atk', 'crit', 'def', 'hp', 'er', 'em'],
      scoreList_zh: ['攻击得分', '双暴得分', '防御得分', '生命得分', '充能得分', '精通得分'],
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
      setList: [
        'Bizzard Strayer',
        'Thundersoother',
        'Lavawalker',
        'Maiden Beloved',
        "Gladiator's Finale",
        'Viridescent Venerer',
        "Wanderer's Troupe",
        'Thundering Fury',
        'Crimson Witch of Flames',
        'Noblesse Oblige',
        'Bloodstained Chivalry',
        'Archaic Petra',
        'Retracing Bolide',
        'Heart of Depth',
        'Tenacity of the Millelith',
        'Pale Flame',
        "Shimenawa's Reminiscence",
        'Emblem of Severed Fate',
        'Husk of Opulent Dreams',
        'Ocean-Hued Clam'
      ],
      setList_zh: [
        '冰风迷途的勇士',
        '平息雷鸣的尊者',
        '渡过烈火的贤人',
        '被怜爱的少女',
        '角斗士的终幕礼',
        '翠绿之影',
        '流浪大地的乐团',
        '如雷的盛怒',
        '炽烈的炎之魔女',
        '昔日宗室之仪',
        '染血的骑士道',
        '悠古的磐岩',
        '逆飞的流星',
        '沉沦之心',
        '千岩牢固',
        '苍白之火',
        '追忆之注连',
        '绝缘之旗印',
        '华馆梦醒形骸记',
        '海染砗磲'
      ],
      artifactSet: {
        'Bizzard Strayer': {
          Plume: "Icebreaker's Resolve",
          Flower: 'Snowswept Memory',
          Sands: "Frozen Homeland's Demise",
          Circlet: "Broken Rime's Echo",
          Goblet: 'Frost-Weaved Dignity',
          Set2: 'Cryo DMG Bonus +15%.',
          Set4:
            'When a characterattacks an opponent affected by Cryo, their CRIT Rate is increasedby 20%. If the opponent is Frozen, CRIT Rate is increased byan additional 20%.'
        },
        'Thundersoother': {
          Plume: "Thundersoother's Plume",
          Flower: "Thundersoother's Heart",
          Sands: "Thundersoother's Thunder",
          Circlet: "Thundersoother's Diadem",
          Goblet: "Thundersoother's Goblet",
          Set2: 'Electro RES increased by 40%.',
          Set4: 'Increases DMG against opponents affected by Electro by 35%.'
        },
        'Lavawalker': {
          Plume: "Lavawalker's Salvation",
          Flower: "Lavawalker's Resolution",
          Sands: "Lavawalker's Torment",
          Circlet: "Lavawalker's Wisdom",
          Goblet: "Lavawalker's Epiphany",
          Set2: 'Pyro RES increased by 40%.',
          Set4: 'Increases DMG against opponents affected by Pyro by 35%.'
        },
        'Maiden Beloved': {
          Plume: "Maiden's Heart-stricken Infatuation",
          Flower: "Maiden's Distant Love",
          Sands: "Maiden's Passing Youth",
          Circlet: "Maiden's Fading Beauty",
          Goblet: "Maiden's Fleeting Leisure",
          Set2: 'Character Healing Effectiveness +15%.',
          Set4: 'Using an Elemental Skill or Burst increases healing received by all party members by 20% for 10s.'
        },
        "Gladiator's Finale": {
          Plume: "Gladiator's Destiny",
          Flower: "Gladiator's Nostalgia",
          Sands: "Gladiator's Longing",
          Circlet: "Gladiator's Intoxication",
          Goblet: "Gladiator's Triumphus",
          Set2: 'ATK +18%.',
          Set4: 'If the wielder of this artifact set uses a Sword, Claymore or Polearm, increases their Normal Attack DMG by35%.'
        },
        'Viridescent Venerer': {
          Plume: 'Viridescent Arrow Feather',
          Flower: 'In Remembrance of Viridescent Fields',
          Sands: "Viridescent Venerer's Determination",
          Circlet: "Viridescent Venerer's Diadem",
          Goblet: "Viridescent Venerer's Vessel",
          Set2: 'Anemo DMG Bonus +15%.',
          Set4: "Increases Swirl DMG by 60%. Decreases opponent's Elemental RES to the element infused in the Swirl by 40% for 10s."
        },
        "Wanderer's Troupe": {
          Plume: "Bard's Arrow Feather",
          Flower: "Troupe's Dawnlight",
          Sands: "Concert's Final Hour",
          Circlet: "Conductor's Top Hat",
          Goblet: "Wanderer's String-Kettle",
          Set2: 'Increases Elemental Mastery by 80.',
          Set4: 'Increases Charged Attack DMG by 35% if the character uses a Catalyst or a Bow.'
        },
        'Thundering Fury': {
          Plume: 'Survivor of Catastrophe',
          Flower: "Thunderbird's Mercy",
          Sands: 'Hourglass of Thunder',
          Circlet: "Thunder Summoner's Crown",
          Goblet: 'Omen of Thunderstorm',
          Set2: 'Electro DMG Bonus +15%.',
          Set4:
            'Increases damage caused by Overloaded, Electro-Charged and Superconduct by 40%. Triggering such effects decreases Elemental Skill CD by 1s. Can only occur once every 0.8s.'
        },
        'Crimson Witch of Flames': {
          Plume: "Witch's Ever-Burning Plume",
          Flower: "Witch's Flower of Blaze",
          Sands: "Witch's End Time",
          Circlet: "Witch's Scorching Hat",
          Goblet: "Witch's Heart Flames",
          Set2: 'Pyro DMG Bonus +15%.',
          Set4:
            'Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using Elemental Skill increases the 2-Piece Set Bonus by 50% of its starting value for 10s. Max 3 stacks.'
        },
        'Noblesse Oblige': {
          Plume: 'Royal Plume',
          Flower: 'Royal Flora',
          Sands: 'Royal Pocket Watch',
          Circlet: 'Royal Masque',
          Goblet: 'Royal Silver Urn',
          Set2: 'Elemental Burst DMG +20%.',
          Set4: "Using an Elemental Burst increases all party members' ATK by 20% for 12s. This effect cannot stack."
        },
        'Bloodstained Chivalry': {
          Plume: 'Bloodstained Black Plume',
          Flower: 'Bloodstained Flower of Iron',
          Sands: 'Bloodstained Final Hour',
          Circlet: 'Bloodstained Iron Mask',
          Goblet: "Bloodstained Chevalier's Goblet",
          Set2: 'Physical DMG +25%.',
          Set4: 'After defeating an opponent, increases Charged Attack DMG by 50%, and reduces its Stamina cost to 0 for 10s.'
        },
        'Archaic Petra': {
          Plume: 'Feather of Jagged Peaks',
          Flower: 'Flower of Creviced Cliff',
          Sands: 'Sundial of Enduring Jade',
          Circlet: 'Mask of Solitude Basalt',
          Goblet: 'Goblet of Chiseled Crag',
          Set2: 'Gain a 15% Geo DMG Bonus.',
          Set4:
            'Upon obtaining an Elemental Shard created through a Crystallize Reaction, all party members gain a 35% DMG Bonus for that particular element for 10s. Only one form of Elemental DMG Bonus can be gained in this manner at any one time.'
        },
        'Retracing Bolide': {
          Plume: "Summer Night's Finale",
          Flower: "Summer Night's Bloom",
          Sands: "Summer Night's Moment",
          Circlet: "Summer Night's Mask",
          Goblet: "Summer Night's Waterballoon",
          Set2: 'Increases Shield Strength by 35%.',
          Set4: 'While protected by a shield, gain an additional 40% Normal and Charged Attack DMG.'
        },
        'Heart of Depth': {
          Plume: 'Gust of Nostalgia',
          Flower: 'Gilded Corsage',
          Sands: 'Copper Compass',
          Circlet: 'Wine-Stained Tricorne',
          Goblet: 'Goblet of Thundering Deep',
          Set2: 'Hydro DMG Bonus +15%.',
          Set4: 'After using Elemental Skill, increases Normal Attack and Charged Attack DMG by 30% for 15s.'
        },
        'Tenacity of the Millelith': {
          Plume: 'Ceremonial War-Plume',
          Flower: 'Flower of Accolades',
          Sands: 'Orichalceous Time-Dial',
          Circlet: "General's Ancient Helm",
          Goblet: "Noble's Pledging Vessel",
          Set2: 'HP increased by 20%.',
          Set4:
            'When an Elemental Skill hits an opponent, the ATK of all nearby party members is increased by 20% and their Shield Strength is increased by 30% for 3s. This effect can be triggered once every 0.5s. This effect can still be triggered even when the character who is using this artifact set is not on the field.'
        },
        'Pale Flame': {
          Plume: "Wise Doctor's Pinion",
          Flower: 'Stainless Bloom',
          Sands: 'Moment of Cessation',
          Circlet: 'Mocking Mask',
          Goblet: 'Surpassing Cup',
          Set2: 'Physical DMG is increased by 25%.',
          Set4:
            'When an Elemental Skill hits an opponent, ATK is increased by 9% for 7s. This effect stacks up to 2 times and can be triggered once every 0.3s. Once 2 stacks are reached, the 2-set effect is increased by 100%.'
        },
        "Shimenawa's Reminiscence": {
          Plume: 'Shaft of Remembrance',
          Flower: 'Entangling Bloom',
          Sands: "Morning Dew's Moment",
          Circlet: 'Capricious Visage',
          Goblet: 'Hopeful Heart',
          Set2: 'ATK +18%.',
          Set4:
            'When casting an Elemental Skill, if the character has 15 or more Energy, they lose 15 Energy and Normal/Charged/Plunging Attack DMG is increased by 50% for 10s. This effect will not trigger again during that duration.'
        },
        'Emblem of Severed Fate': {
          Plume: 'Sundered Feather',
          Flower: 'Magnificent Tsuba',
          Sands: 'Storm Cage',
          Circlet: 'Ornate Kabuto',
          Goblet: 'Scarlet Vessel',
          Set2: 'Energy Recharge +20%.',
          Set4: 'Increases Elemental Burst DMG by 25% of Energy Recharge. A maximum of 75% bonus DMG can be obtained inthis way.'
        },
        'Husk of Opulent Dreams': {
          Plume: 'Plume of Luxury',
          Flower: 'Bloom Times',
          Sands: 'Song of Life',
          Circlet: 'Skeletal Hat',
          Goblet: 'Calabash of Awakening',
          Set2: 'DEF +30%.',
          Set4:
            'A character equipped with this Artifact set will obtain the Curiosity effect in the following conditions: When on the field, the character gains 1 stack after hitting an opponent with a Geo attack, triggering a maximum of once every 0.3s. When off the field, the character gains 1 stack every 3s. Curiosity can stack up to 4 times, each providing 6% DEF and a 6% Geo DMG Bonus. When 6 seconds pass without gaining a Curiosity stack, 1 stack is lost.'
        },
        'Ocean-Hued Clam': {
          Plume: "Deep Palace's Plume",
          Flower: 'Sea-Dyed Blossom',
          Sands: 'Cowry of Parting',
          Circlet: 'Crown of Watatsumi',
          Goblet: 'Pearl Cage',
          Set2: 'Healing Bonus +15%.',
          Set4:
            'When the character equipping this artifact set heals a character in the party, a Sea-Dyed Foam will appear for 3 seconds, accumulating the amount of HP recovered from healing (including overflow healing). At the end of the duration, the Sea-Dyed Foam will explode, dealing DMG to nearby opponents based on 90% of the accumulated healing. (This DMG is calculated similarly to Reactions such as Electro-Charged, and Superconduct, but it is not affected by Elemental Mastery, Character Levels, or Reaction DMG Bonuses). Only one Sea-Dyed Foam can be produced every 3.5 seconds. Each Sea-Dyed Foam can accumulate up to 30,000 HP (including overflow healing). There can be no more than one Sea-Dyed Foam active at any given time. This effect can still be triggered even when the character who is using this artifact set is not on the field.'
        }
      },
      artifactSet_zh: {
        冰风迷途的勇士: {
          死之羽: '摧冰而行的执望',
          生之花: '历经风雪的思念',
          时之沙: '冰雪故园的终期',
          理之冠: '破冰踏雪的回音',
          空之杯: '遍结寒霜的傲骨',
          Set2: '获得15%冰元素伤害加成。',
          Set4: '攻击处于冰元素影响下的敌人时，暴击率提高20%；若敌人处于冻结状态下，则暴击率额外提高20%。'
        },
        平息雷鸣的尊者: {
          死之羽: '平雷之羽',
          生之花: '平雷之心',
          时之沙: '平雷之刻',
          理之冠: '平雷之冠',
          空之杯: '平雷之器',
          Set2: '雷元素抗性提高40%。',
          Set4: '对处于雷元素影响下的敌人造成的伤害提升35%。'
        },
        渡过烈火的贤人: {
          死之羽: '渡火者的解脱',
          生之花: '渡火者的决绝',
          时之沙: '渡火者的煎熬',
          理之冠: '渡火者的智慧',
          空之杯: '渡火者的醒悟',
          Set2: '火元素抗性提高40%。',
          Set4: '对处于火元素影响下的敌人造成的伤害提升35%。'
        },
        被怜爱的少女: {
          死之羽: '少女飘摇的思念',
          生之花: '远方的少女之心',
          时之沙: '少女苦短的良辰',
          理之冠: '少女易逝的芳颜',
          空之杯: '少女片刻的闲暇',
          Set2: '角色造成的治疗效果提升15%。',
          Set4: '施放元素战技或元素爆发后的10秒内，队伍中所有角色受治疗效果加成提高20%。'
        },
        角斗士的终幕礼: {
          死之羽: '角斗士的归宿',
          生之花: '角斗士的留恋',
          时之沙: '角斗士的希冀',
          理之冠: '角斗士的凯旋',
          空之杯: '角斗士的酣醉',
          Set2: '攻击力提高18%。',
          Set4: '装备该圣遗物套装的角色为单手剑、双手剑、长柄武器角色时，角色普通攻击造成的伤害提高35%。'
        },
        翠绿之影: {
          死之羽: '猎人青翠的箭羽',
          生之花: '野花记忆的绿野',
          时之沙: '翠绿猎人的笃定',
          理之冠: '翠绿猎人之冠',
          空之杯: '翠绿猎人的容器',
          Set2: '获得15%风元素伤害加成。',
          Set4: '扩散反应造成的伤害提升60%。根据扩散的元素类型，降低受到影响的敌人40%的对应元素抗性，持续10秒。'
        },
        流浪大地的乐团: {
          死之羽: '琴师的箭羽',
          生之花: '乐团的晨光',
          时之沙: '终幕的时计',
          理之冠: '指挥的礼帽',
          空之杯: '吟游者之壶',
          Set2: '元素精通提高80点。',
          Set4: '装备该圣遗物套装的角色为法器、弓箭角色时，角色重击造成的伤害提高35%。'
        },
        如雷的盛怒: {
          死之羽: '雷灾的孑遗',
          生之花: '雷鸟的怜悯',
          时之沙: '雷霆的时计',
          理之冠: '唤雷的头冠',
          空之杯: '降雷的凶兆',
          Set2: '获得15%雷元素伤害加成。',
          Set4: '超载、感电、超导反应造成的伤害提升40%。触发这些元素反应时，元素战技冷却时间减少1秒。该效果每0.8秒最多触发一次。'
        },
        炽烈的炎之魔女: {
          死之羽: '魔女常燃之羽',
          生之花: '魔女的炎之花',
          时之沙: '魔女破灭之时',
          理之冠: '焦灼的魔女帽',
          空之杯: '魔女的心之火',
          Set2: '获得15%火元素伤害加成。',
          Set4: '超载、燃烧反应造成的伤害提升40%，蒸发、融化反应的加成系数提高15%。施放元素战技后的10秒内，2件套的效果提高50%，该效果最多叠加3次。'
        },
        昔日宗室之仪: {
          死之羽: '宗室之翎',
          生之花: '宗室之花',
          时之沙: '宗室时计',
          理之冠: '宗室面具',
          空之杯: '宗室银瓮',
          Set2: '元素爆发造成的伤害提升20%。',
          Set4: '施放元素爆发后，队伍中所有角色攻击力提升20%，持续12秒。该效果不可叠加。'
        },
        染血的骑士道: {
          死之羽: '染血的黑之羽',
          生之花: '染血的铁之心',
          时之沙: '骑士染血之时',
          理之冠: '染血的铁假面',
          空之杯: '骑士染血之杯',
          Set2: '造成的物理伤害提高25%。',
          Set4: '击败敌人后的10秒内，施放重击时不消耗体力，且重击造成的伤害提升50%。'
        },
        悠古的磐岩: {
          死之羽: '嵯峨群峰之翼',
          生之花: '磐陀裂生之花',
          时之沙: '星罗圭璧之晷',
          理之冠: '不动玄石之相',
          空之杯: '巉岩琢塑之樽',
          Set2: '获得15%岩元素伤害加成。',
          Set4: '获得结晶反应形成的晶片时，队伍中所有角色获得35%对应元素伤害加成，持续10秒。同时只能通过该效果获得一种元素伤害加成。'
        },
        逆飞的流星: {
          死之羽: '夏祭终末',
          生之花: '夏祭之花',
          时之沙: '夏祭之刻',
          理之冠: '夏祭之面',
          空之杯: '夏祭水玉',
          Set2: '护盾强效提高35%。',
          Set4: '处于护盾庇护下时，额外获得40%普通攻击和重击伤害加成。'
        },
        沉沦之心: {
          死之羽: '饰金胸花',
          生之花: '追忆之风',
          时之沙: '坚铜罗盘',
          理之冠: '酒渍船帽',
          空之杯: '沉波之盏',
          Set2: '获得15%水元素伤害加成。',
          Set4: '施放元素战技后的15秒内，普通攻击与重击造成的伤害提高30%。'
        },
        千岩牢固: {
          死之羽: '昭武翎羽',
          生之花: '勋绩之花',
          时之沙: '金铜时晷',
          理之冠: '将帅兜鍪',
          空之杯: '盟誓金爵',
          Set2: '生命值提升20%。',
          Set4:
            '元素战技命中敌人后，使队伍中附近的所有角色攻击力提升20%，护盾强效提升30%，持续3秒。该效果每0.5秒至多触发一次。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。'
        },
        苍白之火: {
          死之羽: '贤医之羽',
          生之花: '无垢之花',
          时之沙: '停摆之刻',
          理之冠: '嗤笑之面',
          空之杯: '超越之盏',
          Set2: '造成的物理伤害提高25%。',
          Set4: '元素战技命中敌人后，攻击力提升9%。该效果持续7秒，至多叠加2层，每0.3秒至多触发一次。叠满2层时，2件套的效果提升100%。'
        },
        追忆之注连: {
          死之羽: '思忆之矢',
          生之花: '羁缠之花',
          时之沙: '朝露之时',
          理之冠: '无常之面',
          空之杯: '祈望之心',
          Set2: '攻击力提高18%。',
          Set4:
            '施放元素战技时，如果角色的元素能量高于或等于15点，则会流失15点元素能量，使接下来的10秒内，普通攻击、重击、下落攻击造成的伤害提高50%，持续期间内该效果不会再次触发。'
        },
        绝缘之旗印: {
          死之羽: '切落之羽',
          生之花: '明威之镡',
          时之沙: '雷云之笼',
          理之冠: '华饰之兜',
          空之杯: '绯花之壶',
          Set2: '元素充能效率提高20%。',
          Set4: '基于元素充能效率的25%，提高元素爆发造成的伤害。至多通过这种方式获得75%提升。'
        },
        华馆梦醒形骸记: {
          死之羽: '华馆之羽',
          生之花: '荣花之期',
          时之沙: '众生之谣',
          理之冠: '形骸之笠',
          空之杯: '梦醒之瓢',
          Set2: '防御力提高30%。',
          Set4:
            '装备此圣遗物套装的角色在以下情况下，将获得「问答」效果：在场上用岩元素攻击命中敌人后获得一层，每0.3秒至多触发一次；在队伍后台中，每3秒获得一层。问答至多叠加4层，每层能提供6%防御力与6%岩元素伤害加成。每6秒，若未获得问答效果，将损失一层。'
        },
        海染砗磲: {
          死之羽: '渊宫之羽',
          生之花: '明威之镡',
          时之沙: '离别之贝',
          理之冠: '海祇之冠',
          空之杯: '真珠之笼',
          Set2: '治疗加成提高15%。',
          Set4:
            '4件套:装备此圣遗物套装的角色对队伍中的角色进行治疗时，将产生持续3秒的海染泡沫，记录治疗的生命值回复量（包括溢出值）。持续时间结束时，海染泡沫将会爆炸，对周围的敌人造成90%累计回复量的伤害（该伤害结算方式同感电、超导等元素反应，但不受元素精通、等级或反应伤害加成效果影响）。每3.5秒至多产生一个海染泡沫；海染泡沫至多记录30000点回复量，含溢出部分的治疗量；自己的队伍中同时至多存在一个海染泡沫。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。'
        }
      },
      // 圣遗物套装效果
      setBonus: {
        'Bizzard Strayer': { 2: { Cryo: 15 }, 4: null },
        'Thundersoother': { 2: { Cryo: 40 }, 4: null },
        'Lavawalker': { 2: { PyroRES: 40 }, 4: null },
        'Maiden Beloved': { 2: { Healing: 15 }, 4: null },
        "Gladiator's Finale": { 2: { ATKPer: 18 }, 4: null },
        'Viridescent Venerer': { 2: { Anemo: 15 }, 4: null },
        "Wanderer's Troupe": { 2: { elementMastery: 80 }, 4: null },
        'Thundering Fury': { 2: { Electro: 15 }, 4: null },
        'Crimson Witch of Flames': { 2: { Pyro: 15 }, 4: null },
        'Noblesse Oblige': { 2: null, 4: null },
        'Bloodstained Chivalry': { 2: { Physical: 25 }, 4: null },
        'Archaic Petra': { 2: { Geo: 15 }, 4: null },
        'Retracing Bolide': { 2: { Shield: 35 }, 4: null },
        'Heart of Depth': { 2: { Hydro: 15 }, 4: null },
        'Tenacity of the Millelith': { 2: { HPPer: 20 }, 4: null },
        'Pale Flame': { 2: { Physical: 25 }, 4: null },
        "Shimenawa's Reminiscence": { 2: { ATKPer: 18 }, 4: null },
        'Emblem of Severed Fate': { 2: { energyRecharge: 20 }, 4: null },
        'Husk of Opulent Dreams': { 2: { DEFPer: 30 }, 4: null },
        'Ocean-Hued Clam': { 2: { Healing: 15 }, 4: null }
      },
      // 每级升级经验
      exp: [3000, 3725, 4425, 5150, 5900, 6675, 7500, 8350, 9225, 10125, 11050, 12025, 13025, 15150, 17600, 20375, 23500, 27050, 31050, 35575],
      // 人物
      character: [
        {
          name: 'Albedo',
          name_zh: '阿贝多',
          rarity: 5,
          element: ['Geo'],
          weapon: 'sword',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Aloy',
          name_zh: '埃洛伊',
          rarity: 5,
          element: ['Cryo'],
          weapon: 'bow',
          sex: 'female',
          nation: 'other'
        },
        {
          name: 'Diluc',
          name_zh: '迪卢克',
          rarity: 5,
          element: ['Pyro'],
          weapon: 'claymore',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Eula',
          name_zh: '优菈',
          rarity: 5,
          element: ['Cryo'],
          weapon: 'claymore',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Ganyu',
          name_zh: '甘雨',
          rarity: 5,
          element: ['Cryo'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Hu Tao',
          name_zh: '胡桃',
          rarity: 5,
          element: ['Pyro'],
          weapon: 'polearm',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Jean',
          name_zh: '琴',
          rarity: 5,
          element: ['Anemo'],
          weapon: 'sword',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Kaedehara Kazuha',
          name_zh: '枫原万叶',
          rarity: 5,
          element: ['Anemo'],
          weapon: 'sword',
          sex: 'male',
          nation: 'Inazuma'
        },
        {
          name: 'Kamisato Ayaka',
          name_zh: '神里绫华',
          rarity: 5,
          element: ['Cryo'],
          weapon: 'sword',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Keqing',
          name_zh: '刻晴',
          rarity: 5,
          element: ['Electro'],
          weapon: 'sword',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Klee',
          name_zh: '可莉',
          rarity: 5,
          element: ['Pyro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Mona',
          name_zh: '莫娜',
          rarity: 5,
          element: ['Hydro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Qiqi',
          name_zh: '七七',
          rarity: 5,
          element: ['Cryo'],
          weapon: 'sword',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Raiden Shogun',
          name_zh: '雷电将军',
          rarity: 5,
          element: ['Electro'],
          weapon: 'polearm',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Sangonomiya Kokomi',
          name_zh: '珊瑚宫心海',
          rarity: 5,
          element: ['Hydro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Tartaglia',
          name_zh: '达达利亚',
          rarity: 5,
          element: ['Hydro'],
          weapon: 'bow',
          sex: 'male',
          nation: 'Snezhnaya'
        },
        {
          name: 'Aether',
          name_zh: '空',
          rarity: 5,
          element: ['Dendro'],
          weapon: 'bow',
          sex: 'male',
          nation: 'other'
        },
        {
          name: 'Lumine',
          name_zh: '荧',
          rarity: 5,
          element: ['Dendro'],
          weapon: 'bow',
          sex: 'female',
          nation: 'other'
        },
        {
          name: 'Venti',
          name_zh: '温迪',
          rarity: 5,
          element: ['Anemo'],
          weapon: 'bow',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Xiao',
          name_zh: '魈',
          rarity: 5,
          element: ['Anemo'],
          weapon: 'polearm',
          sex: 'male',
          nation: 'Liyue'
        },
        {
          name: 'Yoimiya',
          name_zh: '宵宫',
          rarity: 5,
          element: ['Pyro'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Zhongli',
          name_zh: '钟离',
          rarity: 5,
          element: ['Geo'],
          weapon: 'polearm',
          sex: 'male',
          nation: 'Liyue'
        },
        {
          name: 'Amber',
          name_zh: '安柏',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Barbara',
          name_zh: '芭芭拉',
          rarity: 4,
          element: ['Hydro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Beidou',
          name_zh: '北斗',
          rarity: 4,
          element: ['Electro'],
          weapon: 'claymore',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Bennett',
          name_zh: '班尼特',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'sword',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Chongyun',
          name_zh: '重云',
          rarity: 4,
          element: ['Cryo'],
          weapon: 'claymore',
          sex: 'male',
          nation: 'Liyue'
        },
        {
          name: 'Diona',
          name_zh: '迪奥娜',
          rarity: 4,
          element: ['Cryo'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Fischl',
          name_zh: '菲谢尔',
          rarity: 4,
          element: ['Electro'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Kaeya',
          name_zh: '凯亚',
          rarity: 4,
          element: ['Cryo'],
          weapon: 'sword',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Kujou Sara',
          name_zh: '九条裟罗',
          rarity: 4,
          element: ['Electro'],
          weapon: 'bow',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Lisa',
          name_zh: '丽莎',
          rarity: 4,
          element: ['Electro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Ningguang',
          name_zh: '凝光',
          rarity: 4,
          element: ['Geo'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Noelle',
          name_zh: '诺艾尔',
          rarity: 4,
          element: ['Geo'],
          weapon: 'claymore',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Razor',
          name_zh: '雷泽',
          rarity: 4,
          element: ['Electro'],
          weapon: 'claymore',
          sex: 'male',
          nation: 'Mondstadt'
        },
        {
          name: 'Rosaria',
          name_zh: '罗莎莉亚',
          rarity: 4,
          element: ['Cryo'],
          weapon: 'polearm',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Sayu',
          name_zh: '早柚',
          rarity: 4,
          element: ['Anemo'],
          weapon: 'claymore',
          sex: 'female',
          nation: 'Inazuma'
        },
        {
          name: 'Sucrose',
          name_zh: '砂糖',
          rarity: 4,
          element: ['Anemo'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Mondstadt'
        },
        {
          name: 'Thoma',
          name_zh: '托马',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'polearm',
          sex: 'male',
          nation: 'Inazuma'
        },
        {
          name: 'Xiangling',
          name_zh: '香菱',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'polearm',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Xingqiu',
          name_zh: '行秋',
          rarity: 4,
          element: ['Hydro'],
          weapon: 'sword',
          sex: 'male',
          nation: 'Liyue'
        },
        {
          name: 'Xinyan',
          name_zh: '辛焱',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'claymore',
          sex: 'female',
          nation: 'Liyue'
        },
        {
          name: 'Yanfei',
          name_zh: '烟绯',
          rarity: 4,
          element: ['Pyro'],
          weapon: 'catalyst',
          sex: 'female',
          nation: 'Liyue'
        }
      ],
      // 武器类型
      weaponType: ['sword', 'bow', 'catalyst', 'claymore', 'polearm'],
      // 元素类型
      elementType: ['Pyro', 'Hydro', 'Dendro', 'Electro', 'Anemo', 'Cryo', 'Geo'],
      // 地区
      nation: ['other', 'Mondstadt', 'Liyue', 'Inazuma', 'Snezhnaya'],
      // 其他属性
      otherStats: [
        'HydroRES',
        'PyroRES',
        'ElectroRES',
        'GeoRES',
        'AnemoRES',
        'CryoRES',
        'DendroRES',
        'PhysicalRES',
        'incomingHealing',
        'CD',
        'Shield',
        'stamina'
      ]
    };
    // 设置只读
    const nope = () => {
      throw new Error('Error!This data is read only!');
    };
    const read_only = (obj: ArtifactNameSpace.ArtifactsDataType) =>
      new Proxy(obj, {
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
    return this.AUTHOR;
  }
}
