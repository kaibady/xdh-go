# 箭头(arrows)

通过 arrows 可以定义连线的箭头样式，其中 from 为连线始端，to 为连线末端。

from 和 to 都各有三个参数: type(箭头类型), show(是否显示), scale(缩放大小)

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
            key: 'a',
            label: 'node1'
          },
          {
            key: 'b',
            label: 'node2'
          },
          {
            key: 'c',
            label: 'node3'
          },
          {
            key: 'd',
            label: 'node4'
          },
          {
            key: 'e',
            label: 'node3'
          },
          {
            key: 'f',
            label: 'node4'
          }
        ],
        links: [
          { from: 'a', to: 'b' },
          { from: 'c', to: 'd', label: 'link1', arrows: 'to' },
          {
            from: 'e',
            to: 'f',
            label: 'link2',
            arrows: {
              to: {
                type: 'Triangle',
                scale: 1.5
              },
              from: {
                type: 'Circle'
              }
            },
            arrowFill: 'transparent'
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
        return $(go.LayeredDigraphLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Rectangle',
            size: 40,
            background: '#f0f0f0',
            strokeColor: 'red',
            labelBackground: 'transparent',
            labelColor: '#000',
            _figureHolderOptions: {
              props: {
                portId: ''
              }
            }
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
            }
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
