# 示例 1

该示例包含了 Overview,CircleMenu,Search,Layout,Snapshot 组件，使用了通用节点和通用连线定义方法。单击或双击节点可激活置灰功能。

:::demo

```html
<template>
  <div class="dig1-con">
    <div class="tools-con">
      <xdh-go-search
        :diagram-name="'dig1'"
        pull-center
        ref="search"
        :node-keys="['searchKey']"
        custom-class="my-search"
        @on-search="onSearch"
      ></xdh-go-search>
      <div class="divider"></div>
      <xdh-go-snapshot
        :diagram-name="'dig1'"
        @on-snap="getImage"
        class="my-snapshot"
      >
        <template slot-scope="{makeImageData}">
          <el-button
            circle
            size="mini"
            type="primary"
            icon="el-icon-camera-solid"
            @click="makeImageData"
          ></el-button>
        </template>
      </xdh-go-snapshot>
    </div>
    <xdh-go-layout
      :diagram-name="'dig1'"
      :lock.sync="lock"
      ref="layout"
      custom-class="my-layout"
    ></xdh-go-layout>
    <xdh-go
      diagram-name="dig1"
      :nodes="nodes"
      :links="links"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="800px"
      :events="diagramEvents"
      @on-ready="diagramReady"
    >
      <xdh-go-overview
        :div-style="{width: '120px', height: '120px', margin: '20px 80px','z-index': '100'}"
      ></xdh-go-overview>
    </xdh-go>
    <el-dialog :title="'截图'" :visible.sync="imgDialogShow" width="50%">
      <img :src="currImg" style="width: 100%;height: auto;" />
    </el-dialog>
  </div>
</template>
<script>
  import {
    XdhGo,
    XdhGoOverview,
    XdhGoSnapshot,
    XdhGoSearch,
    XdhGoLayout,
    utils,
    animation,
    dataUtils,
    nodeTmpl,
    linkTmpl
  } from 'xdh-go'
  let { AnimationEvents } = animation
  let { DataManager, diagramManager } = dataUtils
  let { setGray, removeGray, imageSet, binding } = utils
  let dataManager, animationEvents
  let animateContinue = false
  let images1 = [
    {
      src: '/xdh-go/img/circle1.png',
      width: 40,
      height: 40,
      shape: 'Circle',
      scale: 2,
      name: 'img1'
    }
  ]
  let levelMap = {
    '01': '一',
    '02': '二',
    '03': '三'
  }
  // 测试数据
  function getTestData() {
    let nodes = [
      { name: '张三', type: '01', level: '01' },
      { name: '13467876567', type: '02', level: '02' },
      { name: '粤A12345', type: '03', level: '03' },
      { name: '440111180520212345', type: '04', level: '01' },
      { name: '李四', type: '01', level: '02' },
      { name: '13656778656', type: '02', level: '03' },
      { name: '粤A33435', type: '03', level: '01' },
      { name: '44011118052021234X', type: '04', level: '02' },
      { name: '王五', type: '01', level: '03' },
      { name: '13577656789', type: '02', level: '01' }
    ]
    let getNodes = () => {
      let arr = []
      for (let i = 0; i < nodes.length; i++) {
        arr.push({
          nodeCode: String(i + 1),
          type: nodes[i].type,
          level: nodes[i].level,
          title: nodes[i].name
        })
      }
      return arr
    }
    let getLinks = () => {
      let arr = [],
        links = `1,2|1,3|2,4|2,5|3,6|3,7|4,8|4,9|4,10|6,10`
      let linkArr = links.split('|')
      for (let i = 0; i < 10; i++) {
        let fromKey, toKey
        let k = linkArr[i].split(',')
        arr.push({
          from: k[0],
          to: k[1],
          type: ((i % 2) + 1).toString().padStart(2, '0'),
          title: '关系' + i
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
  }
  // 单击节点
  let clickNodeHandler = (ev, obj) => {
    let node = obj.part
    removeGray({ diagram: node.diagram })
    setGray({ diagram: node.diagram, nodes: [node] })
  }
  // 双击节点
  let dbClickNodeHandler = (ev, obj) => {
    let node = obj.part
    let nodes = [],
      links = []
    removeGray({ diagram: node.diagram })
    nodes.push(node)
    node.findLinksConnected().each(L => {
      links.push(L)
    })
    node.findNodesConnected().each(N => {
      nodes.push(N)
    })
    setGray({ diagram: node.diagram, nodes: nodes, links: links })
  }
  export default {
    components: {
      XdhGo,
      XdhGoOverview,
      XdhGoSnapshot,
      XdhGoSearch,
      XdhGoLayout
    },
    data() {
      return {
        lock: false,
        animateContinue: false,
        currImg: '',
        model: 'GraphLinksModel',
        nodes: [],
        links: [],
        imgDialogShow: false,
        diagramEvents: {
          BackgroundSingleClicked(obj) {
            removeGray({ diagram: obj.diagram })
            // 点击后停止动画
            animateContinue = false
          }
        }
      }
    },
    methods: {
      // 图配置
      config($, go) {
        let gridColor = '#adc6ff'
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
          initialAutoScale: go.Diagram.UniformToFill,
          grid: $(
            go.Panel,
            'Grid',
            $(go.Shape, 'LineH', { stroke: gridColor, strokeWidth: 0.5 }),
            $(go.Shape, 'LineH', {
              stroke: gridColor,
              strokeWidth: 0.5,
              interval: 10
            }),
            $(go.Shape, 'LineV', { stroke: gridColor, strokeWidth: 0.5 }),
            $(go.Shape, 'LineV', {
              stroke: gridColor,
              strokeWidth: 0.5,
              interval: 10
            })
          )
        }
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {
          direction: 90,
          setsPortSpots: false,
          layerSpacing: 0
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
              _figurePanelOptions: {
                parts: [
                  imageSet($, go, {
                    layout: 'Spot',
                    images: images1,
                    isClipping: true,
                    clip: {
                      width: 85,
                      height: 85
                    },
                    binding: binding($, go, {
                      visible: {
                        type: 'ofObject',
                        key: '',
                        handler(n) {
                          return n.isSelected
                        }
                      }
                    })
                  })
                ]
              }
            },
            events: {
              click: clickNodeHandler,
              doubleClick: dbClickNodeHandler
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
      // 数据处理
      diagramReady(diagram, $, go) {
        console.log(go.version)
        animationEvents = new AnimationEvents(diagram, go)
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
        this.loadTestData()
      },
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          searchKey: data.title + data.level,
          label: {
            text: [{ text: data.title + ':' + '等级' + levelMap[data.level] }],
            margin: [5, 10, 5, 10]
          }
        }
        let strokeColor = {
          hover: '#faad14'
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
        let tips
        nodeData.strokeColor = strokeColor
        nodeData.strokeWidth = 4
        // type: 01 人, 02 经纬度, 03 车牌号, 04 证件
        if (data.type === '01') {
          tips = '人员'
          nodeData.shape = 'clipImage'
          nodeData.image = '/xdh-go/img/node/circleimage/8.png'
        } else {
          nodeData.shape = 'icon'
          let icon = {
            font: '24px "iconfont"'
          }
          switch (data.type) {
            case '02':
              tips = '手机号码'
              icon.text = '\uE7b7'
              break
            case '03':
              tips = '车辆'
              icon.text = '\uE7df'
              break
            case '04':
              tips = '证件号码'
              icon.text = '\uE6ba'
              break
          }
          nodeData.icon = icon
        }
        nodeData.tooltip = {
          text: tips
        }
        nodeData.iconColor = {
          normal: '#10239e'
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
            lineColor = {
              normal: '#d48806'
            }
            break
          case '02':
            lineColor = {
              normal: '#389e0d'
            }
            break
        }
        linkData.lineColor = lineColor
        linkData.lineWidth = lineWidth
        linkData.labelColor = '#3f6600'
        linkData._originData = data
        return linkData
      },
      loadTestData() {
        // 模拟获取数据并添加结果
        getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
        })
      },
      // 组件功能
      getImage(type, data) {
        console.log(data)
        this.currImg = data
        this.imgDialogShow = true
      },
      circularRotate(event, node) {
        animationEvents.emit(event, node, () => {
          if (animateContinue) {
            this.circularRotate(event, node)
          }
        })
      },
      onSearch(node) {
        animateContinue = true
        let model = diagramManager['dig1'].model
        model.set(node.data, 'animation', [
          {
            trigger: 'rotate',
            objectName: 'img1',
            duration: 2000,
            prop: 'angle',
            keyFrame: [0, 360],
            easingFunc: ['ease']
          }
        ])
        setTimeout(() => {
          this.circularRotate('rotate', node)
        }, 1000)
      }
    }
  }
</script>
<style lang="scss">
  .dig1-con {
    position: relative;
  }
  .tools-con {
    text-align: right;
    background-color: rgba(28, 34, 55, 0.8);
    padding: 10px 50px;
    .divider {
      margin: 0 10px;
      border-left: 3px solid #fffefe;
      display: inline-block;
      height: 20px;
      width: 2px;
      vertical-align: middle;
    }
  }
  .my-layout {
    position: absolute;
    left: 10px;
    top: 50px;
  }
  .my-search {
    display: inline-block;
    vertical-align: middle;
  }
  .my-snapshot {
    & /deep/ .el-button {
      border-color: #fff;
      background-color: transparent;
    }
  }
</style>
```

:::
