# 支持属性

prop 参数用于指定对节点或内部对象的哪个属性施加动画（见下方"常用参数与类型"）。由于各属性使用的数据类型不相同，需要通过 propType 进行指定。（包括'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'）动画内部会通过 prop 自动匹配数据类型,但某些参数可能会有多种类型，有时需要显式定义。
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
  let { tag, shape, binding } = utils;
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
            label: 'alignment:spot类型属性',
            mytag: 'spot',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myTag',
                duration: 300,
                prop: 'alignment',
                propType: 'spot',
                keyFrame: [[0.3, 0], [0.7, 0]],
                easingFunc: ['easeInOutCubic', 'easeInElastic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myTag',
                duration: 300,
                prop: 'alignment',
                propType: 'spot',
                keyFrame: [[0.7, 0], [0.3, 0]],
                easingFunc: ['easeInOutCubic', 'easeInElastic']
              }
            ]
          },
          {
            key: 2,
            label: 'number',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.2, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 3,
            label: 'position:point',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 300,
                prop: 'position',
                keyFrame: [[0, 100], [0, -10]],
                easingFunc: ['easeInOutCubic', 'easeInOutQuad']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 300,
                prop: 'position',
                keyFrame: [[0, -10], [0, 100]],
                easingFunc: ['easeInOutCubic', 'easeInOutQuad']
              }
            ]
          },
          {
            key: 4,
            label: 'padding:margin',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 200,
                prop: 'padding',
                keyFrame: [[0, 0, 0, 0], [0, 0, 20, 0]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 200,
                prop: 'padding',
                keyFrame: [[0, 0, 20, 0], [0, 0, 0, 0]],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 5,
            label: 'fill:rgba',
            showShape: true,
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                duration: 800,
                prop: 'fill',
                keyFrame: [[255, 133, 192, 1], [133, 165, 255, 0.5]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myShape',
                duration: 800,
                prop: 'fill',
                keyFrame: [[133, 165, 255, 0.5], [255, 133, 192, 1]],
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
          isOngoing: false
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          parts: {
            down: [
              shape($, go, {
                props: {
                  name: 'myShape',
                  figure: 'RoundedRectangle',
                  stroke: '#ccc',
                  width: 150,
                  height: 150,
                  fill: 'rgba(255,133,192,1)'
                },
                binding: binding($, go, {
                  visible: {
                    key: '',
                    handler(d) {
                      return d.showShape;
                    }
                  }
                })
              })
            ]
          },
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.3, 0)
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
            },
            _labelOuterPanelOptions: {
              props: {
                position: new go.Point(0, 100)
              }
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
