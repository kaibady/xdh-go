# 动画设置

动画相关设置包括 delay(动画延时毫秒数), repeatCount(动画重复次数), direction(重复方式), easingFunc(属性变化曲线)。其中 easingFunc 数组内的缓动方法与不同属性类型数组内的数值一一对应。

另外，如果遇到 propType 中不包含的属性类型，可以使用 stateParser自行处理，返回一个特定的对象。

如果设置了stepCallback，则在每侦动画发生时不会自动给prop定义的参数赋值，赋值操作在stepCallback内部自行处理 
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
      height="500px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag, shape, binding } = utils;
  function customEasing(x) {
    if (x <= 0.2) {
      return 0.2;
    } else if (x <= 0.4) {
      return 0.4;
    } else if (x <= 0.6) {
      return 0.6;
    } else if (x <= 0.8) {
      return 0.8;
    } else {
      return 1;
    }
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
            key: 1,
            label: 'delay:500ms',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                delay: 500,
                duration: 300,
                prop: 'scale',
                propType: 'number',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                delay: 500,
                duration: 300,
                prop: 'scale',
                propType: 'number',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: [{ text: 'repeatCount:4' }, { text: "direction: 'normal'" }],
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                repeatCount: 4,
                direction: 'normal',
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 3,
            label: [
              { text: 'repeatCount:4' },
              { text: "direction: 'alternate'" }
            ],
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                repeatCount: 4,
                direction: 'alternate',
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 4,
            label: {
              text: 'dot',
              margin: 5
            },
            tooltip: 'easingFunc',
            labelStroke: '#10239e',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[0, 100], [100, 0]],
                easingFunc: ['ease', 'easeOutCirc']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[100, 0], [0, 100]],
                easingFunc: ['ease', 'easeInCirc']
              }
            ]
          },
          {
            key: 5,
            label: {
              text: '自定义缓动',
              margin: 5
            },
            tooltip: 'easingFunc自定义',
            labelStroke: '#10239e',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[0, 100], [100, 0]],
                easingFunc: ['ease', customEasing]
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[100, 0], [0, 100]],
                easingFunc: ['ease', customEasing]
              }
            ]
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        };
      },
      layout($, go) {
        return $(go.GridLayout, {
          wrappingColumn: 3
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
