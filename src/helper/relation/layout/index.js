import getLayout from './getLayout';
export { getLayout };
function setNodesFixed(nodes, go, isFixed = true) {
  nodes.each(N => {
    N.isLayoutPositioned = !isFixed;
  });
}

export function layoutNodes(vm, $, go, diagram, type, nodes, position) {
  let layout = getLayout[type]($, go, vm, { isRouting: false });
  // 如果不设置isOngoing为false, 添加完的节点会自动按照diagram.layout布局，节点集布局会失效
  diagram.layout.isOngoing = false;
  setNodesFixed(nodes, go, false);
  layout.doLayout(nodes);
  setNodesFixed(nodes, go, true);
  diagram.layout.isOngoing = true;
  // 如果是力布局，会以原有位置为基础布局，因此不需要再设置偏移
  if (position && type !== 'ForceDirectedLayout') {
    diagram.moveParts(nodes, position);
  }
}
function getAllNodesAndLinks(go, vm) {
  let set = new go.Set(go.Node);
  vm.getDiagram().nodes.each(N => {
    set.add(N);
  });
  vm.getDiagram().links.each(L => {
    set.add(L);
  });
  return set;
}
export function layoutChange(type, options) {
  let go = this.getGraph().go;
  let $ = go.GraphObject.make;
  if (this.getSelections(true).count !== 0) {
    let set = new go.Set(go.Node);
    let posXmin, posYmin;
    this.getSelections(true).each(N => {
      set.add(N);
      if (!posXmin || N.position.x < posXmin) {
        posXmin = N.position.x;
      }
      if (!posYmin || N.position.y < posYmin) {
        posYmin = N.position.y;
      }
    });
    let position = new go.Point(posXmin, posYmin);
    layoutNodes(this, $, go, this.getDiagram(), type, set, position);
  } else {
    let set = getAllNodesAndLinks(go, this);
    layoutNodes(this, $, go, this.getDiagram(), type, set);
  }
}
