import nodeIcon from './nodeIcon';
import {defaultTextScale, defaultNodeScale} from './index';

let iconSize = 45;
let defaultColor = '#64cb15';

export default function ($, go, options) {

  let iconShape = $(go.TextBlock, nodeIcon['other'], {
    font: `bold ${iconSize}px "iconfont"`,
    stroke: defaultColor,
    wrap: go.TextBlock.OverflowEllipsis,
    editable: false,
    textAlign: 'center',
    alignment: go.Spot.Center,
    verticalAlignment: go.Spot.Top,
    portId: ''
  });
  let textBlock = $(
    go.TextBlock,
    'Default Text',
    {
      margin: new go.Margin(-10, 0, 0, 0),
      stroke: '#fff',
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
      cursor: 'pointer',
      selectionAdorned: false,
      // contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      click: options.click,
      scale: defaultNodeScale
    },
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
