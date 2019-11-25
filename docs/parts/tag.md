# tag

::: tip 提示
parts(部件)部分提供了一些常见的组成节点的部件,直接使用可以快速构建节点
:::

可作为数据绑定参数：
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|name|标签名称|String|-|''|
|placement|标签位于容器的位置|String|'top-right'/'top'/'top-left'/'left'/'center'/'right'/'bottom-left'/'bottom'/'bottom-right'|'top-right', 父容器须为'Spot'布局|
|figure|文本框形状|String|-|'RoundedRectangle'|
|background|文本框背景色|String|-|'#eb2f96'|
|stroke|文本框边框颜色|String/null|-|'#780650'|
|strokeWidth|文本框边框宽度|Number|-|1|
|strokeDashArray|文本框边框虚线|Array/null|如[8,4,8,4]|null|
|color|文本颜色|String|-|'#000'|
|margin|文本边距|Number|-|5|
|font|文本字体|String|-|'14px "Microsoft Yahei"'|
|text|文字默认值|String/Array|如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1',color: 'red', background: 'transparent', font: '14px "Microsoft Yahei"', margin: [0, 10, 0, 10]}],每行文字可单独控制样式|''|
|show|是否可见|Boolean|-|true|
|dataKey|数据绑定时的字段名|String|-|'tagData'|
|props|最外层的 go.Panel 参数|Object|-|{}|
|events|go.GraphObject 点击事件|Object|-|{}|

figure 可选值：
"Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"

## 基本用法

文本块，支持单行文本和多行文本

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :node-template-map="nodeTemplateMap"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, nodeTmpl } from 'xdh-go'
  let { tag, node } = utils
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            category: 'rect',
            tagData: {
              text: [
                { text: '多行文本1' },
                {
                  text: '多行文本2',
                  margin: 10,
                  font: '18px "Microsoft Yahei"',
                  color: '#237804',
                  background: '#feffe6'
                }
              ]
            }
          },
          {
            category: 'rect',
            tagData: {
              text: '单行文本',
              strokeDashArray: [8, 4, 8, 4],
              background: 'green',
              color: '#fff'
            }
          },
          {
            category: 'circle',
            tagData: {
              text: '\uE65F'
            }
          }
        ]
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.GridLayout, {})
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add(
          'rect',
          node($, go, {
            parts: [
              tag($, go, {
                figure: 'RoundedRectangle',
                background: '#eb2f96',
                stroke: '#780650',
                color: '#000',
                strokeWidth: 2
              })
            ]
          })
        )

        map.add(
          'circle',
          node($, go, {
            parts: [
              tag($, go, {
                figure: 'Circle',
                background: '#69c0ff',
                font: '18px "iconfont"',
                stroke: null,
                color: '#fff',
                strokeWidth: 2,
                margin: 0
              })
            ]
          })
        )
        return map
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::

## 与通用节点结合

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :node-template-map="nodeTemplateMap"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, nodeTmpl } from 'xdh-go'
  let { tag, node } = utils
  function addTags($, go, tagArr) {
    let arr = []
    tagArr.forEach(r => {
      arr.push(
        tag($, go, {
          name: r.name,
          text: r.icon,
          figure: 'Circle',
          background: '#69c0ff',
          placement: [0.5, 0.3],
          font: '16px "iconfont"',
          stroke: null,
          color: '#fff',
          strokeWidth: 2,
          margin: 0,
          props: {
            opacity: 0
          },
          events: {
            click(e, n) {
              alert('点击了' + n.name)
            }
          }
        })
      )
    })
    return arr
  }
  function addAnimate(animateArr) {
    let arr = []
    for (let i = 0; i < animateArr.length; i++) {
      let r = animateArr[i]
      arr.push(
        {
          trigger: 'mouseEnter',
          keyFrame: [0, 1],
          duration: 500,
          prop: 'opacity',
          keyProp: 'number',
          easingFunc: ['easeInOutQuart'],
          objectName: r.name
        },
        {
          trigger: 'mouseLeave',
          keyFrame: [1, 0],
          duration: 500,
          prop: 'opacity',
          keyProp: 'number',
          easingFunc: ['easeInOutQuart'],
          objectName: r.name
        },
        {
          trigger: 'mouseEnter',
          keyFrame: [[0, 0], r.spot],
          prop: 'position',
          keyProp: 'point',
          easingFunc: ['easeInOutQuart', 'easeInQuint'],
          objectName: r.name
        },
        {
          trigger: 'mouseLeave',
          keyFrame: [r.spot, [0, 0]],
          prop: 'position',
          keyProp: 'point',
          easingFunc: ['easeInOutQuart', 'easeInQuint'],
          objectName: r.name
        }
      )
    }
    arr.push({
      trigger: 'mouseEnter',
      keyFrame: [0, 360],
      duration: 500,
      prop: 'angle',
      keyProp: 'number',
      easingFunc: ['easeInOutQuart'],
      objectName: 'tFigure'
    })
    return arr
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            category: 'node',
            tagData: {
              text: '99+',
              placement: 'top-left'
            },
            label: 'with commonNode'
          },
          {
            category: 'animate',
            label: 'with animate'
          }
        ]
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.GridLayout, {})
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()

        map.add(
          'node',
          nodeTmpl($, go, {
            props: {
              _figurePanelOptions: {
                parts: [
                  tag($, go, {
                    figure: 'Circle',
                    background: 'red',
                    font: '14px "Microsoft Yahei"',
                    placement: 'top-right',
                    stroke: 'yellow',
                    color: '#fff',
                    strokeWidth: 2,
                    margin: 0
                  })
                ]
              }
            }
          })
        )
        map.add(
          'animate',
          nodeTmpl($, go, {
            props: {
              animation: addAnimate([
                { name: 'Tag1', spot: [-30, 0] },
                { name: 'Tag2', spot: [-30, 50] },
                { name: 'Tag3', spot: [110, 0] },
                { name: 'Tag4', spot: [110, 50] }
              ]),
              _figurePanelOptions: {
                parts: [
                  $(
                    go.Panel,
                    'Position',
                    {
                      alignment: new go.Spot(0.5, 0.5)
                    },
                    ...addTags($, go, [
                      { name: 'Tag1', icon: '\uE664' },
                      { name: 'Tag2', icon: '\uE740' },
                      { name: 'Tag3', icon: '\uE763' },
                      { name: 'Tag4', icon: '\uE78a' }
                    ])
                  )
                ]
              }
            }
          })
        )
        return map
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::
