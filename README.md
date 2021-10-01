# ArtifactsUpgradeSim | 圣遗物强化模拟器

## Project setup 项目初始化
```
npm install
```

### Compiles and hot-reloads for development 本地运行
```
npm run dev
```

### Compiles and minifies for production 编译
```
npm run build
```

### 原神圣遗物强化模拟

---

摸鱼的小项目，含有以下问题：
- 各种奇怪的bug
- 更新缓慢
- 界面简陋
- 功能不齐

---

**如果觉得还凑合，就点个免费的Star吧~**

### 注意事项：

- **下载前请注意：本模拟器使用了Vue3，因此不支持IE浏览器。**

- **开发和调试时仅使用了chrome，因此不保证在所有浏览器都能正常使用。理论上来讲chrome、Edge、Firefox、QQ浏览器都能正常运行。**


**概率数据来自于网络，仅供娱乐。**

---

#### Demo预览（可能落后于当前版本）：

GIt: https://diomao.github.io/artifacts_sim_demo

国内: https://juanweimao.gitee.io/artifacts_sim_demo

---

#### 引入方法：

1. ~~直接使用\<script\>标签引入ArtifactsUpradeSim.js~~。暂未提供新版js

2. Vue3项目：将ArtifactsUpradeSim_module.js、ArtifactsData.js、index.js放入src/utils文件里。

**如果项目已经存在src/utils/index.js，则需要手动将index.js的代码进行合并。**

在main.js中全局引入：
```
import { ArtifactsSim,artiConst } from './utils'

// 全局挂载模拟器（ArtifactsSim）和模拟器数据（artiConst）
app.config.globalProperties.$artifact = ArtifactsSim
app.config.globalProperties.$artiConst = artiConst
```

或在组件中通过import按需引入。

在JavaScript中使用ArtifactsSim调用，Vue全局引入则使用$artifact调用，以下以JavaScript版为例：

#### 1. 生成新的圣遗物数据：

> ArtifactsSim.creatArtifact(part, mainEntry, entry, entryRate)

参数说明:

- part: string，可选，生成的圣遗物部位。
- mainEntry: srting，可选，圣遗物主词条。
- entry: Array，可选，圣遗物的副词条，至多四条，超过四条则全部随机生成。自选副词条不满三条时会随机选择可用副词条补至三条。
- entryRate: Array，可选，圣遗物的副词条的数值。
- suit: String，可选，指定圣遗物套装。
- **若有无效参数，则该项会随机选择。**

示例：
```
ArtifactsSim.creatArtifact("cup","fire",["ATKPer","critRate","critDMG","elementMastery"],[5.8,3.9,7.8,23],"Emblem of Severed Fate");
```
返回值为对象:

```  
    symbol: "",                     标识
    level: 0,                       等级
    suit: "none",                   套装
    part: "none",                   部位
    mainEntry: "none",              主属性
    mainEntryValue: 0,              主属性数值
    entry: [],                      副词条+副词条数值
    initEntry: '',                  初始词条
    upgradeHistory: [],             升级记录
    creationDate: Date.now(),       创建时间戳
    lock: false                     锁定状态
    isNew: true                     新遗物标识
```

#### 2. 读取圣遗物列表：

1. 获取原始列表：

> ArtifactsSim.AUSList

返回值为一个数组列表。

2. 获取数据处理后的列表：

> ArtifactsSim.getList(language, filterPart, filterMain, filterSuit)

参数说明：

- language: String，可选，默认则不处理，可选值为zh(中文)和en(英文)。
- filterPart: String | Array，可选，默认则不处理。筛选指定位置的圣遗物。
- filterMain: String | Array，可选，默认则不处理。筛选指定主属性的圣遗物。
- filterSuit: String | Array，可选，默认则不处理。筛选指定套装的圣遗物。
- **可以同时使用多个filter。**

3. 获取指定圣遗物：

> ArtifactsSim.getArtifact(symbol, language)

参数说明：

- symbol: String，必选，指定圣遗物标识。
- language: String，可选，默认则不处理。可选值为zh(中文)和en(英文)。

####  3. 圣遗物强化

> ArtifactsSim.upgrade(index,entry,level)

参数说明:

- index: number，必选，对应ArtifactsSim.result中存储的圣遗物下标。
- entry: string，可选，指定强化的副词条，若不存在则会随机强化；词条不满四条时会优先补满四词条。
- level: number,可选，强化词条的数值档位。例如爆伤有四档数值，0-3表示从低到高的四档数值。

#### 4.圣遗物得分计算

> rArtifactsSim.ArtifactScore(index,rule)

参数说明：

- index: number，必选，对应ArtifactsSim.result中存储的圣遗物下标。
- rule: [string | array]，可选，圣遗物评分规则。默认评分为攻击+双暴得分。

当rule为字符串时，从如下数组中选择一个：
> 
    scoreList = ["atk","crit","def","hp","er","em"]
    // 对应 ["攻击得分","双暴得分","防御得分","生命得分","充能得分","精通得分"]

当rule为数组时，选择一个或多个组成数组，如["crit","def","hp"]。


#### 5. 删除指定圣遗物

> ArtifactsSim.deleteOne(index)

参数说明:

- index: number，必选，对应ArtifactsSim.result中存储的圣遗物下标。

#### 6. 重置圣遗物

> ArtifactsSim.reset(index)

参数说明:

- index: number，必选，对应ArtifactsSim.result中存储的圣遗物下标。

全部重置:

> ArtifactsSim.resetAll()

#### 7.列表排序

对存储在模拟器的圣遗物进行排序

> ArtifactsSim.sortList(rule)

参数说明:

- rule: String，必选，排序规则。rule可选值：
```
lvasc: 按等级升序排序
lvdesc: 按等级降序排序
part: 按圣遗物部位排序
mainEntry: 按圣遗物主属性排序
```
