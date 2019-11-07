import { panel, group, node, shape, textBlock } from '../../node-parts';
import { groupShapeBinding, groupNameBinding } from './bindings';
import { handleGroupDefault } from './default';
function getNormalGroup($, go, _options) {
  return group($, go, {
    type: 'Position',
    props: {
      selectionObjectName: 'PANEL',
      ungroupable: true
    },
    parts: [
      textBlock($, go, {
        props: {
          font: 'bold 18px sans-serif',
          isMultiline: true,
          editable: true
        },
        binding: groupNameBinding($, go, _options)
      }),
      panel($, go, {
        type: 'Auto',
        props: {
          name: 'PANEL',
          alignment: new go.Spot(0.5, 0)
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
          $(go.Placeholder, {
            margin: new go.Margin(35, 25, 0, 10),
            background: 'transparent'
          }),
          $('SubGraphExpanderButton', {
            alignment: new go.Spot(0, 0, 10, 10),
            'ButtonBorder.figure': 'Rectangle'
          })
        ]
      })
    ]
  });
}
function getMixedGroup($, go, _options) {
  return node($, go, {
    type: 'Auto',
    props: {
      locationObjectName: 'BODY',
      selectionAdorned: false,
      zOrder: 1
    },
    parts: [
      shape($, go, {
        props: {},
        binding: groupShapeBinding($, go, _options)
      }),
      panel($, go, {
        props: {
          name: 'PANEL',
          alignment: new go.Spot(0.5, 0)
        },
        parts: [
          textBlock($, go, {
            props: {
              font: 'bold 18px sans-serif',
              isMultiline: true,
              editable: true
            },
            binding: groupNameBinding($, go, _options)
          }),
          shape($, go, {
            props: {
              name: 'BODY',
              opacity: 0
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
  console.log(_options.props)
  if (_options.props.groupType === 'mixed') {
    return getMixedGroup($, go, _options);
  } else {
    return getNormalGroup($, go, _options);
  }
}
