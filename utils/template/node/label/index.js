import { panel, textBlock, shape } from '../../../node-parts';
import {
  labelBinding,
  labelShapeBinding,
  labelArrayBinding,
  labelArrayPanelBinding
} from './bind';
export default function label($, go, _options) {
  return panel($, go, {
    type: 'auto',
    props: {
      portId: 'tLabel',
      ..._options.props._labelOuterPanelOptions.props
    },
    parts: [
      shape($, go, {
        props: {
          figure: 'Rectangle',
          ..._options.props._labelShapeOptions.props
        },
        binding: labelShapeBinding($, go, _options)
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
            binding: labelBinding($, go, _options)
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
              })
            },
            binding: labelArrayPanelBinding($, go, _options)
          }),
          ..._options.props._labelInnerPanelOptions.parts
        ]
      }),
      ..._options.props._labelInnerPanelOptions.parts
    ]
  });
}
