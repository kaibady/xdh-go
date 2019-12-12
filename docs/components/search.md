# Search 搜索组件

::: tip 提示
XdhGoSearch 提供了对节点的模糊搜索功能，多次按回车可以连续搜索[XdhGoSearch](/api.html?url=/xdh-go/doc/module-xdh-go-search.html)
:::

## 基础用法

:::demo

```html
<template>
  <!-- 视图 -->
  <div>
    <xdh-go-search
      :diagram-name="'dig1'"
      pull-center
      ref="search"
      custom-class="my-search"
    ></xdh-go-search>
    <el-row>
      <el-col :span="8" :offset="12">
        <el-input v-model="addName" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="addNode"
            >添加节点测试</el-button
          >
        </el-input>
      </el-col>
    </el-row>
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
      height="500px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhGoSearch, dataUtils } from 'xdh-go'
  let { diagramManager } = dataUtils

  export default {
    components: {
      XdhGo,
      XdhGoSearch
    },
    props: {},
    data() {
      return {
        model: 'GraphLinksModel',
        addName: '',
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
      addNode() {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          let key =
            this.addName +
            ['A', 'B', 'C'][Math.floor(Math.random() * 1000) % 3] +
            Math.floor(Math.random() * 1000)
          let node = {
            key: key,
            category: ['a', 'b', 'c'][Math.floor(Math.random() * 1000) % 3]
          }
          let length = diagramManager['dig1'].nodes.count
          let index = Math.floor(Math.random() * (length - 2))
          let randomNodeKey = diagramManager['dig1'].model.nodeDataArray[index].key
          let link = {
            from: randomNodeKey,
            to: key
          }
          this.$refs.diagram.addNode(node)
          this.$refs.diagram.addLink(link)
        }, 300)
      },
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
  .my-search {
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 10000;
  }
</style>
```

:::

## 指定搜索字段和搜索对象

mode 可以定义搜索节点，连线，或者两者都搜索； 而 node-keys 和 link-keys 可以分别定义 对节点或连线数据的哪几个字段进行搜索
搜索后的结果会在弹出框中显示出来。示例：分别搜索 a,b,c,d,e,f,mike,kate,jack,sam,jason,may
:::demo

```html
<template>
  <!-- 视图 -->
  <div>
    <xdh-go-search
      :diagram-name="'dig2'"
      pull-center
      ref="search"
      custom-class="my-search"
      mode="link,node"
      :node-keys="['key', 'remark.name']"
      :link-keys="['key', 'info.tag']"
      :popDuration="6000"
    >
      <div slot="popover" slot-scope="{searchResult, keyword}">
        <div>关键字:{{keyword}}</div>
        <div>结果:{{searchResult.hit}}</div>
      </div>
    </xdh-go-search>
    <el-row>
      <el-col :span="8" :offset="12">
        <el-input v-model="addName" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="addNode"
            >添加节点测试</el-button
          >
        </el-input>
      </el-col>
    </el-row>
    <xdh-go
      :diagram-name="'dig2'"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      @on-ready="diagramReady"
      height="500px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhGoSearch } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoSearch
    },
    props: {},
    data() {
      return {
        model: 'GraphLinksModel',
        addName: '',
        diagram: null,
        lock: false,
        nodes: [
          { key: 'A', category: 'a', remark: { name: 'mike' } },
          { key: 'B', category: 'b', remark: { name: 'jack' } },
          { key: 'C', category: 'c', remark: { name: 'kate' } },
          { key: 'D', category: 'a', remark: { name: 'jason' } },
          { key: 'E', category: 'b', remark: { name: 'sam' } },
          { key: 'F', category: 'c', remark: { name: 'may' } }
        ],
        links: [
          { from: 'A', to: 'B', info: { tag: 'mike to jack' } },
          { from: 'A', to: 'C', info: { tag: 'mike to kate' } },
          { from: 'C', to: 'D', info: { tag: 'kate to json' } },
          { from: 'B', to: 'E', info: { tag: 'jack to sam' } },
          { from: 'E', to: 'F', info: { tag: 'sam to may' } }
        ],
        timeout: null
      }
    },
    computed: {},
    methods: {
      addNode() {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          let key =
            this.addName +
            ['A', 'B', 'C'][Math.floor(Math.random() * 1000) % 3] +
            Math.floor(Math.random() * 1000)
          let node = {
            key: key,
            category: ['a', 'b', 'c'][Math.floor(Math.random() * 1000) % 3]
          }
          let length = diagramManager['dig2'].nodes.count
          let index = Math.floor(Math.random() * (length - 2))
          let randomNodeKey = diagramManager['dig2'].model.nodeDataArray[index].key
          let link = {
            from: randomNodeKey,
            to: key
          }
          this.$refs.diagram.addNode(node)
          this.$refs.diagram.addLink(link)
        }, 300)
      },
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
  .my-search {
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 10000;
  }
</style>
```

:::
