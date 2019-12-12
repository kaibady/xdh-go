# Select 选择组件

::: tip 提示
XdhGoSelect 用于选择节点, 文档[XdhGoSelect](/api.html?url=/xdh-go/doc/module-xdh-go-select.html)
:::

## 选择操作

> 框选：1. 画布空白处长按鼠标，开始框选，同时按住 ctrl 键可框选多处；2.点击菜单框选选项，开始框选，同时按住 ctrl 键可框选多处，按 esc 键退出框选。

> 多选: 1.按住 ctrl，同时选择对象。2.点击菜单“多选”选项，开始多选，按 esc 键退出多选。

> 全选: 1. ctrl+A 全选。2.点击菜单“全选”选项。

> 反选: 点击菜单“反选”选项。

> 选中子节点：选中一个或多个节点，点击菜单“选中子节点”选项。

> 取消选择: 点击画布空白处，取消所有选择。

## 基础用法

:::demo

```html
<template>
  <div style="position:relative">
    <xdh-go-select
      :diagram-name="'dig1'"
      ref="select"
      custom-class="my-select"
    ></xdh-go-select>
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
  import { XdhGo, XdhGoSelect } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoSelect
    },
    props: {},
    data() {
      return {
        model: 'GraphLinksModel',
        diagram: null,
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
          }),
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
