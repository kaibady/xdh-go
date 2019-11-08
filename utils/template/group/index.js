import { panel, group, node, shape, textBlock } from '../../node-parts';
import { groupShapeBinding, groupNameBinding } from './bindings';
import { handleGroupDefault } from './default';
import { registerFigure } from '../../customShape/figure';
function getNormalGroup($, go, _options) {
  return group($, go, {
    type: 'Vertical',
    props: {
      selectionObjectName: 'PANEL',
      ungroupable: true
    },
    parts: [
      panel($, go, {
        type: 'Auto',
        props: {
          name: 'PANEL'
        },
        parts: [
          shape($, go, {
            props: {
              // fromLinkable: true,
              // fromLinkableSelfNode: true,
              // fromLinkableDuplicates: true,
              // toLinkable: true,
              // toLinkableSelfNode: true,
              // toLinkableDuplicates: true
            },
            binding: groupShapeBinding($, go, _options)
          }),
          $(
            go.Panel,
            {
              alignment: new go.Spot(0.5, 0, 0, 5)
            },
            $('SubGraphExpanderButton', {
              'ButtonBorder.figure': 'Rectangle'
            })
          ),
          textBlock($, go, {
            props: {
              font: 'bold 18px "Microsoft Yahei"',
              isMultiline: true,
              editable: true,
              alignment: new go.Spot(0.5, 0, 0, 15)
            },
            binding: groupNameBinding($, go, _options)
          }),
          $(go.Placeholder, {
            margin: new go.Margin(25, 25, 25, 25),
            background: 'transparent'
          })
        ]
      })
    ]
  });
}
function getMixedGroup($, go, _options) {
  return node($, go, {
    type: 'Vertical',
    props: {
      locationObjectName: 'BODY',
      selectionAdorned: false,
      zOrder: 1
    },
    parts: [
      panel($, go, {
        type: 'Auto',
        props: {
          margin: 10
        },
        parts: [
          shape($, go, {
            props: {},
            binding: groupShapeBinding($, go, _options)
          }),
          textBlock($, go, {
            props: {
              font: 'bold 18px sans-serif',
              isMultiline: true,
              editable: true,
              alignment: new go.Spot(0.5, 0),
              name: 'GroupName'
            },
            binding: groupNameBinding($, go, _options)
          }),
          shape($, go, {
            props: {
              name: 'BODY',
              opacity: 0,
              margin: new go.Margin(35, 25, 0, 10)
            }
          })
        ]
      })
    ]
  });
}
export default function($, go, options) {
  let _options = handleGroupDefault($, go, options);
  _options.props.groupType = _options.props.groupType || 'normal';
  registerFigure(go, 'CustomCircle');
  if (_options.props.groupType === 'mixed') {
    return getMixedGroup($, go, _options);
  } else {
    return getNormalGroup($, go, _options);
  }
}
