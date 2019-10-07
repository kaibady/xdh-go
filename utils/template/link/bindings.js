import { binding } from '../../node-parts';
function bindSelect(n, _options, bindProp) {
  let d = n.data;
  let props = _options.props;
  if (n.isSelected) {
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
export function linkBinding($, go, _options) {
  return binding($, go, {
    curve: {
      key: '',
      handler(d) {
        if (d.curve !== undefined) {
          return d.curve;
        } else {
          return _options.props.curve;
        }
      }
    },
    curviness: {
      key: '',
      handler(d) {
        if (d.curviness !== undefined) {
          return d.curviness;
        } else {
          return _options.props.curve;
        }
      }
    },
    corner: {
      key: '',
      handler(d) {
        if (d.corner !== undefined) {
          return d.corner;
        } else {
          return _options.props.corner;
        }
      }
    },
    routing: {
      key: '',
      handler(d) {
        if (d.routing !== undefined) {
          return d.routing;
        } else {
          return _options.props.routing;
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
        if (d.hidden) {
          return 0;
        } else {
          return 1;
        }
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
        return bindSelect(n, _options, 'strokeColor');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'strokeWidth');
      }
    }
  });
}
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
          return true;
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
        return bindSelect(n, _options, 'arrowFill');
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'strokeColor');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'strokeWidth');
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
export function labelBinding($, go, _options) {
  return binding($, go, {
    font: {
      key: 'font',
      handler(d) {
        if (d) {
          return d;
        } else {
          return _options.props.font;
        }
      }
    },
    text: {
      key: '',
      handler(d) {
        if (typeof d.label === 'string') {
          return d.label;
        } else if (d.label && d.label.text) {
          return d.label.text;
        } else {
          return '';
        }
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'labelStroke');
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          (typeof d.label === 'string' && d.label !== '') ||
          (d.label && d.label.text)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}

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

export function labelShapeBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          d.label === undefined ||
          (typeof d.label === 'object' && !d.label.text) ||
          (typeof d.label === 'object' && d.label.show === false) ||
          (typeof d.label === 'object' &&
            d.label.show === undefined &&
            _options.props.label.show === false)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'labelBackground');
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'labelStroke');
      }
    }
  });
}
