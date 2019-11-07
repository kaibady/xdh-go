import { extendOption } from './util/fun';
import { typeMap } from './panel/index';
/**
 * @function node 节点定义
 * @param {*} $
 * @param {*} go
 * @param {*} options
 */
export default function($, go, options) {
  let defaultProps = {
    background: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    selectionAdorned: false
  };
  let _options = extendOption(defaultProps, options);
  let type = typeMap[_options.type] || _options.type || 'Auto'
  return $(
    go.Group,
    type,
    _options.props,
    _options.events,
    ..._options.parts,
    ..._options.binding
  );
}
