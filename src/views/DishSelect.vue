<template>
  <div class="dishselect-container">
    <el-row class="title-row">
      <el-col class="bar-title" :span="12">
        <h1 class="title">菜餚清單</h1>
      </el-col>
      <el-col class="functionbar" :span="12">
        <function-button :funbtnType="funbtnType" @click="functionBtn"></function-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dishCard">
          <img-card
            class="imgcard"
            v-for="(item, index) in dishesArr"
            :data="item"
            :key="index"
            :checkbox="true"
            @clickCard="handleCard($event)"
            pointer="pointer">
            <div slot="popoverContent">
              <info-card :title="`食材份量`" :data="item.foodIngre"></info-card>
              <info-card :title="`營養組成`" :data="item.nutriIngre"></info-card>
              <info-card :title="`補充資料`" :data="item.additional"></info-card>
            </div>
          </img-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funbtnType: ['cancel', 'save'],
      originalData: [],
      remainingDishes: [],
      selectDish: [],
      dishID: [],
      selectDishId: [],
      selectDishWithNoParams: [],
    };
  },
  created() {
    const vm = this;
    // 已選的dishes
    vm.$route.params.dishlist.forEach((ele) => {
      vm.dishID.push(ele.dish_id);
    });
    vm.$dish.GetDishNutrientsByRestaurant(
      vm.$route.params.RestaurantID,
      (res) => {
        // copy最原始的資料結構
        vm.originalData = res.data;
        // 只顯示沒選到的dishes
        vm.originalData.forEach((ele) => {
          if (!vm.dishID.includes(ele.dish_id)) {
            vm.remainingDishes.push(ele);
          }
        });
      },
      (err) => {
        console.log('err', err);
      },
    );
  },
  methods: {
    functionBtn(name) {
      const vm = this;
      if (name === 'save') {
        vm.selectDishId = vm.selectDish.map(ele => ele.dish_id);
        vm.remainingDishes.forEach((ele) => {
          if (vm.selectDishId.includes(ele.dish_id)) {
            vm.selectDishWithNoParams.push(ele);
          }
        });
        vm.$router.replace({
          name: 'recommendSet',
          params: {
            dishlist: vm.selectDishWithNoParams,
            originalData: vm.originalData,
          },
        });
      } else {
        vm.$router.replace({
          name: 'recommendSet',
          params: {
            dishlist: vm.selectDishWithNoParams,
            originalData: vm.originalData,
          },
        });
        vm.$router.go('-1');
      }
    },
    handleCard(seleckData) {
      const vm = this;
      if (seleckData.check) {
        // 選擇
        vm.selectDish.push(seleckData.data);
      } else {
        // 沒選擇
        vm.selectDish.forEach((ele, index) => {
          if (seleckData.data.dish_id === ele.dish_id) {
            vm.selectDish.splice(index, 1);
          }
        });
      }
    },
  },
  computed: {
    dishesArr() {
      const vm = this;
      return vm.$_dataParamsForIngre(vm.remainingDishes);
    },
  },
};
</script>

<style lang="scss" scoped>
.dishselect-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .title{
      margin-left: 10px;
    }
  }
  .functionbar {
    display: flex;
    justify-content: flex-end;
  }
  .dishCard {
    display: flex;
    flex-wrap: wrap;
    .imgcard {
      margin: 5px;
    }
  }
}
</style>
