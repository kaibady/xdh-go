import { panel, textBlock, shape } from '../../../node-parts'
import {
  labelBinding,
  labelPanelBinding,
  labelShapeBinding,
  labelArrayBinding,
  labelArrayPanelBinding
} from './bind'
export default function label($, go, _options) {
  return panel($, go, {
    type: 'auto',
    props: {
      name: 'tLabel',
      portId: 'tLabel',
      ..._options.props._labelOuterPanelOptions.props
    },
    parts: [
      shape($, go, {
        props: {
          figure: 'Rectangle',
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
          ..._options.props._labelInnerPanelOptions.props
        },
        parts: [
          // 单行文本
          textBlock($, go, {
            props: {
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
            binding: [
              ...labelArrayPanelBinding($, go, _options),
              ..._options.props._labelArrayOptions.binding
            ]
          }),
          ..._options.props._labelInnerPanelOptions.parts
        ],
        binding: [..._options.props._labelInnerPanelOptions.binding]
      }),
      ..._options.props._labelOuterPanelOptions.parts
    ],
    binding: [
      ...labelPanelBinding($, go, _options),
      ..._options.props._labelOuterPanelOptions.binding
    ]
  })
}
