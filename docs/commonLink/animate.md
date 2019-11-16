# 连线动效

## 动效参数

参考节点[动效参数](/commonNode/animate.html)

## 事件触发(trigger)

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
            label: 'line1',
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
            label: 'line2',
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
            label: 'line3',
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

## 指定不同的内部对象

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
      height="550px"
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
                name: 'animate1',
                objectName: 'sLinkNode',
                duration: 500,
                prop: 'angle',
                keyFrame: [0, -30],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'click',
                prevName: 'animate1',
                objectName: 'sLinkNode',
                duration: 500,
                prop: 'angle',
                keyFrame: [-30, 0],
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
              },
              {
                trigger: 'mouseEnter',
                prevName: 'animate2',
                objectName: 'sLineHolder',
                duration: 800,
                delay: 2000,
                prop: 'stroke',
                keyFrame: [
                  [211, 173, 247, 0.8],
                  [0, 0, 0, 0]
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
            arrows: 'from, to',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sFromArrow',
                duration: 800,
                prop: 'stroke',
                keyFrame: [
                  [56, 158, 13, 1],
                  [196, 29, 127, 1]
                ],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'sToArrow',
                duration: 800,
                prop: 'stroke',
                keyFrame: [
                  [56, 158, 13, 1],
                  [196, 29, 127, 1]
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

## 支持属性

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
      height="550px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go'
  let nodes = []
  for (let i = 0; i < 8; i++) {
    let pairs = Math.floor(i / 2)
    let label = ['angle:number', 'strokeDashArray:array', 'stroke:rgba', 'position:point']
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
            label: 'try click',
            animation: [
              {
                trigger: 'click',
                name: 'animate1',
                objectName: 'sLine',
                duration: 5000,
                prop: 'strokeDashArray',
                keyFrame: [[8, 4, 8, 4], [4, 8, 4, 8]],
                easingFunc: ['easeInOutCubic']
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
            from: 7,
            to: 8,
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
              },
              {
                trigger: 'mouseEnter',
                prevName: 'animate2',
                objectName: 'sLineHolder',
                duration: 800,
                delay: 2000,
                prop: 'stroke',
                keyFrame: [
                  [211, 173, 247, 0.8],
                  [0, 0, 0, 0]
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

## 动画设置

## 动画衔接

## 自定义事件

## 补充说明

### 属性值类型

keyFrame 所传的数组需根据 propType 的类型传值,举例：

参考节点[属性类型](/commonNode/animate.html#%E5%B1%9E%E6%80%A7%E5%80%BC%E7%B1%BB%E5%9E%8B)

### 常用参数与类型

参考节点[常用参数与类型](/commonNode/animate.html#%E5%B1%9E%E6%80%A7%E5%80%BC%E7%B1%BB%E5%9E%8B)

### 动效函数

参考节点[动效函数](/commonNode/animate.html#%E5%B8%B8%E7%94%A8%E5%8F%82%E6%95%B0%E4%B8%8E%E7%B1%BB%E5%9E%8B)
