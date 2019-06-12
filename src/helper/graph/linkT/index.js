import caseLink from './dashedLink';
import operLink from './solidLink';
import customLink from './customLink';
export let defaultTextScale = 5;
export let defaultGrayColor = 'rgba(100, 100, 100, 1)';
export let defaultLinkHighColor = 'yellow';
export default function ($, go, options = {}) {
  let map = new go.Map();
  map.add('dashed', caseLink($, go, options));
  map.add('solid', operLink($, go, options));
  map.add('custom', customLink($, go, options));
  map.add('', customLink($, go, options));
  return map;
}
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
let linkCommonData = {
  from: '',
  to: '',
  text: '',
  loc: ''
}
export function SolidLink(data) {
  let obj = Object.assign(this, linkCommonData, {
    category: 'solid',
    operIcon: ''
  }, data)
  return obj;
}

export function DashedLink(data) {
  Object.assign(this, linkCommonData, {
    category: 'dashed'
  }, data)
}

export function CustomLink(data) {
  Object.assign(this, linkCommonData, {
    category: 'custom'
  }, data)
}
// 关系类型对应表，暂未用到
export let relationMap = {
  '01': '同户',
  '02': '同宾馆',
  '03': '同房间',
  '04': '同车违章',
  '05': '同网吧',
  '06': '同火车',
  '07': '同航班',
  '08': '同民航订票',
  '09': '同案',
  '10': '同监所'
}
