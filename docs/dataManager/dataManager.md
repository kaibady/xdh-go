# dataManager

数据管理类

使用通用节点定义模板虽然方便，但也有其局限。由于节点的样式是通过数据控制的，想重新定义原始数据到样式的数据绑定会不方便，而且从后端接口返回的数据会跟样式的数据混杂在一起，增加管理的复杂性。因此有必要对数据处理的方法进行整理。

DataManager 类

构造函数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| diagram | go.Diagram 对象 | go.Diagram 对象 | - | - |
| go | gojs 库 | Object | - | - |

## 增加节点相关方法

setNodeConverter 方法
| 参数名 | 说明 | 类型 | 默认值 |
| ----------------- | ------ | ------ | --------------------------------- |
| name | 转换器名称 | String | - |
| fn | 转换器方法 | Function | 默认 function(data) {return data}, 即不做转换。参数(data, options),options 为 addNode 方法传入的参数 |
| nodeMergeFun | Function |当节点去重时需要执行的方法 | 参数(oldData, newData) |

setLinkConverter 方法
| 参数名 | 说明 | 类型 |默认值 |
| ----------------- | ------ |------ | --------------------------------- |
| name | 转换器名称 | String | - |
| fn | 转换器方法 | Function | 默认 function(data) {return data}, 即不做转换。参数(data, options),options 为 addLink 方法传入的参数 |
| linkMergeFun | 当节点去重时需要执行的方法 | Function | 参数(oldData, newData) |

addNode 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| data | 节点的原始参数 | Object |-| - |
| fn | 通过 setNodeConverter 定义的转换器名称 | String | -| - |
| options | 配置参数，distinct,duplicate,mergeFun 三个参数会在方法内部使用，其余会传到转换器中 | Object | -| - |
| options.distinct | 节点是否去重 | Boolean | -| true |
| options.duplicate | 节点重复的处理方式 | String | 'replace'(使用新数据)/'remain'(使用旧数据)/'merge'(合并，需用到预定义的 nodeMergeFun 方法))| 默认'replace'|

addLink 方法
| 参数名 | 说明 | 类型 |可选值|默认值 |
| ----------------- | ------ |------ | ------ | --------------------------------- |
| data | 连线的原始参数 | Object |-| - |
| fn | 通过 setNodeConverter 定义的转换器名称 | String | -| - |
| options | 配置参数，distinct,duplicate,mergeFun 三个参数会在方法内部使用，其余会传到转换器中 | Object | -| - |
| options.distinct | 连线是否去重 | Boolean | -| true |
| options.duplicate | 连线重复的处理方式 | String | 'replace'(使用新数据)/'remain'(使用旧数据)/'merge'(合并，需用到预定义的 nodeMergeFun 方法))| 默认'replace'|

## 示例

:::demo

```html
<template>
  <div>
    <div style="text-align: center">
      <el-button size="mini" type="primary" @click="addDupNode">
        添加一个重复节点title6
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
  import { XdhGo, utils, dataUtils, nodeTmpl, linkTmpl } from 'xdh-go';
  let { switcher, binding } = utils;
  let { DataManager } = dataUtils;
  let dataManager;
  // 测试数据
  function getTestData() {
    let getNodes = () => {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push({
          nodeCode: String(i + 1),
          type: ((i % 4) + 1).toString().padStart(2, '0'),
          level: ((i % 3) + 1).toString().padStart(2, '0'),
          title: 'title' + i
        });
      }
      return arr;
    };
    let getLinks = () => {
      let arr = [],
        links = `1,2|1,3|2,4|2,5|3,6|3,7|4,8|4,9|4,10|6,10`;
      let linkArr = links.split('|');
      for (let i = 0; i < 10; i++) {
        let fromKey, toKey;
        let k = linkArr[i].split(',');
        arr.push({
          from: k[0],
          to: k[1],
          type: ((i % 2) + 1).toString().padStart(2, '0'),
          title: 'label' + i
        });
      }
      return arr;
    };
    let graphData = {
      nodes: getNodes(),
      links: getLinks()
    };
    return new Promise((resolve, reject) => {
      resolve(graphData);
    });
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [],
        links: []
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {
          direction: 90,
          setsPortSpots: false,
          layerSpacing: 0
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 60
            }
          })
        );
        return map;
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            fromPortId: 'tFigure',
            toPortId: 'tFigure'
          }
        });
      },
      diagramReady(diagram, $, go) {
        dataManager = new DataManager(diagram, go);
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager;
        // 注册转换器,如果有多种情况，可以添加多个转换器
        dataManager.setNodeConverter('nodeCv1', this.nodeConvert);
        dataManager.setLinkConverter('linkCv1', this.linkConvert);
        // 模拟获取数据并添加结果
        getTestData().then(res => {
          res.nodes.forEach(n => {
            dataManager.addNode(n, 'nodeCv1');
          });
          res.links.forEach(l => {
            dataManager.addLink(l, 'linkCv1');
          });
        });
      },
      nodeConvert(data) {
        let nodeData = {
          key: data.nodeCode,
          label: { text: data.title, margin: [5, 10, 5, 10] }
        };
        nodeData._originData = data;
        let strokeColor = { hover: '#f0f5ff' };
        switch (data.level) {
          case '01':
            strokeColor.normal = '#389e0d';
            break;
          case '02':
            strokeColor.normal = '#722ed1';
            break;
          case '03':
            strokeColor.normal = '#c41d7f';
            break;
        }
        nodeData.strokeColor = strokeColor;
        nodeData.strokeWidth = 8;
        if (data.type === '01') {
          nodeData.shape = 'clipImage';
          nodeData.image = '/xdh-go/img/node/circleimage/8.png';
        } else {
          nodeData.shape = 'icon';
          let icon = { font: '24px "iconfont"' };
          switch (data.type) {
            case '02':
              icon.text = '\uE64a';
              break;
            case '03':
              icon.text = '\uE65b';
              break;
            case '04':
              icon.text = '\uE674';
              break;
          }
          nodeData.icon = icon;
        }
        // 添加其它node的配置
        nodeData.labelBackground = { normal: '#fff566', hover: '#ffffb8' };
        return nodeData;
      },
      linkConvert(data) {
        let linkData = { from: data.from, to: data.to, label: data.title };
        let lineColor = '';
        let lineWidth = { normal: 2, hover: 4 };
        switch (data.type) {
          case '01':
            lineColor = '#d48806';
            break;
          case '02':
            lineColor = '#389e0d';
            break;
        }
        linkData.lineColor = lineColor;
        linkData.lineWidth = lineWidth;
        linkData.labelColor = '#3f6600';
        linkData._originData = data;
        return linkData;
      },
      addDupNode() {
        // 添加一个nodeCode已存在的节点，但level不相同
        dataManager.addNode(
          {
            level: '02',
            nodeCode: '7',
            title: 'title6',
            type: '03'
          },
          'nodeCv1',
          {
            duplicate: 'replace'
          }
        );
      }
    },
    mounted() {}
  };
</script>
```

:::
