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
