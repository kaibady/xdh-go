import { binding } from '../../node-parts';
/**
 *
 * @param {Object} n 节点对象
 * @param {*} _options
 * @param {*} bindProp 绑定的参数名
 */
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
/**
 *
 * @param {Object} _options
 * @param {String} bindProp 绑定的图形key
 * @param {Array} bindParamArr 图形参数
 */
export function shapeParamsBinding(_options, bindProp, bindParamArr) {
  let obj = {};
  bindParamArr.forEach(paramName => {
    obj[paramName] = {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams[bindProp] &&
          d.shapeParams[bindProp][paramName] !== undefined
        ) {
          return d.shapeParams[bindProp][paramName];
        } else {
          return _options.props.shapeParams[bindProp][paramName];
        }
      }
    };
  });
  return obj;
}

export function innerPanelBinding($, go, _options) {
  return binding($, go, {
    type: {
      key: '',
      handler(d) {
        if (d.layout) {
          return go.Panel[d.layout];
        } else {
          return go.Panel[_options.props.layout];
        }
      }
    },
    margin: {
      key: '',
      handler(d) {
        if (typeof d.nodeMargin === 'number') {
          return d.figureMargin;
        } else if (d.nodeMargin instanceof Array) {
          return new go.Margin(...d.nodeMargin);
        } else {
          return new go.Margin(..._options.props.nodeMargin);
        }
      }
    }
  });
}

export function nodeBinding($, go, _options) {
  return binding($, go, {
    portId: {
      key: '',
      handler(d) {
        if (
          (d.linkPort !== undefined && d.linkPort === 'tNode') ||
          (d.linkPort === undefined && _options.props.linkPort === 'tNode')
        ) {
          return '';
        } else {
          return 'tNode';
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
    location: {
      type: ['makeTwoWay', go.Point.stringify],
      key: 'loc',
      handler: go.Point.parse
    },
    scale: {
      key: '',
      handler: getHandler($, go, _options, ['scale'])
    },
    zOrder: {
      key: '',
      handler: getHandler($, go, _options, ['zOrder'])
    }
  });
}
export function tooltipShape($, go, _options) {
  return binding($, go, {
    fill: {
      key: '',
      handler: getHandler($, go, _options, ['tooltip', 'background'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tooltip', 'stroke'])
    },
    strokeWidth: {
      key: '',
      handler: getHandler($, go, _options, ['tooltip', 'strokeWidth'])
    }
  });
}
export function tooltipAdornment($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.tooltip && typeof d.tooltip === 'string') {
          return true;
        } else if (d.tooltip && d.tooltip.text) {
          return true;
        } else if (_options.props.tooltip && _options.props.tooltip.text) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
export function tooltipBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: '',
      handler(d) {
        if (d.tooltip && typeof d.tooltip === 'string') {
          return d.tooltip;
        } else if (d.tooltip && d.tooltip.text) {
          return d.tooltip.text;
        } else if (_options.props.tooltip && _options.props.tooltip.text) {
          return _options.props.tooltip.text;
        } else {
          return '';
        }
      }
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tooltip', 'color'])
    },
    font: {
      key: '',
      handler: getHandler($, go, _options, ['tooltip', 'font'])
    }
  });
}
