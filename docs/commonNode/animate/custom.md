# 自定义事件

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
        >注销rotate事件</el-button
      >
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
  import { XdhGo, nodeTmpl, utils, animation } from 'xdh-go'
  let { tag, shape, binding } = utils
  let { AnimationEvents } = animation
  let animationEvents
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
            loadTag: {
              text: '\uE701'
            },
            animation: [
              {
                trigger: 'slide',
                objectName: 'loadTag',
                duration: 800,
                prop: 'alignment',
                propType: 'spot',
                repeatCount: 2,
                direction: 'alternate',
                keyFrame: [
                  [0.5, 0.5],
                  [1, 0.5]
                ],
                easingFunc: ['easeInOutCubic']
              }
            ]
          },
          {
            key: 2,
            label: '使用all注册默认',
            loadTag: {
              text: '\uE721'
            }
          },
          {
            key: 3,
            label: '注册特定节点',
            loadTag: {
              text: '\uE6dd'
            }
          },
          {
            key: 4,
            label: '注册特定节点',
            loadTag: {
              text: '\uE693'
            }
          }
        ]
      }
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
        let node = this.$refs.diagram.findNode(r => r.key === 2, true)
        animationEvents.emit('rotate', node)
      },
      triggerAllRotate() {
        animationEvents.emit('rotate', 'all')
      },
      triggerAllRotateReverse() {
        animationEvents.emit('rotateReverse', 'all')
      },
      triggerSlide() {
        animationEvents.emit('slide', 'all')
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
        })
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10
        }
      },
      layout($, go) {
        return $(go.GridLayout, {
          wrappingColumn: 3
        })
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
                  background: 'transparent',
                  font: '22px "iconfont"',
                  placement: 'center',
                  stroke: 'transparent',
                  color: '#000',
                  strokeWidth: 0,
                  dataKey: 'loadTag'
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
        )
      }
    }
  }
</script>
```

:::
