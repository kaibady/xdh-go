import Vue from 'vue';
import App from './App.vue';
import router from './router';
import XdhGo from '../packages/index';
import Example from './components/example';
import './icon/iconfont.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.use(XdhGo);
Vue.component('Example', Example);

Vue.config.productionTip = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
