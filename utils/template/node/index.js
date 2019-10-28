import { panel, node, tooltip } from '../../node-parts';
import { handleNodeDefault } from './default';
import figure from './figure/index';
import label from './label/index';
import container from './container/index';
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
 * @name handleHover
 * @description 处理节点mouseEnter,mouseLeave和isHover参数
 * @param {Object} _options 节点配置
 */
function handleHover(_options) {
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
}
export default function($, go, options) {
  let _options = handleNodeDefault($, go, options);
  // console.log('node options', _options);
  // 处理parts, 用于扩展节点
  let { extendUp, extendDown } = handleParts(_options);
  // 处理事件
  handleHover(_options);
  return node($, go, {
    props: {
      portId: 'tNode',
      shadowVisible: true,
      toolTip: tooltip($, go, {
        shape: { binding: tooltipShape($, go, _options) },
        adornment: { binding: tooltipAdornment($, go, _options) },
        binding: tooltipBinding($, go, _options)
      }),
      ..._options.props._nodeOptions.props
    },
    binding: nodeBinding($, go, _options),
    parts: [
      panel($, go, {
        type: 'auto',
        props: {
          portId: 'tPanel1',
          ..._options.props._outerPanelOptions.props
        },
        parts: [
          ...extendDown,
          // 节点外框
          container($, go, _options),
          panel($, go, {
            type: 'ver',
            props: {
              portId: 'tPanel2',
              ..._options.props._innerPanelOptions.props
            },
            parts: [
              // 图形部分，包括四种类型
              figure($, go, _options),
              // 文字部分
              label($, go, _options),
              ..._options.props._innerPanelOptions.parts
            ],
            binding: innerPanelBinding($, go, _options)
          }),
         
          ...extendUp,
          ..._options.props._outerPanelOptions.parts
        ]
      }),
      ..._options.props._nodeOptions.parts
    ],
    events: _options.events
  });
}
