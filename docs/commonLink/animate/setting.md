# 动画设置

动画相关设置包括 delay(动画延时毫秒数), duration(动画持续时间),repeatCount(动画重复次数), direction(重复方式), easingFunc(属性变化曲线)。

其中 easingFunc 数组内的缓动方法与不同属性类型数组内的数值一一对应。

另外，如果遇到 propType 中不包含的属性类型，可以使用 stateParser自行处理，返回一个特定的对象。

如果设置了stepCallback，则在每侦动画发生时不会自动给prop定义的参数赋值，赋值操作在stepCallback内部自行处理 

比较下面的示例了解用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="800px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go'
  let nodes = []
  for (let i = 0; i < 10; i++) {
    let pairs = Math.floor(i / 2)
    let label = [
      'delay\nduration',
      'repeatCount\ndirection',
      'stepCallback',
      'customEasing',
      'stateParse'
    ]
    nodes.push({
      key: String(i + 1),
      label: label[pairs]
    })
  }
  function getToken($, go) {
    return $(
      go.Part,
      { locationSpot: go.Spot.Center },
      $(
        go.Shape,
        'Circle',
        { width: 12, height: 12, fill: 'green', strokeWidth: 0 },
        new go.Binding('fill', 'color')
      )
    )
  }
  function customEasing(x) {
    return Math.floor(x * 6) / 6
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        diagram: null,
        tokenPart: null,
        model: 'GraphLinksModel',
        nodes: nodes,
        links: [
          {
            from: 1,
            to: 2,
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLabel',
                delay: 500,
                duration: 2000,
                prop: 'angle',
                keyFrame: [0, 360],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            from: 3,
            to: 4,
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLabel',
                repeatCount: 4,
                direction: 'alternate',
                duration: 400,
                prop: 'angle',
                keyFrame: [0, 30],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            from: 5,
            to: 6,
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                duration: 1000,
                // 由于不是内部对象，所以objectName,prop和propType参数都可以省略
                // 在动画发生前添加一个part
                beforeStart: (obj, node, diagram, go) => {
                    diagram.add(this.tokenPart)
                },
                // 由于tokenPart不是节点的内部对象，所以要在stepCallback中自行赋值处理
                stepCallback: (state, propType, obj, link, diagram, go) => {
                    this.tokenPart.location = link.path.getDocumentPoint(
                        link.path.geometry.getPointAlongPath(state, new go.Point())
                  )
                },
                // 在动画发生后移除
                animationFinish: (obj, link, diagram, go) => {
                  diagram.remove(this.tokenPart)
                },
                keyFrame: [0, 1],
                easingFunc: ['easeInQuad']
              }
            ]
          },
          {
            from: 7,
            to: 8,
            label: 'try mouseEnter-custom easingFunc',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLabel',
                duration: 6000,
                prop: 'angle',
                keyFrame: [0, 360],
                // 自定义缓动
                easingFunc: [customEasing]
              }
            ]
          },
          {
            from: 9,
            to: 10,
            label: 'try mouseEnter-stateParser',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLabel',
                duration: 6000,
                prop: 'angle',
                keyFrame: [0, 360]
              },
              {
                trigger: 'mouseEnter',
                objectName: 'sLabel',
                duration: 6000,
                keyFrame: [0, 360],
                // 由于颜色只支持rgba,如果想通过动画的state获取hsla颜色空间值，需要用stateParser
                stateParser: (state, propType, obj, link, diagram, go) => {
                   return `hsla(${state},100%,50%,1)`
                },
                stepCallback: (state, propType, obj, link, diagram, go) => {
                    // sLabel外层为go.Panel对象，不能直接赋值，因此要通过model.set或者查找内部的Shape对象给其赋值
                     diagram.model.set(link.data, 'labelBackground', state)
                }
              },
            ]
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
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 200,
          columnSpacing: 10,
          isOngoing: false
        })
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80
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
            fromShortLength: 10,
            toShortLength: 10,
            toPortId: 'tFigure',
            lineWidth: 6,
            arrowStrokeWidth: 6,
            labelStroke: '#f759ab',
            labelBackground: '#ff85c0'
          }
        })
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram
        this.tokenPart = getToken($, go)
      }
    }
  }
</script>
```

:::
