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
      panel: {
        type: 'Spot',
        props: {},
        binding: []
      }
    },
    options
  );
  let pictureDefaultProps = {
    name: 'Picture',
    sourceCrossOrigin: function() {
      return 'use-credentials';
    },
    width: 60,
    height: 60
  };
  _options.props = Object.assign({}, pictureDefaultProps, options.props);
  // 裁剪处理
  let clipDefaultProps = {
    figure: 'Circle'
  };
  // 如果clip为flase,则不做裁剪，clip的visible设为false
  _options.clip = _options.clip || { props: {}, binding: [] };
  let clipProps = Object.assign(
    {},
    clipDefaultProps,
    (options.clip || {}).props || {}
  );
  _options.clip.props = clipProps;
  _options.clip.props.width = _options.clip.props.width || _options.props.width;
  _options.clip.props.height = _options.clip.props.height || _options.props.height;
  _options.clip.binding = (options.clip || {}).binding || [];
  if (options.clip === false) {
    _options.clip.props.visible = false;
  }
  let imageClip = $(
    go.Shape,
    {
      ..._options.clip.props
    },
    ..._options.clip.binding
  );
  let panelDefaultProps = {
    name: 'image',
    isClipping: true,
    scale: 1
  };

  _options.panel.props = Object.assign(
    {},
    panelDefaultProps,
    (options.panel || {}).props || {}
  );
  _options.panel.type = (options.panel || {}).type || 'Spot';
  _options.panel.binding = (options.panel || {}).binding || [];
  return $(
    go.Panel,
    _options.panel.type,
    {
      ..._options.panel.props
    },
    imageClip,
    $(go.Picture, _options.props, ..._options.parts, ..._options.binding),
    ..._options.panel.binding
  );
}
