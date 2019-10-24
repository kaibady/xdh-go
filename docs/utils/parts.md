# part 部件

::: tip 提示
提供了一些常见的组成节点的部件,直接使用可以快速构建节点
:::

## tag

方法参数：
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|figure|文本框形状|String|-|'RoundedRectangle'|
|fill|文本框背景色|String|-|'#eb2f96'|
|stroke|文本框边框颜色|String/null|-|'#780650'|
|strokeWidth|文本框边框宽度|Number|-|1|
|strokeDashArray|文本框边框虚线|Array/null|如[8,4,8,4]|null|
|color|文本颜色|String|-|'#000'|
|font|文本字体|String|-|'14px "Microsoft Yahei"'|
|textKey|数据绑定文本字段名|String|-|'text'|
|textArrayKey|数据绑定数组文本字段名|String|-|'label'|

figure 可选值：
"Rectangle", "Square", "RoundedRectangle", "Border", "Ellipse", "Circle", "TriangleRight", "TriangleDown", "TriangleLeft", "TriangleUp", "Triangle", "Diamond", "LineH", "LineV", "BarH", "BarV", "MinusLine", "PlusLine", "XLine"

### 基本用法

文本块，支持单行文本和多行文本

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :node-template-map="nodeTemplateMap"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { tag, node } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            category: 'rect',
            text: [{ label: '多行文本1' }, { label: '多行文本2' }]
          },
          {
            category: 'rect',
            text: '单行文本'
          },
          {
            category: 'circle',
            text: '99+'
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
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add('rect', node($, go, {
          parts: [
            tag($, go, {
              figure: 'RoundedRectangle',
              fill: '#eb2f96',
              stroke: '#780650',
              color: '#000',
              strokeWidth: 2,
              textKey: 'text',
              textArrayKey: 'label'
            })
          ]
        }))

        map.add('circle', node($, go, {
          parts: [
            tag($, go, {
              figure: 'Circle',
              fill: 'red',
              font: '18px "Microsoft Yahei"',
              stroke: null,
              color: '#fff',
              strokeWidth: 2,
              padding: 0,
              textKey: 'text',
              textArrayKey: 'label'
            })
          ]
        }))
        return map;
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
