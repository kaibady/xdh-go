import { extendOption } from './util/fun';
export default function($, go, options = {}) {
  let _options = extendOption({}, options);
  return $(go.Shape, _options.props, ..._options.binding, _options.events);
}
