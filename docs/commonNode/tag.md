# tag 标签

节点附加标签
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|tag|节点附加标签相关参数|Object|-|-|
|tag.placement|标签位置|String|'top-right'/'top'/'top-left'/'left'/'center'/'right'/'bottom-left'/'bottom'/'bottom-right'|'top-right'|
|tag.text|文本内容|String/Array|如果类型为 String，则为单行文本；如果为 Array，则为多行文本，格式为[{text: 'text1'}]|''|
|tag.color|文本颜色|String|-|'#000'|
|tag.figure|文字外框形状|String|go.Shape 内置图形|'RoundedRectangle'|
|tag.background|文本框背景色|String|-|'#40a9ff'|
|tag.stroke|文本框边框色|String|-|'#003a8c'|
|tag.strokeWidth|文本框边框宽度|Number|-|1|
|tag.strokeDashArray|文本框边框虚线设置|null/Array|-|null|
|tag.font|文本样式|String|-|'14px "Microsoft Yahei"'|
|tag.margin|文本的外边距|Number/Array|-|5|

## tag 位置

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
            label: 'top-left',
            tag: {
              text: 'tag',
              placement: 'top-left'
            }
          },
          {
            label: 'top',
            tag: {
              text: 'tag',
              placement: 'top'
            }
          },
          {
            label: 'top-right',
            tag: {
              text: 'tag',
              placement: 'top-right'
            }
          },
          {
            label: 'left',
            tag: {
              text: 'tag',
              placement: 'left'
            }
          },
          {
            label: 'center',
            tag: {
              text: 'tag',
              placement: 'center'
            }
          },
          {
            label: 'right',
            tag: {
              text: 'tag',
              placement: 'right'
            }
          },
          {
            label: 'bottom-left',
            tag: {
              text: 'tag',
              placement: 'bottom-left'
            }
          },
          {
            label: 'bottom',
            tag: {
              text: 'tag',
              placement: 'bottom'
            }
          },
          {
            label: 'bottom-right',
            figureMargin: 20,
            tag: {
              text: 'tag',
              placement: 'bottom-right'
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

## tag 文字内容

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
            label: '单行tag',
            tag: {
              text: 'tag',
              placement: 'top-right'
            }
          },
          {
            label: '多行tag',
            tag: {
              text: [{ text: 'tag1' }, { text: 'tag2' }],
              placement: 'top-right'
            }
          },
          {
            label: 'font样式',
            tag: {
              text: 'tag',
              placement: 'top-right',
              font: '20px "Microsoft Yahei"'
            }
          },
          {
            label: '文字外边距',
            tag: {
              text: 'tag',
              placement: 'top-right',
              margin: [0, 15, 0, 15]
            }
          },
          {
            label: '文字颜色',
            tag: {
              text: 'tag',
              placement: 'top-right',
              color: '#fff'
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
            label: '外框形状',
            tag: {
              text: 'tag',
              placement: 'top-right',
              figure: 'Diamond'
            }
          },
          {
            label: '边框颜色',
            tag: {
              text: 'tag',
              placement: 'top-right',
              stroke: '#fadb14'
            }
          },
          {
            label: '边框宽度',
            tag: {
              text: 'tag',
              placement: 'top-right',
              strokeWidth: 3
            }
          },
          {
            label: '边框虚线',
            tag: {
              text: 'tag',
              placement: 'top-right',
              stroke: '#eb2f96',
              strokeWidth: 3,
              strokeDashArray: [8, 4, 8, 4]
            }
          },
          {
            label: '外框背景色',
            tag: {
              text: 'tag',
              placement: 'top-right',
              background: '#95de64'
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
