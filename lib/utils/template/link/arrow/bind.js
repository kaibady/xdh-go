import { bindToState } from '../bindings';
import { binding } from '../../../node-parts/index';
export function arrowBinding($, go, name, _options) {
  let props = _options.props;
  let bindOpt = {
    visible: {
      key: '',
      handler(data) {
        let d = data.arrows;
        if (d && typeof d === 'string' && d.includes(name)) {
          return true;
        } else if (d && typeof d === 'object' && d[name]) {
          if (d[name].show === undefined) {
            return true;
          } else {
            return false;
          }
        } else {
          return props.arrows[name].show;
        }
      }
    },
    scale: {
      key: '',
      handler(data) {
        let d = data.arrows;
        if (d && typeof d === 'object' && d[name] && d[name].scale) {
          return d[name].scale;
        } else {
          return props.arrows[name].scale;
        }
      }
    },
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'arrowFill');
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'arrowStroke');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'arrowStrokeWidth');
      }
    }
  };
  let type = {
    key: '',
    handler(data) {
      let d = data.arrows;
      if (d && typeof d === 'object' && d[name] && d[name].type) {
        return d[name].type;
      } else {
        return props.arrows[name].type;
      }
    }
  };
  if (name === 'from') {
    bindOpt.fromArrow = type;
  } else if (name === 'to') {
    bindOpt.toArrow = type;
  }
  return binding($, go, bindOpt);
}
