<template>
  <div class="container">
    <i class="fas fa-search search-icon"></i>
    <input
      class="searchbar"
      type="text"
      v-model="search"
      placeholder="輸入餐廳名稱"
    >
    <trans-group
      class="rest-ul"
      :tag="tag"
    >
      <li
        class="rest-li"
        v-for="(item,index) in list"
        :key="index"
      >
        <div @click="toDishes(item.ID)">
          <element-card
            :caller="caller"
            :item="item"
          ></element-card>
        </div>
      </li>
    </trans-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurantsArray: [],
      search: '',
      caller: 'restaurants',
      tag: 'ul',
    };
  },
  created() {
    const vm = this;
    vm.$dish.AllNutData(
      (res) => {
        Object.keys(res.data).forEach((objectKey) => {
          const value = res.data[objectKey];
          vm.restaurantsArray.push(value);
        });
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    );
  },
  computed: {
    list() {
      const vm = this;
      return vm.restaurantsArray.filter(
        item => item.Name.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1,
      );
    },
  },
  methods: {
    toDishes(restaurantID) {
      const vm = this;
      window.localStorage.setItem('restaurantID', JSON.stringify(restaurantID));
      vm.$router.push({ name: 'dishes' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 10px;
  .search-icon {
    margin: 0px 10px;
  }
  .searchbar {
    line-height: 30px;
    border: 0px;
    border-bottom: 1px solid #979797;
    border-radius: 0px;
    background-color: transparent;
    font-size: 16px;
    &::placeholder {
      color: #9b9b9b;
    }
  }
  .rest-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 10px;
    .rest-li {
      width: 280px;
      padding: 3px;
    }
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
