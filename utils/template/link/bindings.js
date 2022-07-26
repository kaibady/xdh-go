import { binding } from '../../node-parts'
/**
 *
 * @param {*} n 节点对象
 * @param {*} _options
 * @param {*} bindProp
 * @param {*} arrayItem itemArray的项，可省
 */
export function bindToState(n, _options, bindProp, arrayItem) {
  let d = n.data
  let props = _options.props
  // 定义值
  let item
  if (arrayItem !== undefined) {
    item = arrayItem.data[bindProp]
  } else if (d[bindProp] !== undefined) {
    item = d[bindProp]
  }

  if (d.isGray) {
    if (typeof item === 'string' || typeof item === 'number') {
      return item
    } else if (typeof item === 'object' && item.gray !== undefined) {
      return item.gray
    } else {
      return props[bindProp].gray
    }
  } else if (n.isSelected) {
    if (typeof item === 'string' || typeof item === 'number') {
      return item
    } else if (typeof item === 'object' && item.select !== undefined) {
      return item.select
    } else {
      return props[bindProp].select
    }
  } else if (d.isHover) {
    if (typeof item === 'string' || typeof item === 'number') {
      return item
    } else if (typeof item === 'object' && item.hover !== undefined) {
      return item.hover
    } else {
      return props[bindProp].hover
    }
  } else if (n.isHighlighted) {
    if (typeof item === 'string' || typeof item === 'number') {
      return item
    } else if (typeof item === 'object' && item.highlight !== undefined) {
      return item.highlight
    } else {
      return props[bindProp].highlight
    }
  } else {
    if (typeof item === 'string' || typeof item === 'number') {
      return item
    } else if (typeof item === 'object' && item.normal !== undefined) {
      return item.normal
    } else {
      return props[bindProp].normal
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
    p2 = propArr[1]
  let fun
  if (p1 && p2) {
    fun = d => {
      if (d[p1] && d[p1][p2]) {
        return d[p1][p2]
      } else {
        return _options.props[p1][p2]
      }
    }
  } else if (p1) {
    fun = d => {
      if (d[p1]) {
        return d[p1]
      } else {
        return _options.props[p1]
      }
    }
  }

  return fun
}
export function linkBinding($, go, _options) {
  return binding($, go, {
    curve: {
      key: '',
      handler(d) {
        let type
        if (d.type) {
          type = d.type
        } else {
          type = _options.props.type
        }
        if (type === 'curve') {
          return go.Link.Bezier
        } else if (type === 'straight') {
          return go.Link.None
        } else if (type === 'route') {
          return go.Link.JumpGap
        } else {
          return go.Link.Bezier
        }
      }
    },
    curviness: {
      key: '',
      handler(d) {
        let type
        if (d.type) {
          type = d.type
        } else {
          type = _options.props.type
        }
        if (type === 'curve') {
          return NaN
        } else if (type === 'straight') {
          return 0
        } else if (type === 'route') {
          return 20
        } else {
          return NaN
        }
      }
    },
    corner: {
      key: '',
      handler(d) {
        let type
        if (d.type) {
          type = d.type
        } else {
          type = _options.props.type
        }
        if (type === 'route') {
          return 10
        } else {
          return 10
        }
      }
    },
    routing: {
      key: '',
      handler(d) {
        let type
        if (d.type) {
          type = d.type
        } else {
          type = _options.props.type
        }
        if (type === 'route') {
          return go.Link.AvoidsNodes
        } else {
          return go.Link.Normal
        }
      }
    },
    smoothness: {
      key: '',
      handler(d) {
        let smoothness
        if (d.smoothness !== undefined) {
          smoothness = d.smoothness
        } else {
          smoothness = _options.props.smoothness
        }
        return smoothness
      }
    },
    opacity: {
      type: 'ofObject',
      key: '',
      handler(n) {
        // if (d.opacity) {
        //   return d.opacity
        // } else {
        //   return _options.props.opacity
        // }
        return bindToState(n, _options, 'opacity')
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
  })
}
