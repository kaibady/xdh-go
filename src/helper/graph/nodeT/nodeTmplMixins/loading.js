import nodeIconType from '../nodeIcon';

export default function($, go, options) {
  return $(
    go.Panel,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      scale: 1.2
    },
    $(go.TextBlock, nodeIconType['loading'], {
      font: `${45}px "iconfont"`,
      stroke: 'rgba(245, 108, 108, 1)',
      editable: false,
      textAlign: 'center',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Top
    }),
    new go.Binding('visible', 'loading', h => {
      let show = false;
      if (h) {
        show = true;
      }
      return show;
    })
  )
}
