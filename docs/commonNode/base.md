# 使用方法

工具定义了一个通用的节点方法，通过简单修改节点的参数，可以达到快速定义模板的目的。同时，节点的数据与模板的相关属性绑定，可覆盖节点模板的参数。

举个例子, 下图中，模板定义了节点默认 正常颜色为 '#f0f0f0', 鼠标经过颜色为 '#0000aa', node1 数据中没有定义 background，因此跟随模板的定义，而 node2 中数据定义了 background, 数据的优先级比模板高，覆盖了模板参数。

基本定义形式

```
import { nodeTmpl, textBlock } from 'xdh-go';
nodeTmpl($, go, {
    props: {
    shape: 'Circle',
    background: {
        normal: '#f0f0f0',
        hover: '#0000aa'
    },
    strokeColor: 'red',
    labelBackground: 'transparent'
    },
    /**
      parts中的元素会添加到node尾部，在节点中呈现出来则是覆盖在所有对象前面。如果要区分前后关系可以用另一种定义形式
      parts: {
        up: [textBlock($, go)], // 覆盖在节点前方
        down: [textBlock($, go)] // 在节点底部
      }
    **/
    parts: [
      textBlock($, go)
    ]
})
nodes=  [
          {
            label: 'node1'
          },
          { label: 'node2', background: { normal: '#f06600' } }
        ]
```

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="200px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  let imgPath = '/xdh-go/';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: {
              font: '18px "Microsoft Yahei"',
              margin: 5,
              text: [{ text: '灰度模式文本1' }, { text: '灰度模式文本2' }]
            },
            labelColor: {
              hover: 'blue'
            },
            containerShape: null,
            isGray: true
          },
          {
            shape: 'clipImage',
            image: imgPath + 'img/node/circleimage/1.png',
            stateShape: 'Circle',
            label: [{ text: '文本1' }, { text: '文本2' }],
            labelColor: {
              hover: 'blue'
            },
            containerShape: null
          },
          {
            label: {
              text: [{ text: 'node2' }, { text: 'node2' }]
            },
            layout: 'Horizontal',
            size: 40,
            shape: 'Rectangle',
            background: { normal: '#f06600' }
          },
          {
            label: 'node3',
            layout: 'Spot',
            labelColor: {
              hover: 'red'
            },
            labelStroke: {
              hover: 'transparent'
            },
            tag: {
              placement: 'top-right',
              text: '级别1'
            }
          }
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
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            background: {
              normal: '#f0f0f0',
              hover: '#0000aa'
            },
            size: 80,
            labelBackground: 'transparent'
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

以下通用节点参数分类，定义时通过 nodeTmpl 第三个参数的 props 传入，或在节点数据中定义。

### 参数状态

一些参数包含了 5 种状态：

> normal: 正常状态;

> highlight:节点 isHighlighed 为 true;

> hover:鼠标经过时;

> select:节点为选中状态;

> gray:灰度模式。

在使用时可为不同状态定义不同的颜色或宽度。

### 图形类型

多个参数使用 go.Shape 的内置图形类型，包括：
"Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"

### 布局类型

layout 参数类型来自 go.PanelLayout 类型，包括:
'Position'，'Horizontal', 'Vertical', 'Spot', 'Auto',
'Table', 'Viewbox', 'TableRow', 'TableColumn', 'Link',
'Grid', 'Graduated'

### 节点参数

| 参数                 | 参数说明                                      | 类型         | 可选值                                                    | 默认值                              |
| -------------------- | --------------------------------------------- | ------------ | --------------------------------------------------------- | ----------------------------------- |
| layout               | 节点布局（即图形和文字的排布方式）            | String       | 常用:'Vertical'/'Horizontal'/'Spot',其余见 go.PanelLayout | 'Vertical'                          |
| opacity              | 节点透明度                                    | Number       | 0~1                                                       | 1                                   |
| scale                | 节点缩放比                                    | Number       | -                                                         | 1                                   |
| nodeMargin         | 节点内容的外边距，影响节点的占位及 tag 的位置 | Number/Array | -                                                         | 20                                  |
| containerShape       | 节点的外框形状                                | String/null  | null/(go.Shape 内置图形类型)                              | null,不可见                         |
| containerBackground  | 节点的外框背景色                              | Object       | -                                                         | gray 状态为#ccc,其余状态为'#85a5ff' |
| containerStrokeColor | 节点的外框边框色                              | Object       | -                                                         | gray 状态为#ccc,其余状态为'#061178' |
| linkPort                  | 连线指向节点的哪个位置                         | String       | 'tNode'/'tFigure'/'tLabel'/'tState'/'tShape'/'tIcon'/'tHolder'                                                         | 'tFigure'                               |
| loc                  | 节点位置,双向数据绑定                         | String       | -                                                         | '0 0'                               |
| zOrder                  | 节点层叠顺序                         | Number       | -                                                         | 0                               |

### 图形相关参数

| 参数                       | 参数说明                | 类型          | 可选值                                               | 默认值                                                      |
| -------------------------- | ----------------------- | ------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| shape                      | 图形类型                | String        | 'image'/'clipImage'/'icon'/(go.Shape 内置图形类型)   | 'Rectangle'                                                 |
| stateShape                 | 状态框形状              | String        | go.Shape 内置图形类型                                | 'Circle'                                                    |
| size                       | 图形的尺寸              | Number/Array  | Number 类型时，宽高一致；如果是数组类型，则为[宽,高] | [50,50]                                                     |
| figureMargin         | 图形的外边距 | Number/Array | -                                                         | 20                                  |
| background                 | 图形背景色              | Object/String | -                                                    | gray 状态为'#ccc',其它为'#91d5ff'                           |
| strokeColor                | 状态框边框色            | Object/String | -                                                    | gray 状态为'#ccc',normal 为'#0050b3',其它为'#c41d7f'        |
| strokeWidth                | 状态框边框宽度          | Number        | -                                                    | 五种状态，默认为 2                                          |
| shapeParams                | 图形的形状参数          | Object        | -                                                    | -                                                           |
| shapeParams.figureShape    | shape 形状参数          | Object        | -                                                    | {parameter1: NaN,parameter2: NaN,geometryString: undefined} |
| shapeParams.clipShape      | clipShape 形状参数      | Object        | -                                                    | {parameter1: NaN,parameter2: NaN,geometryString: undefined} |
| shapeParams.stateShape     | stateShape 形状参数     | Object        | -                                                    | {parameter1: NaN,parameter2: NaN,geometryString: undefined} |
| shapeParams.containerShape | containerShape 形状参数 | Object        | -                                                    | {parameter1: NaN,parameter2: NaN,geometryString: undefined} |

### image/clipImage 相关参数

shape 参数为'image'/'clipImage'时有效
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|image|图片地址|String|-|undefined|
|brokenImage|加载失败时默认显示的图片地址|String|-|undefined|
|clipShape|图片的裁剪外框,shape 为'clipImage'时有效|String/null|go.Shape 预置图形类型，如果传 null 则不裁剪|'Circle'|

### icon 相关参数

shape 参数为'icon'时有效
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|icon|字体图标类型参数|Object/String|-|-|
|icon.font|字体图标 iconfont|String|-|'30px "iconfont"',font-family 类型默认为 iconfont|
|icon.text|字体图标内容|String|-|'\uE7BD'|
|iconColor|图标颜色|Object/String|-|gray 状态为'#ccc', 其它为'#1890ff'|

### label 相关参数

| 参数            | 说明               | 类型          | 可选值                                                                               | 默认值                                    |
| --------------- | ------------------ | ------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| label           | 文字内容及样式     | Object/String | -                                                                                    | -                                         |
| label.text      | 文字内容           | Array/String  | 如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1'}] | ''                                        |
| label.editable  | 文字内容是否可编辑 | Boolean       | -                                                                                    | false                                     |
| label.show      | 文字内容是否显示   | Boolean       | -                                                                                    | true                                      |
| label.font      | 文字样式           | String        | -                                                                                    | '14px "iconfont"'                         |
| label.margin    | 文字外边距         | Number        | -                                                                                    | 10                                        |
| labelStroke     | 文字外框边框色     | Object/String | -                                                                                    | 五种状态, 默认'transparent'               |
| labelColor      | 文字颜色           | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'#000'        |
| labelBackground | 文字框背景色       | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'transparent' |

### tag 相关参数

节点附加标签
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|tag|节点附加标签相关参数|Object|-|-|
|tag.placement|标签位置|String|'top-right'/'top'/'top-left'/'left'/'center'/'right'/'bottom-left'/'bottom'/'bottom-right'|'top-right'|
|tag.text|文本内容|String|-|''|
|tag.color|文本颜色|String|-|'#000'|
|tag.figure|文字外框形状|String|go.Shape 内置图形|'RoundedRectangle'|
|tag.background|文本框背景色|String|-|'#40a9ff'|
|tag.stroke|文本框边框色|String|-|'#003a8c'|
|tag.strokeWidth|文本框边框宽度|Number|-|1|
|tag.strokeDashArray|文本框边框虚线设置|null/Array|-|null|
|tag.font|文本样式|String|-|'14px "Microsoft Yahei"'|
|tag.margin|文本的外边距|Number/Array|-|5|

### tooltip 相关参数

tooltip 提示参数
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|tooltip|tooltip 相关参数|Object|-|-|
|tooltip.stroke|tooltip 边框颜色|String|-|'#003a8c'|
|tooltip.color|tooltip 文本颜色|String|-|'#fff'|
|tooltip.strokeWidth|tooltip 文本框边框宽度|Number|-|1|
|tooltip.font|文本样式|String|-|'14px "Microsoft Yahei"'|
|tooltip.background|文本框背景色|String|-|'rgba(0,0,0,0.6)'|
|tooltip.text|文本内容|String|-|''|

## 动效参数

动效参数可再节点模板中定义，也可在节点数据中定义
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| animation | 动画参数 | [Object] | - | - |
| animation[n].trigger | 动画触发事件 | String | 'mouseEnter'/ 'mouseLeave'/'click'/'dbclick'| 'mouseEnter' |
| animation[n].objectName | 动画施加的对象名称或者节点数据的属性 | String | 1.通用节点：'tNode'(节点对象)/'tFigure'(图形对象)/'tLabel'(文字对象)/'tTag'(标签) 2.自定义对象的 name 名称。3.节点数据'data',或对象内的属性，如, 'data.strokeWidth' |''|
| animation[n].prop | 动画对象需要变更的属性 | String | -|''|
| animation[n].propType | 动画对象属性的类型， | String |'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'|根据 prop 自动匹配属性的类型，但有些属性可以有多种类型，需指定|
| animation[n].keyFrame | 动画开始和结束的属性值 | Array | 根据 propType 变化 |[0, 1]|
| animation[n].name | 动画名称，与 prevName 配合使用 | String | - |''|
| animation[n].prevName | 上一个动画名称，如果为空字串则直接执行，如果不为空则在指定动画结束后再执行 | String | - |''|
| animation[n].duration | 动画持续时间，毫秒 | Number | -|300|
| animation[n].delay | 动画延迟的时间，毫秒 | Number | - |0|
| animation[n].repeatCount | 动画重复的次数 | Number | - |1|
| animation[n].direction | 动画重复时，偶数次是否反向播放 | String | 'normal'/'alternate' |'normal'|
| animation[n].easingFunc | 动画速度曲线 | [String/Function],String 类型是内置方法名称，Function 类型为自定义方法 | - |['easeInQuad']|