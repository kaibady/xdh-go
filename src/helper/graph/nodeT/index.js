import carNode from './carNode';
import mainCaseNode from './mainCaseNode';
import caseNode from './caseNode';
import operNode from './operNode';
import personNode from './personNode';
import telNode from './telNode';
import tagNode from './tagNode';
import goodsNode from './goodsNode';
import testNode from './testNode'

import otherNode from './otherNode';
import nodeIconType from './nodeIcon';
import {GET_PERSON_PHOTO} from '@/base/api/single-graph';
import uuid from 'uuid'

export let defaultTextScale = 1.5;
export let defaultNodeScale = 4;
export let nodeCommonData = {
  category: '',
  imgPath: '',
  key: '',
  loc: '',
  mask: false,
  nodeCode: '',
  number: 0,
  sfgz: false,
  sfky: false,
  text: '',
  time: null,
  title: '',
  loading: false,
  tagging: false,
  ywid: '',
  newAdded: false
}
// 默认高亮色
export let defaultNodeHighColor = 'yellow';
// 默认灰色
export let defaultGrayColor = 'rgba(100, 100, 100, 1)';

export default function ($, go, options = {}) {
  let map = new go.Map();
  map.add('car', carNode($, go, options));
  map.add('mainCase', mainCaseNode($, go, options));
  map.add('case', caseNode($, go, options));
  map.add('oper', operNode($, go, options));
  map.add('person', personNode($, go, options));
  map.add('tel', telNode($, go, options));
  map.add('other', otherNode($, go, options));
  map.add('tag', tagNode($, go, options));
  map.add('goods', goodsNode($, go, options));
  map.add('test', testNode($, go, options));
  return map;
}

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

// 根据节点的三种状态得到文字的显示颜色，多个节点使用，抽离出来
export function nodeTextShow(node) {
  return {
    normal: '#fff',
    highlight: '#fff',
    gray: 'rgba(0,0,0,0)'
  }[getNodeState(node)]
}

export function PersonNode(data) {
  let _source = GET_PERSON_PHOTO.replace(':id', data.sfzh || data.zjhm);
  Object.assign(this, nodeCommonData, {
    category: 'person',
    key: data.sfzh || data.zjhm,
    nodeCode: data.sfzh || '',
    source: _source,
    text: data.xm || '',
    type: '01',
    loading: false,
    ywid: data.sfzh
  }, data)
}

export function CaseNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'case',
    type: '02'
  }, data)
}

export function CarNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'car',
    type: '04'
  }, data)
}
export function MainCaseNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'mainCase',
    type: '02'
  }, data)
}
export function TagNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'tag',
    type: '05'
  }, data)
}

export function GoodsNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'goods',
    type: '11'
  }, data)
}

export function OtherNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'goods'
  }, data)
}

export function OperNode(data) {
  let keyCode = uuid.v4();
  Object.assign(this, nodeCommonData, {
    operIcon: nodeIconType['oper'],
    category: 'oper',
    key: keyCode,
    text: '',
    loading: false,
    ywid: keyCode
  }, data)
}

export function TelNode(data) {
  Object.assign(this, nodeCommonData, {
    category: 'tel',
    type: '03'
  }, data)
}
