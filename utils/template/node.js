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
let defaultProps = ($, go) => {
  return {
    hidden: false, // 隐藏
    label: '',
    shadow: false,
    shape: 'Rectangle'
  };
};
function pictureBinding($, go, type) {
  return binding($, go, {
    source: { key: 'image' },
    errorFunction: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return (pic, e) => {
          let defaultBrokenImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
          if (n.data.brokenImage) {
            let img = new Image();
            img.src = n.data.brokenImage;
            img.onload = () => {
              pic.source = n.data.brokenImage;
            };
            img.onerror = () => {
              pic.source = defaultBrokenImage;
            };
          } else {
            pic.source = defaultBrokenImage;
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
function shapeBinding($, go) {
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
console.log(spotPanel, picture, textBlock);
export default function($, go, options) {
  let _options = genOption(defaultProps($, go), options);
  console.log(_options);
  return node($, go, {
    props: {
      shadowVisible: true
    },
    binding: binding($, go, {
      opacity: {
        key: '',
        handler(d) {
          if (d.hidden) {
            return 0;
          } else {
            return 1;
          }
        }
      },
      shadowVisible: {
        key: '',
        handler(d) {
          if (d.shadow) {
            return true;
          } else {
            return false;
          }
        }
      }
    }),
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
                binding: pictureBinding($, go, 'circularImage')
              }),
              picture($, go, {
                shape: {},
                isClipping: false,
                binding: pictureBinding($, go, 'image')
              }),
              $(go.Shape, {}, ...shapeBinding($, go)),
              iconfont($, go, {
                binding: binding($, go, {
                  visible: {
                    key: '',
                    handler(d) {
                      if(d.shape === 'icon') {
                        return true
                      } else {
                        return false
                      }
                    }
                  },
                  text: {
                    key: '',
                    handler(d) {
                      return d.icon
                    }
                  },
                  font: {
                    key: '',
                    handler(d) {
                      if(d.font) {
                        return d.font
                      } else {
                        return _options.props.font
                      }
                    }
                  }
                })
              })
            ]
          }),
          textBlock($, go, {
            props: { stroke: '#666' },
            binding: binding($, go, {
              text: {
                key: 'label'
              }
            })
          })
        ]
      })
    ]
  });
}
