import { genOption } from './util/fun';
export default function($, go, options) {
  let _options = genOption(
    {
      selectionAdorned: false
    },
    options
  );
  let parts =
    _options.parts.length === 0
      ? (_options.parts = [$(go.Shape)])
      : _options.parts;
  return $(
    go.Link,
    _options.props,
    _options.events,
    ...parts,
    ..._options.binding
  );
}
