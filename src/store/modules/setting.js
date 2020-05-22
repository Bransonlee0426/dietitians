/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const state = {
  recommendSetListPageSize: 10,
  recommendSetListCurrentPage: 1,
  recommendSetListSelectValue: '',
  recommendSetListTableDataName: '',
};

const getters = {
};
const mutations = {
  recommendSetListPageSize(state, value) {
    state.recommendSetListPageSize = value.data.pageSize;
  },
  recommendSetListCurrentPage(state, value) {
    state.recommendSetListCurrentPage = value.data.currentPage;
  },
  recommendSetListSelectValue(state, value) {
    state.recommendSetListSelectValue = value.data.selectValue;
  },
  recommendSetListTableDataName(state, value) {
    state.recommendSetListTableDataName = value.data.tableDataName;
  },
  delete(state, value) {
  },
};
const actions = {
  setRecommendSetListPageSize(context, data) {
    context.commit({
      type: 'recommendSetListPageSize',
      data,
    });
  },
  setRecommendSetListCurrentPage(context, data) {
    context.commit({
      type: 'recommendSetListCurrentPage',
      data,
    });
  },
  setRecommendSetListSelectValue(context, data) {
    context.commit({
      type: 'recommendSetListSelectValue',
      data,
    });
  },
  setRecommendSetListTableDataName(context, data) {
    context.commit({
      type: 'recommendSetListTableDataName',
      data,
    });
  },
  delSetting(context) {
    context.commit({
      type: 'delete',
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
