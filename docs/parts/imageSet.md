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
      :node-template-map="nodeTemplateMap"
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
  import { XdhGo, utils } from 'xdh-go'
  let { imageSet, node, textBlock } = utils
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        images1: [
          {
            src: '/xdh-go/img/circle1.png',
            width: 60,
            height: 60,
            shape: 'Circle',
            scale: 1,
            name: 'img1'
          }
        ],
        nodes: [
          {
            category: 'set1',
            source: '/xdh-go/img/circle1.png'
          }
        ]
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
          'set1',
          node($, go, {
            parts: [
              imageSet($, go, {
                layout: 'Spot',
                images: this.images1
              }),
              textBlock($, go, {
                props: {
                  text: 'imageSet'
                }
              })
            ]
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
