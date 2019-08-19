export default function($, go, options) {
  let defaultProps = {
    background: 'rgba(0, 0, 0, 0)',
    alignment: go.Spot.Center
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
  return $(go.Panel, go.Panel.Vertical, _options.props, ..._options.parts, ..._options.binding);
}
