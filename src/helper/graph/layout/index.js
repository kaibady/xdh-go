// 公共布局配置
let commonOption = {}

// 网格布局
function getGridLayout($, go, vm, options = {}) {
  // 此处包括不可见的节点，如有需要可只计算可见节点
  let nodeLength = vm.getModel().nodeDataArray.length;
  let num = Math.floor(Math.sqrt(nodeLength)) + 1
  let param = Object.assign({}, commonOption, {
    wrappingColumn: num,
    sorting: go.GridLayout.Forward,
    spacing: new go.Size(50, 50)
  }, options)
  return $(go.GridLayout, param)
}

// 分层布局
function getLayeredDigraphLayout($, go, vm, options = {}) {
  let param = Object.assign({}, commonOption, {
    direction: 90,
    layerSpacing: 80,
    columnSpacing: 30,
    setsPortSpots: false,
    layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
  }, options)
  return $(go.LayeredDigraphLayout, param)
}

// 圆形布局
function getCircularLayout($, go, vm, options = {}) {
  let param = Object.assign({}, commonOption, {
    arrangement: go.CircularLayout.Packed,
    spacing: 1
  }, options)
  return $(go.CircularLayout, param);
}

// 力牵引布局
function getForceDirectedLayout($, go, vm, options = {}) {
  let param = Object.assign({}, commonOption, {
    arrangementSpacing: new go.Size(100, 100),
    defaultElectricalCharge: 50,
    defaultSpringLength: 10,
    defaultSpringStiffness: 0.01
  }, options)
  return $(go.ForceDirectedLayout, param);
}

// 树形布局
function getTreeLayout($, go, vm, options = {}) {
  let param = Object.assign({}, commonOption, {
    setsPortSpot: false,
    setsChildPortSpot: false
  }, options)
  return $(go.TreeLayout, param)
}

export default {
  GridLayout: getGridLayout,
  CircularLayout: getCircularLayout,
  LayeredDigraphLayout: getLayeredDigraphLayout,
  ForceDirectedLayout: getForceDirectedLayout,
  TreeLayout: getTreeLayout
}

/** 环形布局，因添加节点时不能显示新节点，此布局未应用到图中
 * @param $
 * @param go
 * @param vm
 * @param options
 * @returns {Function}
 */
/**
function commitLayers($, go, vm, options = {}) {
  let diagram = vm.getDiagram();
  return function () {
    let gridlayer = diagram.findLayer('Grid');
    let circles = new go.Set(go.Part);
    gridlayer.parts.each(function (circle) {
      if (circle.name === 'CIRCLE') {
        circles.add(circle)
      }
    })
    circles.each(function (circle) {
      diagram.remove(circle)
    })
    for (let lay = 1; lay < this.maxLayers; lay++) {
      let radius = lay * this.layerThickness;
      let circle = $(go.Part, {name: 'CIRCLE', layerName: 'Grid'}, {
          locationSpot: go.Spot.Center,
          location: this.root.location
        },
        $(go.Shape, 'Circle', {width: radius * 2, height: radius * 2}, {
          fill: 'rgba(0,0,0,0)', stroke: null
        }))
      diagram.add(circle)
    }
  }
}

function getRadialLayout($, go, vm, options = {}) {
  let param = Object.assign({}, commonOption, {
    maxLayers: 10,
    rotateNode: function () {
    },
    commitLayers: commitLayers($, go, vm)
  }, options)
  return $(go.RadialLayout, param)
}
 */
