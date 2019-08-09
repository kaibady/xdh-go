import Snapshot from './src/snapshot'

Snapshot.install = function(Vue) {
    Vue.component(Snapshot.name, Snapshot)
}
export default Snapshot