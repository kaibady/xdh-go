# 节点参数

| 参数                 | 参数说明                                      | 类型         | 可选值                                                    | 默认值                              |
| -------------------- | --------------------------------------------- | ------------ | --------------------------------------------------------- | ----------------------------------- |
| layout               | 节点布局（即图形和文字的排布方式）            | String       | 常用:'Vertical'/'Horizontal'/'Spot',其余见 go.PanelLayout | 'Vertical'                          |
| opacity              | 节点透明度                                    | Number       | 0~1                                                       | 1                                   |
| scale                | 节点缩放比                                    | Number       | -                                                         | 1                                   |
| nodeMargin           | 节点内容的外边距，影响节点的占位及 tag 的位置 | Number/Array | -                                                         | 20                                  |
| containerShape       | 节点的外框形状                                | String/null  | null/(go.Shape 内置图形类型)                              | null,不可见                         |
| containerBackground  | 节点的外框背景色                              | Object       | -                                                         | gray 状态为#ccc,其余状态为'#85a5ff' |
| containerStrokeColor | 节点的外框边框色                              | Object       | -                                                         | gray 状态为#ccc,其余状态为'#061178' |
| linkPort             | 连线指向节点的哪个位置                        | String       | 'tNode'/'tFigure'/'tLabel'                   | 'tFigure'                           |
| loc                  | 节点位置,双向数据绑定                         | String       | -                                                         | '0 0'                               |

## layout,opacity,scale,loc

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
    <div v-for="(item,idx) in nodes" :key="idx">
      node{{idx+1}} location: {{item.loc}}
    </div>
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
            layout: 'Vertical',
            opacity: 0.5,
            scale: 0.8,
            label: [
              { text: 'Vertical布局' },
              { text: 'opacity0.5' },
              { text: 'scale0.8' }
            ],
            loc: '0 0'
          },
          {
            layout: 'Horizontal',
            opacity: 0.8,
            scale: 1.0,
            label: [
              { text: 'Horizontal布局' },
              { text: 'opacity0.8' },
              { text: 'scale1.0' }
            ],
            loc: '0 0'
          },
          {
            layout: 'Spot',
            opacity: 1,
            scale: 1.2,
            label: [
              { text: 'Spot布局' },
              { text: 'opactity1' },
              { text: 'scale1.2' }
            ],
            loc: '0 0'
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

## linkPort

拖拽节点，并比较 linkPort 不同设置下连线指向的差别。
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
            label: 'linkPort:\'tNode\'',
            linkPort: 'tNode',
            containerShape: 'RoundedRectangle'
          },
          {
            key: 2,
            label: 'linkPort:\'tNode\'',
            linkPort: 'toNode'
          },
          {
            key: 3,
            label: 'linkPort:\'tFigure\'',
            linkPort: 'tFigure'
          },
          {
            key: 4,
            label: 'linkPort:\'tLabel\'',
            linkPort: 'tLabel'
          }
        ],
        links: [
          { from: 1, to: 2 },
          { from: 3, to: 4 }
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

## 节点外框相关参数

containerShape,containerBackground,containerColor, nodeMargin
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
      height="380px"
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
            containerShape: 'RoundedRectangle',
            containerStrokeColor: { normal: '#531dab' },
            containerBackground: { normal: '#d3adf7' },
            tag: { text: 'tag', placement: [0.8, 0] },
            label: [{ text: 'Rectangle' }, { text: 'figureMargin:0' }],
            nodeMargin: 0
          },
          {
            containerShape: 'RoundedRectangle',
            containerStrokeColor: { normal: '#531dab' },
            containerBackground: { normal: '#d3adf7' },
            tag: { text: 'tag', placement: [0.8, 0] },
            label: [{ text: 'Rectangle' }, { text: 'figureMargin:15' }],
            nodeMargin: 15
          },
          {
            containerShape: 'Diamond',
            containerStrokeColor: { normal: '#00474f' },
            containerBackground: { normal: '#36cfc9' },
            label: [{ text: 'Diamond' }, { text: 'figureMargin:5' }],
            nodeMargin: 5
          },
          {
            layout: 'Horizontal',
            containerShape: 'Ellipse',
            containerStrokeColor: { normal: '#135200' },
            containerBackground: { normal: '#73d13d' },
            label: [{ text: 'Ellipse' }, { text: 'figureMargin:0' }]
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
            size: 50
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
