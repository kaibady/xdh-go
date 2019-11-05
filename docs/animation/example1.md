# 动效

gojs 对节点的动画没有特别的进行扩展，但在 sample 示例中有使用 window.requestAnimationFrame 来实现动画效果。举例如下：



## 在节点上定义动画

动画参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| animation | 动画参数 | [Object] | - | - |
| animation[n].trigger | 动画触发事件 | String | 'always'/'mouseEnter'/ 'mouseLeave'/'click'/'dbclick'| 'mouseEnter' |
| animation[n].objectName | 动画施加的对象名称或者节点数据的属性 | String | 1.通用节点：'tNode'(节点对象)/'tFigure'(图形对象)/'tLabel'(文字对象) 2.自定义对象的 name 名称。3.节点数据'data',或对象内的属性，如, 'data.strokeWidth' |''|
| animation[n].duration | 动画持续时间，毫秒 | Number | -|300|
| animation[n].prop | 动画对象需要变更的属性 | String | -|''|
| animation[n].propType | 动画对象属性的类型， | String |'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'|根据 prop 自动匹配属性的类型，但有些属性可以有多种类型，需指定|
| animation[n].keyFrame | 动画开始和结束的属性值 | Array | 根据 propType 不同传不同的数组类型，见补充说明 |[0, 1]|
| animation[n].keyType | 属性值是相对变化或绝对变化 | String | 'relative'/'absolute' |'absolute'|
| animation[n].name | 动画名称，与 prevName 配合使用 | String | - |''|
| animation[n].prevName | 上一个动画名称，如果为空字串则直接执行，如果不为空则在指定动画结束后再执行 | String | - |''|
| animation[n].delay | 动画延迟的时间，毫秒 | Number | - |0|
| animation[n].repeatCount | 动画重复的次数 | Number | - |1|
| animation[n].direction | 动画重复时，偶数次是否反向播放 | String | 'normal'/'alternate' |'normal'|
| animation[n].easingFunc | 动画速度曲线 | [String/Function],String 类型是内置方法名称，Function 类型为自定义方法 | - |['easeInQuad']|




如果使用通用节点方法，可在节点中添加动画配置
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
      height="700px"
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
            key: 1,
            label: 'node1',
            animation: [
              {
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 1000,
                name: 'redtogreen',
                prop: 'background',
                propType: 'rgba',
                repeatCount: 4,
                direction: 'alternate',
                keyFrame: [[0, 255, 0, 1], [0, 0, 255, 1]],
                easingFunc: [
                  'easeInQuad',
                  'easeInQuad',
                  'easeInQuad',
                  'easeInQuad'
                ]
              },
              {
                prevName: 'redtogreen',
                trigger: 'mouseEnter',
                objectName: 'tFigure',
                duration: 1000,
                prop: 'scale',
                propType: 'number',
                keyFrame: [1, 1.5],
                easingFunc: [
                  'easeInQuad',
                  'easeInQuad'
                ]
              }
            ]
          },
          {
            key: 2,
            label: 'node2'
          },
          {
            key: 3,
            label: 'node3'
          },
          {
            key: 4,
            label: 'node4'
          },
          {
            key: 5,
            label: 'node5'
          }
        ],
        links: [
          {
            from: 1,
            to: 2
          },
          {
            from: 1,
            to: 3
          },
          {
            from: 1,
            to: 4
          },
          {
            from: 1,
            to: 5
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
        return $(go.LayeredDigraphLayout, {
          setsPortSpots: false,
          layerSpacing: 150,
          direction: 90,
          isOngoing: false
        });
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'Circle',
            size: 80
          }
        });
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to',
            labelBackground: '#ffe58f'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
