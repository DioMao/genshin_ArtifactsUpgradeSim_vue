# ArtifactsUpgradeSim | 圣遗物强化模拟器

![GitHub package.json version](https://img.shields.io/github/package-json/v/DioMao/genshin_ArtifactsUpgradeSim_vue)
![GitHub top language](https://img.shields.io/github/languages/top/DioMao/genshin_ArtifactsUpgradeSim_vue)
![GitHub last commit](https://img.shields.io/github/last-commit/DioMao/genshin_ArtifactsUpgradeSim_vue)
![GitHub repo size](https://img.shields.io/github/repo-size/DioMao/genshin_ArtifactsUpgradeSim_vue)
![GitHub](https://img.shields.io/github/license/DioMao/genshin_ArtifactsUpgradeSim_vue)
![GitHub Repo stars](https://img.shields.io/github/stars/DioMao/genshin_ArtifactsUpgradeSim_vue?style=social)

部分界面：

![screenshot_1.jpg](https://imgpp.com/s1/2022/02/14/screenshot_1.jpg)
![screenshot_2.jpg](https://imgpp.com/s1/2022/02/14/screenshot_2.jpg)
![screenshot_3.jpg](https://imgpp.com/s1/2022/02/14/screenshot_3.jpg)
![screenshot_4.jpg](https://imgpp.com/s1/2022/02/14/screenshot_4.jpg)
![screenshot_5.jpg](https://imgpp.com/s1/2022/02/14/screenshot_5.jpg)
<!-- ![image](https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/screenshot/screenshot_1.jpg)
![image](https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/screenshot/screenshot_2.jpg)
![image](https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/screenshot/screenshot_3.jpg)
![image](https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/screenshot/screenshot_4.jpg)
![image](https://github.com/DioMao/genshin_ArtifactsUpgradeSim_vue/blob/master/screenshot/screenshot_5.jpg) -->

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

- 各种奇怪的 bug
- 更新缓慢
- 界面简陋
- 功能不齐

---

**如果觉得还凑合，就点个免费的 Star 吧~**

### 注意事项：

- **下载前请注意：本模拟器使用了 Vue3，因此不支持 IE 浏览器。**

- **开发和调试时仅使用了 chrome，因此不保证在所有浏览器都能正常使用。理论上来讲 chrome、Edge、Firefox、QQ 浏览器都能正常运行。**

- **编译版本是可以直接本地运行的。如果不想自己编译，可以直接下载已编译的 demo 版本:**

<a href="https://github.com/DioMao/artifacts_sim_demo.git" target="_blank">Github 路线</a>

<a href="https://gitee.com/juanweimao/artifacts_sim_demo.git" target="_blank">gitee 路线（国内首选）</a>

**概率数据来自于网络和自测，仅供娱乐。**

---

#### Demo 预览（可能落后于当前版本）：

GIt: https://diomao.github.io/artifacts_sim_demo

国内: https://juanweimao.gitee.io/artifacts_sim_demo

---

#### 引入方法：

1. ~~直接使用\<script\>标签引入 ArtifactsUpradeSim.js~~。暂未提供新版 js

2. Vue3 项目：将 ArtifactsUpradeSim_module.js、ArtifactsData.js、dexie.js 放入 src/utils 文件里。

在 main.js 中全局引入：

```
import { ArtifactsSim, artiConst, initArtifactSim } from "./utils/ArtifactsUpradeSim_module";

// 全局挂载模拟器（ArtifactsSim）和模拟器数据（artiConst）
app.config.globalProperties.$artifact = ArtifactsSim;
app.config.globalProperties.$artiConst = artiConst;
// 初始化模拟器
initArtifactSim().then(() => {
    // 挂载实例，如app.mount("#app");
})
```

或在组件中通过 import 按需引入。

在 JavaScript 中使用 ArtifactsSim 调用，Vue 全局引入则使用$artifact 调用，以下文档以 JavaScript 版为例：

## v0.2.5 文档

### 一、 圣遗物部分

#### 1. 生成新的圣遗物数据：

> ArtifactsSim.creatArtifact(part, mainEntry, entry, entryRate, set, storage)

参数说明:

- part: string，可选，生成的圣遗物部位。
- mainEntry: srting，可选，圣遗物主词条。
- entry: array，可选，圣遗物的副词条，至多四条，超过四条则全部随机生成。自选副词条不满三条时会随机选择可用副词条补至三条。
- entryRate: array，可选，圣遗物的副词条的数值。
- set: string，可选，指定圣遗物套装。
- storage: boolean，可选，默认 true，是否保存到本地。批量操作时建议禁用，最后统一写入。
- **若有无效参数，则该项会随机选择。**

示例：

```
ArtifactsSim.creatArtifact("Goblet","Geo",["ATKPer","critRate","critDMG","elementMastery"],[5.8,3.9,7.8,23],"Emblem of Severed Fate", true);
```

返回值为对象:

```
{
    symbol: "",                     标识(UUID)
    level: 0,                       等级
    suit: "none",                   套装
    part: "none",                   部位
    mainEntry: "none",              主属性
    mainEntryValue: 0,              主属性数值
    entry: [],                      副词条+副词条数值
    initEntry: '',                  初始词条
    upgradeHistory: [],             升级记录
    lock: false,                    锁定状态
    isNew: true,                    新遗物标识
    equipped: 0,                    使用者
}
```

#### 2. 读取圣遗物列表：

1. 获取原始列表：

> ArtifactsSim.AUSList

返回值为一个对象数组。

2. 获取数据处理后的列表：

> ArtifactsSim.getList(language, filterPart, filterMain, filterSuit)

参数说明：

- language: String，可选，默认则不处理，可选值为 zh(中文)和 en(英文)。
- filterPart: string | array，可选，默认则不处理。筛选指定位置的圣遗物。
- filterMain: string | array，可选，默认则不处理。筛选指定主属性的圣遗物。
- filterSuit: string | array，可选，默认则不处理。筛选指定套装的圣遗物。
- **可以同时使用多个 filter。**

3. 获取指定圣遗物：

> ArtifactsSim.getArtifact(symbol, language)

参数说明：

- symbol: string，必选，指定圣遗物标识。
- language: string，可选，默认则不处理。可选值为 zh(中文)和 en(英文)。

#### 3. 圣遗物强化

> ArtifactsSim.upgrade(symbol, entry, level)

参数说明:

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。
- entry: string，可选，指定强化的副词条，若不存在则会随机强化；词条不满四条时会优先补满四词条。
- level: number,可选，强化词条的数值档位。例如爆伤有四档数值，0-3 表示从低到高的四档数值。

#### 4.圣遗物得分计算

> rArtifactsSim.ArtifactScore(symbol, rule)

参数说明：

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。
- rule: [string | array]，可选，圣遗物评分规则。默认评分为攻击+双暴得分。

当 rule 为字符串时，从如下数组中选择一个：

>

    scoreList = ["atk","crit","def","hp","er","em"]
    // 对应 ["攻击得分","双暴得分","防御得分","生命得分","充能得分","精通得分"]

当 rule 为数组时，选择一个或多个组成数组，如["crit","def","hp"]。

#### 5. 删除指定圣遗物

> ArtifactsSim.deleteOne(symbol)

参数说明:

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。

#### 6. 重置圣遗物

> ArtifactsSim.reset(symbol)

参数说明:

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。

全部重置:

> ArtifactsSim.resetAll()

#### 7. 圣遗物上锁/解锁

> ArtifactsSim.lock(symbol)

改变该圣遗物的锁定状态，返回值为 boolean，成功 true/失败 false。

参数说明:

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。

#### 8. 移除圣遗物 new 状态

> ArtifactsSim.notNew(symbol)

参数说明:

- symbol: string，必选，对应 ArtifactsSim.result 中存储的圣遗物标识。

#### 9. 获取指定套装名称/位置/主属性的圣遗物数量

> ArtifactsSim.getCount(key)

参数说明:

- key: string，合法的圣遗物套装/位置/主属性名。

#### 10. 列表排序

对存储在模拟器的圣遗物进行排序

> ArtifactsSim.sortList(rule)

参数说明:

- rule: String，必选，排序规则。rule 可选值：

```
lvasc: 按等级升序排序
lvdesc: 按等级降序排序
part: 按圣遗物部位排序
mainEntry: 按圣遗物主属性排序
```

### 二、 人物装备部分

#### 1. 获取人物-装备列表

> ArtifactsSim.setList

#### 2. 获取指定人物装备信息

> ArtifactsSim.getSet(name)

若为有效名称，则会返回一个对象:

```
{
    name: "name",
    Plume: "" || symbol,
    Flower: "" || symbol,
    Sands: "" || symbol,
    Circlet: "" || symbol,
    Goblet: "" || symbol,
}
// symbol为圣遗物标识，若该位置没有装备则为空字符串。
```

参数说明:

- name: string，人物名称。

#### 3. 指定人物圣遗物套装查询

> ArtifactsSim.getSetBonus(name)

若为有效名称，则会返回一个对象:

```
{
    圣遗物套装名称: 已装备数量
}
```

参数说明:

- name: string，人物名称。

#### 4. 更新人物装备

> ArtifactsSim.updateSet(name, symbolArr)

参数说明:

- name: string，人物名称。
- symbolArr: array，含圣遗物 symbol 值的数组，数组长度限制为 5。
- **关于 symbolArr 的补充说明：数组中的圣遗物会依次遍历，因此数组中如果有相同部位的圣遗物（如有三个 Plume），那么相同部位的圣遗物只有最后一个被装备。**

#### 5. 移除人物装备

> ArtifactsSim.removeSetItem(name, part)

参数说明:

- name: string，人物名称。
- part: string，需要移除装备的部位。

#### 6. 计算指定人物的装备总属性

> ArtifactsSim.getSetState(name)

已经计算了显式的套装效果（即影响面板的套装效果），请勿重复计算。

返回值为对象:

```
{
    属性: 属性值
}
```

参数说明:

- name: string，人物名称。
