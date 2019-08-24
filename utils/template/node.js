import {
  verPanel,
  spotPanel,
  node,
  picture,
  textBlock,
  iconfont,
  binding
} from '../node-parts';
import { genOption } from '../node-parts/util/fun';
const defaultImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
let defaultProps = ($, go) => {
  return {
    hidden: false, // 隐藏
    image: undefined,
    brokenImage: undefined,
    label: {
      text: '',
      show: true,
      color: {
        normal: '#ccc',
        highlight: '#66b1ff',
        hover: '#66b1ff',
        select: '#66b1ff'
      },
      font: '14px "iconfont"'
    },
    shape: 'Rectangle',
    color: {
      normal: 'yellow',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    stroke: {
      color: {
        normal: '#ccc',
        highlight: '#66b1ff',
        hover: '#66b1ff',
        select: '#66b1ff'
      },
      width: {
        normal: 1,
        highlight: 2,
        hover: 2,
        select: 2
      }
    },
    scale: 1,
    size: 25,
    iconfont: '30px "iconfont"',
    icon: '\uE7BD',
    loc: '0 0',
    tooltip: undefined
  };
};
function pictureBinding($, go, type, _options) {
  return binding($, go, {
    source: { key: 'image' },
    errorFunction: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return (pic, e) => {
          if (n.data.brokenImage) {
            let img = new Image();
            img.src = n.data.brokenImage;
            img.onload = () => {
              pic.source = n.data.brokenImage;
            };
            img.onerror = () => {
              pic.source = defaultImage;
            };
          } else {
            pic.source = defaultImage;
          }
        };
      }
    },
    visible: {
      key: '',
      handler(d) {
        if ([type].includes(d.shape)) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
function shapeBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (!['circularImage', 'image', 'icon'].includes(d.shape)) {
          return true;
        } else {
          return false;
        }
      }
    },
    figure: 'shape',
    fill: 'fill',
    stroke: 'stroke',
    width: {
      key: '',
      handler(d) {
        return d.size;
      }
    },
    height: {
      key: '',
      handler(d) {
        return d.size;
      }
    }
  });
}
function iconfontBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.shape === 'icon') {
          return true;
        } else {
          return false;
        }
      }
    },
    text: {
      key: '',
      handler(d) {
        return d.icon;
      }
    },
    font: {
      key: '',
      handler(d) {
        if (d.font) {
          return d.font;
        } else {
          return _options.props.font;
        }
      }
    }
  });
}
function nodeBinding($, go, _options) {
  return binding($, go, {
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
function labelBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: 'label'
    }
  });
}
console.log(spotPanel, picture, textBlock);
export default function($, go, options) {
  let _options = genOption(defaultProps($, go), options);
  console.log(_options);
  return node($, go, {
    props: {
      shadowVisible: true
    },
    binding: nodeBinding($, go, _options),
    parts: [
      verPanel($, go, {
        parts: [
          spotPanel($, go, {
            porps: {
              portId: '',
              fromPortSpot: true,
              toPortSport: true
            },
            parts: [
              picture($, go, {
                binding: pictureBinding($, go, 'circularImage', _options)
              }),
              picture($, go, {
                shape: {},
                isClipping: false,
                binding: pictureBinding($, go, 'image', _options)
              }),
              $(go.Shape, {}, ...shapeBinding($, go, _options)),
              iconfont($, go, {
                binding: iconfontBinding($, go, _options)
              })
            ]
          }),
          textBlock($, go, {
            props: { stroke: '#666' },
            binding: labelBinding($, go, _options)
          })
        ]
      })
    ]
  });
}
