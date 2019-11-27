# 虚拟力布局

虚拟力布局 (VirtualizedForceDirectedLayout)

当节点数据量大时，可能会造成卡顿，可应用虚拟力布局，只渲染可视区域的节点。在使用时要把 diagram 动画设置和布局相关设置禁用掉。

:::demo

```html
<template>
  <div v-loading="loading">
    <div style="text-align: center;margin-top: 10px;">
      <el-input-number
        v-model="nodeCount"
        :min="1"
        :max="5000"
        label="节点数量"
      ></el-input-number>

      <el-button size="mini" type="primary" @click="resetDiagram">
        重新加载
      </el-button>
      <el-button size="mini" type="primary" @click="clearDiagram">
        清空画布
      </el-button>
      <el-button size="mini" type="primary" @click="addNode">
        添加节点
      </el-button>
      <div>
        <div>model节点数: {{statistic.nodeCount}}</div>
        <div>显示节点数: {{statistic.nodeActuralCount}}</div>
        <div>model连线数: {{statistic.linkCount}}</div>
        <div>显示连线数: {{statistic.linkActuralCount}}</div>
      </div>
    </div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :load-data-func="loadDataFunc"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram1"
      height="650px"
      :events="events"
      @on-ready="diagramReady"
    >
      <xdh-go-overview :diagram="diagram"></xdh-go-overview>
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
    layoutUtils,
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
        nodeCount: 400,
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
        statistic: {
          linkCount: 0,
          linkActuralCount: 0,
          nodeCount: 0,
          nodeActuralCount: 0
        },
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
          'animationManager.isEnabled': false,
          minScale: 0.5,
          padding: new go.Margin(30, 30, 30, 30)
        }
      },
      layout($, go) {
        return layoutUtils['VirtualizedForceDirectedLayout']($, go, {
          maxIterations: 25
        })
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 60,
              _nodeOptions: {
                props: {
                  // 禁用isLayoutPositioned属性
                  isLayoutPositioned: false
                }
              }
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
            toPortId: 'tFigure',
            _linkOptions: {
              props: {
                // 禁用isLayoutPositioned属性
                isLayoutPositioned: false
              }
            }
          }
        })
      },
      loadDataFunc(diagram, $, go, init = true) {
        if (init) {
          let myWholeModel = $(go.GraphLinksModel)
          diagram.layout.model = myWholeModel
          this.diagram = diagram
        } else {
          let model = $(go.GraphLinksModel)
          diagram.model = model
        }
        layoutUtils.handlerVirtualForce(
          go,
          diagram,
          diagram.layout.model,
          init,
          this.updateCounts
        )
        this.initialed = true
        // this.loading = true
        this.startTime = new Date()
        // 模拟获取数据并添加结果
        let nodes = [],
          links = []
        this.getTestData().then(res => {
          res.nodes.forEach(n => {
            let node = this.nodeConvert(n)
            // 用于虚拟节点占位
            node.bounds = new go.Rect(0, 0, 100, 120)
            nodes.push(node)
          })
          res.links.forEach(l => {
            links.push(this.linkConvert(l))
          })
          diagram.layout.model.nodeDataArray = nodes
          diagram.layout.model.linkDataArray = links
        })
      },
      diagramReady(diagram, $, go) {},
      updateCounts(diagram, wholeModel) {
        this.statistic.nodeCount = wholeModel.nodeDataArray.length
        this.statistic.linkCount = wholeModel.linkDataArray.length
        this.statistic.nodeActuralCount = diagram.nodes.count
        this.statistic.linkActuralCount = diagram.links.count
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
          hover: '#0050b3'
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
        // dataManager.clear()
        this.loading = true
        // 需要有个setTimeout延时，否则loading会被卡住不能渲染
        setTimeout(() => {
          console.time('layoutCompleted1')
          this.startTime = new Date()
          let go = this.$refs.diagram1.go
          let $ = go.GraphObject.make
          this.loadDataFunc(this.diagram, $, go, false)
        }, 100)
      },
      clearDiagram() {
        dataManager.clear()
      },
      addNode() {
        // 添加一个节点。由于虚拟布局的特殊性，dataManager的添加方法在这里不使用，需要使用diagram的原生方法
        let count = 5000 + Math.floor(Math.random() * 5000)
        let nodeData = {
          nodeCode: String(count),
          type: ((count % 4) + 1).toString().padStart(2, '0'),
          level: ((count % 3) + 1).toString().padStart(2, '0'),
          title: 'title' + count
        }
        let linkData = {
          from: '1',
          to: String(count),
          type: ((count % 2) + 1).toString().padStart(2, '0'),
          title: 'label' + count
        }
        let go = this.$refs.diagram1.go
        let $ = go.GraphObject.make
        let node = this.nodeConvert(nodeData)
        node.bounds = new go.Rect(0, 0, 100, 120)
        // 实际会增加到diagram.layout.model中。 如果要删除数据，也是从diagram.layout.model中删除
        this.diagram.layout.model.addNodeData(node)
        this.diagram.layout.model.addLinkData(this.linkConvert(linkData))
        let model = $(go.GraphLinksModel)
        // 重置diagram.model 以触发layout重新布局
        this.diagram.model = model
      }
    },
    mounted() {},
    created() {}
  }
</script>
```

:::
