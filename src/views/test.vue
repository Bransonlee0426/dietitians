<template>
  <el-row>
    <el-col>{{ number }}</el-col>
    <el-col class="big-area">
    </el-col>
    <transition name="fade">
      <el-col
        v-show="show"
        class="one-box"
      ></el-col>
    </transition>
    <transition name="fade">
      <el-col
        v-show="show"
        class="one-box"
      ></el-col>
    </transition>
    <transition name="fade">
      <el-col
        v-show="show"
        class="one-box"
      ></el-col>
    </transition>
    <el-col class="big-area">
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
      show: false,
    };
  },
  mounted() {
    const vm = this;
    window.addEventListener('scroll', this.handleScroll, true);
    vm.count();
  },
  methods: {
    count() {
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        this.number = current;
        if (current === 500) {
          clearInterval(timer);
        }
      }, 0);
    },
    handleScroll(event) {
      const vm = this;
      const scrollPosition = event.target.scrollTop;
      if (scrollPosition > 750) {
        vm.show = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
%box {
  width: 300px;
  height: 300px;
  background-color: rgb(130, 131, 131);
}
.big-area {
  width: 100%;
  height: 1200px;
  background-color: darkgoldenrod;
}
.one-box {
  @extend %box;
  margin: 10px;
  transition: all 0.5s;
}

.fade-enter-active {
  opacity: 0;
  transition: opacity 0.1s;
  transform: translateY(100px);
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    margin-top: 300px;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
}
</style>
