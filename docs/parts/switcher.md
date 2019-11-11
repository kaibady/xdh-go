# 状态切换按钮

用于定义节点状态的切换按钮，可自定义切换样式和切换事件

| 参数            | 说明                                              | 类型          | 可选值 | 默认值                   |
| --------------- | ------------------------------------------------- | ------------- | ------ | ------------------------ |
| name            | 标签名称                                          | String        | -      | ''                       |
| figure          | 文本框形状                                        | String        | -      | 'RoundedRectangle'       |
| fill            | 文本框背景色                                      | String        | -      | '#eb2f96'                |
| stroke          | 文本框边框颜色                                    | String/null   | -      | '#780650'                |
| strokeWidth     | 文本框边框宽度                                    | Number        | -      | 1                        |
| color           | 文本颜色                                          | String        | -      | '#000'                   |
| stateCompute    | 状态计算函数                                      | Function/null | -      | null                     |
| statekey        | 状态对应数据字段名                                | String        | -      | 'active'                 |
| activeText      | 激活状态文本                                      | Object        | -      | '\uE720'                 |
| activeText.text | 文本字体                                          | String        | -      | '14px "Microsoft Yahei"' |
| activeText.font | 文本字体                                          | String        | -      | '14px "Microsoft Yahei"' |
| inactiveText    | 非激活状态文本                                    | Object        | -      | '\uE725'                 |
| activeText.text | 文本字体                                          | String        | -      | '14px "Microsoft Yahei"' |
| activeText.font | 文本字体                                          | String        | -      | '14px "Microsoft Yahei"' |
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
      height="400px"
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
            key: 1,
            label: 'switcher',
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
            label: 'switcher2',
            switcher: {
              figure: 'Rectangle'
            },
            active: true
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
          layerSpacing: 40
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80,
              _figurePanelOptions: {
                parts: [
                  switcher($, go, {
                    switcherKey: 'switcher',
                    binding: binding($, go, {
                      visible: {
                        type: 'ofObject',
                        key: '',
                        handler(n) {
                          if (!n.findNodesOutOf().count) {
                            return false;
                          } else {
                            return true;
                          }
                        }
                      }
                    }),
                    events: {
                      click(state, n) {
                        let node = n.part;
                        if (state) {
                          node.collapseTree();
                        } else {
                          node.expandTree();
                        }
                        console.log(state, n);
                      }
                    }
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

上例中，结点初始状态为展开图标，这是由于 active 参数设置为 true 的缘故。但有时状态需要根据节点本身去判断，而不是由用户指定，这时就需要用到 stateCompute 函数，如果 stateCompute 函数非空，stateKey 指定的数据将失效

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
      height="400px"
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
            key: 1,
            label: 'switcher',
            active: true
          },
          {
            key: 2,
            label: 'node1'
          },
          {
            key: 3,
            label: 'node2'
          }
        ],
        links: [{ from: 1, to: 2 }, { from: 1, to: 3 }]
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
          layerSpacing: 40
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80,
              _figurePanelOptions: {
                parts: [
                  switcher($, go, {
                    stateCompute(n) {
                      return n.part.isTreeExpanded;
                    },
                    binding: binding($, go, {
                      visible: {
                        type: 'ofObject',
                        key: '',
                        handler(n) {
                          if (!n.findNodesOutOf().count) {
                            return false;
                          } else {
                            return true;
                          }
                        }
                      }
                    }),
                    events: {
                      click(state, n) {
                        let node = n.part;
                        if (state) {
                          node.collapseTree();
                        } else {
                          node.expandTree();
                        }
                        console.log(state, n);
                      }
                    }
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
