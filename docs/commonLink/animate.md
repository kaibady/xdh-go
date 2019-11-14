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

内部对象包括 sLinkNode, sLine, sLineHolder, sLabel, sFromArrow, sToArrow
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
            label: 'sLinkNode-click'
          },
          {
            key: 2,
            label: 'sLinkNode-click'
          },
          {
            key: 3,
            label: 'sLine-mouseEnter'
          },
          {
            key: 4,
            label: 'sLine-mouseEnter'
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
            from: 3,
            to: 4,
            label: 'sLinkNode-click',
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
            label: 'sLine-mouseEnter',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'sLine',
                duration: 1000,
                prop: 'stroke',
                propType: 'rgba',
                keyFrame: [[56, 158, 13, 1], [196, 29, 127, 1]],
                easingFunc: ['easeInQuad']
              }
            ]
          },
          {
            from: 5,
            to: 6,
            label: 'sLinkNode-click',
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate2',
                objectName: 'sLineHolder',
                duration: 800,
                prop: 'stroke',
                keyFrame: [[0, 0, 0, 0], [211, 173, 247, 0.8]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                prevName: 'animate2',
                objectName: 'sLineHolder',
                duration: 800,
                delay: 2000,
                prop: 'stroke',
                keyFrame: [[211, 173, 247, 0.8], [0, 0, 0, 0]],
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
          layerSpacing: 100,
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
