# switcher

状态切换按钮,用于定义节点状态的切换按钮，可自定义切换样式和切换事件

| 参数            | 说明                                              | 类型          | 可选值 | 默认值                   |
| --------------- | ------------------------------------------------- | ------------- | ------ | ------------------------ |
| name            | 标签名称                                          | String        | -      | ''                       |
| figure          | 外框形状                                        | String        | -      | 'RoundedRectangle'       |
| fill            | 背景色                                      | String        | -      | '#eb2f96'                |
| stroke          | 边框颜色                                    | String/null   | -      | '#780650'                |
| strokeWidth     | 边框宽度                                    | Number        | -      | 1                        |
| color           | 字体颜色                                          | String        | -      | '#000'                   |
| stateCompute    | 状态计算函数                                      | Function/null | -      | null                     |
| statekey        | 状态对应数据字段名                                | String        | -      | 'active'                 |
| activeText      | active状态文本对象                                      | Object        | -      | -                 |
| activeText.text | active状态文本                                          | String        | -      | '\uE720' |
| activeText.font | active状态字体                                          | String        | -      | '14px "iconfont"' |
| inactiveText    | inactive状态文本对象                                   | Object        | -      |   -              |
| activeText.text | inactive状态文本                                          | String        | -      | '\uE725'  |
| activeText.font | inactive状态字体                                          | String        | -      | '14px "iconfont"' |
| props           | 最外层的 go.Panel 参数                            | Object        | -      | {}                       |
| binding         | 最外层 go.Panel 数据绑定                          | Array         | -      | []                       |
| events          | 事件                                              | Object        | -      | -                        |
| events.click    | click 事件,参数 state(当前状态),obj(当前点击对象) | Function      | -      | () => {}                 |

## 基本用法

用于对某些状态进行切换，可自定义图标的样式

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="600px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, nodeTmpl, linkTmpl } from 'xdh-go';
  let { switcher, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            key: -1,
            label: 'base',
            active: true,
            switcher: 'switcher1'
          },
          {
            key: 1,
            label: 'switcher',
            switcher: 'switcher2',
            active: true
          },
          {
            key: 2,
            label: 'node1'
          },
          {
            key: 3,
            label: 'node2'
          },
          {
            key: 4,
            label: 'switcher',
            switcher: 'switcher2',
            active: false
          },
          {
            key: 5,
            label: 'node3'
          },
          {
            key: 6,
            label: 'node4'
          }
        ],
        links: [
          { from: -1, to: 1 },
          { from: -1, to: 4 },
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 4, to: 5 },
          { from: 4, to: 6 }
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
          direction: 90,
          setsPortSpots: false,
          layerSpacing: 20
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        let events = {
          click(state, n) {
            let node = n.part;
            if (state) {
              node.collapseTree();
            } else {
              node.expandTree();
            }
          }
        };
        let getBinding = ($, go, name) => {
          return binding($, go, {
            visible: {
              type: 'ofObject',
              key: '',
              handler(n) {
                if (!n.findNodesOutOf().count || n.data.switcher !== name) {
                  return false;
                } else {
                  return true;
                }
              }
            }
          });
        };
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80,
              _figurePanelOptions: {
                parts: [
                  switcher($, go, {
                    figure: 'Rectangle',
                    stroke: '#a8071a',
                    fill: '#ff7875',
                    size: 20,
                    activeText: {
                      text: '\uE6ea'
                    },
                    inactiveText: {
                      text: '\uE6eb'
                    },
                    binding: getBinding($, go, 'switcher1'),
                    events: events
                  }),
                  switcher($, go, {
                    binding: getBinding($, go, 'switcher2'),
                    events: events
                  })
                ]
              }
            }
          })
        );
        return map;
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            fromPortId: 'tFigure',
            toPortId: 'tFigure'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## stateCompute

上例中，两个名为 switcher 的节点，初始的图标并不一致，这是由于节点数据中设置了不同的 active 值。
设置 stateKey(默认为 active),然后在数据中指定 active 的值，即可指定图标初始状态。

但有时状态需要根据节点本身去判断，而不是由用户指定，这时就需要用到 stateCompute 函数，如果 stateCompute 函数非空，stateKey 指定的数据将失效

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="600px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, nodeTmpl, linkTmpl } from 'xdh-go';
  let { switcher, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            key: -1,
            label: 'base',
            switcher: 'switcher1'
          },
          {
            key: 1,
            label: 'switcher',
            switcher: 'switcher2'
          },
          {
            key: 2,
            label: 'node1',
            switcher: 'switcher2'
          },
          {
            key: 3,
            label: 'node2',
            switcher: 'switcher2'
          },
          {
            key: 4,
            label: 'switcher',
            switcher: 'switcher2'
          },
          {
            key: 5,
            label: 'node3',
            switcher: 'switcher2'
          },
          {
            key: 6,
            label: 'node4',
            switcher: 'switcher2'
          },
          {
            key: 7,
            label: 'node5',
            switcher: 'switcher2'
          }
        ],
        links: [
          { from: -1, to: 1 },
          { from: -1, to: 4 },
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 7, to: 2 }
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
          direction: 90,
          setsPortSpots: false,
          layerSpacing: 20
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        let events = {
          click(state, n) {
            let node = n.part;
            if (state) {
              node.collapseTree();
              } else {
              node.expandTree();
            }
          }
        };
        let getBinding = ($, go, name) => {
          return binding($, go, {
            visible: {
              type: 'ofObject',
              key: '',
              handler(n) {
                if (!n.findNodesOutOf().count || n.data.switcher !== name) {
                  return false;
                } else {
                  return true;
                }
              }
            }
          });
        };
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80,
              _figurePanelOptions: {
                parts: [
                  switcher($, go, {
                    figure: 'Rectangle',
                    stroke: '#a8071a',
                    fill: '#ff7875',
                    size: 20,
                    activeText: {
                      text: '\uE6ea'
                    },
                    inactiveText: {
                      text: '\uE6eb'
                    },
                    stateCompute(n) {
                      return n.isTreeExpanded;
                    },
                    binding: getBinding($, go, 'switcher1'),
                    events: events
                  }),
                  switcher($, go, {
                    stateCompute(n) {
                      return n.isTreeExpanded;
                    },
                    binding: getBinding($, go, 'switcher2'),
                    events: events
                  })
                ]
              }
            }
          })
        );
        return map;
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            fromPortId: 'tFigure',
            toPortId: 'tFigure'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
