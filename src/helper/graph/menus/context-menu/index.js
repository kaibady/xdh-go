import menuMap from './items'
import menuOptions from './options'

// 根据节点的数据来决定某些菜单项显示或不显示
function canAddItem(item, param, obj) {
  let canAdd = true;
  let gz = item === '关注' && param.sfgz;
  let qxgz = item === '取消关注' && !param.sfgz;
  let lwky = item === '列为可疑' && param.sfky;
  let qxky = item === '取消可疑' && !param.sfky;
  let zk = item === '展开' && obj.isTreeExpanded;
  let ss = item === '收缩' && !obj.isTreeExpanded
  if (gz || qxgz || lwky || qxky || zk || ss) {
    canAdd = false;
  }
  return canAdd;
}

export function getNodeMenu(menuType, param, obj) {
  if (!menuMap[menuType]) {
    return null
  }
  let menu = [...menuMap[menuType]];
  let genMenu = [];
  menu.forEach(r => {
    if (typeof r === 'string') {
      if (canAddItem(r, param, obj)) {
        genMenu.push(menuOptions[r])
      }
    } else if (typeof r === 'object') {
      let item = {}, subMenu = [];
      item.text = menuOptions[r.name].text;
      item.icon = menuOptions[r.name].icon;
      r.subMenu.forEach(k => {
        subMenu.push(menuOptions[k])
      })
      item.subMenu = subMenu;
      genMenu.push(item);
    }
  })
  return genMenu;
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
