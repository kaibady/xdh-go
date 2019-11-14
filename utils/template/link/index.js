import { link, shape } from '../../node-parts';
import { linkBinding } from './bindings';
import { label } from './label';
import { line, lineHolder } from './line';
import { toArrow, fromArrow } from './arrow';
import { handleLinkDefault } from './default';
import handleAnimation from '../../animation';

function handleParts(_options) {
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
  return {
    extendUp,
    extendDown
  }
}
function handleEvents(_options, $, go) {
  if (_options.events.mouseEnter) {
    let hoverFun = _options.events.mouseEnter;
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', true);
      handleAnimation(e, n, 'mouseEnter', _options, go);
      hoverFun(e, n);
    };
    _options.events.mouseEnter = overideFun;
  } else {
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', true);
      handleAnimation(e, n, 'mouseEnter', _options, go);
    };
    _options.events.mouseEnter = overideFun;
  }
  if (_options.events.mouseLeave) {
    let hoverFun = _options.events.mouseLeave;
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', false);
      handleAnimation(e, n, 'mouseLeave', _options, go);
      hoverFun(e, n);
    };
    _options.events.mouseLeave = overideFun;
  } else {
    let overideFun = function(e, n) {
      n.diagram.model.set(n.data, 'isHover', false);
      handleAnimation(e, n, 'mouseLeave', _options, go);
    };
    _options.events.mouseLeave = overideFun;
  }
  if (_options.events.click) {
    let originFun = _options.events.click;
    let overideFun = function(e, n) {
      handleAnimation(e, n, 'click', _options, go);
      originFun(e, n);
    };
    _options.events.click = overideFun;
  } else {
    let overideFun = function(e, n) {
      // console.log('click', n);
      handleAnimation(e, n, 'click', _options, go);
    };
    _options.events.click = overideFun;
  }
  if (_options.events.doubleClick) {
    let originFun = _options.events.doubleClick;
    let overideFun = function(e, n) {
      console.log('dbclick', n);
      handleAnimation(e, n, 'dbclick', _options, go);
      originFun(e, n);
    };
    _options.events.doubleClick = overideFun;
  } else {
    let overideFun = function(e, n) {
      console.log('dbclick', n);
      handleAnimation(e, n, 'dbclick', _options, go);
    };
    _options.events.doubleClick = overideFun;
  }
}
export default function($, go, options) {
  let _options = handleLinkDefault($, go, options);
  console.log('link', _options);
  let { extendUp, extendDown } = handleParts(_options)
  // 处理事件
  handleEvents(_options, $, go);
  return link($, go, {
    props: {
      name: 'sLinkNode',
      zOrder: -1,
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
