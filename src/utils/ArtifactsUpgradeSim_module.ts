/**
 * ArtifactsUpgradeSim v0.2.3 module
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/graphs/contributors)
 * Licensed under GPL3.0 (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/LICENSE)
 */
import { ArtifactData } from './ArtifactsData';
import Dexie, { Table } from 'dexie';
import { ArtifactNameSpace } from './ArtifactsUpgradeSimTypes';

/**
 * 创建indexedDB
 */
export interface ARTIFACT_LIST {
  symbol: string;
  level: number;
  set: string;
  part: string;
  mainEntry: string;
  equipped: string | number;
}

export interface CUSTOM_SET {
  name: string;
}

class ArtifactsIDB extends Dexie {
  ARTIFACT_LIST!: Table<ARTIFACT_LIST>;
  CUSTOM_SET!: Table<CUSTOM_SET>;

  constructor() {
    super('ARTIFACT_DB_MAO');
    this.version(1).stores({
      ARTIFACT_LIST: 'symbol, level, set, part, mainEntry, equipped',
      CUSTOM_SET: 'name',
    });
  }
}
const IDB = new ArtifactsIDB();

/**
 * ES6 version
 */
class ArtifactsFunction_class {
  // Private variable
  private AUS_LIST: ArtifactNameSpace.ArtifactsFormat[] = [];
  private DELETE_HISTORY: ArtifactNameSpace.ArtifactsFormat[] = [];
  private SET_LIST: ArtifactNameSpace.CharacterSetFormat[] = [];
  private COUNT_LIST: any = Object.create(null);
  private LANGUAGE: string = 'origin';
  readonly LIST_LIMIT: number = 2000;
  readonly SET_LIST_LIMIT: number = 100;
  readonly AUTHOR: string = 'DioMao';
  readonly VERSION: string = '0.2.3';

  constructor() {}

  /**
   * 生成初始数据
   * @param {string} part 指定位置，可为空
   * @param {string} main 指定主词条，可为空
   * @param {array} entry 指定词条（至多四条），可为空
   * @param {array} entryRate 副词条数值（对应自选副词条），可为空
   * @param {string} artifactSet 指定圣遗物套装，可为空
   * @param {boolean} storage 是否保存到本地（批量操作时建议禁用）
   * @returns {Object} 对象newArtifacts
   */
  createArtifact(
    part: string = '',
    main: string = '',
    entry: string[] = [],
    entryRate: number[] = [],
    artifactSet: string = '',
    storage: boolean = true
  ): ArtifactNameSpace.ArtifactsFormat | boolean {
    if (this.AUS_LIST.length >= this.LIST_LIMIT) {
      console.log(`Warning - The maximum length of the artifacts list is ${this.LIST_LIMIT}.`);
      return false;
    }
    const newArtifacts: ArtifactNameSpace.ArtifactsFormat = {
        symbol: '',
        level: 0,
        rarity: 5,
        set: 'none',
        part: 'none',
        mainEntry: 'none',
        mainEntryValue: 0,
        entry: [],
        initEntry: '',
        upgradeHistory: [],
        lock: false,
        isNew: true,
        equipped: 0,
      },
      ArtifactEntry = [],
      ArtifactEntryRate = [];
    // 自选或随机位置
    if (typeof part === 'string' && artiConst.val.parts.indexOf(part) !== -1) {
      newArtifacts.part = part;
    } else {
      newArtifacts.part = artiConst.val.parts[Math.floor(Math.random() * artiConst.val.parts.length)];
    }
    // 自选或随机套装
    if (typeof artifactSet === 'string' && Object.prototype.hasOwnProperty.call(artiConst.val.artifactSet, artifactSet)) {
      newArtifacts.set = artifactSet;
    } else {
      newArtifacts.set = this.randomSet();
    }
    // 自选或随机主属性
    if (typeof main === 'string' && artiConst.val.mainEntryList.indexOf(main) !== -1 && this.mainEntryVerify(newArtifacts.part, main)) {
      newArtifacts.mainEntry = main;
    } else {
      newArtifacts.mainEntry = this.randomMainEntry(<ArtifactNameSpace.ArtifactPartType>newArtifacts.part);
    }
    // 主属性数值
    newArtifacts.mainEntryValue = artiConst.val.mainEntryValueList[newArtifacts.mainEntry][0];
    // 临时词条库（排除已有词条）
    for (let i = 0; i < artiConst.val.entryList.length; i++) {
      if (artiConst.val.entryList[i] !== newArtifacts.mainEntry) {
        ArtifactEntry.push(artiConst.val.entryList[i]);
        ArtifactEntryRate.push(artiConst.val.entryProbability[i]);
      }
    }
    // 自选副词条
    if (entry.length <= 4 && this.entryVerify(newArtifacts.mainEntry, entry)) {
      for (let i = 0; i < entry.length; i++) {
        const cusEntry = entry[i];
        let cusEntryRate: number = entryRate[i];
        const index = ArtifactEntry.indexOf(cusEntry);
        if (artiConst.val.entryList.indexOf(cusEntry) === -1) continue;
        // 从临时词条库中移除已有词条，避免重复
        ArtifactEntry.splice(index, 1);
        ArtifactEntryRate.splice(index, 1);
        // 判断自选副词条数值是否合规
        if (entryRate.length === 0 || artiConst.val.entryValue[cusEntry].indexOf(cusEntryRate) === -1) {
          cusEntryRate = this.randomEntryValue(cusEntry);
        }
        newArtifacts.entry.push([cusEntry, cusEntryRate]);
      }
    }
    // 随机词条/+若自选词条数量不到3条则补至3条
    while (newArtifacts.entry.length < 3) {
      //临时词条库
      const newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate);
      const newEntryRate = this.randomEntryValue(newEntry);
      const index = ArtifactEntry.indexOf(newEntry);
      // 从临时词条库中移除已有词条，避免重复
      ArtifactEntry.splice(index, 1);
      ArtifactEntryRate.splice(index, 1);
      newArtifacts.entry.push([newEntry, newEntryRate]);
    }
    // 是否拥有初始四词条
    if (entry.length === 0 && Math.random() < artiConst.val.extraEnrtyRate) {
      const newEntry = this.randomRate(ArtifactEntry, ArtifactEntryRate);
      newArtifacts.entry[3] = [newEntry, this.randomEntryValue(newEntry)];
    }
    newArtifacts.symbol = this.generateUUID();
    // 保存初始状态
    newArtifacts.initEntry = JSON.stringify(newArtifacts.entry);
    // 保存结果
    this.AUS_LIST.push(newArtifacts);
    // console.log(newArtifacts);
    this.changeCount([newArtifacts.part, newArtifacts.mainEntry, newArtifacts.set]);
    // 本地存储
    if (storage) IDB.ARTIFACT_LIST.add(newArtifacts);
    return newArtifacts;
  }

  /**
   * 批量生成（随机）
   * @param {number} count 生成数量
   * @param {string} part 指定位置，可为空
   * @param {string} main 指定主词条，可为空
   * @param {array} entry 指定词条（至多四条），可为空
   * @param {array} entryRate 副词条数值（对应自选副词条），可为空
   * @param {string} artifactSet 指定圣遗物套装，可为空
   * @returns 操作结果
   */
  bulkCreate(count: number, part: string = '', main: string = '', entry: string[] = [], entryRate: number[] = [], artifactSet: string = '') {
    count = Math.floor(count);
    const res: ArtifactNameSpace.ArtifactsFormat[] = [];
    while (count > 0 && this.AUS_LIST.length < this.LIST_LIMIT) {
      res.push(<ArtifactNameSpace.ArtifactsFormat>this.createArtifact(part, main, entry, entryRate, artifactSet, false));
      count--;
    }
    IDB.ARTIFACT_LIST.bulkAdd(res).then(() => {
      console.log('Save.');
    });
    if (count > 0) {
      console.log('List limit reached!');
    }
    if (count === 0) return true;
  }

  /**
   * 升级强化
   * @param {string} __symbol 圣遗物UUID
   * @param {number} __entry 指定强化的词条序号
   * @param {number} __upLevel 强化数值的级别(0-3，3最高)
   * @returns 升级结果
   */
  upgrade(__symbol: string, __entry: number = -1, __upLevel: number = -1) {
    const index = this.getIndex(__symbol);
    if (index === -1) return false;
    const currentArtifact = this.AUS_LIST[index];
    const currentEntry = [];
    const currentEntryList = [];
    const currentEntryRate = [];
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
      const addEntry = this.randomRate(currentEntryList, currentEntryRate);
      let addRate = this.randomEntryValue(addEntry);
      if (__upLevel !== -1 && typeof __upLevel === 'number' && Math.floor(__upLevel) < artiConst.val.entryValue[addEntry].length) {
        addRate = artiConst.val.entryValue[addEntry][Math.floor(__upLevel)];
      }
      currentArtifact.entry.push([addEntry, addRate]);
      currentArtifact.upgradeHistory.push([addEntry, addRate]);
    } else {
      let upIndex = 0;
      let upEntry = '';
      let upRate = 0;
      // 优先升级自选词条
      if (
        (typeof __entry === 'string' || typeof __entry === 'number') &&
        Number.parseInt(__entry.toString()) > -1 &&
        Number.parseInt(__entry.toString()) < currentArtifact.entry.length
      ) {
        upIndex = __entry;
        upEntry = currentArtifact.entry[__entry][0];
      } else {
        // 升级随机词条
        upIndex = Math.floor(Math.random() * currentArtifact.entry.length);
        upEntry = currentArtifact.entry[upIndex][0];
      }
      if (__upLevel !== -1 && typeof __upLevel === 'number' && Math.floor(__upLevel) < artiConst.val.entryValue[upEntry].length) {
        upRate = artiConst.val.entryValue[upEntry][Math.floor(__upLevel)];
      } else {
        upRate = this.randomEntryValue(upEntry);
      }
      // console.log("Upgrade success," + upEntry + " + " + upRate);
      // 转成整数进行计算（防止精度丢失）
      currentArtifact.entry[upIndex][1] = (currentArtifact.entry[upIndex][1] * 10000 + upRate * 10000) / 10000;
      currentArtifact.upgradeHistory.push([upEntry, upRate]);
    }
    // 增加等级
    currentArtifact.level += 4;
    // 移除新遗物状态
    currentArtifact.isNew = false;
    // 增加主属性
    currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][currentArtifact.level / 4];
    IDB.ARTIFACT_LIST.put(currentArtifact);
    return true;
  }

  /**
   * 圣遗物得分计算
   * @param {string} __symbol 圣遗物UUID
   * @param {string | array} __rule 计算规则，可以为字符串和数组
   * @returns 得分
   */
  ArtifactScore(__symbol: string, __rule: string | string[] = 'default') {
    const index = this.getIndex(__symbol);
    if (index === -1) {
      return 0;
    }
    let atkScore = 0;
    let critScore = 0;
    let defScore = 0;
    let HPScore = 0;
    let rechargeScore = 0;
    let EMScore = 0;
    let totalScore = 0;
    const entryArr = this.AUS_LIST[index].entry;
    for (let i = 0; i < entryArr.length; i++) {
      const entryNow = entryArr[i][0];
      const addScore = entryArr[i][1] * artiConst.val.scoreStandar[entryNow];
      if (entryNow === 'ATK' || entryNow === 'ATKPer') {
        atkScore += addScore;
      } else if (entryNow === 'CRITRate' || entryNow === 'CRITDMG') {
        critScore += addScore;
      } else if (entryNow === 'DEF' || entryNow === 'DEFPer') {
        defScore += addScore;
      } else if (entryNow === 'HP' || entryNow === 'HPPer') {
        HPScore += addScore;
      } else if (entryNow === 'energyRecharge') {
        rechargeScore += addScore;
      } else if (entryNow === 'elementMastery') {
        EMScore += addScore;
      }
    }
    if (Array.isArray(__rule)) {
      for (let i = 0; i < __rule.length; i++) {
        switch (__rule[i].toLowerCase()) {
          case 'atk':
            totalScore += atkScore;
            break;
          case 'crit':
            totalScore += critScore;
            break;
          case 'def':
            totalScore += defScore;
            break;
          case 'hp':
            totalScore += HPScore;
            break;
          case 'er':
            totalScore += rechargeScore;
            break;
          case 'em':
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
        case 'default':
          return atkScore + critScore;
        case 'atk':
          return atkScore;
        case 'crit':
          return critScore;
        case 'def':
          return defScore;
        case 'hp':
          return HPScore;
        case 'er':
          return rechargeScore;
        case 'em':
          return EMScore;
      }
    }
    return totalScore;
  }

  /**
   * 圣遗物重置初始状态
   * @param {string} __symbol 圣遗物UUID
   * @param {boolean} __storage 是否保存到本地（批量操作时建议禁用）
   * @returns 返回操作结果
   */
  reset(__symbol: string, __storage: boolean = true) {
    const index = this.getIndex(__symbol);
    if (index === -1) return false;
    const currentArtifact = this.AUS_LIST[index];
    if (currentArtifact.lock) {
      return false;
    } else {
      currentArtifact.entry.length = 0;
      currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
      currentArtifact.upgradeHistory.length = 0;
      currentArtifact.level = 0;
      currentArtifact.mainEntryValue = artiConst.val.mainEntryValueList[currentArtifact.mainEntry][0];
      if (__storage) IDB.ARTIFACT_LIST.put(currentArtifact);
      return currentArtifact;
    }
  }

  /**
   * 重置全部圣遗物状态
   */
  resetAll() {
    const list = [];
    for (const item of this.AUS_LIST) {
      const res = this.reset(item.symbol, false);
      if (res) {
        list.push(res);
      }
    }
    if (list.length > 0) IDB.ARTIFACT_LIST.bulkPut(list);
  }

  /**
   * 删除指定数据
   * @param {string} symbol 圣遗物UUID
   * @param {boolean} storage 是否保存到本地（批量操作时建议禁用）
   * @returns 操作结果
   */
  deleteOne(symbol: string, storage: boolean = true) {
    const index = this.getIndex(symbol);
    if (index === -1) return false;
    const artifact = this.AUS_LIST[index];
    // 被锁定或被装备的圣遗物不能删除
    if (artifact.lock === true || artifact.equipped) {
      return false;
    } else {
      this.changeCount([artifact.part, artifact.mainEntry, artifact.set], -1);
      if (this.DELETE_HISTORY.length < 500) {
        this.DELETE_HISTORY.push(this.AUS_LIST.splice(index, 1)[0]);
      } else {
        this.AUS_LIST.splice(index, 1)[0];
      }
      if (storage) IDB.ARTIFACT_LIST.delete(artifact.symbol);
      return true;
    }
  }

  /**
   * 清空数据
   */
  deleteAll() {
    let index = 0;
    const list = [];
    while (index !== this.AUS_LIST.length) {
      const artifact = this.AUS_LIST[index];
      if (artifact.lock === false && !artifact.equipped) {
        list.push(this.AUS_LIST.splice(index, 1)[0].symbol);
      } else {
        index++;
      }
    }
    this.enforceUpdateCount();
    if (list.length > 0) {
      IDB.ARTIFACT_LIST.bulkDelete(list);
    }
  }

  /**
   * 撤销删除（对deleteOne删除的数据生效）
   * @returns 结果
   */
  undoDel() {
    if (this.DELETE_HISTORY.length === 0) {
      console.log('Undo false, history not found.');
      return false;
    }
    const artifact = <ArtifactNameSpace.ArtifactsFormat>this.DELETE_HISTORY.pop();
    this.AUS_LIST.push(artifact);
    this.changeCount([artifact.part, artifact.mainEntry, artifact.set]);
    IDB.ARTIFACT_LIST.add(artifact);
    return true;
  }

  /**
   * 更改countList
   * @param {string | array} key 键
   * @param {number} range 增加的值（为负数时则减少）
   * @returns 操作结果 true/false
   */
  changeCount(key: string | string[], range: number = 1) {
    if (typeof key !== 'string' && !Array.isArray(key)) return false;
    const countList = this.COUNT_LIST;
    if (typeof key === 'string') {
      key = [key];
    }
    key.forEach((val: PropertyKey) => {
      if (Object.prototype.hasOwnProperty.call(countList, val)) {
        countList[val] = countList[val] + range;
      } else {
        countList[val] = range;
      }
      if (countList[val] < 0) countList[val] = 0;
    });
    return true;
  }

  /**
   * 强制刷新countList
   */
  enforceUpdateCount() {
    this.COUNT_LIST = Object.create(null);
    this.AUS_LIST.forEach(val => {
      this.changeCount([val.part, val.mainEntry, val.set]);
    });
  }

  /**
   * 圣遗物上锁/解锁
   * @param {string} symbol 圣遗物UUID
   * @returns 操作结果
   */
  lock(symbol: string) {
    if (typeof symbol !== 'string') return false;
    const index = this.getIndex(symbol);
    this.AUS_LIST[index].lock = !this.AUS_LIST[index].lock;
    IDB.ARTIFACT_LIST.put(this.AUS_LIST[index]);
    return true;
  }

  /**
   * 查找countList
   * @param {string} key 键
   * @returns 键值
   */
  getCount(key: string) {
    if (typeof key !== 'string') return false;
    const countList = this.COUNT_LIST;
    if (Object.prototype.hasOwnProperty.call(countList, key)) {
      return countList[key];
    } else {
      return 0;
    }
  }

  /**
   * 对圣遗物列表排序
   * @param {string} rule 排序规则
   * @param {array} list 需要排序的列表
   * @returns 排序结果（失败才有返回值）
   */
  sortList(rule: string = 'lvasc', list: ArtifactNameSpace.ArtifactsFormat[] = this.AUS_LIST) {
    if (typeof rule !== 'string' || this.AUS_LIST.length === 0) return false;
    if (rule === 'main') rule = 'mainEntry';
    // 这里使用try-catch是为了版本兼容性，避免对以前的版本数据进行排序时出现错误
    try {
      list.sort((val_a, val_b) => {
        const set_a = artiConst.val.setList.indexOf(val_a.set);
        const set_b = artiConst.val.setList.indexOf(val_b.set);
        const part_a = artiConst.val.parts.indexOf(val_a.part);
        const part_b = artiConst.val.parts.indexOf(val_b.part);
        const main_a = artiConst.val.mainEntryList.indexOf(val_a.mainEntry);
        const main_b = artiConst.val.mainEntryList.indexOf(val_b.mainEntry);
        if (rule === 'lvasc' || rule === 'lvdesc') {
          // NOTE:2.3版本更新游戏内默认排序：品质>等级>套装>位置>词条数量
          // 排序优先级：先按照等级升/降序，再按照套装降序，再按照位置升序，最后按主属性升序
          if ((val_a.level > val_b.level && rule === 'lvasc') || (val_a.level < val_b.level && rule === 'lvdesc')) {
            return 1;
          } else if ((val_a.level < val_b.level && rule === 'lvasc') || (val_a.level > val_b.level && rule === 'lvdesc')) {
            return -1;
          } else if (val_a.level === val_b.level) {
            const set_a = artiConst.val.setList.indexOf(val_a.set);
            const set_b = artiConst.val.setList.indexOf(val_b.set);
            if (set_a > set_b) {
              return -1;
            } else if (set_a < set_b) {
              return 1;
            } else if (set_a === set_b) {
              if (part_a > part_b) {
                return 1;
              } else if (part_a < part_b) {
                return -1;
              } else if (part_a === part_b) {
                if (main_a > main_b) {
                  return 1;
                } else if (main_a < main_b) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }
          }
        }
        if (rule === 'part' || rule === 'mainEntry') {
          // 排序优先级：先按照part/mainEntry升序，再按照等级降序排列，再按照套装降序
          let name_a, name_b, name_a2, name_b2;
          if (rule === 'part') {
            name_a = artiConst.val.parts.indexOf(val_a[rule]);
            name_b = artiConst.val.parts.indexOf(val_b[rule]);
            rule = 'mainEntry';
            name_a2 = artiConst.val.mainEntryList.indexOf(val_a[rule]);
            name_b2 = artiConst.val.mainEntryList.indexOf(val_a[rule]);
          } else {
            name_a = artiConst.val.mainEntryList.indexOf(val_a[rule]);
            name_b = artiConst.val.mainEntryList.indexOf(val_b[rule]);
            rule = 'part';
            (name_a2 = artiConst.val.parts.indexOf(val_a[rule])), (name_b2 = artiConst.val.parts.indexOf(val_a[rule]));
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
                return -1;
              } else if (val_a.level < val_b.level) {
                return 1;
              } else if (val_a.level === val_b.level) {
                if (set_a > set_b) {
                  return -1;
                } else if (set_a < set_b) {
                  return 1;
                } else {
                  return 0;
                }
              }
            }
          }
          return 0;
        }
        return 0;
      });
      return list;
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
  getIndex(symbol: string) {
    return this.AUS_LIST.findIndex(val => {
      return val.symbol === symbol;
    });
  }

  /**
   * 处理并返回指定symbol的圣遗物数据
   * @param {string} symbol 圣遗物symbol
   * @param {string} language 目标语言(默认不处理)
   * @returns 查询结果
   */
  getArtifact(symbol: string, language: string = 'origin'): ArtifactNameSpace.ArtifactsFormat | undefined {
    const artifact = this.AUS_LIST.find(val => {
      return val.symbol === symbol;
    });
    if (artifact === undefined) {
      return undefined;
    } else if (language === 'origin') {
      return artifact;
    } else {
      return this.translate(artifact, language);
    }
  }

  /**
   * 移除isNew状态
   * @param {string} symbol 圣遗物标识
   * @returns 操作结果
   */
  notNew(symbol: string) {
    const index = this.getIndex(symbol);
    if (index === -1) return false;
    this.AUS_LIST[index].isNew = false;
    IDB.ARTIFACT_LIST.put(this.AUS_LIST[index]);
    return true;
  }

  /**
   * 获取圣遗物名称
   * @param {string} symbol 圣遗物标识
   * @param {string} language 目标语言(默认英语)
   * @returns 圣遗物名称
   */
  getArtifactName(symbol: string, language: string = 'en') {
    const lan = ['en', 'zh'];
    if (lan.indexOf(language) === -1) {
      language = 'en';
    }
    let artifact;
    let artifactSet = 'artifactSet';
    if (language === 'en') {
      artifact = this.getArtifact(symbol);
    } else if (language === 'zh') {
      artifact = this.getArtifact(symbol, 'zh');
      artifactSet += '_zh';
    }
    if (artifact) {
      return artiConst.val[artifactSet][artifact.set][artifact.part];
    }
    return "Can't get name.";
  }

  /**
   * 下载数据（本地备份）
   */
  dataDownload() {
    const date = new Date();
    const data = JSON.stringify(this.AUS_LIST);
    const blob = new Blob([data], { type: 'text/json' });
    const e = new MouseEvent('click', {});
    const a = document.createElement('a');
    a.download = `artifacts_data_${this.VERSION}_${date.getFullYear()}_${
      date.getMonth() + 1
    }_${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.json`;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.dispatchEvent(e);
  }

  /**
   * 上传文件处理（更新圣遗物列表）
   * @param {Object} file 上传的文件
   */
  uploadFile(file: any) {
    if (file) {
      if (file.size > 20000000) {
        alert('文件过大');
        return;
      }
      if (file.name.slice(-4).toLowerCase() !== 'json') {
        alert('请上传.json文件');
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'utf-8');
      fileReader.onload = (res: any) => {
        this.dataUpdate(JSON.parse(res.target.result));
      };
    } else {
      alert('还没有选择文件');
    }
  }

  /**
   * 圣遗物列表更新
   * @param {array} data 圣遗物列表
   */
  dataUpdate(data: ArtifactNameSpace.ArtifactsFormat[]) {
    if (Array.isArray(data)) {
      if (data.length > this.LIST_LIMIT) {
        data.length = this.LIST_LIMIT;
        console.log(`Warning - The maximum length of the artifacts list is ${this.LIST_LIMIT}.`);
      }
      // 数据验证
      const dataAttr = ['symbol', 'level', 'set', 'part', 'mainEntry', 'mainEntryValue', 'entry', 'initEntry', 'upgradeHistory', 'lock', 'isNew', 'equipped'];
      for (const index in data) {
        const item = data[index];
        if (typeof item !== 'object') {
          alert('Data format error!');
          return false;
        }
        for (const attr of dataAttr) {
          if (!Object.prototype.hasOwnProperty.call(item, attr)) {
            alert('Data format error!');
            return false;
          }
        }
      }
      this.AUS_LIST.length = 0;
      this.AUS_LIST = data;
      this.enforceUpdateCount();
      this.asyncSetList();
      IDB.ARTIFACT_LIST.clear().then(() => {
        IDB.ARTIFACT_LIST.bulkAdd(this.AUS_LIST);
      });
    }
  }

  /** 套装函数 **/

  /**
   * 创建新的套装
   * @param {string} name 套装名
   * @returns 操作结果
   */
  createSet(name: string) {
    if (this.SET_LIST.length >= this.SET_LIST_LIMIT) return false;
    // 数据验证
    if (typeof name === 'string') {
      // 长度限制
      name = name.slice(0, 50);
    } else {
      name = 'unnamed';
    }
    const newSet: ArtifactNameSpace.CharacterSetFormat = Object.create(null);
    newSet.name = name;
    newSet.Plume = '';
    newSet.Flower = '';
    newSet.Sands = '';
    newSet.Circlet = '';
    newSet.Goblet = '';
    this.SET_LIST.push(newSet);
    IDB.CUSTOM_SET.put(newSet);
    return true;
  }

  /**
   * 更新套装名称
   * @param {number} index 需要改名的套装下标
   * @param {string} name 新的名称
   * @returns
   */
  renameSet(index: number, name: string) {
    if (typeof index !== 'number' || index < 0 || index >= this.SET_LIST.length) return false;
    index = Math.floor(index);
    if (typeof name === 'string') {
      // 长度限制
      name = name.slice(0, 50);
    } else {
      name = 'unnamed';
    }
    this.SET_LIST[index].name = name;
    IDB.CUSTOM_SET.put(this.SET_LIST[index]);
    return true;
  }

  /**
   * 根据name获取套装序号 **如果有重名套装，则返回第一个序号**
   * @param {string} name 套装名称
   * @returns 套装序号
   */
  getSetIndex(name: string = '') {
    return this.SET_LIST.findIndex(val => {
      return val.name === name;
    });
  }

  /**
   * 根据name获取套装 **如果有重名套装，则返回第一个**
   * @param {string} name 套装名称
   */
  getSet(name: string = '') {
    return this.SET_LIST.find(val => {
      return val.name === name;
    });
  }

  /**
   * 圣遗物套装-成套查询
   * @param {string} name 套装名称
   * @returns 查询结果
   */
  getSetBonus(name: string) {
    const index = this.getSetIndex(name);
    if (index === -1) return false;
    const set = this.SET_LIST[index];
    const res = Object.create(null);
    for (const key in set) {
      if (key === 'name' || set[key] === '') continue;
      const artifact = this.AUS_LIST[this.getIndex(set[key])];
      if (artifact) {
        if (Object.hasOwnProperty.call(res, artifact.set)) {
          res[artifact.set] += 1;
        } else {
          res[artifact.set] = 1;
        }
      }
    }
    return res;
  }

  /**
   * 更新套装
   * @param {string} name 需要更新的套装下标
   * @param {array} symbolArr 包含更新的部件symbol值的数组
   * @returns 操作结果
   */
  updateSet(name: string, symbolArr: any[] = []) {
    const index = this.getSetIndex(name);
    if (index === -1) return false;
    // 长度限制
    symbolArr = symbolArr.slice(0, 5);
    const set = this.SET_LIST[index];
    for (const symbol of symbolArr) {
      const artifactIndex = this.getIndex(symbol);
      if (artifactIndex !== -1) {
        const artifact = this.AUS_LIST[artifactIndex];
        const oldset = this.SET_LIST[this.getSetIndex(<string>artifact.equipped)];
        const oldArtifact = this.getArtifact(set[artifact.part]);
        // 已有相同圣遗物则进入下个循环
        if (set[artifact.part] === symbol) continue;
        // 修改已有的圣遗物的使用者、圣遗物套装的symbol值
        if (oldset) {
          oldset[artifact.part] = set[artifact.part];
          IDB.CUSTOM_SET.put(oldset);
        }
        if (oldArtifact) {
          oldArtifact.equipped = artifact.equipped;
          IDB.ARTIFACT_LIST.put(oldArtifact);
        }
        // 修改当前圣遗物的使用者、圣遗物套装的symbol值
        artifact.equipped = set.name;
        set[artifact.part] = artifact.symbol;
        IDB.ARTIFACT_LIST.put(artifact);
        IDB.CUSTOM_SET.put(set);
      }
    }
    return true;
  }

  /**
   * 删除指定套装（未使用，若要启用请重写）
   * @param {string} name 要删除的套装下标
   * @param {boolean} setStorage 是否保存到localStorage（避免批量操作时频繁写入）
   * @returns 操作结果
   */
  deleteSet(name: string) {
    const index = this.getSetIndex(name);
    if (index === -1) return false;
    // 移除套装里所有装备的装备状态
    const set = this.SET_LIST[index];
    for (const key in set) {
      if (key === 'name') continue;
      if (set[key] !== '') {
        try {
          this.AUS_LIST[this.getIndex(set[key])].equipped = 0;
        } catch (error) {
          continue;
        }
      }
    }
    this.SET_LIST.splice(index, 1);
    return true;
  }

  /**
   * 移除套装指定位置的圣遗物
   * @param {string} name 要操作的套装下标
   * @param {string | array} part 要移除的部位
   * @returns 操作结果
   */
  removeSetItem(name: string, part: string | any[]) {
    const index = this.getSetIndex(name);
    if (index === -1) return false;
    //
    if (typeof part === 'string') part = [part];
    if (!Array.isArray(part)) return false;
    const set = this.SET_LIST[index];
    // 遍历part进行匹配删除
    part.forEach(val => {
      if (artiConst.val.parts.indexOf(val) === -1) return;
      const oldIndex = this.getIndex(set[val]);
      if (oldIndex > -1) {
        this.AUS_LIST[oldIndex].equipped = 0;
        IDB.ARTIFACT_LIST.put(this.AUS_LIST[oldIndex]);
      }
      set[val] = '';
    });
    IDB.CUSTOM_SET.put(set);
    return true;
  }

  /**
   * 同步人物装备信息（防止数据冲突）
   */
  asyncSetList() {
    // 遍历圣遗物列表
    for (const item of this.AUS_LIST) {
      if (item.equipped) {
        this.updateSet(<string>item.equipped, [item.symbol]);
      }
    }
  }

  /**
   * 计算套装属性
   * @param {string} name 需要计算属性的套装名称
   * @returns 套装属性
   */
  getSetState(name: string) {
    const index = this.getSetIndex(name);
    const state = Object.create(null);
    const entryList = Array.from(new Set([...artiConst.val.entryList, ...artiConst.val.mainEntryList]));
    for (const entry of entryList) {
      state[entry] = 0;
    }
    if (index === -1) return state;
    const set = this.SET_LIST[index];
    // 遍历套装里每个部位的属性，并计算属性
    for (const key in set) {
      let symbol = set[key];
      if (symbol !== '' && artiConst.val.parts.includes(key)) {
        const artifact = this.getArtifact(symbol);
        if (artifact) {
          // 主属性
          if (state[artifact.mainEntry]) {
            state[artifact.mainEntry] = (state[artifact.mainEntry] * 100 + artifact.mainEntryValue * 100) / 100;
          } else {
            state[artifact.mainEntry] = artifact.mainEntryValue;
          }
          // 副词条
          artifact.entry.forEach(val => {
            if (state[val[0]]) {
              state[val[0]] = (state[val[0]] * 10000 + val[1] * 10000) / 10000;
            } else {
              state[val[0]] = val[1];
            }
          });
        } else {
          symbol = '';
        }
        // console.log(`${key} : ${symbol}`);
      }
    }
    // 获取套装属性加成
    const setBonus = this.getSetBonus(name);
    const bonusFunc = (key: string, count: number) => {
      const setBonus = artiConst.val.setBonus[key][count];
      // 如果存在N件套效果
      if (setBonus) {
        for (const stat in setBonus) {
          if (state[stat]) {
            state[stat] += setBonus[stat];
          } else {
            state[stat] = setBonus[stat];
          }
        }
      }
    };
    for (const key in setBonus) {
      const count = setBonus[key];
      if (count >= 2) {
        bonusFunc(key, 2);
      }
      if (count >= 4) {
        bonusFunc(key, 4);
      }
    }
    return state;
  }

  /**
   * 计算元素精通收益
   */
  calcEMBonus(elementMastery: number) {
    if (typeof elementMastery !== 'number') return [0, 0, 0];
    // 元素精通加成公式：y=kx/(x+a)
    // 对增幅反应：k=2.78，a=1400；
    // 对剧变反应：k=16.0，a=2000；
    // 对结晶盾值：k=4.44，a=1400；
    const formula = (k: number, a: number, x: number) => {
      return (((k * x) / (x + a)) * 100).toFixed(1);
    };
    return [formula(2.78, 1400, elementMastery), formula(16, 2000, elementMastery), formula(4.44, 1400, elementMastery)];
  }

  /** 其他函数 **/

  /**
   * 词条汉化-可调用
   * @param {string} word 需要翻译成中文的词条
   * @param {string} type 词条的类型
   * @returns 翻译结果
   */
  toChinese(word: string, type: string) {
    if (typeof word !== 'string' || typeof type !== 'string') return false;
    const articonst = artiConst.val;
    let type_zh = '';
    if (type !== 'parts') {
      type += 'List';
    }
    type_zh = type + '_zh';
    if (!articonst[type]) {
      return false;
    }
    const index = articonst[type].indexOf(word);
    if (index !== -1) {
      return articonst[type_zh][index];
    }
    return false;
  }

  /**
   * 圣遗物翻译&词条处理
   * @param {object} artifact 待处理的圣遗物数据
   * @param {string} language 目标语言(默认中文)
   * @returns 处理后的圣遗物数据
   */
  translate(item: ArtifactNameSpace.ArtifactsFormat, language: string = 'zh') {
    const lan = ['zh', 'en'];
    const artifact = JSON.parse(JSON.stringify(item));
    if (typeof language !== 'string' || lan.indexOf(language) === -1) return artifact;
    try {
      if (lan.indexOf(language) !== -1 && language !== 'origin') {
        // 主词条数值处理
        artifact.mainEntryValue = this.entryValFormat(artifact.mainEntry, artifact.mainEntryValue);
        if (language === 'zh') {
          artifact.mainEntry = this.toChinese(artifact.mainEntry, 'mainEntry');
          artifact.part = this.toChinese(artifact.part, 'parts');
          artifact.set = this.toChinese(artifact.set, 'set');
        } else if (language === 'en') {
          artifact.mainEntry = artiConst.val.mainEntryList_en[artiConst.val.mainEntryList.indexOf(artifact.mainEntry)];
          artifact.part = artiConst.val.parts_en[artiConst.val.parts.indexOf(artifact.part)];
        }
        // 副词条数值处理
        artifact.entry.forEach((e: string[]) => {
          e[1] = this.entryValFormat(e[0], e[1]);
          if (language === 'zh') e[0] = this.toChinese(e[0], 'entry');
          if (language === 'en') e[0] = artiConst.val.entryList_en[artiConst.val.entryList.indexOf(e[0])];
        });
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
   * @param {boolean} 是否转为百分数（没有对应词条名称时生效）
   * @returns 处理后的词条数值
   */
  entryValFormat(entry: string, entryValue: string | number, isPercent: boolean = true): string {
    const nonPercent = ['ATK', 'HP', 'DEF', 'elementMastery'],
      entryList = artiConst.val.mainEntryList.concat(artiConst.val.entryList);
    if (entryList.indexOf(entry) > -1) {
      if (nonPercent.indexOf(entry) !== -1) {
        entryValue = this.toThousands(Number.parseFloat(<string>entryValue).toFixed(0));
      } else {
        entryValue = Number.parseFloat(<string>entryValue).toFixed(1) + '%';
      }
      return entryValue;
    } else {
      if (isPercent) {
        return Number.parseFloat(<string>entryValue).toFixed(1) + '%';
      } else {
        return Number.parseFloat(<string>entryValue).toFixed(0);
      }
    }
  }

  /**
   * 根据数组随机概率
   * @param {array} __arr1  随机列表
   * @param {array} __arr2  随机概率（对应arr1）
   */
  randomRate(__arr1: string[], __arr2: number[]) {
    if (__arr1.length !== __arr2.length) throw new Error('Function RandomRate Warning!Array length different!');
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
   * UUID生成
   * @returns 生成的UUID
   */
  generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  /**
   * 随机圣遗物套装
   * @returns 随机的圣遗物套装
   */
  randomSet() {
    return artiConst.val.setList[Math.floor(Math.random() * artiConst.val.setList.length)];
  }

  /**
   * 随机主词条
   * @param {string} __part 位置
   */
  randomMainEntry(__part: ArtifactNameSpace.ArtifactPartType): string {
    switch (__part) {
      case 'Plume':
        return 'ATK';
      case 'Flower':
        return 'HP';
      case 'Sands':
        return this.randomRate(artiConst.val.Sands, artiConst.val.hourglassRate);
      case 'Circlet':
        return this.randomRate(artiConst.val.Circlet, artiConst.val.hatRate);
      case 'Goblet':
        return this.randomRate(artiConst.val.Goblet, artiConst.val.cupRate);
      default:
        break;
    }
    return '';
  }

  /**
   * 随机副词条数值
   * @param {string} __entry 词条名称
   */
  randomEntryValue(__entry: string) {
    if (typeof __entry !== 'string') throw new Error('Function randomEntryValue Error!Wrong parameter(Not string).');
    return artiConst.val.entryValue[__entry][Math.floor(Math.random() * artiConst.val.entryValue[__entry].length)];
  }

  /**
   * 主词条合规验证
   * @param {string} __part 位置
   * @param {string} __main 主词条
   * @returns {boolean} true/false
   */
  mainEntryVerify(__part: string, __main: string): boolean {
    if (typeof __part !== 'string' || typeof __main !== 'string') throw new Error('Function mainEntryVerify Error!Wrong parameter(Not string).');
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
  entryVerify(__mainEntry: string, __entryArr: string[]) {
    if (typeof __mainEntry !== 'string' || !Array.isArray(__entryArr)) throw new Error('Function entryVerify Error!Wrong parameter.');
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
  toThousands(val: number | string) {
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }

  /**
   * get扩展（带参获取列表）
   * @param {string} language 语言
   * @param {string | array} filterPart 位置筛选
   * @param {string | array} filterMain 主属性筛选
   * @param {string | array} filterSet 套装筛选
   * @returns 处理后的结果
   */
  getList(
    language: string = 'origin',
    filterPart: string | string[] = 'default',
    filterMain: string | string[] = 'default',
    filterSet: string | string[] = 'default'
  ) {
    const lan = ['zh', 'en', 'origin'];
    // 筛选符合条件的过滤属性
    const arrFilter = function (arr: string[], type: string) {
      const res = [];
      for (const el of arr) {
        if (type === 'main') {
          artiConst.val.mainEntryList.indexOf(el) >= 0 ? res.push(el) : null;
        } else if (type === 'part') {
          artiConst.val.parts.indexOf(el) >= 0 ? res.push(el) : null;
        } else if (type === 'set') {
          artiConst.val.setList.indexOf(el) >= 0 ? res.push(el) : null;
        }
      }
      if (res.length === 0) return ['default'];
      return res;
    };
    // 参数验证
    if (typeof language !== 'string' || lan.indexOf(language.toLowerCase()) === -1) language = 'origin';
    // 字符串转数组
    if (typeof filterPart === 'string') filterPart = [filterPart];
    if (typeof filterMain === 'string') filterMain = [filterMain];
    if (typeof filterSet === 'string') filterSet = [filterSet];
    if (Array.isArray(filterPart)) {
      filterPart = arrFilter(filterPart, 'part');
    } else {
      filterPart = ['default'];
    }
    if (Array.isArray(filterMain)) {
      filterMain = arrFilter(filterMain, 'main');
    } else {
      filterMain = ['default'];
    }
    if (Array.isArray(filterSet)) {
      filterSet = arrFilter(filterSet, 'set');
    } else {
      filterSet = ['default'];
    }

    language = language.toLowerCase();
    const AUSList = [];
    for (const item of this.AUS_LIST) {
      // 筛选符合条件的圣遗物
      if (
        (filterPart.indexOf('default') !== -1 || filterPart.indexOf(item.part) !== -1) &&
        (filterMain.indexOf('default') !== -1 || filterMain.indexOf(item.mainEntry) !== -1) &&
        (filterSet.indexOf('default') !== -1 || filterSet.indexOf(item.set) !== -1)
      ) {
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
    return this.VERSION;
  }

  get author() {
    return this.AUTHOR;
  }

  get language() {
    return this.LANGUAGE;
  }

  get maxCount() {
    return this.LIST_LIMIT;
  }

  get AUSList() {
    return this.AUS_LIST;
  }

  get setList() {
    return this.SET_LIST;
  }

  set language(val) {
    const lan = ['zh', 'en', 'origin'];
    if (typeof val === 'string') {
      lan.indexOf(val.toLowerCase()) !== -1 ? (this.LANGUAGE = val) : (this.LANGUAGE = 'origin');
    }
  }

  set AUSList(val) {
    if (Array.isArray(val)) {
      if (val.length > this.LIST_LIMIT) {
        val.length = this.LIST_LIMIT;
        console.log(`Warning - The maximum length of the artifacts list is ${this.LIST_LIMIT}.`);
      }
      this.AUS_LIST.length = 0;
      this.AUS_LIST = val;
      this.enforceUpdateCount();
      // console.log("%cSet new Artifacts list success.", "color:rgb(144,82,41)");
    }
  }

  set setList(val) {
    if (Array.isArray(val)) {
      if (val.length > this.SET_LIST_LIMIT) {
        val.length = this.SET_LIST_LIMIT;
        console.log(`Warning - The maximum length of the sets list is ${this.SET_LIST_LIMIT}.`);
      }
      this.SET_LIST.length = 0;
      this.SET_LIST = val;
      // console.log("%cSet new Sets list success.", "color:rgb(144,82,41)");
    }
  }
}

const artiConst = new ArtifactData();
const ArtifactsSim = new ArtifactsFunction_class();
console.log('%cArtifactsUpgradeSim is running.Learn more: https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue', 'color:rgb(144,82,41)');

/** --------------------------------辅助函数-------------------------------- **/

/**
 * 模拟器初始化
 */
const initArtifactSim = function () {
  // 加载本地数据
  const storage = window.localStorage;
  if (!storage) {
    throw new Error('The browser does not support LocalStorage.');
  } else {
    if (storage.ArtifactsSimVersion === undefined) {
      storage.ArtifactsSimVersion = ArtifactsSim.version;
    } else if (storage.ArtifactsSimVersion !== ArtifactsSim.version) {
      // 清除0.2.3以前的localStorage数据
      if ('0.2.3' > storage.ArtifactsSimVersion) {
        storage.removeItem('AUSLocalList');
        storage.removeItem('AUS_SUITS');
      }
      alert('模拟器版本更新，如果遇到错误，请尝试清除浏览器缓存!');
      storage.ArtifactsSimVersion = ArtifactsSim.version;
    }
    storage.removeItem('ISRUNNING');
  }
  return new Promise((resolve, reject) => {
    // 初始化套装列表
    for (const key in artiConst.val.character) {
      const character = artiConst.val.character[key];
      ArtifactsSim.createSet(character.name);
    }
    Promise.all([IDB.ARTIFACT_LIST.toArray(), IDB.CUSTOM_SET.toArray()])
      .then(res => {
        const artifactList = res[0];
        const setList = res[1];
        // 初始化圣遗物列表
        ArtifactsSim.AUSList = <ArtifactNameSpace.ArtifactsFormat[]>artifactList;
        // 读取套装列表
        for (const item of setList) {
          const index = ArtifactsSim.getSetIndex(item.name);
          ArtifactsSim.setList[index] = <ArtifactNameSpace.CharacterSetFormat>item;
        }
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default ArtifactsSim;
export { ArtifactsSim, artiConst, IDB, initArtifactSim };
