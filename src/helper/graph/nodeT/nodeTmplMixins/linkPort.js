export default function ($, go) {
  let spot = go.Spot.Top;
  let portSize = 12;
  return $(go.Shape, 'Circle', {
      fill: 'transparent',
      stroke: null,
      strokeWidth: 4,
      desiredSize: new go.Size(portSize, portSize),
      alignment: spot,
      alignmentFocus: spot,
      portId: 'linkPort',
      fromSpot: spot,
      toSpot: spot,
      fromLinkable: true,
      toLinkable: true,
      cursor: 'pointer'
    },
    new go.Binding('visible', '', n => {
      let {addLinkMode} = n.diagram.model.modelData;
      let show = false;
      if (addLinkMode) {
        show = true;
      }
      return show;
    }).ofObject()
  )
}
