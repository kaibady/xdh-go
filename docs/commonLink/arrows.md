# 箭头(arrows)

通过 arrows 可以定义连线的箭头样式，其中 from 为连线始端，to 为连线末端。

| 参数              | 说明             | 类型          | 可选值 | 默认值                            |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| arrows            | 箭头配置参数     | Object/String | -      | -                                 |
| arrows.from       | 始端箭头配置参数 | Object        | -      | -                                 |
| arrows.from.type  | 始端箭头形状     | String        | -      | 'Standard'                        |
| arrows.from.scale | 始端箭头缩放比   | Number        | -      | 1                                 |
| arrows.from.show  | 始端箭头是否显示 | Boolean       | -      | false                             |
| arrows.to         | 末端箭头配置参数 | Object        | -      | -                                 |
| arrows.to.type    | 末端箭头形状     | String        | -      | 'Standard'                        |
| arrows.to.scale   | 末端箭头缩放比   | Number        | -      | 1                                 |
| arrows.to.show    | 末端箭头是否显示 | Boolean       | -      | false                             |
| arrowFill         | 箭头内部颜色     | String/Object | -      | gray 状态为'#ccc'，其余默认'#000' |
| arrowStroke       | 箭头边框颜色     | String/Object | -      | gray 状态为'#ccc'，其余默认'#000' |
| arrowWidth        | 箭头形状宽度     | String/Object | -      | 5 种状态，默认 1                  |

arrows 如果简写为字符串，如'from,to',则对应的箭头 show 属性为 true,其余跟随默认值

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
          },
          {
            key: 5,
            label: 'node5'
          },
          {
            key: 6,
            label: 'node6'
          }
        ],
        links: [
          {
            from: 1,
            to: 2,
            arrows: 'from,to',
            label: {
              text: [{ text: 'arrows简写' }, { text: "'from,to'" }],
              margin: 5
            }
          },
          {
            from: 1,
            to: 3,
            arrows: { to: { type: 'Circle', scale: 1.5 } },
            label: {
              text: [
                { text: 'arrows对象形式定义:to' },
                { text: "{type: 'Circle'" },
                { text: 'scale: 1.5}' }
              ],
              margin: 5
            }
          },
          {
            from: 4,
            to: 5,
            label: 'arrowFill',
            arrowFill: {
              normal: '#b37feb',
              hover: '#eb2f96'
            },
            toShortLength: 8,
            arrows: { to: { type: 'Circle' } }
          },
          {
            from: 4,
            to: 6,
            label: [{ text: 'arrowStroke' }, { text: 'arrowStrokeWidth' }],
            arrowStroke: {
              normal: '#9e1068',
              hover: '#eb2f96'
            },
            arrowStrokeWidth: {
              normal: 2,
              hover: 4
            },
            toShortLength: 8,
            arrowFill: 'transparent',
            arrows: { to: { type: 'Circle' } }
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
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 150
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80,
            toShortLength: 30
          }
        });
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: {
              to: {
                type: 'Standard'
              }
            },
            labelBackground: '#ffe58f'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
