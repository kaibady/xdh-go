import {defaultTextScale, getLinkState, defaultGrayColor, defaultLinkHighColor} from './index'

const strokeWidth = 3;
export const operLinkColor = '#3169f5';
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
    new go.Binding('zOrder', '', n => {
      return {normal: 1, highlight: 9999, gray: 0}[getLinkState(n)];
    }).ofObject(),
    new go.Binding('cursor', '', h => {
      return h.fromNode.data.type === '15' ? 'pointer' : ''
    }).ofObject()
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
    new go.Binding('text', '', L => {
      let txt = '';
      let fromNode = L.fromNode.data;
      let toNode = L.toNode.data;
      if (fromNode.type === '15') {
        txt = fromNode.title + toNode.linkNum[fromNode.key] + '次';
      }
      return txt;
    }).ofObject(),
    new go.Binding('visible', 'showLinkLabels').ofModel()
  );
  return $(
    go.Link,
    {
      selectionAdorned: false,
      curve: go.Link.Bezier,
      // layoutConditions: go.LayoutNone,
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
        segmentOrientation: go.Link.OrientUpright
      },
      new go.Binding('cursor', '', h => {
        return h.fromNode.data.type === '15' ? 'pointer' : ''
      }).ofObject()),
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
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
