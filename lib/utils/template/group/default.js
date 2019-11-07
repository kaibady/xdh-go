export let getDefaultProps = ($, go) => {
  return {
    figure: 'Rectangle',
    fill: 'rgba(248,91,99,0.1)',
    stroke: 'rgba(248,91,99,0.8)',
    strokeWidth: 1,
    maxSize: [1000, 1000],
    groupName: {
      text: '',
      font: '14px "Microsoft Yahei"',
      margin: [5, 0, 0, 40]
    }
  };
};
export function handleGroupDefault($, go, options) {
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
  let extendNames = ['groupName'];
  for (let name in defaultProps) {
    if (extendNames.includes(name)) {
      if (typeof _options.props[name] !== 'object') {
        if (['groupName'].includes(name)) {
          let obj = {};
          for (let n1 in defaultProps[name]) {
            if (n1 === 'text') {
              obj[n1] = _options.props[name] || defaultProps[name][n1];
            } else {
              obj[n1] = defaultProps[name][n1];
            }
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
