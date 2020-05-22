<template>
  <div>
    <label for="img">圖片</label>
    <el-image id="img" :z-index="5" :src="url">
      <div slot="error" class="image-slot"></div>
    </el-image>
    <el-button @click="chooseImage" class="btn" icon="el-icon-picture" circle></el-button>
    <input
      @input="onSelectFile"
      type="file"
      ref="fileInput"
      class="file-input"
      accept="image/jpeg,.png">
  </div>
</template>

<script>
export default {
  name: 'chooseImg',
  props: {},
  data() {
    return {
      url: '',
    };
  },
  methods: {
    chooseImage() {
      const vm = this;
      vm.$refs.fileInput.click();
    },
    onSelectFile() {
      const vm = this;
      const input = vm.$refs.fileInput;
      const { files } = input;
      const fileSize = files[0].size;
      if (fileSize > 2048000) {
        // eslint-disable-next-line no-alert
        alert('圖片檔案太大請重新上傳'); // 最大size 2M
        return;
      }
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          vm.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        vm.$emit('input', files[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-image {
  width: 100%;
  height: 137px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.btn {
  position: absolute;
  z-index: 100;
  top:38%;
  right: 21%;
  width: 50px;
  height: 50px;
}
.file-input {
  display: none;
}
</style>
