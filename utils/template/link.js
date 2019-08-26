import { link, binding, textBlock } from '../node-parts';
import { genOption } from '../node-parts/util/fun';
let defaultProps = ($, go) => {
  return {
    arrows: 'to',
    curve: go.Link.Bezier,
    curviness: 10,
    corner: 0,
    routing: go.Link.Normal,
    smoothness: 0.5,
    dashes: false,
    stroke: {
      color: {
        normal: '#000',
        hover: 'blue',
        highlight: 'blue',
        select: 'blue'
      },
      width: {
        normal: 1,
        hover: 2,
        highlight: 2,
        select: 2
      }
    },
    hidden: false,
    label: {
      text: '',
      font: '13px sans-serif',
      scale: 1
    }
  };
};
function linkBinding($, go, _options) {
  return binding($, go, {
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
        if (d.hidden) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  });
}
function lineBinding($, go, _options) {
  return binding($, go, {
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
        } else if (
          typeof n.data.color === 'object' &&
          n.data.color.color &&
          !n.isHighlighted
        ) {
          return n.data.color.color;
        } else if (
          typeof n.data.color === 'object' &&
          n.data.color.highlight &&
          n.isHighlighted
        ) {
          return n.data.color.highlight;
        } else {
          return _options.props.color;
        }
      }
    }
  });
}
function arrowBinding($, go, name, _options) {
  let bindOpt = {
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
    bindOpt.fromArrow = type;
  } else if (name === 'to') {
    bindOpt.toArrow = type;
  }
  return binding($, go, bindOpt);
}
function textBlockBinding($, go, _options) {
  return binding($, go, {
    font: {
      key: 'font',
      handler(d) {
        if (d) {
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
        if (d.text) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
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
      $(go.Shape, ...lineBinding($, go, _options)),
      // 末尾箭头
      $(
        go.Shape,
        { fill: 'black', stroke: null },
        ...arrowBinding($, go, 'to', _options.props)
      ),
      // 起始箭头
      $(
        go.Shape,
        { fill: 'black', stroke: null },
        ...arrowBinding($, go, 'from', _options.props)
      ),
      // label 文字
      textBlock($, go, {
        props: {
          stroke: '#000'
        },
        binding: textBlockBinding($, go, _options)
      })
    ],
    binding: linkBinding($, go, _options)
  });
}
