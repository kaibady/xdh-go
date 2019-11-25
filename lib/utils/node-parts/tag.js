import { panel } from './panel/index'
import shape from './shape'
import textBlock from './textBlock'
import binding from './binding'
function bindingExtend($, go, _options, prop) {
  let handler = d => {
    let value
    let dataKey = _options.dataKey
    if (d[dataKey] && d[dataKey][prop] !== undefined) {
      value = d[dataKey][prop]
    } else if (_options[prop] !== undefined) {
      value = _options[prop]
    }
    if (prop === 'margin' && value instanceof Array) {
      value = new go.Margin(...value)
    }
    return value
  }
  return {
    key: '',
    handler
  }
}
function bindingArrayExtend($, go, _options, prop) {
  let handler = (t, node) => {
    let value
    let dataKey = _options.dataKey,
      d = node.data
    if (t && t[prop] !== undefined) {
      value = t[prop]
    } else if (d[dataKey] && d[dataKey][prop] !== undefined) {
      value = d[dataKey][prop]
    } else if (_options[prop] !== undefined) {
      value = _options[prop]
    }
    return value
  }
  return {
    key: '',
    handler
  }
}
export default function($, go, options = {}) {
  let _options = Object.assign(
    {
      name: '',
      figure: 'RoundedRectangle',
      background: '#40a9ff',
      stroke: '#003a8c',
      strokeWidth: 1,
      strokeDashArray: null,
      color: '#000',
      dataKey: 'tagData',
      font: '14px "Microsoft Yahei"',
      margin: 5,
      show: true,
      text: '',
      placement: 'top-right',
      props: {},
      events: {}
    },
    options
  )
  return panel($, go, {
    type: 'auto',
    props: {
      ..._options.props,
      name: _options.name,
      alignment: new go.Spot(1, 0)
    },
    parts: [
      shape($, go, {
        props: {
          figure: _options.figure,
          fill: _options.background,
          stroke: _options.stroke,
          strokeWidth: _options.strokeWidth,
          strokeDashArray: _options.strokeDashArray
        },
        binding: binding($, go, {
          figure: bindingExtend($, go, _options, 'figure'),
          fill: bindingExtend($, go, _options, 'background'),
          stroke: bindingExtend($, go, _options, 'stroke'),
          strokeWidth: bindingExtend($, go, _options, 'strokeWidth'),
          strokeDashArray: bindingExtend($, go, _options, 'strokeDashArray')
        })
      }),
      textBlock($, go, {
        props: {
          text: _options.text,
          margin: _options.margin,
          stroke: _options.color,
          font: _options.font
        },
        binding: binding($, go, {
          margin: {
            key: '',
            handler: {
              key: '',
              handler(d) {
                let margin
                if (
                  d[_options.dataKey] &&
                  d[_options.dataKey].margin !== undefined
                ) {
                  margin = d[_options.dataKey].margin
                } else {
                  margin = _options.margin
                }
                if (typeof margin === 'number') {
                  return margin
                } else if (margin instanceof Array) {
                  return new go.Margin(...margin)
                }
              }
            }
          },
          stroke: bindingExtend($, go, _options, 'color'),
          font: bindingExtend($, go, _options, 'font'),
          text: {
            key: '',
            handler(d) {
              let dataKey = _options.dataKey
              let text = ''
              if (d[dataKey] && typeof d[dataKey].text === 'string') {
                text = d[dataKey].text
              } else if (typeof _options.text === 'string') {
                text = _options.text
              }
              return text
            }
          },
          visible: {
            key: '',
            handler(d) {
              let dataKey = _options.dataKey
              let text
              if (d[dataKey] && typeof d[dataKey].text === 'string') {
                text = d[dataKey].text
              } else {
                text = _options.text
              }
              if (typeof text === 'string') {
                return true
              } else {
                return false
              }
            }
          }
        })
      }),
      panel($, go, {
        type: 'ver',
        props: {
          itemTemplate: $(
            go.Panel,
            'Auto',
            { margin: 2 },
            $(
              go.TextBlock,
              {
                margin: 2,
                stroke: _options.color,
                font: _options.font
              },
              ...binding($, go, {
                margin: bindingArrayExtend($, go, _options, 'margin'),
                stroke: bindingArrayExtend($, go, _options, 'color'),
                font: bindingArrayExtend($, go, _options, 'font'),
                background: bindingArrayExtend($, go, _options, 'background'),
                text: {
                  key: '',
                  handler(t) {
                    let text
                    if (t.text) {
                      text = t.text
                    } else {
                      text = _options.text || ''
                    }
                    return text
                  }
                }
              })
            )
          )
        },
        binding: binding($, go, {
          itemArray: {
            key: '',
            handler(d) {
              let dataKey = _options.dataKey
              if (d[dataKey] && d[dataKey].text instanceof Array) {
                return d[dataKey].text
              } else {
                return []
              }
            }
          },
          visible: {
            key: '',
            handler(d) {
              let dataKey = _options.dataKey
              let textArr
              if (d[dataKey] && d[dataKey].text instanceof Array) {
                textArr = d[dataKey].text
              } else if (
                d[dataKey] &&
                d[dataKey].text === undefined &&
                _options.text &&
                _options.text instanceof Array
              ) {
                textArr = _options.text
              }
              if (textArr) {
                return true
              } else {
                return false
              }
            }
          }
        })
      })
    ],
    binding: binding($, go, {
      name: bindingExtend($, go, _options, 'name'),
      visible: {
        key: '',
        handler(d) {
          let dataKey = _options.dataKey
          let show = true
          if (d[dataKey] && d[dataKey].show === false) {
            show = false
          } else if (d[dataKey] === undefined && _options.show === false) {
            show = false
          }
          if (
            ((d[dataKey] && typeof d[dataKey].text === 'string') ||
              (d[dataKey] && d[dataKey].text instanceof Array) ||
              (d[dataKey] === undefined && _options.text)) &&
            show !== false
          ) {
            return true
          } else {
            return false
          }
        }
      },
      alignment: {
        key: '',
        handler(d) {
          let dataKey = _options.dataKey
          let placement
          if (d[dataKey] && d[dataKey].placement) {
            placement = d[dataKey].placement
          } else {
            placement = _options.placement
          }
          let x = 0.5,
            y = 0.5
          if (typeof placement === 'string') {
            if (placement.includes('top')) {
              y = 0
            } else if (placement.includes('bottom')) {
              y = 1
            }
            if (placement.includes('left')) {
              x = 0
            } else if (placement.includes('right')) {
              x = 1
            }
          } else if (placement instanceof Array) {
            x = placement[0]
            y = placement[1]
          }
          return new go.Spot(x, y)
        }
      }
    }),
    events: _options.events
  })
}
