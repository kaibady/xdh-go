# mark

标记圈

方法参数：
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|figure|文本框形状|String|-|'Circle'|
|fill|文本框背景色|Object|-|渐变色配置 {0.0: 'rgba(0,0,0,0)',0.67: 'rgba(255,242,0,0.1)',0.8: 'rgba(255,242,0,0.5)',1: 'rgba(255,242,0,1)'}|
|size|圈大小|Number|-|70|
|visibleKey|数据绑定是否显示字段名称|String|-|'mark'|
|colorKey|数据绑定颜色字段名称|String|-|'markFill'|

figure 可选值：
"Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"

## 基本用法

标记圈，用于对节点进行强调。示例：试点击红色圈节点

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
  import { XdhGo, utils, go } from 'xdh-go'

  let { mark, node, textBlock } = utils
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            category: 'mark1',
            mark: true
          },
          {
            category: 'mark2',
            showMark: true,
            fill: {
              0: 'rgba(255,0,0,0)',
              0.65: 'rgba(255,0,0,0)',
              0.9: 'rgba(255,0,0,0.5)',
              1: 'rgba(255,0,0,0.8)'
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
          'mark1',
          node($, go, {
            parts: [
              mark($, go),
              textBlock($, go, {
                props: {
                  text: '默认参数'
                }
              })
            ]
          })
        )

        map.add(
          'mark2',
          node($, go, {
            type: 'auto',
            parts: [
              mark($, go, {
                size: 120,
                visibleKey: 'showMark',
                colorKey: 'fill'
              }),
              textBlock($, go)
            ],
            events: {
              click(ev, obj) {
                let node = obj.part
                node.diagram.model.set(
                  node.data,
                  'showMark',
                  !node.data.showMark
                )
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

## 与通用节点结合

在通用节点中使用，通常插入到扩展参数的\_figurePanelOptions 的 parts 参数中，试点击节点

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
  let { mark, node, textBlock } = utils
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
            showMark: true,
            shape: 'clipImage',
            image: '/xdh-go/img/node/circleimage/1.png',
            clipShape: 'Circle',
            stateShape: 'Circle',
            label: 'mark with CommonNode',
            fill: {
              0: 'rgba(255,0,0,0)',
              0.65: 'rgba(255,0,0,0)',
              0.9: 'rgba(255,0,0,0.5)',
              1: 'rgba(255,0,0,0.8)'
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
          'node',
          nodeTmpl($, go, {
            props: {
              _figurePanelOptions: {
                parts: [
                  mark($, go, {
                    size: 80,
                    visibleKey: 'showMark',
                    colorKey: 'fill'
                  })
                ]
              }
            },
            events: {
              click(ev, obj) {
                let node = obj.part
                node.diagram.model.set(
                  node.data,
                  'showMark',
                  !node.data.showMark
                )
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
