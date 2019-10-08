import { extendOption } from './util/fun';
export default function($, go, options = {}) {
  let _options = extendOption(
    {
      margin: 8,
      stroke: '#fff',
      font: 'bold 16px sans-serif'
    },
    options
  );
  let defaultShapeProp = {
    fill: 'rgba(0,0,0,0.6)',
    strokeWidth: 1
  };

  _options.shape = _options.shape || {};
  _options.shape.props = Object.assign(
    {},
    defaultShapeProp,
    (options.shape || {}).props || {}
  );
  _options.shape.binding = (options.shape || {}).binding || [];

  _options.adornment = _options.adornment || {};
  _options.adornment.props = Object.assign(
    {},
    (options.adornment || {}).props || {}
  );
  _options.adornment.binding = (options.adornment || {}).binding || [];
  _options.adornment.type = (options.adornment || {}).type || 'Auto';
  return $(
    go.Adornment,
    _options.adornment.type,
    _options.adornment.props,
    $(go.Shape, _options.shape.props, ..._options.shape.binding),
    $(go.TextBlock, _options.props, ..._options.binding),
    ..._options.adornment.binding
  );
}
