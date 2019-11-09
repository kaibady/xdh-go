export const defaultImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
export let getDefaultProps = ($, go) => {
  return {
    layout: 'Vertical', // 节点布局
    opacity: 1, // 透明度
    shape: 'Rectangle',
    stateShape: 'Circle',
    scale: 1,
    nodeMargin: [10, 10, 10, 10],
    figureMargin: 10,
    clipShape: 'Circle',
    image: undefined,
    brokenImage: undefined,
    linkPort: 'tFigure', // 'tNode/tFigure/tLabel'
    labelStroke: {
      normal: 'transparent',
      highlight: 'transparent',
      hover: 'transparent',
      select: 'transparent',
      gray: 'transparent'
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
      show: true,
      editable: false,
      font: '14px "Microsoft Yahei"',
      margin: 0
    },
    iconColor: {
      normal: '#1890ff',
      highlight: '#1890ff',
      hover: '#1890ff',
      select: '#1890ff',
      gray: '#ccc'
    },

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
      },
      containerShape: {
        parameter1: NaN,
        parameter2: NaN,
        geometryString: undefined
      }
    },

    containerShape: null,
    containerBackground: {
      normal: '#85a5ff',
      highlight: '#85a5ff',
      hover: '#85a5ff',
      select: '#85a5ff',
      gray: '#ccc'
    },
    containerStrokeColor: {
      normal: '#061178',
      highlight: '#061178',
      hover: '#061178',
      select: '#061178',
      gray: '#ccc'
    },
    background: {
      normal: '#91d5ff',
      highlight: '#91d5ff',
      hover: '#91d5ff',
      select: '#91d5ff',
      gray: '#ccc'
    },
    strokeColor: {
      normal: '#0050b3',
      highlight: '#c41d7f',
      hover: '#c41d7f',
      select: '#c41d7f',
      gray: '#ccc'
    },
    strokeWidth: {
      normal: 2,
      highlight: 2,
      hover: 2,
      select: 2,
      gray: 2
    },

    size: [50, 50],
    icon: {
      font: '30px "iconfont"',
      text: '\uE7BD'
    },
    loc: '0 0',
    tooltip: {
      stroke: '#003a8c',
      color: '#fff',
      strokeWidth: 1,
      font: '14px "Microsoft Yahei"',
      background: 'rgba(0,0,0,0.6)',
      text: ''
    },
    tag: {
      placement: 'top-right',
      figure: 'RoundedRectangle',
      background: '#40a9ff',
      stroke: '#003a8c',
      strokeWidth: 1,
      strokeDashArray: null,
      color: '#000',
      font: '14px "Microsoft Yahei"',
      margin: 5,
      text: ''
    },
    animation: null,
    zOrder: 0,
    _nodeOptions: {
      props: {},
      parts: [],
      binding: []
    },

    _outerPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _innerPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _figurePanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _figureHolderOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _stateShapeOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _clipShapeOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _clipPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _pictureOptions: {
      props: {},
      binding: []
    },
    _shapeOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _iconOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _labelOuterPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _labelInnerPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _labelShapeOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _labelTextOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _labelArrayOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _tagOuterPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _tagShapeOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _tagInnerPanelOptions: {
      props: {},
      parts: [],
      binding: []
    },
    _tagTextOptions: {
      props: {},
      parts: [],
      binding: []
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
    'containerBackground',
    'containerStrokeColor',
    'iconColor',
    'background',
    'strokeColor',
    'strokeWidth',
    'container',
    'tooltip',
    'icon',
    'size',
    'shapeParams',
    'animation'
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
        } else if (name === 'size') {
          // size另外处理,将数字转为数组
          if (typeof _options.props.size === 'number') {
            _options.props.size = [_options.props.size, _options.props.size];
          } else if (!(_options.props.size instanceof Array)) {
            _options.props.size = defaultProps.size;
          }
        } else if (name === 'animation') {
          _options.props.animation =
            _options.props.animation || defaultProps.animation;
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
        _options.props[name].binding =
          _options.props[name].binding === undefined
            ? defaultProps[name].binding
            : _options.props[name].binding;
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
