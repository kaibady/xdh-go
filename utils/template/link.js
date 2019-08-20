import { link, binding } from '../node-parts';
import { genOption } from '../node-parts/util/fun';
let defaultProps = ($, go) => {
  return {
    curve: go.Link.Bezier,
    curviness: 10,
    corner: 0,
    routing: go.Link.Normal,
    smoothness: 0.5
  };
};
function arrowBinding(name, options) {
  let binding = {
    visible: {
      key: 'arrows',
      handler(d) {
        if (
          (typeof d === 'string' && d.includes(name)) ||
          (typeof d === 'object' && d[name])
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    scale: {
      key: 'arrows',
      handler(d) {
        if (typeof d === 'object' && d[name] && d[name].scaleFactor) {
          return d[name].scaleFactor;
        } else {
          return 1;
        }
      }
    }
  };
  let type = {
    key: 'arrows',
    handler(d) {
      if (typeof d === 'object' && d[name] && d[name].type) {
        console.log('from arrow', d[name].type);
        return d[name].type;
      } else {
        return 'Standard';
      }
    }
  };
  if (name === 'from') {
    binding.fromArrow = type;
  } else if (name === 'to') {
    binding.toArrow = type;
  }
  return binding;
}
export default function($, go, options) {
  let _options = genOption(defaultProps($, go), options);
  console.log(_options);
  return link($, go, {
    props: {
      ..._options.props
    },
    parts: [
      // 连线
      $(
        go.Shape,
        {},
        ...binding($, go, {
          strokeDashArray: {
            key: 'dashes',
            handler(d) {
              console.log(typeof d);
              if (d instanceof Array) {
                return d;
              } else if (d) {
                return [4, 4, 4, 4];
              } else {
                return null;
              }
            }
          }
        })
      ),
      // 末尾箭头
      $(
        go.Shape,
        { fill: 'black', stroke: null },
        ...binding($, go, arrowBinding('to', _options.props))
      ),
      // 起始箭头
      $(
        go.Shape,
        { fill: 'black', stroke: null },
        ...binding($, go, arrowBinding('from', _options.props))
      )
    ],
    binding: binding($, go, {
      curve: {
        key: '',
        handler(d) {
          if (d.curve !== undefined) {
            return d.curve;
          } else {
            return _options.props.curve;
          }
        }
      },
      curviness: {
        key: '',
        handler(d) {
          if (d.curve !== undefined) {
            return d.curve;
          } else {
            return _options.props.curve;
          }
        }
      }
    })
  });
}
