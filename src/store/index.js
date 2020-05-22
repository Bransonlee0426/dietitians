import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './modules/userInfo';
import products from './modules/products';
import setting from './modules/setting';

Vue.use(Vuex);

function islogin(mutation, state) {
  if (mutation.type === 'userInfo/setAccount') {
    window.localStorage.setItem('userData', JSON.stringify(state));
    if (!state.account && mutation.type === 'userInfo/setAccount') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userData');
    }
  }
}

const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    islogin(mutation, state.userInfo);
  });
};

export default new Vuex.Store({
  modules: {
    userInfo,
    products,
    setting,
  },
  plugins: [localStoragePlugin],
});
