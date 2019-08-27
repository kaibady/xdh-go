export default function($, go, options) {
  let _options = Object.assign(
    {
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
    width: 30,
    height: 30
  };
  let defaultClipBinding = [];
  _options.props = Object.assign({}, defaultProps, options.props);
  _options.clipBinding = _options.clipBinding || defaultClipBinding;
  let defaultClip = $(
    go.Shape,
    'Circle',
    {
      width: 60,
      height: 60,
      fill: 'transparent',
      stroke: '#ffc000',
      strokeWidth: 1,
      portId: 'picture'
    },
    ..._options.clipBinding
  );
  _options.clip = _options.clip || defaultClip;
  _options.isClipping = _options.isClipping || true;
  console.log('clipping', _options);
  return $(
    go.Panel,
    'Spot',
    {
      name: 'image',
      isClipping: _options.isClipping,
      scale: 1
    },
    _options.clip,
    $(go.Picture, _options.props, [..._options.parts, ..._options.binding])
  );
}
