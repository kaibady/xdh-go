import Tool from './src/tool'

Tool.install = function(Vue) {
    Vue.component(Tool.name, Tool)
}
export default Tool