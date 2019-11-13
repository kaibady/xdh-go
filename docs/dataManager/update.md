# 数据更新

## 数据更新相关方法

setNodeUpdater 方法

注册节点更新函数
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| name | 函数名称 | String |-| - |
| fn | 更新函数 | Function |-| 参数(data, value, model, digram),data 为节点类型 |

setLinkUpdater 方法

注册连线更新函数
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| name | 函数名称 | String |-| - |
| fn | 更新函数 | Function |-| 参数(data, value, model, digram),data 为连线数据类型 |

updateNode 方法

更新节点
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| node | 节点数据 | String/Object/go.Node 对象 |-| - |
| key | 需要更新的数据字段 | String |-| - |
| value | 更新的字段值 | String/Object |-| - |
| isOrigin | 字段是原始数据字段还是转换后的字段，如果是原始数据，会使用 updater 定义的方法 | Boolean |-| false |
| isByExample | 是否使用 getLinksByExample 方法，将会搜索满足条件的节点 | Boolean |-| false |

updateLink 方法

更新连线
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| link | 连线数据 | String/Object/go.Node 对象 |-| - |
| key | 需要更新的数据字段 | String |-| - |
| value | 更新的字段值 | String/Object |-| - |
| isOrigin | 字段是原始数据字段还是转换后的字段，如果是原始数据，会使用 updater 定义的方法 | Boolean |-| false |
| isByExample | 是否使用 getLinksByExample 方法，将会搜索满足条件的节点 | Boolean |-| false |

## 更新节点数据

注册 updater 后，使用 updateNode 方法，传入 isOrigin 为 true,更新原始数据字段会同时调用 updater 进行后续处理。如果 isOrigin 为 false 或不传，则更新的是转换后的样式控制数据。
:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button size="mini" type="primary" @click="updateNodeData()">
        更新node2节点数据
      </el-button>
      <el-button size="mini" type="primary" @click="updateNodeOrigin()">
        更新node3节点数据（原始数据)
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
      ref="diagram"
      height="650px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, dataUtils, nodeTmpl, linkTmpl } from 'xdh-go'
  let { switcher, binding } = utils
  let { DataManager } = dataUtils
  let dataManager
  // 测试数据
  function getTestData() {
    let getNodes = () => {
      let arr = []
      for (let i = 0; i < 6; i++) {
        arr.push({
          nodeCode: String(i + 1),
          type: ((i % 4) + 1).toString().padStart(2, '0'),
          level: ((i % 3) + 1).toString().padStart(2, '0'),
          title: 'node' + (i + 1)
        })
      }
      return arr
    }
    let getLinks = () => {
      let arr = [],
        links = `1,2|1,3|2,4|2,5|3,6|2,6`
      let linkArr = links.split('|')
      for (let i = 0; i < 6; i++) {
        let fromKey, toKey
        let k = linkArr[i].split(',')
        arr.push({
          from: k[0],
          to: k[1],
          type: ((i % 2) + 1).toString().padStart(2, '0'),
          title: 'link' + i
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
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [],
        links: []
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
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
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
        dataManager.setNodeUpdater('level', this.levelUpdater)
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
      levelUpdater(data, value, model, diagram) {
        let strokeColor = {
          hover: '#f0f5ff'
        }
        let origin = data._originData
        switch (origin.level) {
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
        let label = JSON.parse(JSON.stringify(data.label))
        label.text = [{ text: origin.title + ':' + origin.level }]
        model.set(data, 'label', label)
        model.set(data, 'strokeColor', strokeColor)
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
        getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
        })
      },
      updateNodeData() {
        // isOrigin参数默认为false,更新节点的数据，因此不需要注册updater
        dataManager.updateNode('2', 'strokeColor', '#f5222d')
      },
      updateNodeOrigin() {
        dataManager.updateNode('3', 'level', '02', true)
      }
    },
    mounted() {}
  }
</script>
```

:::

## 更新连线数据

注册 updater 后，使用 updateLink 方法，传入 isOrigin 为 true,更新原始数据字段会同时调用 updater 进行后续处理。如果 isOrigin 为 false 或不传，则更新的是转换后的样式控制数据。

:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button size="mini" type="primary" @click="updateLinkData()">
        更新2->4连线数据
      </el-button>
      <el-button size="mini" type="primary" @click="updateLinkOrigin()">
        更新2-6连线数据（原始数据)
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
      ref="diagram"
      height="650px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, dataUtils, nodeTmpl, linkTmpl } from 'xdh-go'
  let { switcher, binding } = utils
  let { DataManager } = dataUtils
  let dataManager
  // 测试数据
  function getTestData() {
    let getNodes = () => {
      let arr = []
      for (let i = 0; i < 6; i++) {
        arr.push({
          nodeCode: String(i + 1),
          type: ((i % 4) + 1).toString().padStart(2, '0'),
          level: ((i % 3) + 1).toString().padStart(2, '0'),
          title: 'node' + (i + 1)
        })
      }
      return arr
    }
    let getLinks = () => {
      let arr = [],
        links = `1,2|1,3|2,4|2,5|3,6|2,6`
      let linkArr = links.split('|')
      for (let i = 0; i < 6; i++) {
        let fromKey, toKey
        let k = linkArr[i].split(',')
        arr.push({
          key: k[0] + '->' + k[1],
          from: k[0],
          to: k[1],
          type: ((i % 2) + 1).toString().padStart(2, '0'),
          title: k[0] + '->' + k[1]
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
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [],
        links: []
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {
          direction: 90,
          setsPortSpots: false,
          layerSpacing: 50
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
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
        dataManager.setLinkUpdater('type', this.typeUpdater)
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
      typeUpdater(data, value, model, diagram) {
        let lineColor = ''
        let origin = data._originData
        switch (origin.type) {
          case '01':
            lineColor = '#d48806'
            break
          case '02':
            lineColor = '#389e0d'
            break
        }
        let label = JSON.parse(JSON.stringify(data.label))
        label = origin.title + ':' + origin.type
        model.set(data, 'label', label)
        model.set(data, 'lineColor', lineColor)
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
          key: data.key,
          from: data.from,
          to: data.to,
          label: data.title + ':' + data.type,
          placement: 'end-middle'
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
        getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
        })
      },
      updateLinkData() {
        // isOrigin参数默认为false,更新节点的数据，因此不需要注册updater
        dataManager.updateLink('2->4', 'lineColor', '#f5222d')
      },
      updateLinkOrigin() {
        dataManager.updateLink({ from: '2', to: '6' }, 'type', '01', true, true)
      }
    },
    mounted() {}
  }
</script>
```

:::
