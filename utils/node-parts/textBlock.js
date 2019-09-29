export default function($, go, options = {}) {
  let defaultProps = {
    stroke: '#000',
    text: 'default Text', 
    textAlign: 'center',
    verticalAlignment: go.Spot.Center,
    scale: 1
  };
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      binding: [],
      events: {}
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props);
  return $(
    go.TextBlock,
    _options.props,
    ..._options.binding
  );
}
