export default function(name, vm) {
  let diagram = vm.$refs.go.diagram;
  let model = diagram.model;
  let go = vm.$refs.go.go;
  let set = new go.Set(go.Node);
  switch (name) {
    case '隐藏节点':
      diagram.selection.each(N => {
        if (N instanceof go.Node) {
          set.add(N)
        }
      })
      set.each(N => {
        N.visible = false;
      })
      break;
    case '隐藏关系label':
      model.setDataProperty(model.modelData, 'showLinkLabels', false);
      break;
    case '隐藏关系连线':
      model.setDataProperty(model.modelData, 'showLinks', false);
      break;
    case '隐藏子节点':
      diagram.selection.each(N => {
        if (N instanceof go.Node) {
          set.add(N)
        }
      })
      set.each(N => {
        N.collapseTree(1)
      })
      break;
    case '显示子节点':
      go = vm.$refs.go.go;
      diagram.selection.each(N => {
        if (N instanceof go.Node) {
          set.add(N)
        }
      })
      set.each(N => {
        N.expandTree(1)
        N.findTreeChildrenNodes().each(N2 => {
          N2.visible = true;
        })
      })
      break;
    case '显示关系label':
      model.setDataProperty(model.modelData, 'showLinkLabels', true);
      break;
    case '显示关系连线':
      model.setDataProperty(model.modelData, 'showLinks', true);
      break;
    case '缩放':
      vm.$refs.go.diagram.zoomToFit();
      break;
  }
}
