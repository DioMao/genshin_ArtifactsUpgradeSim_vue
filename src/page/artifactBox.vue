<template>
  <demo-alert :state="alertFunc.alertState" :show="alertFunc.alertShow">{{ alertFunc.alertMsg }}</demo-alert>
  <div class="main-container">
    <img class="main-container-bg" src="../assets/images/genshin-symbol.png" alt="background_image" draggable="false" />
    <div class="countShow float-end">
      {{ $t("term.artifacts") }}
      <span :style="{ color: $artifact.AUSList.length === $artifact.maxCount ? 'red' : '' }">{{ $artifact.AUSList.length }}/{{ $artifact.maxCount }}</span>
    </div>
    <popup :show="true">
      <template #title>Tips:</template>
      <template #content>This is content.</template>
    </popup>
    <div class="partFilterBox">
      <div @click="userSetting.filterPart = 'default'" :class="{ part_actived: userSetting.filterPart === 'default' }">
        <img src="../assets/images/Icon_Artifacts.png" alt="default" draggable="false" />
      </div>
      <div v-for="part in $artiConst.val.parts" :key="part" @click="userSetting.filterPart = part" :class="{ part_actived: userSetting.filterPart === part }">
        <img :src="require('../assets/images/Icon_' + part + '.png')" :alt="part" draggable="false" />
      </div>
    </div>
    <!-- 筛选提示框 -->
    <div class="filterBox" :class="userSetting.filterMain !== 'default' || userSetting.filterSet !== 'default' ? 'filterBoxShow' : 'filterBoxHide'">
      <div style="display:inline-block;">{{ $t("msg.filter") }}</div>
      <div class="filterMain" v-show="userSetting.filterMain !== 'default'" @click="userSetting.filterMain = 'default'">
        {{ $t("term." + userSetting.filterMain) }}
      </div>
      <div class="filterSet" v-show="userSetting.filterSet !== 'default'" @click="userSetting.filterSet = 'default'">
        {{ $t("setList[" + (setList.indexOf(userSetting.filterSet) !== -1 ? setList.indexOf(userSetting.filterSet) : 0) + "]") }}
      </div>
    </div>
    <!-- 圣遗物列表 -->
    <div class="extra-container">
      <artifact-list
        :rawdata="ArtifactsList"
        :showsymbol="showSymbol"
        :briefmode="userSetting.listBriefMode"
        :entryquality="userSetting.entryQuality"
        @sync="syncListData"
        @changeshowsymbol="changeShowSymbol"
        @create="createArtifact"
        @alert="alertControl"
        @mobileshow="mobileshow"
      >
      </artifact-list>
    </div>
    <!-- 右侧圣遗物展示详情 -->
    <div class="ArtifactShowBox">
      <artifact-show
        @upgrade="ArtifactUpgrade"
        @init="initArtifact"
        @del="deleteArtifact"
        @lock="lockChange"
        @close="showMobileDetail = false"
        :showdetail="showDetail"
        :symbol="showSymbol"
        :language="userSetting.language"
        :showButton="true"
        v-if="showSymbol !== ''"
      >
      </artifact-show>
      <div class="ms-3 mt-3 me-3" v-show="showSymbol !== ''">
        <!-- 圣遗物评分组件 -->
        <artifact-score
          :rule="userSetting.scoreConfig.mode === 'string' ? userSetting.scoreConfig.strRule : userSetting.scoreConfig.arrRule"
          :artifact="JSON.stringify($artifact.getArtifact(showSymbol))"
        >
        </artifact-score>
        <button id="score" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal" data-bs-target="#scoreSet">{{ $t("msg.scoreSetting") }}</button>
      </div>
    </div>
  </div>
  <!-- 手机端圣遗物展示 -->
  <div class="ArtifactShowMobile" :class="{ MobileShow: showMobileDetail }">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{{ $t("msg.artifactDetail") }}</h5>
      <button type="button" class="btn-close text-reset" @click="showMobileDetail = false"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <artifact-show
          @upgrade="ArtifactUpgrade"
          @init="initArtifact"
          @del="deleteArtifact"
          @close="showMobileDetail = false"
          @lock="lockChange"
          :showdetail="showDetail"
          :symbol="showSymbol"
          :language="userSetting.language"
          :showButton="true"
          v-if="showSymbol !== ''"
        >
        </artifact-show>
      </div>
      <div class="mt-3" v-show="showSymbol !== ''">
        <!-- 圣遗物评分组件 -->
        <artifact-score
          :rule="userSetting.scoreConfig.mode === 'string' ? userSetting.scoreConfig.strRule : userSetting.scoreConfig.arrRule"
          :artifact="JSON.stringify($artifact.getArtifact(showSymbol))"
        >
        </artifact-score>
        <button id="score-2" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal" data-bs-target="#scoreSet">{{ $t("msg.scoreSetting") }}</button>
      </div>
    </div>
  </div>
  <footer>
    <div class="gap-2 d-md-flex justify-content-end buttonBox clearfix">
      <button id="filter" class="btn ms-0 btn-genshin" data-bs-toggle="dropdown" aria-expanded="false">
        <svg
          t="1631795704220"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="719"
          width="1.25rem"
          height="1.25rem"
        >
          <path
            d="M128 85.333333 896 85.333333 896 85.333333 896 85.333333 896 170.666667 892.586667 170.666667 597.333333 465.92 597.333333 977.493333 426.666667 806.826667 426.666667 465.493333 131.84 170.666667 128 170.666667 128 85.333333Z"
            p-id="720"
          ></path>
        </svg>
      </button>
      <!-- 筛选器 -->
      <ul class="dropdown-menu filterList" aria-labelledby="filter">
        <li>
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            @click="multFilter('default', 'all')"
            :class="{ isActived: userSetting.filterMain === 'default' && userSetting.filterSet === 'default' }"
          >
            {{ $t("msg.default") }}
            <span class="ms-5 float-end">{{ $artifact.AUSList.length }}</span>
          </a>
        </li>
        <!-- 套装筛选 -->
        <li class="filterLable">{{ $t("msg.set") }}</li>
        <li v-for="(set, index) in setList" :key="set">
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            @click="multFilter(set, 'set')"
            :class="{ disabled: $artifact.getCount(set) === 0, isActived: userSetting.filterSet === set }"
            :style="{ color: $artifact.getCount(set) > 0 ? '' : '#a8a8a8' }"
            >{{ $t("setList[" + index + "]") }}
            <span class="ms-5 float-end">{{ $artifact.getCount(set) }}</span>
          </a>
        </li>
        <!-- 主属性筛选 -->
        <li class="filterLable">{{ $t("msg.mainEntry") }}</li>
        <li v-for="mainEntryF in $artiConst.val.mainEntryList" :key="mainEntryF">
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            @click="multFilter(mainEntryF, 'main')"
            :class="{ disabled: $artifact.getCount(mainEntryF) === 0, isActived: userSetting.filterMain === mainEntryF }"
            :style="{ color: $artifact.getCount(mainEntryF) > 0 ? '' : '#a8a8a8' }"
            >{{ $t("term." + mainEntryF) }}
            <span class="ms-5 float-end">{{ $artifact.getCount(mainEntryF) }}</span>
          </a>
        </li>
        <li class="filterTip">{{ $t("msg.filter") }}</li>
      </ul>
      <button id="sort" class="btn me-auto btn-genshin" data-bs-toggle="dropdown" aria-expanded="false">
        <svg
          class="bi bi-funnel-fill"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="1.25rem"
          height="1.25rem"
          fill="currentColor"
        >
          <path
            d="M680 64c6.848 0 13.44 1.28 19.584 3.52 22.528 3.968 41.152 23.68 41.152 49.792v517.376h167.296c13.056 0 26.112 5.312 36.608 16 20.928 21.312 20.928 53.312-2.624 74.624l-214.4 218.688a51.2 51.2 0 0 1-41.92 15.68l-5.696 0.32a56 56 0 0 1-56-56V120c0-30.912 25.088-56 56-56z m-336 0c30.912 0 56 25.088 56 56v784a56 56 0 0 1-73.856 53.12 50.176 50.176 0 0 1-45.184-50.432V386.688H116.288a51.136 51.136 0 0 1-36.608-16C58.752 352 58.752 320 79.68 298.688l211.776-216c5.248-5.376 10.432-10.688 18.304-16h2.56c5.248 0 10.496-2.688 15.744-2.688 2.56 0 5.12 0.192 7.68 0.64A54.208 54.208 0 0 1 344 64z"
            p-id="774"
          ></path>
        </svg>
      </button>
      <ul class="dropdown-menu sortList" aria-labelledby="sort">
        <li>
          <a class="dropdown-item" href="javascript:void(0)" @click="sortList(0)">{{ $t("msg.lvasc") }}</a>
        </li>
        <li>
          <a class="dropdown-item" href="javascript:void(0)" @click="sortList(1)">{{ $t("msg.lvdesc") }}</a>
        </li>
        <li>
          <a class="dropdown-item" href="javascript:void(0)" @click="sortList(2)">{{ $t("msg.sortByPart") }}</a>
        </li>
        <li>
          <a class="dropdown-item" href="javascript:void(0)" @click="sortList(3)">{{ $t("msg.sortByMainEntry") }}</a>
        </li>
      </ul>
      <button id="create" @click="createArtifact" class="btn btn-genshin" :style="{ fontSize: $i18n.locale === 'en' ? '0.9rem' : 'inherit' }">
        <span class="circleinbox"></span>{{ $t("msg.random") }}
      </button>
      <button class="btn btn-genshin" :style="{ fontSize: $i18n.locale === 'en' ? '0.9rem' : 'inherit' }" data-bs-toggle="modal" data-bs-target="#cusArtifact">
        <span class="squareinbox"></span>{{ $t("msg.custom") }}
      </button>

      <div class="dropdown" style="display:inline-block;">
        <a
          class="btn btn-genshin dropdown-toggle"
          href="javascript:void(0)"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ $t("msg.more") }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a class="dropdown-item" href="javascript:void(0)" @click="undoDel">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              {{ $t("msg.undoDel") }}
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0)" @click="resetAll">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
              {{ $t("msg.resetAll") }}
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0)" @click="ArtifactClear">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
              {{ $t("msg.clearList") }}
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#userSet">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                <path
                  d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                />
              </svg>
              {{ $t("msg.settings") }}
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#about">
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                />
              </svg>
              {{ $t("msg.about") }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  <!-- 自选圣遗物 -->
  <div class="modal fade" id="cusArtifact" tabindex="-1" data-bs-backdrop="static" aria-labelledby="cusArtifactLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cusArtifactLabel">{{ $t("msg.optional") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="cutArtifactSet" class="form-label">{{ $t("msg.set") }}</label>
          <select id="cutArtifactSet" class="form-select form-select-sm mb-3" v-model="cusSet">
            <option v-for="(set, index) in setList" :key="set" :value="set"> {{ $t("setList[" + index + "]") }}</option>
          </select>
          <label for="cutArtifactPart" class="form-label">{{ $t("msg.part") }}</label>
          <select
            id="cutArtifactPart"
            class="form-select form-select-sm mb-3"
            v-model="cusPart"
            @change="
              cusEntry.length = 0;
              cusMainEntry = '';
            "
          >
            <option v-for="part in $artiConst.val.parts" :key="part" :value="part"> {{ $t("term." + part) }}</option>
          </select>
          <label class="form-label" v-show="cusPart !== 'default' && cusPart !== ''">{{ $t("msg.mainEntry") }}</label>
          <select class="form-select form-select-sm mb-3" v-if="cusPart !== 'default' && cusPart !== ''" v-model="cusMainEntry" @change="cusEntry.length = 0">
            <option v-for="partModal in cusEntryList[cusPart]" :key="partModal" :value="partModal"> {{ $t("term." + partModal) }}</option>
          </select>
          <label class="form-label" v-show="cusPart !== 'default' && cusMainEntry !== ''">{{ $t("handle.chooseEntry") }}</label>
          <div class="d-flex justify-content-between flex-wrap">
            <div
              class="form-check mb-2"
              style="width:40%;"
              v-for="entry in $artiConst.val.entryList"
              :key="entry"
              v-show="cusPart !== 'default' && cusMainEntry !== '' && cusMainEntry !== entry"
            >
              <input
                class="form-check-input"
                v-model="cusEntry"
                type="checkbox"
                :value="entry"
                :id="entry + 'Check'"
                :disabled="cusEntry.length === 4 && cusEntry.indexOf(entry) === -1"
              />
              <label
                class="form-check-label"
                :for="entry + 'Check'"
                style="white-space:nowrap"
                :style="{ fontSize: $store.state.attr_sm_en.indexOf(entry) !== -1 && $i18n.locale === 'en' ? '0.6rem' : 'inherit' }"
              >
                {{ $t("term." + entry) }}
              </label>
              <select
                class="form-select form-select-sm mt-1 mb-1 col-md-6 ms-auto"
                v-model="cusEntryRate[entry]"
                :disabled="cusEntry.length === 4 && cusEntry.indexOf(entry) === -1"
              >
                <option v-for="entryValueModal in $artiConst.val.entryValue[entry]" :key="entryValueModal" :value="entryValueModal">
                  {{ $artifact.entryValFormat(entry, entryValueModal) }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-check form-switch me-auto">
            <input class="form-check-input" type="checkbox" id="cusCloseSwitch" v-model="cusCloseSwitch" checked />
            <label class="form-check-label" for="cusCloseSwitch">{{ $t("handle.confirmAndClose") }}</label>
          </div>
          <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="xinbox"></span>{{ $t("handle.close") }}</button>
          <button type="button" class="btn btn-genshin-dark" @click="cusCreatArtifact" :data-bs-dismiss="cusCloseSwitch ? 'modal' : null">
            <span class="circleinbox"></span>{{ $t("handle.confirm") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 设置 -->
  <div class="modal fade" id="userSet" tabindex="-1" data-bs-backdrop="static" aria-labelledby="userSetting" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userSetting">{{ $t("msg.settings") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-check form-switch mt-3">
            <label class="form-check-label" for="listModeRadio">{{ $t("msg.brief") }}</label>
            <input class="form-check-input" type="checkbox" id="listModeRadio" v-model="userSetting['listBriefMode']" />
          </div>
          <div class="mt-3">
            <div>{{ $t("tips.attrUpLv") }}<br /><span style="color:#676767;font-size:0.6rem">此选项在强化界面无效。</span></div>
            <select class="form-select form-select-sm" name="entryQuality" id="entryQuality" v-model="userSetting.entryQuality">
              <option value="-1">{{ $t("msg.random") }}</option>
              <option v-for="quality in 4" :key="quality" :value="quality - 1">{{ quality }}</option>
            </select>
          </div>
          <div class="mt-3">
            <div>{{ $t("msg.language") }}</div>
            <select class="form-select form-select-sm" name="entryQuality" id="entryQuality" v-model="userSetting.language">
              <option value="en">English</option>
              <option value="zh">简体中文</option>
            </select>
          </div>
          <button type="button" class="btn btn-genshin-dark btn-sm mt-3" @click="clearStorge">{{ $t("msg.clearStorage") }}</button>
          <br />
          <button type="button" class="btn btn-genshin-dark btn-sm mt-3" @click="resetSetting">{{ $t("msg.resetSetting") }}</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="circleinbox"></span>{{ $t("handle.confirm") }}</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 评分设置 -->
  <div class="modal fade" id="scoreSet" tabindex="-1" aria-labelledby="scoreSetting" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="scoreSetting">{{ $t("msg.scoreSetting") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="highScoreRange" class="form-label">高分圣遗物标准: {{ userSetting.highScore }}</label>
            <input type="range" class="form-range" min="20" max="50" id="highScoreRange" v-model="userSetting.highScore" />
          </div>
          <div class="mb-3">
            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode1" value="string" v-model="userSetting.scoreConfig.mode" />
            <label class="form-check-label me-5" for="scoreMode1">
              {{ $t("score.preset") }}
            </label>
            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode2" value="array" v-model="userSetting.scoreConfig.mode" />
            <label class="form-check-label" for="scoreMode2">
              {{ $t("score.optional") }}
            </label>
          </div>
          <div v-show="userSetting.scoreConfig.mode === 'string'">
            <select class="form-select form-select-sm" name="scoreString" id="scoreString" v-model="userSetting.scoreConfig.strRule">
              <option value="default">{{ $t("msg.default") }}</option>
              <option v-for="config in $artiConst.val.scoreList" :key="config" :value="config"> {{ $artifact.toChinese(config, "score") }}</option>
            </select>
          </div>
          <div class="justify-content-between flex-wrap" style="display:flex;" v-show="userSetting.scoreConfig.mode === 'array'">
            <div class="form-check" style="width:40%;" v-for="config in $artiConst.val.scoreList" :key="config">
              <input class="form-check-input" type="checkbox" :value="config" :id="'score-' + config" v-model="userSetting.scoreConfig.arrRule" />
              <label class="form-check-label" :for="'score-' + config">
                {{ $artifact.toChinese(config, "score") }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 关于信息 -->
  <div class="modal fade" id="about" tabindex="-1" aria-labelledby="about" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="about">{{ $t("msg.about") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body about-bg">
          <div>Version: {{ $artifact.version }}</div>
          <div>Author: <a href="https://github.com/DioMao" target="_blank">DioMao</a></div>
          <div>Frameworks:</div>
          <div class="fs-sm">Vue3 <br />Vue-router4 <br />Vuex4 <br />Bootstrap5 <br />Vue-i18n@9.1.7<br />Dexie</div>
          <div>Artifacts Images:</div>
          <div class="fs-sm">
            <a href="https://genshin-impact.fandom.com/" target="blank">Genshin Impact Wiki</a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span class="circleinbox"></span>{{ $t("handle.confirm") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import demoAlert from "../components/demo-alert";
  import artifactShow from "../components/artifact-show";
  import popup from "../components/popup";
  import artifactList from "../components/artifact-list";
  import artifactScore from "../components/artifact-score";
  // bootstrap相关
  import "bootstrap/js/dist/alert";
  import "bootstrap/js/dist/modal";
  import "bootstrap/js/dist/dropdown";
  import { getCurrentInstance, readonly, ref } from "vue";

  export default {
    components: {
      demoAlert,
      artifactShow,
      popup,
      artifactList,
      artifactScore,
    },
    setup() {
      // 获取全局函数
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      // const artifactFunc = globalProperties.$artifact;
      const artiConst = globalProperties.$artiConst.val;
      // const db = globalProperties.$db;
      // 自选圣遗物副词条数值
      const cusEntryRate = ref({});
      // 自选圣遗物主词条对照表
      const cusEntryListProto = ref({
        Plume: artiConst.Plume,
        Flower: artiConst.Flower,
        Sands: artiConst.Sands,
        Circlet: artiConst.Circlet,
        Goblet: artiConst.Goblet,
      });
      // 套装列表
      const setList = ref(artiConst.setList);
      // 初始化自选圣遗物副词条数值为最大值
      for (let key in artiConst.entryValue) {
        cusEntryRate.value[key] = artiConst.entryValue[key][artiConst.entryValue[key].length - 1];
      }
      const cusEntryList = readonly(cusEntryListProto);
      return {
        cusEntryRate,
        cusEntryList,
        setList,
      };
    },
    data() {
      return {
        state: this.$store.state,
        showSymbol: "", // 展示圣遗物的symbol
        showDetail: Object, // 右侧圣遗物展示详情
        ArtifactsList: [], // 圣遗物列表
        cusCloseSwitch: true, // 自选圣遗物-生成后是否关闭modal窗
        cusSet: "", // 自选圣遗物套装
        cusPart: "", // 自选圣遗物位置
        cusMainEntry: "", // 自选圣遗物主词条
        cusEntry: [], // 自选圣遗物副词条
        userSetting: {
          // 用户设置
          scoreConfig: {
            // 圣遗物得分设置
            mode: "string",
            strRule: "default",
            arrRule: [],
          },
          language: "zh", // 语言
          entryQuality: -1, // 副词条升级品质
          highScore: 35, // 高分圣遗物标准
          listBriefMode: true, // 圣遗物列表模式（details/brief）
          sortRule: "lvdesc", // 排序规则
          filterMain: "default", // 主词条筛选
          filterPart: "default", // 位置筛选
          filterSet: "default", // 套装筛选
        },
        defaultSetting: "", // 初始设置
        alertFunc: {
          alertShow: false, // 是否显示提示框
          alertMsg: String, // 提示框内容
          alertClose: Function, // 定时关闭提示框
          alertState: "success", // 提示框类型
        },
        showMobileDetail: false,
      };
    },
    created() {
      this.defaultSetting = JSON.stringify(this.userSetting);
    },
    mounted() {
      // 读取本地设置
      if (!window.localStorage) {
        alert("浏览器不支持localstorage");
        return false;
      } else {
        if (localStorage.userSetting === undefined) {
          localStorage.userSetting = this.defaultSetting;
        } else if (localStorage.userSetting !== "") {
          let settingObj = JSON.parse(localStorage.getItem("userSetting"));
          // 给设定分配值（读取本地设置）
          Object.assign(this.userSetting, settingObj);
        }
      }
      this.changeSetting();
      // 初始化列表数据
      this.syncListData();
      this.showSymbol = this.$store.state.selectHistory;
    },
    computed: {
      language() {
        return this.state.language;
      },
    },
    watch: {
      showSymbol(val) {
        if (val === "") {
          return;
        }
        this.showDetail = this.$artifact.getArtifact(val, this.userSetting.language);
      },
      ArtifactsList() {
        if (this.showSymbol !== "") this.showDetail = this.$artifact.getArtifact(this.showSymbol, this.userSetting.language);
      },
      userSetting: {
        handler(val) {
          if (
            this.showSymbol !== "" &&
            val.filterPart !== "default" &&
            this.$artifact.AUSList[this.$artifact.getIndex(this.showSymbol)].part !== val.filterPart
          )
            this.showSymbol = "";
          if (
            this.showSymbol !== "" &&
            val.filterMain !== "default" &&
            this.$artifact.AUSList[this.$artifact.getIndex(this.showSymbol)].mainEntry !== val.filterMain
          )
            this.showSymbol = "";
          this.changeSetting();
          this.syncListData();
        },
        deep: true,
      },
      language(val) {
        this.userSetting.language = val;
      },
    },
    methods: {
      // 随机生成圣遗物
      createArtifact() {
        this.$artifact.createArtifact();
        // this.$artifact.bulkCreate(100);
        this.syncListData();
        this.alertControl("随机圣遗物已生成！", 1500);
      },
      // 批量随机生成
      batchCreate(count) {
        this.$artifact.bulkCreate(count);
      },
      // 自选圣遗物
      cusCreatArtifact() {
        let cusEntryValue = [],
          cusEntry = [];
        for (let i = 0; i < this.cusEntry.length; i++) {
          cusEntry.push(this.cusEntry[i]);
          cusEntryValue.push(this.cusEntryRate[cusEntry[i]]);
        }
        this.$artifact.createArtifact(this.cusPart, this.cusMainEntry, cusEntry, cusEntryValue, this.cusSet);
        this.syncListData();
        this.alertControl("自选圣遗物已生成！", 1500);
      },
      // 圣遗物升级
      ArtifactUpgrade(symbol, entry = "") {
        let res = this.$artifact.upgrade(symbol, entry, this.userSetting.entryQuality),
          qualityAlert = "";
        if (Number.parseFloat(this.userSetting.entryQuality) !== -1) qualityAlert = "已启用副词条自选提升幅度！";
        this.syncListData();
        if (res === true) {
          this.alertControl(this.$t("handle.upSuccess") + `！${qualityAlert}`, 1500);
        } else {
          this.alertControl(this.$t("handle.maxLv"), 1500, "warning");
        }
      },
      // 初始化圣遗物
      initArtifact(symbol) {
        let res = this.$artifact.reset(symbol);
        this.syncListData();
        if (res) {
          this.alertControl("重置圣遗物成功~再试试手气吧", 1500);
        } else {
          this.alertControl("该圣遗物已锁定！", 1500, "warning");
        }
      },
      // 清除结果列表
      ArtifactClear() {
        if (this.$artifact.AUSList.length === 0) {
          this.alertControl("当前列表已经空了哦！", 1500, "warning");
        } else if (confirm("确认要清空圣遗物吗？\n**会保留上锁的圣遗物**\n请注意，此操作不可恢复！")) {
          this.showSymbol = "";
          this.$artifact.deleteAll();
          this.syncListData();
        }
      },
      // 删除圣遗物
      deleteArtifact(symbol) {
        let res = this.$artifact.deleteOne(symbol);
        this.syncListData();
        if (res) {
          this.showSymbol = "";
          this.alertControl("删除圣遗物成功！", 1500);
        } else {
          this.alertControl("该圣遗物已锁定！", 1500, "warning");
        }
      },
      // 撤销删除
      undoDel() {
        let res = this.$artifact.undoDel();
        this.syncListData();
        if (res === true) {
          this.alertControl("撤销删除成功！", 1500);
        } else {
          this.alertControl("没有可以撤销的数据！", 1500, "primary");
        }
      },
      // 初始化全部圣遗物
      resetAll() {
        this.$artifact.resetAll();
        this.syncListData();
        this.alertControl("已重置全部未锁定圣遗物~", 1500);
      },
      // 保存设置
      changeSetting() {
        // 语言选择
        this.$store.commit("language", this.userSetting.language);
        this.$i18n.locale = this.$store.state.language;
        if (!window.localStorage) {
          alert("浏览器不支持localstorage");
          return false;
        } else {
          localStorage.userSetting = JSON.stringify(this.userSetting);
        }
      },
      // 清除本地数据
      clearStorge() {
        if (confirm("确定要清除模拟器所有数据吗？\n重置后会重新加载页面。")) {
          localStorage.clear();
          this.$artifact.AUSList.length = 0;
          this.ArtifactsList.length = 0;
          this.$db.delete();
          location.reload();
        }
      },
      // 恢复默认设置
      resetSetting() {
        localStorage.removeItem("userSetting");
        localStorage.userSetting = this.defaultSetting;
        this.userSetting = JSON.parse(this.defaultSetting);
        this.alertControl("设置重置成功！", 1500);
      },
      changeLanguage(language) {
        this.userSetting.language = language;
      },
      // 手机端显示圣遗物详情
      mobileshow() {
        this.showMobileDetail = true;
      },
      // 操作提示-提示框
      // state值： success/primary/warning/danger
      alertControl(msg, time = 2000, state = "success") {
        this.alertFunc.alertMsg = msg;
        this.alertFunc.alertState = state;
        this.alertFunc.alertShow = true;
        clearTimeout(this.alertFunc.alertClose);
        this.alertFunc.alertClose = setTimeout(() => {
          this.alertFunc.alertShow = false;
        }, time);
      },
      // 筛选器
      multFilter(val, type = "part") {
        if (type === "all") {
          this.userSetting.filterMain = "default";
          this.userSetting.filterPart = "default";
          this.userSetting.filterSet = "default";
        }
        if (type === "main") this.userSetting.filterMain = val;
        if (type === "part") this.userSetting.filterPart = val;
        if (type === "set") this.userSetting.filterSet = val;
      },
      // 排序
      sortList(index) {
        let sortMethod = ["lvasc", "lvdesc", "part", "main"];
        this.userSetting.sortRule = sortMethod[index];
        this.syncListData();
      },
      // 修改并保存当前展示圣遗物symbol
      changeShowSymbol(symbol) {
        this.showSymbol = symbol;
        this.$store.state.selectHistory = symbol;
        this.syncListData();
      },
      // 同步数据
      syncListData() {
        this.$artifact.sortList(this.userSetting.sortRule);
        if (this.userSetting.language === "en" || this.userSetting.language === "zh") {
          this.ArtifactsList = this.$artifact.getList(
            this.userSetting.language,
            this.userSetting.filterPart,
            this.userSetting.filterMain,
            this.userSetting.filterSet
          );
        } else {
          this.ArtifactsList = this.$artifact.getList("origin", this.userSetting.filterPart, this.userSetting.filterMain, this.userSetting.filterSet);
        }
      },
      // 锁定/解锁
      lockChange(symbol) {
        this.$artifact.lock(symbol);
        this.syncListData();
      },
    },
  };
</script>

<style lang="scss" scoped>
  #filltop {
    width: 100%;
  }

  #fillbottom {
    width: 100%;
  }

  // box界面css

  .main-container {
    position: fixed;
    overflow: hidden;
    background-color: rgb(180, 170, 150);
    top: 3.5rem;
    width: 100%;
    height: calc(100% - 7.25rem);
    user-select: none;

    .main-container-bg {
      position: absolute;
      z-index: 0;
      height: 60vh;
      top: -27vh;
      left: -23vh;
      opacity: 0.2;
    }

    .partFilterBox {
      position: fixed;
      display: flex;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.3);
      width: calc(100% - 32.5rem);
      height: 2.5rem;
      align-items: center;
      justify-content: space-around;

      div {
        width: 15%;
        text-align: center;
        opacity: 0.3;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      img {
        width: 2rem;
        height: 2rem;
      }

      .part_actived {
        opacity: 1;
        transform: scale(1.05);

        img {
          filter: drop-shadow(0 0 0.5rem rgba(64, 64, 64, 0.5));
        }
      }
    }

    .filterBox {
      position: fixed;
      bottom: 4.5rem;
      z-index: 30;
      color: rgb(102, 112, 122);
      background-color: #fff;
      padding: 0.5rem 1rem;
      transition: all 0.5s ease;

      .filterMain,
      .filterPart,
      .filterSet {
        cursor: pointer;
        display: inline-block;
        position: relative;
        background-color: $genshin_dark;
        color: $genshin_white;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        padding: 0.2rem 0.3rem;
        margin-left: 0.3rem;

        &::after {
          content: "×";
          display: inline-block;
          text-align: center;
          height: 0.8rem;
          width: 0.8rem;
          line-height: 0.9rem;
          font-size: 0.8rem;
          color: rgb(223, 20, 20);
          background-color: $genshin_white;
          border-radius: 3rem;
          margin-left: 0.25rem;
        }
      }
    }

    .filterBoxShow {
      left: 0;
    }

    .filterBoxHide {
      left: -5.5rem;
    }
  }

  .topMenu {
    position: sticky;
    overflow: hidden;
    top: 0.3125rem;
    z-index: 10;
    width: 100%;
    height: 3.125rem;
    background-color: rgba(255, 255, 255, 0.3);

    .selectBox {
      margin: 0.375rem;
    }
  }

  .extra-container {
    position: absolute;
    top: 2.5rem;
    width: 100%;
    bottom: 0;
  }

  .ArtifactShowMobile {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    z-index: 1024;
    top: 0;
    bottom: 0;
    outline: 0;
    right: -100%;
    transition: all 0.3s ease-out;

    .offcanvas-body {
      max-width: 100%;
      overflow-y: scroll;
      background-color: rgba(0, 0, 0, 0.85);
    }
  }

  .MobileShow {
    right: 0;
  }

  // footer

  footer {
    position: fixed !important;
    z-index: 1;
    background-color: #d2cab0;
    width: 100%;
    height: 3.75rem;
    left: 0;
    bottom: 0;

    .buttonBox {
      display: flex;
      padding: 0.8125rem 0.625rem;
      justify-content: flex-end;
    }
  }

  #filter,
  #sort {
    height: 2.3125rem;
    width: 2.3125rem;
    background-color: $genshin_white;
    border-radius: 1.5625rem;
    padding: 0.375rem 0;
  }

  .filterList {
    height: 26.875rem;
    overflow-y: scroll;
    background-color: rgba(61, 69, 86, 0.98) !important;
    background-image: url(../assets/images/genshin-symbol.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: 50%;
    background-blend-mode: multiply;
    padding-bottom: 0 !important;

    .filterLable {
      padding: 0.25rem 0.5rem;
      color: $genshin_gold;
      background: rgba(0, 0, 0, 0.25);
      margin: 0.25rem 0;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      padding: 0 0.3125rem;

      a {
        padding: 0.5rem 0.625rem;
        color: $genshin_white;
        background-color: inherit;

        &:hover {
          color: $genshin_white;
          background-color: transparentize($genshin_white, 0.8);
        }
      }
    }

    .isActived {
      pointer-events: none;
      background-color: $genshin_white;
      color: $genshin_dark;

      span {
        color: rgb(114, 120, 131);
      }
    }

    .filterTip {
      position: sticky;
      bottom: 0;
      padding-left: 0.625rem;
      border: solid 0.3125rem rgb(61, 69, 86);
      color: $genshin_dark;
      background-color: rgb(201, 197, 190);
      width: 100%;
      border-radius: 0.25rem;
    }
  }

  .sortList {
    background-color: rgb(61, 69, 86) !important;

    li a {
      &:hover {
        color: $genshin_white;
        background-color: rgba(72, 81, 98, 0.5) !important;
      }

      color: $genshin_white;
    }
  }

  .dropdown-footer {
    inset: auto auto 1rem 0 !important;
  }

  #create {
    position: relative;
    background-color: #ece5d8;
    border-radius: 1.5625rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  #start-drop {
    background-color: #ece5d8;
    border-left: solid 0.0625rem rgb(191, 173, 166);
    border-radius: 1.5625rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  #dropdownMenuLink::after {
    content: "";
    clear: both;
  }

  #score,
  #score-2 {
    float: right;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .countShow {
    position: fixed;
    top: 1.125rem;
    right: 0.9375rem;
    z-index: 20;
    color: $genshin_gold;
    font-size: 1rem;
  }

  .about-bg {
    background-image: url(../assets/images/genshin_emoji/Icon_Emoji_024_Keqing_Good_Night.png);
    background-repeat: no-repeat;
    background-size: 10rem;
    background-position: 90% center;
  }
</style>
