# Layout 布局

::: tip 提示
XdhGoLayout 布局工具条，文档[XdhGoLayout](/api.html?url=/xdh-go/doc/module-xdh-go-layout.html)
:::

## 基础用法

组件提供了 gojs 的五种基本布局
:::demo

```html
<template>
  <!-- 布局 -->
  <div style="position:relative">
    <xdh-go-layout
      :diagram-name="'dig1'"
      :lock.sync="lock"
      ref="layout"
      custom-class="my-layout"
    ></xdh-go-layout>
    <el-button size="mini" type="primary" @click="addNode()"
      >添加节点</el-button
    >
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
      height="600px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhGoLayout, dataUtils } from 'xdh-go';
  let { diagramManager } = dataUtils
  export default {
    components: {
      XdhGo,
      XdhGoLayout
    },
    props: {},
    data() {
      return {
        diagram: null,
        lock: false,
        model: 'GraphLinksModel',
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
      };
    },
    computed: {},
    methods: {
      addNode() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          let key =
            ['A', 'B', 'C'][Math.floor(Math.random() * 1000) % 3] +
            Math.floor(Math.random() * 1000);
          let node = {
            key: key,
            category: ['a', 'b', 'c'][Math.floor(Math.random() * 1000) % 3]
          };
          let length = diagramManager['dig1'].nodes.count;
          let index = Math.floor(Math.random() * (length - 2));
          let randomNodeKey = diagramManager['dig1'].model.nodeDataArray[index].key;
          let link = {
            from: randomNodeKey,
            to: key
          };
          this.$refs.diagram.addNode(node);
          this.$refs.diagram.addLink(link);
          if (this.lock) {
            this.$refs.layout.layoutAfterAdd([node], [link]);
          }
        }, 300);
      },
      diagramReady(diagram, $, go) {
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom
        };
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
        );
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
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {});
      }
    },
    created() {}
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .my-layout {
    position: absolute;
    left: 10px;
    top: 30px;
  }
</style>
```

:::
