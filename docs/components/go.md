# XdhGo 组件

::: tip 提示
XdhGo 为主组件， 其它的组件都依赖于它，组件[XdhGo](/api.html?url=/xdh-go/doc/module-xdh-go.html)
:::

## 基础用法

基础用法需要设置模板方法,包括
node-template 或 node-template-map,
link-tempalte 或 linke-template-map,
group-tempalte 或 group-template-map,
常用参数还有 width,height(默认 100%), layout(默认布局), config(diagram 配置),参数的默认值参考 XdhGo 文档

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
  ></xdh-go>
</template>
<script>
  import { XdhGo } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
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
          initialContentAlignment: go.Spot.Center
        };
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Horizontal',
          { background: color },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go) {
        const a = this.nodeTemplate($, go, 'red');
        const b = this.nodeTemplate($, go, 'blue');
        const c = this.nodeTemplate($, go, 'green');
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
```

:::

## 组件事件

是指 xhd-go 通过\$emit 方法抛出的时间，其中 on-ready 事件在图渲染完毕后执行一次, on-load-data 会在每次 nodes 和 links 数据发生变化后调用
:::demo

```html
<template>
  <div>
    <el-button type="primary" @click="show">显示图形</el-button>
    <el-button type="primary" @click="addNode">添加节点</el-button>
    <xdh-go
      v-if="showGraph"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      height="300px"
      @on-ready="onReady"
      @on-load-data="onLoadData"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        showGraph: false,
        model: 'GraphLinksModel',
        nodes: [{ key: 'A', category: 'a' }, { key: 'B', category: 'b' }],
        links: [{ from: 'A', to: 'B' }]
      };
    },
    methods: {
      show() {
        this.showGraph = true;
      },
      onReady() {
        this.$message({ type: 'info', message: '图形已渲染完成' });
      },
      onLoadData() {
        this.$message({ type: 'info', message: '添加了节点' });
      },
      addNode() {
        this.nodes.push({
          key:
            ['A', 'B', 'C'][Math.floor(Math.random() * 3)] +
            Math.floor(Math.random() * 1000),
          category: ['a', 'b', 'c'][Math.floor(Math.random() * 3)]
        });
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Horizontal',
          { background: color },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go) {
        const a = this.nodeTemplate($, go, 'red');
        const b = this.nodeTemplate($, go, 'blue');
        const c = this.nodeTemplate($, go, 'green');
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
```

:::

## diagram 事件

diagram 事件是通过 xdh-go 的 events 参数对象传入的。示例：选择节点或者点击图形背景

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :events="diagramEvents"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      height="200px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [{ key: 'A', category: 'a' }, { key: 'B', category: 'b' }],
        links: [{ from: 'A', to: 'B' }],
        diagramEvents: {
          BackgroundSingleClicked: obj => {
            this.$message({
              type: 'info',
              message: '点击了背景'
            });
          },
          ChangedSelection: obj => {
            let keys = [];
            obj.subject.each(N => {
              keys.push(N.key);
            });
            this.$message({
              type: 'info',
              message: '选择了节点' + keys.join(',')
            });
          }
        }
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      nodeTemplate($, go, color) {
        return $(
          go.Node,
          'Horizontal',
          { background: color },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go) {
        const a = this.nodeTemplate($, go, 'red');
        const b = this.nodeTemplate($, go, 'blue');
        const c = this.nodeTemplate($, go, 'green');
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
```

:::
