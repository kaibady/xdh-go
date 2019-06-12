export default function ($, go, options) {
  return $(
    go.Node,
    'Spot',
    {
      locationSpot: go.Spot.Center
    },
    new go.Binding('text', 'text'),
    $(go.Shape, 'Ellipse',
      {
        fill: 'lightgray',
        stroke: null,
        desiredSize: new go.Size(30, 30)
      },
      new go.Binding('fill', 'fill')),
    $(go.TextBlock, new go.Binding('text', 'text'))
  );
}
