export function genOption(defaultProps, options = {}) {
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props || {});
  return _options;
}
