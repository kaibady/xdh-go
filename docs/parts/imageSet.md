# imageSet

显示一组图片

方法参数：
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|layout|图片集的布局|'Spot'/'Vertical'/'Horizontal'/'Position'其它 go.PanelLayout|-|'Spot'|
|images|图片集|Array|-|-|
|images[].name|对象名称|String|-|''|
|images[].src|图片地址|String|-|''|
|images[].scale|缩放大小|Number|-|1|
|images[].width|图片宽|Number|-|60|
|images[].height|图片高|Number|-|60|
|images[].position|图片相对位置|Array|2 或 4 个元素,如果 layout 为'Spot'，设置 alignment 为 go.Spot 对象，[0.5,0.5, 50, 50];如果是'Position',设置 position 为 go.Point 对象, 如[100, 100]|60|
|images[].padding|图片边距|Number/Array|-|2|
|images[].shape|裁剪形状|String|-|'Circle'|

## 基础用法

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :node-template-map="nodeTemplateMap"
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
  import { XdhGo, utils, nodeTmpl, animation } from 'xdh-go'
  let { imageSet, node, textBlock } = utils
  let { AnimationEvents } = animation
  let animationEvents
  let pics = [
    '/xdh-go/img/node/circleimage/1.png',
    '/xdh-go/img/node/circleimage/2.png',
    '/xdh-go/img/node/circleimage/3.png',
    '/xdh-go/img/node/circleimage/4.png'
  ]
  let verLayout = [],
    horLayout = [],
    spotLayout = [],
    posLayout = []
  let rows = Math.floor(Math.sqrt(pics.length))
  pics.forEach((r, idx) => {
    let item = {
      src: r,
      width: 60,
      height: 60,
      scale: 1,
      padding: 2,
      name: 'img' + idx
    }
    verLayout.push(Object.assign({}, item, { shape: 'RoundedRectangle' }))
    horLayout.push(Object.assign({}, item, { shape: 'RoundedRectangle' }))
    spotLayout.push(
      Object.assign({}, item, {
        shape: 'Circle',
        scale: 1,
        position: [
          [0.5, 0.5, -50, -50],
          [0.5, 0.5, 50, -50],
          [0.5, 0.5, -50, 50],
          [0.5, 0.5, 50, 50]
        ][idx]
      })
    )
    posLayout.push(
      Object.assign({}, item, {
        shape: 'RoundedRectangle',
        scale: 1 + idx * 0.2,
        position: [20 * idx, 20 * idx]
      })
    )
  })
  let nodes = []
  ;[
    'ver,垂直布局',
    'hor,水平布局',
    'spot,Spot布局',
    'pos,Position布局'
  ].forEach((r, idx) => {
    let [layout, name] = r.split(',')
    nodes.push({
      key: idx,
      shape: null,
      category: layout,
      label: name
    })
  })
  console.log(nodes, verLayout, horLayout, spotLayout)
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: nodes
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.GridLayout, {})
      },
      nodeTemplateMap($, go) {
        let map = new go.Map()
        map.add(
          'ver',
          nodeTmpl($, go, {
            props: {
              layout: 'Horizontal',
              _innerPanelOptions: {
                parts: [
                  imageSet($, go, {
                    layout: 'Vertical',
                    images: verLayout
                  })
                ]
              }
            }
          })
        )
        map.add(
          'hor',
          nodeTmpl($, go, {
            props: {
              _innerPanelOptions: {
                parts: [
                  imageSet($, go, {
                    layout: 'Horizontal',
                    images: horLayout
                  })
                ]
              }
            }
          })
        )
        map.add(
          'spot',
          nodeTmpl($, go, {
            props: {
              _innerPanelOptions: {
                parts: [
                  imageSet($, go, {
                    layout: 'Spot',
                    images: spotLayout
                  })
                ]
              }
            }
          })
        )
        map.add(
          'pos',
          nodeTmpl($, go, {
            props: {
              _innerPanelOptions: {
                parts: [
                  imageSet($, go, {
                    layout: 'Position',
                    images: posLayout
                  })
                ]
              }
            }
          })
        )
        return map
      },
      diagramReady(diagram, $, go) {}
    }
  }
</script>
```

:::

## 动效应用

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :node-template="nodeTemplate"
      :type="model"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="400px"
      @on-ready="diagramReady"
      @on-load-data="onLoadData"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, utils, nodeTmpl, animation } from 'xdh-go'
  let { imageSet, node, textBlock } = utils
  let { AnimationEvents } = animation
  let animationEvents
  let images1 = [
    {
      src: '/xdh-go/img/circle1.png',
      width: 60,
      height: 60,
      shape: 'Circle',
      scale: 2,
      name: 'img1'
    },
    {
      src: '/xdh-go/img/circle1.png',
      width: 80,
      height: 80,
      shape: 'Circle',
      scale: 2,
      name: 'img2'
    },
    {
      src: '/xdh-go/img/circle1.png',
      width: 100,
      height: 100,
      shape: 'Circle',
      scale: 2,
      name: 'img3'
    }
  ]
  let nodes = []
  for (let i = 0; i < 2; i++) {
    let node = {
      key: 1,
      shape: 'Circle',
      layout: 'Spot',
      size: 100,
      label: [{ text: 'imageSet' }, { text: '通用节点' }, { text: '旋转效果' }]
    }
    let animation = []
    for (let j = 1; j <= 3; j++) {
      let dir = j % 2 === 0 ? [360, 0] : [0, 360]
      animation.push({
        trigger: 'rotate' + j,
        objectName: 'img' + j,
        duration: 2000 * j,
        prop: 'angle',
        keyFrame: dir,
        easingFunc: ['ease']
      })
    }
    node.animation = animation
    nodes.push(node)
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        animateContinue: true,
        nodes: nodes
      }
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        }
      },
      layout($, go) {
        return $(go.GridLayout, {})
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            _figurePanelOptions: {
              parts: [
                imageSet($, go, {
                  layout: 'Spot',
                  images: images1
                })
              ]
            }
          }
        })
      },
      diagramReady(diagram, $, go) {},
      onLoadData(diagram, $, go) {
        animationEvents = new AnimationEvents(diagram, go)
        diagram.animationEvents = animationEvents
        this.circularRotate('rotate1')
        this.circularRotate('rotate2')
        this.circularRotate('rotate3')
      },
      circularRotate(event) {
        animationEvents.emit(event, 'all', () => {
          if (this.animateContinue) {
            this.circularRotate(event)
          }
        })
      }
    }
  }
</script>
```

:::
