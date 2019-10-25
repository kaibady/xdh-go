import { panel, textBlock, shape } from '../../../node-parts';
import {
    tagOuterPanelBinding,
    tagShapeBinding,
    tagBinding
  } from './bind';
export default function tag($, go, _options) {
    return panel($, go, {
        type: 'auto',
        props: {
          ..._options.props._tagOuterPanelOptions.props
        },
        parts: [
          shape($, go, {
            props: {
              figure: 'RoundedRectangle',
              ..._options.props._tagShapeOptions.props
            },
            binding: tagShapeBinding($, go, _options)
          }),
          panel($, go, {
            type: 'ver',
            props: {
              ..._options.props._tagInnerPanelOptions.props
            },
            parts: [
              textBlock($, go, {
                props: {
                  ..._options.props._tagTextOptions.props
                },
                binding: tagBinding($, go, _options)
              }),
              ..._options.props._tagInnerPanelOptions.parts
            ]
          }),
          ..._options.props._tagInnerPanelOptions.parts
        ],
        binding: tagOuterPanelBinding($, go, _options)
      })
}