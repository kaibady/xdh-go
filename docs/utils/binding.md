# 数据绑定

## binding 方法

binding 方法是对 go.Binding 对象的封装。通过传入约定好的 json 对象，转换成 go.Binding 对象的数组，以达到在一定程度上简化节点对数据绑定的定义

### 基本用法

最基本的用法是直接传字符串的键值对 {key:value},key 为绑定的节点属性，value 为节点数据的字段名。
如：

```
binding($, go, {
    text: 'text',
    stroke: 'stroke',
    textAlign: 'textAlign',
    font: 'font'
})
// 等价于 [
    new go.Binding('text', 'text'),
    new go.Binding('stroke', 'stroke'),
    new go.Binding('textAlign', 'textAlign'),
    new go.Binding('font', 'font')
    ]
```

或者传入对象

```
binding($, go, {
    text: { key: 'text' }
})
```

示例：
:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :node-template="nodeTemplate"
      :layout="layout"
      ref="diagram"
      height="150px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, textBlock, shape, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            text: 'node1',
            stroke: 'red',
            fill: '#f0f0f0'
          },
          {
            text: 'node2',
            stroke: 'blue',
            fill: '#fe00fe'
          },
          {
            text: 'node3',
            stroke: '#ff9900',
            fill: '#fefe00',
            font: 'bold 18pt "Microsoft Yahei"'
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
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          parts: [
            shape($, go, {
              type: 'RoundedRectangle',
              binding: binding($, go, {
                fill: 'fill'
              })
            }),
            textBlock($, go, {
              props: {
                font: 'bold 14pt serif'
              },
              binding: binding($, go, {
                text: 'text',
                stroke: 'stroke',
                font: 'font'
              })
            })
          ]
        });
      }
    }
  };
</script>
```

:::

### converter 转换函数

如果要绑定数据转换函数，则必须提供一个对象
如：

```
binding($, go, {
    text: {
      key: '', // key为空字符串时，回调函数的参数对应node.data
      handler(d) {
          return {1: '级别一', 2: '级别二'}[d.level]
      }
    }
})
/** 等价于
[
    new go.Binding('text', '', function(d) {
         return {1: '级别一', 2: '级别二'}[d.level]
    })
]
**/
binding($, go, {
    location: {
        key: 'loc',
        handler: go.Point.parse
    }
})
/**
等价于
[
    new go.Binding("location", "loc", go.Point.parse)
]
**/
```

ofObject

```
binding($, go, {
    stroke: {
      type: 'ofObject', // 对应的是go.Binding对象的方法名
      key: '', // key为空字符串时，回调函数的参数对应node
      handler(n) {
          return n.isSelected ? 'red' : null
      }
    }
})
/** 等价于
[
    new go.Binding('stroke', '', function(n) {
           return n.isSelected ? 'red' : null
    }).ofObject()
]
**/
```

ofModel

```
binding($, go, {
    color: {
      type: 'ofModel', // 对应的是go.Binding对象的方法名
      key: '', // key为空字符串时，回调函数的参数对应node.data
      handler(m) {
          return m.globalColor
      }
    }
})
/** 等价于
[
    new go.Binding('color', '', function(m) {
           return m.globalColor
    }).ofModel()
]
**/
```

其它情况：有时双向数据绑定需要调用 makeTwoWay 方法时，type 需要传数组

```
binding($, go, {
    location: {
        /** type 传一个数组，第二个元素是makeTwoWay方法的参数;
            参数如果有多个，则传一个数组，如[go.Point.stringify, otherParam],
            但按照go.Binding的文档来看，暂没有多个参数的情况。
        **/
      type: ['makeTwoWay', go.Point.stringify],
      key: 'loc', // key为空字符串时，回调函数的参数对应node.data
      handler: go.Point.parse
    }
})
/** 等价于
[
   new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
]
**/
```

下面是一个综合示例：
:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :node-template="nodeTemplate"
      :layout="layout"
      ref="diagram"
      height="300px"
      @on-ready="diagramReady"
    ></xdh-go>
    <div v-for="(item,idx) in nodes" :key="idx">
      {{ item.text }}:{{item.loc}}
    </div>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, textBlock, shape, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            text: 'node1',
            stroke: 'red',
            fill: '#f0f0f0',
            loc: ''
          },
          {
            text: 'node2',
            stroke: 'blue',
            fill: '#fe00fe',
            loc: ''
          },
          {
            text: 'node3',
            stroke: '#ff9900',
            fill: '#fefe00',
            font: 'bold 18pt "Microsoft Yahei"',
            loc: ''
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
        return $(go.GridLayout, {
          isOngoing: false
        });
      },
      diagramReady(diagram, $, go) {
        const margin = [20, 20, 20, 20];
        diagram.model.set(diagram.model.modelData, 'globalMargin', margin);
        let animateStep = 0.003;
        this.scaleAnimate = () => {
          var oldskips = diagram.skipsUndoManager;
          diagram.skipsUndoManager = true;
          diagram.nodes.each(Nb => {
            let borderObj = Nb.findObject('Bd');
            if (borderObj) {
              let obj = borderObj;
              if (obj) {
                let N = obj.part;
                if (!N.data.scaleDirect) {
                  N.data.scaleDirect = 'small';
                }
                if (N.data.scaleDirect === 'small' && N.scale < 0.8) {
                  N.scale = 0.8;
                  N.data.scaleDirect = 'big';
                }
                if (N.data.scaleDirect === 'big' && N.scale > 1) {
                  N.scale = 1;
                  N.data.scaleDirect = 'small';
                }
                if (N.data.scaleDirect === 'small') {
                  N.scale = N.scale - animateStep;
                }
                if (N.data.scaleDirect === 'big') {
                  N.scale = N.scale + animateStep;
                }
              }
            }
          });
          diagram.skipsUndoManager = oldskips;
          window.requestAnimationFrame(this.scaleAnimate);
        };
        // this.scaleAnimate()
        window.requestAnimationFrame(this.scaleAnimate);
      },
      scaleAnimate() {},
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          binding: binding($, go, {
            location: {
              type: ['makeTwoWay', go.Point.stringify],
              key: 'loc',
              handler: go.Point.parse
            },
            margin: {
              type: 'ofModel',
              key: '',
              handler(modelData) {
                return new go.Margin(...(modelData.nodeMargin || []));
              }
            }
          }),
          parts: [
            shape($, go, {
              type: 'RoundedRectangle',
              props: {
                name: 'Bd',
                strokeWidth: 3,
                alignment: go.Spot.Center
              },
              binding: binding($, go, {
                fill: 'fill',
                stroke: {
                  type: 'ofObject',
                  key: '',
                  handler(n) {
                    return n.isSelected ? 'red' : '#000';
                  }
                }
              })
            }),
            textBlock($, go, {
              props: {
                font: 'bold 14pt serif'
              },
              binding: binding($, go, {
                text: 'text',
                stroke: 'stroke',
                font: 'font'
              })
            })
          ]
        });
      }
    }
  };
</script>
```

:::
