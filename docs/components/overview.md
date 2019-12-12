# Overview 鹰眼

::: tip 提示
XdhGoOverview 使用时作为 XdhGo 的内部组件，会自动与内部的 diagram 对象关联，组件[XdhGoOverview](/api.html?url=/xdh-go/doc/module-xdh-go-overview.html)
:::

## 基础用法

overview 默认定位到左上角
:::demo

```html
<template>
  <xdh-go
    :diagram-name="'dig1'"
    :nodes="nodes"
    :links="links"
    :type="model"
    :node-template-map="nodeTemplateMap"
    :link-template="linkTemplate"
    :config="config"
    :layout="layout"
    height="200px"
  >
    <xdh-go-overview
      :div-style="{width: '120px', height: '120px'}"
    ></xdh-go-overview>
  </xdh-go>
</template>
<script>
  import { XdhGo, XdhGoOverview } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoOverview
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' }
        ]
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        }
      },
      layout($, go) {
        return new go.TreeLayout()
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Auto',
          { background: color },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        )
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
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
      }
    }
  }
</script>
```

:::

## 样式

通过 div-style 参数，可以定义鹰眼的 div 容器样式。默认的 style 为

```
{
position: 'absolute',
width: '150px',
height: '150px',
border: '2px solid #75a3fa',
'z-index': 9999,
'background-color': 'rgba(100,100,100,0.4)'
}
```

:::demo

```html
<template>
  <xdh-go
    :nodes="nodes"
    :links="links"
    :type="model"
    :node-template-map="nodeTemplateMap"
    :link-template="linkTemplate"
    :config="config"
    :layout="layout"
    height="200px"
  >
    <xdh-go-overview :div-style="divStyle"></xdh-go-overview>
  </xdh-go>
</template>
<script>
  import { XdhGo, XdhGoOverview } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoOverview
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' }
        ],
        divStyle: {
          width: '100px',
          height: '150px',
          right: '10px',
          bottom: '10px',
          border: '2px solid #ff9900',
          'background-color': 'rgba(255,100,100,0.3)',
          'box-shadow': '0px 0px 4px rgba(0,0,0,0.4)'
        }
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        }
      },
      layout($, go) {
        return new go.TreeLayout()
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Auto',
          { background: color },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        )
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
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
      }
    }
  }
</script>
```

:::
