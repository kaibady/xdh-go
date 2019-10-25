import { shapeParamsBinding, bindToState } from '../bindings';
import { binding } from '../../../node-parts/index';
export function containerBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (
          d.containerShape === null ||
          (d.containerShape === undefined &&
            _options.props.containerShape === null)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    ...shapeParamsBinding(_options, 'containerShape', [
      'parameter1',
      'parameter2',
      'geometryString'
    ]),
    figure: {
      key: '',
      handler(d) {
        if (
          d.shapeParams &&
          d.shapeParams.containerShape &&
          d.shapeParams.containerShape.geometryString
        ) {
          return 'None';
        } else if (d.containerShape) {
          return d.containerShape;
        } else {
          return _options.props.containerShape;
        }
      }
    },
    stroke: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'containerStrokeColor');
      }
    },
    fill: {
      type: 'ofObject',
      key: '',
      handler(n) {
        return bindToState(n, _options, 'containerBackground');
      }
    }
  });
}
