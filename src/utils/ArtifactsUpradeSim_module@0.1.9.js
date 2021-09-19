/**
 * ArtifactsUpgradeSim v0.1.9
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
            // 词缀条目
            entryList: ["critRate", "critDMG", "ATK", "ATKPer", "def", "defPer", "HP", "HPPer", "energyRecharge", "elementMastery"],
            entryListCh: ["暴击率", "暴击伤害", "攻击力", "攻击力", "防御力", "防御力", "生命值", "生命值", "元素充能效率", "元素精通"],
            entryProbability: [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
            entryValue: {
                critRate: [2.7222, 3.1111, 3.5, 3.8889],
                critDMG: [5.4402, 6.2174, 7, 7.7718],
                ATK: [13.6111, 15.5556, 17.5, 19.4444],
                ATKPer: [4.0833, 4.6667, 5.25, 5.8333],
                def: [16.3333, 18.5, 21, 23.3333],
                defPer: [5.1031, 5.8321, 6.5611, 7.2901],
                HP: [209.125, 239, 268.875, 298.75],
                HPPer: [4.0833, 4.6667, 5.25, 5.8333],
                energyRecharge: [4.5325, 5.18, 5.8275, 6.475],
                elementMastery: [16.3333, 18.5, 21, 23.3333]
            },
            extraEnrtyRate: 0.3,
            // 部件列表
            parts: ["feather", "flower", "hourglass", "hat", "cup"],
            partsCh: ["死之羽", "生之花", "时之沙", "理之冠", "空之杯"],
            // 部件主词条列表
            feather: ["ATK"],
            flower: ["HP"],
            hourglass: ["ATKPer", "defPer", "HPPer", "elementMastery", "energyRecharge"],
            hat: ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "HPRes"],
            cup: ["ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
            mainEntryList: ["ATK", "HP", "critRate", "energyRecharge", "HPRes", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
            mainEntryListCh: ["攻击力", "生命值", "暴击率", "元素充能效率", "治疗加成", "暴击伤害", "攻击力", "防御力", "生命值", "元素精通", "水元素伤害加成", "火元素伤害加成", "雷元素伤害加成", "岩元素伤害加成", "风元素伤害加成", "冰元素伤害加成", "物理伤害加成"],
            // 部件主词条概率
            hourglassRate: [0.26, 0.26, 0.26, 0.1, 0.1],
            hatRate: [0.1, 0.1, 0.22, 0.22, 0.22, 0.04, 0.1],
            cupRate: [0.21, 0.21, 0.21, 0.025, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
            // 圣遗物主词条属性
            mainEntryValueList: {
                ATK: [47, 100, 152, 205, 258, 311],
                HP: [717, 1530, 2342, 3156, 3967, 4780],
                critRate: [4.7, 9.9, 15.2, 20.5, 25.8, 31.1],
                energyRecharge: [7.8, 16.5, 25.4, 34.2, 43, 51.8],
                HPRes: [5.4, 11.5, 17.6, 23.7, 29.8, 35.9],
                critDMG: [9.3, 19.9, 30.5, 41, 51.6, 62.2],
                ATKPer: mainVal_1,
                defPer: mainVal_2,
                HPPer: mainVal_1,
                elementMastery: [28, 60, 91, 123, 155, 187],
                water: mainVal_1,
                fire: mainVal_1,
                thunder: mainVal_1,
                rock: mainVal_1,
                wind: mainVal_1,
                ice: mainVal_1,
                Physical: mainVal_2
            },
            // 圣遗物评分选项
            scoreList: ["atk", "crit", "def", "hp", "er", "em"],
            scoreListCh: ["攻击得分", "双暴得分", "防御得分", "生命得分", "充能得分", "精通得分"],
            scoreStandar: {
                critRate: 2,
                critDMG: 1,
                ATK: 0.13,
                ATKPer: 1.345,
                def: 0.11,
                defPer: 1.07,
                HP: 0.0087,
                HPPer: 1.345,
                energyRecharge: 1.2,
                elementMastery: 0.339
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
class ArtifactsFunction_class {
    constructor() {
        this.__version__ = "0.1.9";
        this.__AUSList__ = [];
        this.__deleteHistory__ = [];
        this.__suitList__ = [];
        this.__maxResults__ = 1000;
        this.__localStorageKey__ = "AUSLocalList";
        this.__countList__ = {};
    }

    /**
     * 生成初始数据
     * @param {string} __part 指定位置，可为空
     * @param {string} __main 指定主词条，可为空
     * @param {array} __entryArr 指定词条（至多四条），可为空
     * @param {array} __entryRate 副词条数值（对应自选副词条），可为空
     * @returns {Object} 对象newArtifacts
     */
    creatArtifact(__part = "", __main = "", __entry = [], __entryRate = []) {
        if (this.__AUSList__.length >= this.__maxResults__) {
            console.log(`Warning - The maximum length of the artifacts list is ${this.__maxResults__}.`);
            return false;
        }
        let newArtifacts = {
                symbol: "",
                level: 0,
                part: "none",
                mainEntry: "none",
                mainEntryValue: 0,
                entry: [],
                initEntry: '',
                upgradeHistory: [],
                creationDate: Date.now(),
                lock: false
            },
            ArtifactEntry = [],
            ArtifactEntryRate = [];
        // 自选或随机位置
        if (typeof (__part) === "string" && artiConst.val.parts.indexOf(__part) !== -1) {
            newArtifacts.part = __part;
        } else {
            newArtifacts.part = artiConst.val.parts[Math.floor((Math.random() * artiConst.val.parts.length))];
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
        this.__AUSList__.push(newArtifacts);
        // console.log(newArtifacts);
        this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
        this.changeCount([newArtifacts.part, newArtifacts.mainEntry]);
        return newArtifacts;
    }

    /**
     * 升级强化
     * @param {number} __index 序号
     * @param {string} __entry 指定强化的词条（默认空值）
     * @param {number} __upLevel 强化数值的级别(0-3，3最高)
     * @returns 升级结果
     */
    upgrade(__index, __entry = "", __upLevel = -1) {
        if (__index >= this.__AUSList__.length || __index < 0) return false;
        let currentArtifact = this.__AUSList__[__index],
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
            if (__entry !== "" && artiConst.val.entryList.indexOf(__entry) >= 0) {
                for (let i = 0; i < currentArtifact.entry.length; i++) {
                    if (__entry === currentArtifact.entry[i][0]) {
                        upIndex = i;
                        upEntry = currentArtifact.entry[i][0];
                    }
                }
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
        // 增加主属性
        currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][currentArtifact.level / 4];
        this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
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
        if (__index >= this.__AUSList__.length || __index < 0) {
            return 0;
        }
        let atkScore = 0,
            critScore = 0,
            defScore = 0,
            HPScore = 0,
            rechargeScore = 0,
            EMScore = 0,
            totalScore = 0,
            entryArr = this.__AUSList__[__index].entry;
        for (let i = 0; i < entryArr.length; i++) {
            let entryNow = entryArr[i][0],
                addScore = entryArr[i][1] * artiConst.val.scoreStandar[entryNow];
            if (entryNow === "ATK" || entryNow === "ATKPer") {
                atkScore += addScore;
            } else if (entryNow === "critRate" || entryNow === "critDMG") {
                critScore += addScore;
            } else if (entryNow === "def" || entryNow === "defPer") {
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
        let currentArtifact = this.__AUSList__[__index];
        if (currentArtifact.lock) {
            return false;
        } else {
            currentArtifact.entry.length = 0;
            currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
            currentArtifact.upgradeHistory.length = 0;
            currentArtifact.level = 0;
            currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][0];
            this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
            return true;
        }
    }

    /**
     * 重置全部圣遗物状态
     */
    resetAll() {
        for (let i = 0; i < this.__AUSList__.length; i++) {
            this.reset(i);
        }
        this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
    }

    /**
     * 删除指定数据
     * @param {number} index 要删除的遗物序号
     * @returns 操作结果
     */
    deleteOne(index) {
        let artifact = this.__AUSList__[index];
        if (artifact.lock === true) {
            // console.log("%cDelete fail.This Artifact is locked.", "color:rgb(144,82,41)");
            return false;
        } else {
            this.changeCount([artifact.part, artifact.mainEntry], -1);
            this.__deleteHistory__.push(this.__AUSList__.splice(index, 1)[0]);
            this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
            return true;
        }
    }

    /**
     * 清空数据
     */
    clearAll() {
        let index = 0;
        while (index !== this.__AUSList__.length) {
            let artifact = this.__AUSList__[index];
            if (artifact.lock === false) {
                this.__AUSList__.splice(index, 1);
            } else {
                index++;
            }
        }
        this.enforceUpdateCount();
        this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
    }

    /**
     * 撤销删除（对deleteOne删除的数据生效）
     * @returns 结果
     */
    undoDel() {
        if (this.__deleteHistory__.length === 0) {
            console.log("Undo false, history not found.");
            return false;
        }
        let artifact = this.__deleteHistory__.pop();
        this.__AUSList__.push(artifact);
        this.changeCount([artifact.part, artifact.mainEntry]);
        this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
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
        let countList = this.__countList__;
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
        this.__countList__ = {}
        this.__AUSList__.forEach(val => {
            this.changeCount([val.part, val.mainEntry]);
        })
    }

    /**
     * 圣遗物上锁/解锁
     * @param {number} index 圣遗物下标
     * @param {string} method 操作（上锁lock/解锁unlock）
     * @returns 操作结果
     */
    lock(index, method = "lock") {
        if (typeof (index) !== 'number' && method !== "lock" && method !== "unlock") return;
        if (method === "lock") {
            this.__AUSList__.lock = true;
        } else {
            this.__AUSList__.lock = false;
        }
        return true;
    }

    /**
     * 查找countList
     * @param {string} key 键
     * @returns 键值
     */
    getCount(key) {
        if (typeof (key) !== "string") return false;
        let countList = this.__countList__;
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
        let list = this.__AUSList__;
        try {
            list.sort((val_a, val_b) => {
                if (rule === "lvasc" || rule === "lvdesc") {
                    // 排序优先级：先按照等级升/降序，再按照位置升序，最后按主属性升序
                    if ((val_a.level > val_b.level && rule === "lvasc") || (val_a.level < val_b.level && rule === "lvdesc")) {
                        return 1;
                    } else if ((val_a.level < val_b.level && rule === "lvasc") || (val_a.level > val_b.level && rule === "lvdesc")) {
                        return -1
                    } else if (val_a.level === val_b.level) {
                        let part_a = artiConst.val.parts.indexOf(val_a.part),
                            part_b = artiConst.val.parts.indexOf(val_b.part);
                        if (part_a > part_b) {
                            return 1;
                        } else if (part_a < part_b) {
                            return -1;
                        } else if (part_a === part_b) {
                            let main_a = artiConst.val.mainEntryList.indexOf(val_a.mainEntry),
                                main_b = artiConst.val.mainEntryList.indexOf(val_b.mainEntry);
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
                if (rule === "part" || rule === "mainEntry") {
                    // 排序优先级：先按照part/mainEntry升序，再按照等级降序排列
                    let name_a = artiConst.val.mainEntryList.indexOf(val_a[rule]),
                        name_b = artiConst.val.mainEntryList.indexOf(val_b[rule]);
                    if (rule === "part") {
                        rule = "mainEntry";
                    } else {
                        rule = "part";
                    }
                    let name_a2 = artiConst.val.mainEntryList.indexOf(val_a[rule]),
                        name_b2 = artiConst.val.mainEntryList.indexOf(val_a[rule]);
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
                            } else {
                                return 0;
                            }
                        }
                    }
                    return 0;
                }
            })
            this.setLocalStorage(this.__localStorageKey__, list);
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
    searchSymbol(symbol) {
        for (let i = 0; i < this.__AUSList__.length; i++) {
            const item = this.__AUSList__[i];
            if (item.symbol === symbol) {
                return i;
            }
        }
        return -1;
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
                return artiConst.val.entryListCh[artiConst.val.entryList.indexOf(word)];
            }
            return false;
        } else if (type === "parts") {
            if (artiConst.val.parts.indexOf(word) !== -1) {
                return artiConst.val.partsCh[artiConst.val.parts.indexOf(word)];
            }
            return false;
        } else if (type === "mainEntry") {
            if (artiConst.val.mainEntryList.indexOf(word) !== -1) {
                return artiConst.val.mainEntryListCh[artiConst.val.mainEntryList.indexOf(word)];
            }
            return false;
        } else if (type === "score") {
            if (artiConst.val.scoreList.indexOf(word) !== -1) {
                return artiConst.val.scoreListCh[artiConst.val.scoreList.indexOf(word)];
            }
            return false;
        }
        return false;
    }

    /**
     * 词条数值处理（展示用）
     * @param {string} entry 词条名称
     * @param {string | number} entryValue 词条数值
     * @param {string} type 词条类型
     * @returns 处理后的词条数值
     */
    entryValFormat(entry, entryValue, type = "default") {
        const percentEntry = ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "energyRecharge"],
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
     * 随机主词条
     * @param {string} __part 位置
     */
    randomMainEntry(__part) {
        if (typeof (__part) !== "string") throw new Error("Function randomMainEntry Error!Wrong parameter(Not string).");
        switch (__part) {
            case "feather":
                return "ATK";
            case "flower":
                return "HP";
            case "hourglass":
                return this.randomRate(artiConst.val.hourglass, artiConst.val.hourglassRate);
            case "hat":
                return this.randomRate(artiConst.val.hat, artiConst.val.hatRate);
            case "cup":
                return this.randomRate(artiConst.val.cup, artiConst.val.cupRate);
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
                if (entry[0] === "critRate" || entry[0] === "critDMG") {
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

    // 获取版本号
    get version() {
        return this.__version__;
    }

    get LSkey() {
        return this.__localStorageKey__;
    }

    get AUSList() {
        return this.__AUSList__;
    }

    set AUSList(val) {
        if (Array.isArray(val)) {
            if (val.length > this.__maxResults__) {
                val.length = this.__maxResults__;
                console.log(`Warning - The maximum length of the artifacts list is ${this.__maxResults__}.`);
            }
            this.__AUSList__.length = 0;
            this.__AUSList__ = val;
            this.setLocalStorage(this.__localStorageKey__, this.__AUSList__);
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
 * @returns 检查结果
 */
function initSim() {
    // 加载本地数据
    let storage = window.localStorage;
    let localList = storage[ArtifactsSim.LSkey];
    if (!storage) {
        throw new Error("The browser does not support LocalStorage.");
    } else {
        if (storage.ArtifactsSimVersion === undefined) {
            storage.ArtifactsSimVersion = ArtifactsSim.version;
        } else if (storage.ArtifactsSimVersion !== ArtifactsSim.version) {
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
                if (!Object.prototype.hasOwnProperty.call(val, "lock")) {
                    val.lock = false;
                }
            })
        } catch (error) {
            console.log("%cCannot set count.", "color:rgb(144,82,41)");
        }
    }
}
initSim();

export {
    ArtifactsSim,
    artiConst
}