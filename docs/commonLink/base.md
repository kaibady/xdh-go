# 使用方法

工具定义了一个通用的连线方法，通过简单修改节点的参数，可以达到快速定义连线模板的目的。同时，连线的数据与模板的相关属性绑定，可覆盖连线模板的参数。

举个例子, 下图中，模板定义了连线默认 箭头形状为 'Standard', link1 数据中没有定义 arrows，因此跟随模板的定义，而 node2 中数据定义了 background, 数据的优先级比模板高，覆盖了模板参数。

基本定义形式

```
import { linkTmpl } from 'xdh-go';
linkTmpl($, go, {
    props: {
    arrows: {
      to: {
        type: 'Standard'
      }
    },
    label: {
      text: '标签内容'
    }
    }
})
links=  [
          {
            from: 'a',
            to: 'b',
            label: 'link1'
          },
          { from: 'c',
          to: 'd',
          label: 'link2', arrows: { type: 'Triangle' } }
        ]
```

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
      height="400px"
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
          { from: 'a', to: 'b', label: 'link1', arrows: 'to' },
          {
            from: 'c',
            to: 'd',
            label: 'link2',
            arrows: {
              to: {
                type: 'Triangle',
                scale: 1.5
              },
              from: {
                type: 'Circle'
              }
            },
            arrowFill: 'transparent'
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
        return $(go.LayeredDigraphLayout, {});
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
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: {
              to: {
                type: 'Standard'
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

# 所有默认参数

以下是通用节点的所有默认参数设置，定义时通过 nodeTmpl 第三个参数的 props 传入。其中带下划线的参数为扩展参数，是为了满足特定需求下能改变内部元素的样式及增加内容，但这些参数不能被节点数据中的参数覆盖。

后面将有特定部分讲解扩展参数的使用

```
/**
状态值说明：
    normal：正常状态,
    highlight: 节点isHighlighted为true时
    select: 节点isSelected为true是
    hover: 节点鼠标经过时
**/
{
   /**
    箭头类型及参数，可简写, 如 arrows: 'from, to', 简写时scale变量跟随默认值，包含有from则 from的show为true, to亦然
   **/
    arrows: {
      to: {
        type: 'Standard',
        scale: 1,
        show: false
      },
      from: {
        type: 'Standard',
        scale: 1,
        show: false
      }
    },

    // go.Link的curve属性
    curve: go.Link.Bezier,

    // go.Link的curviness属性
    curviness: 10,

    // go.Link的corner属性
    corner: 0,

    // go.Link的routing属性
    routing: go.Link.Normal,

    // go.Link的smoothness属性
    smoothness: 0.5,

    // 是否为虚线，传false或true, 或一个数组，如dashes: [8,4,8,4]
    dashes: false,

    // 连线是否显示，为false时，设置opacity为0
    hidden: false,

     // 连线宽度，可简写, 如 strokeWidth: 1,简写时四种状态都为同一宽度
    strokeWidth: {
      normal: 1,
      hover: 2,
      highlight: 2,
      select: 2
    },

     // 连线颜色，可简写, 如 strokeColor: '#ccc',简写时四种状态都为同一种颜色
    strokeColor: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },

    // 箭头内部填充颜色，可简写, 如 arrowFill: '#ccc',简写时四种状态都为同一种颜色
    arrowFill: {
      normal: '#000',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },

     // 标签颜色, 可简写, 如 labelStroke: '#ccc',简写时四种状态都为同一种颜色
    labelStroke: {
      normal: '#000',
      hover: 'blue',
      highlight: 'blue',
      select: 'blue'
    },

     // 标签文字，可简写, 如 labelColor: '#ccc',简写时四种状态都为同一种颜色
    labelColor: {
      normal: '#000',
      highlight: '#fff',
      hover: '#fff',
      select: '#fff'
    },

     // 标签背景色，可简写, 如 labelBackground: '#ccc',简写时四种状态都为同一种颜色
    labelBackground: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },

     // 标签内容及样式, 可简写,如 label: 'node1', 简写时文本内容会赋值给text,其它与默认值相同
    label: {
      text: '',
      font: '13px sans-serif',
      scale: 1
    },

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

      // 标签的go.TextBlock属性
    _labelTextOptions: {
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
    }
  };
}
```
