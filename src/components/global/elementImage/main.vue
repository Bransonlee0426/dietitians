<template>
  <div>
    <el-image class="image" :src="imagePath" :fit="fit"></el-image>
  </div>
</template>

<script>
const logo = require('../../../assets/png/login/Logo.png');
const clock = require('../../../assets/png/verify/clock.png');
const screen = require('../../../assets/png/verify/screen.png');

export default {
  name: 'elementImage',
  props: {
    imageURL: String,
  },
  data() {
    return {
      fit: 'contain',
    };
  },
  created() {},
  computed: {
    imagePath() {
      const vm = this;
      switch (vm.imageURL) {
        case 'logo':
          return logo;
        case 'clock':
          return clock;
        case 'screen':
          return screen;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
}
</style>
