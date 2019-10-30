# 灰度模式

通过定义属性的 gray 状态下的样式，可以改变节点在 isGray 为 true 时的表现。
为了简化对灰度状态的批量处理，提供了两个方法：setGray 置灰， removeGray 取消置灰

## 相关方法

setGray
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---- | ----- | -------- | ------ |
| options | 方法配置 | Object | - | - |
| options.diagram | go.Diagram 对象 | Diagram | - | null |
| options.nodes | 需要高亮的节点(其余置灰) | Array | 节点对象数组 | [] |
| options.mode | 高亮模式,使用 highlight 或 select 样式 |String | 'highlight'/'select' | 'select' |

removeGray
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---- | ----- | -------- | ------ |
| options | 方法配置 | Object | - | - |
| options.diagram | go.Diagram 对象 | Diagram | - | null |

## 示例

尝试单击某个节点，再单击画板空白处； 尝试双击某个节点，再单击画板空白处；
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
      height="450px"
      :events="diagramEvents"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl, utils } from 'xdh-go';
  let { setGray, removeGray } = utils;
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
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 5 }
        ],
        diagramEvents: {
          BackgroundSingleClicked(obj) {
            removeGray({ diagram: obj.diagram });
          }
        }
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, { direction: 90 });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 50
          },
          events: {
            click: (ev, obj) => {
              let node = obj.part;
              removeGray({ diagram: node.diagram });
              setGray({ diagram: node.diagram, nodes: [node] });
            },
            doubleClick: (ev, obj) => {
              let node = obj.part;
              let nodes = [];
              removeGray({ diagram: node.diagram });
              nodes.push(node);
              node.findNodesConnected().each(N => {
                nodes.push(N);
              });
              setGray({ diagram: node.diagram, nodes: nodes });
            }
          }
        });
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            fromPortId: 'tNode',
            toPortId: 'tNode'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
