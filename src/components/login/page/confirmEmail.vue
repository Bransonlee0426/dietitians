<template>
  <el-row class="confirm-email">
    <el-col>
      <p class="remind-words">請輸入您的帳號信箱，我們相協助您重設密碼。</p>
    </el-col>
    <el-col>
      <prompt-intput
        title="Email"
        placeholder="請輸入Email"
        v-model="userInfo.email"
        type="mail"
        :errorMsg="errorMsg">
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
  padding-top: 30px;
  .remind-words {
    color: $info;
    font-size: 20px;
    text-align: center;
    line-height: 1;
  }
}
</style>
