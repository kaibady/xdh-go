import { getHandler } from '../bindings';
import { binding } from '../../../node-parts/index';
export function tagOuterPanelBinding($, go, _options) {
  return binding($, go, {
    visible: {
      key: '',
      handler(d) {
        if (d.tag && d.tag.text) {
          return true;
        } else if (d.tag && !d.tag.text) {
          return false;
        } else if (_options.props.tag.text) {
          return true;
        } else {
          return false;
        }
      }
    },
    alignment: {
      key: '',
      handler(d) {
        let placement;
        if (d.tag && d.tag.placement) {
          placement = d.tag.placement;
        } else {
          placement = _options.props.tag.placement;
        }
        let x = 0.5,
          y = 0.5;
        if (typeof placement === 'string') {
          if (placement.includes('top')) {
            y = 0;
          } else if (placement.includes('bottom')) {
            y = 1;
          }
          if (placement.includes('left')) {
            x = 0;
          } else if (placement.includes('right')) {
            x = 1;
          }
        } else if (placement instanceof Array) {
          x = placement[0];
          y = placement[1];
        }
        return new go.Spot(x, y);
      }
    }
  });
}
export function tagShapeBinding($, go, _options) {
  return binding($, go, {
    fill: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'fill'])
    },
    figure: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'figure'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'stroke'])
    },
    strokeWidth: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'strokeWidth'])
    },
    strokeDashArray: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'strokeDashArray'])
    }
  });
}

export function tagBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'text'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'color'])
    },
    font: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'font'])
    },
    margin: {
      key: '',
      handler: getHandler($, go, _options, ['tag', 'padding'])
    }
  });
}
