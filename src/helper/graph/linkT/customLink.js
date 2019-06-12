import {defaultTextScale, getLinkState, defaultGrayColor, defaultLinkHighColor} from './index'

const strokeWidth = 3;
export const operLinkColor = 'red';
export default function ($, go, options) {
  let linkShape = $(
    go.Shape,
    {
      stroke: operLinkColor,
      strokeWidth: strokeWidth,
      cursor: 'auto'
    },
    new go.Binding('strokeWidth', '', n => {
      return {normal: strokeWidth, highlight: 8, gray: strokeWidth}[getLinkState(n)];
    }).ofObject(),
    new go.Binding('stroke', '', n => {
      return {normal: operLinkColor, highlight: defaultLinkHighColor, gray: defaultGrayColor}[getLinkState(n)]
    }).ofObject(),
    new go.Binding('zOrder', 'isHighlighted', h => {
      return h ? 9999 : 1;
    })
  );
  let textBlock = $(
    go.TextBlock,
    '',
    {
      textAlign: 'center',
      font: '14px helvetica, arial, sans-serif',
      stroke: '#fff',
      scale: defaultTextScale,
      margin: 4,
      maxLines: 3,
      editable: false,
      segmentOffset: new go.Point(0, -40),
      segmentOrientation: go.Link.OrientUpright
    },
    new go.Binding('text', 'text'),
    new go.Binding('visible', 'showLinkLabels').ofModel()
  );
  return $(
    go.Link,
    {
      curve: go.Link.Bezier,
      selectionAdorned: false,
      zOrder: 1,
      click: options.click,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave
    },
    linkShape,
    $(go.Shape, 'RoundedRectangle', {
      fill: 'rgba(0, 0,0,0)',
      stroke: 'rgba(0,0,0,0)',
      strokeWidth: 30,
      width: 300,
      height: 30,
      segmentOffset: new go.Point(0, 0),
      segmentOrientation: go.Link.OrientUpright,
      cursor: 'pointer'
    }),
    textBlock,
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
    new go.Binding('cursor', '', h => {
      return h.fromNode.data.type === '15' || h.data.category === 'custom' ? 'pointer' : ''
    }).ofObject(),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
