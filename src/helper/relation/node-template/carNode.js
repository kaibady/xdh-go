import nodeCommonData from '../data/node';
import * as vars from '../vars';
import nodeParts from '../node-parts';
export function CarNode(data) {
  Object.assign(
    this,
    nodeCommonData,
    {
      category: 'car',
      type: '04'
    },
    data
  );
}

export default function($, go, options) {
  options.type = 'car'
  return $(
    go.Node,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      cursor: 'pointer',
      scale: vars.defaultNodeScale,
      selectionAdorned: false,
      contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      click: options.click,
      doubleClick: options.doubleClick
    },
    nodeParts.circlePanel($, go, options),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
      go.Point.stringify
    )
  );
}
