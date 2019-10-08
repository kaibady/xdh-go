# 图片(image)

当设置 shape 为'image'时，显示 image 参数提供的地址，通过 go.Picture 对象显示，如果显示出错，则显示 brokenImage 提供的地址，如果仍加载失败，则显示一张灰色的底图。 通过 stateShape 可指定外框图形

## 基本用法

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
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '正常图片',
            image: 'img/node/circleimage/1.png'
          },
          {
            label: '默认图片',
            image: 'img/node/circleimage/b.png',
            brokenImage: 'img/node/circleimage/4.png'
          },
          {
            label: '图片错误',
            image: 'img/node/circleimage/a.png'
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
        return nodeTmpl($, go, {
          props: {
            shape: 'image',
            size: 80,
            stateShape: 'Rectangle',
            background: 'transparent',
            labelBackground: 'transparent',
            labelStroke: '#000'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## 通用特性

以下几个参数不论是 image 类型还是其它几种类型都会起效

### background

图形的背景色，有 normal, highlight,hover,select 四种状态颜色

### strokeColor

状态框的边框颜色，有 normal, highlight,hover,select 四种状态颜色

### strokeWidth

状态框的边框宽度，有 normal, highlight,hover,select 四种状态的宽度

### scale

节点缩放尺寸

### size

节点尺寸， 宽高相同

### loc

节点默认位置

### tooltip

鼠标悬停的提示信息

### labelStroke

文字颜色

### labelBackground

文字背景色

### label

文字样式

### 综合示例
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
      height="450px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '参数跟随模板',
            image: 'img/node/circleimage/1.png'
          },
          {
            label: '边框样式覆盖',
            image: 'img/node/circleimage/2.png',
            strokeColor: {
              normal: 'rgba(180, 50, 50, 0.6)',
              highlight: 'rgba(50, 180, 50,0.6)',
              hover: 'rgba(50, 50, 180, 1)',
              select: 'rgba(50, 50, 180, 1)'
            },
            strokeWidth: {
              normal: 5,
              highlight: 8,
              hover: 8,
              select: 8
            }
          },
          {
            label: 'scale参数覆盖',
            image: 'img/node/circleimage/3.png',
            scale: 1.5
          },
          {
            label: 'size参数覆盖',
            image: 'img/node/circleimage/3.png',
            size: 100
          },
          {
            label: '提示信息覆盖',
            image: 'img/node/circleimage/3.png',
            tooltip: {
              stroke: 'green',
              strokeWidth: 4,
              color: '#000',
              background: 'yellow',
              font: 'bold 18px "Microsoft Yahei"',
              text: '我有自己的提示信息'
            }
          },
          {
            image: 'img/node/circleimage/3.png',
            label: {
              font: '14px bold "Microsoft Yahei"',
              text: 'label样式覆盖',
              margin: [20, 30, 20, 30]
            },
            labelBackground: {
              normal: 'rgba(30, 150, 200, 1)',
              highlight: 'rgba(200, 200, 50, 1)',
              hover: 'rgba(200, 200, 50, 1)',
              select: 'rgba(200, 50, 200, 1)'
            },
            labelStroke: {
              normal: '#fff',
              highlight: '#fff',
              hover: '#fff',
              select: '#fff'
            }
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
        return nodeTmpl($, go, {
          props: {
            shape: 'image',
            size: 60,
            scale: 1,
            stateShape: 'Rectangle',
            background: {
              normal: 'rgba(200, 200, 200, 0.4)',
              highlight: 'rgba(200, 200, 100, 1)',
              hover: 'rgba(200, 200, 100, 1)',
              select: 'rgba(100, 100, 200, 1)'
            },
            strokeColor: {
              normal: 'rgba(50, 50, 180,0.6)',
              highlight: 'rgba(180, 50, 50,0.6)',
              hover: 'rgba(50, 180, 50,1)',
              select: 'rgba(50, 180, 50,1)'
            },
            strokeWidth: {
              normal: 3,
              highlight: 4,
              hover: 4,
              select: 5
            },
            label: {
              font: '14px "iconfont"',
              margin: [10, 10, 10, 10]
            },
            labelBackground: {
              normal: 'rgba(50, 200, 0, 0.5)',
              highlight: 'rgba(50, 200, 50, 1)',
              hover: 'rgba(50, 200, 50, 1)',
              select: 'rgba(50, 50, 200, 1)'
            },
            labelStroke: {
              normal: '#000',
              highlight: '#fff',
              hover: '#fff',
              select: '#fff'
            },
            labelColor: {
              normal: '#222',
              highlight: '#fff',
              hover: '#fff',
              select: '#fff'
            },
            tooltip: {
              text: '提示',
              background: 'rgba(0,0,0,0.6)',
              stroke: 'yellow',
              color: '#fff',
              font: '14px'
            },
            _labelContainerOptions: {
              props: {
              },
              parts: []
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
