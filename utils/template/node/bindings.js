import { defaultImage } from './default';
import { binding } from '../../node-parts';
export function clipBinding($, go, _options) {
  return binding($, go, {
    width: {
      key: '',
      handler(d) {
        if (d.size) {
          return d.size;
        } else {
          return _options.props.size;
        }
      }
    },
    height: {
      key: '',
      handler(d) {
        if (d.size) {
          return d.size;
        } else {
          return _options.props.size;
        }
      }
    }
  });
}
export function pictureBinding($, go, type, _options) {
  return binding($, go, {
    source: { key: 'image' },
    errorFunction: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return (pic, e) => {
          if (n.data.brokenImage) {
            let img = new Image();
            img.src = n.data.brokenImage;
            img.onload = () => {
              pic.source = n.data.brokenImage;
            };
            img.onerror = () => {
              pic.source = defaultImage;
            };
          } else {
            pic.source = defaultImage;
          }
        };
      }
    },
    visible: {
      key: '',
      handler(d) {
        if ([type].includes(d.shape)) {
          return true;
        } else {
          return false;
        }
      }
    },
    width: {
      key: '',
      handler(d) {
        if (d.size) {
          return d.size;
        } else {
          return _options.props.size;
        }
      }
    },
    height: {
      key: '',
      handler(d) {
        if (d.size) {
          return d.size;
        } else {
          return _options.props.size;
        }
      }
    }
  });
}
function bindSelect(n, _options, bindProp) {
  let d = n.data;
  let props = _options.props;
  if (!n.isHighlighted && !n.isSelected) {
    if (typeof d[bindProp] === 'string') {
      return d[bindProp];
    } else if (typeof d[bindProp] === 'object' && d[bindProp].normal) {
      return d[bindProp].normal;
    } else {
      return props[bindProp].normal;
    }
  } else if (n.isHighlighted) {
    if (typeof d[bindProp] === 'string') {
      return d[bindProp];
    } else if (typeof d[bindProp] === 'object' && d[bindProp].highlight) {
      return d[bindProp].highlight;
    } else {
      return props[bindProp].highlight;
    }
  } else if (n.isSelected) {
    if (typeof d[bindProp] === 'string') {
      return d[bindProp];
    } else if (typeof d[bindProp] === 'object' && d[bindProp].select) {
      return d[bindProp].select;
    } else {
      return props[bindProp].select;
    }
  } else {
    return props[bindProp].normal;
  }
}
export function shapeBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (!['circularImage', 'image', 'icon'].includes(d.shape)) {
          return true;
        } else {
          return false;
        }
      }
    },
    figure: 'shape',
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'background');
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
    },
    width: {
      key: '',
      handler(d) {
        return d.size;
      }
    },
    height: {
      key: '',
      handler(d) {
        return d.size;
      }
    }
  });
}
export function iconfontBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.shape === 'icon') {
          return true;
        } else {
          return false;
        }
      }
    },
    text: {
      key: '',
      handler(d) {
        if (d.icon && d.icon.text) {
          return d.icon.text;
        } else {
          return _options.props.icon.text;
        }
      }
    },
    font: {
      key: '',
      handler(d) {
        if (d.icon && d.icon.iconfont) {
          return d.icon.iconfont;
        } else {
          return _options.props.icon.iconfont;
        }
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'background');
      }
    }
  });
}
export function nodeBinding($, go, _options) {
  return binding($, go, {
    opacity: {
      key: '',
      handler(d) {
        if (d.hidden) {
          return 0;
        } else {
          return 1;
        }
      }
    },
    location: {
      type: ['makeTwoWay', go.Point.stringify],
      key: 'loc',
      handler: go.Point.parse
    }
  });
}
export function tooltipShape($, go, _options) {
  return binding($, go, {
    fill: {
      key: '',
      handler(d) {
        if (d.tooltip && d.tooltip.background) {
          return d.tooltip.background;
        } else {
          return _options.props.tooltip.background;
        }
      }
    },
    stroke: {
      key: '',
      handler(d) {
        if (d.tooltip && d.tooltip.stroke) {
          return d.tooltip.stroke;
        } else {
          return _options.props.tooltip.stroke;
        }
      }
    }
  });
}
export function tooltipAdornment($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.tooltip && d.tooltip.text) {
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
        if (d.tooltip && d.tooltip.text) {
          return d.tooltip.text;
        } else {
          return '';
        }
      }
    }
  });
}
export function labelBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: '',
      handler(d) {
        console.log(d.key, d);
        if (d.label === undefined) {
          return '';
        } else if (typeof d.label === 'string') {
          return d.label;
        } else if (typeof d.label === 'object') {
          return d.label.text;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          d.label === undefined ||
          (typeof d.label === 'object' && !d.label.text) ||
          (typeof d.label === 'object' && d.label.show === false)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    font: {
      key: '',
      handler(d) {
        if (d.label && d.label.font) {
          return d.label.font;
        } else {
          return _options.label.font;
        }
      }
    },
    background: {
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
    },
    editable: {
      key: '',
      handler(d) {
        if (d.label.editable) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
