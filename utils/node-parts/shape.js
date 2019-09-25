import { genOption } from './util/fun';
export default function($, go, options) {
  let _options = genOption(
    {
      width: 30,
      height: 30,
      fill: '#000',
      stroke: '#000s',
      strokeWidth: 1
    },
    options
  );
  return $(go.Shape, _options.props, ..._options.binding);
}
