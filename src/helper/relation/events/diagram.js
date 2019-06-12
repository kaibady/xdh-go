// 与toolManager鼠标事件或者commandHandler等事件相关的绑定
export function bindToolEvents(diagram, $, go) {
  // 框选状态下禁用拖拽
  diagram.toolManager.draggingTool.doMouseMove = () => {
    let cmd = diagram.toolManager.draggingTool;
    go.DraggingTool.prototype.doMouseMove.call(cmd);
    diagram.layout.invalidateLayout();
  };
}
// 与diagram事件相关的绑定,传入的vm为外层的vue对象
export function bindDiagramEvents() {
  let vm = this;
  return {
    LinkDrawn(obj) {
      linkDrawn(obj, vm);
    },
    ViewportBoundsChanged(obj) {
      viewportBoundsChanged(obj, vm);
    },
    BackgroundSingleClicked(obj) {
        backgroundSingleClicked(obj, vm);
    },
    ChangedSelection(obj) {
      changedSelection(obj, vm);
    }
  };
}
// 下面定义diagram的具体处理方法

function linkDrawn(obj, vm) {
  console.log(obj, vm);
}
function viewportBoundsChanged(obj, vm) {
  console.log(obj, vm);
}
function backgroundSingleClicked(obj, vm) {
  console.log(obj, vm);
}
function changedSelection(obj, vm) {
  console.log(obj, vm);
}
