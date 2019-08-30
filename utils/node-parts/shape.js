import { genOption } from './util/fun';
export default function($, go, options) {
  let _options = genOption(
    {
      width: 30,
      height: 30,
      fill: 'transparent',
      stroke: 'rgba(255,0,0,0)',
      strokeWidth: 3
    },
    options
  );
  return $(go.Shape, _options.props, ..._options.binding);
}
