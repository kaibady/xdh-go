
# 触发事件

包括 mouseEnter/mouseLeave/click/dbclick

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
      height="500px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go'
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            key: 1,
            label: 'click'
          },
          {
            key: 2,
            label: 'click'
          },
          {
            key: 3,
            label: 'mouseEnter/mouseLeave'
          },
          {
            key: 4,
            label: 'mouseEnter/mouseLeave'
          },
          {
            key: 5,
            label: 'dbclick'
          },
          {
            key: 6,
            label: 'dbclick'
          }
        ],
        links: [
          {
            from: 1,
            to: 2,
            label: 'try click',
            animation: [
              {
                trigger: 'click',
                objectName: 'sLabel',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 2],
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
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 2],
                easingFunc: ['easeInQuad']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'sLabel',
                duration: 300,
                prop: 'scale',
                keyFrame: [2, 1],
                easingFunc: ['easeOutQuart']
              }
            ]
          },
          {
            from: 5,
            to: 6,
            label: 'try doubleClick',
            animation: [
              {
                trigger: 'dbclick',
                objectName: 'sLabel',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 2],
                easingFunc: ['easeInQuad']
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
          layerSpacing: 20,
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
            toPortId: 'tFigure',
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