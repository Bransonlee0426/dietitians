<template>
  <el-row class="input-userInfo-login">
    <el-col>
      <prompt-intput
        title="帳號"
        placeholder="請輸入帳號"
        v-model="userInfo.account"
        type="mail"
        :errorMsg="errorMsg">
      </prompt-intput>
    </el-col>
    <el-col>
      <prompt-intput
        title="密碼"
        placeholder="請輸入密碼"
        v-model="userInfo.password"
        type="password"
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
  created() {},
  mounted() {},
  methods: {},
  wathc: {},
};
</script>

<style scoped lang="scss">
.input-userInfo-login {
  width: 93%;
}
</style>
