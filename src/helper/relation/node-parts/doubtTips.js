import * as vars from '../vars'
import * as funs from '../utils/node'
let tipsColor = '#fff';
let tipsBgColor = 'red';
let circleScale = 1.1;
export default function($, go) {
  return $(
    go.Panel,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      alignment: new go.Spot(0.97, 0.05),
      scale: vars.defaultTextScale
    },
    $(go.Shape, 'Circle', {
        width: 20,
        height: 20,
        stroke: tipsColor,
        fill: tipsBgColor,
        strokeWidth: 0,
        scale: circleScale
      },
      new go.Binding('visible', '', n => {
        return {normal: true, highlight: true, gray: false}[funs.getNodeState(n)]
      }).ofObject()),
    $(
      go.TextBlock,
      '',
      {
        margin: 3,
        stroke: tipsColor,
        alignment: go.Spot.Center,
        verticalAlignment: new go.Spot(0.5, 0.5)
      },
      new go.Binding('text', 'sfky', h => {
        return h ? '疑' : '';
      }),
      new go.Binding('visible', '', n => {
        return {normal: true, highlight: true, gray: false}[funs.getNodeState(n)]
      }).ofObject()
    ),
    new go.Binding('visible', 'sfky', h => {
      let v = false;
      if (h) {
        v = true;
      }
      return v;
    })
  );
}
