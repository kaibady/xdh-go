export let getDefaultProps = ($, go) => {
  return {
    arrows: {
      to: {
        type: 'Standard',
        scale: 1,
        show: false
      },
      from: {
        type: 'Standard',
        scale: 1,
        show: false
      }
    },
    type: 'curve',
    fromShortLength: 0,
    toShortLength: 0,
    // curve: go.Link.Bezier,
    // curviness: 10,
    // corner: 0,
    // routing: go.Link.Normal,
    // smoothness: 0.5,
    dashes: false,
    opacity: 1,
    lineWidth: {
      normal: 1,
      hover: 2,
      highlight: 2,
      select: 2,
      gray: 1
    },
    lineColor: {
      normal: '#000',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff',
      gray: '#ccc'
    },
    arrowFill: {
      normal: '#000',
      highlight: '#000',
      hover: '#000',
      select: '#000',
      gray: '#ccc'
    },
    arrowStroke: {
      normal: '#000',
      highlight: '#000',
      hover: '#000',
      select: '#000',
      gray: '#ccc'
    },
    arrowStrokeWidth: {
      normal: 1,
      hover: 1,
      highlight: 1,
      select: 1,
      gray: 1
    },
    labelStroke: {
      normal: 'transparent',
      hover: 'transparent',
      highlight: 'transparent',
      select: 'transparent',
      gray: '#ccc'
    },
    labelColor: {
      normal: '#000',
      highlight: '#000',
      hover: '#000',
      select: '#000',
      gray: '#ccc'
    },
    labelBackground: {
      normal: 'transparent',
      highlight: 'transparent',
      hover: 'transparent',
      select: 'transparent',
      gray: '#ccc'
    },
    label: {
      text: '',
      font: '13px sans-serif',
      editable: false,
      show: false,
      margin: 5,
      placement: 'top',
      offsetX: 0,
      offsetY: 0,
      segment: 1
    },
    _linkOptions: {
      props: {},
      parts: []
    }, // 自定义连线参数
    _lineOptions: {
      props: {},
      parts: []
    }, // 自定义连线参数
    _toArrowOptions: {
      props: {},
      parts: []
    },
    _fromArrowOptions: {
      props: {},
      parts: []
    },
    _labelTextOptions: {
      props: {},
      parts: []
    },
    _outerPanelOptions: {
      props: {},
      parts: []
    },
    _innerPanelOptions: {
      props: {},
      parts: []
    },
    _labelShapeOptions: {
      props: {},
      parts: []
    },
    _linkHolderOptions: {
      props: {},
      parts: []
    }
  };
};

export function handleLinkDefault($, go, options = {}) {
  let defaultProps = getDefaultProps($, go);
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  // 对于节点可以传字符串或对象两种类型的参数，凡是传字符串的，处理到默认配置对象的默认值中，以减少数据绑定复杂性
  // 需要特殊处理的参数名
  let extendNames = [
    'label',
    'labelStroke',
    'labelBackground',
    'lineColor',
    'lineWidth',
    'arrowFill',
    'arrowStrokeWidth',
    'arrowStroke',
    'arrows'
  ];
  for (let name in defaultProps) {
    // 如果是简化参数，把参数值按对象的定义方法设置
    if (extendNames.includes(name)) {
      if (name === 'arrows') {
        // 如果arrows是字符串，看是否包含to,from分别设置他们的show属性
        let type = typeof _options.props[name];
        let arrows = { to: {}, from: {} };
        ['to', 'from'].forEach(part => {
          for (let n1 in defaultProps[name][part]) {
            if (n1 === 'show') {
              switch (type) {
                case 'string':
                  arrows[part].show = _options.props[name].includes(part);
                  break;
                case 'undefined':
                  arrows[part].show = false;
                  break;
                case 'object':
                  if (_options.props[name][part] !== undefined) {
                    if (_options.props[name][part].show === undefined) {
                      arrows[part].show = true;
                    } else {
                      arrows[part].show = _options.props[name][part].show;
                    }
                  } else {
                    arrows[part].show = false;
                  }
                  break;
              }
            } else {
              arrows[part][n1] = defaultProps[name][part][n1];
            }
          }
        });

        _options.props.arrows = arrows;
      } else if (typeof _options.props[name] !== 'object') {
        // 这三种类型在简化传值时，默认传的是text,其它取默认
        if (['label'].includes(name)) {
          let obj = {};
          for (let n1 in defaultProps[name]) {
            if (n1 === 'text') {
              obj[n1] = _options.props[name] || defaultProps[name][n1];
            } else {
              obj[n1] = defaultProps[name][n1];
            }
          }
          _options.props[name] = obj;
        } else {
          let obj = {};
          for (let n1 in defaultProps[name]) {
            obj[n1] = _options.props[name] || defaultProps[name][n1];
          }
          _options.props[name] = obj;
        }
      } else {
        for (let n1 in defaultProps[name]) {
          _options.props[name][n1] =
            _options.props[name][n1] === undefined
              ? defaultProps[name][n1]
              : _options.props[name][n1];
        }
      }
    } else {
      // '_' 开头的是部件参数
      if (name[0] === '_' && _options.props[name]) {
        _options.props[name].props =
          _options.props[name].props === undefined
            ? defaultProps[name].props
            : _options.props[name].props;
        _options.props[name].parts =
          _options.props[name].parts === undefined
            ? defaultProps[name].parts
            : _options.props[name].parts;
      } else {
        _options.props[name] =
          _options.props[name] === undefined
            ? defaultProps[name]
            : _options.props[name];
      }
    }
  }
  return _options;
}
