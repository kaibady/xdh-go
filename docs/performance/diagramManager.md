# diagramManager

## 说明

如果将 diagram 绑定到 vue 组件的变量中，会影响节点的渲染性能。因此 xdh-go 内置了一个 diagramManager 全局对象，xdh-go 组件在使用时传入 diagram-name 参数，生成 diagram 对象后保存到 diagramManager 中，在使用时通过 diagramManager[diagram-name]引用。当 xdh-go 组件注销时，相应的 diagram 对象也会被释放。注意在同一个页面不能同时存在相同名称的 diagram

## 使用示例

:::demo

```html
<template>
  <div style="position:relative">
    <!--如果组件中用到diagram对象，需要定义一个对应的diagram-name参数-->
    <!--如果组件在初次渲染时就要对diagram进行操作，此时xdh-go的diagram对象可能还未生成，您需要一个变量控制组件的渲染时机-->
    <xdh-go-select
      v-if="diagramIsReady"
      :diagram-name="'dig1'"
      ref="select"
      custom-class="my-select"
    ></xdh-go-select>
    <el-button type="primary" style="margin: 40px 150px;" @click="posCenter">定位节点A</el-button>
    <xdh-go
      :diagram-name="'dig1'"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      @on-ready="diagramReady"
      height="400px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhGoSelect, dataUtils } from 'xdh-go'
  let { diagramManager, DataManager } = dataUtils
  let dataManager
  export default {
    components: {
      XdhGo,
      XdhGoSelect
    },
    props: {},
    data() {
      return {
        diagramIsReady: false,
        model: 'GraphLinksModel',
        lock: false,
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' },
          { key: 'D', category: 'a' },
          { key: 'E', category: 'b' },
          { key: 'F', category: 'c' }
        ],
        links: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'C', to: 'D' },
          { from: 'B', to: 'E' },
          { from: 'E', to: 'F' }
        ],
        timeout: null
      }
    },
    computed: {},
    methods: {
      diagramReady(diagram, $, go) {
        this.diagramIsReady = true
        dataManager = new DataManager(diagram, go)
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom
        }
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Auto',
          $(go.Shape, 'Rectangle', {
            portId: '',
            stroke: color,
            fill: color
          },
          new go.Binding('stroke', 'color'),
          new go.Binding('fill', 'color')
          ),
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          ),
          new go.Binding('location').makeTwoWay(go.Point.stringify)
        )
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { curve: go.Link.Bezier },
          $(go.Shape, {
            strokeWidth: 3,
            stroke: '#555'
          }),
          $(go.Shape, {
            toArrow: 'Standard'
          })
        )
      },
      nodeTemplateMap($, go, vm) {
        const a = this.nodeTemplate($, go, 'red', vm)
        const b = this.nodeTemplate($, go, 'blue', vm)
        const c = this.nodeTemplate($, go, 'green', vm)
        const map = new go.Map()
        map.add('a', a)
        map.add('b', b)
        map.add('c', c)
        return map
      },
      posCenter() {
        let node = dataManager.getNode('A', true)
        let rect = node.actualBounds
        let diagram =  diagramManager['dig1']
        let model = diagram.model
        diagram.centerRect(rect)
        let randomColor = `hsla(${Math.floor(Math.random() * 360)}, 60%, 50%, 1)`
        model.set(node.data, 'color', randomColor)
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {})
      }
    },
    created() {}
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .my-select {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10000;
  }
</style>
```

:::
