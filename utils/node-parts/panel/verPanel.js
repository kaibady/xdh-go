import { extendOption } from '../util/fun';
/**
 * @function verPanel 垂直布局
 * @param {*} $ 
 * @param {*} go 
 * @param {*} options 
 */
export default function($, go, options) {
  let defaultProps = {
    background: 'rgba(0, 0, 0, 0)',
    alignment: go.Spot.Center
  };
  let _options = extendOption(defaultProps, options);
  return $(
    go.Panel,
    go.Panel.Vertical,
    _options.props,
    ..._options.parts,
    _options.events,
    ..._options.binding
  );
}
