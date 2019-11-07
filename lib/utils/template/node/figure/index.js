import { panel, picture, iconfont, shape } from '../../../node-parts';
import tag from '../tag/index';
import {
  pictureBinding,
  pictureCircleBinding,
  pictureHolderBinding,
  picturePanelBinding,
  shapeBinding,
  pictureClipBinding,
  iconfontBinding,
  figurePanelBinding
} from './bind';
export default function figure($, go, _options) {
  return panel($, go, {
    type: 'spot',
    props: {
      name: 'tFigure',
      ..._options.props._figurePanelOptions.props
    },
    parts: [
      // 表示状态的圈
      shape($, go, {
        props: {
          figure: 'Circle',
          background: 'transparent',
          portId: 'StateShape',
          ..._options.props._stateShapeOptions.props
        },
        parts: [..._options.props._stateShapeOptions.parts],
        binding: [
          ...pictureCircleBinding($, go, _options),
          ..._options.props._stateShapeOptions.binding
        ]
      }),
      picture($, go, {
        clip: {
          props: {
            ..._options.props._clipShapeOptions.props
          },
          binding: [
            ...pictureClipBinding($, go, _options),
            ..._options.props._clipShapeOptions.binding
          ]
        },
        panel: {
          props: {
            ..._options.props._clipPanelOptions.props
          },
          binding: [
            ...picturePanelBinding($, go, _options),
            ..._options.props._clipPanelOptions.binding
          ]
        },
        props: {
          ..._options.props._pictureOptions.props
        },
        binding: [
          ...pictureBinding($, go, _options),
          ..._options.props._pictureOptions.binding
        ]
      }),
      // 增加一个不可见的环，放置外圈尺寸在改变时影响外部尺寸，导致布局变动
      shape($, go, {
        props: {
          fill: 'red',
          stroke: 'transparent',
          ..._options.props._figureHolderOptions.props
        },
        parts: [..._options.props._figureHolderOptions.parts],
        binding: [
          ...pictureHolderBinding($, go, _options),
          ..._options.props._figureHolderOptions.binding
        ]
      }),
      // 图形类型
      shape($, go, {
        props: {
          fill: '#000',
          ..._options.props._shapeOptions.props
        },
        binding: [
          ...shapeBinding($, go, _options),
          ..._options.props._shapeOptions.binding
        ],
        parts: [..._options.props._shapeOptions.parts]
      }),
      iconfont($, go, {
        props: {
          ..._options.props._iconOptions.props
        },
        binding: [
          ...iconfontBinding($, go, _options),
          ..._options.props._iconOptions.binding
        ],
        parts: [..._options.props._iconOptions.parts]
      }),
      // 附加标签
      tag($, go, _options),
      ..._options.props._figurePanelOptions.parts
    ],
    binding: [
      ...figurePanelBinding($, go, _options),
      ..._options.props._figurePanelOptions.binding
    ]
  });
}
