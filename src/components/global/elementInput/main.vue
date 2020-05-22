<template>
  <div>
    <label for="input">{{labelName}}</label>
    <el-input
      id="input"
      v-model="input"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @change="()=>{this.$emit('change',this.input)}"
      show-word-limit>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'elementInput',
  props: {
    placeholder: null,
    labelName: null,
    maxlength: null,
    inputContent: null,
  },
  data() {
    return {
      input: this.inputContent,
    };
  },
  watch: {
    inputContent: {
      handler(newValue) {
        const vm = this;
        vm.input = newValue;
        vm.$emit('change', vm.input);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 250px;
}
</style>
