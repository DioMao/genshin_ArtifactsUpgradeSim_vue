/**
 * ArtifactsUpgradeSim v0.2.1 module
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/main/LICENSE)
 */
"use strict";
import {
    ArtifactData
} from "./ArtifactsData"

/**
 * ES6 version
 */
// 定义私有属性
const VERSION = Symbol("VERSION"),
    AUS_LIST = Symbol("AUS_LIST"),
    DELETE_HISTORY = Symbol("DELETE_HISTORY"),
    SUIT_LIST = Symbol("SUIT_LIST"),
    LIST_LIMIT = Symbol("LIST_LIMIT"),
    SUIT_LIST_LIMIT = Symbol("SUIT_LIST_LIMIT"),
    LOCAL_STORAGE_KEY = Symbol("LOCAL_STORAGE_KEY"),
    SUIT_LOCAL_STORAGE_KEY = Symbol("SUIT_LOCAL_STORAGE_KEY"),
    COUNT_LIST = Symbol("COUNT_LIST"),
    LANGUAGE = Symbol("LANGUAGE");

class ArtifactsFunction_class {
    #AUTHOR = "DioMao"
    constructor() {
        this[VERSION] = "0.2.1";
        this[AUS_LIST] = [];
        this[DELETE_HISTORY] = [];
        this[SUIT_LIST] = [];
        this[LIST_LIMIT] = 2000;
        this[SUIT_LIST_LIMIT] = 100;
        this[LOCAL_STORAGE_KEY] = "AUSLocalList";
        this[SUIT_LOCAL_STORAGE_KEY] = "AUS_SUITS";
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
     * @param {boolean} __setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns {Object} 对象newArtifacts
     */
    createArtifact(__part = "", __main = "", __entry = [], __entryRate = [], __suit = "", __setStorage = true) {
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
            isNew: true,
            equipped: 0
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
        newArtifacts.symbol = Date.now().toString(36) + "-" + Math.random().toString(36).substring(2) + "-" + Math.random().toString(36).substring(2, 8);
        // 保存初始状态
        newArtifacts.initEntry = JSON.stringify(newArtifacts.entry);
        // 保存结果
        this[AUS_LIST].push(newArtifacts);
        // console.log(newArtifacts);
        if (__setStorage) this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
        this.changeCount([newArtifacts.part, newArtifacts.mainEntry, newArtifacts.suit]);
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
            this.createArtifact(__part, __main, __entry, __entryRate, __suit, false);
            count--;
        }
        // 批量操作完成后再统一存储到localStorage
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
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
     * @param {boolean} __setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns 返回操作结果
     */
    reset(__index, __setStorage = true) {
        let currentArtifact = this[AUS_LIST][__index];
        if (currentArtifact.lock) {
            return false;
        } else {
            currentArtifact.entry.length = 0;
            currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
            currentArtifact.upgradeHistory.length = 0;
            currentArtifact.level = 0;
            currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][0];
            if (__setStorage) this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
            return true;
        }
    }

    /**
     * 重置全部圣遗物状态
     */
    resetAll() {
        for (let i = 0; i < this[AUS_LIST].length; i++) {
            this.reset(i, false);
        }
        this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
    }

    /**
     * 删除指定数据
     * @param {number} index 要删除的遗物序号
     * @param {boolean} __setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns 操作结果
     */
    deleteOne(index, __setStorage = true) {
        let artifact = this[AUS_LIST][index];
        // 被锁定或被装备的圣遗物不能删除
        if (artifact.lock === true || artifact.equipped > 0) {
            return false;
        } else {
            this.changeCount([artifact.part, artifact.mainEntry, artifact.suit], -1);
            this[DELETE_HISTORY].push(this[AUS_LIST].splice(index, 1)[0]);
            if (__setStorage) this.setLocalStorage(this[LOCAL_STORAGE_KEY], this[AUS_LIST]);
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
        this.changeCount([artifact.part, artifact.mainEntry, artifact.suit]);
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
            this.changeCount([val.part, val.mainEntry, val.suit]);
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
        if (typeof (rule) !== "string" || this[AUS_LIST].length === 0) return false;
        if (rule === "main") rule = "mainEntry";
        let list = this[AUS_LIST];
        // 这里使用try-catch是为了版本兼容性，避免对以前的版本数据进行排序时出现错误
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

    /** 套装函数 **/

    /**
     * 创建新的套装
     * @param {string} name 套装名
     * @param {boolean} setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns 操作结果
     */
    createSuit(name, setStorage = true) {
        if (this[SUIT_LIST].length >= this[SUIT_LIST_LIMIT]) return false;
        // 数据验证
        if (typeof (name) === "string") {
            // 长度限制
            name = name.slice(0, 20);
        } else {
            name = "unnamed";
        }
        const newSuit = {
            name: "",
            Plume: "",
            Flower: "",
            Sands: "",
            Circlet: "",
            Goblet: ""
        }
        newSuit.name = name;
        this[SUIT_LIST].push(newSuit);
        if (setStorage) this.setLocalStorage(this[SUIT_LOCAL_STORAGE_KEY], this[SUIT_LIST]);
        return true;
    }

    /**
     * 更新套装名称
     * @param {number} index 需要改名的套装下标
     * @param {string} name 新的名称
     * @returns 
     */
    renameSuit(index, name) {
        if (typeof (index) !== "number" || index >= this[SUIT_LIST].length) return false;
        index = Math.floor(index);
        if (typeof (name) === "string") {
            // 长度限制
            name = name.slice(0, 20);
        } else {
            name = "unnamed";
        }
        this[SUIT_LIST][index].name = name;
        this.setLocalStorage(this[SUIT_LOCAL_STORAGE_KEY], this[SUIT_LIST]);
        return true;
    }

    /**
     * 更新套装
     * @param {number} index 需要更新的套装下标
     * @param {array} symbolArr 包含更新的部件symbol值的数组
     * @param {boolean} setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns 操作结果
     */
    updateSuit(index, symbolArr, setStorage = true) {
        if (typeof (index) !== "number" || index >= this[SUIT_LIST].length || !Array.isArray(symbolArr)) return false;
        index = Math.floor(index);
        // 长度限制
        symbolArr = symbolArr.slice(0, 5);
        let suit = this[SUIT_LIST][index];
        for (let symbol of symbolArr) {
            let artifactIndex = this.getIndex(symbol);
            if (artifactIndex !== -1) {
                let artifact = this[AUS_LIST][artifactIndex];
                // 如果当前位置为空或已有相同圣遗物，则进入下一个循环
                if (suit[artifact.part] === symbol || suit[artifact.part] === "") continue;
                // 若存在之前的装备，则将其装备状态移除
                try {
                    this[AUS_LIST][this.getIndex(suit[artifact.part])].equipped--;
                } catch (error) {
                    artifact.equipped++;
                }
                // 将当前圣遗物标记为装备状态，并更新suit内保存的symbol
                artifact.equipped++;
                suit[artifact.part] = artifact.symbol;
            }
        }
        if (setStorage) this.setLocalStorage(this[SUIT_LOCAL_STORAGE_KEY], this[SUIT_LIST]);
        return true;
    }

    /**
     * 删除指定套装
     * @param {number} index 要删除的套装下标
     * @param {boolean} setStorage 是否保存到localStorage（避免批量操作时频繁写入）
     * @returns 操作结果
     */
    deleteSuit(index, setStorage = true) {
        if (typeof (index) !== "number" || index >= this[SUIT_LIST].length) return false;
        index = Math.floor(index);
        // 移除套装里所有装备的装备状态
        let suit = this[SUIT_LIST][index];
        for (let key in suit) {
            if (key === "name") continue;
            if (suit[key] !== "") {
                try {
                    this[AUS_LIST][this.getIndex(suit[key])].equipped--;
                } catch (error) {
                    continue;
                }
            }
        }
        this[SUIT_LIST].splice(index, 1);
        if (setStorage) this.setLocalStorage(this[SUIT_LOCAL_STORAGE_KEY], this[SUIT_LIST]);
        return true;
    }

    /**
     * 移除套装指定位置的圣遗物
     * @param {number} index 要操作的套装下标
     * @param {string | array} part 要移除的部位
     * @returns 操作结果
     */
    removeSuitItem(index, part) {
        if (typeof (index) !== "number" || index >= this[SUIT_LIST].length) return false;
        index = Math.floor(index);
        // 
        if (typeof (part) === "string") part = [part];
        if (!Array.isArray(part)) return false;
        let suit = this[SUIT_LIST][index];
        // 遍历part进行匹配删除
        part.forEach(val => {
            if (artiConst.val.parts.indexOf(val) === -1) return;
            try {
                this[AUS_LIST][this.getIndex(suit[val])].equipped--;
            } catch (error) {
                suit[val] = "";
            }
            suit[val] = "";
        })
        return true;
    }

    /**
     * 计算套装属性
     * @param {number} index 需要计算属性的套装下标
     * @returns 套装属性
     */
    suitState(index) {
        if (typeof (index) !== "number" || index >= this[SUIT_LIST].length) return false;
        index = Math.floor(index);
        let suit = this[SUIT_LIST][index],
            state = {};
        // 遍历套装里每个部位的属性，并计算属性
        for (let key in suit) {
            if (suit[key] === "name") continue;
            if (suit[key] !== "") {
                try {
                    // 定位到当前圣遗物
                    let artifact = this[AUS_LIST][this.getIndex(suit[key])];
                    // 主属性
                    if (state[artifact.mainEntry] === undefined) {
                        state[artifact.mainEntry] = artifact.mainEntryValue;
                    } else {
                        state[artifact.mainEntry] += artifact.mainEntryValue;
                    }
                    // 副词条
                    artifact.entry.forEach(val => {
                        if (state[val[0]] === undefined) {
                            state[val[0]] = val[1];
                        } else {
                            state[val[0]] += val[1];
                        }
                    })
                } catch (error) {
                    // 若错误则将当前位置symbol移除
                    suit[key] = "";
                }
            }
        }
        return state;
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

    get author() {
        return this.#AUTHOR;
    }

    get language() {
        return this[LANGUAGE];
    }

    get LSkey() {
        return this[LOCAL_STORAGE_KEY];
    }

    get LSkey_suit() {
        return this[SUIT_LOCAL_STORAGE_KEY];
    }

    get maxCount() {
        return this[LIST_LIMIT];
    }

    get AUSList() {
        return this[AUS_LIST];
    }

    get suitList() {
        return this[SUIT_LIST];
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

    set suitList(val) {
        if (Array.isArray(val)) {
            if (val.length > this[SUIT_LIST_LIMIT]) {
                val.length = this[SUIT_LIST_LIMIT];
                console.log(`Warning - The maximum length of the suits list is ${this[SUIT_LIST_LIMIT]}.`);
            }
            this[SUIT_LIST].length = 0;
            this[SUIT_LIST] = val;
            this.setLocalStorage(this[SUIT_LOCAL_STORAGE_KEY], this[SUIT_LIST]);
            console.log("%cSet new Suits list success.", "color:rgb(144,82,41)");
        }
    }
}

const artiConst = new ArtifactData();
const ArtifactsSim = new ArtifactsFunction_class();
console.log("%cArtifactsUpgradeSim is running.Learn more: https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue", "color:rgb(144,82,41)");

/** --------------------------------辅助函数-------------------------------- **/

/**
 * 模拟器初始化
 */
(function () {
    // 加载本地数据
    let storage = window.localStorage;
    let localList = storage[ArtifactsSim.LSkey];
    let suitList = storage[ArtifactsSim.LSkey_suit];
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
    if (suitList !== undefined && suitList !== "[]" && suitList !== "") {
        try {
            ArtifactsSim.AUSList = JSON.parse(localList);
        } catch (error) {
            console.log("%cSet new Suits list fail.", "color:rgb(144,82,41)");
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
                // 兼容旧版数据
                if (!Object.prototype.hasOwnProperty.call(val, "symbol")) {
                    val.symbol = Date.now().toString(36) + "-" + Math.random().toString(36).substring(2) + "-" + Math.random().toString(36).substring(2, 8);
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
                if (!Object.prototype.hasOwnProperty.call(val, "equipped")) {
                    val.equipped = 0;
                }
                ArtifactsSim.changeCount([val.part, val.mainEntry, val.suit]);
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