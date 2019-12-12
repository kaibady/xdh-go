# Snapshot 快照

::: tip 提示
快照组件提供生成图片格式和 svg 格式快照，组件[XdhGoOverview](/api.html?url=/xdh-go/doc/module-xdh-go-overview.html)
:::

## 基础用法

使用 el-button 默认按钮,可以通过/deep/ 改变按钮样式。组件提供 image(图片),imageData(图片 base64),svg(svg 元素)三种快照格式，可以通过 layout 参数设置按钮的显隐和顺序
:::demo

```html
<template>
  <div>
    <div>
      默认显示三种按钮
    </div>
    <xdh-go-snapshot :diagram-name="'dig1'" @on-snap="getImage"></xdh-go-snapshot>
    <div>
      可以通过layout控制显示按钮
    </div>
    <xdh-go-snapshot
      :diagram-name="'dig1'"
      @on-snap="getImage"
      layout="svg,image"
    ></xdh-go-snapshot>
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
      @on-ready="diagramReady"
    ></xdh-go>
    <div>{{imageType}}{{imageObjectType}}</div>
    <img :src="currImg" v-show="imageType !== 'svg'" />
    <div id="imageConainer" v-show="imageType === 'svg'"></div>
  </div>
</template>
<script>
  import { XdhGo, XdhGoSnapshot } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoSnapshot
    },
    data() {
      return {
        diagram: null,
        imageType: '',
        currImg: null,
        imageObjectType: '',
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
      getImage(type, data) {
        this.imageType = type
        this.imageObjectType = `(${
          this.imageType !== 'imageData'
            ? data.toString()
            : data.toString().substr(0, 50) + '...'
        })`
        if (type === 'image') {
          this.currImg = data.src
        } else if (type === 'imageData') {
          this.currImg = data
        } else if (type === 'svg') {
          document.getElementById('imageConainer').innerHTML = ''
          document.getElementById('imageConainer').appendChild(data)
        }
      },
      diagramReady(diagram, $, go) {},
      nodeTemplate($, go, color, { htmlInfo: { tool1 } }) {
        return $(
          go.Node,
          'Auto',
          { background: color, toolTip: tool1 },
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

## 使用插槽

使用插槽自定义样式，通过 插槽提供的 makeImage/makeImageData/makeSvg 方法获得快照数据
:::demo

```html
<template>
  <div>
    <xdh-go-snapshot :diagram-name="'dig2'" @on-snap="getImage">
      <template slot-scope="{makeImageData,makeImage,makeSvg}">
        <el-button
          circle
          size="mini"
          type="primary"
          icon="el-icon-camera-solid"
          @click="makeImageData"
        ></el-button>
        <el-button
          circle
          size="mini"
          type="primary"
          icon="el-icon-picture"
          @click="makeImage"
        ></el-button>
        <el-button
          circle
          size="mini"
          type="primary"
          icon="el-icon-s-data"
          @click="makeSvg"
        ></el-button>
      </template>
    </xdh-go-snapshot>
    <xdh-go
      :diagram-name="'dig2'"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      height="200px"
      @on-ready="diagramReady"
    ></xdh-go>
    <div>{{imageType}}{{imageObjectType}}</div>
    <img :src="currImg" v-show="imageType !== 'svg'" />
    <div id="imageConainer1" v-show="imageType === 'svg'"></div>
  </div>
</template>
<script>
  import { XdhGo, XdhGoSnapshot } from 'xdh-go'
  export default {
    components: {
      XdhGo,
      XdhGoSnapshot
    },
    data() {
      return {
        imageType: '',
        currImg: null,
        imageObjectType: '',
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
      getImage(type, data) {
        this.imageType = type
        console.log(type)
        this.imageObjectType = `(${
          this.imageType !== 'imageData'
            ? data.toString()
            : data.toString().substr(0, 50) + '...'
        })`
        if (type === 'image') {
          this.currImg = data.src
        } else if (type === 'imageData') {
          this.currImg = data
        } else if (type === 'svg') {
          document.getElementById('imageConainer1').innerHTML = ''
          document.getElementById('imageConainer1').appendChild(data)
        }
      },
      diagramReady(diagram, $, go) {},
      nodeTemplate($, go, color, { htmlInfo: { tool1 } }) {
        return $(
          go.Node,
          'Auto',
          { background: color, toolTip: tool1 },
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
