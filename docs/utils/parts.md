# 部件

::: tip 提示
针对一些较为常用的元素，本工具封装了一些方法，以求使用时更方便
:::

## iconfont

iconfont 是对 go.TextBlock 的封装，显示为字体图标

参数 icon, props, parts, binding, events, 其中 icon 为字体图标转义字符

props 默认参数为

```
{
    font: `30px "iconfont"`,
    stroke: '#000',
    wrap: go.TextBlock.OverflowEllipsis,
    editable: false,
    textAlign: 'center',
    alignment: go.Spot.Center,
    verticalAlignment: go.Spot.Top,
    scale: 1
  }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, iconfont, panel } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: []
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
      diagramReady(diagram, $, go) {
        diagram.add(
          node($, go, {
            type: 'hor',
            parts: [
              iconfont($, go),
              iconfont($, go, {
                icon: '\uE6A4',
                props: {
                  stroke: 'blue',
                  font: '60px "element-icons"',
                  margin: new go.Margin(0, 50, 0, 0)
                }
              })
            ]
          })
        );
      }
    }
  };
</script>
```

:::

## picture

picture 是对 go.Picture 的封装，显示图片元素

参数 clip,panel, props, binding 其中 clip 为 go.Shape 剪切图形, panel 为包裹剪切图形和 go.Picture 的 go.Panel 对象。 而 props 和 binding,指的是 go.Picture 的参数和数据绑定

props 默认参数为

```
 {
      props: {
          name: 'Picture',
        sourceCrossOrigin: function() {
        return 'use-credentials';
        },
        width: 60,
        height: 60
      },
      binding: [],
      clip: {
        props: {
            figure: 'Circle',
            width: 60,
            height: 60
        },
        binding: []
      },
      panel: {
        type: 'Spot',
        props: {
            name: 'image',
            isClipping: true,
            scale: 1
        },
        binding: []
      }
    }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      :node-template-map="nodeTemplateMap"
      ref="diagram"
      height="150px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, picture, panel, binding } = utils;
  function pictureBinding($, go) {
    return binding($, go, {
      source: 'source'
    });
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
            category: 'a',
            source: '/img/node/circleimage/1.png'
          },
          {
            category: 'b',
            source: '/img/node/image/2.png'
          },
          {
            category: 'c',
            source: '/img/node/circleimage/3.png'
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
          'a',
          node($, go, {
            parts: [
              picture($, go, {
                binding: pictureBinding($, go)
              })
            ]
          })
        );
        map.add(
          'b',
          node($, go, {
            parts: [
              picture($, go, {
                props: {
                  width: 70,
                  height: 70,
                  imageStretch: go.GraphObject.UniformToFill
                },
                binding: pictureBinding($, go),
                clip: false
              })
            ]
          })
        );
        map.add(
          'c',
          node($, go, {
            parts: [
              picture($, go, {
                props: {
                  width: 50,
                  height: 50
                },
                binding: pictureBinding($, go),
                clip: {
                  props: {
                    figure: 'Diamond'
                  }
                }
              })
            ]
          })
        );
        return map;
      }
    }
  };
</script>
```

:::

## shape

shape 是对 go.Shape 的封装

参数包括 props, parts, binding, events

props 默认参数为

```
{
      width: 30,
      height: 30,
      fill: '#000',
      stroke: '#000',
      strokeWidth: 1
    }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, shape, panel } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: []
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
      diagramReady(diagram, $, go) {
        diagram.add(
          node($, go, {
            type: 'hor',
            parts: [
              shape($, go),
              shape($, go, {
                props: {
                  figure: 'Circle',
                  stroke: '#ff9900',
                  fill: '#ff6600',
                  margin: new go.Margin(0, 0, 0, 50)
                }
              })
            ]
          })
        );
      }
    }
  };
</script>
```

:::

## textBlock

textBlock 是对 go.TextBlock 的封装

参数包括 props, parts, binding, events

props 默认参数为

```
{
    stroke: '#000',
    text: 'default Text',
    textAlign: 'center',
    verticalAlignment: go.Spot.Center,
    scale: 1
  }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, textBlock } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: []
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
      diagramReady(diagram, $, go) {
        diagram.add(
          node($, go, {
            type: 'hor',
            parts: [
              textBlock($, go),
              textBlock($, go, {
                props: {
                  text: '文字一',
                  stroke: 'red',
                  font: 'bold 14pt serif',
                  margin: new go.Margin(0, 0, 0, 50)
                }
              })
            ]
          })
        );
      }
    }
  };
</script>
```

:::

## tooltip

tooltip 是对 go.Adornment, go.TextBlock, go.Shape 的封装

参数包括 props, binding, adorment, shape, 其中 props 和 binding 分别对应 go.TextBlock 的参数和数据绑定;
adorment 对应 go.Adornment 对象参数,shape 对应 go.Shape 对象参数

默认参数为

```
{
    props: {
      margin: 8,
      stroke: '#fff',
      font: 'bold 16px sans-serif'
    },
    binding: [],
    adornment: {
        props: {},
        binding: []
    },
    shape: {
        props: {
            fill: 'rgba(0,0,0,0.6)',
            strokeWidth: 1
        },
        binding: []
    }
}
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, tooltip, shape } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: []
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 50
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {});
      },
      diagramReady(diagram, $, go) {
        diagram.add(
          node($, go, {
            type: 'hor',
            props: {
              toolTip: tooltip($, go, {
                props: {
                  text: '提示',
                  stroke: '#fff'
                },
                shape: {
                  props: {
                    figure: 'Circle',
                    stroke: 'red',
                    fill: 'rgba(255,0, 0, 0.8)'
                  }
                }
              })
            },
            parts: [shape($, go)]
          })
        );
      }
    }
  };
</script>
```

:::

## node

node 是对 go.Node 的封装

参数包括 props, parts, binding, events

props 默认参数

```
{
    background: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    selectionAdorned: false
  }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, shape } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: []
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 50
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {});
      },
      diagramReady(diagram, $, go) {
        diagram.add(
          node($, go, {
            type: 'auto',
            parts: [shape($, go)]
          })
        );
      }
    }
  };
</script>
```

:::

## link

node 是对 go.Link 的封装

参数包括 props, parts, binding, events

props 默认参数

```
    {
      selectionAdorned: false
    }
```

### 基本用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      :node-template="nodeTemplate"
      :link-template-map="linkTemplateMap"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { node, link, shape, textBlock, binding } = utils;
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          { key: 'a', text: 'A' },
          { key: 'b', text: 'B' },
          { key: 'c', text: 'C' }
        ],
        links: [
          { from: 'a', to: 'b' },
          { from: 'b', to: 'c', category: 'dash' }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 50
        };
      },
      layout($, go) {
        return $(go.LayeredDigraphLayout, {});
      },
      nodeTemplate($, go) {
        return node($, go, {
          parts: [
            shape($, go, {
              props: {
                figure: 'RoundedRectangle',
                fill: 'red'
              }
            }),
            textBlock($, go, {
              props: {
                stroke: '#fff',
                margin: 12
              },
              binding: binding($, go, { text: 'text' })
            })
          ]
        });
      },
      linkTemplateMap($, go) {
        let map = new go.Map();
        map.add('', link($, go));
        map.add(
          'dash',
          link($, go, {
            parts: [
              shape($, go, {
                props: {
                  strokeDashArray: [8, 4, 8, 4],
                  stroke: 'red',
                  strokeWidth: 4
                }
              }),
              shape($, go, {
                toArrow: 'Standard'
              })
            ]
          })
        );
        return map;
      }
    }
  };
</script>
```

:::

## makeport
