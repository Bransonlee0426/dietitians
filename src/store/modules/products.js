/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const state = {
  id: '',
  restaurantID: '',
};

const getters = {
};
const mutations = {
  set(state, value) {
    state.id = value.data.id;
  },
  delete(state, value) {
    state.id = '';
  },
};
const actions = {
  setData(context, data) {
    context.commit({
      type: 'set',
      data,
    });
  },
  delData(context) {
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
