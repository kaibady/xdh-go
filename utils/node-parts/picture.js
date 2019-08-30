export default function($, go, options) {
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: [],
      clip: {
        props: {},
        binding: []
      },
      panelBinding: []
    },
    options
  );
  let pictureProps = {
    name: 'Picture',
    sourceCrossOrigin: function() {
      return 'use-credentials';
    },
    width: 30,
    height: 30
  };
  _options.props = Object.assign({}, pictureProps, options.props);
  let imageClip = $(
    go.Shape,
    {
      figure: 'Circle',
      width: 60,
      height: 60,
      fill: 'transparent',
      stroke: '#ffc000',
      strokeWidth: 1,
      portId: 'picture',
      ..._options.clip.props
    },
    ..._options.clip.binding
  );
  return $(
    go.Panel,
    'Spot',
    {
      name: 'image',
      isClipping: true,
      scale: 1
    },
    imageClip,
    $(go.Picture, _options.props, ..._options.parts, ..._options.binding),
    ..._options.panelBinding
  );
}
