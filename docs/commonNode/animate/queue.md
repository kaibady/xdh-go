# 动画衔接

通过 name 和 prevName 属性，可以定义同一事件多个动画的先后次序。如果没有定义 prevName，则动画马上执行；如果没找到与 prevName 匹配的动画 name，该动画将不执行。
下例中，先执行外框的 margin 动画，再执行 background 颜色变换。注意，所有 animation 设置都可以写到节点模板中，将影响所有节点，节点数据中如果定义了 animation，将覆盖模板中的定义。

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
      height="300px"
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
            label: '动画衔接1',
            showShape: true
          },
          {
            key: 2,
            label: '动画衔接2',
            showShape: true
          },
          {
            key: 3,
            label: '动画衔接3',
            showShape: true,
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate1',
                objectName: 'myShape',
                duration: 800,
                prop: 'width',
                propType: 'number',
                keyFrame: [150, 120],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                name: 'animate2',
                prevName: 'animate1',
                delay: 500,
                duration: 800,
                prop: 'fill',
                keyFrame: [[255, 236, 61, 0.5], [186, 230, 55, 1]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                prevName: 'animate3',
                delay: 500,
                duration: 800,
                prop: 'scale',
                keyFrame: [1, 1.4],
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
          parts: {
            down: [
              shape($, go, {
                props: {
                  name: 'myShape',
                  figure: 'RoundedRectangle',
                  stroke: '#ccc',
                  width: 150,
                  height: 150,
                  fill: 'rgba(133, 165, 255, 0.5)'
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
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate1',
                objectName: 'myShape',
                duration: 800,
                prop: 'width',
                propType: 'number',
                keyFrame: [150, 120],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                prevName: 'animate1',
                delay: 500,
                duration: 800,
                prop: 'fill',
                keyFrame: [[133, 165, 255, 0.5], [255, 133, 192, 1]],
                easingFunc: ['easeInOutCubic']
              }
            ],
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
