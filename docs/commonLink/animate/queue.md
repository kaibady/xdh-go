# 动画衔接

通过 name 和 prevName 属性，可以定义同一事件多个动画的先后次序。如果没有定义 prevName，则动画马上执行；如果没找到与 prevName 匹配的动画 name，该动画将不执行。

另外，在顺次执行多个动画时，有可能需要控制每段动画的开始和结束。配置提供了 beforeStart 和 animationFinish 来进行回调，如果没有返回值，或者返回值为 true，则继续执行，如果返回值为 false,则动画会阻断。

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
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go'
  let nodes = []
  for (let i = 0; i < 2; i++) {
    let pairs = Math.floor(i / 2)
    let label = ['sLine']
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
        model: 'GraphLinksModel',
        nodes: nodes,
        links: [
          {
            from: 1,
            to: 2,
            arrows: 'from,to',
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate1',
                objectName: 'sToArrow',
                duration: 500,
                beforeStart: (obj, node, diagram, go) => {
                    // 箭头由于默认为go.Link.OrientAlong,所以会阻止旋转，设为go.Link.Node后，angle才会生效
                   obj.segmentOrientation = go.Link.None
                },
                prop: 'angle',
                keyFrame: [0, 360],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                prevName: 'animate1',
                objectName: 'sLinkNode',
                duration: 500,
                prop: 'angle',
                keyFrame: [0, -10],
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
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        })
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
            labelColor: '#fff'
          }
        })
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::
