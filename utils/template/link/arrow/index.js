import { arrowBinding, arrowPanelBinding } from './bind'
import { shape } from '../../../node-parts'
export function toArrow($, go, _options) {
  let _arrow = shape($, go, {
    props: {
      stroke: 'transparent',
      fill: 'transparent',

      ..._options.props._toArrowOptions.props
    },
    binding: arrowBinding($, go, 'to', _options)
  })
  return $(
    go.Panel,
    'Spot',
    {
      name: 'sToArrow',
      segmentIndex: -1,
      alignmentFocus: new go.Spot(1, 0.5),
      segmentOrientation: go.Link.OrientAlong
    },
    _arrow,
    ...arrowPanelBinding($, go, 'to', _options)
  )
}

export function fromArrow($, go, _options) {
  let _arrow = shape($, go, {
    props: {
      stroke: 'transparent',
      fill: 'transparent',

      ..._options.props._fromArrowOptions.props
    },
    binding: arrowBinding($, go, 'from', _options)
  })
  return $(
    go.Panel,
    'Position',
    {
      name: 'sFromArrow',
      segmentIndex: 0,
      alignmentFocus: new go.Spot(0, 0.5),
      segmentOrientation: go.Link.OrientAlong
    },
    _arrow,
    ...arrowPanelBinding($, go, 'from', _options)
  )
}
