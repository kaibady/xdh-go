import { panel } from './panel/index';
import shape from './shape';
import textBlock from './textBlock';
import binding from './binding';
export default function($, go, options = {}) {
  let _options = Object.assign(
    {
      name: '',
      figure: 'RoundedRectangle',
      fill: '#40a9ff',
      stroke: '#003a8c',
      strokeWidth: 1,
      strokeDashArray: null,
      color: '#000',
      textKey: 'text',
      font: '14px "Microsoft Yahei"',
      textArrayKey: 'label',
      padding: 5,
      visible: true,
      text: '',
      placement: 'top-right',
      props: {},
      events: {}
    },
    options
  );
  return panel($, go, {
    type: 'auto',
    props: {
      ..._options.props,
      name: _options.name
    },
    parts: [
      shape($, go, {
        props: {
          figure: _options.figure,
          fill: _options.fill,
          stroke: _options.stroke,
          strokeWidth: _options.strokeWidth,
          strokeDashArray: _options.strokeDashArray
        }
      }),
      textBlock($, go, {
        props: {
          text: _options.text,
          margin: _options.padding,
          stroke: _options.color,
          font: _options.font
        },
        binding: binding($, go, {
          text: _options.textKey,
          visible: {
            key: '',
            handler(d) {
              let text;
              if (
                d[_options.textKey] &&
                typeof d[_options.textKey] === 'string'
              ) {
                text = d[_options.textKey];
              } else {
                text = _options.text;
              }
              if (text) {
                return true;
              } else {
                return false;
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
              new go.Binding('text', _options.textArrayKey)
            )
          )
        },
        binding: binding($, go, {
          itemArray: _options.textKey,
          visible: {
            key: '',
            handler(d) {
              let textArr;
              if (d[_options.textKey] && d[_options.textKey] instanceof Array) {
                textArr = d[_options.textKey];
              } else if (_options.text && _options.text instanceof Array) {
                textArr = _options.text;
              }
              if (textArr) {
                return true;
              } else {
                return false;
              }
            }
          }
        })
      })
    ],
    binding: binding($, go, {
      visible: {
        key: '',
        handler(d) {
          if (
            (d[_options.textKey] && typeof d[_options.textKey] === 'string') ||
            (d[_options.textKey] && d[_options.textKey] instanceof Array) ||
            _options.text
          ) {
            return true;
          } else {
            return false;
          }
        }
      },
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
    }),
    events: _options.events
  });
}
