# 图片(裁剪)

当设置 shape 为'clipImage'时，显示 image 参数提供的地址，通过 go.Picture 对象显示，如果显示出错，则显示 brokenImage 提供的地址，如果仍加载失败，则显示一张灰色的底图。 图片会被裁剪，默认被裁剪成圆形，可通过 clipShape 参数指定裁剪形状;通过stateShape指定外框图形

## 基本用法

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
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: 'node1',
            clipShape: 'TriangleRight',
            stateShape: 'TriangleRight',
            image: '/img/node/circleimage/3.png'
          },
          {
            label: 'node2',
            stateShape: 'TriangleDown',
            clipShape: 'TriangleDown',
            image: '/img/node/circleimage/1.png'
          },
          {
            label: 'node3',
            stateShape: 'RoundedRectangle',
            clipShape: 'Diamond',
            image: '/img/node/circleimage/2.png'
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
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'clipImage',
            size: 80,
            background: 'transparent',
            labelBackground: 'transparent',
            labelStroke: '#000',
            labelColor: '#000'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## 通用特性
参考图片类型的通用特性部分