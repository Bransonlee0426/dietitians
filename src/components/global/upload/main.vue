<template>
  <el-row>
    <el-col>
      <h2 class="title">{{name}}</h2>
      <div class="el-upload__tip">{{tip_text}}</div>
      <element-button
        v-if="isDownload"
        class="download-btn"
        :custClass="custClass"
        :on-error="handleError"
        :btn_text="download_text"
        @click="download">
      </element-button>
      <el-upload
        :name="name"
        class="upload"
        action="#"
        :http-request="uploadSectionFile"
        :before-remove="beforeRemove"
        :limit="limit"
        :on-exceed="handleExceed"
        :accept="type"
        :file-list="fileList">
        <element-button :custClass="custClass" :btn_text="btn_text"></element-button>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'upload',
  props: {
    name: String,
    fileType: String,
    custClass: String,
    btn_text: String,
    tip_text: String,
    limit: Number,
    isDownload: Boolean,
  },
  data() {
    return {
      download_text: '點擊下載',
      fileList: [],
      type: {
        excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        image: 'image/*',
      },
    };
  },
  created() {
    const vm = this;
    function checkFileType() {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(vm.type)) {
        if (vm.fileType === key) {
          vm.type = value;
        }
      }
    }
    checkFileType();
  },
  computed: {},
  methods: {
    uploadSectionFile(param) {
      const vm = this;
      const formData = new window.FormData();
      formData.append('nutrient', param.file);
      vm.$dish.upload(
        formData,
        (res) => {
          vm.handleSuccess(res, param.file, vm.fileList);
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
          vm.handleError(param.file, vm.fileList);
        },
      );
    },
    handleSuccess(res, file, fileList) {
      const vm = this;
      fileList.push({ name: file.name });
      vm.$emit('files', file, fileList);
    },
    handleError() {
      const vm = this;
      vm.fileList = [];
      vm.$message({
        message: '上傳檔案失敗,請重新再試。',
        type: 'warning',
      });
    },
    handleExceed(files, fileList) {
      const vm = this;
      vm.$message({
        message: `當前限制選擇 1 個文件，本次選擇了 ${
          files.length
        } 個文件，共選擇了 ${files.length + fileList.length} 個文件`,
        type: 'warning',
      });
    },
    beforeRemove(file) {
      const vm = this;
      function fileList() {
        // eslint-disable-next-line no-unused-vars
        const myfilelist = vm.fileList.forEach((item, index) => {
          if (item.uid === file.uid) {
            vm.fileList.splice(index, 1);
          }
        });
      }
      return vm.$confirm(`確定移除 ${file.name}？`).then(() => {
        fileList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  color: $info;
  line-height: 2;
}

.download-btn {
  width: 120px;
  position: absolute;
  left: 150px;
  z-index: 1;
}
.upload {
  position: relative;
  width: 100%;
}
.el-upload__tip {
  font-style: italic;
  color: rgb(182, 62, 102);
  margin-bottom: 18px;
}
</style>
