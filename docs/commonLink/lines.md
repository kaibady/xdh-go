# 连线(line)

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
      height="400px"
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
          }
        ],
        links: [
          { from: 'a', to: 'b', label: 'link1', arrows: 'to' },
          {
            from: 'c',
            to: 'd',
            label: 'link2',
            arrows: {
              to: {
                type: 'Triangle',
                scale: 1.5
              }
            },
            dashes: [16, 4, 8, 8],
            strokeWidth: 4,
            strokeColor: 'blue'
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
          layerSpacing: 150
        });
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
