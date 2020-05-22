<template>
  <div>
    <label for="elsel">{{labelName}}</label>
    <el-select
      class="sel"
      id="elsel"
      filterable
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="()=>{this.$emit('change',this.value)}"
    >
      <el-option v-for="(item) in options" :key="item.Name" :label="item.Name" :value="item.ID">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'elementSelect',
  props: {
    options: {
      type: Array,
      default: null,
    },
    labelName: {
      type: String,
      default: null,
    },
    placeholder: null,
    disabled: {
      type: Boolean,
      default: false,
    },
    selectValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  watch: {
    selectValue: {
      immediate: true,
      deep: true,
      handler(newValue) {
        const vm = this;
        vm.value = newValue.restaurant_name;
        vm.$emit('change', newValue.restaurant_id);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 220px;
}
</style>
