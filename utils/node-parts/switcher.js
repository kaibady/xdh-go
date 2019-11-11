import { panel } from './panel/index';
import shape from './shape';
import textBlock from './textBlock';
import binding from './binding';
function getBinding($, go, _options, source) {
  let fun = d => {
    if (d[_options.switcherKey] && d[_options.switcherKey][source]) {
      return d[_options.switcherKey][source];
    } else {
      return _options[source];
    }
  };
  return {
    key: '',
    handler: fun
  };
}
export default function($, go, options = {}) {
  let _options = Object.assign(
    {
      name: '',
      figure: 'Circle',
      fill: '#faad14',
      stroke: '#d48806',
      strokeWidth: 1,
      strokeDashArray: null,
      color: '#fff',
      stateKey: 'active',
      size: 15,
      switcherKey: 'switcher',
      activeText: {
        text: '\uE725',
        font: '14px "iconfont"'
      },
      inactiveText: {
        text: '\uE720',
        font: '14px "iconfont"'
      },
      placement: 'top-right',
      stateCompute: null,
      props: {},
      binding: [],
      events: {}
    },
    options
  );
  _options.activeText = Object.assign(
    {
      text: '\uE720',
      font: '14px "iconfont"'
    },
    _options.activeText
  );
  _options.inactiveText = Object.assign(
    {
      text: '\uE725',
      font: '14px "iconfont"'
    },
    _options.inactiveText
  );
  _options.events = Object.assign({ click: () => {} }, _options.events);
  console.log(_options);
  return panel($, go, {
    type: 'Auto',
    parts: [
      shape($, go, {
        props: {
          figure: _options.figure,
          fill: _options.fill,
          width: _options.size,
          height: _options.size,
          stroke: _options.stroke,
          strokeWidth: _options.strokeWidth,
          ..._options.props
        },
        binding: binding($, go, {
          figure: getBinding($, go, _options, 'figure'),
          fill: getBinding($, go, _options, 'fill'),
          width: getBinding($, go, _options, 'size'),
          height: getBinding($, go, _options, 'size'),
          stroke: getBinding($, go, _options, 'stroke'),
          strokeWdith: getBinding($, go, _options, 'strokeWidth')
        })
      }),
      textBlock($, go, {
        props: {
          stroke: _options.color
        },
        binding: binding($, go, {
          text: {
            type: 'ofObject',
            key: '',
            handler(n) {
              let state;
              if (
                _options.stateCompute &&
                typeof _options.stateCompute === 'function'
              ) {
                state = _options.stateCompute(n);
              } else {
                state = n.data[_options.stateKey];
              }
              if (state) {
                if (
                  n.data[_options.switcherKey] &&
                  n.data[_options.switcherKey].activeText &&
                  n.data[_options.switcherKey].activeText.text
                ) {
                  return n.data[_options.switcherKey].activeText.text;
                } else {
                  return _options.activeText.text;
                }
              } else {
                if (
                  n.data[_options.switcherKey] &&
                  n.data[_options.switcherKey].inactiveText &&
                  n.data[_options.switcherKey].inactiveText.text
                ) {
                  return n.data[_options.switcherKey].inactiveText.text;
                } else {
                  return _options.inactiveText.text;
                }
              }
            }
          },
          font: {
            key: '',
            handler(d) {
              if (d[_options.stateKey]) {
                if (
                  n.data[_options.switcherKey] &&
                  n.data[_options.switcherKey].activeText &&
                  n.data[_options.switcherKey].activeText.font
                ) {
                  return n.data[_options.switcherKey].activeText.font;
                } else {
                  return _options.activeText.text;
                }
              } else {
                if (
                  n.data[_options.switcherKey] &&
                  n.data[_options.switcherKey].inactiveText &&
                  n.data[_options.switcherKey].inactiveText.font
                ) {
                  return n.data[_options.switcherKey].inactiveText.font;
                } else {
                  return _options.inactiveText.font;
                }
              }
            }
          }
        })
      })
    ],
    binding: [
      ..._options.binding,
      ...binding($, go, {
        alignment: {
          key: '',
          handler() {
            let placement = _options.placement;
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
      })
    ],
    events: {
      click: (e, n) => {
        let oldState;
        if (
          _options.stateCompute &&
          typeof _options.stateCompute === 'function'
        ) {
          oldState = _options.stateCompute(n);
          _options.events.click(oldState, n);
        } else {
          oldState = n.part.data[_options.stateKey];
          n.part.data[_options.stateKey] = !oldState;
          _options.events.click(oldState, n);
        }
      }
    }
  });
}
