import {
  panel,
  node,
  picture,
  textBlock,
  iconfont,
  shape,
  tooltip
} from '../../node-parts';
import { handleNodeDefault } from './default';
import {
  pictureBinding,
  pictureCircleBinding,
  pictureHolderBinding,
  picturePanelBinding,
  shapeBinding,
  pictureClipBinding,
  iconfontBinding,
  nodeBinding,
  labelBinding,
  tooltipBinding,
  tooltipShape,
  tooltipAdornment
} from './bindings';

export default function($, go, options) {
  let _options = handleNodeDefault($, go, options);
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
  return node($, go, {
    props: {
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
        type: 'spot',
        props: {
          ..._options.props._layerOptions.props
        },
        parts: [
          ...extendDown,
          panel($, go, {
            type: 'ver',
            parts: [
              panel($, go, {
                type: 'spot',
                porps: {
                  portId: '',
                  fromPortSpot: true,
                  toPortSport: true,
                  ..._options.props._figureContainerOptions.props
                },
                parts: [
                  // 增加一个不可见的环，放置外圈尺寸在改变时影响外部尺寸，导致布局变动
                  shape($, go, {
                    props: {
                      figure: 'Circle',
                      background: 'transparent',
                      stroke: 'transparent',
                      portId: '',
                      ..._options.props._figureHolderOptions.props
                    },
                    parts: [..._options.props._figureHolderOptions.parts],
                    binding: pictureHolderBinding($, go, _options)
                  }),
                  // 表示状态的圈
                  shape($, go, {
                    props: {
                      figure: 'Circle',
                      background: 'transparent',
                      portId: '',
                      ..._options.props._figureStrokeOptions.props
                    },
                    parts: [..._options.props._figureStrokeOptions.parts],
                    binding: pictureCircleBinding($, go, _options)
                  }),
                  picture($, go, {
                    clip: {
                      props: {},
                      binding: pictureClipBinding($, go, _options)
                    },
                    panel: {
                      binding: picturePanelBinding($, go, _options)
                    },
                    props: {
                      portId: '',
                      ..._options.props._pictureOptions.props
                    },
                    binding: pictureBinding($, go, _options)
                  }),
                  // 图形类型
                  shape($, go, {
                    props: {
                      portId: '',
                      ..._options.props._shapeOptions.props
                    },
                    binding: shapeBinding($, go, _options),
                    parts: [..._options.props._shapeOptions.parts]
                  }),
                  iconfont($, go, {
                    props: {
                      portId: '',
                      ..._options.props._iconfontOptions.props
                    },
                    binding: iconfontBinding($, go, _options),
                    parts: [..._options.props._iconfontOptions.parts]
                  }),
                  ..._options.props._figureContainerOptions.parts
                ]
              }),
              textBlock($, go, {
                props: {
                  ..._options.props._labelOptions.props
                },
                parts: [..._options.props._labelOptions.parts],
                binding: labelBinding($, go, _options)
              })
            ]
          }),
          ...extendUp,
          ..._options.props._layerOptions.parts
        ]
      }),
      ..._options.props._nodeOptions.parts
    ],
    events: _options.events
  });
}
