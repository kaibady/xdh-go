import {DashedLink, SolidLink, CustomLink} from './linkT'
import {PersonNode, OperNode, CaseNode, TelNode, CarNode, TagNode, GoodsNode, OtherNode, MainCaseNode} from './nodeT'

export let typeToCategory = {
  '01': 'person', // 人员
  '02': 'case', // 案件
  '03': 'tel', // 手机号
  '04': 'car', // 车辆
  '05': 'tag', // 标识号
  '06': 'oper', // 碰撞
  '07': 'oper', // 阵控比对
  '08': 'oper', // 路线寻人
  '09': 'oper', // 高危分析
  '10': 'oper', // 技术比对
  '11': 'goods', // 损失物品
  '12': 'oper', // 案件技术串并
  '13': 'oper', // 案件智能串并
  '14': 'oper', // 案件人工串并
  '15': 'oper', // 关系分析
  '16': 'oper' // 拥有手机
};
export let categoryToObj = {
  person: PersonNode,
  case: CaseNode,
  tel: TelNode,
  car: CarNode,
  tag: TagNode,
  oper: OperNode,
  goods: GoodsNode,
  other: OtherNode
}

export function transformData(data, mainCaseId) {
  console.log(data)
  let nodes = [],
    links = [];
  addMainCase(nodes, mainCaseId);
  let existNode = {};
  // 给各类战法增加一个序号
  data = addTacticSeq(data);
  // 不需要自建结果集的
  let dataNodes = [
    ...data.ajjscb, // 案件技术串并
    ...data.ajrgcb, // 案件人工串并
    ...data.ajzncb, // 案件只能串并
    ...data.ddpz, // 多点碰撞
    ...data.gwfx, // 高危分析
    ...data.spzc, // 视频侦查
    ...data.gxfx // 关系分析
  ];
  dataNodes.forEach(item => {
    addNodeData(existNode, item, nodes)
    let fromKey = isFromMainCase(item) ? 'ajcb' : item.parentCode;
    let LinkGener = isCollection(item) ? DashedLink : SolidLink;
    links.push(new LinkGener({
      key: fromKey + '_' + item.nodeCode,
      from: fromKey,
      to: item.nodeCode
    }));
  });
  // 增加自定义结果集
  addCustomCollections(nodes, links)
  let wrap = [
    {key: 'jsbd', fromNode: 'jsbd', name: '技术比对'},
    {key: 'babhry', fromNode: 'babhry', name: '报案被害人员'},
    {key: 'fzxyry', fromNode: 'fzxyry', name: '犯罪嫌疑人员'},
    {key: 'sswp', fromNode: 'sswp', name: '损失物品'},
    // 可疑人员，车辆，标识号，手机，统一归并到可以对象中
    {key: 'kyry', fromNode: 'kydx', name: '可疑人员'},
    {key: 'kycl', fromNode: 'kydx', name: '可疑车辆'},
    {key: 'kybsh', fromNode: 'kydx', name: '可疑标识号'},
    {key: 'kysj', fromNode: 'kydx', name: '可疑手机'}
  ];
  wrap.forEach(d => {
    let list = [...data[d.key]];
    list.forEach(item => {
      addNodeData(existNode, item, nodes)
      links.push(new SolidLink({
        key: d.fromNode + '_' + item.nodeCode,
        from: d.fromNode,
        to: item.nodeCode
      }));
    });
  });
  // 添加自定义连线
  addCustomLinkNode(data.links, data.linkNode, existNode, links, nodes);
  let graphData = {nodes, links}
  console.log(graphData);
  return graphData;
}

function addMainCase(nodes, mainCaseId) {
  let rootNode = new MainCaseNode({
    text: '主案件',
    key: 'ajcb',
    ywid: mainCaseId
  })
  nodes.push(rootNode)
}

function addCustomCollections(nodes, links) {
  let nodesAndLinks = [{node: {key: 'jsbd', text: '技术比对'}, link: {key: 'ajcb_jsbd', from: 'ajcb', to: 'jsbd'}},
    {node: {key: 'kydx', text: '可疑对象'}, link: {key: 'ajcb_kydx', from: 'ajcb', to: 'kydx'}},
    {node: {key: 'sswp', text: '损失物品'}, link: {key: 'ajcb_sswp', from: 'ajcb', to: 'sswp'}},
    {node: {key: 'babhry', text: '报案被害人员'}, link: {key: 'ajcb_babhry', from: 'ajcb', to: 'babhry'}},
    {node: {key: 'fzxyry', text: '犯罪嫌疑人员'}, link: {key: 'ajcb_fzxyry', from: 'ajcb', to: 'fzxyry'}}];
  nodesAndLinks.forEach(item => {
    nodes.push(new OperNode(item.node));
    links.push(new DashedLink(item.link));
  })
}

function addCustomLinkNode(customLinks, linkNodes, existNode, links, nodes) {
  linkNodes.forEach(item => {
    addNodeData(existNode, item, nodes)
  })
  customLinks.forEach(link => {
    links.push(new CustomLink({
      key: link.id,
      category: 'custom',
      from: link.fromid,
      to: link.toid,
      text: link.text
    }))
  })
}

function addNodeData(existNode, item, nodes) {
  let node;
  // 节点去重
  if (!existNode[item.nodeCode]) {
    let NodeGener = categoryToObj[typeToCategory[item.type] || 'other']
    node = new NodeGener(Object.assign({key: item.nodeCode, text: item.title}, item))
    nodes.push(node);
    handleDuplicateNode(node);
    existNode[item.nodeCode] = node;
  } else {
    // 重复的节点不添加，但是需要将某些数据合并到原节点
    handleDuplicateNode(existNode[item.nodeCode], item)
  }
}

// 因为战法的结果集名称前需要加序号
function addTacticSeq(data) {
  let tacticArray = [{
    name: 'ajrgcb',
    type: '14'
  }, {
    name: 'ajzncb',
    type: '13'
  }, {
    name: 'gwfx',
    type: '09'
  }, {
    name: 'ddpz',
    type: '06'
  }, {
    name: 'spzc',
    type: '08'
  }];
  tacticArray.forEach(r => {
    let count = 1;
    if (data[r.name].length > 0) {
      for (let i = 0; i < data[r.name].length; i++) {
        if (data[r.name][i].type === r.type) {
          data[r.name][i].title = count + ' ' + data[r.name][i].title;
          count++;
        }
      }
    }
  })
  return data;
}

// 处理一个节点同时有多个父节点的情况，线上的数据记录在子节点上，用父节点的key作为数据的key
function handleDuplicateNode(node, duplicateNode) {
  // 两个节点上的number可能是不同的关系，图出来后根据父节点区分number读出来写在线上
  if (!duplicateNode) {
    node.linkNum = {};
    node.linkNum[node.parentCode] = node.number || 0;
  } else {
    node.linkNum[duplicateNode.parentCode] = duplicateNode.number;
  }
}

function isCollection(item) {
  if (item.nodeCode.includes('gxfx') || item.nodeCode.includes('yysj')) {
    return true;
  } else {
    return [
      'ajjscb',
      'ajrgcb',
      'ajzncb',
      'ddpz',
      'gwfx',
      'spzc'
    ].includes(item.parentCode);
  }
}

function isFromMainCase(item) {
  return [
    'ajjscb',
    'ajrgcb',
    'ajzncb',
    'ddpz',
    'gwfx',
    'spzc'
  ].includes(item.parentCode);
}
