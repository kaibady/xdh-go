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
      padding: 10,
      visible: true
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
          margin: _options.padding,
          stroke: _options.color,
          font: _options.font
        },
        binding: binding($, go, {
          text: _options.textKey,
          visible: {
            key: '',
            handler(d) {
              if (
                d[_options.textKey] &&
                typeof d[_options.textKey] === 'string'
              ) {
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
              if (d[_options.textKey] && d[_options.textKey] instanceof Array) {
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
            (d[_options.textKey] && d[_options.textKey] instanceof Array)
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    })
  });
}
