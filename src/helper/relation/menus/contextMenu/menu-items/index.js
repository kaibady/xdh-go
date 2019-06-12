import menuMap from './items';
import menuOptions from './options';
// 根据节点的数据来决定某些菜单项显示或不显示
function canAddItem(item, param, obj) {
  let canAdd = true;
  return canAdd;
}
export default function(menuType, param, obj) {
  if (!menuMap[menuType]) {
    return null;
  }
  let menu = [...menuMap[menuType]];
  let genMenu = [];
  menu.forEach(r => {
    if (typeof r === 'string') {
      if (canAddItem(r, param, obj)) {
        genMenu.push(menuOptions[r]);
      }
    } else if (typeof r === 'object') {
      let item = {},
        subMenu = [];
      item.text = menuOptions[r.name].text;
      item.icon = menuOptions[r.name].icon;
      r.subMenu.forEach(k => {
        subMenu.push(menuOptions[k]);
      });
      item.subMenu = subMenu;
      genMenu.push(item);
    }
  });
  console.log(genMenu)
  return genMenu;
}
