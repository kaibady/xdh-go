export default function (name, vm) {
  console.log(name);
  switch (name) {
    // 选择功能
    case '框选':
      vm.setSelectMode('rect')
      break;
    case '多选':
      vm.setSelectMode('multi')
      break;
    case '全选':
      vm.setSelectMode('all')
      break;
    case '反选':
      vm.setSelectMode('reverse')
      break;
    case '选中子节点':
      vm.setSelectMode('child')
      break;
    case '标注':
      vm.setTagging()
      break;
    case '连线':
      vm.setLinkMode(true)
      vm.$refs.tabMenu.toggleDisabledAll()
      break;
    case '锁定':
      vm.$refs.go.diagram.selection.each(N => {
        N.isLayoutPositioned = false;
      })
      break;
    case '解锁':
      vm.$refs.go.diagram.selection.each(N => {
        N.isLayoutPositioned = true;
      })
      break;
    case '编辑':
      break;
    case '删除':
      vm.deleteNodeBath()
      break;
  }
}
