# 自定义事件

通过 AnimationEvents 类对象，可以自定义事件，通过 emit 手动触发事件。由此可以实现动画循环效果。
on 方法用于注册所有节点的默认动画，当节点中没有动画配置时，使用该动画配置。
emit 方法第二个参数传 node 节点对象时，触发单个节点动画，如果传'all'字符串，触发所有节点相关动画。

参数详情参考[自定义事件类 AnimationEvents](/commonNode/animate/custom.html)
:::demo

```html
<template>
  <div>
    <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" size="mini" @click="triggerRotate()"
        >连线rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="triggerSlide()"
        >连线slide事件</el-button
      >
      <el-button type="primary" size="mini" @click="startRotate()"
        >循环rotate事件</el-button
      >
      <el-button type="primary" size="mini" @click="endRotate()"
        >停止循环rotate</el-button
      >
    </div>
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
      @on-load-data="onLoadData"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl, dataUtils, animation } from 'xdh-go'
  let { DataManager } = dataUtils
  let dataManager
  let { AnimationEvents } = animation
  let animationEvents
  let nodes = []
  for (let i = 0; i < 2; i++) {
    let pairs = Math.floor(i / 2)
    let label = ['sLabel']
    nodes.push({
      key: String(i + 1),
      label: label[pairs]
    })
  }

  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        diagram: null,
        animateContinue: false,
        model: 'GraphLinksModel',
        nodes: nodes,
        links: [
          {
            from: '1',
            to: '2',
            label: 'custom',
            animation: [
              {
                trigger: 'rotate',
                objectName: 'sLabel',
                duration: 800,
                prop: 'angle',
                keyFrame: [0, 360],
                easingFunc: ['easeInOutCubic']
              }
            ]
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
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 200,
          columnSpacing: 10,
          isOngoing: false
        })
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        })
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            fromPortId: 'tFigure',
            fromShortLength: 10,
            toShortLength: 10,
            toPortId: 'tFigure',
            lineWidth: 6,
            arrowStrokeWidth: 6,
            labelStroke: '#f759ab',
            labelBackground: '#ff85c0',
            labelColor: '#fff'
          }
        })
      },
      diagramReady(diagram, $, go) {
        dataManager = new DataManager(diagram, go)
        // 绑定到diagram中以便使用
        diagram.dataManager = dataManager
        let links = dataManager.getLink({ from: '1', to: '2' }, true, true)
        animationEvents.on('slide', links, [
          {
            trigger: 'slide',
            objectName: 'sLabel',
            duration: 800,
            repeatCount: 2,
            direction: 'alternate',
            prop: 'segmentOffset',
            propType: 'point',
            keyFrame: [
              [0, 0],
              [0, 40]
            ],
            easingFunc: ['easeInOutCubic']
          }
        ])
      },
      onLoadData(diagram, $, go) {
        animationEvents = new AnimationEvents(diagram, go)
        diagram.animationEvents = animationEvents
      },
      triggerRotate() {
        let links = dataManager.getLink({ from: '1', to: '2' }, true, true)
        animationEvents.emit('rotate', links)
      },
      triggerSlide() {
        let links = dataManager.getLink({ from: '1', to: '2' }, true, true)
        animationEvents.emit('slide', links)
      },
      startRotate() {
        this.animateContinue = true
        this.runRotate()
      },
      endRotate() {
        this.animateContinue = false
      },
      runRotate() {
        animationEvents.emit('rotate', 'all', () => {
          if (this.animateContinue) {
            this.runRotate()
          }
        }, true)
      }
    }
  }
</script>
```

:::
