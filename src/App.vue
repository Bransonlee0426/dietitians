<template>
  <el-row id="app">
    <el-col :span="24">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: HelveticaNeue;
}
html,
body {

}
//messageBox
.el-message-box__wrapper {
  .el-message-box {
    @include mobile() {
      width: 280px;
    }
    .el-message-box__message {
      .messagebox_img {
        width: 30%;
        height: 30%;
      }
      p {
        line-height: 4;
      }
    }
  }
}
</style>
