import * as funs from '../utils/link'
import * as vars from '../vars'
const strokeWidth = 3;
export const operLinkColor = '#3169f5';
export default function($, go, options) {
 return $(
    go.Shape,
    {
      stroke: operLinkColor,
      strokeWidth: strokeWidth,
      cursor: 'auto'
    },
    new go.Binding('strokeWidth', '', n => {
      return {normal: strokeWidth, highlight: 8, gray: strokeWidth}[funs.getLinkState(n)];
    }).ofObject(),
    new go.Binding('stroke', '', n => {
      return {normal: operLinkColor, highlight: vars.defaultLinkHighColor, gray: vars.defaultGrayColor}[funs.getLinkState(n)]
    }).ofObject(),
    new go.Binding('zOrder', '', n => {
      return {normal: 1, highlight: 9999, gray: 0}[funs.getLinkState(n)];
    }).ofObject(),
    new go.Binding('cursor', '', h => {
      return h.fromNode.data.type === '15' ? 'pointer' : ''
    }).ofObject()
  );
}