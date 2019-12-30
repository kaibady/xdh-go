import View from './src/view'
View.install = function(Vue) {
    Vue.component(View.name, View)
}
export default View