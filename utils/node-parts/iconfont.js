export default function($, go, options) {
  let defaultProps = {
    font: `30px "iconfont"`,
    stroke: '#ccc',
    wrap: go.TextBlock.OverflowEllipsis,
    editable: false,
    textAlign: 'center',
    alignment: go.Spot.Center,
    verticalAlignment: go.Spot.Top,
    portId: '',
    scale: 1
  };
  let _options = Object.assign(
    {
      icon: '\uE7BD',
      props: {},
      parts: [],
      events: {}
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props);
    return $(go.TextBlock, `${_options.icon}`, _options.props);
}