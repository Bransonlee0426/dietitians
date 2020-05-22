<template>
  <el-row class="confirm-email">
    <el-col>
      <prompt-intput
        title="新密碼"
        placeholder="請輸入密碼"
        v-model="userInfo.newPassword"
        type="password">
      </prompt-intput>
    </el-col>
    <el-col>
      <prompt-intput
        title="確認密碼"
        placeholder="請再次輸入密碼"
        v-model="userInfo.newPasswordConfirm"
        type="password" :errorMsg="errorMsg">
      </prompt-intput>
    </el-col>
  </el-row>
</template>
<script>
export default {
  components: {},
  props: {
    userInfo: Object,
    errorMsg: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  wathc: {},
};
</script>

<style scoped lang="scss">
.confirm-email {
  width: 93%;
  padding-top: 50px;
  .remind-words {
    color: $info;
    font-size: 20px;
    text-align: center;
  }
}
</style>
