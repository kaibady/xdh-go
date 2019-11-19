# 指定不同的内部对象

内部对象包括 sLinkNode, sLine, sLineHolder, sLabel, sFromArrow, sToArrow。 为了更方便查看动画效果，下面的连线被特意加粗。
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
      height="900px"
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
      'sLinkNode',
      'sLine',
      'sLineHolder',
      'sLabel',
      [{ text: 'sFromArrow' }, { text: 'sToArrow' }]
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
        model: 'GraphLinksModel',
        nodes: nodes,
        links: [
          {
            from: 3,
            to: 4,
            label: 'try click',
            animation: [
              {
                trigger: 'click',
                objectName: 'sLinkNode',
                duration: 500,
                prop: 'angle',
                keyFrame: [0, -10],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            from: 1,
            to: 2,
            label: 'try mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLine',
                duration: 1000,
                prop: 'stroke',
                propType: 'rgba',
                keyFrame: [
                  [56, 158, 13, 1],
                  [196, 29, 127, 1]
                ],
                easingFunc: ['easeInQuad']
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
                name: 'animate2',
                objectName: 'sLineHolder',
                duration: 800,
                prop: 'stroke',
                keyFrame: [
                  [0, 0, 0, 0],
                  [211, 173, 247, 0.8]
                ],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            from: 7,
            to: 8,
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
            from: 9,
            to: 10,
            label: 'try mouseEnter',
            arrows: 'from,to',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sFromArrow',
                duration: 800,
                prop: 'angle',
                keyFrame: [0, 360],
                beforeStart: (obj, node, diagram, go) => {
                  // 箭头由于默认为go.Link.OrientAlong,所以会阻止旋转，设为go.Link.Node后，angle才会生效
                  obj.segmentOrientation = go.Link.None
                },
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'sToArrow',
                duration: 800,
                prop: 'angle',
                keyFrame: [0, 360],
                beforeStart: (obj, node, diagram, go) => {
                  // 箭头由于默认为go.Link.OrientAlong,所以会阻止旋转，设为go.Link.Node后，angle才会生效
                  obj.segmentOrientation = go.Link.None
                },
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
