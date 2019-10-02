# icon 字体图标

当设置 shape 为'icon'时，显示 icon 参数提供的字体图标及样式，通过 go.TextBlock 对象显示，icon.iconfont 可指定字体样式，text 指定图标内容

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
            label: '默认跟随模板'
          },
          {
            label: '没有状态圈',
            stateShape: null
          },
          {
            label: 'icon参数简写',
            icon: '\uE797',
            tooltip: 'tooltip参数简写'
          },
          {
            label: 'iconfont样式覆盖',
            icon: {
              text: '\uE655',
              iconfont: 'bold 30px "iconfont"'
            }
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
            shape: 'icon',
            size: 80,
            icon: {
              iconfont: '30px "element-icons"',
              text: '\uE6A4'
            },
            iconColor: {
              normal: '#ccc',
              highlight: '#66b1ff',
              hover: 'yellow',
              select: '#66b1ff'
            },
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
