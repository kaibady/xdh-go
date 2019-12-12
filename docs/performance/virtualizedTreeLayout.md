# 虚拟树布局

虚拟树布局 (VirtualizedTreeLayout)

该布局的节点必须使用 go.TreeModel,当节点数据量大时，可能会造成卡顿，可应用虚拟树布局，只渲染可视区域的节点。
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
        <div>显示连线数: {{statistic.linkActuralCount}}</div>
      </div>
    </div>
    <xdh-go
      :diagram-name="'dig1'"
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
  import go from 'gojs'
  let $ = go.GraphObject.make
  let { switcher, binding } = utils
  let { DataManager, diagramManager } = dataUtils
  let dataManager
  export default {
    components: {
      XdhGo,
      XdhGoOverview
    },
    data() {
      return {
        diagram: null,
        model: 'TreeModel',
        nodes: [],
        links: [],
        msg: null,
        nodeCount: 100,
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
        return layoutUtils['VirtualizedTreeLayout']($, go, {
          angle: 90,
          nodeSpacing: 4
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
          let myWholeModel = $(go.TreeModel)
          diagram.layout.model = myWholeModel
        } else {
          let model = $(go.TreeModel)
          diagram.model = model
        }
        layoutUtils.handlerVirtualTree(
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
        let nodes = []
        this.getTestData().then(res => {
          res.nodes.forEach(n => {
            let node = this.nodeConvert(n)
            // 用于虚拟节点占位
            node.bounds = new go.Rect(0, 0, 100, 120)
            nodes.push(node)
          })
          diagram.layout.model.nodeDataArray = nodes
        })
      },
      diagramReady(diagram, $, go) {},
      updateCounts(diagram, wholeModel) {
        this.statistic.nodeCount = wholeModel.nodeDataArray.length
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
              title: 'title' + i,
              parent: i > 0 ? String(Math.floor((i + 1) / 2)) : undefined
            })
          }
          return arr
        }
        let graphData = {
          nodes: getNodes()
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
          parent: data.parent,
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
      resetDiagram() {
        // dataManager.clear()
        this.loading = true
        // 需要有个setTimeout延时，否则loading会被卡住不能渲染
        setTimeout(() => {
          console.time('layoutCompleted1')
          this.startTime = new Date()
          this.loadDataFunc(diagramManager['dig1'], $, go, false)
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
          title: 'title' + count,
          parent: '1'
        }
        let node = this.nodeConvert(nodeData)
        node.bounds = new go.Rect(0, 0, 100, 120)
        // 实际会增加到diagram.layout.model中。 如果要删除数据，也是从diagram.layout.model中删除
        diagramManager['dig1'].layout.model.addNodeData(node)
        let model = $(go.TreeModel)
        // 重置diagram.model 以触发layout重新布局
        diagramManager['dig1'].model = model
      }
    },
    mounted() {},
    created() {}
  }
</script>
```

:::
