# 添加数据

## dataManager

数据管理类

使用通用节点定义模板虽然方便，但也有其局限。由于节点的样式是通过数据控制的，想重新定义原始数据到样式的数据绑定会不方便，而且从后端接口返回的数据会跟样式的数据混杂在一起，增加管理的复杂性。因此有必要对数据处理的方法进行整理。

DataManager 类

构造函数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| diagram | go. Diagram 对象 | go. Diagram 对象 | - | - |
| go | gojs 库 | Object | - | - |

## 添加数据相关方法

setNodeConverter 方法
| 参数名 | 说明 | 类型 | 默认值 |
| ----------------- | ------ | ------ | --------------------------------- |
| name | 转换器名称 | String | - |
| fn | 转换器方法 | Function | 默认 function(data) {return data}, 即不做转换。参数(data, options), options 为 addNode 方法传入的参数 |
| nodeMergeFun | Function |当节点去重时需要执行的方法 | 参数(oldData, newData) |

setLinkConverter 方法
| 参数名 | 说明 | 类型 |默认值 |
| ----------------- | ------ |------ | --------------------------------- |
| name | 转换器名称 | String | - |
| fn | 转换器方法 | Function | 默认 function(data) {return data}, 即不做转换。参数(data, options), options 为 addLink 方法传入的参数 |
| linkMergeFun | 当节点去重时需要执行的方法 | Function | 参数(oldData, newData) |

addNode 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| data | 节点的原始参数 | Object |-| - |
| fn | 通过 setNodeConverter 定义的转换器名称 | String | -| - |
| options | 配置参数，distinct, duplicate, mergeFun 三个参数会在方法内部使用，其余会传到转换器中 | Object | -| - |
| options.distinct | 节点是否去重 | Boolean | -| true |
| options.duplicate | 节点重复的处理方式 | String | 'replace'(使用新数据)/'remain'(使用旧数据)/'merge'(合并，需用到预定义的 nodeMergeFun 方法))| 默认'replace'|

addLink 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| data | 连线的原始参数 | Object |-| - |
| fn | 通过 setNodeConverter 定义的转换器名称 | String | -| - |
| options | 配置参数，distinct, duplicate, mergeFun 三个参数会在方法内部使用，其余会传到转换器中 | Object | -| - |
| options.distinct | 连线是否去重 | Boolean | -| true |
| options.duplicate | 连线重复的处理方式 | String | 'replace'(使用新数据)/'remain'(使用旧数据)/'merge'(合并，需用到预定义的 nodeMergeFun 方法))| 默认'replace'|

getNode 方法

获取节点
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| node | 节点数据 | String/Object/go.Node 对象 |-| - |
| isObject | 是否获取节点对象,如果为否，获得的是数据 | Boolean |-| - |
| isByExample | 是否使用 getNodesByExample 方法，将会搜索满足条件的节点，返回数组 | Boolean |-| false |

getLink 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| link | 连线数据 | String/Object/go.Node 对象 |-| - |
| isObject | 是否获取连线对象,如果为否，获得的是数据 | Boolean |-| - |
| isByExample | 是否使用 getLinksByExample 方法，将会搜索满足条件的节点 | Boolean |-| false |

## 节点添加示例

试点击下列按钮查看效果。点击后可点重置恢复数据。

了解 distinct 参数控制节点去重作用；了解 duplicate 的 replace,remain,merge 模式的区别，了解自定义合并处理方法 mergeFun 的写法
:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupNode({distinct: false})"
      >
        添加重复节点title6(不去重)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupNode({duplicate: 'replace'})"
      >
        添加重复节点title6(replace)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupNode({duplicate: 'remain'})"
      >
        添加重复节点title6(remain)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupNode({duplicate: 'merge'})"
      >
        添加重复节点title6(merge))
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
      for (let i = 0; i < 10; i++) {
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
        model: 'GraphLinksModel',
        nodes: [],
        links: [],
        duplicateData: {
          level: '02',
          nodeCode: '7',
          title: 'title6',
          type: '03'
        }
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
        dataManager.setNodeConverter(
          'nodeCv1',
          this.nodeConvert,
          this.nodeMerger
        )
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
        getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1')
          })
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1')
          })
        })
      },
      addDupNode(options) {
        // 添加一个nodeCode已存在的节点，但level不相同
        dataManager.addNode(this.duplicateData, 'nodeCv1', options)
      }
    },
    mounted() {}
  }
</script>
```

:::

## 连线添加示例

试点击下列按钮查看效果。点击后可点重置恢复数据。

了解 distinct 参数控制节点去重作用；了解 duplicate 的 replace,remain,merge 模式的区别，了解自定义合并处理方法 mergeFun 的写法
:::demo

```html
<template>
  <div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button size="mini" type="primary" @click="resetDiagram">
        重置数据
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupLink({distinct: false})"
      >
        添加重复连线line6(不去重)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupLink({duplicate: 'replace'})"
      >
        添加重复连线line6(replace)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupLink({duplicate: 'remain'})"
      >
        添加重复连线line6(remain)
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="addDupLink({duplicate: 'merge'})"
      >
        添加重复连线line6(merge))
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
      height="700px"
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
      for (let i = 0; i < 10; i++) {
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
          title: 'line' + i
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
        links: [],
        duplicateData: {
          from: '4',
          to: '9',
          type: '01',
          title: 'line7'
        }
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
          columnSpacing: 30,
          layerSpacing: 20
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
            fromPortId: 'tNode',
            toPortId: 'tNode'
          }
        })
      },
      diagramReady(diagram, $, go) {
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert)
        dataManager.setLinkConverter(
          'linkCv1',
          this.linkConvert,
          this.linkMerger
        )
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
      linkMerger(oldData, newData, go, diagram) {
        // 根据需要通过旧连线和新连线生成新数据返回
        let linkData = JSON.parse(JSON.stringify(oldData))
        // 原始数据会放到_originData中
        linkData.label.text.push({
          text: newData._originData.title + ':' + newData._originData.type
        })
        let type = Math.min(
          parseInt(oldData._originData.type),
          parseInt(newData._originData.type)
        )
        let lineColor
        switch (type) {
          case 1:
            lineColor = '#d48806'
            break
          case 2:
            lineColor = '#389e0d'
            break
        }
        linkData.lineColor = lineColor
        return linkData
      },
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          label: ''
        }
        let strokeColor = {
          normal: '#b7eb8f',
          hover: '#b7eb8f'
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
          label: {
            text: [{ text: data.title + ':' + data.type }],
            font: '20px "Microsoft Yahei"',
            placement: 'middle'
          }
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
      addDupLink(options) {
        // 添加一个nodeCode已存在的节点，但level不相同
        dataManager.addLink(this.duplicateData, 'linkCv1', options)
      }
    },
    mounted() {}
  }
</script>
```

:::
