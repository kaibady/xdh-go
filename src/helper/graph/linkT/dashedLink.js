import {getLinkState, defaultGrayColor, defaultLinkHighColor} from './index';

const strokeWidth = 3;
export const caseLinkColor = 'rgba(187, 189, 93, 0.8)';
export default function ($, go, options) {
  let textBlock = $(
    go.TextBlock,
    '',
    {
      textAlign: 'center',
      font: '12px helvetica, arial, sans-serif',
      stroke: '#fff',
      margin: 4,
      maxLines: 3,
      editable: true
    },
    new go.Binding('text')
  );
  return $(
    go.Link,
    {
      curve: go.Link.Bezier,
      zOrder: 99999,
      selectionAdorned: false
    },
    $(
      go.Shape,
      {
        stroke: caseLinkColor,
        strokeWidth: strokeWidth,
        strokeDashArray: [24, 8, 24, 8],
        click: options.click,
        mouseEnter: options.mouseEnter,
        mouseLeave: options.mouseLeave
      },
      new go.Binding('strokeWidth', '', n => {
        return {normal: strokeWidth, highlight: 8, gray: strokeWidth}[getLinkState(n)];
      }).ofObject(),
      new go.Binding('stroke', '', n => {
        return {normal: caseLinkColor, highlight: defaultLinkHighColor, gray: defaultGrayColor}[getLinkState(n)]
      }).ofObject()
    ),
    textBlock,
    new go.Binding('zOrder', 'isHighlighted', h => {
      return h ? 99999 : 1;
    }),
    new go.Binding('curviness', '', l => {
      let deltaX = l.toNode.position.x - l.fromNode.position.x;
      let deltaY = l.toNode.position.y - l.fromNode.position.y;
      let curve = 1;
      // if (Math.abs(deltaY) > Math.abs(deltaX)) {
      //   curve = (deltaY / deltaX) >= 0 ? 100 : -100;
      // } else if (Math.abs(deltaY) <= Math.abs(deltaX)) {
      //   curve = (deltaY / deltaX) >= 0 ? -100 : 100;
      // }
      if(!isNaN(deltaX) && !isNaN(deltaY)) {
        let angle = Math.floor(Math.atan2(deltaY, deltaX) * 10000) / 10000;
        curve = -Math.sin(angle * 4) * 150;
      }
      return curve;
    }).ofObject(),
    new go.Binding('opacity', 'showLinks', s => {
      return s ? 1 : 0
    }).ofModel(),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
