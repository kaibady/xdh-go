# imageSet

方法参数：
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|layout|图片集的布局|'Spot'/'Vertical'/'Horizontal'/其它 go.PanelLayout|-|'Spot'|
|images|图片集|Array|-|-|
|images[].name|对象名称|String|-|''|
|images[].src|图片地址|String|-|''|
|images[].scale|缩放大小|Number|-|1|
|images[].width|图片宽|Number|-|60|
|images[].height|图片高|Number|-|60|
|images[].shape|裁剪形状|String|-|'Circle'|

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
  for (let i = 0; i < 3; i++) {
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
  console.log(nodes)
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
