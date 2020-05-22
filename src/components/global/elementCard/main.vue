<template>
  <el-card class="box-card" shadow="hover">
    <div class="header" slot="header">
      <span class="id" style="display:none">{{item.id}}</span>
      <span class="name">{{item.dish_name}}</span>
      <span v-if="caller === `restaurants`" class="name">{{item.Name}}</span>
      <el-button class="edit-btn" type="text" @click="cardButton1">{{cardButton1Text}}</el-button>
      <el-button v-if="cancel" class="edit-btn" type="text" @click="cardButton2">取消</el-button>
    </div>
    <ul v-if="caller === `dishes` ||  caller === `restaurants`" class="content-ul">
      <li class="content-li" v-for="(val, index) in showContent" :key="index">
        <div :class="[ caller === `dishes` ? width : '']">
          {{index}}:
        </div>
        <div>
          {{val}}
        </div>
      </li>
    </ul>
    <!------if-else-------->
    <ul v-else class="content-ul">
      <li class="content-li" v-for="(item, index) in showContent" :key="index">
        <h3 class="width">{{index}}</h3>
        <number-input
          v-model="showContent[index]"
          class="input"
          :placeholder="getPlaceholder(index)"
          :min='0'
          :max='maxValue(index)'
          size="small"
          @change="removePoint($event,index)"
          onkeydown="return event.keyCode !== 69"
          inline>
         </number-input>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'elementCard',
  props: {
    caller: String,
    item: [Object, Function],
    cancel: String,
    data: Array,
  },
  data() {
    return {
      width: 'width',
      contentItem: {},
      errorMsg: '',
      maxValue2Items: ['精緻糖份量(0-2)', '好油加成(0-2)'],
      maxValue5Items: ['高鉀餐星等(0-5)', '高纖餐星等(0-5)', '舒壓餐星等(0-5)'],
      intOnly: ['精緻糖份量(0-2)', '好油加成(0-2)', '高鉀餐星等(0-5)', '高纖餐星等(0-5)', '舒壓餐星等(0-5)'],
    };
  },
  created() {},
  mounted() {},
  computed: {
    showContent() {
      const vm = this;
      switch (vm.caller) {
        case 'dishes':
          vm.contentItem = Object.assign({}, vm.item);
          delete vm.contentItem.dish_name;
          delete vm.contentItem.dish_id;
          delete vm.contentItem.id;
          delete vm.contentItem.restaurant_id;
          delete vm.contentItem.restaurant_name;
          return vm.contentItem;
        case 'editdish':
          vm.contentItem = Object.assign({}, vm.item);
          delete vm.contentItem.dish_name;
          delete vm.contentItem.dish_id;
          delete vm.contentItem.id;
          delete vm.contentItem.restaurant_id;
          delete vm.contentItem.restaurant_name;
          delete vm.contentItem['醣類'];
          delete vm.contentItem['蛋白質(公克)'];
          delete vm.contentItem['脂肪(公克)'];
          delete vm.contentItem['熱量(大卡)'];
          delete vm.contentItem['醣類(百分比)'];
          delete vm.contentItem['蛋白質(百分比)'];
          delete vm.contentItem['脂肪(百分比)'];
          return vm.contentItem;
        case 'restaurants':
          return { 菜餚數量: vm.item.DishNutrients };
        default:
      }
      return vm.contentItem;
    },
    cardButton1Text() {
      const vm = this;
      switch (vm.caller) {
        case 'dishes':
          return '編輯';
        case 'editdish':
          return '完成';
        default:
          return '';
      }
    },
  },
  methods: {
    getPlaceholder(index) {
      const vm = this;
      if (vm.maxValue2Items.includes(index)) {
        return '0~2,請輸入整數位';
      } if (vm.maxValue5Items.includes(index)) {
        return '0~5,請輸入整數位';
      }
      return '0~9999.9,小數自動進位';
    },
    maxValue(index) {
      const vm = this;
      if (vm.maxValue2Items.includes(index)) {
        return 2;
      } if (vm.maxValue5Items.includes(index)) {
        return 5;
      }
      return 9999.9;
    },
    removePoint(event, index) {
      const vm = this;
      if (vm.intOnly.includes(index)) {
        if (event.toString().indexOf('.') === 1) {
          // eslint-disable-next-line no-alert
          alert(`${index}只能為整數`);
        }
      }
    },
    cardButton1() {
      const vm = this;
      switch (vm.caller) {
        case 'dishes':
          vm.$emit('editbtn', {
            id: vm.item.id,
            dish_name: vm.item.dish_name,
          });
          break;
        case 'editdish':
          vm.$emit('dishData', vm.contentItem, vm.item.id);
          break;
        default:
          break;
      }
    },
    cardButton2() {
      const vm = this;
      vm.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-card__header{
    padding: 10px;
    border-bottom: 1px solid rgb(218, 216, 216);
}
::v-deep .el-card__body{
    padding: 2px 8px 2px 8px;
}
.box-card {
  margin-bottom: 10px;
  background-color: #f0f0f0;
  .name {
    width: auto;
    font-size: 20px;
    line-height: 1.3;
    font-weight: bold;
    display: inline-block;
  }
  .edit-btn {
    float: right;
    padding: 5px;
    font-size: 16px;
    margin-left: 20px;
  }
  .content-ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .content-li {
      display: flex;
      line-height: 1.5;
      padding: 5px 0px;
      width: 50%;
      @include mobile() {
        width: 100%;
      }
    }
    .width {
      width: 40%;
      padding-top: auto;
      padding-bottom: auto;
    }
  }
}
</style>
