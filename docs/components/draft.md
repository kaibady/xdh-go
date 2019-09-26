# Draft 草稿箱

::: tip 提示
XdhGoDraft 草稿箱组件，组件[XdhGoDraft](/api.html?url=/xdh-go/doc/module-xdh-go-draft.html)
:::

## 基础用法

:::demo

```html
<template>
  <div>
    <el-button type="primary" @click="openDraft">打开草稿箱</el-button>
    <xdh-go-draft
      ref="draft"
      :visible.sync="draftShow"
      :diagram="diagram"
    ></xdh-go-draft>
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
  import { XdhGo, XdhGoDraft } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoDraft
    },
    data() {
      return {
        diagram: null,
        draftShow: false,
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
      openDraft() {
        this.draftShow = true;
      },
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
          new go.Binding('location').makeTwoWay()
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
