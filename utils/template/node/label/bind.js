import { getHandler, bindToState } from '../bindings'
import { binding } from '../../../node-parts/index'
function textArrayTwoWay(d, temp) {
  temp.text = d
}
export function labelArrayBinding($, go, _options) {
  return binding($, go, {
    text: {
      type: ['makeTwoWay', textArrayTwoWay],
      key: '',
      handler(t) {
        return t.text
      }
    },
    margin: {
      key: '',
      handler(t, n) {
        const d = n.part.data
        let margin
        if (t.margin !== undefined) {
          margin = t.margin
        } else if (d.label && d.label.margin !== undefined) {
          margin = d.label.margin
        } else if (_options.props.label.margin !== undefined) {
          margin = _options.props.label.margin
        }
        if (typeof margin === 'number') {
          return margin
        } else if (margin instanceof Array) {
          return new go.Margin(...margin)
        }
      }
    },
    editable: {
      key: '',
      handler(t, n) {
        const d = n.part.data
        let editable
        if (t.editable !== undefined) {
          editable = t.editable
        } else if (d.label && d.label.editable !== undefined) {
          editable = d.label.editable
        } else {
          editable = _options.props.label.editable
        }
        return editable
      }
    },
    font: {
      key: '',
      handler(t, n) {
        const d = n.part.data
        let font
        if (t.font !== undefined) {
          font = t.font
        } else if (d.label && d.label.font !== undefined) {
          font = d.label.font
        } else {
          font = _options.props.label.font
        }
        return font
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(t, o) {
        const n = o.part
        return bindToState(n, _options, 'labelColor', t)
      }
    }
  })
}
export function labelArrayPanelBinding($, go, _options) {
  return binding($, go, {
    itemArray: {
      key: '',
      handler(d) {
        if (d.label && d.label instanceof Array) {
          return d.label
        } else if (d.label && d.label.text && d.label.text instanceof Array) {
          return d.label.text
        } else {
          return []
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          d.label &&
          (d.label instanceof Array || d.label.text instanceof Array)
        ) {
          return true
        } else {
          return false
        }
      }
    }
  })
}
function textTwoWay(d, obj) {
  if (typeof obj.label === 'string') {
    obj.label = d
  } else if (
    typeof obj.label === 'object' &&
    typeof obj.label.text === 'string'
  ) {
    obj.label.text = d
  }
}
export function labelBinding($, go, _options) {
  return binding($, go, {
    text: {
      type: ['makeTwoWay', textTwoWay],
      key: '',
      handler(d) {
        if (d.label === undefined) {
          return ''
        } else if (typeof d.label === 'string') {
          return d.label
        } else if (
          typeof d.label === 'object' &&
          d.label.text !== undefined &&
          d.label.text !== ''
        ) {
          return d.label.text
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          (typeof d.label === 'object' && typeof d.label.text === 'string') ||
          typeof d.label === 'string'
        ) {
          return true
        } else {
          return false
        }
      }
    },
    font: {
      key: '',
      handler: getHandler($, go, _options, ['label', 'font'])
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelColor')
      }
    },
    editable: {
      key: '',
      handler: getHandler($, go, _options, ['label', 'editable'])
    },
    margin: {
      key: '',
      handler(d) {
        if (d.label && d.label.margin) {
          if (typeof d.label.margin === 'number') {
            return d.label.margin
          } else if (d.label.margin instanceof Array) {
            return new go.Margin(...d.label.margin)
          } else {
            return new go.Margin(..._options.props.label.margin)
          }
        } else if (typeof _options.props.label.margin === 'number') {
          return _options.props.label.margin
        } else {
          return new go.Margin(..._options.props.label.margin)
        }
      }
    }
  })
}
export function labelShapeBinding($, go, _options) {
  return binding($, go, {
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelBackground')
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelStroke')
      }
    }
  })
}

export function labelPanelBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.label &&
            (d.label instanceof Array ||
              typeof d.label === 'string' ||
              (typeof d.label === 'object' && d.label.show !== false))) ||
          (d.label && _options.label.show !== false)
        ) {
          return true
        } else {
          return false
        }
      }
    },
    portId: {
      key: '',
      handler(d) {
        if (
          (d.linkPort !== undefined && d.linkPort === 'tLabel') ||
          (d.linkPort === undefined && _options.props.linkPort === 'tLabel')
        ) {
          return ''
        } else {
          return 'tLabel'
        }
      }
    }
  })
}
