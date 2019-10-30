import { bindToState, getHandler } from '../bindings';
import { binding } from '../../../node-parts/index';
function textArrayTwoWay(d, temp) {
  temp.text = d;
}
export function labelArrayBinding($, go, _options) {
  return binding($, go, {
    text: {
      type: ['makeTwoWay', textArrayTwoWay],
      key: '',
      handler(t) {
        return t.text;
      }
    },
    margin: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.label && d.label.margin) {
          if (typeof d.label.margin === 'number') {
            return d.label.margin;
          } else if (d.label.margin instanceof Array) {
            return new go.Margin(...d.label.margin);
          } else {
            return new go.Margin(..._options.props.label.margin);
          }
        } else if (typeof _options.props.label.margin === 'number') {
          return _options.props.label.margin;
        } else {
          return new go.Margin(..._options.props.label.margin);
        }
      }
    },
    editable: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.label && d.label.editable) {
          return d.label.editable;
        } else {
          return _options.props.label.editable;
        }
      }
    },
    font: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.label && d.label.font) {
          return d.label.font;
        } else {
          return _options.props.label.font;
        }
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(t, o) {
        let n = o.part;
        return bindToState(n, _options, 'labelColor');
      }
    }
  });
}
export function labelArrayPanelBinding($, go, _options) {
  return binding($, go, {
    itemArray: {
      key: '',
      handler(d) {
        if (d.label && d.label instanceof Array) {
          return d.label;
        } else if (d.label && d.label.text && d.label.text instanceof Array) {
          return d.label.text;
        } else {
          return _options.props.label.text;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (d.label && d.label instanceof Array) {
          return true;
        } else if (d.label && d.label.text instanceof Array) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
function textTwoWay(d, obj) {
  if (typeof obj.label === 'string') {
    obj.label = d;
  } else if (typeof obj.label === 'object') {
    obj.label.text = d;
  }
}
export function labelBinding($, go, _options) {
  return binding($, go, {
    font: {
      key: '',
      handler: getHandler($, go, _options, ['label', 'font'])
    },
    text: {
      type: ['makeTwoWay', textTwoWay],
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
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelColor');
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
        } else if (typeof _options.props.label.margin === 'number') {
          return _options.props.label.margin;
        } else {
          return new go.Margin(..._options.props.label.margin);
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          d.label === undefined ||
          (typeof d.label === 'object' && !d.label.text) ||
          (typeof d.label === 'object' && d.label.show === false) ||
          (typeof d.label === 'object' && typeof d.label.text !== 'string')
        ) {
          return false;
        } else {
          return true;
        }
      }
    }
  });
}

export function labelShapeBinding($, go, _options) {
  return binding($, go, {
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelBackground');
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelStroke');
      }
    }
  });
}

export function labelPanelBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.label !== undefined &&
            (d.label instanceof Array ||
              typeof d.label === 'string' ||
              (typeof d.label === 'object' && d.label.show !== false))) ||
          (d.label === undefined && _options.label.show !== false)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
