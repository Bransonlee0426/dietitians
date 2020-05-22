<template>
  <el-row class="container" type="flex" justify="center" align="middle">
    <el-col class="logo" :span="5" :xs="{span: 18}">
      <element-image :imageURL="logo"></element-image>
    </el-col>
    <el-col class="clock" :span="3" :xs="{span: 8}">
      <element-image :imageURL="icon"></element-image>
    </el-col>
    <el-col class="remindwords" :span="7" :xs="{span: 24}">
      <div>{{errMsg}}</div>
    </el-col>
    <el-col class="btn" :span="6" :xs="{span: 8}">
      <element-button
        @click="getVerifyCode()"
        :btn_text="btn_Text"
        :custClass="btn_class">
      </element-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      // imageURL
      logo: 'logo',
      icon: 'clock',
      //
      // buttons
      btn_Text: '取得驗證碼',
      btn_class: 'orange',
      //
      errMsg: '',
    };
  },
  created() {
    const vm = this;
    vm.errMsg = vm.$_msgContent('vertifyExpired');
  },
  computed: {},
  methods: {
    getVerifyCode() {
      const vm = this;
      vm.$_messageBox('mail')
        .then()
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  background-color: $basicBgc;
  height: 100vh;
  .logo {
    margin-top: -120px;
    margin-bottom: 80px;
  }
  .clock {
    margin-bottom: 50px;
  }
  .remindwords {
    text-align: center;
    margin-bottom: 50px;
    color: $info;
    line-height: 2;
  }
  .btn {
    text-align: center;
  }
}
</style>
