export const defaultImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
export let getDefaultProps = ($, go) => {
  return {
    hidden: false, // 隐藏
    image: undefined,
    brokenImage: undefined,
    labelStroke: {
      normal: 'transparent',
      highlight: '#fff',
      hover: '#fff',
      select: '#fff'
    },
    labelColor: {
      normal: '#000',
      highlight: '#fff',
      hover: '#fff',
      select: '#fff'
    },
    labelBackground: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    label: {
      text: '',
      show: true,
      editable: false,
      font: '14px "iconfont"',
      margin: [10, 10, 10, 10]
    },
    iconColor: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    shape: 'Rectangle',
    shapeParams: {
      figureShape: {
        parameter1: NaN,
        parameter2: NaN,
        geometryString: undefined
      },
      clipShape: {
        parameter1: NaN,
        parameter2: NaN,
        geometryString: undefined
      },
      holderShape: {
        parameter1: NaN,
        parameter2: NaN,
        geometryString: undefined
      },
      stateShape: {
        parameter1: NaN,
        parameter2: NaN,
        geometryString: undefined
      }
    },
    clipShape: 'Circle',
    stateShape: 'Circle',
    background: {
      normal: 'yellow',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    strokeColor: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    strokeWidth: {
      normal: 3,
      highlight: 4,
      hover: 4,
      select: 5
    },
    scale: 1,
    size: 50,
    icon: {
      iconfont: '30px "iconfont"',
      text: '\uE7BD'
    },
    loc: '0 0',
    tooltip: {
      stroke: '#000',
      color: '#fff',
      strokeWidth: 1,
      font: '14px',
      background: 'rgba(0,0,0,0.6)',
      text: ''
    },
    _nodeOptions: {
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
    _figurePanelOptions: {
      props: {},
      parts: []
    },
    _figureHolderOptions: {
      props: {},
      parts: []
    },
    _stateShapeOptions: {
      props: {},
      parts: []
    },
    _clipShapeOptions: {
      props: {},
      parts: []
    },
    _clipPanelOptions: {
      props: {},
      parts: []
    },
    _pictureOptions: {
      props: {}
    },
    _shapeOptions: {
      props: {},
      parts: []
    },
    _iconOptions: {
      props: {},
      parts: []
    },
    _labelPanelOptions: {
      props: {},
      parts: []
    },
    _labelShapeOptions: {
      props: {},
      parts: []
    },
    _labelTextOptions: {
      props: {},
      parts: []
    }
  };
};

export function handleNodeDefault($, go, options = {}) {
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
    'labelColor',
    'labelBackground',
    'iconColor',
    'background',
    'strokeColor',
    'strokeWidth',
    'tooltip',
    'icon',
    'shapeParams'
  ];
  for (let name in defaultProps) {
    // 如果是简化参数，把参数值按对象的定义方法设置
    if (extendNames.includes(name)) {
      // console.log(name, _options.props[name]);
      if (typeof _options.props[name] !== 'object') {
        // 这三种类型在简化传值时，默认传的是text,其它取默认
        if (['label', 'icon', 'tooltip'].includes(name)) {
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
      // '_' 开头的是扩展参数
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
