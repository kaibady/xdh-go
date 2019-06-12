/** 根据isSelected(选择状态), isHighlighted(高亮), gray(置灰模式)等综合判断节点状态
 * 将产生三种状态 highlight: 高亮（黄色）， normal: 原本颜色，gray: 灰色
 */
export function getNodeState(node) {
    let {grayMode, frontNode, frontRoute} = node.diagram.model.modelData;
    let isFrontNode = false, isFrontRoute = false;
    if (frontNode && frontNode instanceof Array) {
      if (frontNode.includes(node.data.key)) {
        isFrontNode = true;
      }
    }
    if (frontRoute && frontRoute instanceof Array) {
      if (frontRoute.includes(node.data.key)) {
        isFrontRoute = true;
      }
    }
    let isSelected = node.isSelected;
    let isHighlighted = node.isHighlighted;
    let state = 'normal';
    if (isHighlighted || isSelected || isFrontRoute) {
      state = 'highlight';
    } else {
      if (grayMode) {
        state = isFrontNode ? 'normal' : 'gray';
      }
    }
    return state;
  }
  
  export function nodeTextShow(node) {
    return {
      normal: '#fff',
      highlight: '#fff',
      gray: 'rgba(0,0,0,0)'
    }[getNodeState(node)]
  }