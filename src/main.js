import Vue from 'vue';
import 'babel-polyfill';
import VueLoading from 'vue-loading-overlay';
import './components/index';
import './assets/style/cssreset.scss';
import 'vue-loading-overlay/dist/vue-loading.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import './assets/style/element-variables.scss';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import './toolbox/prototype';
// eslint-disable-next-line no-unused-vars
import Velocity from 'velocity-animate';
import lang from 'element-ui/lib/locale/lang/zh-TW';
import locale from 'element-ui/lib/locale';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import store from './store/index';
import api from './api/index';
import Utilities from './utilities';
import router from './router/index';
import App from './App.vue';


Vue.config.devTools = true;
Vue.config.productionTip = false;
Vue.use(api);
Vue.use(require('vue-moment'));

Vue.mixin(Utilities);
Vue.use(VueLoading);
Vue.use(ElementUI);
Vue.use(VueNumberInput);
Vue.component(CollapseTransition.name, CollapseTransition);
locale.use(lang);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
