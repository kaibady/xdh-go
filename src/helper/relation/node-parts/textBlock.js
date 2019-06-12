import * as vars from '../vars';
import * as funs from '../utils/node'
export default function($, go, options) {
  return $(
    go.TextBlock,
    'Default Text',
    {
      margin: new go.Margin(-5, 0, 0, 0),
      stroke: '#fff',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      scale: vars.defaultTextScale
    },
    new go.Binding('text', 'text'),
    new go.Binding('stroke', '', n => {
      return funs.nodeTextShow(n);
    }).ofObject()
  );
}
