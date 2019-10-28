# tooltip

tooltip 提示参数
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|tooltip|tooltip 相关参数|Object|-|-|
|tooltip.stroke|tooltip 边框颜色|String|-|'#003a8c'|
|tooltip.color|tooltip 文本颜色|String|-|'#fff'|
|tooltip.strokeWidth|tooltip 文本框边框宽度|Number|-|1|
|tooltip.font|文本样式|String|-|'14px "Microsoft Yahei"'|
|tooltip.background|文本框背景色|String|-|'rgba(0,0,0,0.6)'|
|tooltip.text|文本内容|String|-|''|

## tag 外框

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
  import { XdhGo, nodeTmpl } from 'xdh-go';
  let imgPath = '/xdh-go/';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '默认样式',
            tooltip: '默认提示'
          },
          {
            label: '边框样式',
            tooltip: {
              text: '边框',
              strokeWidth: 3,
              stroke: '#c41d7f',
              background: '#ffadd2'
            }
          },
          {
            label: '文字样式',
            tooltip: {
              text: '文字样式',
              color: '#eaff8f',
              font: 'bold 18px "Microsoft Yahei"'
            }
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
        return $(go.GridLayout, {});
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
