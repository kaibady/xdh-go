import Draft from './src/draft'
Draft.install = function(Vue) {
    Vue.component(Draft.name, Draft)
}
export default Draft