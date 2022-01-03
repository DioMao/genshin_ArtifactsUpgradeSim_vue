<template>
  <div class="modal fade" id="scoreSet" tabindex="-1" aria-labelledby="scoreSetting" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="scoreSetting">{{ $t('msg.scoreSetting') }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="highScoreRange" class="form-label">{{ $t('score.HighScoreStandard') }} {{ userSetting.highScore }}</label>
            <input type="range" class="form-range" min="20" max="50" id="highScoreRange" v-model="userSetting.highScore" />
          </div>
          <div class="mb-3">
            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode1" value="string" v-model="userSetting.scoreConfig.mode" />
            <label class="form-check-label me-5" for="scoreMode1">
              {{ $t('score.preset') }}
            </label>
            <input class="form-check-input" type="radio" name="scoreMode" id="scoreMode2" value="array" v-model="userSetting.scoreConfig.mode" />
            <label class="form-check-label" for="scoreMode2">
              {{ $t('score.optional') }}
            </label>
          </div>
          <div v-show="userSetting.scoreConfig.mode === 'string'">
            <select class="form-select form-select-sm" name="scoreString" id="scoreString" v-model="userSetting.scoreConfig.strRule">
              <option value="default">{{ $t('msg.default') }}</option>
              <option v-for="config in $artiConst.val.scoreList" :key="config" :value="config">{{ $artifact.toChinese(config, 'score') }}</option>
            </select>
          </div>
          <div class="justify-content-between flex-wrap" style="display: flex" v-show="userSetting.scoreConfig.mode === 'array'">
            <div class="form-check" style="width: 40%" v-for="config in $artiConst.val.scoreList" :key="config">
              <input class="form-check-input" type="checkbox" :value="config" :id="'score-' + config" v-model="userSetting.scoreConfig.arrRule" />
              <label class="form-check-label" :for="'score-' + config">
                {{ $artifact.toChinese(config, 'score') }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {useStore} from 'vuex';

  const store = useStore();
  const userSetting = store.state.userSetting;
</script>

<style lang="scss" scoped></style>
