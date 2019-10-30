# 使用方法

工具定义了一个通用的连线方法，通过简单修改节点的参数，可以达到快速定义连线模板的目的。同时，连线的数据与模板的相关属性绑定，可覆盖连线模板的参数。

举个例子, 下图中，模板定义了连线默认 箭头形状为 'Standard', link1 数据中没有定义 arrows，因此跟随模板的定义，而 node2 中数据定义了 background, 数据的优先级比模板高，覆盖了模板参数。

基本定义形式

```
import { linkTmpl } from 'xdh-go';
linkTmpl($, go, {
    props: {
    arrows: {
      to: {
        type: 'Standard'
      }
    },
    label: {
      text: '标签内容'
    }
    }
})
links=  [
          {
            from: 'a',
            to: 'b',
            label: 'link1'
          },
          { from: 'c',
          to: 'd',
          label: 'link2', arrows: { type: 'Triangle' } }
        ]
```

## 示例

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template="nodeTemplate"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="400px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            key: 'a',
            label: 'node1'
          },
          {
            key: 'b',
            label: 'node2'
          },
          {
            key: 'c',
            label: 'node3',
            linkPort: 'tNode'
          },
          {
            key: 'd',
            label: 'node4',
            linkPort: 'tNode'
          }
        ],
        links: [
          { from: 'a', to: 'b', type: 'route' },
          { from: 'c', to: 'd', dashes: true, label: '虚线' }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, { setsPortSpots: false });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        });
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

# 默认参数

以下是通用节点的默认参数设置，定义时通过 linkTmpl 第三个参数的 props 传入。

### 参数状态

一些参数包含了 5 种状态：

> normal: 正常状态;

> highlight:节点 isHighlighed 为 true;

> hover:鼠标经过时;

> select:节点为选中状态;

> gray:灰度模式。

在使用时可为不同状态定义不同的颜色或宽度。

## 连线参数

| 参数            | 说明                   | 类型          | 可选值                                           | 默认值                                                |
| --------------- | ---------------------- | ------------- | ------------------------------------------------ | ----------------------------------------------------- |
| opacity         | 连线整体透明度         | Object        | -                                                | 1                                                     |
| dashes          | 虚线设置               | Boolean/Array | -                                                | false                                                 |
| type            | 连线类型               | String        | 'curve'(曲线)/ 'straight'(直线) / 'route'(路径)) | 'curve'                                               |
| fromShortLength | 连线始端与箭头的距离   | Number        | -                                                | 0                                                     |
| toShortLength   | 连线末端端与箭头的距离 | Number        | -                                                | 0                                                     |
| lineWidth       | 连线及箭头的线条宽度   | Number/Object | -                                                | normal 状态及 gray 状态为 1,其余为 2                  |
| lineColor       | 连线及箭头的线条颜色   | Number/Object | -                                                | normal 状态为'#000',gray 状态为'#ccc',其余为'#66b1ff' |

## 箭头

| 参数              | 说明             | 类型          | 可选值 | 默认值                            |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| arrows            | 箭头配置参数     | Object/String | -      | -                                 |
| arrows.from       | 始端箭头配置参数 | Object        | -      | -                                 |
| arrows.from.type  | 始端箭头形状     | String        | -      | 'Standard'                        |
| arrows.from.scale | 始端箭头缩放比   | Number        | -      | 1                                 |
| arrows.from.show  | 始端箭头是否显示 | Boolean       | -      | false                             |
| arrows.to         | 末端箭头配置参数 | Object        | -      | -                                 |
| arrows.to.type    | 末端箭头形状     | String        | -      | 'Standard'                        |
| arrows.to.scale   | 末端箭头缩放比   | Number        | -      | 1                                 |
| arrows.to.show    | 末端箭头是否显示 | Boolean       | -      | false                             |
| arrowFill         | 箭头内部颜色     | String/Object | -      | gray 状态为'#ccc'，其余默认'#000' |
| arrowStroke       | 箭头边框颜色     | String/Object | -      | gray 状态为'#ccc'，其余默认'#000' |

arrows 如果简写为字符串，如'from,to',则对应的箭头 show 属性为 true,其余跟随默认值

## label 文字

| 参数            | 说明               | 类型          | 可选值                                                                               | 默认值                                    |
| --------------- | ------------------ | ------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| label           | 文字内容及样式     | Object/String | -                                                                                    | -                                         |
| label.text      | 文字内容           | Array/String  | 如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1'}] | ''                                        |
| label.editable  | 文字内容是否可编辑 | Boolean       | -                                                                                    | false                                     |
| label.show      | 文字内容是否显示   | Boolean       | -                                                                                    | true                                      |
| label.font      | 文字样式           | String        | -                                                                                    | '14px "iconfont"'                         |
| label.margin    | 文字外边距         | Number        | -                                                                                    | 10                                        |
| label.offsetX   | 文字横向偏移量     | Number        | -                                                                                    | 0                                         |
| label.offsetY   | 文字纵向偏移量     | Number        | -                                                                                    | 0                                         |
| label.segment   | 文字位于连线的位置 | Number        | -                                                                                    | 1                                         |
| labelStroke     | 文字外框边框色     | Object/String | -                                                                                    | 五种状态, 默认'transparent'               |
| labelColor      | 文字颜色           | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'#000'        |
| labelBackground | 文字框背景色       | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'transparent' |
