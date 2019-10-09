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

在此原理基础上，可以使用 tween 动画函数简化动画的实现。
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
  import { XdhGo, utils, animation } from 'xdh-go';
  let { node, textBlock, shape, binding } = utils;
  let { func, tween } = animation;
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
            animate: 'type1'
          },
          {
            text: 'node2',
            stroke: 'blue',
            fill: '#fe00fe',
            loc: '',
            animate: 'type2'
          },
          {
            text: 'node3',
            stroke: '#ff9900',
            fill: '#fefe00',
            font: 'bold 18pt "Microsoft Yahei"',
            animate: 'type3'
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
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          props: {
            rotateObjectName: 'centerObj'
          },
          events: {
            mouseEnter: (e, obj) => {
              switch (obj.part.data.animate) {
                case 'type1':
                  // 节点放大
                  tween(1, 1.1, 300, func['easeOutCirc'], state => {
                    obj.part.scale = state;
                  });
                  break;
                case 'type2':
                  // 节点旋转
                  obj.part.data.animating = true;
                  tween(0, 10, 300, func['easeOutCirc'], state => {
                    obj.part.angle = state;
                  });
                  break;
                case 'type3':
                  // 节点变形
                  let height = obj.part.findObject('Bd').height;
                  tween(0, 5, 300, func['easeOutCirc'], state => {
                    obj.part.findObject('Bd').margin = new go.Margin(state, 0, 0, 0);
                  });
                  tween(
                    height,
                    height - 10,
                    300,
                    func['easeOutCirc'],
                    state => {
                      obj.part.findObject('Bd').height = state;
                    }
                  );
                  break;
              }
            },
            mouseLeave: (e, obj) => {
              switch (obj.part.data.animate) {
                case 'type1':
                  // 节点放大
                  tween(1.1, 1, 300, func['easeOutCirc'], state => {
                    obj.part.scale = state;
                  });
                  break;
                case 'type2':
                  // 节点旋转
                  obj.part.data.animating = true;
                  tween(10, 0, 300, func['easeOutCirc'], state => {
                    obj.part.angle = state;
                  });
                  break;
                case 'type3':
                  // 节点变形
                  let height = obj.part.findObject('Bd').height;
                  let y = obj.part.location.y;
                  tween(5, 0, 300, func['easeOutCirc'], state => {
                    obj.part.findObject('Bd').margin = new go.Margin(state, 0, 0, 0);;
                  });
                  tween(
                    height,
                    height + 10,
                    300,
                    func['easeOutCirc'],
                    state => {
                      obj.part.findObject('Bd').height = state;
                    }
                  );
                  break;
              }
            }
          },
          parts: [
            shape($, go, {
              type: 'RoundedRectangle',
              props: {
                name: 'Bd',
                strokeWidth: 3,
                alignment: go.Spot.Center,
                width: 80,
                height: 80
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
