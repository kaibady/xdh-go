import VirtualizedForceDirectedLayout, {
  handlerVirtualForce
} from './VirtualizedForceDirectedLayout'
import VirtualizedTreeLayout, {
  handlerVirtualTree
} from './VirtualizedTreeLayout'
// 公共布局配置

let commonOption = {}

// 网格布局
function getGridLayout($, go, options = {}) {
  // 此处包括不可见的节点，如有需要可只计算可见节点
  let param = Object.assign(
    {},
    commonOption,
    {
      wrappingColumn: 10,
      sorting: go.GridLayout.Forward,
      spacing: new go.Size(50, 50)
    },
    options
  )
  return $(go.GridLayout, param)
}

// 分层布局
function getLayeredDigraphLayout($, go, options = {}) {
  let param = Object.assign(
    {},
    commonOption,
    {
      layerSpacing: 80,
      columnSpacing: 30,
      layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
    },
    options
  )
  return $(go.LayeredDigraphLayout, param)
}

// 圆形布局
function getCircularLayout($, go, options = {}) {
  let param = Object.assign(
    {},
    commonOption,
    {
      arrangement: go.CircularLayout.Packed,
      spacing: 10
    },
    options
  )
  return $(go.CircularLayout, param)
}

// 力牵引布局
function getForceDirectedLayout($, go, options = {}) {
  let param = Object.assign(
    {},
    commonOption,
    {
      arrangementSpacing: new go.Size(100, 100),
      defaultElectricalCharge: 50,
      defaultSpringLength: 10,
      defaultSpringStiffness: 0.01
    },
    options
  )
  return $(go.ForceDirectedLayout, param)
}

// 树形布局
function getTreeLayout($, go, options = {}) {
  let param = Object.assign({}, commonOption, options)
  return $(go.TreeLayout, param)
}

// 虚拟节点力布局
function getVirtualizedForceDirectedLayout($, go, options = {}) {
  if (!go.VirtualizedForceDirectedLayout) {
    go.VirtualizedForceDirectedLayout = VirtualizedForceDirectedLayout(go)
  }
  return $(go.VirtualizedForceDirectedLayout, options)
}

// 虚拟节点树布局
function getVirtualizedTreeLayout($, go, options = {}) {
  if (!go.VirtualizedTreeLayout) {
    go.VirtualizedTreeLayout = VirtualizedTreeLayout(go)
  }
  return $(go.VirtualizedTreeLayout, options)
}

export default {
  GridLayout: getGridLayout,
  CircularLayout: getCircularLayout,
  LayeredDigraphLayout: getLayeredDigraphLayout,
  ForceDirectedLayout: getForceDirectedLayout,
  TreeLayout: getTreeLayout,
  VirtualizedForceDirectedLayout: getVirtualizedForceDirectedLayout,
  handlerVirtualForce,
  VirtualizedTreeLayout: getVirtualizedTreeLayout,
  handlerVirtualTree
}
