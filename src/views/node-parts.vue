<template>
  <!-- 预览节点部分 -->
  <div @keyup.enter="changeTestData()">
    <xdh-layout fixed :east="{height: '300px'}">
      <div slot="east">
        <el-input type="textarea" v-model="testNodeStr" :rows="10"></el-input>公共数据
        <el-input type="textarea" v-model="nodeCommonData" :rows="10"></el-input>
      </div>
      <div class="selector">
        <el-button
          @click="changePart(item)"
          v-for="(item, idx) in tags"
          :key="idx"
          :type="currTag === item ? 'primary': 'default'"
        >{{item}}</el-button>
      </div>
      <div class="graph">
        <xdh-go
          v-if="currTag && graphShow"
          style="background-color: #232b45;"
          :nodes="nodes"
          :links="links"
          :type="model"
          :node-template="nodeTemplate"
          :link-template="linkTemplate"
          :config="config"
          :layout="layout"
          @on-ready="diagramReady"
          ref="go"
          height="300px"
        ></xdh-go>
      </div>
    </xdh-layout>
  </div>
</template>
<script>
import XdhLayout from '@/widgets/xdh-layout'
import XdhGo from '@/widgets/xdh-go'
import nodeParts from '@/helper/relation/node-parts'
import nodeCommonData from '@/helper/relation/data/node'
let tags = Object.keys(nodeParts)
let testNodeData = {text: 'mike'};
export default {
  components: {
    XdhLayout,
    XdhGo
  },
  props: {},
  data() {
    return {
      testNodeStr: JSON.stringify(testNodeData),
      nodeCommonData: JSON.stringify(nodeCommonData),
      nodeData: testNodeData,
      nodeParts,
      tags,
      model: 'GraphLinksModel',
      nodes: [],
      links: [],
      currTag: tags[0],
      graphShow: true,
      nodeOptions: {
        default: {
          type: 'car'
        }
      }
    }
  },
  watch: {
    nodeData(val) {
      this.nodes = [Object.assign({}, nodeCommonData, val)]
    }
  },
  computed: {},
  methods: {
    changeTestData() {
      try {
        let str = this.testNodeStr.replace(/[\r\t\s\n]+/g, '')
        str = str.replace(/'/g, '"')
        str = str.replace(/{([\w]+):/g, (match, p1) => {
          return '{"' + p1 + '":'
        })
        str = str.replace(/,([\w]+):/g, (match, p1) => {
          return ',"' + p1 + '":'
        })
        let node = JSON.parse(str || '{}')
        this.nodeData = node
      } catch (err) {
        console.log(err)
      }
    },
    changePart(tag) {
      this.graphShow = false
      this.currTag = tag
      this.nodes = [Object.assign({}, nodeCommonData, this.nodeData)]
      this.$nextTick(() => {
        this.graphShow = true
      })
    },
    layout($, go) {
      return new go.TreeLayout()
    },
    config($, go) {
      return {
        allowZoom: true, // 允许缩放
        initialViewportSpot: go.Spot.Center,
        initialContentAlignment: go.Spot.Center,
        padding: new go.Margin(50, 50, 50, 50),
        hasVerticalScrollbar: false,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom
      }
    },
    linkTemplate($, go) {
      return $(go.Link, $(go.Shape))
    },
    nodeTemplate($, go) {
      let options =
        this.nodeOptions[this.currTag] || this.nodeOptions['default'] || {}
      return $(
        go.Node,
        'Spot',
        {
          background: 'rgba(0, 0, 0, 0)',
          selectionAdorned: false
        },
        nodeParts[this.currTag]($, go, options)
      )
    },
    diagramReady(diagram, $, go) {}
  },
  created() {
    this.nodes = [Object.assign({}, nodeCommonData, this.nodeData)]
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>