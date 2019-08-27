import { genOption } from './util/fun';
export default function($, go, options) {
  let _options = genOption(
    {
      margin: 8,
      stroke: '#fff',
      font: 'bold 16px sans-serif'
    },
    options
  );
  let defaultShape = $(
    go.Shape,
    {
      fill: 'rgba(0,0,0,0.6)',
      strokeWidth: 1
    },
    ..._options.shapeBinding
  );
  let defaultShapeBinding = [];
  _options.shape = _options.shape || defaultShape;
  _options.shapeBinding = _options.shapeBinding || defaultShapeBinding;
  return $(
    go.Adornment,
    'Auto',
    _options.shape,
    $(go.TextBlock, '', _options.props, ..._options.binding),
    ...options.adornmentBinding
  );
}
