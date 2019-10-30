# label 文字

| 参数            | 说明               | 类型          | 可选值                                                                               | 默认值                                    |
| --------------- | ------------------ | ------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| label           | 文字内容及样式     | Object/String | -                                                                                    | -                                         |
| label.text      | 文字内容           | Array/String  | 如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1'}] | ''                                        |
| label.editable  | 文字内容是否可编辑 | Boolean       | -                                                                                    | false                                     |
| label.show      | 文字内容是否显示   | Boolean       | -                                                                                    | true                                      |
| label.font      | 文字样式           | String        | -                                                                                    | '14px "iconfont"'                         |
| label.margin    | 文字外边距         | Number        | -                                                                                    | 10                                        |
| label.offsetX   | 文字横向偏移量     | Number        | -                                                                                    | 0                                         |
| label.offsetY   | 文字纵向偏移量     | Number        | -                                                                                    | 0                                         |
| label.segment   | 文字位于连线的位置 | Number        | -                                                                                    | 1                                         |
| labelStroke     | 文字外框边框色     | Object/String | -                                                                                    | 五种状态, 默认'transparent'               |
| labelColor      | 文字颜色           | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'#000'        |
| labelBackground | 文字框背景色       | Object/String | -                                                                                    | gray 状态默认'#ccc',其它默认'transparent' |

## 文本内容

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
            label: 'node1'
          },
          {
            key: 2,
            label: 'node2'
          },
          {
            key: 3,
            label: 'node3'
          },
          {
            key: 4,
            label: 'node4'
          }
        ],
        links: [
          {
            from: 1,
            to: 2,
            label: '单行文本'
          },
          {
            from: 1,
            to: 3,
            label: [{ text: '多行文本' }, { text: '多行文本' }]
          },
          {
            from: 1,
            to: 4,
            label: {
              text: '样式定义',
              font: '18px "Microsoft Yahei"'
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
        return $(go.LayeredDigraphLayout, { setsPortSpots: false });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        });
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
