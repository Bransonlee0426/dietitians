<template>
  <el-row class="container">
    <el-col :span="24">
      <span class="restaurant-name">餐廳名稱：</span>
      <el-select v-model="selectValue" clearable filterable placeholder="請選擇餐廳名稱">
        <el-option
          v-for="(item,index) in restauranDropdown"
          :key="index" :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-input
        v-model="tableDataName"
        placeholder="請輸入套餐名稱關鍵字"
        style="width:240px;margin-right:10px"
        maxlength="50">
      </el-input>
      <el-button type="primary" @click="createRecomSet">新增</el-button>
    </el-col>
    <el-col class="middle-col" :span="24">
      <el-table :data="tableDataEnd" border stripe :sum-text="test">
        <el-table-column prop="restaurant_name" label="餐廳名稱" min-width="180px">
        </el-table-column>
        <el-table-column prop="name" label="推薦套餐名稱" min-width="100px">
        </el-table-column>
        <el-table-column prop="updated_at" label="最後編輯時間" min-width="55px">
        </el-table-column>
        <el-table-column prop="feature" label="功能" width="77px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">編輯
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="totalItems">
      </el-pagination>
    </el-col>
  </el-row>

</template>

<script>
export default {
  data() {
    return {
      msg: '',
      dropdownArray: [],
      tableDataBegin: [],
      tableDataName: this.$store.state.setting.recommendSetListTableDataName,
      tableDataEnd: [],
      currentPage: this.$store.state.setting.recommendSetListCurrentPage,
      pageSize: this.$store.state.setting.recommendSetListPageSize,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      selectValue: this.$store.state.setting.recommendSetListSelectValue,
      isInitCurrentPage: false,
      test: '',
    };
  },
  created() {},
  mounted() {
    const vm = this;
    vm.$emit('removeKeep', 'recommendSet');
    vm.$dishSet.AllRecommendSet(
      (res) => {
        res.data.forEach((ele) => {
          // eslint-disable-next-line no-param-reassign
          ele.updated_at = vm.$moment(ele.updated_at).format('YYYY/MM/DD hh:mm');
          vm.tableDataBegin.push(ele);
        });
        // 列表長度及每頁顯示數目
        vm.totalItems = vm.tableDataBegin.length;
        if (vm.totalItems > vm.pageSize) {
          for (let index = 0; index < vm.pageSize; index += 1) {
            vm.tableDataEnd.push(vm.tableDataBegin[index]);
          }
        } else {
          vm.tableDataEnd = vm.tableDataBegin;
        }
        vm.$nextTick(() => {
          vm.isInitCurrentPage = false;
          vm.doFilter();
        });
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      },
    );
  },
  computed: {
    restauranDropdown() {
      const vm = this;
      const allRestaurantName = [];
      vm.tableDataBegin.forEach((ele) => {
        allRestaurantName.push(ele.restaurant_name);
      });
      vm.dropdownArray = Array.from(new Set(allRestaurantName));
      return vm.dropdownArray;
    },
  },
  methods: {
    doFilter() {
      const vm = this;
      vm.tableDataEnd = [];
      // 每次手動將數據置空,因為會出現多次點擊搜索情況
      vm.filterTableDataEnd = [];
      vm.tableDataBegin.forEach((value) => {
        if (vm.checkDropdown()) {
          // 有選餐廳時
          if (
            value.restaurant_name === vm.selectValue
            && value.name.indexOf(vm.tableDataName) >= 0
          ) {
            vm.filterTableDataEnd.push(value);
          }
        } else if (value.name.indexOf(vm.tableDataName) >= 0) {
          // 無選餐廳時
          vm.filterTableDataEnd.push(value);
        }
      });
      // 選取餐廳名稱改變重新統計數據數量和當前頁
      if (vm.isInitCurrentPage) {
        vm.currentPage = 1;
      }
      vm.totalItems = vm.filterTableDataEnd.length;
      // 渲染表格,根據值
      vm.currentChangePage(vm.filterTableDataEnd);
      // 頁面初始化數據需要判斷是否檢索過
      vm.flag = true;
    },
    checkDropdown() {
      const vm = this;
      let existing = false;
      vm.dropdownArray.forEach((ele) => {
        if (ele === vm.selectValue) {
          existing = true;
        }
      });
      return existing;
    },
    createRecomSet() {
      const vm = this;
      const funbtn = ['save', 'cancel'];
      vm.$router.push({
        name: 'recommendSet',
        params: { status: 'Create', funbtn },
      });
    },
    handleSizeChange(val) {
      // 每頁x筆
      const vm = this;
      vm.pageSize = val;
      vm.$store.dispatch('setting/setRecommendSetListPageSize', {
        pageSize: val,
      });
      vm.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      // 當前頁
      const vm = this;
      vm.currentPage = val;
      vm.$store.dispatch('setting/setRecommendSetListCurrentPage', {
        currentPage: val,
      });
      // 需要判斷是否檢索
      if (!vm.flag) {
        vm.currentChangePage(vm.tableDataBegin);
      } else {
        vm.currentChangePage(vm.filterTableDataEnd);
      }
    },
    // 組件自帶監控當前頁碼
    currentChangePage(list) {
      const vm = this;
      let from = (vm.currentPage - 1) * vm.pageSize;
      const to = vm.currentPage * vm.pageSize;
      vm.tableDataEnd = [];
      for (; from < to; from += 1) {
        if (list[from]) {
          vm.tableDataEnd.push(list[from]);
        }
      }
      // 當頁面row為空值且不是在第一頁時，回上一頁
      if (vm.tableDataEnd.length === 0 && vm.currentPage !== 1) {
        vm.currentPage -= 1;
        vm.$store.dispatch('setting/setRecommendSetListCurrentPage', {
          currentPage: vm.currentPage,
        });
        vm.$nextTick(() => {
          vm.doFilter();
        });
      }
    },
    handleEdit(index, row) {
      const vm = this;
      window.localStorage.setItem('recommendSetId', JSON.stringify(row.id));
      vm.$router.push({
        name: 'recommendSet',
      });
    },
  },
  watch: {
    selectValue: {
      handler(val) {
        const vm = this;
        vm.isInitCurrentPage = true;
        vm.$store.dispatch('setting/setRecommendSetListSelectValue', {
          selectValue: val,
        });
        vm.doFilter();
      },
    },
    tableDataName: {
      handler(val) {
        const vm = this;
        vm.isInitCurrentPage = true;
        vm.$store.dispatch('setting/setRecommendSetListTableDataName', {
          tableDataName: val,
        });
        vm.doFilter();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .restaurant-name {
    color: #606266;
  }
  .restaurant-btn {
    margin-right: 10px;
    width: auto;
  }
  height: 100vh;
  .middle-col {
    margin: 20px 0px;
  }
}
</style>
