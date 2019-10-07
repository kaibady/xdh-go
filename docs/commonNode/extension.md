# 扩展参数(extensions)

虽然通用节点定义方法提供了一些参数去影响节点的呈现，但实际使用时，节点可能会被设计成其它的个性化样式。为了使该通用节点定义方法能覆盖更多的使用场景，方法给出了大部分内部对象的参数，这些参数可对内部对象的属性进行覆盖，以定制出需要的样式。为了与数据绑定参数区分，这些参数以下划线\_开头，称为“扩展参数”，只在模板定义起作用，不能通过数据绑定。

## 基本使用

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { textBlock, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            category: 't1',
            label: 'image',
            image: '/img/node/circleimage/1.png',
            extendText1: '扩展文字1',
            extendText2: '扩展文字2'
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
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          't1',
          nodeTmpl($, go, {
            props: {
              shape: 'image',
              size: 80,
              stateShape: 'Rectangle',
              labelBackground: 'transparent',
              labelStroke: 'transparent',
              labelColor: '#000',
              _nodeOptions: {
                props: {
                  resizable: true
                }
              },
              _outerPanelOptions: {
                props: {
                  padding: new go.Margin(10, 10, 10, 10),
                  background: '#c6e2ff'
                }
              },
              _innerPanelOptions: {
                props: {
                  type: go.Panel.Horizontal
                }
              },
              _labelPanelOptions: {
                parts: [
                  textBlock($, go, {
                    props: {
                      margin: new go.Margin(5, 10, 5, 10)
                    },
                    binding: binding($, go, {
                      text: 'extendText1'
                    })
                  }),
                  textBlock($, go, {
                    props: {
                      margin: new go.Margin(5, 10, 5, 10)
                    },
                    binding: binding($, go, {
                      text: 'extendText2'
                    })
                  })
                ]
              }
            }
          })
        );
        return map;
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
