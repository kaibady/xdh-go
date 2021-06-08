import { getHandler } from '../bindings';
import { binding } from '../../../node-parts/index';
export function tagOuterPanelBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.tag && d.tag.text) {
          return true;
        } else if (d.tag && !d.tag.text) {
          return false;
        } else if (_options.props.tag.text) {
          return true;
        } else {
          return false;
        }
      }
    },
    alignment: {
      key: '',
      handler(d) {
        let placement;
        if (d.tag && d.tag.placement) {
          placement = d.tag.placement;
        } else {
          placement = _options.props.tag.placement;
        }
        let x = 0.5,
          y = 0.5;
        if (typeof placement === 'string') {
          if (placement.includes('top')) {
            y = 0;
          } else if (placement.includes('bottom')) {
            y = 1;
          }
          if (placement.includes('left')) {
            x = 0;
          } else if (placement.includes('right')) {
            x = 1;
          }
        } else if (placement instanceof Array) {
          x = placement[0];
          y = placement[1];
        }
        return new go.Spot(x, y);
      }
    }
  });
}
export function tagShapeBinding($, go, _options) {
  return binding($, go, {
    fill: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'background'])
    },
    figure: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'figure'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'stroke'])
    },
    strokeWidth: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'strokeWidth'])
    },
    strokeDashArray: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'strokeDashArray'])
    }
  });
}

export function tagBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          d.tag === undefined ||
          (typeof d.tag === 'object' && !d.tag.text) ||
          (typeof d.tag === 'object' && typeof d.tag.text !== 'string')
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    text: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'text'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'color'])
    },
    font: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'font'])
    },
    margin: {
      key: '',
      handler(d) {
        if (d.tag && d.tag.margin !== undefined) {
          if (typeof d.tag.margin === 'number') {
            return d.tag.margin;
          } else if (d.tag.margin instanceof Array) {
            return new go.Margin(...d.tag.margin);
          } else {
            return new go.Margin(..._options.props.tag.margin);
          }
        } else if (typeof _options.props.tag.margin === 'number') {
          return _options.props.tag.margin;
        } else {
          return new go.Margin(..._options.props.tag.margin);
        }
      }
    }
  });
}
export function tagArrayBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: '',
      handler(t) {
        return t.text;
      }
    },
    margin: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.tag && d.tag.margin) {
          if (typeof d.tag.margin === 'number') {
            return d.tag.margin;
          } else if (d.tag.margin instanceof Array) {
            return new go.Margin(...d.tag.margin);
          } else {
            return new go.Margin(..._options.props.tag.margin);
          }
        } else if (typeof _options.props.tag.margin === 'number') {
          return _options.props.tag.margin;
        } else {
          return new go.Margin(..._options.props.tag.margin);
        }
      }
    },
    font: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.tag && d.tag.font) {
          return d.tag.font;
        } else {
          return _options.props.tag.font;
        }
      }
    },
    stroke: {
      key: '',
      handler(t, o) {
        let d = o.part.data;
        if (d.tag && d.tag.color) {
          return d.tag.color;
        } else {
          return _options.props.tag.color;
        }
      }
    }
  });
}
export function tagArrayPanelBinding($, go, _options) {
  return binding($, go, {
    itemArray: {
      key: '',
      handler(d) {
        if (d.tag && d.tag instanceof Array) {
          return d.tag;
        } else if (d.tag && d.tag.text && d.tag.text instanceof Array) {
          return d.tag.text;
        } else {
          return _options.props.tag.text;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (d.tag && d.tag instanceof Array) {
          return true;
        } else if (d.tag && d.tag.text instanceof Array) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
