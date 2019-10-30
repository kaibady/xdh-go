# 连线(line)

| 参数            | 说明                   | 类型          | 可选值                                           | 默认值                                                |
| --------------- | ---------------------- | ------------- | ------------------------------------------------ | ----------------------------------------------------- |
| opacity         | 连线整体透明度         | Object        | -                                                | 1                                                     |
| dashes          | 虚线设置               | Boolean/Array | false/true/数组如[4,4,4,4]                       | false                                                 |
| type            | 连线类型               | String        | 'curve'(曲线)/ 'straight'(直线) / 'route'(路径)) | 'curve'                                               |
| fromShortLength | 连线始端与箭头的距离   | Number        | -                                                | 0                                                     |
| toShortLength   | 连线末端端与箭头的距离 | Number        | -                                                | 0                                                     |
| lineWidth       | 连线及箭头的线条宽度   | Number/Object | -                                                | normal 状态及 gray 状态为 1,其余为 2                  |
| lineColor       | 连线及箭头的线条颜色   | Number/Object | -                                                | normal 状态为'#000',gray 状态为'#ccc',其余为'#66b1ff' |

## opacity,dashes,type

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
            label: 'node4',
            layout: 'Spot'
          },
          {
            key: 5,
            label: 'node5'
          },
          {
            key: 6,
            layout: 'Spot',
            label: 'node6'
          },
          {
            key: 7,
            label: 'node7'
          }
        ],
        links: [
          { from: 1, to: 2, dashes: true, label: 'dashes:true' },
          { from: 1, to: 3, opacity: 0.3, label: 'opacity:0.3' },
          { from: 4, to: 4, type: 'curve', label: 'type:curve' },
          { from: 4, to: 5, type: 'curve', label: 'type:curve' },
          { from: 4, to: 6, type: 'straight', label: 'type:straight' },
          { from: 4, to: 7, type: 'route', label: 'type:route' }
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

## fromShortLength,toShortLength,lineWidth,lineColor

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
            arrows: 'from,to',
            fromShortLength: -10,
            toShortLength: 20,
            label: [
              { text: 'fromShortLength:-10' },
              { text: 'toShortLength:10' }
            ]
          },
          {
            from: 3,
            to: 4,
            toShortLength: 5,
            lineWidth: {
              normal: 2,
              hover: 4
            },
            lineColor: {
              normal: '#c41d7f',
              hover: '#722ed1'
            },
            arrowStroke: {
              normal: '#c41d7f',
              hover: '#722ed1'
            },
            arrowFill: {
              normal: '#c41d7f',
              hover: '#722ed1'
            },
            arrowStrokeWidth: {
              normal: 1,
              hover: 2
            },
            label: 'lineWidth,lineColor'
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
