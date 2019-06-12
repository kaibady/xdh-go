export function getDiagram() {
  return this.$refs.go.diagram;
}
export function getModel() {
  return this.getDiagram().model;
}

export function getLastSelection(isObject = false) {
  let res;
  this.$refs.go.diagram.selection.each(node => {
    res = isObject ? node : node.data;
  });
  return res;
}
export function getSelections(isObject = true) {
  if (isObject) {
    return this.$refs.go.diagram.selection;
  } else {
    let res = [];
    this.$refs.go.diagram.selection.each(node => {
      res.push(node.data);
    });
    return res;
  }
}
export function highlightNode(node) {
  node.linksConnected.each(L => {
    L.isHighlighted = true;
    if (L.fromNode) {
      L.fromNode.isHighlighted = true;
    }
    if (L.toNode) {
      L.toNode.isHighlighted = true;
    }
  });
  node.isHighlighted = true;
}
export function highlightLink(link) {
  let fromNode = link.fromNode;
  let toNode = link.toNode;
  fromNode.isHighlighted = true;
  toNode.isHighlighted = true;
  link.isHighlighted = true;
}
