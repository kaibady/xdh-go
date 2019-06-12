// 一键标注圆圈
export default function ($, go) {
  let circleSize = 75;
  let defaultColor = 'yellow';
  return $(
    go.Shape,
    'Circle',
    {
      width: circleSize,
      height: circleSize,
      fill: $(go.Brush, 'Radial', {
        0.0: 'rgba(0, 0, 0, 0)',
        0.67: 'rgba(255,242, 0, 0)',
        0.80: 'rgba(255,242, 0, 0.1)',
        1: 'rgba(255,242, 0, 0.23)'
      }),
      stroke: defaultColor,
      scale: 1.5,
      strokeWidth: 0
    },
    new go.Binding('visible', 'tagging')
  );
}
