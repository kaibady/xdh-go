# 工具箱

::: tip 提示
XdhGoTool 通常作为开发时的工具使用，组件[XdhGoTool](/api.html?url=/xdh-go/doc/module-xdh-go-tool.html)
:::

## 基础用法

:::demo

```html
<template>
  <div>
    <xdh-go-tool ref="tool" :diagram="diagram"></xdh-go-tool>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      @on-ready="diagramReady"
      height="200px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhGoTool } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoTool
    },
    data() {
      return {
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        };
      },
      layout($, go) {
        return new go.TreeLayout();
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram;
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
          ),
          new go.Binding('location').makeTwoWay(go.Point.stringify)
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go, vm) {
        const a = this.nodeTemplate($, go, 'red', vm);
        const b = this.nodeTemplate($, go, 'blue', vm);
        const c = this.nodeTemplate($, go, 'green', vm);
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      }
    }
  };
</script>
```

:::
