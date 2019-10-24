# 公共方法

提供了封装节点用到的一些公共方法

## panel

::: tip 提示
从 gojs 的 Panel 类封装的方法
:::
参数:type, props, parts, events, binding

type 对应于布局类型，可参考 gojs 文档，但该函数还给出了简写形式,对应关系如下:

```
{
  spot: 'Spot',
  hor: 'Horizontal',
  ver: 'Vertical',
  table: 'Table',
  pos: 'Position',
  auto: 'Auto',
  vbox: 'Viewbox',
  link: 'Link',
  grid: 'Grid',
  grad: 'Graduated'
}
```
### 基本用法
该例使用了水平布局，垂直布局和 spot 布局

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
      height="150px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils } from 'xdh-go';
  let { panel, node, textBlock } = utils;
  function block($, go, text, height, color, spotAlign) {
    let props = {
      text: text,
      background: color,
      width: 100,
      height: height,
      textAlign: 'center',
      verticalAlignment: go.Spot.Center
    };
    if (spotAlign) {
      props.alignment = spotAlign;
      props.alignmentFocus = new go.Spot(0, 1);
    }
    return textBlock($, go, {
      props: props
    });
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [{ key: '1', name: '节点1' }]
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
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          parts: [
            panel($, go, {
              type: 'hor',
              parts: [
                block($, go, 'left', 60, 'red'),
                panel($, go, {
                  type: 'ver',
                  parts: [
                    block($, go, 'rightTop', 30, 'blue'),
                    block($, go, 'rightBottom', 30, 'green')
                  ]
                })
              ]
            }),
            block($, go, 'message', 30, 'yellow', new go.Spot(1, 0))
          ]
        });
      }
    }
  };
</script>
```

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

参数包括 props, binding, events

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
              }),
              shape($, go, {
                props: {
                  stroke: '#ff9900',
                  fill: '#ff6600',
                  margin: new go.Margin(0, 0, 0, 50),
                  geometryString: 'M 0,0 L 10,50 20,10 30,50 40,0'
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
          props: {
            fromShortLength: 5,
            toShortLength: 20
          },
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
                props: {
                  toArrow: 'Standard',
                  stroke: 'red',
                  fill: 'red'
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

## makePort

makePort 是对 go.Shape 的封装，实现了一个连线点

参数包括 type, props, parts, binding, events

props 默认参数

```
  {
    fill: null,
    stroke: null,
    desiredSize: new go.Size(7, 7),
    alignment: defaultSpot,
    alignmentFocus: defaultSpot,
    portId: options.name || '',
    fromSpot: defaultSpot,
    toSpot: defaultSpot,
    fromLinkable: options.output || true,
    toLinkable: options.input || true,
    cursor: 'pointer'
  }
```

### 基本用法

示例中，makePort 定义到节点的左右侧。鼠标移到节点上时显示连接点

:::demo

```html
<template>
  <div>
    <xdh-tool v-if="$route.query.test"></xdh-tool>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="400px"
      :node-template="nodeTemplate"
      :link-template-map="linkTemplateMap"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, XdhTool, utils } from 'xdh-go';
  let { node, link, shape, panel, textBlock, binding, makePort } = utils;
  // from gojs sample extensions folder
  function getReshapingTool($, go) {
    function SnapLinkReshapingTool() {
      go.LinkReshapingTool.call(this);
      this._gridCellSize = new go.Size(NaN, NaN);
      this._gridOrigin = new go.Point(NaN, NaN);
      this._isGridSnapEnabled = true;
    }
    go.Diagram.inherit(SnapLinkReshapingTool, go.LinkReshapingTool);
    Object.defineProperty(SnapLinkReshapingTool.prototype, 'gridCellSize', {
      get: function() {
        return this._gridCellSize;
      },
      set: function(val) {
        if (!(val instanceof go.Size))
          throw new Error(
            'new value for SnapLinkReshapingTool.gridCellSize must be a Size, not: ' +
              val
          );
        this._gridCellSize = val.copy();
      }
    });
    Object.defineProperty(SnapLinkReshapingTool.prototype, 'gridOrigin', {
      get: function() {
        return this._gridOrigin;
      },
      set: function(val) {
        if (!(val instanceof go.Point))
          throw new Error(
            'new value for SnapLinkReshapingTool.gridOrigin must be a Point, not: ' +
              val
          );
        this._gridOrigin = val.copy();
      }
    });
    Object.defineProperty(
      SnapLinkReshapingTool.prototype,
      'isGridSnapEnabled',
      {
        get: function() {
          return this._isGridSnapEnabled;
        },
        set: function(val) {
          if (typeof val !== 'boolean')
            throw new Error(
              'new value for SnapLinkReshapingTool.isGridSnapEnabled must be a boolean, not: ' +
                val
            );
          this._isGridSnapEnabled = val;
        }
      }
    );
    SnapLinkReshapingTool.prototype.computeReshape = function(p) {
      var pt = p;
      if (this.isGridSnapEnabled) {
        var cell = this.gridCellSize;
        var orig = this.gridOrigin;
        if (!cell.isReal() || cell.width === 0 || cell.height === 0)
          cell = this.diagram.grid.gridCellSize;
        if (!orig.isReal()) orig = this.diagram.grid.gridOrigin;
        pt = p.copy().snapToGrid(orig.x, orig.y, cell.width, cell.height);
      }
      return go.LinkReshapingTool.prototype.computeReshape.call(this, pt);
    };
    return SnapLinkReshapingTool;
  }
  function showSmallPorts(node, show) {
    node.ports.each(function(port) {
      if (port.portId !== '') {
        port.fill = show ? 'rgba(0,0,0,.3)' : null;
        port.stroke = show ? 'rgba(255,255,255, 0.6)' : null;
      }
    });
  }
  export default {
    components: {
      XdhGo,
      XdhTool
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          { key: 'a', text: 'A' },
          { key: 'b', text: 'B' },
          { key: 'c', text: 'C' }
        ],
        links: []
      };
    },
    methods: {
      config($, go) {
        go.SnapLinkReshapingTool = getReshapingTool($, go);
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100,
          linkReshapingTool: $(go.SnapLinkReshapingTool),
          grid: $(
            go.Panel,
            'Grid',
            { gridCellSize: new go.Size(8, 8) },
            $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
            $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 })
          ),
          'draggingTool.isGridSnapEnabled': true,
          LinkReshaped: function(e) {
            e.subject.routing = go.Link.Orthogonal;
          },
          'animationManager.isEnabled': false,
          'undoManager.isEnabled': true
        };
      },
      layout($, go) {
        return $(go.ForceDirectedLayout, {});
      },
      diagramReady(diagram, $, go) {},
      nodeTemplate($, go) {
        return node($, go, {
          type: 'spot',
          props: {
            fromShortLength: 3,
            toShortLength: 3
          },
          events: {
            mouseEnter: function(e, node) {
              showSmallPorts(node, true);
            },
            mouseLeave: function(e, node) {
              showSmallPorts(node, false);
            }
          },
          parts: [
            panel($, go, {
              type: 'spot',
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
            }),
            makePort($, go, {
              spot: new go.Spot(0.1, 0.5),
              props: {
                strokeWidth: 2,
                portId: 'L',
                desiredSize: new go.Size(10, 10)
              }
            }),
            makePort($, go, {
              spot: new go.Spot(0.9, 0.5),
              props: {
                strokeWidth: 2,
                portId: 'R',
                desiredSize: new go.Size(10, 10)
              }
            })
          ]
        });
      },
      linkTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          '',
          link($, go, {
            props: {
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true
            },
            parts: [
              shape($, go, {
                props: {
                  stroke: '#000',
                  strokeWidth: 2
                }
              }),
              shape($, go, {
                props: {
                  toArrow: 'Standard',
                  stroke: '#000',
                  fill: '#000'
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
