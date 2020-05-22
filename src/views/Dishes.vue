<template>
  <el-row class="dishes-row">
    <el-col>
      <h2 class="title">{{restaurantName}}</h2>
    </el-col>
    <el-col class="cards-col">
      <trans-group class="cards-ul" :tag="tag">
        <li class="cards-li" v-for="(item,index) in data" :key="index">
          <element-card @editbtn="editbtn" :caller="caller" :item="item"></element-card>
        </li>
      </trans-group>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'dishes',
  data() {
    return {
      count: 0,
      restaurantName: '',
      restaurantID: JSON.parse(window.localStorage.getItem('restaurantID')),
      caller: 'dishes',
      data: [],
      dataForCreate: [],
      tag: 'ul',
    };
  },
  created() {
    const vm = this;
    if (vm.restaurantID === '') {
      vm.$router.push({
        name: 'restaurants',
      });
      return;
    }

    vm.$dish.GetDishNutrientsByRestaurant(
      vm.restaurantID,
      (res) => {
        vm.dataForCreate = res.data;
        vm.data = vm.$_dataParams(res.data);
        vm.restaurantName = vm.data[0].restaurant_name;
        // 測試用Function 刪除全餐廳dish的id
        // vm.deleteForTest();
      }, (err) => {
        console.log('err', err);
      },
    ).then(
      () => {
        vm.createDishNutrients();
        vm.scrollToDish();
      },
    );
  },
  mounted() {},
  methods: {
    createDishNutrients() {
      const vm = this;
      vm.data.forEach((ele) => {
        if (ele.id === '') {
          const obj = {
            dish_id: ele.dish_id,
            dietitian_id: '354af642-2afb-42f1-8de4-d5d29736c4d4',
            starch_products: 0,
            low_meats: 0,
            medium_meats: 0,
            high_meats: 0,
            dairy_products: 0,
            vegetables: 0,
            fruits: 0,
            fats: 0,
            simple_sugars: 0,
            oils: 0,
            high_fiber: 0,
            high_potassium: 0,
            relaxed_meal: 0,
            is_faker: 0,
          };
          vm.$dish.createDishNutrients(
            obj,
            (res) => {
              // 把id塞回原來空id的data
              vm.data.forEach((item) => {
                if (item.dish_id === res.data.dish_id) {
                  // eslint-disable-next-line no-param-reassign
                  item.id = res.data.id;
                }
              });
            },
            (err) => {
              console.log('err', err);
            },
          );
        }
      });
    },
    deleteForTest() {
      const vm = this;
      vm.data.forEach((ele) => {
        if (ele !== '') {
          vm.$dish.deleteDishNutrient(
            ele.id,
            (res) => {
              console.log('res', res);
            }, (err) => {
              console.log('err', err);
            },
          );
        }
      });
    },
    scrollToDish() {
      const vm = this;
      const selectDish = vm.$store.state.products.id;
      const el = document.querySelectorAll('span.id');
      const topEl = document.querySelector('.dishes-row');
      if (selectDish !== '') {
        el.forEach((element) => {
          if (element.innerHTML === selectDish) {
            element.parentNode.parentNode.parentNode.scrollIntoView({
              behavior: 'smooth',
            });
          }
        });
        vm.$store.dispatch('products/delData');
      } else {
        topEl.scrollIntoView(true);
      }
    },
    editbtn(val) {
      const vm = this;
      vm.$store.dispatch('products/setData', {
        id: val.id,
      });
      window.localStorage.setItem('editDishId', JSON.stringify(val.id));
      vm.$router.push({
        name: 'editDish',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dishes-row {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  .cards-ul {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .cards-li {
      width: 49%;
      padding: 5px;
      @include pc-width-below() {
        width: 100vw;
      }
    }
  }
  .title {
    color: $info;
    font-size: 45px;
    text-align: center;
  }
}
</style>
