import nodeIconType from '../nodeIcon';
import {defaultOperColor} from '../operNode';
import {defaultTextScale} from '../index';

export default function($, go, options) {
  let iconSize = 35;
  return $(
    go.Panel,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      alignment: new go.Spot(0, 0),
      scale: defaultTextScale,
      click: options.positionClick
    },
    $(go.TextBlock,
      nodeIconType['position'],
      {
        font: `${iconSize}px "iconfont"`,
        stroke: defaultOperColor,
        wrap: go.TextBlock.OverflowEllipsis,
        editable: false,
        textAlign: 'center',
        alignment: go.Spot.Center,
        verticalAlignment: go.Spot.Top
      })
  );
}
