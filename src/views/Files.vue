<template>
  <el-row class="upload-row">
    <el-col class="upload-col" :span="24">
      <upload
        :name="name"
        :fileType="fileType"
        @files="uploadFiles"
        :limit="limit"
        :custClass="btn_class"
        :btn_text="btn_text"
        :tip_text="tip_text">
      </upload>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'files',
  data() {
    return {
      // upload
      name: '餐廳列表',
      fileType: 'excel',
      tip_text: '*支援格式為 Microsoft Excel™ 2007以及之後的版本',
      limit: 1,
      btn_text: '點擊上傳',
      btn_class: 'orange',
      //
    };
  },
  methods: {
    uploadFiles() {
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-row {
  padding-top: 20px;
  height: 50vh;
  display: flex;
  flex-direction: column;
}
.upload-col {
  height: 100%;
}
</style>
