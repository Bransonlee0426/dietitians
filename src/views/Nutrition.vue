<template>
  <el-container>
    <el-aside width="200px">
      <div class="side-bar">
        <router-link class="nav-link" v-for="(item) in navlinks" :key="item.text" :to="item.path">
          {{item.text}}
        </router-link>
      </div>
      <element-button
        class="logout-btn"
        @click="logout()"
        :btn_text="btn_text"
        :custClass="btn_class"></element-button>
    </el-aside>
    <el-main>
      <keep-alive :include="keep">
        <router-view @setKeep="setKeep" @removeKeep="removeKeep" />
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>

export default {
  data() {
    return {
      keep: [],
      btn_text: 'Logout',
      btn_class: 'orange',
      navlinks: [
        {
          path: '/nutrition/restaurants',
          text: '餐廳列表',
        },
        {
          path: '/nutrition/recommendSetList',
          text: '推薦套餐',
        },
        {
          path: '/nutrition/files',
          text: '檔案傳輸',
        },
      ],
    };
  },
  methods: {
    logout() {
      const vm = this;
      vm.$store.dispatch('userInfo/logout');
      vm.$router.push('/');
    },
    setKeep(keepName) {
      const vm = this;
      vm.keep.push(keepName);
    },
    removeKeep(keepName) {
      const vm = this;
      const newKeep = vm.keep.filter(ele => keepName !== ele);
      vm.keep = newKeep;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #005a4a;
  height: 100vh;
  .el-aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px 20px 0px;
    .side-bar{
      width: 100%;
    }
    .nav-link {
      @extend %link;
      display: flex;
      justify-content: center;
      font-size: 25px;
      margin:5px 0px;
      padding:15px;
      &:hover{
        background-color: #014b3d;
      }
    }
  }
  .logout-btn {
    width: 120px;
  }
  .el-main {
    display: flex;
    flex-direction: column;
    background-color: $basicBgc;
  }
}
</style>
