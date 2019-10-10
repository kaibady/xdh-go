# 扩展参数(extension)

虽然通用连线定义方法提供了一些参数去影响连线的呈现，但实际使用时，连线可能会被设计成其它的个性化样式。为了使该通用连线定义方法能覆盖更多的使用场景，方法给出了大部分内部对象的参数，这些参数可对内部对象的属性进行覆盖，以定制出需要的样式。为了与数据绑定参数区分，这些参数以下划线\_开头，称为“扩展参数”，只在模板定义起作用，不能通过数据绑定。

## 基本用法

由于连线的结构较节点简单，扩展 参数较少
:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template="nodeTemplate"
      :link-template-map="linkTemplateMap"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="400px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl, utils } from 'xdh-go';
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
          {
            category: 'l1',
            from: 'a',
            to: 'b',
            label: 'link1',
            arrows: 'to',
            extendText1: '扩展文字1',
            extendText2: '扩展文字2'
          },
          {
            category: 'l2',
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
            strokeColor: 'blue',
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
      linkTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          'l1',
          linkTmpl($, go, {
            props: {
              arrows: {
                to: {
                  type: 'Standard'
                }
              },
              _linkOptions: {
                props: {
                  routing: go.Link.Orthogonal
                }
              },
              _outerPanelOptions: {
                props: {
                  segmentOffset: new go.Point(0, -10)
                }
              }
            }
          })
        );
        map.add(
          'l2',
          linkTmpl($, go, {
            props: {
              labelStroke: '#000',
              _linkOptions: {
                props: {
                  routing: go.Link.Orthogonal
                }
              },
              _labelShapeOptions: {
                props: {
                  stroke: 'rgba(255, 0, 0, 0.8)'
                }
              },
              _outerPanelOptions: {
                props: {
                  segmentOffset: new go.Point(0, 50)
                }
              },
              _innerPanelOptions: {
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

## 扩展参数说明
![image](/xdh-go/img/desc/linkdesc1.jpg)
```
/// 扩展参数

    // 连线go.Link属性
    _linkOptions: {
      props: {},
      parts: []
    },

    // 连线go.Shape属性
    _lineOptions: {
      props: {},
      parts: []
    },

     // 连线占位go.Shape属性
    _linkHolderOptions: {
      props: {},
      parts: []
    },

    // 箭头to的go.Shape属性
    _toArrowOptions: {
      props: {},
      parts: []
    },

    // 箭头from的go.Shape属性
    _fromArrowOptions: {
      props: {},
      parts: []
    },

    // 标签外层go.Panel属性
    _outerPanelOptions: {
      props: {},
      parts: []
    },

     // 标签内层go.Panel属性
    _innerPanelOptions: {
      props: {},
      parts: []
    },

       // 标签边框go.Shape属性
    _labelShapeOptions: {
      props: {},
      parts: []
    },
         // 标签的go.TextBlock属性
    _labelTextOptions: {
      props: {},
      parts: []
    }
```