import { binding } from '../../node-parts/index';
export function getHandler($, go, _options, propArr) {
  let p1 = propArr[0],
    p2 = propArr[1];
  let fun;
  if (p1 && p2) {
    fun = d => {
      if (d[p1] && d[p1][p2]) {
        return d[p1][p2];
      } else {
        return _options.props[p1][p2];
      }
    };
  } else if (p1) {
    fun = d => {
      if (d[p1]) {
        return d[p1];
      } else {
        return _options.props[p1];
      }
    };
  }

  return fun;
}
export function groupShapeBinding($, go, _options) {
  return binding($, go, {
    figure: {
      key: '',
      handler: getHandler($, go, _options, ['figure'])
    },
    fill: {
      key: '',
      handler: getHandler($, go, _options, ['background'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['stroke'])
    },
    strokeWidth: {
      key: '',
      handler: getHandler($, go, _options, ['strokeWidth'])
    },
    maxSize: {
      key: '',
      handler(d) {
        if (d.maxSize && d.maxSize instanceof Array) {
          return new go.Size(...d.maxSize);
        } else {
          return new go.Size(..._options.props.maxSize);
        }
      }
    }
  });
}
export function groupNameBinding($, go, _options) {
  return binding($, go, {
    text: {
      key: '',
      handler: getHandler($, go, _options, ['groupName', 'text'])
    },
    stroke: {
      key: '',
      handler: getHandler($, go, _options, ['groupName', 'stroke'])
    },
    margin: {
      key: '',
      handler(t, n) {
        let d = n.part.data;
        if (d.groupName && d.groupName.margin) {
          if (typeof d.groupName.margin === 'number') {
            return d.groupName.margin;
          } else if (d.groupName.margin instanceof Array) {
            return new go.Margin(...d.groupName.margin);
          } else {
            return new go.Margin(..._options.props.groupName.margin);
          }
        } else if (typeof _options.props.groupName.margin === 'number') {
          return _options.props.groupName.margin;
        } else {
          return new go.Margin(..._options.props.groupName.margin);
        }
      }
    }
  });
}
