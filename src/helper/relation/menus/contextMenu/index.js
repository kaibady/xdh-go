
import getNodeMenu from './menu-items'
import { search, select, remove } from './handler';

export function contextMenuClick(event, val) {
  this.$refs.circleMenu.hide();
  const data = this.getLastSelection();
  switch (val.tag) {
    case 'sc':
      console.log('点击了删除');
      remove(data, this);
      break;
    case 'ss':
      console.log('点击了搜索');
      search(data, this);
      break;
    case 'xz':
      console.log('点击了选择');
      select(data, this);
      break;
  }
}

// 因需要定位到节点中心，重写showContextMenu方法，用于go-menu组件方法, 须嵌入到methods中
export function showContextMenu(obj, diagram, tool, menu) {
    menu.style.display = 'block'
    let el = diagram.div;
    let offset = el.getBoundingClientRect()
    let point = diagram.transformDocToView(obj.actualBounds.center)
    menu.style.left = point.x + offset.left + 'px'
    menu.style.top = point.y + offset.top + 'px'
  }

  // 在show之前，根据菜单项数量决定显示的起始角度，须嵌入到methods中
export function beforeShowMenu(obj, diagram, tool, elem) {
    let menu = getNodeMenu(obj.data.category, obj.data, obj)
    if (menu.length < 5) {
      this.nodeMenu.angleRange = {
        1: [45, 135],
        2: [0, 180],
        3: [0, 180],
        4: [-30, 210]
      }[menu.length]
    } else {
      this.nodeMenu.angleRange = [-90, 270]
    }
    this.nodeMenu.menuItems = menu
  }