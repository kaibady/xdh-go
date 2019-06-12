

  export function getLinkState(node) {
    let {grayMode, frontNode: frontLink, frontRoute} = node.diagram.model.modelData;
    let isFrontLink = false, isFrontRoute = false;
    if(frontLink && frontLink instanceof Array) {
      if(frontLink.includes(node.data.key)) {
        isFrontLink = true;
      }
    }
    if(frontRoute && frontRoute instanceof Array) {
      if(frontRoute.includes(node.data.key)) {
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
        state = isFrontLink ? 'highlight' : 'gray';
      }
    }
    return state;
  }