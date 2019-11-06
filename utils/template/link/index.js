import { link } from '../../node-parts';
import { linkBinding } from './bindings';
import { label } from './label';
import { line, lineHolder } from './line';
import { toArrow, fromArrow } from './arrow';
import { handleLinkDefault } from './default';
export default function($, go, options) {
  let _options = handleLinkDefault($, go, options);
  console.log('link', _options);
  // 用于扩展节点
  let extendUp = [],
    extendDown = [];
  // 处理parts
  if (_options.parts && _options.parts instanceof Array) {
    extendUp = [..._options.parts];
  } else if (_options.parts && _options.parts.up) {
    extendUp = [..._options.parts.up];
    extendDown = [..._options.parts.down];
  }
  // 处理事件
  if (_options.events.mouseEnter) {
    let hoverFun = _options.events.mouseEnter;
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', true);
      hoverFun(e, n);
    };
    _options.events.mouseEnter = overideFun;
  } else {
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', true);
    };
    _options.events.mouseEnter = overideFun;
  }
  if (_options.events.mouseLeave) {
    let hoverFun = _options.events.mouseLeave;
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', false);
      hoverFun(e, n);
    };
    _options.events.mouseLeave = overideFun;
  } else {
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', false);
    };
    _options.events.mouseLeave = overideFun;
  }
  return link($, go, {
    props: {
      ..._options.props._linkOptions.props
    },
    parts: [
      // 连线
      line($, go, _options),
      ...extendDown,
      // 末尾箭头
      toArrow($, go, _options),
      // // 起始箭头
      fromArrow($, go, _options),
      label($, go, _options),
      // // 连线占位
      lineHolder($, go, _options),
      ...extendUp
    ],
    binding: [...linkBinding($, go, _options), ..._options.binding],
    events: _options.events
  });
}
