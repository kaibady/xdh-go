/**
 * 
 * @param {*} $ 
 * @param {*} go 
 * @param {*} options
 * @property {string} [options.name] portId
 * @property {string} [options.spot] 点对应的位置 go.Spot对象，如果对应的props中有具体的属性值，会将其覆盖
 * @property {string} [options.output] 是否允许作为起始点连接，如果对应的props中有具体的属性值，会将其覆盖
 * @property {string} [options.input] 是否允许作为结束点连接，如果对应的props中有具体的属性值，会将其覆盖
 * @property {object} [options.props] go.Space的属性
 * @property {array} [options.parts] $()返回的对象或者go.Binding对象等
 */
export default function makePort($, go, options) {
  let defaultSpot = options.spot || new go.Spot(0.5, 0.5);
  let defaultProps = {
    fill: null,
    stroke: null,
    desiredSize: new go.Size(7, 7),
    alignment: defaultSpot,
    alignmentFocus: defaultSpot,
    portId: options.name || '',
    fromSpot: defaultSpot,
    toSpot: defaultSpot,
    fromLinkable: options.output || true,
    toLinkable: options.input || true,
    cursor: 'pointer'
  };
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {}
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props);
  return $(go.Shape, 'Circle', _options.props, ..._options.parts);
}
