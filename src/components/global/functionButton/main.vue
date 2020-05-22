<template>
  <el-row>
    <el-col>
      <el-button
        type="text"
        v-for="(item,index) in functionType"
        :key="index"
        @click="funbtnclick(item.name)"
      >
        <i :class="item.icon"></i>
        <div>{{item.title}}</div>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'functionButton',
  props: {
    funbtnType: Array,
  },
  data() {
    return {
      funbtnArray: [
        {
          name: 'cancel',
          title: '取消',
          icon: 'fas fa-times fa-2x',
        },
        {
          name: 'save',
          title: '儲存',
          icon: 'fas fa-save fa-2x',
        },
        {
          name: 'delete',
          title: '刪除',
          icon: 'fas fa-trash-alt fa-2x',
        },
      ],
    };
  },

  methods: {
    funbtnclick(name) {
      const vm = this;
      vm.$emit('click', name);
    },
  },
  computed: {
    functionType() {
      const vm = this;
      const funbtn = [];
      vm.funbtnArray.forEach((ele, index, arr) => {
        if (vm.funbtnType.includes(ele.name)) {
          funbtn.push(arr[index]);
        }
      });
      return funbtn;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
}
.el-button--text {
  color: $info;
  margin: 0px 10px;
  &:hover {
    color: $btn-hover;
  }
  &:focus {
    color: $btn-hover;
  }
}
</style>
