import shape from './shape';
import binding from './binding';
export default function($, go, options = {}) {
  let _options = Object.assign(
    {
      figure: 'Circle',
      size: 80,
      fillType: 'Radial',
      fill: {
        0.0: 'rgba(0,0,0,0)',
        0.67: 'rgba(255,242,0,0.1)',
        0.8: 'rgba(255,242,0,0.5)',
        1: 'rgba(255,242,0,1)'
      },
      visibleKey: 'mark',
      colorKey: 'markFill'
    },
    options
  );
  return shape($, go, {
    props: {
      figure: _options.figure,
      width: _options.size,
      height: _options.size,
      stroke: null,
      fill: $(go.Brush, _options.fillType, _options.fill)
    },
    binding: binding($, go, {
      visible: {
        key: '',
        handler(d) {
          if (d[_options.visibleKey]) {
            return true;
          } else {
            return false;
          }
        }
      },
      fill: {
        key: '',
        handler(d) {
          if (d[_options.colorKey]) {
            return $(go.Brush, _options.fillType, d[_options.colorKey]);
          } else {
            return $(go.Brush, _options.fillType, d[_options.fill]);
          }
        }
      }
    })
  });
}
