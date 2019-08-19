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
export default function($, go, options) {
  let defaultArrow = go.Geometry.parse('F1 m 0,0 l 8,4 -8,4 2,-4 z');
  let arrow = defaultArrow;
  let _options = genOption(defaultProps($, go), options);
  console.log(_options)
  return link($, go, {
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
        { toArrow: 'Standard', fill: 'gray', stroke: null },
        ...binding($, go, {
          visible: {
            key: 'arrows',
            handler(d) {
              console.log(d, typeof d === 'string' && d.includes('to'));
              if (typeof d === 'string' && d.includes('to')) {
                return true;
              } else {
                return false;
              }
            }
          }
        })
      ),
      // 起始箭头
      $(go.Shape, { fromArrow: 'Standard', fill: 'gray', stroke: null }),
      // 中间箭头
      $(go.Shape, {
        segmentOffset: new go.Point(0, 0),
        segmentOrientation: go.Link.OrientUpright,
        geometry: arrow
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
      }
    })
  });
}
