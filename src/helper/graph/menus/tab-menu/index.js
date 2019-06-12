import {typeToCategory} from '../../transform'

export function toggleDisabled(vm) {
  let selections = vm.$refs.go.diagram.selection;
  let types = [];
  let tabMenu = vm.$refs.tabMenu;
  let isSameType = true;
  selections.each(N => {
    // 把线排除掉
    if (!['custom', 'solid', 'dashed'].includes(N.data.category)) {
      if (typeToCategory[N.data.type]) {
        let type = typeToCategory[N.data.type];
        if (type === 'oper') {
          let children = N.findTreeChildrenNodes();
          children.each(N1 => {
            let ctype = typeToCategory[N1.data.type]
            if (types.length !== 0 && !types.includes(ctype)) {
              isSameType = false;
            }
            types.push(ctype)
          })
        } else {
          if (types.length !== 0 && !types.includes(type)) {
            isSameType = false;
          }
          types.push(type)
        }
      }
    }
  });
  let menus = ['tacticsMenu'];
  menus.forEach(menu => {
    tabMenu[menu].forEach(r => {
      let itemDisabled = false;
      let isSingle = types.length === 1 && r.selectMode.includes('single');
      let isMulti = types.length > 1 && r.selectMode.includes('multi');
      if (isSameType && (isSingle || isMulti)) {
        types.forEach(t => {
          if (!r.nodeType.includes(t)) {
            itemDisabled = true;
          }
        })
      } else {
        itemDisabled = true;
      }
      tabMenu.$set(r, 'disabled', itemDisabled)
    })
  })
}
