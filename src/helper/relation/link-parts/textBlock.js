import * as vars from '../vars'
export default function($, go, options) {
    return $(
        go.TextBlock,
        '',
        {
          textAlign: 'center',
          font: '14px helvetica, arial, sans-serif',
          stroke: '#fff',
          scale: vars.defaultTextScale,
          margin: 4,
          maxLines: 3,
          editable: false,
          segmentOffset: new go.Point(0, -40),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding('text', '', L => {
          let txt = '';
          let fromNode = L.fromNode.data;
          let toNode = L.toNode.data;
          if (fromNode.type === '15') {
            txt = fromNode.title + toNode.linkNum[fromNode.key] + '次';
          }
          return txt;
        }).ofObject(),
        new go.Binding('visible', 'showLinkLabels').ofModel()
      );
}