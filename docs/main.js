import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import hljs from 'highlight.js'
import DemoBlock from './components/demo-block'
import PageBlock from './components/page-block'

import './mock/index'
import '@/widgets/index'
import 'highlight.js/styles/darcula.css'
import './style/docs.scss'

Vue.use(ElementUI)
Vue.component(DemoBlock.name, DemoBlock)
Vue.component(PageBlock.name, PageBlock)

Vue.config.productionTip = false

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
