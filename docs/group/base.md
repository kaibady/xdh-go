# 分组

gojs 中有 go.Group 类可实现节点分组效果，但用 go.Group 类实现的分组中，一个节点不能同时属于两个以上分组。实际情况中，节点分组可能会有交集的情况，因此需要单独处理。为此，工具定义了 groupTmpl 方法，并通过不同参数在内部处理这两种情况。

## groupTmpl

| 参数             | 说明           | 类型          | 可选值                           | 默认值                   |
| ---------------- | -------------- | ------------- | -------------------------------- | ------------------------ |
| groupType        | 分组节点类型   | String        | 'normal'(无交集)/'mixed'(有交集) | 'normal'                 |
| figure           | 分组框图形     | String        | go.Shape 内置图形                | 'Rectangle'              |
| background       | 分组框背景色   | String        | -                                | 'rgba(248,91,99,0.1)'    |
| stroke           | 分组框边框色   | String        | -                                | 'rgba(248,91,99,0.8)'    |
| strokeWidth      | 分组框边框宽度 | Number        | -                                | 1                        |
| maxSize          | 分组框最大尺寸 | Array         | [宽,高]                          | [NaN, NaN], 即不做限制   |
| groupName        | 分组标题       | Object/String | -                                | -                        |
| groupName.text   | 分组标题文字   | String        | -                                | ''                       |
| groupName.font   | 分组标题样式   | String        | -                                | '14px "Microsoft Yahei"' |
| groupName.margin | 分组标题外边距 | Array         | -                                | [0, 0, 0, 0]             |

## 无交集分组

无交集分组只有简单的父子结构，同一个节点只能属于一个分组。groupTmpl 的 groupType 参数为'normal'或不传时，会返回一个 go.Group 对象，因此需要应用到 XdhGo 的 group-template 参数中
:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :go-register="goRegister"
      :link-template="linkTemplate"
      :group-template="groupTemplate"
      :node-template-map="nodeTemplateMap"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="650px"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl, linkTmpl, groupTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            key: 11,
            groupName: {
              text: 'group1',
              stroke: 'red'
            },
            isGroup: true
          },
          {
            key: 12,
            groupName: {
              text: 'group2',
              stroke: 'green'
            },
            isGroup: true
          },
          {
            key: 1,
            label: '子节点1',
            group: 12
          },
          {
            key: 2,
            label: '子节点2',
            group: 11
          },
          {
            key: 3,
            label: '子节点3',
            group: 12
          },
          {
            key: 4,
            label: '子节点4',
            group: 11
          }
        ],
        links: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 2, to: 4 }]
      };
    },
    methods: {
      goRegister($, go) {},
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10,
          'animationManager.duration': 200
        };
      },
      layout($, go) {
        return $(go.ForceDirectedLayout, {
          defaultSpringLength: 10,
          defaultSpringStiffness: 0.5,
          defaultElectricalCharge: 0,
          randomNumberGenerator: null
        });
      },
      groupTemplate($, go) {
        return groupTmpl($, go, {
          props: {
            stroke: '#fa541c'
          }
        });
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80
            }
          })
        );
        return map;
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to'
          }
        });
      }
    }
  };
</script>
```

:::

## 有交集分组

有交集的分组同一个节点可能属于多个分组，实现方式会有所不同。groupTmpl 的 groupType 参数为'mixed'时，会返回一个 go.Node 对象，因此需要使用对应的 nodeTemplateMap 定义模板。同时节点中的分组信息需要使用数组形式,参数为 groups。提供的 getGroupLayout 和 getGroupDragging 方法分别用于生成布局对象和拖拽对象。而 setGroupLayout 方法用于初始化节点和分组的信息，提供给布局对象使用。

有交集分组不支持节点折叠

参数如下

### getGroupLayout

获得分组布局类
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---------------- | -------------- | ------------- | -------------------------------- | ------------------------ |
| go | go 对象 | Object | - | - |
| options | 配置参数 | Object | - | - |
| options.categoryName | 模板对应的 category 名称 | String | - | 'Group' |

### getGroupDragging

获得拖拽类
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---------------- | -------------- | ------------- | -------------------------------- | ------------------------ |
| go | go 对象 | Object | - | - |
| options | 配置参数 | Object | - | - |
| options.categoryName | 模板对应的 category 名称 | String | - | 'Group' |

### setGroupLayout

初始化分组结点信息
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---------------- | -------------- | ------------- | -------------------------------- | ------------------------ |
| \$ | go.GraphObject.make 方法 | Function | - | - |
| go | go 对象 | Object | - | - |
| diagram | diagram 对象 | Object | - | - |
| options | 配置参数 | Object | - | - |
| options.categoryName | 模板对应的 category 名称 | String | - | 'Group' |
| options.type | 首次渲染使用的布局 | String | 5 种内置布局名称 | 'ForceDirectedLayout' |
| options.layoutOptions | 布局对应的参数 | Object | - | {} |
| options.groupLayout | 在 go-register 参数的方法中绑定的自定义布局类 | Function | - | - |

:::demo

```html
<template>
  <div>
    <!-- <xdh-go-tool :diagram="diagram"></xdh-go-tool> -->
    <xdh-go
      :nodes="nodes"
      :links="links"
      :go-register="goRegister"
      :type="model"
      :link-template="linkTemplate"
      :node-template-map="nodeTemplateMap"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="850px"
      @on-load-data="onLoadData"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import {
    XdhGo,
    XdhGoTool,
    nodeTmpl,
    linkTmpl,
    groupTmpl,
    utils,
    groupFun
  } from 'xdh-go';
  let { tag, shape, binding } = utils;
  let { getGroupLayout, getGroupDragging, setGroupLayout } = groupFun;
  export default {
    components: {
      XdhGo,
      XdhGoTool
    },
    data() {
      return {
        diagram: null,
        model: 'GraphLinksModel',
        nodes: [
          {
            key: 11,
            category: 'Group',
            groupName: {
              text: 'group1',
              stroke: 'red'
            }
          },
          {
            key: 12,
            category: 'Group',
            groupName: {
              text: 'group2',
              stroke: 'green'
            }
          },
          {
            key: 13,
            category: 'Group',
            groupName: {
              text: 'group3',
              stroke: 'green'
            }
          },
          {
            key: 14,
            category: 'Group',
            groupName: {
              text: 'group4',
              stroke: 'green'
            }
          },
          {
            key: 15,
            category: 'Group',
            groupName: {
              text: 'group5',
              stroke: 'green'
            }
          },
          {
            key: 1,
            label: '子节点1',
            groups: [11]
          },
          {
            key: 2,
            label: '子节点2',
            groups: [11, 12]
          },
          {
            key: 3,
            label: '子节点3',
            groups: [12]
          },
          {
            key: 4,
            label: '子节点4',
            groups: [13]
          },
          {
            key: 5,
            label: '子节点5',
            groups: [13]
          },
          {
            key: 6,
            label: '子节点6',
            groups: [14, 15]
          }
        ],
        links: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 4, to: 5 },
          { from: 4, to: 6 }
        ]
      };
    },
    methods: {
      goRegister($, go) {
        go.GroupLayout = getGroupLayout(go, { categoryName: 'Group' });
        go.GroupDraggingTool = getGroupDragging(go, { categoryName: 'Group' });
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 10,
          'animationManager.duration': 200,
          draggingTool: $(go.GroupDraggingTool)
        };
      },
      layout($, go) {
        return $(go.GroupLayout, {});
      },
      nodeTemplateMap($, go) {
        let map = new go.Map();
        map.add(
          'Group',
          groupTmpl($, go, {
            props: {
              groupType: 'mixed',
              figure: 'RoundedRectangle'
            }
          })
        );
        map.add(
          '',
          nodeTmpl($, go, {
            props: {
              shape: 'Circle',
              size: 80
            }
          })
        );
        return map;
      },
      linkTemplate($, go) {
        return linkTmpl($, go, {
          props: {
            arrows: 'to'
          }
        });
      },
      onLoadData(diagram, $, go) {
        setGroupLayout($, go, diagram, {
          type: 'ForceDirectedLayout',
          categoryName: 'Group',
          layoutOptions: {
            defaultSpringLength: 50,
            defaultSpringStiffness: 0.1,
            randomNumberGenerator: null
          },
          groupLayout: go.GroupLayout
        });
      },
      diagramReady(diagram, $, go) {
        this.diagram = diagram;
      }
    }
  };
</script>
```

:::
