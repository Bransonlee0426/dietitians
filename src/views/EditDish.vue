<template>
  <el-row class="editdish-row">
    <el-col class="editdish-col">
      <trans name="slide-fade" appear>
        <element-card v-show="item"
               @cancel="cancelbtn"
               @dishData="dishData"
               :item="item"
               :caller="caller"
               :buttonTo="button1"
               :cancel="button2"></element-card>
      </trans>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      id: JSON.parse(window.localStorage.getItem('editDishId')),
      formData: {},
      item: Object,
      caller: 'editdish',
      data: [],
      button1: 'editDish',
      button2: 'cancel',
      tag: 'el-col',
    };
  },
  created() {
    const vm = this;
    if (vm.id === undefined) {
      vm.$router.push({
        name: 'restaurants',
      });
      return;
    }
    vm.$dish.getDishNutirents(
      vm.id,
      (res) => {
        vm.item = vm.$_dataParams(res.data);
      },
      (err) => {
        console.log('err', err);
      },
    );
  },
  methods: {
    dishData(data, id) {
      const vm = this;
      vm.formData = vm.dishDataParams(data);
      vm.$dish.editDish(
        id,
        vm.formData,
        (res) => {
          const restaurantID = res.data.restaurant_id;
          vm.$router.push({
            name: 'dishes',
            params: { restaurantID },
          });
        },
        (err) => {
          alert('請檢查輸入值是否正確!');
          console.log('err', err);
        },
      );
    },
    dishDataParams(data) {
      const dishData = {
        starch_products: +data.全殼根莖份量,
        low_meats: +data.低脂肉份量,
        medium_meats: +data.中脂肉份量,
        high_meats: +data.高脂肉份量,
        dairy_products: +data.全脂奶,
        vegetables: +data.蔬菜份量,
        fruits: +data.水果份量,
        fats: +data.油脂,
        simple_sugars: +data['精緻糖份量(0-2)'],
        oils: +data['好油加成(0-2)'],
        high_fiber: +data['高纖餐星等(0-5)'],
        high_potassium: +data['高鉀餐星等(0-5)'],
        relaxed_meal: +data['舒壓餐星等(0-5)'],
      };
      return dishData;
    },
    cancelbtn() {
      const vm = this;
      const restaurantID = vm.item.restaurant_id;
      vm.$router.push({ name: 'dishes', params: { restaurantID } });
    },
  },
};
</script>

<style lang="scss" scoped>
.editdish-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  .editdish-col {
    width: 800px;
  }
}
</style>
