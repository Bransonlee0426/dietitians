<template>
  <el-row>
    <el-col>
      <el-button
        class="btn"
        :class="custClass"
        size="medium"
        @click="$emit('click')"
        native-type="submit"
        :disabled="isDisabled">
        {{btn_text}}
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'elementButton',
  props: {
    btn_text: String,
    isDisabled: Boolean,
    custClass: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @extend %loginBtn;
  width: 100%;
  border: 0px;
  text-align: center;
  @include mobile() {
    width: 120%;
    font-size: 10px;
  }
}
.orange {
  background-color: $btn-color;
  &:hover {
    background-color: $btn-hover;
    color: $white;
  }
  &:focus {
    background-color: $btn-hover;
    color: $white;
  }
}
.default{
  color:white;
  background-color: aquamarine;
}
.btn:disabled {
  color: #c0c0c0;
  border: solid 1px #c0c0c0;
  background-color: $basicBgc;
}
</style>
