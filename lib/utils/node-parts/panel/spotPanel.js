import { extendOption } from '../util/fun';
/**
 * @function spotPanel spot布局
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
    'Spot',
    _options.props,
    ..._options.parts,
    _options.events,
    ..._options.binding
  );
}
