import { binding } from '../../../node-parts/index';
import {bindToState} from '../bindings'
export function linkHolderBinding($, go, _options) {
  return binding($, go, {
    geometryString: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return n.path.geometryString;
      }
    }
  });
}
export function lineBinding($, go, _options) {
  return binding($, go, {
    strokeDashArray: {
      key: '',
      handler(data) {
        let d = data.dashes;
        if (d instanceof Array) {
          return d;
        } else if (d === true) {
          return [4, 4, 4, 4];
        } else {
          return _options.props.dashes;
        }
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'lineColor');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'lineWidth');
      }
    }
  });
}
