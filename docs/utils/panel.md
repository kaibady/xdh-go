# Panel 布局

::: tip 提示
从 gojs 的 Panel 类封装的方法
:::

## panel

参数:type, props, parts, events, binding

type 对应于布局类型，可参考 gojs 文档，但该函数还给出了简写形式,对应关系如下:

```
{
  spot: 'Spot',
  hor: 'Horizontal',
  ver: 'Vertical',
  table: 'Table',
  pos: 'Position',
  auto: 'Auto',
  vbox: 'Viewbox',
  link: 'Link',
  grid: 'Grid',
  grad: 'Graduated'
}
```

## 示例

该例使用了水平布局，垂直布局和 spot 布局

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
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { panel, node, textBlock } = utils;
  function block($, go, text, height, color, spotAlign) {
    let props = {
      text: text,
      background: color,
      width: 100,
      height: height,
      textAlign: 'center',
      verticalAlignment: go.Spot.Center
    };
    if (spotAlign) {
      props.alignment = spotAlign;
      props.alignmentFocus = new go.Spot(0, 1);
    }
    return textBlock($, go, {
      props: props
    });
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [{ key: '1', name: '节点1' }]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {});
      },
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          parts: [
            panel($, go, {
              type: 'hor',
              parts: [
                block($, go, 'left', 60, 'red'),
                panel($, go, {
                  type: 'ver',
                  parts: [
                    block($, go, 'rightTop', 30, 'blue'),
                    block($, go, 'rightBottom', 30, 'green')
                  ]
                })
              ]
            }),
            block($, go, 'message', 30, 'yellow', new go.Spot(1, 0))
          ]
        });
      }
    }
  };
</script>
```

:::
