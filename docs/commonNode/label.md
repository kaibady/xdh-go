# label 文字

| 参数            | 说明               | 类型                                                            | 可选值                                                                                                                                                                                                                           | 默认值                                    |
| --------------- | ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| label           | 文字内容及样式     | Object/String                                                   | -                                                                                                                                                                                                                                | -                                         |
| label.text      | 文字内容           | Array/String                                                    | 如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1',labelColor: 'red', background: 'transparent',editable: false, font: '14px "Microsoft Yahei"', margin: [0, 10, 0, 10]}],每行文字可单独控制样式 | ''                                        |
| label.editable  | 文字内容是否可编辑 | Boolean                                                         | -                                                                                                                                                                                                                                | false                                     |
| label.show      | 文字内容是否显示   | Boolean                                                         | -                                                                                                                                                                                                                                | true                                      |
| label.font      | 文字样式           | String                                                          | -                                                                                                                                                                                                                                | '14px "Microsoft Yahei"'                  |
| label.margin    | 文字外边距         | Number/Array,类型为 Array，如[10,0,10,0],次序为[上，右，下，左] | -                                                                                                                                                                                                                                | 10                                        |
| labelStroke     | 文字外框边框色     | Object/String                                                   | -                                                                                                                                                                                                                                | 五种状态, 默认'transparent'               |
| labelColor      | 文字颜色           | Object/String                                                   | -                                                                                                                                                                                                                                | gray 状态默认'#ccc',其它默认'#000'        |
| labelBackground | 文字框背景色       | Object/String                                                   | -                                                                                                                                                                                                                                | gray 状态默认'#ccc',其它默认'transparent' |

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
      height="570px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go'
  let imgPath = '/xdh-go/'
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          { label: 'label文字简写' },
          {
            label: {
              text: '文字可编辑',
              editable: true
            }
          },
          {
            label: {
              text: 'font样式',
              font: '18px "Microsoft Yahei"'
            }
          },
          {
            label: {
              text: [
                { text: '多行文字', labelColor: '#ad8b00' },
                {
                  text: '多行文字',
                  font: 'bold 18px "Microsoft Yahei"',
                  margin: [5, 0, 5, 0],
                  labelColor: { normal: '#096dd9', hover: '#cf1322' }
                }
              ]
            }
          },
          {
            label: {
              text: [{ text: '多行可编辑' }, { text: '多行可编辑' }],
              editable: true
            }
          },
          {
            label: {
              text: '文字外边距',
              margin: 20
            }
          },
          {
            label: {
              text: '文字显示',
              show: false
            },
            tooltip: {
              text: '文字不显示'
            }
          },
          {
            label: { text: 'labelStroke文字边框', margin: [5, 20, 5, 20] },
            labelStroke: {
              normal: '#006d75',
              highlight: '#36cfc9',
              hover: '#36cfc9',
              select: '#36cfc9'
            }
          },
          {
            label: { text: 'labelColor文字颜色' },
            labelColor: {
              normal: '#006d75',
              highlight: '#c41d7f',
              hover: '#c41d7f',
              select: '#c41d7f'
            }
          },
          {
            label: {
              text: [
                { text: 'labelBackground背景颜色' },
                { text: 'labelBackground背景颜色' }
              ],
              margin: 5
            },
            labelBackground: {
              normal: '#d6e4ff',
              highlight: '#ffd6e7',
              hover: '#ffd6e7',
              select: '#ffd6e7'
            }
          }
        ]
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        }
      },
      layout($, go) {
        return $(go.GridLayout, {})
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        })
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::
