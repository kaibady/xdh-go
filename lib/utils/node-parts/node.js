export default function($, go, options) {
  let defaultProps = {
    background: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    selectionAdorned: false
  };
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props);
  return $(
    go.Node,
    _options.type || 'Auto',
    _options.props,
    _options.events,
    ..._options.parts,
    ..._options.binding
  );
}
