import nodeIcon from './nodeIcon';
import {
  defaultTextScale,
  defaultNodeScale,
  defaultNodeHighColor,
  defaultGrayColor, nodeTextShow, getNodeState
} from './index';
import {genDoubtTips, genTagging, makeLinkPort} from './nodeTmplMixins'

let iconSize = 35;
export const defaultTelColor = 'orange';
export default function ($, go, options) {
  let msgTips = genDoubtTips($, go);
  let tagging = genTagging($, go);
  let linkPort = makeLinkPort($, go)
  let iconShape = $(go.TextBlock, nodeIcon['tel'], {
      font: `${iconSize}px "iconfont"`,
      stroke: defaultTelColor,
      wrap: go.TextBlock.OverflowEllipsis,
      editable: false,
      textAlign: 'center',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Top,
      scale: 1.5,
      portId: ''
    },
    new go.Binding('stroke', '', n => {
      return {normal: defaultTelColor, highlight: defaultNodeHighColor, gray: defaultGrayColor}[getNodeState(n)]
    }).ofObject());

  let textBlock = $(
    go.TextBlock,
    'Default Text',
    {
      margin: new go.Margin(-18, 0, 0, 0),
      stroke: '#fff',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      scale: defaultTextScale
    },
    new go.Binding('text', 'text'),
    new go.Binding('stroke', '', n => {
      return nodeTextShow(n);
    }).ofObject()
  );
  let verPanel = $(
    go.Panel,
    go.Panel.Vertical,
    {
      background: 'rgba(0, 0, 0, 0)',
      alignment: go.Spot.Center
    },
    $(go.Panel, 'Spot', iconShape, msgTips, tagging, linkPort),
    textBlock
  );

  let circlePanel = $(go.Panel, 'Spot', verPanel);
  return $(
    go.Node,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      cursor: 'pointer',
      scale: defaultNodeScale,
      selectionAdorned: false,
      contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      doubleClick: options.doubleClick,
      click: options.click,
      mouseDragEnter: options.mouseDragEnter
    },
    circlePanel,
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
