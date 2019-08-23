export default function($, go, options) {
  let _options = Object.assign(
    {
      shape: $(go.Shape, 'Circle', {
        width: 60,
        height: 60,
        fill: 'transparent',
        stroke: '#ffc000',
        strokeWidth: 1,
        portId: 'picture'
      }),
      isClipping: true,
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  let defaultProps = {
    name: 'Picture',
    sourceCrossOrigin: function() {
      return 'use-credentials';
    },
    width: _options.shape.width,
    height: _options.shape.height
  };
  _options.props = Object.assign({}, defaultProps, options.props);
  console.log('clipping', _options)
  return $(
    go.Panel,
    'Spot',
    {
      name: 'image',
      isClipping: _options.isClipping,
      scale: 1
    },
    _options.shape,
    $(go.Picture, _options.props, [
      ..._options.parts,
      ..._options.binding
    ])
  );
}
