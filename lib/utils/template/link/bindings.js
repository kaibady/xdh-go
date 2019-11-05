import { binding } from '../../node-parts';
export function bindToState(n, _options, bindProp) {
  let d = n.data;
  let props = _options.props;
  if (d.isGray) {
    if (typeof d[bindProp] === 'string' || typeof d[bindProp] === 'number') {
      return d[bindProp];
    } else if (
      typeof d[bindProp] === 'object' &&
      d[bindProp].gray !== undefined
    ) {
      return d[bindProp].gray;
    } else {
      return props[bindProp].gray;
    }
  } else if (n.isSelected) {
    if (typeof d[bindProp] === 'string' || typeof d[bindProp] === 'number') {
      return d[bindProp];
    } else if (
      typeof d[bindProp] === 'object' &&
      d[bindProp].select !== undefined
    ) {
      return d[bindProp].select;
    } else {
      return props[bindProp].select;
    }
  } else if (d.isHover) {
    if (typeof d[bindProp] === 'string' || typeof d[bindProp] === 'number') {
      return d[bindProp];
    } else if (
      typeof d[bindProp] === 'object' &&
      d[bindProp].hover !== undefined
    ) {
      return d[bindProp].hover;
    } else {
      return props[bindProp].hover;
    }
  } else if (n.isHighlighted) {
    if (typeof d[bindProp] === 'string' || typeof d[bindProp] === 'number') {
      return d[bindProp];
    } else if (
      typeof d[bindProp] === 'object' &&
      d[bindProp].highlight !== undefined
    ) {
      return d[bindProp].highlight;
    } else {
      return props[bindProp].highlight;
    }
  } else {
    if (typeof d[bindProp] === 'string' || typeof d[bindProp] === 'number') {
      return d[bindProp];
    } else if (
      typeof d[bindProp] === 'object' &&
      d[bindProp].normal !== undefined
    ) {
      return d[bindProp].normal;
    } else {
      return props[bindProp].normal;
    }
  }
}
/**
 *
 * @param {Object} $
 * @param {Object} go
 * @param {Object} _options
 * @param {Array} propArr 参数数组，如 ['tag', 'text']
 */
export function getHandler($, go, _options, propArr) {
  let p1 = propArr[0],
    p2 = propArr[1];
  let fun;
  if (p1 && p2) {
    fun = d => {
      if (d[p1] && d[p1][p2]) {
        return d[p1][p2];
      } else {
        return _options.props[p1][p2];
      }
    };
  } else if (p1) {
    fun = d => {
      if (d[p1]) {
        return d[p1];
      } else {
        return _options.props[p1];
      }
    };
  }

  return fun;
}
export function linkBinding($, go, _options) {
  return binding($, go, {
    curve: {
      key: '',
      handler(d) {
        if (d.type && d.type === 'curve') {
          return go.Link.Bezier;
        } else if(d.type && d.type === 'straight') {
          return go.Link.None;
        } else if(d.type && d.type === 'route') {
          return go.Link.JumpGap;
        } else {
          return go.Link.Bezier;
        }
      }
    },
    curviness: {
      key: '',
      handler(d) {
        if (d.type && d.type === 'curve') {
          return NaN;
        } else if(d.type && d.type === 'straight') {
          return 0;
        } else if(d.type && d.type === 'route') {
          return 20;
        } else {
          return 20;
        }
      }
    },
    corner: {
      key: '',
      handler(d) {
       if(d.type && d.type === 'route') {
          return 10;
        } else {
          return 0;
        }
      }
    },
    routing: {
      key: '',
      handler(d) {
        if(d.type && d.type === 'route') {
          return go.Link.AvoidsNodes;
        } else {
          return go.Link.Normal;
        }
      }
    },
    smoothness: {
      key: '',
      handler(d) {
        if (d.smoothness !== undefined) {
          return d.smoothness;
        } else {
          return _options.props.smoothness;
        }
      }
    },
    opacity: {
      key: '',
      handler(d) {
        if (d.opacity) {
          return d.opacity;
        } else {
          return _options.props.opacity;
        }
      }
    },
    fromShortLength: {
      key: '',
      handler: getHandler($, go, _options, ['fromShortLength'])
    },
    toShortLength: {
      key: '',
      handler: getHandler($, go, _options, ['toShortLength'])
    }
  });
}
