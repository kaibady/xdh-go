/**
 * 自定义布局类，定制特殊布局， 未用到图中
 */
import go from 'gojs'

function MyForceDirectedLayout() {
  go.ForceDirectedLayout.call(this);
}

go.Diagram.inherit(MyForceDirectedLayout, go.ForceDirectedLayout)
MyForceDirectedLayout.prototype.makeNetwork = function (coll) {
  let net = go.ForceDirectedLayout.prototype.makeNetwork.call(this, coll);
  net.vertexes.each(function (vertex) {
    let node = vertex.node;
    if (node !== null) {
      vertex.isFixed = node.isSelected;
    }
  })
  return net;
}
