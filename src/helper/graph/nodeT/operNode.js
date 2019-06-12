import dateFormat from '@/utils/date'
import {
  defaultTextScale,
  defaultNodeScale,
  defaultNodeHighColor,
  defaultGrayColor,
  getNodeState
} from './index';
import {genTagging, genLoading} from './nodeTmplMixins'
const iconFontSize = 35;
const msgIconSize = 38
export const defaultOperColor = '#11ba62';
export default function ($, go, options) {
  let msgTips = $(
    go.Panel,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      alignment: new go.Spot(0.85, 0.13),
      visible: false
    },
    $(go.Shape, 'Circle', {
        width: msgIconSize,
        height: msgIconSize,
        fill: 'red',
        strokeWidth: 0
      },
      new go.Binding('visible', '', n => {
        return {normal: true, gray: false, highlight: true}[getNodeState(n)]
      }).ofObject()),
    $(
      go.TextBlock,
      '',
      {
        margin: 3,
        stroke: '#fff',
        scale: 1.5,
        alignment: go.Spot.Center,
        verticalAlignment: new go.Spot(0.5, 0.5)
      },
      new go.Binding('text', '', h => {
        let type = h.data.type;
        let number = 0;
        if (type === '15') {
          number = parseInt(h.data.number);
        } else {
          number = h.linksConnected.count - 1;
        }
        return number > 99 ? '99+' : number.toString();
      }).ofObject(),
      new go.Binding('scale', '', h => {
        let type = h.data.type;
        let number = 0;
        if (type === '15') {
          number = parseInt(h.data.number);
        } else {
          number = h.linksConnected.count - 1;
        }
        return number > 99 ? 1.2 : 1.5;
      }).ofObject(),
      new go.Binding('visible', '', n => {
        return {normal: true, highlight: true, gray: false}[getNodeState(n)]
      }).ofObject()
    ),
    new go.Binding('visible', '', h => {
      let type = h.data.type;
      let number = 0;
      if (type === '15') {
        number = parseInt(h.data.number);
      } else {
        number = h.linksConnected.count - 1;
      }
      let v = false,
        num = parseInt(number);
      if (!isNaN(num) && num !== 0) {
        v = true;
      }
      return v;
    }).ofObject()
  );
  let tagging = genTagging($, go);
  let iconChild2 = $(
    go.TextBlock,
    '',
    {
      font: `${iconFontSize}px "iconfont"`,
      stroke: defaultOperColor,
      wrap: go.TextBlock.OverflowEllipsis,
      editable: false,
      textAlign: 'center',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Top,
      scale: 1.5,
      portId: ''
    },
    new go.Binding('text', 'operIcon'),
    new go.Binding('stroke', '', n => {
      return {normal: defaultOperColor, highlight: defaultNodeHighColor, gray: defaultGrayColor}[getNodeState(n)]
    }).ofObject()
  );
  let loading = genLoading($, go, options);

  let iconCircle = $(
    go.Panel,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      alignment: go.Spot.Bottom,
      portId: '',
      fromSpot: new go.Spot(0.5, 0.5),
      toSpot: new go.Spot(0.5, 0.5)
    },
    iconChild2,
    loading
  );

  // 结果集时间
  let timeTextBlock = $(
    go.TextBlock,
    '',
    {
      margin: new go.Margin(-10, 0, 0, 0),
      stroke: '#fff',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      overflow: go.TextBlock.OverflowEllipsis,
      desiredSize: new go.Size(500, 30),
      textAlign: 'center',
      isMultiline: false
    },
    new go.Binding('text', 'time', h => {
      return h.slice(0, -3);
    }),
    new go.Binding('visible', 'time', h => {
      let show = false;
      if (h !== undefined) {
        show = true;
      }
      return show;
    }),
    new go.Binding('stroke', '', n => {
      return {normal: '#fff', highlight: '#fff', gray: 'rgba(0, 0, 0, 0)'}[getNodeState(n)]
    }).ofObject()
  );
  // 结果集名称
  let typeTextBlock = $(
    go.TextBlock,
    '',
    {
      margin: new go.Margin(-30, 0, 0, 0),
      stroke: '#fff',
      scale: 1.2,
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      overflow: go.TextBlock.OverflowEllipsis,
      desiredSize: new go.Size(150, 40),
      textAlign: 'center',
      isMultiline: false
    },
    new go.Binding('text', 'text'),
    new go.Binding('stroke', '', n => {
      return {normal: '#fff', highlight: '#fff', gray: 'rgba(0, 0, 0, 0)'}[getNodeState(n)]
    }).ofObject()
  );
  // 文字panel
  let textPanel = $(
    go.Panel,
    go.Panel.Vertical,
    {
      margin: new go.Margin(-10, 0, 0, 0),
      alignment: new go.Spot(0.5, 0.5),
      width: 200,
      scale: defaultTextScale
    },
    typeTextBlock,
    timeTextBlock
  );
  return $(
    go.Node,
    'Vertical',
    {
      background: 'rgba(0, 0, 0, 0)',
      cursor: 'pointer',
      width: 200,
      scale: defaultNodeScale,
      selectionAdorned: false,
      contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      click: options.click,
      doubleClick: options.doubleClick
    },
    $(
      go.Panel,
      go.Panel.Vertical,
      {
        background: 'rgba(0, 0, 0, 0)'
      },
      $(go.Panel, 'Spot', iconCircle, msgTips, tagging),
      textPanel
    ),
    new go.Binding('visible', '', h => {
      let type = h.data.type;
      let number = 0;
      if (type === '15') {
        number = parseInt(h.data.number);
      } else {
        number = h.linksConnected.count - 1;
      }
      let v = false,
        num = parseInt(number);
      if (!isNaN(num) && num !== 0) {
        v = true;
      } else if(h.data.newAdded) {
        v = true;
      }
      return v;
    }).ofObject(),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}
let nodeTypeMap = {
  '09': {
    name: '高危分析',
    key: 'gwfxid',
    baseData: {
      imgPath: null,
      nodeCode: 'gwfx_',
      number: 0,
      parentCode: 'gwfx',
      sfgz: null,
      sfky: null,
      title: '高危分析',
      type: '09',
      time: ''
    }
  }
}

export function getCollectData(options) {
  let _options = Object.assign({}, options);
  let nodeObj = nodeTypeMap[_options.type];
  nodeObj.baseData.nodeCode = nodeObj.baseData.nodeCode + Math.floor(Math.random() * 10000)
  let nodeData = Object.assign({}, nodeObj.baseData, {
    time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    ywid: _options[nodeObj.key],
    nodeCode: nodeObj.baseData.nodeCode
  })
  return nodeData
}

