# 数据删除

## 删除相关方法

removeNode 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| node | 节点数据 | String/Object/go.Node 对象 |-| - |
| isByExample | 是否使用 getNodesByExample 方法，将会搜索满足条件的节点 | Boolean |-| false |

removeLink 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| link | 连线数据 | String/Object/go.Node 对象 |-| - |
| isByExample | 是否使用 getLinksByExample 方法，将会搜索满足条件的节点 | Boolean |-| false |

## 节点删除示例

参数的 node 可以传节点的 key, 节点的数据对象， go.Node 对象或者是一个对象形式的搜索条件
:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button size="mini" type="primary" @click="removeNodeByKey()">
        删除node1(by key)
      </el-button>
      <el-button size="mini" type="primary" @click="removeNodeByData()">
        删除node2(by data)
      </el-button>
      <el-button size="mini" type="primary" @click="removeNodeByNode()">
        删除node3(by go.Node)
      </el-button>
      <el-button size="mini" type="primary" @click="removeNodeByExample()">
        删除node4(by example)
      </el-button>
    </div>
    <xdh-go
      :diagram-name="'dig1'"
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
  let { DataManager, diagramManager } = dataUtils
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
          title: 'title' + (i + 1)
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
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
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
      removeNodeByKey() {
        dataManager.removeNode('1')
      },
      removeNodeByData() {
        let data = diagramManager['dig1'].model.nodeDataArray.find(r => r.key === '2')
        if (data) {
          dataManager.removeNode(data)
        }
      },
      removeNodeByNode() {
        let node = diagramManager['dig1'].findNodeForKey('3')
        if (node) {
          dataManager.removeNode(node)
        }
      },
      removeNodeByExample() {
        dataManager.removeNode({ key: '4' })
      }
    },
    mounted() {}
  }
</script>
```

:::

## 连线删除示例

参数的 link 可以传节点的 key, 节点的数据对象， go.Link 对象或者是一个对象形式的搜索条件
:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button size="mini" type="primary" @click="removeLinkByKey()">
        删除line1(by key)
      </el-button>
      <el-button size="mini" type="primary" @click="removeLinkByData()">
        删除line2(by data)
      </el-button>
      <el-button size="mini" type="primary" @click="removeLinkByLink()">
        删除line3(by go.Link)
      </el-button>
      <el-button size="mini" type="primary" @click="removeLinkByExample()">
        删除2->5(by example)
      </el-button>
    </div>
    <xdh-go
      :diagram-name="'dig2'"
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
          linkCode: String(i + 1),
          from: k[0],
          to: k[1],
          type: ((i % 2) + 1).toString().padStart(2, '0'),
          title: 'line' + (i + 1)
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
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter('linkCv1', this.linkConvert)
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
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          label: {
            text: [{ text: data.title }],
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
          key: data.linkCode,
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
      removeLinkByKey() {
        dataManager.removeLink('1')
      },
      removeLinkByData() {
        let data = diagramManager['dig2'].model.linkDataArray.find(r => r.key === '2')
        if (data) {
          dataManager.removeLink(data)
        }
      },
      removeLinkByLink() {
        let data = diagramManager['dig2'].model.linkDataArray.find(r => r.key === '3')
        let link = diagramManager['dig2'].findLinkForData(data)
        if (link) {
          dataManager.removeLink(link)
        }
      },
      removeLinkByExample() {
        dataManager.removeLink({ from: '2', to: '5' }, true)
      }
    },
    mounted() {}
  }
</script>
```

:::
