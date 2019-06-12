import { SolidLink } from './link-template/solidLink';
import { CarNode } from './node-template/carNode';

export let typeToCategory = {
  '04': 'car'
};

export let categoryToObj = {
  car: CarNode
};

export default function transform(data) {
  let existNode = {};
  let nodes = [];
  let links = [];
  console.log(data)
  data.forEach(item => {
    addNodeData(existNode, item, nodes);
    let fromKey = item.parentCode || 'root';
    let LinkGener = SolidLink;
    links.push(
      new LinkGener({
        key: fromKey + '_' + item.nodeCode,
        from: fromKey,
        to: item.nodeCode
      })
    );
  });
  return {nodes, links}
}

function addNodeData(existNode, item, nodes) {
  let node;
  // 节点去重
  if (!existNode[item.nodeCode]) {
    let NodeGener =
      categoryToObj[typeToCategory[item.type] || 'other'] || function() {};
    node = new NodeGener(
      Object.assign({ key: item.nodeCode, text: item.title }, item)
    );
    nodes.push(node);
    existNode[item.nodeCode] = node;
  }
}
