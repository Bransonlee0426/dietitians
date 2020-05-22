<template>
  <div class="container-imgCard">
    <i
      v-if="cancelbtn"
      class="cancelBtn fas fa-times-circle fa-lg"
      @click="()=>{this.$emit('click')}">
    </i>
    <el-checkbox
      class="checkbox"
      v-if="checkbox"
      v-model="checked"
      @change="clickCard($event)">
    </el-checkbox>
    <el-card :body-style="{ padding: '0px' }">
      <img :src="imgSrc()" class="image" :style="{cursor: pointer}">
      <el-row class="content">
        <el-col :span="20">
          <span>{{data.dish_name}}</span>
          <!-- <h1 class="title">漢堡好好吃</h1> -->
        </el-col>
        <el-col class="content-right" :span="4">
          <el-popover placement="top-start" width="300" trigger="click">
            <slot name="popoverContent"></slot>
            <el-button slot="reference" icon="el-icon-search" circle @click.stop></el-button>
          </el-popover>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'imgCard',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    cancelbtn: {
      type: Boolean,
      default: false,
    },
    checkbox: {
      type: Boolean,
      default: false,
    },
    pointer: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  created() {},
  methods: {
    imgSrc() {
      const vm = this;
      const randomNum = Math.random();
      return `https://s3-ap-northeast-1.amazonaws.com/dishrank-dish-images/${vm.data.restaurant_id}/${vm.data.dish_id}/${vm.data.image_file}?${randomNum}`;
    },
    clickCard(checked) {
      const vm = this;
      const selectData = {
        data: vm.data,
        check: checked,
      };
      vm.$emit('clickCard', selectData);
    },
  },
};
</script>

<style lang="scss" scoped>
.container-imgCard {
  width: 220px;
  position: relative;

  &:hover {
    opacity: 0.8;
  }
  .cancelBtn {
    width: 15px;
    height: 15px;
    right: 0px;
    top: -5px;
    position: absolute;
    color: red;
    background-color: white;
    padding: 0px;
    border-radius: 999em;
    cursor: pointer;
    &:hover {
      color: rgb(253, 119, 119);
    }
  }
  .checkbox {
    padding-right: 6px;
    padding-top: 6px;
    text-align: right;
    width: 97%;
    height: 75%;
    position: absolute;
  }
  ::v-deep.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #005a4a;
    border-color: #005a4a;
  }
  ::v-deep.el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #005a4a;
  }
  ::v-deep.el-checkbox__inner {
    border-radius: 999em;
    &:hover {
      border-color: #005a4a;
    }
  }
  .image {
    width: 100%;
    height: 180px;
    object-fit: fill;
    display: block;
  }
  .content {
    padding: 8px;
    display: flex;
    flex-direction: row;
    line-height: 1.5;
    .content-right {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
