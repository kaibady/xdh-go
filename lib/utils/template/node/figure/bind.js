import { defaultImage } from '../default';
import { getHandler, shapeParamsBinding, bindToState } from '../bindings';
import { binding } from '../../../node-parts/index';
function getSizeHandler($, go, _options, type) {
  let index;
  switch (type) {
    case 'width':
      index = 0;
      break;
    case 'height':
      index = 1;
      break;
  }
  let fun = d => {
    if (typeof d.size === 'number') {
      return d.size;
    } else if (d.size instanceof Array) {
      return d.size[index];
    } else {
      return _options.props.size[index];
    }
  };
  return fun;
}
// 绑定图片裁剪
export function pictureClipBinding($, go, _options) {
  return binding($, go, {
    width: {
      key: '',
      handler: getSizeHandler($, go, _options, 'width')
    },
    height: {
      key: '',
      handler: getSizeHandler($, go, _options, 'height')
    },
    visible: {
      key: '',
      handler(d) {
        if (
          d.clipShape === null ||
          (d.clipShape === undefined && _options.props.clipShape === null)
        ) {
          return false;
        } else if (
          (d.shape && d.shape === 'clipImage') ||
          (!d.shape && _options.props.shape === 'clipImage')
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    ...shapeParamsBinding(_options, 'clipShape', [
      'parameter1',
      'parameter2',
      'geometryString'
    ]),
    figure: {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams.clipShape &&
          d.shapeParams.clipShape.geometryString
        ) {
          return 'None';
        } else if (d.clipShape) {
          return d.clipShape;
        } else {
          return _options.props.clipShape;
        }
      }
    }
  });
}

export function picturePanelBinding($, go, _options) {
  return binding($, go, {
    isCliping: {
      key: '',
      handler(d) {
        if (
          (d.shape && d.shape === 'clipImage') ||
          (!d.shape && _options.props.shape === 'clipImage')
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['image', 'clipImage'].includes(d.shape)) ||
          (!d.shape && ['image', 'clipImage'].includes(_options.props.shape))
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}
export function pictureBinding($, go, _options) {
  return binding($, go, {
    source: {
      key: '',
      handler(d) {
        return d.image;
      }
    },
    errorFunction: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return (pic, e) => {
          let brokenImage = n.data.brokenImage || _options.props.brokenImage;
          if (brokenImage) {
            let img = new Image();
            img.src = brokenImage;
            img.onload = () => {
              pic.source = brokenImage;
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
    width: {
      key: '',
      handler: getSizeHandler($, go, _options, 'width')
    },
    height: {
      key: '',
      handler: getSizeHandler($, go, _options, 'height')
    }
  });
}
export function figurePanelBinding($, go, _options) {
  return binding($, go, {
    portId: {
      key: '',
      handler(d) {
        if (
          (d.linkPort !== undefined && d.linkPort === 'tFigure') ||
          (d.linkPort === undefined && _options.props.linkPort === 'tFigure')
        ) {
          return '';
        } else {
          return 'tFigure';
        }
      }
    },
    margin: {
      key: '',
      handler(d) {
        if (typeof d.figureMargin === 'number') {
          return d.figureMargin;
        } else if (d.figureMargin instanceof Array) {
          return new go.Margin(...d.figureMargin);
        } else {
          return _options.props.figureMargin;
        }
      }
    }
  });
}
export function pictureCircleBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          d.stateShape === null ||
          (d.stateShape === undefined && _options.props.stateShape === null)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    width: {
      key: '',
      handler: getSizeHandler($, go, _options, 'width')
    },
    height: {
      key: '',
      handler: getSizeHandler($, go, _options, 'height')
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'strokeColor');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'strokeWidth');
      }
    },
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'background');
      }
    },
    ...shapeParamsBinding(_options, 'stateShape', [
      'parameter1',
      'parameter2',
      'geometryString'
    ]),
    figure: {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams.stateShape &&
          d.shapeParams.stateShape.geometryString
        ) {
          return 'None';
        } else if (d.stateShape) {
          return d.stateShape;
        } else {
          return _options.props.stateShape;
        }
      }
    }
  });
}
export function pictureHolderBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['clipImage', 'image'].includes(d.shape)) ||
          (!d.shape && ['image', 'clipImage'].includes(_options.props.shape))
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    width: {
      key: '',
      handler: getSizeHandler($, go, _options, 'width')
    },
    height: {
      key: '',
      handler: getSizeHandler($, go, _options, 'height')
    },
    ...shapeParamsBinding(_options, 'figureShape', [
      'parameter1',
      'parameter2',
      'geometryString'
    ]),
    figure: {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams.holderShape &&
          d.shapeParams.holderShape.geometryString
        ) {
          return 'None';
        } else if (d.clipShape) {
          return d.clipShape;
        } else {
          return _options.props.clipShape;
        }
      }
    },
    fill: {
      key: '',
      handler(d) {
        if (d.isGray) {
          let grayColor;
          if (d.background && d.background.gray) {
            grayColor = d.background.gray;
          } else {
            grayColor = _options.props.background.gray;
          }
          return grayColor;
        } else {
          return 'transparent';
        }
      }
    },
    opacity: {
      key: '',
      handler(d) {
        if (d.isGray) {
          return 0.7;
        } else {
          return 0;
        }
      }
    }
  });
}
export function shapeBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && ['clipImage', 'image', 'icon'].includes(d.shape)) ||
          (!d.shape &&
            ['clipImage', 'image', 'icon'].includes(_options.props.shape))
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'background');
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'strokeColor');
      }
    },
    strokeWidth: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'strokeWidth');
      }
    },
    width: {
      key: '',
      handler: getSizeHandler($, go, _options, 'width')
    },
    height: {
      key: '',
      handler: getSizeHandler($, go, _options, 'height')
    },
    ...shapeParamsBinding(_options, 'figureShape', [
      'parameter1',
      'parameter2',
      'geometryString'
    ]),
    figure: {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams.figureShape &&
          d.shapeParams.figureShape.geometryString
        ) {
          return 'None';
        } else if (
          d.shape &&
          !['clipImage', 'image', 'icon'].includes(d.shape)
        ) {
          return d.shape;
        } else if (
          !d.shape &&
          !['clipImage', 'image', 'icon'].includes(_options.props.shape)
        ) {
          return _options.props.shape;
        }
      }
    }
  });
}
export function iconfontBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          (d.shape && d.shape === 'icon') ||
          (!d.shape && _options.props.shape === 'icon')
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    text: {
      key: '',
      handler(d) {
        if (d.icon && typeof d.icon === 'string') {
          return d.icon;
        } else if (d.icon && d.icon.text) {
          return d.icon.text;
        } else {
          return _options.props.icon.text;
        }
      }
    },
    font: {
      key: '',
      handler: getHandler($, go, _options, ['icon', 'font'])
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'iconColor');
      }
    }
  });
}
