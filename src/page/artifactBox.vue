<template>
    <div class="main-container">
        <demo-alert :state="alertFunc.alertState" :show="alertFunc.alertShow">{{ alertFunc.alertMsg }}</demo-alert>
        <div class="selectBox d-flex">
            <select class="form-select" aria-label="Default select example" v-model="userSetting.filterPart">
                <option selected value="default">显示全部</option>
                <option :value="part" v-for="part in this.$artiConst.val.parts" :key="part">
                    {{ this.$artifact.toChinese(part,"parts") }}
                </option>
            </select>
        </div>
        <div class="container-fluid demo-container" ref="scrollListener">
            <div class="filterBoxFill" v-show="userSetting.filterMain!=='default'||userSetting.filterPart!=='default'">
            </div>
            <div class="filterBox"
                :class="(userSetting.filterMain!=='default'||userSetting.filterPart!=='default')?'filterBoxShow':'filterBoxHide'">
                <div style="display:inline-block;">筛选:</div>
                <div class="filterMain" v-show="userSetting.filterMain!=='default'"
                    @click="userSetting.filterMain='default'">
                    {{ (userSetting.filterMain==="ATK" || userSetting.filterMain === "HP")?"固定":"" }}{{ this.$artifact.toChinese(userSetting.filterMain,"mainEntry") }}
                </div>
                <div class="filterPart" v-show="userSetting.filterPart!=='default'"
                    @click="userSetting.filterPart='default'">
                    {{ this.$artifact.toChinese(userSetting.filterPart,"parts") }}</div>
            </div>
            <div class="tips" v-show="ArtifactsList.length===0">列表里还没有圣遗物。<br><span @click="start">创建</span>一个吧！</div>
            <!-- 上半填充 -->
            <div id="filltop" :style="{height:filltop+'px'}"></div>
            <div v-for="(Artifacts,index) in ArtifactsList" :ref="'artifact-'+'index'" :id="'artifact-'+index"
                class="ArtifactsBox card rounded shawdow-sm" :class="(Artifacts.symbol===showSymbol?'isSelect':'')"
                :key="index"
                v-show="(userSetting.filterPart==='default' || userSetting.filterPart === Artifacts.part) && (userSetting.filterMain === 'default' || userSetting.filterMain === Artifacts.mainEntry)"
                @click="changeShowSymbol(Artifacts.symbol)">
                <div class="card-body ArtifactsTitle"
                    :style="{backgroundImage:'url('+ state.partSrc[Artifacts.part] + ')'+(Artifacts.symbol===showSymbol?',url('+ state.symbolSrc +')':'')}">
                    <div class="islock" v-if="Artifacts.lock">
                        <svg t="1631861008451" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4168" width="0.5rem" height="0.5rem"
                            fill="rgb(255,138,117)">
                            <path
                                d="M824 384h5.1c3.7-19.7 5.7-40 5.7-60.7C834.8 144.7 690 0 511.5 0S188.2 144.7 188.2 323.3c0 20.8 2 41 5.7 60.7h5.1c-39.8 0-72 32.2-72 72v496c0 39.8 32.2 72 72 72h625c39.8 0 72-32.2 72-72V456c0-39.8-32.2-72-72-72zM543.5 695.4V800c0 17.7-14.3 32-32 32s-32-14.3-32-32V695.4c-19.1-11.1-32-31.7-32-55.4 0-35.3 28.7-64 64-64s64 28.7 64 64c0 23.7-12.9 44.3-32 55.4zM267.6 384c-4.9-19.7-7.4-40-7.4-60.7 0-34 6.6-66.9 19.7-97.8 12.7-29.9 30.8-56.8 53.9-79.9s50-41.2 79.9-53.9C444.6 78.6 477.5 72 511.5 72s66.9 6.6 97.8 19.7c29.9 12.7 56.8 30.8 79.9 53.9 23.1 23.1 41.2 50 53.9 79.9 13.1 30.9 19.7 63.8 19.7 97.8 0 20.7-2.5 41-7.4 60.7H267.6z"
                                p-id="4169"></path>
                        </svg>
                    </div>
                    <div :class="'card-text fs-6 '+(ArtifactRate(index)>=userSetting.highScore?'highscore':'')">
                        {{ this.$artifact.toChinese(Artifacts.part,"parts") }}</div>
                    <div class="levelStar">
                        <span v-for="i in 5" :key="i" style="margin-right: 2px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#FFCC32"
                                class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                    </div>
                    <div class="card-text" style="color:rgb(223,185,170);">
                        {{ this.$artifact.toChinese(Artifacts.mainEntry,"mainEntry") }} </div>
                    <div>{{ this.$artifact.entryValFormat(Artifacts.mainEntry,Artifacts.mainEntryValue,'main') }} <span
                            class="badge float-end fw-normal">+{{ Artifacts.level }}</span></div>
                    <a id="mobileShow" data-bs-toggle="offcanvas" href="#offcanArtifactShow"
                        aria-controls="offcanArtifactShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"
                            class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                    </a>
                </div>
                <ul class="list-group list-group-flush" v-show="!userSetting.listBriefMode">
                    <li v-for="(entry,index2) in Artifacts.entry" :key="index2" class="list-group-item"
                        @click="ArtifactUpgrade(index,entry[0])">{{ formatEntry(entry[0],entry[1]) }}
                        <span class="badge bg-primary upgradeCheat" v-show="Artifacts.level<20">+</span>
                    </li>
                    <li class="list-group-item" v-if="Artifacts.entry.length === 3">——</li>
                </ul>
                <div class="card-body" style="text-align:center;" v-show="!userSetting.listBriefMode">
                    <button id="upgrade" @click="ArtifactUpgrade(index)" class="btn btn-sm float-start"
                        :disabled="Artifacts.level >= 20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#257ad7"
                            class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path
                                d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                        </svg>
                    </button>
                    <button id="initArtifact" @click="initArtifact(index)"
                        :class="'btn btn-sm ' + (Artifacts.level===0?'hide':'')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#037728"
                            class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path
                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                            <path fill-rule="evenodd"
                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                        </svg>
                    </button>
                    <button id="deleteArtifact" @click.stop="deleteArtifact(index)" class="btn btn-sm float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#c90000"
                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="ArtifactsBox card rounded" v-for="i in fillCount" :key="i" style="visibility:hidden;"></div>
            <div id="fillbottom" :style="{height:fillbottom+'px'}"></div>
        </div>
        <div class="ArtifactShowBox">
            <artifact-show @upgrade="ArtifactUpgrade" @init="initArtifact" @del="deleteArtifact" @lock="lockChange"
                :showdetail="showDetail" :index="this.$artifact.artifactIndex(showSymbol)" v-if="showSymbol!==''">
            </artifact-show>
            <div :style="{visibility:(showSymbol!=='')?'visible':'hidden'}">
                <div id="radarChartBox" ref="radarChartBox"></div>
            </div>
            <div style="margin: 0 15px;" v-show="showSymbol!==''">副词条评分(beta)：{{ ArtifactScore }}
                <button id="score" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal"
                    data-bs-target="#scoreSet">评分标准</button>
            </div>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanArtifactShow" aria-labelledby="offcanArtifactShow">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">圣遗物详情</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <artifact-show @upgrade="ArtifactUpgrade" @init="initArtifact" @del="deleteArtifact"
                        @lock="lockChange" :showdetail="showDetail" :index="this.$artifact.artifactIndex(showSymbol)"
                        v-if="showSymbol!==''">
                    </artifact-show>
                </div>
                <div class="mt-3" v-show="showSymbol!==''">副词条评分(beta)：{{ ArtifactScore }}
                    <button id="score-2" class="btn btn-genshin-dark btn-sm" data-bs-toggle="modal"
                        data-bs-target="#scoreSet">评分标准</button>
                </div>
                <div :style="{visibility:(showSymbol!=='')?'visible':'hidden'}" class="mt-3">
                    <div id="radarChartBox2" ref="radarChartBox2"></div>
                </div>
                <button type="button" class="btn btn-genshin-dark mt-3" data-bs-dismiss="offcanvas" aria-label="Close"
                    style="float: right;"><span class="xinbox"></span>关闭详情</button>
            </div>
        </div>
        <footer>
            <div class="gap-2 d-md-flex justify-content-end buttonBox clearfix">
                <button id="filter" class="btn ms-0 btn-genshin" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg t="1631795704220" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="719" width="1.25rem" height="1.25rem">
                        <path
                            d="M128 85.333333 896 85.333333 896 85.333333 896 85.333333 896 170.666667 892.586667 170.666667 597.333333 465.92 597.333333 977.493333 426.666667 806.826667 426.666667 465.493333 131.84 170.666667 128 170.666667 128 85.333333Z"
                            p-id="720"></path>
                    </svg>
                </button>
                <ul class="dropdown-menu filterList" aria-labelledby="filter">
                    <li><a class="dropdown-item" href="#" @click="mainEntryfilter('default')"
                            :style="{background:(userSetting.filterMain==='default'?'rgb(85,92,107)':'inherit')}">默认<span
                                class="ms-5 float-end">{{ ArtifactsList.length }}</span></a></li>
                    <li v-for="mainEntryF in this.$artiConst.val.mainEntryList" :key="mainEntryF"><a
                            class="dropdown-item" href="#" @click="mainEntryfilter(mainEntryF)"
                            :style="{background:(userSetting.filterMain===mainEntryF?'#596379':'inherit'),color:(this.$artifact.getCount(mainEntryF)>0?'':'#a8a8a8')}">{{ (mainEntryF==="ATK" || mainEntryF === "HP")?"固定":"" }}{{ this.$artifact.toChinese(mainEntryF,"mainEntry") }}
                            <span class="ms-5 float-end">{{ this.$artifact.getCount(mainEntryF) }}</span></a></li>
                </ul>
                <button id="sort" class="btn me-auto btn-genshin" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg class="bi bi-funnel-fill" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor">
                        <path
                            d="M680 64c6.848 0 13.44 1.28 19.584 3.52 22.528 3.968 41.152 23.68 41.152 49.792v517.376h167.296c13.056 0 26.112 5.312 36.608 16 20.928 21.312 20.928 53.312-2.624 74.624l-214.4 218.688a51.2 51.2 0 0 1-41.92 15.68l-5.696 0.32a56 56 0 0 1-56-56V120c0-30.912 25.088-56 56-56z m-336 0c30.912 0 56 25.088 56 56v784a56 56 0 0 1-73.856 53.12 50.176 50.176 0 0 1-45.184-50.432V386.688H116.288a51.136 51.136 0 0 1-36.608-16C58.752 352 58.752 320 79.68 298.688l211.776-216c5.248-5.376 10.432-10.688 18.304-16h2.56c5.248 0 10.496-2.688 15.744-2.688 2.56 0 5.12 0.192 7.68 0.64A54.208 54.208 0 0 1 344 64z"
                            p-id="774"></path>
                    </svg>
                </button>
                <ul class="dropdown-menu sortList" aria-labelledby="sort">
                    <li><a class="dropdown-item" href="#" @click="sortList(0)">等级升序</a></li>
                    <li><a class="dropdown-item" href="#" @click="sortList(1)">等级降序</a></li>
                    <li><a class="dropdown-item" href="#" @click="sortList(2)">按位置排序</a></li>
                    <li><a class="dropdown-item" href="#" @click="sortList(3)">按主属性排序</a></li>
                </ul>
                <button id="start" @click="start" class="btn btn-genshin"><span class="circleinbox"></span>随机</button>
                <button class="btn btn-genshin" data-bs-toggle="modal" data-bs-target="#cusArtifact"><span
                        class="squareinbox"></span>自选</button>

                <div class="dropdown" style="display:inline-block;">
                    <a class="btn btn-genshin dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        更多
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                            <a class="dropdown-item" href="#" @click="undoDel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor"
                                    class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                撤销删除
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click="resetAll">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor"
                                    class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                    <path
                                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                </svg>
                                全部重置
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click="ArtifactClear">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor"
                                    class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                                清空列表
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#userSet">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor"
                                    class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                                设置
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#about">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor"
                                    class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                                关于
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
        <div class="modal fade" id="cusArtifact" tabindex="-1" data-bs-backdrop="static"
            aria-labelledby="cusArtifactLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cusArtifactLabel">自选圣遗物</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="cutArtifactPart" class="form-label">位置</label>
                        <select id="cutArtifactPart" class="form-select form-select-sm mb-3" v-model="cusPart"
                            @change="cusEntry.length=0;cusMainEntry=''">
                            <option v-for="part in this.$artiConst.val.parts" :key="part" :value="part">
                                {{ this.$artifact.toChinese(part,"parts") }}</option>
                        </select>
                        <label class="form-label" v-show="cusPart!=='default'&&cusPart!==''">主属性</label>
                        <select class="form-select form-select-sm mb-3" v-if="cusPart!=='default'&&cusPart!==''"
                            v-model="cusMainEntry" @change="cusEntry.length=0">
                            <option v-for="partModal in cusEntryList[cusPart]" :key="partModal" :value="partModal">
                                {{ this.$artifact.toChinese(partModal,"mainEntry") }}</option>
                        </select>
                        <label class="form-label" v-show="cusPart!=='default'&&cusMainEntry!==''">副词条选择</label>
                        <div class="d-flex justify-content-between flex-wrap">
                            <div class="form-check mb-2" style="width:40%;"
                                v-for="entry in this.$artiConst.val.entryList" :key="entry"
                                v-show="cusPart!=='default'&&cusMainEntry!==''&&cusMainEntry!==entry">
                                <input class="form-check-input" v-model="cusEntry" type="checkbox" :value="entry"
                                    :id="entry+'Check'" :disabled="cusEntry.length===4&&cusEntry.indexOf(entry)===-1">
                                <label class="form-check-label" :for="entry+'Check'">
                                    {{ this.$artifact.toChinese(entry,"entry") }}
                                </label>
                                <select class="form-select form-select-sm mt-1 mb-1 col-md-6 ms-auto"
                                    v-model="cusEntryRate[entry]"
                                    :disabled="cusEntry.length===4&&cusEntry.indexOf(entry)===-1">
                                    <option v-for="entryValueModal in this.$artiConst.val.entryValue[entry]"
                                        :key="entryValueModal" :value="entryValueModal">
                                        {{ this.$artifact.entryValFormat(entry,entryValueModal) }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="form-check form-switch me-auto">
                            <input class="form-check-input" type="checkbox" id="cusCloseSwitch" v-model="cusCloseSwitch"
                                checked>
                            <label class="form-check-label" for="cusCloseSwitch">确认后关闭</label>
                        </div>
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span
                                class="xinbox"></span>关闭</button>
                        <button type="button" class="btn btn-genshin-dark" @click="cusCreatArtifact"
                            :data-bs-dismiss="cusCloseSwitch?'modal':null"><span class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="userSet" tabindex="-1" data-bs-backdrop="static" aria-labelledby="userSetting"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userSetting">设置</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check form-switch mt-3">
                            <label class="form-check-label" for="listModeRadio">使用简洁列表</label>
                            <input class="form-check-input" type="checkbox" id="listModeRadio"
                                v-model="userSetting['listBriefMode']">
                        </div>
                        <div class="mt-3">
                            <div>副词条提升幅度（1最低，4最高）<br><span style="color:#676767;font-size:0.6rem">此选项在强化界面无效。</span>
                            </div>
                            <select class="form-select form-select-sm" name="entryQuality" id="entryQuality"
                                v-model="userSetting.entryQuality">
                                <option value="-1">随机</option>
                                <option v-for="quality in 4" :key="quality" :value="quality-1">{{ quality }}</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-genshin-dark btn-sm mt-3"
                            @click="clearStorge">清除本地数据</button>
                        <br>
                        <button type="button" class="btn btn-genshin-dark btn-sm mt-3"
                            @click="resetSetting">恢复默认设置（含评分设置）</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span
                                class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="scoreSet" tabindex="-1" aria-labelledby="scoreSetting" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="scoreSetting">评分标准选择</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="highScoreRange" class="form-label">高分圣遗物标准: {{ userSetting.highScore }}</label>
                            <input type="range" class="form-range" min="20" max="50" id="highScoreRange"
                                v-model="userSetting.highScore">
                        </div>
                        <div class="mb-3">
                            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode1" value="string"
                                v-model="userSetting.scoreConfig.mode">
                            <label class="form-check-label me-5" for="scoreMode1">
                                预设模式
                            </label>
                            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode2" value="array"
                                v-model="userSetting.scoreConfig.mode">
                            <label class="form-check-label" for="scoreMode2">
                                自选模式
                            </label>
                        </div>
                        <div v-show="userSetting.scoreConfig.mode==='string'">
                            <select class="form-select form-select-sm" name="scoreString" id="scoreString"
                                v-model="userSetting.scoreConfig.strRule">
                                <option value="default">默认</option>
                                <option v-for="config in this.$artiConst.val.scoreList" :key="config" :value="config">
                                    {{ this.$artifact.toChinese(config,"score") }}</option>
                            </select>
                        </div>
                        <div class="justify-content-between flex-wrap" style="display:flex;"
                            v-show="userSetting.scoreConfig.mode==='array'">
                            <div class="form-check" style="width:40%;" v-for="config in this.$artiConst.val.scoreList"
                                :key="config">
                                <input class="form-check-input" type="checkbox" :value="config" :id="'score-'+config"
                                    v-model="userSetting.scoreConfig.arrRule">
                                <label class="form-check-label" :for="'score-'+config">
                                    {{ this.$artifact.toChinese(config,"score") }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="about" tabindex="-1" aria-labelledby="about" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="about">关于模拟器</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>Version: {{this.$artifact.version}} </div>
                        <div>Author: <a href="https://github.com/DioMao" target="_blank">DioMao</a></div>
                        <div>Frameworks: <br>Vue-v3.2.4 <br>Vue-router-v4.0.11 <br>Bootstrap-v5.1.0 <br>Echarts-v5.1.2
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-genshin-dark" data-bs-dismiss="modal"><span
                                class="circleinbox"></span>确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import demoAlert from '../components/demo-alert'
    import artifactShow from '../components/artifact-show'
    // bootstrap相关
    import 'bootstrap/js/dist/alert'
    import 'bootstrap/js/dist/modal'
    import 'bootstrap/js/dist/dropdown'

    export default {
        components: {
            demoAlert,
            artifactShow
        },
        data() {
            return {
                state: this.$store.state,
                showSymbol: "", // 展示圣遗物的symbol
                showDetail: Object, // 右侧圣遗物展示详情
                ArtifactsList: [], // 全部圣遗物列表（监听变化用）
                viewList: [], // 可见部分的列表
                itemMax: 0, // 每行最大容纳item数量
                fillCount: 0, // 填充圣遗物列表
                cusCloseSwitch: true, // 自选圣遗物-生成后是否关闭modal窗
                cusPart: "", // 自选圣遗物位置
                cusMainEntry: "", // 自选圣遗物主词条
                cusEntry: [], // 自选圣遗物副词条
                cusEntryRate: Object, // 自选圣遗物副词条数值
                cusEntryList: Object, // 自选圣遗物副词对照表
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
                },
                defaultSetting: "", // 初始设置
                alertFunc: {
                    alertShow: false, // 是否显示提示框
                    alertMsg: String, // 提示框内容
                    alertClose: Function, // 定时关闭提示框
                    alertState: "success" // 提示框类型
                },
                echarts1: undefined, //echarts初始化状态
                echarts2: undefined,
                radarChartOption: Object, // 雷达图配置
                filltop: 0, // 动态填充
                fillbottom: 0
            }
        },
        created() {
            this.cusEntryList = {
                feather: this.$artiConst.val.feather,
                flower: this.$artiConst.val.flower,
                hourglass: this.$artiConst.val.hourglass,
                hat: this.$artiConst.val.hat,
                cup: this.$artiConst.val.cup
            };
            this.defaultSetting = JSON.stringify(this.userSetting);
            // 初始化自选副词条为最大值
            for (let i in this.$artiConst.val.entryValue) {
                this.cusEntryRate[i] = this.$artiConst.val.entryValue[i][this.$artiConst.val.entryValue[i].length - 1];
            }
        },
        mounted() {
            var that = this;
            // 初始化时列表数据保持一致
            if (this.ArtifactsList.length === 0 && this.$artifact.AUSList.length !== 0) {
                this.ArtifactsList = [...this.$artifact.AUSList];
            }
            if (!window.localStorage) {
                alert("浏览器不支持localstorage");
                return false;
            } else {
                if (localStorage.userSetting === undefined) {
                    localStorage.userSetting = this.defaultSetting;
                } else if (localStorage.userSetting !== '') {
                    let settingObj = JSON.parse(localStorage.getItem("userSetting"));
                    // 给设定分配值（读取本地设置）
                    Object.assign(this.userSetting, settingObj);
                }
            }
            // 监听滚动条并记录位置，返回界面时回到记录位置
            setTimeout(() => {
                that.$refs.scrollListener.scrollTop = this.$store.state.boxScroll;
                this.showSymbol = this.$store.state.selectHistory;
            }, 1)
            // 滚动监听
            this.$refs.scrollListener.addEventListener("scroll", () => {
                // 记录相对高度（this.$store.state.boxScroll为全局变量）
                const scroll = this.$refs.scrollListener;
                // let drawH = scroll.offsetHeight * 3;
                this.$store.state.boxScroll = scroll.scrollTop;
                // 计算渲染数量
                // 获取1rem
                // let html = document.getElementsByTagName("html"),
                //     rem = Number.parseFloat(window.getComputedStyle(html[0]).fontSize.slice(0, -2)),
                    // itemHeight = 0;
                // 计算单个item高度
                // if(this.ArtifactsList.length > 0){
                //     itemHeight = document.getElementsByClassName("ArtifactsBox")[0].offsetHeight + 1.5 * rem;
                // }else{
                //     (this.userSetting.listBriefMode === true) ? itemHeight = 8.1875 * rem: itemHeight = 19.3125 * rem;
                // }
                // 计算渲染列表
                // 计算下方填充
                // console.log(drawH + " " + itemHeight + " " + Math.floor(drawH/itemHeight));
                // this.fillbottom = scroll.scrollTop;
            })
            // 监听窗口大小
            window.addEventListener("resize", this.getFillCount);
            this.getFillCount();
        },
        beforeUnmount() {
            // 移除监听器
            window.removeEventListener("resize", this.getFillCount);
        },
        computed: {
            ArtifactScore() {
                let mode = this.userSetting.scoreConfig.mode,
                    index = this.$artifact.artifactIndex(this.showSymbol);
                this.ArtifactsList[index]; // 监听当前圣遗物数据，更新评分视图用
                if (mode === "string") {
                    return this.$artifact.ArtifactScore(index, this.userSetting.scoreConfig.strRule).toFixed(2);
                } else if (mode === "array") {
                    return this.$artifact.ArtifactScore(index, this.userSetting.scoreConfig.arrRule).toFixed(2);
                } else {
                    return 0;
                }
            }
        },
        watch: {
            showSymbol(val) {
                if (val === "") {
                    return;
                }
                let index = this.$artifact.artifactIndex(val);
                this.setRadarChart();
                if (index >= 0) this.showDetail = JSON.parse(JSON.stringify(this.ArtifactsList[index]));
            },
            ArtifactsList() {
                this.setRadarChart();
                this.getFillCount();
                if (this.showSymbol !== "") this.showDetail = JSON.parse(JSON.stringify(this.ArtifactsList[this
                    .$artifact.artifactIndex(this.showSymbol)]));
            },
            userSetting: {
                handler(val) {
                    if (this.showSymbol !== "" && val.filterPart !== "default" && this.ArtifactsList[this.$artifact
                            .artifactIndex(this.showSymbol)]
                        .part !== val.filterPart) this.showSymbol = "";
                    if (this.showSymbol !== "" && val.filterMain !== "default" && this.ArtifactsList[this.$artifact
                            .artifactIndex(this.showSymbol)]
                        .mainEntry !== val.filterMain) this.showSymbol = "";
                    this.changeSetting();
                },
                deep: true
            }
        },
        methods: {
            start() {
                this.$artifact.creatArtifact();
                this.syncListData();
                this.alertControl("随机圣遗物已生成！", 1500);
            },
            // 自选圣遗物
            cusCreatArtifact() {
                let cusEntryValue = [],
                    cusEntry = [];
                for (let i = 0; i < this.cusEntry.length; i++) {
                    cusEntry.push(this.cusEntry[i]);
                    cusEntryValue.push(this.cusEntryRate[cusEntry[i]]);
                }
                this.$artifact.creatArtifact(this.cusPart, this.cusMainEntry, cusEntry, cusEntryValue);
                this.syncListData();
                this.alertControl("自选圣遗物已生成！", 1500);
            },
            // 圣遗物升级
            ArtifactUpgrade(index, entry = "") {
                let res = this.$artifact.upgrade(index, entry, this.userSetting.entryQuality),
                    qualityAlert = "";
                if (Number.parseFloat(this.userSetting.entryQuality) !== -1) qualityAlert = "已启用副词条自选提升幅度！"
                this.syncListData();
                if (res === true) {
                    this.alertControl(`升级成功！${qualityAlert}`, 1500);
                } else {
                    this.alertControl("当前圣遗物已满级~", 1500, "warning");
                }
            },
            // 圣遗物评分
            ArtifactRate(index) {
                let mode = this.userSetting.scoreConfig.mode;
                if (mode === "string") {
                    return this.$artifact.ArtifactScore(index, this.userSetting.scoreConfig.strRule);
                } else if (mode === "array") {
                    return this.$artifact.ArtifactScore(index, this.userSetting.scoreConfig.arrRule);
                } else {
                    return 0;
                }
            },
            // 初始化圣遗物
            initArtifact(index) {
                let res = this.$artifact.reset(index);
                this.syncListData();
                if (res) {
                    this.alertControl("重置圣遗物成功~再试试手气吧", 1500);
                } else {
                    this.alertControl("该圣遗物已锁定！", 1500, "warning");
                }
            },
            // 清除结果列表
            ArtifactClear() {
                if (this.ArtifactsList.length === 0) {
                    this.alertControl("当前列表已经空了哦！", 1500, "warning");
                } else if (confirm("确认要清空圣遗物吗？\n**会保留上锁的圣遗物**\n请注意，此操作不可恢复！")) {
                    this.showSymbol = "";
                    this.$artifact.clearAll();
                    this.syncListData();
                }
            },
            // 删除圣遗物
            deleteArtifact(index) {
                let res = this.$artifact.deleteOne(index);
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
                if (!window.localStorage) {
                    alert("浏览器不支持localstorage");
                    return false;
                } else {
                    localStorage.userSetting = JSON.stringify(this.userSetting);
                    this.getFillCount();
                }
            },
            // 清除本地数据
            clearStorge() {
                if (confirm("确定要清除模拟器所有数据吗？\n重置后会重新加载页面。")) {
                    localStorage.clear();
                    this.ArtifactsList.length = 0;
                    this.$artifact.AUSList.length = 0;
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
            // 雷达图设置
            setRadarChart() {
                if (this.showSymbol === "") return false;
                let index = this.$artifact.artifactIndex(this.showSymbol),
                    opArr = this.ArtifactsList[index].entry,
                    opObj = {};
                for (let i = 0; i < opArr.length; i++) {
                    opObj[opArr[i][0]] = opArr[i][1];
                }
                if (this.echarts1 == undefined) this.echarts1 = this.$echarts.init(this.$refs.radarChartBox)
                if (this.echarts2 == undefined) this.echarts2 = this.$echarts.init(this.$refs.radarChartBox2)
                let entryValue = this.$artiConst.val.entryValue;
                this.radarChartOption = {
                    textStyle: {
                        fontFamily: "genshin-font"
                    },
                    radar: {
                        splitNumber: 7,
                        indicator: [{
                                name: '攻击力',
                                max: entryValue['ATKPer'][entryValue['ATKPer'].length - 1] * 6,
                                min: -5.8,
                                color: "#262626"
                            },
                            {
                                name: '暴击',
                                max: entryValue['critRate'][entryValue['critRate'].length - 1] * 6,
                                min: -3.9,
                                color: "#262626"
                            },
                            {
                                name: '暴伤',
                                max: entryValue['critDMG'][entryValue['critDMG'].length - 1] * 6,
                                min: -7.8,
                                color: "#262626"
                            },
                            {
                                name: '充能效率',
                                max: entryValue['energyRecharge'][entryValue['energyRecharge'].length - 1] * 6,
                                min: -6.5,
                                color: "#262626"
                            },
                            {
                                name: '元素精通',
                                max: entryValue['elementMastery'][entryValue['elementMastery'].length - 1] * 6,
                                min: -23,
                                color: "#262626"
                            },
                            {
                                name: '生命值',
                                max: entryValue['HPPer'][entryValue['HPPer'].length - 1] * 6,
                                min: -5.8,
                                color: "#262626"
                            },
                            {
                                name: '防御力',
                                max: entryValue['defPer'][entryValue['defPer'].length - 1] * 6,
                                min: -7.3,
                                color: "#262626"
                            }
                        ]
                    },
                    series: [{
                        name: "ArtifactRadar",
                        type: "radar",
                        areaStyle: {},
                        data: [{
                            value: [opObj["ATKPer"] || 0, opObj["critRate"] || 0, opObj[
                                "critDMG"] || 0, opObj["energyRecharge"] || 0, opObj[
                                "elementMastery"] || 0, opObj["HPPer"] || 0, opObj[
                                "defPer"] || 0],
                        }]
                    }]
                }
                this.radarChartOption && this.echarts1.setOption(this.radarChartOption);
                this.radarChartOption && this.echarts2.setOption(this.radarChartOption);
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
                }, time)
            },
            // 主属性筛选
            mainEntryfilter(val) {
                this.userSetting.filterMain = val;
            },
            // 排序
            sortList(index) {
                let sortMethod = ["lvasc", "lvdesc", "part", "main"];
                // symbol = this.showSymbol;
                this.$artifact.sortList(sortMethod[index]);
                this.syncListData();
            },
            // 展示界面副词条文字处理
            formatEntry(entry, value) {
                let resEntry = this.$artifact.toChinese(entry, "entry"),
                    resValue = this.$artifact.entryValFormat(entry, value);
                return resEntry + "+" + resValue;
            },
            // 修改并保存当前展示圣遗物序号
            changeShowSymbol(symbol) {
                this.showSymbol = symbol;
                this.$store.state.selectHistory = symbol;
            },
            // 同步数据
            syncListData() {
                this.ArtifactsList = [...this.$artifact.AUSList];
            },
            // 锁定/解锁
            lockChange(index) {
                this.$artifact.AUSList[index].lock = !this.$artifact.AUSList[index].lock;
                this.syncListData();
            },
            // 计算填充数量（flex）
            getFillCount() {
                // 这里我也不知道为什么要-6
                let containerWidth = this.$refs.scrollListener.offsetWidth - 24 - 6,
                    // 获1rem值
                    html = document.getElementsByTagName("html"),
                    rem = Number.parseFloat(window.getComputedStyle(html[0]).fontSize.slice(0, -2)),
                    // 计算圣遗物组件宽度
                    itemWidth = 11.25 * rem,
                    count = 0;
                // 计算每行能容纳的最大圣遗物数量
                this.itemMax = Math.floor(containerWidth / itemWidth);
                // 移动端只能放两个（移动端item宽度不一致，直接计算会有bug）
                if (containerWidth < 540) {
                    this.itemMax = 2;
                }
                // 计算需要填充的数量（flex布局-center，需要把组件挤到左边）
                // 计算出筛选出来的列表数量
                this.$artifact.AUSList.forEach(val => {
                    if (this.userSetting.filterMain !== "default") {
                        val.mainEntry === this.userSetting.filterMain ? count++ : null;
                    } else if (this.userSetting.filterPart !== "default") {
                        val.part === this.userSetting.filterPart ? count++ : null;
                    } else {
                        count++;
                    }
                })
                this.fillCount = this.itemMax - (count % this.itemMax);
                if (this.fillCount === this.itemMax) this.fillCount = 0;
                // 动态填充-测试
            }
        }
    }
</script>

<style lang="scss">
    #filltop {
        width: 100%;
    }

    #fillbottom {
        width: 100%;
    }
</style>