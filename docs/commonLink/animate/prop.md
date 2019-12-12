# 支持属性
prop 参数用于指定对连线或内部对象的哪个属性施加动画（见下方"常用参数与类型"）。由于各属性使用的数据类型不相同，需要通过 propType 进行指定。（包括'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'/'array'）动画内部会通过 prop 自动匹配数据类型,但某些参数可能会有多种类型，有时需要显式定义。
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
      height="600px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go'
  let nodes = []
  for (let i = 0; i < 6; i++) {
    let pairs = Math.floor(i / 2)
    let label = [
      'angle:number',
      'strokeDashArray:array',
      'position:point'
    ]
    nodes.push({
      key: String(i + 1),
      label: label[pairs]
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
        nodes: nodes,
        links: [
          {
            from: 1,
            to: 2,
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate2',
                objectName: 'sLabel',
                duration: 800,
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
                objectName: 'sLine',
                name: 'lineAni1',
                duration: 2000,
                prop: 'strokeDashArray',
                propType: 'array',
                keyFrame: [
                  [0, 1000],
                  [1000, 1000]
                ],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            from: 5,
            to: 6,
            label: 'try mouseEnter',
            tokenShow: true,
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sToken',
                duration: 800,
                prop: 'position',
                propType: 'point',
                keyFrame: [
                  [0, 0],
                  [100, 0]
                ],
                easingFunc: ['easeInOutCubic']
              }
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
            labelBackground: '#ff85c0',
            labelColor: '#fff',
            _innerPanelOptions: {
              props: { type: go.Panel['Position'] },
              parts: [
                $(  
                  go.Shape,
                  'Circle',
                  {
                    name: 'sToken',
                    width: 12,
                    height: 12,
                    fill: 'green',
                    strokeWidth: 0
                  },
                  new go.Binding('fill', 'color'),
                  new go.Binding('visible', '', h => {
                    if (h.tokenShow) {
                      return true
                    } else {
                      return false
                    }
                  })
                )
              ]
            }
          }
        })
      },
      diagramReady(diagram, $, go) {
        diagram.add(
          $(
            go.Part,
            { locationSpot: go.Spot.Center, layerName: 'Foreground' },
            $(
              go.Shape,
              'Circle',
              { width: 12, height: 12, fill: 'green', strokeWidth: 0 },
              new go.Binding('fill', 'color')
            )
          )
        )
      }
    }
  }
</script>
```

:::