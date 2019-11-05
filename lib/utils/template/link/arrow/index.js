import { arrowBinding } from './bind';
import { shape } from '../../../node-parts';
export function toArrow($, go, _options) {
  return shape($, go, {
    props: {
      ..._options.props._toArrowOptions.props
    },
    binding: arrowBinding($, go, 'to', _options)
  });
}

export function fromArrow($, go, _options) {
  return shape($, go, {
    props: {
      ..._options.props._fromArrowOptions.props
    },
    binding: arrowBinding($, go, 'from', _options)
  });
}
