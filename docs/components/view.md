# View 视图

::: tip 提示
XdhGoView 提供了对节点的显示及隐藏功能，以及图形的缩放功能[XdhGoView](/api.html?url=/xdh-go/doc/module-xdh-go-view.html)
:::

## 基础用法

显示关系 label/隐藏关系 label 会在 model.modelData 设置 showLinkLabels 变量;
显示关系连线/隐藏关系连线 会在 model.modelData 设置 showLinks 变量：
它们须在连线模板中绑定
:::demo

```html
<template>
  <div style="position:relative">
    <xdh-go-view
      :diagram="diagram"
      custom-class="my-view"
      ref="view"
    ></xdh-go-view>
    <xdh-go
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
  import { XdhGo, XdhGoView } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoView
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
      };
    },
    computed: {},
    methods: {
      diagramReady(diagram, $, go) {
        this.diagram = diagram;
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
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
  .my-view {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10000;
  }
</style>
```

:::

## 定制菜单

如果需要改变菜单的位置，需要使用 menus 重新配置菜单。
如果要添加默认菜单中没有的菜单项，或者要改变菜单的点击行为，可以通过 handlers 参数传入方法
默认的菜单配置为

```
[
  { name: '显示照片', icon: 'iconfont icon-image', visible: false },
  {
    name: '隐藏',
    icon: 'iconfont icon-magic',
    subMenu: [
      { name: '隐藏节点' },
      { name: '隐藏子节点' },
      { name: '隐藏关系label' },
      { name: '隐藏关系连线' }
    ]
  },
  {
    name: '显示',
    icon: 'iconfont icon-enlarge',
    subMenu: [
      { name: '显示子节点' },
      { name: '显示关系label' },
      { name: '显示关系连线' }
    ]
  },
  { name: '查看全部', icon: 'iconfont icon-bullseye' },
  {
    name: '缩小',
    icon: 'iconfont icon-zoomout'
  },
  {
    name: '放大',
    icon: 'iconfont icon-enlarge'
  }
]
```

:::demo

```html
<template>
  <div style="position:relative">
    <xdh-go-view
      :diagram="diagram"
      custom-class="my-view"
      :menus="customMenu"
      :handlers="menuHandler"
      ref="view"
    ></xdh-go-view>
    <xdh-go
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
  import { XdhGo, XdhGoView } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoView
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
        timeout: null,
        customMenu: [
          {
            name: '放大',
            icon: 'iconfont icon-enlarge'
          },
          {
            name: '缩小',
            icon: 'iconfont icon-zoomout'
          },
          { name: '查看全部', icon: 'iconfont icon-bullseye' },
          {
            name: '自定义按钮1',
            icon: 'el-icon-s-tools'
          }
        ],
        menuHandler: {
          自定义按钮1: (diagram, $, go, item) => {
            this.customHandler1(diagram, $, go, item);
          }
        }
      };
    },
    computed: {},
    methods: {
      customHandler1(diagram, $, go, item) {
        this.$message({
          type: 'info',
          message: `点击了${item.name}, 当前节点数据${JSON.stringify(
            diagram.model.nodeDataArray
          )}`
        });
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram;
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
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
  .my-view {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10000;
  }
</style>
```

:::
