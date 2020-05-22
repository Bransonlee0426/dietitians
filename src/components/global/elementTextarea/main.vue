<template>
  <div>
    <label for="textarea" class="textarea-title">{{labelName}}</label>
    <el-input
      id="textarea"
      type="textarea"
      :rows="4"
      :placeholder="placeholder"
      :maxlength="maxlength"
      v-model="textarea"
      @change="()=>{this.$emit('change',this.textarea)}"
      show-word-limit>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'elementTextarea',
  props: {
    labelName: null,
    placeholder: null,
    maxlength: null,
    textareaContent: null,
  },
  data() {
    return {
      textarea: this.textareaContent,
    };
  },
  watch: {
    textareaContent: {
      handler(newValue) {
        const vm = this;
        vm.textarea = newValue;
        vm.$emit('change', vm.textarea);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea-title {
  display:inline-block;
  margin: 10px 0px;
}
</style>
