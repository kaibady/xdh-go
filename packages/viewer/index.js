import Viewer from './src/viewer'
Viewer.install = function(Vue) {
    Vue.component(Viewer.name, Viewer)
}
export default Viewer