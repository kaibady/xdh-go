import { defaultImage } from './default';
import { binding } from '../../node-parts';
// 绑定图片裁剪
export function pictureClipBinding($, go, _options) {
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
    },
    figure: {
      key: '',
      handler(d) {
        if (d.clipShape) {
          return d.clipShape;
        } else {
          return _options.props.clipShape;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          d.clipShape === null ||
          (d.clipShape === undefined && _options.props.clipShape === null)
        ) {
          return false;
        } else if (
          (d.shape && d.shape === 'clipImage') ||
          (!d.shape && _options.props.shape === 'clipImage')
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
export function picturePanelBinding($, go, _options) {
  return binding($, go, {
    isCliping: {
      key: '',
      handler(d) {
        if (
          (d.shape && d.shape === 'clipImage') ||
          (!d.shape && _options.props.shape === 'clipImage')
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['image', 'clipImage'].includes(d.shape)) ||
          (!d.shape && ['image', 'clipImage'].includes(_options.props.shape))
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
export function pictureBinding($, go, _options) {
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
export function pictureCircleBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          d.stateShape === null ||
          (d.stateShape === undefined && _options.props.stateShape === null)
        ) {
          return false;
        } else {
          return true;
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
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'background');
      }
    },
    figure: {
      key: '',
      handler(d) {
        if (d.clipShape) {
          return d.stateShape;
        } else {
          return _options.props.stateShape;
        }
      }
    }
  });
}
export function pictureHolderBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['clipImage', 'image'].includes(d.shape)) ||
          (!d.shape && ['image', 'clipImage'].includes(_options.props.shape))
        ) {
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
    },
    strokeWidth: {
      key: '',
      handler(d) {
        let select = _options.props.select || 0;
        let normal = _options.props.normal || 0;
        let highlight = _options.props.highlight || 0;
        let hover = _options.props.hover || 0;
        return Math.max(select, normal, highlight, hover) + 5;
      }
    },
    figure: {
      key: '',
      handler(d) {
        if (d.clipShape) {
          return d.clipShape;
        } else {
          return _options.props.clipShape;
        }
      }
    }
  });
}

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
export function shapeBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['clipImage', 'image', 'icon'].includes(d.shape)) ||
          (!d.shape &&
            ['clipImage', 'image', 'icon'].includes(_options.props.shape))
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    figure: {
      key: '',
      handler(d) {
        console.log('figure binding', d);
        if (d.shape && !['clipImage', 'image', 'icon'].includes(d.shape)) {
          return d.shape;
        } else if (
          !d.shape &&
          !['clipImage', 'image', 'icon'].includes(_options.props.shape)
        ) {
          return _options.props.shape;
        }
      }
    },
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
        if (
          (d.shape && d.shape === 'icon') ||
          (!d.shape && _options.props.shape === 'icon')
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    text: {
      key: '',
      handler(d) {
        if (d.icon && typeof d.icon === 'string') {
          return d.icon;
        } else if (d.icon && d.icon.text) {
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
        return bindSelect(n, _options, 'iconColor');
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
    },
    scale: {
      key: '',
      handler(d) {
        if (d.scale) {
          return d.scale;
        } else {
          return _options.props.scale;
        }
      }
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
    },
    strokeWidth: {
      key: '',
      handler(d) {
        if (d.tooltip && d.tooltip.strokeWidth) {
          return d.tooltip.strokeWidth;
        } else {
          return _options.props.tooltip.strokeWidth;
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
      handler(d) {
        if (d.tooltip && d.tooltip.color) {
          return d.tooltip.color;
        } else if (_options.props.tooltip && _options.props.tooltip.color) {
          return _options.props.tooltip.color;
        } else {
          return '#fff';
        }
      }
    },
    font: {
      key: '',
      handler(d) {
        if (d.tooltip && d.tooltip.font) {
          return d.tooltip.font;
        } else {
          return _options.props.tooltip.font;
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
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindSelect(n, _options, 'labelColor');
      }
    },
    editable: {
      key: '',
      handler(d) {
        if (d.label.editable) {
          return true;
        } else {
          return _options.props.label.editable;
        }
      }
    },
    margin: {
      key: '',
      handler(d) {
        if (d.label && d.label.margin) {
          if (typeof d.label.margin === 'number') {
            return d.label.margin;
          } else if (d.label.margin instanceof Array) {
            return new go.Margin(...d.label.margin);
          } else {
            return new go.Margin(..._options.props.label.margin);
          }
        } else {
          return new go.Margin(..._options.props.label.margin);
        }
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
