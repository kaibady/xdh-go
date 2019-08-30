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
    } else {
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
