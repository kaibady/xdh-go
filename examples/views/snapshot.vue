<template>
  <example>
   <div>默认按钮</div>
    <xdh-go-snapshot :diagram="diagram" @on-snap="getImage"></xdh-go-snapshot>
    <div>使用自定义按钮</div>
    <xdh-go-snapshot :diagram="diagram" @on-snap="getImage">
      <template slot-scope="{makeImageData}">
        <el-button circle size="mini" type="primary" icon="el-icon-camera-solid" @click="makeImageData"></el-button>
      </template>
    </xdh-go-snapshot>
    <xdh-go
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
  </example>
</template>
<script>
import nodeMixin from './nodeMixin'
export default {
  mixins: [nodeMixin],
  data() {
    return {
      diagram: null,
      imageType: '',
      currImg: null,
      imageObjectType: ''
    }
  },
  methods: {
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
    diagramReady(diagram, $, go) {
      this.diagram = diagram
    },
    nodeTemplate(
      $,
      go,
      color,
      {
        htmlInfo: { tool1 }
      }
    ) {
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