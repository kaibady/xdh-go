/**
 * @function genOption
 * @description 封装时将传入的参数与默认参数合并，支持到第二级合并
 * @param {*} defaultProps
 * @param {*} options
 */
export function genOption(defaultProps, options = {}) {
  // 默认参数补全
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  // 取传进来的默认参数，深入到第二层合并
  for (let name in defaultProps) {
    if (typeof defaultProps[name] !== 'object') {
      _options.props[name] =
        _options.props[name] === undefined
          ? defaultProps[name]
          : _options.props[name];
    } else if (defaultProps[name] instanceof Array) {
      _options.props[name] =
        _options.props[name] === undefined
          ? [...defaultProps[name]]
          : _options.props[name];
    } else if(typeof defaultProps[name] === 'object') {
      for (let n1 in defaultProps[name]) {
        _options.props[name][n1] =
          _options.props[name][n1] === undefined
            ? defaultProps[name][n1]
            : _options.props[name][n1];
      }
    }
  }
  return _options;
}
/**
 * @function extendOption
 * @description 封装时将传入的参数与默认参数合并
 * @param {*} defaultProps
 * @param {*} options
 */
export function extendOption(defaultProps, options = {}) {
  // 默认参数补全
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  // 取传进来的默认参数，只支持到第一层合并
  for (let name in defaultProps) {
    _options.props[name] =
      _options.props[name] === undefined
        ? defaultProps[name]
        : _options.props[name];
  }
  return _options;
}
/**
 * 设置灰度模式
 * @param {Object} options 
 * @param {Object} options.diagram go.Diagram对象 
 * @param {Object} options.nodes 高亮节点
 * @param {Object} options.mode 高亮模式，'highlight'/'select'
 */
export function setGray(options = {}) {
  let defaultOption = {
    diagram: null,
    nodes: [],
    mode: 'select'
  };
  let _options = Object.assign({}, defaultOption, options);
  if (_options.diagram) {
    let model = _options.diagram.model;
    _options.diagram.nodes.each(N => {
      if (_options.nodes.indexOf(N) > -1) {
        switch (_options.mode) {
          case 'select':
            N.isSelected = true;
            break;
          case 'highlight':
            N.isHighlighted = true;
            break;
        }
      } else {
        model.set(N.data, 'isGray', true);
      }
    });
  }
}
/**
 * 取消灰度模式
 * @param {Object} options 
 * @param {Object} options.diagram go.Diagram对象 
 */
export function removeGray(options = {}) {
  let defaultOption = {
    diagram: null,
    reset: true
  };
  let _options = Object.assign({}, defaultOption, options);
  if (_options.diagram) {
    let model = _options.diagram.model;
    _options.diagram.nodes.each(N => {
      model.set(N.data, 'isGray', false);
      N.isSelected = false;
      N.isHighlighted = false;
    });
  }
}