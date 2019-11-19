# 触发事件

因为节点变化可能会触发布局重新计算，从而影响动画执行，因此动画开始时会自动将 isOnging 参数设置为 false,动画执行后再重置。鼠标移开后节点会回到原来的状态，是因为节点还同时受到数据双向绑定的限制，是正常现象。
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
  import { XdhGo, nodeTmpl, linkTmpl } from 'xdh-go';
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
            label: 'click',
            animation: [
              {
                trigger: 'click',
                objectName: 'tNode',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: 'mouseEnter\nmouseLeave',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInQuad']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.2, 1],
                easingFunc: ['easeOutQuart']
              }
            ]
          },
          {
            key: 3,
            label: 'dbclick',
            animation: [
              {
                trigger: 'dbclick',
                objectName: 'tNode',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInQuad']
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
          props: {
            shape: 'Circle',
            size: 80
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::