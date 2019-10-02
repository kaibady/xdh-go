# shape 图形

当设置 shape 为除'icon' 'image' 'clipImage' 外的字符串时，显示 字符串名称对应的几何形状，通过 go.Shape 对象显示。需要注意的是，该名称必须是 gojs 预定义的几何形状名称或者自定义的几何名称。gojs2.0 之后为减小框架的体积，删减了大部分的预定义几何形状，须另外引入，详情请看 gojs 文档

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
      height="200px"
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
            label: '默认跟随模板'
          },
          {
            label: '没有状态圈',
            stateShape: null
          },
          {
            label: 'TriangleDown',
            shape: 'TriangleDown'
          },
          {
            label: 'Circle',
            shape: 'Circle'
          },
          {
            label: 'TriangleRight',
            shape: 'TriangleRight'
          },
          {
            label: '自定义形状',
            shape: 'TriangleRight'
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
            shape: 'RoundedRectangle',
            size: 80,
            stateShape: null,
            background: {
              normal: 'blue',
              highlight: '#0000aa',
              hover: '#cc0000',
              select: '#ffee00'
            },
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

## 其它通用特性

参考图片类型的通用特性部分
