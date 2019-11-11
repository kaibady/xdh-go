# 动效

## 动效参数

动效参数可再节点模板中定义，也可在节点数据中定义
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| animation | 动画参数 | [Object] | - | - |
| animation[n].trigger | 动画触发事件 | String | 'mouseEnter'/ 'mouseLeave'/'click'/'dbclick'| 'mouseEnter' |
| animation[n].objectName | 动画施加的对象名称或者节点数据的属性 | String | 1.通用节点：'tNode'(节点对象)/'tFigure'(图形对象)/'tLabel'(文字对象)/'tTag'(标签) 2.自定义对象的 name 名称。3.节点数据'data',或对象内的属性，如, 'data.strokeWidth' |''|
| animation[n].prop | 动画对象需要变更的属性 | String | -|''|
| animation[n].propType | 动画对象属性的类型， | String |'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'|根据 prop 自动匹配属性的类型，但有些属性可以有多种类型，需指定|
| animation[n].keyFrame | 动画开始和结束的属性值 | Array | 根据 propType 变化 |[0, 1]|
| animation[n].name | 动画名称，与 prevName 配合使用 | String | - |''|
| animation[n].prevName | 上一个动画名称，如果为空字串则直接执行，如果不为空则在指定动画结束后再执行 | String | - |''|
| animation[n].duration | 动画持续时间，毫秒 | Number | -|300|
| animation[n].delay | 动画延迟的时间，毫秒 | Number | - |0|
| animation[n].repeatCount | 动画重复的次数 | Number | - |1|
| animation[n].direction | 动画重复时，偶数次是否反向播放 | String | 'normal'/'alternate' |'normal'|
| animation[n].easingFunc | 动画速度曲线 | [String/Function],String 类型是内置方法名称，Function 类型为自定义方法 | - |['easeInQuad']|

## 事件触发(trigger)

因为节点变化可能会触发布局重新计算，从而影响动画执行，因此动画开始时会自动将 isOnging 参数设置为 false,动画执行后再重置。鼠标移开后节点会回到原来的状态，是因为节点还同时受到数据双向绑定的限制，是正常现象。
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
      height="250px"
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
            label: 'click',
            animation: [
              {
                trigger: 'click',
                objectName: 'tNode',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: 'mouseEnter\nmouseLeave',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInQuad']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.2, 1],
                easingFunc: ['easeOutQuart']
              }
            ]
          },
          {
            key: 3,
            label: 'dbclick',
            animation: [
              {
                trigger: 'dbclick',
                objectName: 'tNode',
                duration: 500,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInQuad']
              }
            ]
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
          layerSpacing: 150,
          direction: 90,
          isOngoing: false
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## 指定不同的内部对象

objectName 指通用节点的内部对象定义的内，其中 tNode 指整个节点，tFigure 指图形部分，tLabel 指文字部分,tTag 指标签部分。如果通过扩展参数插入了其它部件，可自定义 name 并通过数据 animation.objectName 指定动画。 示例：鼠标放到各节点上，并比较差别
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
      height="250px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag } = utils;
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
            label: 'tNode',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tNode',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: 'tFigure',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },

          {
            key: 3,
            label: 'tLabel',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 4,
            label: 'tTag',
            tag: {
              text: '标签'
            },
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 5,
            label: '自定义对象',
            mytag: '自定义对象',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myTag',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
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
          layerSpacing: 150,
          direction: 90,
          isOngoing: true
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.5, 0)
                  },
                  name: 'myTag',
                  figure: 'RoundedRectangle',
                  fill: '#eb2f96',
                  stroke: '#780650',
                  color: '#000',
                  strokeWidth: 2,
                  textKey: 'mytag'
                })
              ]
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

## 节点属性

prop 参数用于指定对节点或内部对象的哪个属性施加动画（见下方"常用参数与类型"）。由于各属性使用的数据类型不相同，需要通过 propType 进行指定。（包括'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'）动画内部会通过 prop 自动匹配数据类型,但某些参数可能会有多种类型，有时需要显式定义。
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
      height="250px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag, shape, binding } = utils;
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
            label: 'alignment:spot类型属性',
            mytag: 'spot',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myTag',
                duration: 300,
                prop: 'alignment',
                propType: 'spot',
                keyFrame: [[0.3, 0], [0.7, 0]],
                easingFunc: ['easeInOutCubic', 'easeInElastic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myTag',
                duration: 300,
                prop: 'alignment',
                propType: 'spot',
                keyFrame: [[0.7, 0], [0.3, 0]],
                easingFunc: ['easeInOutCubic', 'easeInElastic']
              }
            ]
          },
          {
            key: 2,
            label: 'number',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1, 1.2],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 300,
                prop: 'scale',
                keyFrame: [1.2, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 3,
            label: 'position:point',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 300,
                prop: 'position',
                keyFrame: [[0, 100], [0, -10]],
                easingFunc: ['easeInOutCubic', 'easeInOutQuad']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 300,
                prop: 'position',
                keyFrame: [[0, -10], [0, 100]],
                easingFunc: ['easeInOutCubic', 'easeInOutQuad']
              }
            ]
          },
          {
            key: 4,
            label: 'padding:margin',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 200,
                prop: 'padding',
                keyFrame: [[0, 0, 0, 0], [0, 0, 20, 0]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                duration: 200,
                prop: 'padding',
                keyFrame: [[0, 0, 20, 0], [0, 0, 0, 0]],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 5,
            label: 'fill:rgba',
            showShape: true,
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                duration: 800,
                prop: 'fill',
                keyFrame: [[255, 133, 192, 1], [133, 165, 255, 0.5]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'myShape',
                duration: 800,
                prop: 'fill',
                keyFrame: [[133, 165, 255, 0.5], [255, 133, 192, 1]],
                easingFunc: ['easeInOutCubic']
              }
            ]
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
          layerSpacing: 150,
          direction: 90,
          isOngoing: false
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          parts: {
            down: [
              shape($, go, {
                props: {
                  name: 'myShape',
                  figure: 'RoundedRectangle',
                  stroke: '#ccc',
                  width: 150,
                  height: 150,
                  fill: 'rgba(255,133,192,1)'
                },
                binding: binding($, go, {
                  visible: {
                    key: '',
                    handler(d) {
                      return d.showShape;
                    }
                  }
                })
              })
            ]
          },
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.3, 0)
                  },
                  name: 'myTag',
                  figure: 'RoundedRectangle',
                  fill: '#eb2f96',
                  stroke: '#780650',
                  color: '#000',
                  strokeWidth: 2,
                  textKey: 'mytag'
                })
              ]
            },
            _labelOuterPanelOptions: {
              props: {
                position: new go.Point(0, 100)
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

## 动画设置

动画相关设置包括 delay(动画延时毫秒数), repeatCount(动画重复次数), direction(重复方式), easingFunc(属性变化曲线)。其中 easingFunc 数组内的缓动方法与不同属性类型数组内的数值一一对应。
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
      height="500px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag, shape, binding } = utils;
  function customEasing(x) {
    if (x <= 0.2) {
      return 0.2;
    } else if (x <= 0.4) {
      return 0.4;
    } else if (x <= 0.6) {
      return 0.6;
    } else if (x <= 0.8) {
      return 0.8;
    } else {
      return 1;
    }
  }
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
            label: 'delay:500ms',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                delay: 500,
                duration: 300,
                prop: 'scale',
                propType: 'number',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tFigure',
                delay: 500,
                duration: 300,
                prop: 'scale',
                propType: 'number',
                keyFrame: [1.4, 1],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: [{ text: 'repeatCount:4' }, { text: "direction: 'normal'" }],
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                repeatCount: 4,
                direction: 'normal',
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 3,
            label: [
              { text: 'repeatCount:4' },
              { text: "direction: 'alternate'" }
            ],
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 300,
                repeatCount: 4,
                direction: 'alternate',
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 4,
            label: {
              text: 'dot',
              margin: 5
            },
            tooltip: 'easingFunc',
            labelStroke: '#10239e',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[0, 100], [100, 0]],
                easingFunc: ['ease', 'easeOutCirc']
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[100, 0], [0, 100]],
                easingFunc: ['ease', 'easeInCirc']
              }
            ]
          },
          {
            key: 5,
            label: {
              text: '自定义缓动',
              margin: 5
            },
            tooltip: 'easingFunc自定义',
            labelStroke: '#10239e',
            layout: 'Position',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[0, 100], [100, 0]],
                easingFunc: ['ease', customEasing]
              },
              {
                trigger: 'mouseLeave',
                objectName: 'tLabel',
                duration: 1000,
                prop: 'position',
                keyFrame: [[100, 0], [0, 100]],
                easingFunc: ['ease', customEasing]
              }
            ]
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        };
      },
      layout($, go) {
        return $(go.GridLayout, {
          wrappingColumn: 3
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.3, 0)
                  },
                  name: 'myTag',
                  figure: 'RoundedRectangle',
                  fill: '#eb2f96',
                  stroke: '#780650',
                  color: '#000',
                  strokeWidth: 2,
                  textKey: 'mytag'
                })
              ]
            },
            _labelOuterPanelOptions: {
              props: {
                position: new go.Point(0, 100)
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

## 动画衔接

通过 name 和 prevName 属性，可以定义同一事件多个动画的先后次序。如果没有定义 prevName，则动画马上执行；如果没找到与 prevName 匹配的动画 name，该动画将不执行。
下例中，先执行外框的 margin 动画，再执行 background 颜色变换。注意，所有 animation 设置都可以写到节点模板中，将影响所有节点，节点数据中如果定义了 animation，将覆盖模板中的定义。

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
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils } from 'xdh-go';
  let { tag, shape, binding } = utils;
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
            label: '动画衔接1',
            showShape: true
          },
          {
            key: 2,
            label: '动画衔接2',
            showShape: true
          },
          {
            key: 3,
            label: '动画衔接3',
            showShape: true,
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate1',
                objectName: 'myShape',
                duration: 800,
                prop: 'width',
                propType: 'number',
                keyFrame: [150, 120],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                name: 'animate2',
                prevName: 'animate1',
                delay: 500,
                duration: 800,
                prop: 'fill',
                keyFrame: [[255, 236, 61, 0.5], [186, 230, 55, 1]],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'tLabel',
                prevName: 'animate3',
                delay: 500,
                duration: 800,
                prop: 'scale',
                keyFrame: [1, 1.4],
                easingFunc: ['easeInOutCubic']
              }
            ]
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        };
      },
      layout($, go) {
        return $(go.GridLayout, {
          wrappingColumn: 3
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          parts: {
            down: [
              shape($, go, {
                props: {
                  name: 'myShape',
                  figure: 'RoundedRectangle',
                  stroke: '#ccc',
                  width: 150,
                  height: 150,
                  fill: 'rgba(133, 165, 255, 0.5)'
                },
                binding: binding($, go, {
                  visible: {
                    key: '',
                    handler(d) {
                      return d.showShape;
                    }
                  }
                })
              })
            ]
          },
          props: {
            shape: 'Circle',
            size: 80,
            animation: [
              {
                trigger: 'mouseEnter',
                name: 'animate1',
                objectName: 'myShape',
                duration: 800,
                prop: 'width',
                propType: 'number',
                keyFrame: [150, 120],
                easingFunc: ['easeInOutCubic']
              },
              {
                trigger: 'mouseEnter',
                objectName: 'myShape',
                prevName: 'animate1',
                delay: 500,
                duration: 800,
                prop: 'fill',
                keyFrame: [[133, 165, 255, 0.5], [255, 133, 192, 1]],
                easingFunc: ['easeInOutCubic']
              }
            ],
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  props: {
                    alignment: new go.Spot(0.3, 0)
                  },
                  name: 'myTag',
                  figure: 'RoundedRectangle',
                  fill: '#eb2f96',
                  stroke: '#780650',
                  color: '#000',
                  strokeWidth: 2,
                  textKey: 'mytag'
                })
              ]
            },
            _labelOuterPanelOptions: {
              props: {
                position: new go.Point(0, 100)
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

## 自定义事件

通过 AnimationEvents 类对象，可以自定义事件，通过 emit 手动触发事件。由此可以实现动画循环效果。
on 方法用于注册所有节点的默认动画，当节点中没有动画配置时，使用该动画配置。
emit 方法第二个参数传 node 节点对象时，触发单个节点动画，如果传'all'字符串，触发所有节点相关动画。

AnimationEvents 类

构造函数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| diagram | go.Diagram 对象 | go.Diagram 对象 | - | - |
| go | gojs 库 | Object | - | - |

方法
| 方法名 | 说明 | 参数 |
| ----------------- | ------ | --------------------------------- |
| on | 注册节点的自定义事件 | event(事件名称), target(注册对象),animation(动画数组)。target 为'all'时，为所有节点注册，为 key 或 data 或 node 的数组时，为相应节点注册 |
| off | 注销节点事件 | event(事件名称), target(注销对象)。target 为'all'时，注销所有节点事件，为 key 或 data 或 node 的数组时，注销相应节点 |
| emit | 触发事件 | event(事件名称), target(注册对象), afterFinish(执行完毕后的回调方法，参数 true 为正常执行，false 为没有执行)。target 为'all'时，触发所有节点动画，为 key 或 data 或 node 数组时，触发相应节点动画 |


:::demo

```html
<template>
  <div>
    <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" size="mini" @click="triggerRotate()"
        >单节点rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="triggerAllRotate()"
        >所有节点rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="triggerAllRotateReverse()"
        >特定节点rotateReverse事件</el-button
      >
      <el-button type="primary" size="mini" @click="triggerSlide()"
        >特定节点slide事件</el-button
      >
      <el-button type="primary" size="mini" @click="startRotate()"
        >循环rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="endRotate()"
        >停止循环rotate</el-button
      >
    </div>
    <div style="text-align:center;margin-top:10px;">
          <el-button type="primary" size="mini" @click="registerRotate()"
        >注册rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="unregisterRotate()"
        >注销rotate事件</el-button>
    </div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
      @on-load-data="onLoadData"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, utils, animation } from 'xdh-go';
  let { tag, shape, binding } = utils;
  let { AnimationEvents } = animation;
  let animationEvents;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        animateContinue: false,
        nodes: [
          {
            key: 1,
            label: '节点预定义slide事件',
            loadTag: '\uE701',
            animation: [
              {
                trigger: 'slide',
                objectName: 'loadTag',
                duration: 800,
                prop: 'alignment',
                propType: 'spot',
                repeatCount: 2,
                direction: 'alternate',
                keyFrame: [[0.5, 0.5], [1, 0.5]],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: '使用all注册默认',
            loadTag: '\uE721'
          },
          {
            key: 3,
            label: '注册特定节点',
            loadTag: '\uE6dd'
          },
          {
            key: 4,
            label: '注册特定节点',
            loadTag: '\uE693'
          }
        ]
      };
    },
    methods: {
      registerRotate() {
        animationEvents.on('rotate', 'all', [
          {
            trigger: 'rotate',
            objectName: 'loadTag',
            duration: 800,
            prop: 'angle',
            propType: 'number',
            keyFrame: [0, 360],
            easingFunc: ['ease']
          }
        ])
      },
      unregisterRotate() {
          animationEvents.off('rotate', 'all')
      },
      triggerRotate() {
        let node = this.$refs.diagram.findNode(r => r.key === 2, true);
        animationEvents.emit('rotate', node);
      },
      triggerAllRotate() {
        animationEvents.emit('rotate', 'all');
      },
      triggerAllRotateReverse() {
        animationEvents.emit('rotateReverse', 'all');
      },
      triggerSlide() {
        animationEvents.emit('slide', 'all');
      },
      startRotate() {
        this.animateContinue = true;
        this.runRotate();
      },
      endRotate() {
        this.animateContinue = false;
      },
      runRotate() {
        animationEvents.emit('rotate', 'all', () => {
          if (this.animateContinue) {
            this.runRotate();
          }
        });
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        };
      },
      layout($, go) {
        return $(go.GridLayout, {
          wrappingColumn: 3
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80,
            _figurePanelOptions: {
              parts: [
                tag($, go, {
                  name: 'loadTag',
                  fill: 'transparent',
                  font: '22px "iconfont"',
                  placement: 'center',
                  stroke: 'transparent',
                  color: '#000',
                  strokeWidth: 0,
                  textKey: 'loadTag'
                })
              ]
            }
          }
        });
      },
      diagramReady(diagram, $, go) {},
      onLoadData(diagram, $, go) {
        animationEvents = new AnimationEvents(diagram, go);
        diagram.animationEvents = animationEvents;
        // 添加所有节点默认事件
        this.registerRotate()
        // 添加特定节点事件
        animationEvents.on(
          'rotateReverse',
          [3, 4],
          [
            {
              trigger: 'rotateReverse',
              objectName: 'loadTag',
              duration: 800,
              prop: 'angle',
              propType: 'number',
              keyFrame: [360, 0],
              easingFunc: ['easeInOutCubic']
            }
          ]
        );
      }
    }
  };
</script>
```

:::

## 补充说明

### 属性值类型

keyFrame 所传的数组需根据 propType 的类型传值,举例：

> number: 如[0, 1]

> spot: 如 [[0.5, 0.5], [0.6, 0.6]]

> point: 如 [[100, 200], [150, 250]]

> size: 如 [[50, 50], [60, 60]]

> margin: 如 [[10, 10, 10, 10], [20, 20, 20, 20]]

> rect: 如 [[20, 20, 20, 20], [40, 40, 40, 40]]

> rgba: 如 [[255,255,255,0.8], [158, 158, 158, 0.8]]

### 常用参数与类型

```
{
    "alignment":"spot",
    "alignmentFocus":"spot",
    "fromSpot":"spot",
    "toSpot":"spot",
    "verticalAlignment":"spot",
    "imageAlignment":"spot",
    "locationSpot":"spot",
    "rotationSpot":"spot",
    "angle":"number",
    "fromShortLength":"number",
    "height":"number",
    "opacity":"number",
    "scale":"number",
    "segmentFraction":"number",
    "toEndSegmentLength":"number",
    "toShortLength":"number",
    "width":"number",
    "shadowBlur":"number",
    "corner":"number",
    "curviness":"number",
    "smoothness":"number",
    "desiredSize":"size",
    "maxSize":"size",
    "minSize":"size",
    "margin":"margin",
    "padding":"margin",
    "avoidableMargin":"margin",
    "sourceRect":"rect",
    "position":"point",
    "segmentOffset":"point",
    "location":"point",
    "maxLocation":"point",
    "minLocation":"point",
    "shadowOffset":"point",
    "areaBackground":"rgba",
    "background":"rgba",
    "fill":"rgba",
    "stroke":"rgba",
    "shadowColor":"rgba"
    }
```

### 动效函数

动画函数包括：
ease,
easeInQuad,
easeOutQuad,
easeInOutQuad,
easeInCubic,
easeOutCubic,
easeInOutCubic,
easeInQuart,
easeOutQuart,
easeInOutQuart,
easeInQuint,
easeOutQuint,
easeInOutQuint,
easeInSine,
easeOutSine,
easeInOutSine,
easeInExpo,
easeOutExpo,
easeInOutExpo,
easeInCirc,
easeOutCirc,
easeInOutCirc,
easeInElastic,
easeOutElastic,
easeInOutElastic,
easeInBack,
easeOutBack,
easeInOutBack,
easeInBounce,
easeOutBounce,
easeInOutBounce
