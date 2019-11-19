import { shape } from '../../../node-parts'
import { lineBinding, linkHolderBinding } from './bind'
export function line($, go, _options) {
  return shape($, go, {
    props: {
      name: 'sLine',
      strokeDashArray: [4, 4, 4, 4],
      ..._options.props._lineOptions.props
    },
    binding: lineBinding($, go, _options)
  })
}

export function lineHolder($, go, _options) {
  return shape($, go, {
    props: {
      name: 'sLineHolder',
      height: 'auto',
      width: 'auto',
      stroke: 'rgba(0,0,0,0)',
      strokeWidth: 30,
      strokeDashArray: null,
      segmentOffset: new go.Point(0, 0),
      segmentOrientation: go.Link.Normal,
      ..._options.props._linkHolderOptions.props
    },
    parts: [..._options.props._linkHolderOptions.parts],
    binding: [
      ...linkHolderBinding($, go, _options),
      ..._options.props._linkHolderOptions.binding
    ]
  })
}
