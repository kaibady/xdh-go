# 动效

gojs 对节点的动画没有特别的进行扩展，但在 sample 示例中有使用 window.requestAnimationFrame 来实现动画效果。举例如下：

## 基本原理

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :node-template="nodeTemplate"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, textBlock, shape, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            text: 'node1',
            stroke: 'red',
            fill: '#f0f0f0',
            loc: ''
          },
          {
            text: 'node2',
            stroke: 'blue',
            fill: '#fe00fe',
            loc: ''
          },
          {
            text: 'node3',
            stroke: '#ff9900',
            fill: '#fefe00',
            font: 'bold 18pt "Microsoft Yahei"',
            loc: ''
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
        return $(go.GridLayout, {
          isOngoing: false,
          spacing: new go.Size(40, 40)
        });
      },
      diagramReady(diagram, $, go) {},
      scaleAnimate() {},
      zoomOut(node) {
        let animateStep = 0.01;
        let diagram = node.diagram;
        this.scaleAnimate = () => {
          if (node.data.animation) {
            let oldskips = diagram.skipsUndoManager;
            diagram.skipsUndoManager = true;
            let borderObj = node.findObject('Bd');
            if (borderObj) {
              let obj = borderObj;
              if (obj) {
                let N = obj.part;
                if (N.scale > 1.1) {
                  N.scale = 1.1;
                }
                N.scale = N.scale + animateStep;
              }
            }
            diagram.skipsUndoManager = oldskips;
            window.requestAnimationFrame(this.scaleAnimate);
          }
        };
        window.requestAnimationFrame(this.scaleAnimate);
      },
      zoomIn(node) {
        node.data.animation = false;
        node.scale = 1;
      },
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          events: {
            mouseEnter: (e, obj) => {
              obj.data.animation = true;
              this.zoomOut(obj.part);
            },
            mouseLeave: (e, obj) => {
              this.zoomIn(obj.part);
            }
          },
          parts: [
            shape($, go, {
              type: 'RoundedRectangle',
              props: {
                name: 'Bd',
                strokeWidth: 3,
                alignment: go.Spot.Center
              },
              binding: binding($, go, {
                fill: 'fill',
                stroke: {
                  type: 'ofObject',
                  key: '',
                  handler(n) {
                    return n.isSelected ? 'red' : '#000';
                  }
                }
              })
            }),
            textBlock($, go, {
              props: {
                font: 'bold 14pt serif'
              },
              binding: binding($, go, {
                text: 'text',
                stroke: 'stroke',
                font: 'font'
              })
            })
          ]
        });
      }
    }
  };
</script>
```

:::

## 动效扩展

在此原理基础上，工具对基本的动画方法进行了封装，以简化动画的实现。基本思想是将需要实现的动画参数设置在节点数据中，需要时再调用方法去执行。不建议大量使用无限循环的动画，以免造成性能问题。

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :node-template="nodeTemplate"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, textBlock, shape, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            text: 'node1',
            stroke: 'red',
            fill: '#f0f0f0'
          },
          {
            text: 'node2',
            stroke: 'blue',
            fill: '#fe00fe',
            loc: ''
          },
          {
            text: 'node3',
            stroke: '#ff9900',
            fill: '#fefe00',
            font: 'bold 18pt "Microsoft Yahei"'
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
        return $(go.GridLayout, {
          isOngoing: false,
          spacing: new go.Size(40, 40)
        });
      },
      diagramReady(diagram, $, go) {},
      zoomOut(node) {
        let animateStep = 0.01;
        let diagram = node.diagram;
        this.scaleAnimate = () => {
          if (node.data.animation) {
            let oldskips = diagram.skipsUndoManager;
            diagram.skipsUndoManager = true;
            let borderObj = node.findObject('Bd');
            if (borderObj) {
              let obj = borderObj;
              if (obj) {
                let N = obj.part;
                if (N.scale > 1.1) {
                  N.scale = 1.1;
                }
                N.scale = N.scale + animateStep;
              }
            }
            diagram.skipsUndoManager = oldskips;
            window.requestAnimationFrame(this.scaleAnimate);
          }
        };
        window.requestAnimationFrame(this.scaleAnimate);
      },
      zoomIn(node) {
        node.data.animation = false;
        node.scale = 1;
      },
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          events: {
            mouseEnter: (e, obj) => {
              this.zoomOut(obj.part);
            },
            mouseLeave: (e, obj) => {
              this.zoomIn(obj.part);
            }
          },
          parts: [
            shape($, go, {
              type: 'RoundedRectangle',
              props: {
                name: 'Bd',
                strokeWidth: 3,
                alignment: go.Spot.Center
              },
              binding: binding($, go, {
                fill: 'fill',
                stroke: {
                  type: 'ofObject',
                  key: '',
                  handler(n) {
                    return n.isSelected ? 'red' : '#000';
                  }
                }
              })
            }),
            textBlock($, go, {
              props: {
                font: 'bold 14pt serif'
              },
              binding: binding($, go, {
                text: 'text',
                stroke: 'stroke',
                font: 'font'
              })
            })
          ]
        });
      }
    }
  };
</script>
```

:::
