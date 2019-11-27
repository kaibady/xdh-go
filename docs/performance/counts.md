# 性能测试

## 通用节点测试

由于通用节点内部有不少数据绑定会消耗一定的性能，下图默认使用 go.ForceDirectedLayout 布局，测试上限为 800 个(chrome 浏览器,i5cpu)，耗时 约 45 秒,如果超过了，浏览器容易崩溃。
:::demo

```html
<template>
  <div v-loading="loading">
    <div style="text-align: center;margin-top: 10px;">
      <el-input-number
        v-model="nodeCount"
        :min="1"
        :max="1000"
        label="节点数量"
      ></el-input-number>

      <el-button size="mini" type="primary" @click="resetDiagram">
        重新加载
      </el-button>
      <el-button size="mini" type="primary" @click="clearDiagram">
        清空画布
      </el-button>
    </div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram1"
      height="650px"
      :events="events"
      @on-ready="diagramReady"
    >
      <!-- <xdh-go-overview :diagram="diagram"></xdh-go-overview> -->
    </xdh-go>
  </div>
</template>
<script>
  import {
    XdhGo,
    utils,
    dataUtils,
    nodeTmpl,
    linkTmpl,
    XdhGoOverview
  } from 'xdh-go'
  let { switcher, binding } = utils
  let { DataManager } = dataUtils
  let dataManager
  export default {
    components: {
      XdhGo,
      XdhGoOverview
    },
    data() {
      return {
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [],
        links: [],
        msg: null,
        nodeCount: 30,
        duplicateData: {
          level: '02',
          nodeCode: '7',
          title: 'title6',
          type: '03'
        },
        initialed: false,
        startTime: null,
        endTime: null,
        loading: false,
        events: {
          LayoutCompleted: obj => {
            console.timeEnd('layoutCompleted1')
            this.endTime = new Date()
            this.logtime()
            this.loading = false
          }
        }
      }
    },
    methods: {
      logtime() {
        if (!this.initialed) {
          return
        }
        if (this.startTime && this.endTime) {
          if (this.msg) {
            this.msg.close()
          }
          this.msg = this.$message({
            type: 'success',
            duration: 20000,
            showClose: true,
            message: `通用节点-用时${this.endTime.getTime() -
              this.startTime.getTime()}ms`
          })
        }
        this.startTime = null
        this.endTime = null
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
          initialAutoScale: go.Diagram.UniformToFill
        }
      },
      layout($, go) {
        return $(go.ForceDirectedLayout, {
          setsPortSpots: false
        })
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 60
            }
          })
        )
        return map
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            fromPortId: 'tFigure',
            toPortId: 'tFigure'
          }
        })
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter(
          'nodeCv1',
          this.nodeConvert,
          this.nodeMerger
        )
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
        this.initialed = true
        console.time('layoutCompleted1')
        this.loading = true
        this.startTime = new Date()
        // 模拟获取数据并添加结果
        this.getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
        })
      },
      getTestData() {
        let getNodes = () => {
          let arr = []
          for (let i = 0; i < this.nodeCount; i++) {
            arr.push({
              nodeCode: String(i + 1),
              type: ((i % 4) + 1).toString().padStart(2, '0'),
              level: ((i % 3) + 1).toString().padStart(2, '0'),
              title: 'title' + i
            })
          }
          return arr
        }
        let getLinks = () => {
          let arr = []
          for (let i = 0; i < this.nodeCount; i++) {
            if (i === 0) {
              continue
            }
            let fromKey, toKey
            arr.push({
              from: String(Math.floor(i / 2) + 1),
              to: String(i + 1),
              type: ((i % 2) + 1).toString().padStart(2, '0'),
              title: 'label' + i
            })
          }
          return arr
        }
        let graphData = {
          nodes: getNodes(),
          links: getLinks()
        }
        return new Promise((resolve, reject) => {
          resolve(graphData)
        })
      },
      nodeMerger(oldData, newData, go, diagram) {
        // 根据需要通过旧节点和新节点生成新数据返回
        let nodeData = JSON.parse(JSON.stringify(oldData))
        nodeData.label.text.push({
          text: newData._originData.title + ':' + newData._originData.level
        })
        return nodeData
      },
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          label: {
            text: [{ text: data.title + ':' + data.level }],
            margin: [5, 10, 5, 10]
          }
        }
        let strokeColor = {
          hover: '#f0f5ff'
        }
        switch (data.level) {
          case '01':
            strokeColor.normal = '#389e0d'
            break
          case '02':
            strokeColor.normal = '#722ed1'
            break
          case '03':
            strokeColor.normal = '#c41d7f'
            break
        }
        nodeData.strokeColor = strokeColor
        nodeData.strokeWidth = 8
        if (data.type === '01') {
          nodeData.shape = 'clipImage'
          nodeData.image = '/xdh-go/img/node/circleimage/8.png'
        } else {
          nodeData.shape = 'icon'
          let icon = {
            font: '24px "iconfont"'
          }
          switch (data.type) {
            case '02':
              icon.text = '\uE64a'
              break
            case '03':
              icon.text = '\uE65b'
              break
            case '04':
              icon.text = '\uE674'
              break
          }
          nodeData.icon = icon
        }
        // 添加其它node的配置
        nodeData.labelBackground = {
          normal: '#fff566',
          hover: '#ffffb8'
        }
        return nodeData
      },
      linkConvert(data) {
        let linkData = {
          from: data.from,
          to: data.to,
          label: data.title
        }
        let lineColor = ''
        let lineWidth = {
          normal: 2,
          hover: 4
        }
        switch (data.type) {
          case '01':
            lineColor = '#d48806'
            break
          case '02':
            lineColor = '#389e0d'
            break
        }
        linkData.lineColor = lineColor
        linkData.lineWidth = lineWidth
        linkData.labelColor = '#3f6600'
        linkData._originData = data
        return linkData
      },
      resetDiagram() {
        dataManager.clear()
        this.loading = true
        // 需要有个setTimeout延时，否则loading会被卡住不能渲染
        setTimeout(() => {
          console.time('layoutCompleted1')
          this.startTime = new Date()
          this.getTestData().then(res => {
            res.nodes.forEach(n => {
              dataManager.addNode(n, 'nodeCv1')
            })
            res.links.forEach(l => {
              dataManager.addLink(l, 'linkCv1')
            })
          })
        }, 100)
      },
      clearDiagram() {
        dataManager.clear()
      }
    },
    mounted() {}
  }
</script>
```

:::

## 简化节点测试

测试没有任何数据绑定的节点，数量可稍微多点。然而数据绑定的多少并非主要因素，尝试切换布局，会发现不同布局对渲染的耗时会有影响,而且差别相当大。其中 LayeredDigraphLayout 最耗时，GridLayout 最省时
:::demo

```html
<template>
  <div v-loading="loading">
    <div style="text-align: center;margin-top: 10px;">
      <el-input-number
        v-model="nodeCount"
        :min="1"
        :max="1000"
        label="节点数量"
      ></el-input-number>
      <el-button size="mini" type="primary" @click="resetDiagram">
        重新加载
      </el-button>
      <el-button size="mini" type="primary" @click="clearDiagram">
        清空画布
      </el-button>
      <el-button
        size="mini"
        :type="currLayout === 'ForceDirectedLayout' ? 'primary': 'default'"
        @click="setLayout('ForceDirectedLayout')"
      >
        ForceDirectedLayout
      </el-button>
      <el-button
        :type="currLayout === 'GridLayout' ? 'primary': 'default'"
        size="mini"
        @click="setLayout('GridLayout')"
      >
        GridLayout
      </el-button>
      <el-button
        :type="currLayout === 'LayeredDigraphLayout' ? 'primary': 'default'"
        size="mini"
        @click="setLayout('LayeredDigraphLayout')"
      >
        LayeredDigraphLayout
      </el-button>
      <el-button
        :type="currLayout === 'TreeLayout' ? 'primary': 'default'"
        size="mini"
        @click="setLayout('TreeLayout')"
      >
        TreeLayout
      </el-button>
      <el-button
        :type="currLayout === 'CircularLayout' ? 'primary': 'default'"
        size="mini"
        @click="setLayout('CircularLayout')"
      >
        CircularLayout
      </el-button>
    </div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :node-template="nodeTemplate"
      :link-template="linkTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="650px"
      :events="events"
      @on-ready="diagramReady"
    >
      <!-- <xdh-go-overview :diagram="diagram"></xdh-go-overview> -->
    </xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, dataUtils, XdhGoOverview } from 'xdh-go'
  let { switcher, binding, node, link, shape } = utils
  let { DataManager } = dataUtils
  let dataManager
  export default {
    components: {
      XdhGo,
      XdhGoOverview
    },
    data() {
      return {
        currLayout: 'ForceDirectedLayout',
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [],
        links: [],
        msg: null,
        nodeCount: 30,
        initialed: false,
        duplicateData: {
          level: '02',
          nodeCode: '7',
          title: 'title6',
          type: '03'
        },
        startTime: null,
        endTime: null,
        loading: false,
        events: {
          LayoutCompleted: obj => {
            console.timeEnd('layoutCompleted2')
            this.endTime = new Date()
            this.logtime()
            this.loading = false
          }
        }
      }
    },
    methods: {
      logtime() {
        if (!this.initialed) {
          return
        }
        if (this.startTime && this.endTime) {
          if (this.msg) {
            this.msg.close()
          }
          this.msg = this.$message({
            type: 'warning',
            duration: 20000,
            showClose: true,
            message: `简化节点-用时${this.endTime.getTime() -
              this.startTime.getTime()}ms`
          })
        }
        this.startTime = null
        this.endTime = null
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
          initialAutoScale: go.Diagram.UniformToFill
        }
      },
      layout($, go) {
        return $(go.ForceDirectedLayout, {
          setsPortSpots: false,
          defaultSpringLength: 20
        })
      },
      nodeTemplate($, go) {
        return node($, go, {
          parts: [
            shape($, go, {
              props: {
                figure: 'Circle',
                fill: 'red',
                stroke: '#000'
              }
            })
          ]
        })
      },
      linkTemplate($, go) {
        return link($, go, {
          parts: [
            shape($, go, {
              props: {
                stroke: '#000'
              }
            })
          ]
        })
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter(
          'nodeCv1',
          this.nodeConvert,
          this.nodeMerger
        )
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
        this.initialed = true
        console.time('layoutCompleted2')
        this.loading = true
        this.startTime = new Date()
        // 模拟获取数据并添加结果
        diagram.skipsUndoManager = true
        this.getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
          diagram.layoutDiagram()
        })
      },
      getTestData() {
        let getNodes = () => {
          let arr = []
          for (let i = 0; i < this.nodeCount; i++) {
            arr.push({
              nodeCode: String(i + 1),
              type: ((i % 4) + 1).toString().padStart(2, '0'),
              level: ((i % 3) + 1).toString().padStart(2, '0'),
              title: 'title' + i
            })
          }
          return arr
        }
        let getLinks = () => {
          let arr = []
          for (let i = 0; i < this.nodeCount; i++) {
            if (i === 0) {
              continue
            }
            arr.push({
              from: String(Math.floor(i / 2) + 1),
              to: String(i + 1),
              type: ((i % 2) + 1).toString().padStart(2, '0'),
              title: 'label' + i
            })
          }
          return arr
        }
        let graphData = {
          nodes: getNodes(),
          links: getLinks()
        }
        return new Promise((resolve, reject) => {
          resolve(graphData)
        })
      },
      nodeMerger(oldData, newData, go, diagram) {
        // 根据需要通过旧节点和新节点生成新数据返回
        let nodeData = JSON.parse(JSON.stringify(oldData))
        nodeData.label.text.push({
          text: newData._originData.title + ':' + newData._originData.level
        })
        return nodeData
      },
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          label: {
            text: [{ text: data.title + ':' + data.level }],
            margin: [5, 10, 5, 10]
          }
        }
        let strokeColor = {
          hover: '#f0f5ff'
        }
        switch (data.level) {
          case '01':
            strokeColor.normal = '#389e0d'
            break
          case '02':
            strokeColor.normal = '#722ed1'
            break
          case '03':
            strokeColor.normal = '#c41d7f'
            break
        }
        nodeData.strokeColor = strokeColor
        nodeData.strokeWidth = 8
        if (data.type === '01') {
          nodeData.shape = 'clipImage'
          nodeData.image = '/xdh-go/img/node/circleimage/8.png'
        } else {
          nodeData.shape = 'icon'
          let icon = {
            font: '24px "iconfont"'
          }
          switch (data.type) {
            case '02':
              icon.text = '\uE64a'
              break
            case '03':
              icon.text = '\uE65b'
              break
            case '04':
              icon.text = '\uE674'
              break
          }
          nodeData.icon = icon
        }
        // 添加其它node的配置
        nodeData.labelBackground = {
          normal: '#fff566',
          hover: '#ffffb8'
        }
        return nodeData
      },
      linkConvert(data) {
        let linkData = {
          from: data.from,
          to: data.to,
          label: data.title
        }
        let lineColor = ''
        let lineWidth = {
          normal: 2,
          hover: 4
        }
        switch (data.type) {
          case '01':
            lineColor = '#d48806'
            break
          case '02':
            lineColor = '#389e0d'
            break
        }
        linkData.lineColor = lineColor
        linkData.lineWidth = lineWidth
        linkData.labelColor = '#3f6600'
        linkData._originData = data
        return linkData
      },
      resetDiagram() {
        this.loading = true
        dataManager.clear()
        // 需要有个setTimeout延时，否则loading会被卡住不能渲染
        setTimeout(() => {
          console.time('layoutCompleted2')
          this.startTime = new Date()
          this.getTestData().then(res => {
            res.nodes.forEach(n => {
              dataManager.addNode(n, 'nodeCv1')
            })
            res.links.forEach(l => {
              dataManager.addLink(l, 'linkCv1')
            })
            this.diagram.layoutDiagram()
          })
        }, 100)
      },
      setLayout(layout) {
        this.currLayout = layout
        let go = this.$refs.diagram.go
        let $ = go.GraphObject.make
        let options = {}
        if (layout === 'LayeredDigraphLayout') {
          options.direction = 90
        } else if (layout === 'TreeLayout') {
          options.angle = 90
        }
        this.startTime = new Date()
        this.diagram.layout = $(go[layout], options)
      },
      clearDiagram() {
        dataManager.clear()
      }
    },
    mounted() {}
  }
</script>
```

:::
