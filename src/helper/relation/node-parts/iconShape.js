import icons from '../icons'
import * as vars from '../vars'
import * as funs from '../utils/node'
let iconSize = 40;
export const defaultCarColor = '#fe0303';
export default function($, go, options) {
    return $(go.TextBlock, icons[options.type], {
        font: `${iconSize}px "iconfont"`,
        stroke: defaultCarColor,
        wrap: go.TextBlock.OverflowEllipsis,
        editable: false,
        textAlign: 'center',
        alignment: go.Spot.Center,
        verticalAlignment: go.Spot.Top,
        portId: '',
        scale: 1
      },
      new go.Binding('stroke', '', n => {
        return {normal: defaultCarColor, highlight: vars.defaultNodeHighColor, gray: vars.defaultGrayColor}[funs.getNodeState(n)]
      }).ofObject());
}