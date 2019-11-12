import {
  labelShapeBinding,
  labelPanelBinding,
  labelBinding,
  labelArrayBinding,
  labelArrayPanelBinding
} from './bind';
import { textBlock, shape, panel } from '../../../node-parts';
export function label($, go, _options) {
  return panel($, go, {
    type: 'auto',
    props: {
      segmentOrientation: go.Link.OrientUpright,
      ..._options.props._outerPanelOptions.props
    },
    parts: [
      shape($, go, {
        props: {
          stroke: null,
          ..._options.props._labelShapeOptions.props
        },
        binding: [
          ...labelShapeBinding($, go, _options),
          ..._options.props._labelShapeOptions.binding
        ]
      }),
      panel($, go, {
        type: 'ver',
        props: {
          ..._options.props._innerPanelOptions.props
        },
        parts: [
          // label 文字
          textBlock($, go, {
            props: {
              stroke: '#000',
              ..._options.props._labelTextOptions.props
            },
            binding: [
              ...labelBinding($, go, _options),
              ..._options.props._labelTextOptions.binding
            ]
          }),
          // 多行文本
          panel($, go, {
            type: 'ver',
            props: {
              itemTemplate: panel($, go, {
                type: 'auto',
                parts: [
                  textBlock($, go, {
                    binding: labelArrayBinding($, go, _options)
                  })
                ]
              }),
              ..._options.props._labelArrayOptions.props
            },
            parts: [..._options.props._labelArrayOptions.parts],
            binding: [
              ...labelArrayPanelBinding($, go, _options),
              ..._options.props._labelArrayOptions.binding
            ]
          }),
          ..._options.props._innerPanelOptions.parts
        ]
      }),
      ..._options.props._outerPanelOptions.parts
    ],
    binding: [
      ...labelPanelBinding($, go, _options),
      ..._options.props._outerPanelOptions.binding
    ]
  });
}
