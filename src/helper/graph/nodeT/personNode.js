import nodeIcon from './nodeIcon';
import {GET_PERSON_PHOTO} from '@/base/api/single-graph';
import {
  defaultTextScale,
  defaultNodeScale,
  defaultNodeHighColor,
  defaultGrayColor,
  getNodeState, nodeTextShow
} from './index';
import {genDoubtTips, genTagging, genLoading, makeLinkPort} from './nodeTmplMixins'

let iconSize = 35;
// let testSource = 'http://10.124.7.27:8080/ryda/xsryzp/341124200201013812'
export const defaultPersonColor = '#0099ff';

let photoRadial = 80
export default function ($, go, options) {
  let loading = genLoading($, go, options)
  let msgTips = genDoubtTips($, go, options)
  let tagging = genTagging($, go);
  let linkPort = makeLinkPort($, go)
  let personMask = $(go.Panel, 'Spot', {
      name: 'MASK',
      isClipping: true,
      scale: 1,
      background: 'transparent'
    }, $(go.Shape, 'Circle', {
      width: photoRadial,
      height: photoRadial,
      fill: 'rgba(0, 0, 0, 0.8)',
      stroke: 'transparent'
    }),
    $(go.Shape, 'Circle', {
      width: photoRadial,
      height: photoRadial,
      fill: 'rgba(100, 100, 100, 0.8)',
      stroke: 'transparent'
    }),
    new go.Binding('visible', '', n => {
      return {normal: false, gray: true, highlight: false}[getNodeState(n)] && n.data.source !== ''
    }).ofObject()
  );
  let personSelectCircle = $(go.Shape, 'Circle', {
      width: photoRadial,
      height: photoRadial,
      fill: 'transparent',
      stroke: 'rgba(0,0,0,0)',
      strokeWidth: 10
    },
    new go.Binding('stroke', '', n => {
      return n.isSelected ? 'yellow' : 'rgba(0,0,0,0)';
    }).ofObject(),
    new go.Binding('visible', 'source', h => {
      let show = false;
      if (h !== '') {
        show = true;
      }
      return show;
    })
  )
  let personPhoto = $(go.Panel, 'Spot', {
      name: 'ICON',
      isClipping: true,
      scale: 1
    },
    $(go.Shape, 'Circle', {
      width: photoRadial,
      height: photoRadial,
      fill: 'transparent',
      stroke: '#ffc000',
      strokeWidth: 1,
      portId: 'picture'
    }),
    $(go.Picture, {
      name: 'Picture',
      sourceCrossOrigin: function () {
        return 'use-credentials';
      },
      // errorFunction: (data, e) => {
      //   data.source = ''
      // },
      width: photoRadial,
      height: photoRadial * 1.1
    }, new go.Binding('source', 'source')),
    new go.Binding('visible', 'source', h => {
      let show = false;
      if (h !== '') {
        show = true;
      }
      return show;
    })
    )
  ;

  let iconShape = $(
    go.TextBlock,
    nodeIcon['person'],
    {
      font: `${iconSize}px "iconfont"`,
      stroke: defaultPersonColor,
      wrap: go.TextBlock.OverflowEllipsis,
      editable: false,
      textAlign: 'center',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Top,
      portId: '',
      scale: 1.5
    },
    new go.Binding('stroke', '', n => {
      return {normal: defaultPersonColor, highlight: defaultNodeHighColor, gray: defaultGrayColor}[getNodeState(n)]
    }).ofObject()
  );
  let textBlock = $(
    go.TextBlock,
    'Default Text',
    {
      margin: new go.Margin(0, 0, 0, 0),
      stroke: '#fff',
      alignment: go.Spot.Center,
      verticalAlignment: go.Spot.Bottom,
      visible: true,
      scale: defaultTextScale
    },
    new go.Binding('text', 'text'),
    new go.Binding('stroke', '', n => {
      return nodeTextShow(n);
    }).ofObject()
  );
  let verPanel = $(
    go.Panel,
    go.Panel.Vertical,
    {background: 'rgba(0, 0, 0, 0)', alignment: go.Spot.Center},
    $(go.Panel, 'Spot', msgTips, iconShape,
      personSelectCircle, personPhoto, personMask, msgTips, tagging, loading, linkPort),
    textBlock
  );

  let circlePanel = $(go.Panel, 'Spot', verPanel);

  return $(
    go.Node,
    'Spot',
    {
      background: 'rgba(0, 0, 0, 0)',
      cursor: 'pointer',
      scale: defaultNodeScale,
      zOrder: 9999,
      // layoutConditions: go.LayoutNone,
      selectionAdorned: false,
      contextMenu: options.contextMenu,
      mouseEnter: options.mouseEnter,
      mouseLeave: options.mouseLeave,
      click: options.click,
      doubleClick: options.doubleClick
    },
    circlePanel,
    new go.Binding('zOrder', 'gray', h => {
      return h ? 1 : 9999
    }),
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
  );
}


export function getBase64Image(img) {
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var dataURL = canvas.toDataURL('image/jpg');
  return dataURL
}

export function loadPersonPhoto(vm, node) {
  let url = GET_PERSON_PHOTO.replace(':id', node.data.key);
  let model = vm.$refs.go.diagram.model;
  let img = new Image();
  img.crossOrigin = 'use-credentials';
  img.src = url;
  img.onload = function () {
    // let img64 = getBase64Image(img);
    model.setDataProperty(node.data, 'source', url)
  }
  img.onerror = function () {
    console.log(url)
    model.setDataProperty(node.data, 'source', '')
  }
}
