import nodeIcon from './nodeIcon';
import {defaultTextScale, defaultNodeScale} from './index';

let circleSize = 100;
let iconSize = 25;
export const defaultMainCaseColor = 'yellow';
export default function ($, go, options) {
  let circleShape = $(
    go.Shape,
    'Circle',
    {
      width: circleSize,
      height: circleSize,
      fill: $(go.Brush, 'Radial', {
        0.0: 'rgba(0, 0, 0, 0)',
        0.67: 'rgba(255,242, 0, 0)',
        0.80: 'rgba(255,242, 0, 0.1)',
        1: 'rgba(255,242, 0, 0.23)'
      }),
      stroke: defaultMainCaseColor,
      scale: 1.5,
      strokeWidth: 0,
      portId: ''
    }
  );
  let iconShape = $(go.TextBlock, nodeIcon['mainCase'], {
    font: `${iconSize}px "iconfont"`,
    stroke: defaultMainCaseColor,
    wrap: go.TextBlock.OverflowEllipsis,
    editable: false,
    textAlign: 'center',
    alignment: go.Spot.Center,
    verticalAlignment: go.Spot.Top,
    scale: 2
  });
  let textBlock = $(
    go.TextBlock,
    '',
    {
      margin: new go.Margin(0, 0, 0, 0),
      stroke: defaultMainCaseColor,
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      scale: defaultTextScale
    },
    new go.Binding('text', 'text')
  );
  return $(
    go.Node,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      selectionAdorned: false,
      cursor: 'pointer',
      scale: defaultNodeScale + 1,
      contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      click: options.click,
      doubleClick: options.doubleClick,
      zOrder: 99999
    },
    circleShape,
    $(
      go.Panel,
      go.Panel.Vertical,
      {background: 'rgba(0, 0, 0, 0)'},
      iconShape,
      textBlock
    ),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
