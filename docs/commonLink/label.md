# label 文字

| 参数            | 说明                 | 类型          | 可选值                                                                                                                                                                                                                           | 默认值                                    |
| --------------- | -------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| label           | 文字内容及样式       | Object/String | -                                                                                                                                                                                                                                | -                                         |
| label.text      | 文字内容             | Array/String  | 如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1',labelColor: 'red', background: 'transparent',editable: false, font: '14px "Microsoft Yahei"', margin: [0, 10, 0, 10]}],每行文字可单独控制样式 | ''                                        |
| label.editable  | 文字内容是否可编辑   | Boolean       | -                                                                                                                                                                                                                                | false                                     |
| label.show      | 文字内容是否显示     | Boolean       | -                                                                                                                                                                                                                                | true                                      |
| label.font      | 文字样式             | String        | -                                                                                                                                                                                                                                | '14px "iconfont"'                         |
| label.margin    | 文字外边距           | Number/Array  | 数字或数组，数组如[5, 10,5,10]                                                                                                                                                                                                   | 10                                        |
| label.placement | 文字相对与连线的位置 | String        | 'top'/'middle'/'bottom'/'start-top'/'start-middle'/'start-bottom'/'end-top'/'end-middle'/'end-bottom'                                                                                                                            | 'top'                                     |
| labelStroke     | 文字外框边框色       | Object/String | -                                                                                                                                                                                                                                | 五种状态, 默认'transparent'               |
| labelColor      | 文字颜色             | Object/String | -                                                                                                                                                                                                                                | gray 状态默认'#ccc',其它默认'#000'        |
| labelBackground | 文字框背景色         | Object/String | -                                                                                                                                                                                                                                | gray 状态默认'#ccc',其它默认'transparent' |

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
      height="700px"
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
          },
          {
            key: 5,
            label: 'node5'
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
            label: [
              { text: '多行文字', labelColor: '#3f6600' },
              {
                text: '多行文字',
                font: 'bold 18px "Microsoft Yahei"',
                margin: [5, 10, 5, 10],
                labelColor: { normal: '#096dd9', hover: '#cf1322' }
              }
            ]
          },
          {
            from: 1,
            to: 4,
            label: {
              text: '样式定义',
              font: '18px "Microsoft Yahei"'
            }
          },
          {
            from: 1,
            to: 5,
            label: {
              text: [{ text: '文字外边距' }, { text: '文字外边距' }],
              margin: [3, 30, 3, 30]
            }
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
          layerSpacing: 150
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
            labelBackground: '#ffe58f'
          }
        })
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::

## 文本框位置

:::demo

```html
<template>
  <div>
    <div v-for="(row,idx) in placements" :key="idx" class="box">
      <div class="box-con">
        <el-button
          v-for="(col, idy) in row"
          :key="idy"
          :type="currentPlacement===col?'primary':'default'"
          @click="setPlacement(col)"
          >{{col}}</el-button
        >
      </div>
    </div>
    <xdh-go
      :diagram-name="'dig1'"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template="nodeTemplate"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl, dataUtils } from 'xdh-go'
  let { diagramManager } = dataUtils
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        currentPlacement: 'top',
        placements: [
          ['start-top', 'top', 'end-top'],
          ['start-middle', 'middle', 'end-middle'],
          ['start-bottom', 'bottom', 'end-bottom']
        ],
        diagram: null,
        nodes: [
          {
            key: 1,
            label: 'node1'
          },
          {
            key: 2,
            label: 'node2'
          }
        ],
        links: [
          {
            from: 1,
            to: 2,
            label: {
              text: 'placement:top',
              placement: 'top'
            }
          }
        ]
      }
    },
    methods: {
      setPlacement(placement) {
        this.currentPlacement = placement
        let label = Object.assign({}, this.links[0].label, {
          placement: `placement:${placement}`
        })
        let linkData = diagramManager['dig1'].model.linkDataArray[0]
        this.$refs.diagram.update(linkData, 'label', label)
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 200
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
            labelBackground: '#ffe58f'
          }
        })
      },
      diagramReady(diagram, $, go) {
      }
    }
  }
</script>
<style lang="scss">
  .box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    &-con {
      margin-bottom: 5px;
      & /deep/ .el-button {
        min-width: 120px;
      }
    }
  }
</style>
```

:::
