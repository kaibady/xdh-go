# 指定不同的内部对象

objectName 指通用节点的内部对象定义的内，其中 tNode 指整个节点，tFigure 指图形部分，tLabel 指文字部分,tTag 指标签部分。如果通过扩展参数插入了其它部件，可自定义 name 并通过数据 animation.objectName 指定动画。 示例：鼠标放到各节点上，并比较差别
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
      height="250px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag } = utils;
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
            label: 'tNode',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: 'tFigure',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },

          {
            key: 3,
            label: 'tLabel',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 4,
            label: 'tTag',
            tag: {
              text: '标签'
            },
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 5,
            label: '自定义对象',
            mytag: '自定义对象',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
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
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 150,
          direction: 90,
          isOngoing: true
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.5, 0)
                  },
                  name: 'myTag',
                  figure: 'RoundedRectangle',
                  fill: '#eb2f96',
                  stroke: '#780650',
                  color: '#000',
                  strokeWidth: 2,
                  textKey: 'mytag'
                })
              ]
            }
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
