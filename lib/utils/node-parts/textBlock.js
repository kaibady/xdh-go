export default function($, go, options) {
  let defaultProps = {
    margin: new go.Margin(0, 0, 0, 0),
    stroke: '#fff',
    alignment: go.Spot.Center,
    verticalAlignment: go.Spot.Bottom,
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
    ' ',
    _options.props,
    ..._options.parts,
    ..._options.binding
  );
}
