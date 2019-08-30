import { link, textBlock, shape } from '../../node-parts';
import {
  linkBinding,
  lineBinding,
  arrowBinding,
  textBlockBinding,
  linkHolderBinding
} from './bindings';
import { handleLinkDefault } from './default';
console.log(shape);
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
    parts: [
      // 连线
      shape($, go, {
        props: { ..._options.props._lineOptions.props },
        parts: [..._options.props._lineOptions.parts],
        binding: lineBinding($, go, _options)
      }),
      ...extendDown,
      // 末尾箭头
      shape($, go, {
        props: {
          fill: 'black',
          stroke: null,
          ..._options.props._toArrowOptions.props
        },
        parts: [..._options.props._toArrowOptions.parts],
        binding: arrowBinding($, go, 'to', _options)
      }),
      // 起始箭头
      shape($, go, {
        props: {
          fill: 'black',
          stroke: null,
          ..._options.props._fromArrowOptions.props
        },
        parts: [..._options.props._fromArrowOptions.parts],
        binding: arrowBinding($, go, 'from', _options)
      }),
      // label 文字
      textBlock($, go, {
        props: {
          stroke: '#000',
          ..._options.props._labelPropsOptions.props
        },
        parts: [..._options.props._labelPropsOptions.parts],
        binding: textBlockBinding($, go, _options)
      }),
      // 占位
      shape($, go, {
        props: {
          height: 'auto',
          width: 'auto',
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 30,
          segmentOffset: new go.Point(0, 0),
          segmentOrientation: go.Link.Normal,
          ..._options.props._holderPropsOptions.props
        },
        parts: [..._options.props._holderPropsOptions.parts],
        binding: linkHolderBinding($, go, _options)
      }),
      ...extendUp
    ],
    binding: linkBinding($, go, _options),
    events: _options.events
  });
}
