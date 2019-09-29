import { extendOption } from './util/fun';
export default function($, go, options = {}) {
  let _options = extendOption(
    {
      stroke: '#000',
      strokeWidth: 1
    },
    options
  );
  return $(go.Shape, _options.props, ..._options.binding, _options.events);
}
