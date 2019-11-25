import { panel, node, tooltip } from '../../node-parts';
import { handleNodeDefault } from './default';
import figure from './figure/index';
import label from './label/index';
import container from './container/index';
import handleAnimation from '../../animation';

import {
  innerPanelBinding,
  nodeBinding,
  tooltipBinding,
  tooltipShape,
  tooltipAdornment
} from './bindings';
/**
 * @function
 * @name handleParts
 * @description 处理节点parts参数
 * @param {Object} _options 节点配置
 */
function handleParts(_options) {
  let extendUp = [],
    extendDown = [];
  if (_options.parts && _options.parts instanceof Array) {
    extendUp = [..._options.parts];
  } else if (_options.parts && (_options.parts.up || _options.parts.down)) {
    extendUp = [...(_options.parts.up || [])];
    extendDown = [...(_options.parts.down || [])];
  }
  return {
    extendUp,
    extendDown
  };
}

/**
 * @function
 * @name handleEvents
 * @description 处理节点mouseEnter,mouseLeave和isHover参数
 * @param {Object} _options 节点配置
 */
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
      // console.log('mouseEnter', n);
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
      // console.log('mouseLeave', n);
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
      handleAnimation(e, n, 'dbclick', _options, go);
      originFun(e, n);
    };
    _options.events.doubleClick = overideFun;
  } else {
    let overideFun = function(e, n) {
      // console.log('dbclick', n);
      handleAnimation(e, n, 'dbclick', _options, go);
    };
    _options.events.doubleClick = overideFun;
  }
}
export default function($, go, options) {
  let _options = handleNodeDefault($, go, options);
  // console.log('node options', _options);
  // 处理parts, 用于扩展节点
  let { extendUp, extendDown } = handleParts(_options);
  // 处理事件
  handleEvents(_options, $, go);
  return node($, go, {
    props: {
      name: 'tNode',
      portId: 'tNode',
      locationObjectName: 'tLocPoint',
      shadowVisible: true,
      toolTip: tooltip($, go, {
        shape: { binding: tooltipShape($, go, _options) },
        adornment: { binding: tooltipAdornment($, go, _options) },
        binding: tooltipBinding($, go, _options)
      }),
      ..._options.props._nodeOptions.props
    },
    binding: [...nodeBinding($, go, _options), ...(_options.binding || [])],
    parts: [
      panel($, go, {
        type: 'auto',
        props: {
          ..._options.props._outerPanelOptions.props
        },
        parts: [
          // 节点外框
          container($, go, _options),
          ...extendDown,
          panel($, go, {
            type: 'ver',
            props: {
              ..._options.props._innerPanelOptions.props
            },
            parts: [
              // 图形部分，包括四种类型
              figure($, go, _options),
              // 文字部分
              label($, go, _options),
              ..._options.props._innerPanelOptions.parts
            ],
            binding: [
              ...innerPanelBinding($, go, _options),
              ..._options.props._innerPanelOptions.binding
            ]
          }),

          ...extendUp,
          ..._options.props._outerPanelOptions.parts
        ],
        binding: [..._options.props._outerPanelOptions.binding]
      }),
      ..._options.props._nodeOptions.parts
    ],
    events: _options.events || {}
  });
}
