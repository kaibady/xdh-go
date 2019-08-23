import { link, binding, textBlock } from '../node-parts';
import { genOption } from '../node-parts/util/fun';
let defaultProps = ($, go) => {
  return {
    curve: go.Link.Bezier,
    curviness: 10,
    corner: 0,
    routing: go.Link.Normal,
    smoothness: 0.5,
    color: '#000',
    hidden: false,
    font: '13px sans-serif'
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
      curve: _options.props.curve,
      curviness: _options.props.curviness,
      corner: _options.props.corner,
      routing: _options.props.routing,
      smoothness: _options.props.smoothness
     
    },
    parts: [
      // 连线
      $(
        go.Shape,
        {
          stroke: _options.props.color
        },
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
          },
          stroke: {
            type: 'ofObject',
            key: '',
            handler(n) {
              if (typeof n.data.color === 'string') {
                return n.data.color;
              } else if (typeof n.data.color === 'object' && n.data.color.color && !n.isHighlighted) {
                return n.data.color.color;
              } else if (typeof n.data.color === 'object' && n.data.color.highlight && n.isHighlighted) {
                return n.data.color.highlight;
              } else {
                return _options.props.color;
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
      ),
      // label 文字
      textBlock($, go, {
        props: {
           stroke: '#000'
        },
        binding: binding($, go, {
          font: {
            key: 'font',
            handler(d) {
              if(d) {
                return d;
              } else {
                return _options.props.font;
              }
            }
          },
          text: 'text',
          visible: {
            key: '',
            handler(d) {
              if(d.text) {
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
      },
      opacity: {
        key: '',
        handler(d) {
          if(d.hidden) {
            return 0;
          } else {
            return 1;
          }
        }
      }
    })
  });
}
