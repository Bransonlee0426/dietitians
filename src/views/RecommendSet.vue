<template>
  <div class="container">
    <el-row class="title-row">
      <el-col class="bar-title" :span="12">
        <h1>{{titleText}}</h1>
        <h2>{{getCurrentDate}}</h2>
      </el-col>
      <el-col class="functionbar" :span="12">
        <function-button :funbtnType="funbtnType" @click="functionBtn"></function-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <element-select
          labelName="餐廳名稱："
          :options="restaurants"
          :disabled="disabled"
          placeholder="請選擇餐廳(必填)"
          :selectValue="restaurantName"
          @change="handleOption($event)"
        ></element-select>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-row>
      <el-col class="inputAndtextare-col" :span="12">
        <div>
          <element-input
            labelName="推薦套餐名稱："
            placeholder="請輸入推薦套餐名稱(必填)"
            maxlength="50"
            :inputContent="recommendSetName"
            @change="handleInput($event)"
          ></element-input>
        </div>
        <div>
          <element-textarea
            labelName="營養師評論："
            placeholder="請填寫評論內容"
            maxlength="300"
            :textareaContent="textareaContent"
            @change="handleTextarea($event)"
          ></element-textarea>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="img">
          <!-- <choose-img></choose-img> -->
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="bgc-color" :span="24">
        <div>套餐營養資訊：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <info-card :title="`食材份量`" :data="foodIngre"></info-card>
      </el-col>
      <el-col :span="12">
        <info-card :title="`營養組成`" :data="nutriIngre"></info-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="bgc-color" :span="24">
        <div>套餐菜餚項⽬：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="dishCard">
          <img-card
            class="imgcard"
            v-for="(item, index) in dishesArr"
            :key="index"
            :cancelbtn="true"
            :data="item"
            @click="handleDishCards(index)"
          >
            <template v-slot:popoverContent>
              <info-card :title="`食材份量`" :data="item.foodIngre"></info-card>
              <info-card :title="`營養組成`" :data="item.nutriIngre"></info-card>
              <info-card :title="`補充資料`" :data="item.additional"></info-card>
            </template>
          </img-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="addNewDishbtn-col" :span="24">
        <element-button
          class="addNewDish-btn"
          btn_text="加入新菜餚"
          custClass="orange"
          @click="handleAddNewDishBtn()"
          :isDisabled="addDishDisabled"
        ></element-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'recommendSet',
  props: {
    dishlist: {
      type: Array,
      default() {
        return [];
      },
    },
    originalData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      restaurantName: {
        restaurant_id: '',
        restaurant_name: '',
      },
      recommendSetName: null,
      textareaContent: null,
      dishesArr: [],
      dishesArrWithNoParams: [],
      disabled: false,
      funbtnType: [],
      initData: [this.$route.params.funbtn],
      from: this.$route.params.status,
      restaurants: [],
      currentRestaurantID: '',
      addDishDisabled: true,
      dishID: [],
      starch_productsSum: 0,
      low_meatsSum: 0,
      medium_meatsSum: 0,
      high_meatsSum: 0,
      dairy_productsSum: 0,
      vegetablesSum: 0,
      fruitsSum: 0,
      fatsSum: 0,
      simple_sugarsSum: 0,
      oilsSum: 0,
      sugar_gramSum: 0,
      protein_gramSum: 0,
      fats_gramSum: 0,
      calorieSum: 0,
      SPFtotal: 0,
      sugar_percentage: 0,
      protein_percentage: 0,
      fats_percentage: 0,
      tatalPercentage: 0,
      recommendSetData: {
        restaurant_id: this.currentRestaurantID,
        name: this.recommendSetName,
        comments: this.textareaContent,
        dish_list: this.dishID,
      },
      initRecommendSetData: {
        restaurant_id: '',
        name: null,
        comments: null,
        dish_list: [],
      },
      api_getOneDish: {},
      updated_at: '',
      restaurant_id: '',
      dishIDForEdit: [],
      recommendSetId: JSON.parse(window.localStorage.getItem('recommendSetId')),
      showNotSave: true,
    };
  },
  created() {
    const vm = this;
    // 新增或編輯
    if (vm.recommendSetId) {
      vm.funbtnType = ['save', 'cancel', 'delete'];
      vm.api_getOneDish = vm.$dishSet.getOneDish(
        vm.recommendSetId,
        (res) => {
          vm.disabled = true;
          vm.restaurantName.restaurant_name = res.data.restaurant_name;
          vm.restaurantName.restaurant_id = res.data.restaurant_id;
          vm.recommendSetName = res.data.name;
          vm.textareaContent = res.data.comments;
          vm.updated_at = res.data.updated_at;
          vm.restaurant_id = res.data.restaurant_id;
          res.data.dish_list.forEach((ele) => {
            vm.dishIDForEdit.push(ele.dish_id);
          });
          // copydata
          vm.initRecommendSetData.restaurant_id = res.data.restaurant_id;
          vm.initRecommendSetData.name = res.data.name;
          vm.initRecommendSetData.comments = res.data.comments;
          vm.initRecommendSetData.dish_list = vm.dishIDForEdit;
        }, (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
      );
    } else {
      vm.funbtnType = ['save', 'cancel'];
      vm.$dish.AllNutData(
        (res) => {
          Object.keys(res.data).forEach((objectKey) => {
            const value = res.data[objectKey];
            const restaurantId = {
              ID: value.ID,
              Name: value.Name,
            };
            vm.restaurants.push(restaurantId);
          });
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log('err', err);
        },
      );
    }
  },
  mounted() {
    const vm = this;
    vm.$emit('setKeep', 'recommendSet');
    if (vm.recommendSetId) {
      vm.$_promiseAll(
        [vm.api_getOneDish],
        () => {
          vm.$dish.GetDishNutrientsByRestaurant(
            vm.restaurant_id,
            (res) => {
              res.data.forEach((ele) => {
                vm.originalData.push(ele);
                if (vm.dishIDForEdit.includes(ele.dish_id)) {
                  vm.dishlist.push(ele);
                }
              });
            }, (err) => {
              // eslint-disable-next-line no-console
              console.log('err', err);
            },
          );
        },
      );
    }
  },
  computed: {
    getCurrentDate() {
      const vm = this;
      if (vm.recommendSetId) {
        return `最後編輯時間:${vm.$moment(vm.updated_at).format('YYYY/MM/DD hh:mm')}`;
      }
      return `建立時間:${vm.$moment(new Date()).format('YYYY/MM/DD hh:mm')}`;
    },
    titleText() {
      const vm = this;
      if (vm.from === 'Create') {
        return '新增推薦套餐';
      }
      return '編輯推薦套餐';
    },
    foodIngre() {
      const vm = this;
      //  params畫面上的資料總合
      const foodIngreArr = [
        `全殼根莖份量:${vm.starch_productsSum}`,
        `低脂肉份量: ${vm.low_meatsSum}`,
        `中脂肉份量: ${vm.medium_meatsSum}`,
        `高脂肉份量: ${vm.high_meatsSum}`,
        `全脂奶: ${vm.dairy_productsSum}`,
        `蔬菜份量: ${vm.vegetablesSum}`,
        `水果份量: ${vm.fruitsSum}`,
        `油脂: ${vm.fatsSum}`,
        `精緻糖份量(0-2): ${vm.simple_sugarsSum}`,
        `好油加成(0-2): ${vm.oilsSum}`,
      ];
      return foodIngreArr;
    },
    nutriIngre() {
      const vm = this;
      const nutriIngreArr = [
        `醣類: ${vm.sugar_gramSum}g ( ${vm.sugar_percentage}% )`,
        `蛋⽩質: ${vm.protein_gramSum}g ( ${vm.protein_percentage}% )`,
        `脂肪: ${vm.fats_gramSum}g ( ${vm.fats_percentage}% )`,
        `熱量: ${vm.calorieSum} 大卡`,
      ];
      return nutriIngreArr;
    },
  },
  methods: {
    functionBtn(name) {
      const vm = this;

      //  判斷空值的變數
      const isRestIdEmpty = vm.$_isDataEmpty(vm.currentRestaurantID);
      const isRecommendSetNameEmpty = vm.$_isDataEmpty(vm.recommendSetName);
      const isDishesEmpty = vm.$_isDataEmpty(vm.dishID);

      vm.ParamsRecommendSetData();
      switch (name) {
        case 'cancel':
          vm.$router.push({
            name: 'recommendSetList',
          });
          break;
        case 'save':
          // 判斷空值
          if (!isRestIdEmpty || !isRecommendSetNameEmpty) {
            vm.$_alertCheckFormEmpty('mustFillIn');
            return;
          }
          // 判斷空值
          if (!isDishesEmpty) {
            vm.$_alertCheckFormEmpty('atLeastOneDish');
            return;
          }
          if (!vm.recommendSetId) {
            vm.$dishSet.CreateDishSet(
              vm.recommendSetData,
              () => {
                vm.showNotSave = false;
                vm.$_successMessageBox('successAddRecommendSet', 'recommendSetList');
              },
              (err) => {
                // eslint-disable-next-line no-console
                console.log('err', err);
              },
            );
          } else if (vm.recommendSetId) {
            vm.$dishSet.updateDish(
              vm.recommendSetId,
              vm.recommendSetData,
              (res) => {
                vm.showNotSave = false;
                vm.$_successMessageBox('successUpdateRecommendSet', 'recommendSetList');
                // eslint-disable-next-line no-console
                console.log('res', res);
              }, (err) => {
                // eslint-disable-next-line no-console
                console.log('err', err);
              },
            );
          }
          break;
        case 'delete':
          if (vm.recommendSetId) {
            vm.$_doubleCheckMessageBox('checkDeleteRecommendSet').then(() => {
              vm.$dishSet.deleteDish(
                vm.recommendSetId,
                () => {
                  vm.showNotSave = false;
                  vm.$_successMessageBox('successDeleteRecommendSet', 'recommendSetList');
                }, (err) => {
                  // eslint-disable-next-line no-console
                  console.log('err', err);
                },
              );
            }).catch(() => {
              // eslint-disable-next-line no-console
              console.log('cancel');
            });
          }
          break;
        default:
          break;
      }
    },
    handleOption(restID) {
      const vm = this;
      vm.currentRestaurantID = restID;
    },
    handleInput(value) {
      const vm = this;
      vm.recommendSetName = value;
    },
    handleTextarea(value) {
      const vm = this;
      vm.textareaContent = value;
    },
    handleAddNewDishBtn() {
      const vm = this;
      vm.$router.push({
        name: 'dishSelect',
        params: {
          RestaurantID: vm.currentRestaurantID,
          dishlist: vm.dishesArr,
        },
      });
    },
    handleDishCards(index) {
      const vm = this;
      vm.dishesArr.splice(index, 1);
      vm.dishID.splice(index, 1);
    },
    matchDish() {
      const vm = this;
      vm.dishesArrWithNoParams = [];
      vm.originalData.forEach((ele) => {
        if (vm.dishID.includes(ele.dish_id)) {
          vm.dishesArrWithNoParams.push(ele);
        }
      });
      if (vm.dishesArrWithNoParams.length !== 0) {
        vm.starch_productsSum = vm.dishesArrWithNoParams
          .map(ele => ele.starch_products)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.low_meatsSum = vm.dishesArrWithNoParams
          .map(ele => ele.low_meats)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.medium_meatsSum = vm.dishesArrWithNoParams
          .map(ele => ele.medium_meats)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.high_meatsSum = vm.dishesArrWithNoParams
          .map(ele => ele.high_meats)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.dairy_productsSum = vm.dishesArrWithNoParams
          .map(ele => ele.dairy_products)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.vegetablesSum = vm.dishesArrWithNoParams
          .map(ele => ele.vegetables)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.fruitsSum = vm.dishesArrWithNoParams
          .map(ele => ele.fruits)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.fatsSum = vm.dishesArrWithNoParams
          .map(ele => ele.fats)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.simple_sugarsSum = vm.dishesArrWithNoParams
          .map(ele => ele.simple_sugars)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.oilsSum = vm.dishesArrWithNoParams
          .map(ele => ele.oils)
          .reduce((a, b) => a + b)
          .toFixed(1);
        vm.sugar_gramSum = vm.dishesArrWithNoParams
          .map(ele => ele.sugar_gram)
          .reduce((a, b) => a + b)
          .toFixed(2);
        vm.protein_gramSum = vm.dishesArrWithNoParams
          .map(ele => ele.protein_gram)
          .reduce((a, b) => a + b)
          .toFixed(2);
        vm.fats_gramSum = vm.dishesArrWithNoParams
          .map(ele => ele.fats_gram)
          .reduce((a, b) => a + b)
          .toFixed(2);
        vm.calorieSum = vm.dishesArrWithNoParams
          .map(ele => ele.calorie)
          .reduce((a, b) => a + b)
          .toFixed(2);
        vm.SPFtotal = +vm.protein_gramSum + +vm.fats_gramSum + +vm.sugar_gramSum;
        // 百分比
        vm.sugar_percentage = Math.round(
          (vm.sugar_gramSum * 4 / vm.calorieSum) * 100,
        ) || 0;
        vm.protein_percentage = Math.round(
          (vm.protein_gramSum * 4 / vm.calorieSum) * 100,
        ) || 0;
        vm.fats_percentage = Math.round(
          (vm.fats_gramSum * 9 / vm.calorieSum) * 100,
        ) || 0;
        // eslint-disable-next-line max-len
        vm.tatalPercentage = +(vm.sugar_percentage) + +(vm.protein_percentage) + +(vm.fats_percentage);
        if (vm.tatalPercentage !== 0) {
          if (vm.tatalPercentage > 100) {
            const differences = vm.tatalPercentage - 100;
            vm.fats_percentage -= differences;
          } else if (vm.tatalPercentage < 100) {
            const differences = 100 - vm.tatalPercentage;
            vm.fats_percentage += differences;
          }
        }
      } else {
        vm.starch_productsSum = 0;
        vm.low_meatsSum = 0;
        vm.medium_meatsSum = 0;
        vm.high_meatsSum = 0;
        vm.dairy_productsSum = 0;
        vm.vegetablesSum = 0;
        vm.fruitsSum = 0;
        vm.fatsSum = 0;
        vm.simple_sugarsSum = 0;
        vm.oilsSum = 0;
        vm.sugar_gramSum = 0;
        vm.protein_gramSum = 0;
        vm.fats_gramSum = 0;
        vm.calorieSum = 0;
        vm.SPFtotal = 0;
        vm.sugar_percentage = 0;
        vm.protein_percentage = 0;
        vm.fats_percentage = 0;
      }
    },
    ParamsRecommendSetData() {
      const vm = this;
      vm.recommendSetData.restaurant_id = vm.currentRestaurantID;
      vm.recommendSetData.name = vm.recommendSetName;
      vm.recommendSetData.comments = vm.textareaContent;
      vm.recommendSetData.dish_list = vm.dishID;
    },
  },
  watch: {
    currentRestaurantID: {
      immediate: true,
      handler(newValue) {
        const vm = this;
        if (newValue !== '') {
          vm.addDishDisabled = false;
        }
        // 餐廳變動清空dishes
        vm.dishesArr = [];
      },
    },
    // 從選餐那頁來的 Array
    dishlist: {
      immediate: true,
      handler(dishes) {
        const vm = this;
        vm.$_dataParamsForIngre(dishes).forEach((ele) => {
          vm.dishesArr.push(ele);
        });
      },
    },
    // show在此頁的dishes
    dishesArr: {
      immediate: true,
      handler(dishes) {
        const vm = this;
        dishes.forEach((ele) => {
          vm.dishID.push(ele.dish_id);
        });
        // 餐廳id不重複
        vm.dishID = Array.from(new Set(vm.dishID));
        vm.matchDish();
      },
    },
  },
  beforeRouteLeave(to, from, next) {
    const vm = this;
    // params目前的資料狀態
    vm.ParamsRecommendSetData();
    // 重新排列 dish排列順序才能判斷是否變動
    const recommendSetDataDishlist = vm.recommendSetData.dish_list;
    const initRecommendSetDataDishlist = vm.initRecommendSetData.dish_list;
    recommendSetDataDishlist.sort();
    initRecommendSetDataDishlist.sort();
    const copyRecommendSetData = JSON.stringify(vm.recommendSetData);
    const copyInitRecommendSetData = JSON.stringify(vm.initRecommendSetData);
    if (to.name !== 'dishSelect') {
      if (vm.showNotSave) {
        if (copyRecommendSetData !== copyInitRecommendSetData) {
          vm.$_doubleCheckMessageBox('checkLeaveRecommendSet').then(() => {
            next();
          }).catch(() => {

          });
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-width: 70vw;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-col {
    padding: 10px;
  }
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    .bar-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .functionbar {
      display: flex;
      justify-content: flex-end;
    }
  }
  .inputAndtextare-col {
  }
  .img {
    min-height: 152px;
  }
  .bgc-color {
    background-color: #f5f5f5;
  }
  .dishCard {
    display: flex;
    flex-wrap: wrap;
    .imgcard {
      margin: 5px;
    }
  }
  .addNewDishbtn-col {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0px;
    .addNewDish-btn {
      width: 150px;
    }
  }
}
</style>
