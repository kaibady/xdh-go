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
      height="150px"
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
            label: [{ text: '文本1' }, { text: '文本2' }],
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
            containerShape: null,
            isGray: true
          },
          {
            label: {
              text: [{ text: 'node2' }, { text: 'node2' }]
            },
            layout: 'Horizontal',
            size: 40,
            shape: 'Rectangle',
            isGray: true,
            background: { normal: '#f06600' }
          },
          {
            label: 'node3',
            layout: 'Vertical',
            labelColor: {
              hover: '#fff'
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

以下通用节点参数分类，定义时通过 nodeTmpl 第三个参数的 props 传入，或再节点数据中定义。
### 参数状态
一些参数包含了5种状态：normal: 正常状态;highlight:节点isHighlighed为true;hover:鼠标经过时;select:节点为选中状态;gray:灰度模式。在使用时可为不同状态定义不同的颜色或宽度。
### 图形类型
多个参数使用go.Shape的内置图形类型，包括：
"Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"
### 节点参数
|参数|参数说明|类型|可选值|默认值|
|----|-------|----|----|----|
|layout| 节点布局（即图形和文字的排布方式）|String|常用:'Vertical'/'Horizontal'/'Spot',其余见go.PanelLayout|'Vertical'|
|hidden| 节点是否可见 |Boolean|false/true|false|
|shape| 图形类型 |String|'image'/'clipImage'/'icon'/(go.Shape内置图形类型)|'Rectangle'|
|stateShape| 状态框形状 |String|go.Shape内置图形类型|'Circle'|
|figureMargin| 图形的外边距，影响节点的占位及tag的位置 |Number/Array|-|20|
|containerShape| 节点的外框形状 |String/null|null/(go.Shape内置图形类型)|null,不可见|
|containerBackground| 节点的外框背景色 |Object|-|gray状态为#ccc,其余状态为'#85a5ff'|
|containerStrokeColor| 节点的外框边框色 |Object|-|gray状态为#ccc,其余状态为'#061178'|
|loc| 节点位置,双向数据绑定 |String|-|'0 0'|

### image/clipImage相关参数
shape参数为'image'/'clipImage'时有效
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|image|图片地址|String|-|undefined|
|brokenImage|加载失败时默认显示的图片地址|String|-|undefined|
|clipShape|图片的裁剪外框,shape为'clipImage'时有效|String|-|'Circle'|

### icon相关参数
shape参数为'icon'时有效
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|icon|字体图标类型参数|Object/String|-|-|
|icon.iconfont|字体图标iconfont|String|-|'30px "iconfont"',font-family类型默认为iconfont|
|icon.text|字体图标内容|String|-|'\uE7BD'|


```
/**
状态值说明：
    normal：正常状态,
    highlight: 节点isHighlighted为true时
    select: 节点isSelected为true是
    hover: 节点鼠标经过时
    gray: 灰度模式，通过数据中的isGray控制
**/
{
     /**
        图形类型，包括:
        icon 字体图标类型
        image 图片类型
        clipImage 带裁剪形状的图片类型
        其它类型都判断为 go.Shape 所预定义的形状类型，如Rectangle等
     **/
    shape: 'Rectangle',

    // 节点布局
    // 可选值：'Position'，'Horizontal', 'Vertical', 'Spot', 'Auto',
    //     'Table', 'Viewbox', 'TableRow', 'TableColumn', 'Link',
            'Grid', 'Graduated',
    layout: 'Vertical',

    // 是否隐藏节点，占位仍在，只设置透明度为0
    hidden: false,

    // 图片地址，shape为 'image'或'clipImage'时有效
    image: undefined,

    // 如果图片加载失败，所要显示的图片地址
    brokenImage: undefined,

    // 裁剪形状，shape为 clipImage时有效
    clipShape: 'Circle',

    // 状态框, 设为null时不显示
    stateShape: 'Circle'

    // 背景色
    background: {
      normal: 'yellow',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },

    // 边框颜色，可简写, 如 strokeColor: '#ccc',简写时四种状态都为同一种颜色
    strokeColor: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },

    // 边框宽度，可简写, 如 strokeWidth: 1,简写时四种状态都为同一宽度
    strokeWidth: {
      normal: 3,
      highlight: 4,
      hover: 4,
      select: 5
    },

    // 整个节点的放大比例
    scale: 1,

    // 节点图标区域的尺寸，宽高相同
    size: 25,

    // 节点字体图标内容，shape为icon时有效
    icon: {
      iconfont: '30px "iconfont"',
      text: '\uE7BD'
    },

    // 节点位置，双向数据绑定
    loc: '0 0',

    // tooltip提示，如果text的内容为空，则不显示tooltip
    tooltip: {
      stroke: 'rgba(0,0,0,0.6)',  // tooltip边框颜色
      background: '',   // tooltip背景色
      text: ''
    },

      // 标签内容及样式, 可简写,如 label: 'node1', 简写时文本内容会赋值给text,其它与默认值相同
    label: {
      text: '',
      show: true,
      editable: false,
      font: '14px "iconfont"',
      margin: [10, 10, 10, 10]
    },

     // 标签颜色, 可简写, 如 labelStroke: '#ccc',简写时四种状态都为同一种颜色
    labelStroke: {
      normal: '#000',
      highlight: '#fff',
      hover: '#fff',
      select: '#fff'
    },
   // 标签文字，可简写, 如 labelColor: '#ccc',简写时四种状态都为同一种颜色
    labelColor: {
      normal: '#000',
      highlight: '#000',
      hover: '#000',
      select: '#000'
    },

     // 标签背景色，可简写, 如 labelBackground: '#ccc',简写时四种状态都为同一种颜色
    labelBackground: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    }
  };
}
```
