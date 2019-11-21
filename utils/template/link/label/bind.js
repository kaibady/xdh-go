import { bindToState, getHandler } from '../bindings'
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
        let d = n.part.data
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
        let d = n.part.data
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
        let d = n.part.data
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
        let n = o.part
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
    font: {
      key: '',
      handler: getHandler($, go, _options, ['label', 'font'])
    },
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
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'labelColor')
      }
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
  let orientMap = {
    none: go.Link.None,
    along: go.Link.OrientAlong,
    upright: go.Link.OrientUpright,
    upright45: go.Link.OrientUpright45
  }
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
    segmentFraction: {
      key: '',
      handler(d) {
        let placementStr, fraction
        if (d && d.label && d.label.placement) {
          placementStr = d.label.placement
        } else {
          placementStr = _options.props.label.placement
        }
        if (placementStr.includes('start')) {
          fraction = 0.1
        } else if (placementStr.includes('end')) {
          fraction = 0.1
        } else {
          fraction = 0.5
        }
        return fraction
      }
    },
    alignmentFocus: {
      key: '',
      handler(d) {
        const placementOffset = 5
        let spot = [0, 0, 0, 0]
        let placementStr, pos
        if (d && d.label && d.label.placement) {
          placementStr = d.label.placement
        } else {
          placementStr = _options.props.label.placement
        }
        if (placementStr.includes('top')) {
          spot[1] = 1
          spot[3] = placementOffset
        } else if (placementStr.includes('middle')) {
          spot[1] = 0.5
        } else if (placementStr.includes('bottom')) {
          spot[1] = 0
          spot[3] = -placementOffset
        }
        if (placementStr.includes('start')) {
          spot[0] = 0
        } else if (placementStr.includes('end')) {
          spot[0] = 1
        } else {
          spot[0] = 0.5
        }
        pos = new go.Spot(...spot)
        return pos
      }
    },
    segmentIndex: {
      type: ['ofObject'],
      key: '',
      handler(n) {
        let d = n.data
        let midSegment = Math.floor((n.pointsCount - 1) / 2)
        let placementStr, placement, segment
        if (d && d.label && d.label.placement) {
          placementStr = d.label.placement
        } else {
          placementStr = _options.props.label.placement
        }
        if (placementStr.includes('start')) {
          placement = 'start'
        } else if (placementStr.includes('end')) {
          placement = 'end'
        }
        switch (placement) {
          case 'start':
            segment = 0
            break
          case 'end':
            segment = -1
            break
          default:
            segment = midSegment
        }
        return segment
      }
    },
    segmentOrientation: {
      key: '',
      handler(d) {
        let orient = ''
        if (d.orient) {
          orient = d.orient
        } else {
          orient = _options.props.orient
        }
        if (go.Link[orient]) {
          return go.Link[orient]
        } else if (['none', 'along', 'upright', 'upright45'].includes(orient)) {
          return orientMap[orient]
        }
      }
    }
  })
}
