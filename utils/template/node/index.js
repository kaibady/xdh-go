import {
  verPanel,
  spotPanel,
  node,
  picture,
  textBlock,
  iconfont,
  shape,
  tooltip
} from '../../node-parts';
import { genOption } from '../../node-parts/util/fun';
import { defaultProps } from './default';
import {
  pictureBinding,
  pictureCircleBinding,
  shapeBinding,
  clipBinding,
  iconfontBinding,
  nodeBinding,
  labelBinding,
  tooltipBinding,
  tooltipShape,
  tooltipAdornment
} from './bindings';

export default function($, go, options) {
  let _options = genOption(defaultProps($, go), options);
  console.log(_options);
  // 用于扩展节点
  let extendUp = [],
    extendDown = [];
  if (_options.parts && _options.parts instanceof Array) {
    extendUp = [..._options.parts];
  } else if (_options.parts && _options.parts.up) {
    extendUp = [..._options.parts.up];
    extendDown = [..._options.parts.down];
  }
  return node($, go, {
    props: {
      shadowVisible: true,
      toolTip: tooltip($, go, {
        shapeBinding: tooltipShape($, go, _options),
        adornmentBinding: tooltipAdornment($, go, _options),
        binding: tooltipBinding($, go, _options)
      })
    },
    binding: nodeBinding($, go, _options),
    parts: [
      spotPanel($, go, {
        parts: [
          ...extendDown,
          verPanel($, go, {
            parts: [
              spotPanel($, go, {
                porps: {
                  portId: '',
                  fromPortSpot: true,
                  toPortSport: true
                },
                parts: [
                  shape($, go, {
                    type: 'Circle',
                    props: {
                       width: 60,
                       height: 60,
                       background: 'transparent',
                       strokeWidth: 3,
                       stroke: 'red',
                       portId: '',
                    },
                    binding: pictureCircleBinding($, go, 'circularImage', _options)
                  }),
                  picture($, go, {
                    props: {
                      portId: ''
                    },
                    clipBinding: clipBinding($, go, _options),
                    binding: pictureBinding($, go, 'circularImage', _options)
                  }),
                  picture($, go, {
                    clip: {},
                    isClipping: false,
                    props: {
                      portId: ''
                    },
                    binding: pictureBinding($, go, 'image', _options)
                  }),
                  shape($, go, {
                    props: {
                      portId: ''
                    },
                    binding: shapeBinding($, go, _options)
                  }),
                  iconfont($, go, {
                    props: {
                      portId: ''
                    },
                    binding: iconfontBinding($, go, _options)
                  })
                ]
              }),
              textBlock($, go, {
                props: {},
                binding: labelBinding($, go, _options)
              })
            ]
          }),
          ...extendUp
        ]
      })
    ]
  });
}
